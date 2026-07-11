import os
import re
import json
import onnxruntime_genai as oga
import chromadb
from chromadb.utils import embedding_functions
from faster_whisper import WhisperModel
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

class MasterOrchestrator:
    def __init__(self):
        print("\n[System] Booting ThinkLink Multi-Agent Swarm...")
        
        self.script_dir = os.path.dirname(os.path.abspath(__file__))
        self.ollama_offline = False
        
        # 1. LOAD PHI-3 (The Brain)
        self.model_path = os.path.join(self.script_dir, "../../models/phi-3-mini-cpu/cpu_and_mobile/cpu-int4-rtn-block-32")
        print(f"[System] Loading Phi-3 Shared Engine from: {os.path.abspath(self.model_path)}")
        try:
            self.model = oga.Model(self.model_path)
            self.tokenizer = oga.Tokenizer(self.model)
            self.params = oga.GeneratorParams(self.model)
            self.params.set_search_options(max_length=2048, temperature=0.0) 
            print("[System] Phi-3 Engine Loaded Successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to load Phi-3. Details: {e}. Ollama fallback will be used.")
            self.model = None
            self.tokenizer = None
            
        # 2. LOAD FASTER-WHISPER (The Ears)
        print("[System] Loading Audio Engine (Faster-Whisper base.en)...")
        try:
            # 'base.en' is tiny, English-only, and extremely fast on CPUs
            self.audio_model = WhisperModel("base.en", device="cpu", compute_type="int8")
            print("[System] Whisper Audio Engine Loaded Successfully.")
        except Exception as e:
            print(f"[Warning] Failed to load Whisper Audio model: {e}")
            self.audio_model = None
        
        # 3. LOAD THE "EYES" (BLIP - Ultra Low RAM Mode)
        print("[System] Loading Vision Engine (BLIP Base)...")
        try:
            self.vision_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
            self.vision_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
            print("[System] Vision Engine Loaded Successfully (<1GB RAM).")
        except Exception as e:
            print(f"[Warning] Failed to load BLIP Vision model: {e}")
            self.vision_model = None

        # 4. CONNECT TO KNOWLEDGE BASE (ChromaDB)
        print("[System] Connecting to ChromaDB Knowledge Bases...")
        try:
            self.db_path = os.path.join(self.script_dir, "../../thinklink_knowledge")
            self.chroma_client = chromadb.PersistentClient(path=self.db_path)
            self.ef = embedding_functions.DefaultEmbeddingFunction()
            
            self.collections = {
                "LITHOGRAPHY": self.chroma_client.get_or_create_collection(name="agent4_litho_collection", embedding_function=self.ef),
                "DEPOSITION": self.chroma_client.get_or_create_collection(name="agent5_depo_collection", embedding_function=self.ef),
                "QUALITY": self.chroma_client.get_or_create_collection(name="agent6_quality_collection", embedding_function=self.ef),
                "PACKAGING": self.chroma_client.get_or_create_collection(name="agent7_packaging_collection", embedding_function=self.ef)
            }
            print("[System] ChromaDB connected successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to connect to ChromaDB: {e}")
            self.collections = {}
            
        print("[System] Swarm Engine Online and Ready to route.\n")

    def stream_progress(self, status: str, message: str):
        """Broadcasts Swarm progress to all active WebSocket clients thread-safely."""
        import asyncio
        from app.utils import loop as loop_module
        from app.services.websocket_manager import websocket_manager
        
        print(f"[Swarm Broadcast] Status: {status} | Msg: {message}", flush=True)
        
        if loop_module.main_loop and loop_module.main_loop.is_running():
            coro = websocket_manager.broadcast_ai_status(status, message)
            asyncio.run_coroutine_threadsafe(coro, loop_module.main_loop)

    def run_llm(self, prompt: str) -> str:
        """Utility: All agents pass their prompts through this single brain."""
        if not getattr(self, "model", None) or not getattr(self, "tokenizer", None):
            # Check if we already detected Ollama is offline to fail fast
            if getattr(self, "ollama_offline", False):
                print("[Swarm LLM] Ollama is known to be offline. Skipping request.")
                return "Error: AI engine is offline."

            # Fallback to local Ollama service if local model is offline/not found
            import requests
            try:
                from app.core.config import settings
                url = getattr(settings, "ai_service_url", "http://localhost:11434/api/generate")
                response = requests.post(
                    url,
                    json={"prompt": prompt},
                    timeout=5, # Reduce timeout for local Ollama to fail fast
                )
                response.raise_for_status()
                data = response.json()
                # Clear offline flag on success
                self.ollama_offline = False
                return data.get("response", "").strip()
            except Exception as e:
                print(f"[ERROR] Phi-3 model not loaded and Ollama fallback failed: {e}")
                self.ollama_offline = True # Set flag to fail fast next time
                return "Error: AI engine is offline."

        input_tokens = self.tokenizer.encode(prompt)
        output_generator = oga.Generator(self.model, self.params)
        output_generator.append_tokens(input_tokens)
        
        response = ""
        while not output_generator.is_done():
            output_generator.generate_next_token()
            new_token = output_generator.get_next_tokens()[0]
            if new_token in [32000, 32001, 32007]: # Phi-3 special tokens
                break
            text_chunk = self.tokenizer.decode([new_token])
            if "<|end|>" in text_chunk or "<|eot_id|>" in text_chunk: 
                break
            response += text_chunk
        return response.strip()
    
    def input_agent(self, payload: dict) -> str:
        """
        Agent 1: Ingests Telemetry, Audio, or Images and normalizes them into text.
        Expected payload format: 
        { "type": "telemetry" | "audio" | "image", "data": <json_dict> | <file_path>, "notes": <optional_text> }
        """
        # If the user passed in raw hardware JSON directly instead of our new format, handle it gracefully
        if "type" not in payload:
            payload = {"type": "telemetry", "data": payload}
            
        payload_type = payload.get("type", "unknown")
        
        # ----------------------------------------
        # MODALITY 1: RAW TELEMETRY (JSON)
        # ----------------------------------------
        if payload_type == "telemetry":
            self.stream_progress("analyzing", "Swarm: Input Agent translating raw IoT telemetry...")
            print("[Input Agent] Processing IoT Telemetry...")
            raw_data = payload.get("data", {})
            prompt = f"""<|system|>
You are a factory IoT translation agent. 
Read the raw machine sensor data and write a single, professional 1-sentence alert describing the anomaly.
Do not include any other text.<|end|>
<|user|>
RAW DATA: {raw_data}<|end|>
<|assistant|>"""
            translated_alert = self.run_llm(prompt)
            if "Error: AI engine is offline" in translated_alert:
                # Rule-based fallback translation
                temp = raw_data.get("temperature", raw_data.get("thermo_celsius", "unknown"))
                gas = raw_data.get("gas_level", "unknown")
                loc = raw_data.get("location", raw_data.get("device_id", "machine"))
                translated_alert = f"Anomaly alert in {loc}: temperature is {temp}°C, gas level is {gas}."
            print(f"[Input Agent] Translation: {translated_alert}")
            return translated_alert

        # ----------------------------------------
        # MODALITY 2: AUDIO (Voice Memos)
        # ----------------------------------------
        elif payload_type == "audio":
            self.stream_progress("analyzing", "Swarm: Input Agent transcribing worker voice memo (Whisper)...")
            print("[Input Agent] Transcribing Worker Audio Memo...")
            audio_file_path = payload.get("data")
            
            if not getattr(self, 'audio_model', None):
                return "ALERT: Audio received but Whisper Audio system is offline."
            
            # The "Cheat Sheet" for factory jargon
            factory_jargon = "TDMAT, PACVD, Lithography, Inductively Coupled Plasma, RIE, Etcher, Sub-threshold leakage, Modulino, ChromaDB"
            
            # Run local Whisper
            segments, info = self.audio_model.transcribe(
                audio_file_path, 
                beam_size=5,
                initial_prompt=factory_jargon
            )
            transcription = "".join([segment.text for segment in segments])
            print(f"[Input Agent] Worker said: '{transcription}'")
            
            # Have Phi-3 format it professionally
            prompt = f"""<|system|>
Format this worker's raw voice transcription into a formal, 1-sentence factory alert.<|end|>
<|user|>
VOICE MEMO: {transcription}<|end|>
<|assistant|>"""
            formatted_alert = self.run_llm(prompt)
            return formatted_alert

        # ----------------------------------------
        # MODALITY 3: IMAGES (Camera Photos via BLIP)
        # ----------------------------------------
        elif payload_type == "image":
            self.stream_progress("analyzing", "Swarm: Input Agent analyzing machine photo (BLIP)...")
            print("[Input Agent] Analyzing Worker Photo (BLIP)...")
            
            if not getattr(self, 'vision_model', None):
                return "ALERT: Image received but Vision system is currently offline."
                
            image_path = payload.get("data")
            
            # Load and convert image for BLIP
            raw_image = Image.open(image_path).convert('RGB')
            
            # BLIP generates a basic caption (e.g., "a close up of a cracked metal surface")
            inputs = self.vision_processor(raw_image, return_tensors="pt")
            out = self.vision_model.generate(**inputs)
            vision_analysis = self.vision_processor.decode(out[0], skip_special_tokens=True)
            
            print(f"[Input Agent] Raw Vision Analysis: '{vision_analysis}'")
            
            # Phi-3 upgrades the dumb caption into a smart factory alert
            prompt = f"""<|system|>
You are a Senior Semiconductor Defect Translator. 
Read the basic visual findings below and translate them into a highly technical, 1-sentence factory alert.
For example, if it says "shiny disk with a scratch", translate it to "Silicon wafer exhibiting surface-level micro-cracking."<|end|>
<|user|>
VISUAL FINDINGS: {vision_analysis}<|end|>
<|assistant|>"""
            
            translated_alert = self.run_llm(prompt)
            return translated_alert
        
        # ----------------------------------------
        # MODALITY 4: SENSOR FUSION (All at once!)
        # ----------------------------------------
        elif payload_type == "combined":
            self.stream_progress("analyzing", "Swarm: Input Agent initiating multi-modal sensor fusion...")
            print("\n[Input Agent] 🌪️ INITIATING MULTI-MODAL SENSOR FUSION 🌪️")
            combined_data = payload.get("data", {})
            
            # 1. Grab Telemetry
            telemetry_raw = combined_data.get("telemetry", "No telemetry provided.")
            print(f"[Input Agent] Extracted Telemetry: {telemetry_raw}")
            
            # 2. Process Audio
            audio_path = combined_data.get("audio")
            audio_text = "No audio provided."
            import os
            if audio_path and getattr(self, 'audio_model', None) and os.path.exists(audio_path):
                self.stream_progress("analyzing", "Swarm: Input Agent transcribing audio memo...")
                print("[Input Agent] Transcribing Audio...")
                factory_jargon = "TDMAT, PACVD, Lithography, Inductively Coupled Plasma, RIE, Etcher, Sub-threshold leakage, Modulino, ChromaDB"
                segments, _ = self.audio_model.transcribe(audio_path, beam_size=5, initial_prompt=factory_jargon)
                audio_text = "".join([segment.text for segment in segments])
                print(f"[Input Agent] Audio Transcript: '{audio_text}'")

            # 3. Process Image
            image_path = combined_data.get("image")
            vision_text = "No image provided."
            if image_path and getattr(self, 'vision_model', None) and os.path.exists(image_path):
                self.stream_progress("analyzing", "Swarm: Input Agent captioning camera photo...")
                print("[Input Agent] Analyzing Image...")
                raw_image = Image.open(image_path).convert('RGB')
                inputs = self.vision_processor(raw_image, return_tensors="pt")
                out = self.vision_model.generate(**inputs)
                vision_text = self.vision_processor.decode(out[0], skip_special_tokens=True)
                print(f"[Input Agent] Vision Caption: '{vision_text}'")
                
            # 4. SENSOR FUSION: Phi-3 synthesizes all 3 inputs into ONE alert
            self.stream_progress("analyzing", "Swarm: Input Agent synthesizing modalities into unified alert...")
            print("[Input Agent] Synthesizing all modalities into a single semantic alert...")
            prompt = f"""<|system|>
You are a Senior Semiconductor Defect Synthesizer. 
You are receiving data from three simultaneous sources about a single machine failure: Machine Telemetry, Worker Audio, and a Camera Photo.
Synthesize this information into a single, highly technical, 1-sentence factory alert.<|end|>
<|user|>
TELEMETRY: {telemetry_raw}
AUDIO TRANSCRIPT: {audio_text}
VISUAL CAPTION: {vision_text}<|end|>
<|assistant|>"""
            
            raw_fused_alert = self.run_llm(prompt)
            fused_alert = raw_fused_alert.split('\n')[0].strip() 
            print(f"[Input Agent] Fused Translation: {fused_alert}")
            return fused_alert

        else:
            return str(payload) # Fallback for unknown payloads
        
    def supervisor_agent(self, clean_data: str) -> str:
        """Agent 2: Routes the alert to the correct domain department."""
        self.stream_progress("analyzing", "Swarm: Supervisor Agent evaluating alert for domain routing...")
        print("[Supervisor] Analyzing payload for routing...")
        
        clean_upper = clean_data.upper()
        
        # --- METHOD 1: THE SCORING ROUTER ---
        domain_keywords = {
            "LITHOGRAPHY": ["LITHOGRAPHY", "RIE", "ETCH", "PHOTORESIST", "UV", "MASK"],
            "DEPOSITION": ["TDMAT", "CVD", "ALD", "DEPOSITION", "PLASMA", "FILM"],
            "QUALITY": ["LEAKAGE", "YIELD", "ACCEPTANCE", "TEST", "VOLTAGE", "DEFECT"],
            # Removed the generic word "CURRENT" to prevent false alarms
            "PACKAGING": ["DICING", "BONDING", "PACKAGING", "GRINDING", "BACKGRINDING", "CRACKING", "SAW", "SCRATCH", "FRICTION"]
        }
        
        scores = {"LITHOGRAPHY": 0, "DEPOSITION": 0, "QUALITY": 0, "PACKAGING": 0}
        
        for domain, keywords in domain_keywords.items():
            for word in keywords:
                if word in clean_upper:
                    scores[domain] += 1
                    
        # Find the domain with the highest score
        best_domain = max(scores, key=scores.get)
        
        # If it found at least one match, route it!
        if scores[best_domain] > 0:
            self.stream_progress("analyzing", f"Swarm: Supervisor routed alert to {best_domain} expert via keywords.")
            print(f"[Supervisor] Keyword Match Routing to {best_domain} Expert. (Scores: {scores})")
            return best_domain
            
        # --- METHOD 2: FEW-SHOT AI ROUTING (Fallback if score is 0) ---
        self.stream_progress("analyzing", "Swarm: Supervisor falling back to AI classification...")
        prompt = f"""<|system|>
You are a strict factory routing API. Classify the alert into EXACTLY ONE of these categories based on definitions:
1. LITHOGRAPHY: Issues with light, photoresist, or etching.
2. DEPOSITION: Issues with CVD, ALD, or chemical films.
3. QUALITY: Issues with testing, yield, or electrical leakage.
4. PACKAGING: Issues with dicing, backgrinding, or mechanical physical damage.

Rule: Output the single category word ONLY. No explanations. No punctuation.<|end|>
<|user|>
ALERT: {clean_data}<|end|>
<|assistant|>"""
        
        raw_route = self.run_llm(prompt).upper()
        valid_domains = ["LITHOGRAPHY", "DEPOSITION", "QUALITY", "PACKAGING"]
        
        final_route = "UNKNOWN"
        for domain in valid_domains:
            if domain in raw_route:
                final_route = domain
                break
                
        if final_route == "UNKNOWN":
            print("[Supervisor] Warning: Swarm AI routing failed or offline. Defaulting to QUALITY domain expert.")
            final_route = "QUALITY"
            
        self.stream_progress("analyzing", f"Swarm: Routed to {final_route} domain expert.")
        print(f"[Supervisor] Route Result -> Routing to {final_route} Expert.")
        return final_route

    def domain_expert_agent(self, domain: str, sensor_text: str, raw_telemetry: dict = None) -> str:
        """Agents 4-7: Dynamically adapts based on Supervisor's route and raw data."""
        self.stream_progress("analyzing", f"Swarm: {domain} Expert searching manuals in ChromaDB vector database...")
        print(f"[Agent {domain}] Searching {domain} Vector Database for similar failures...")
        
        collection = self.collections.get(domain)
        if not collection:
            return json.dumps({"error": f"Knowledge base for {domain} not found."})

        # We search ChromaDB using the semantic text
        results = collection.query(query_texts=[sensor_text], n_results=2)
        context = ""
        
        # EDGE CASE FIX: Check if documents actually exist and aren't empty
        if results and results.get('documents') and len(results['documents'][0]) > 0:
            for doc in results['documents'][0]:
                context += doc + "\n\n"
        else:
            print(f"[Agent {domain}] WARNING: No matching manuals found in Vector DB!")
            context = "No specific manuals found in the database. Rely strictly on general semiconductor engineering best practices to diagnose this."

        # Format the raw telemetry so the AI can read it easily
        raw_data_string = json.dumps(raw_telemetry, indent=2) if raw_telemetry else "None provided."
                
        # THE NEW PROMPT: Now includes RAW TELEMETRY and SEMANTIC ALERT
        # THE NEW PROMPT: Aligned with Backend API Contract v1.0
        prompt = f"""<|system|>
You are the ThinkLink {domain} Expert Agent.
Analyze the provided sensor readings and the retrieved knowledge base documents to diagnose the failure.

CRITICAL RULES FOR OUTPUT:
1. You MUST output ONLY a valid JSON object. No markdown, no conversational text.
2. Use exactly this JSON schema. Do not invent new keys.

{{
  "level": "SAFE", "LOW", "MEDIUM", "HIGH", or "CRITICAL",
  "confidence": 95,
  "summary": "1 sentence summary of the issue.",
  "reasoning": "Detailed reasoning based on context.",
  "recommended_actions": ["notify_mobile", "shutdown_machine"],
  "should_create_incident": true,
  "category": "Name of the failure category"
}}<|end|>
<|user|>
RELEVANT KNOWLEDGE BASE CONTEXT:
{context}

RAW MACHINE TELEMETRY:
{raw_data_string}

SEMANTIC ALERT:
{sensor_text}

Analyze the data against the context and output the strict JSON.<|end|>
<|assistant|>"""
        
        self.stream_progress("analyzing", f"Swarm: {domain} Expert running diagnostic LLM reasoning...")
        print(f"[Agent {domain}] Generating JSON Diagnosis...")
        raw_output = self.run_llm(prompt)
        
        if "Error: AI engine is offline" in raw_output:
            print(f"[Agent {domain}] WARNING: AI engine is offline. Generating safe fallback JSON.")
            return json.dumps({
                "level": "MEDIUM",
                "confidence": 70,
                "summary": f"Semiconductor anomaly detected in {domain} area. Swarm AI is offline.",
                "reasoning": "Determined via fallback rules due to connection issues with model engine.",
                "recommended_actions": ["notify_mobile"],
                "should_create_incident": True,
                "category": f"{domain} Anomaly"
            })

        # --- HACKATHON BULLETPROOF JSON EXTRACTOR ---
        # This finds the first '{' and the last '}' and extracts ONLY what is inside, 
        # completely ignoring any conversational text the AI adds before or after.
        import re
        match = re.search(r'\{.*\}', raw_output, re.DOTALL)
        if match:
            clean_json = match.group(0)
        else:
            # Fallback in case the AI completely fails to make a JSON
            print(f"[Agent {domain}] WARNING: No JSON found in output.")
            clean_json = '{"error": "Failed to generate valid JSON.", "raw_output": "Check terminal."}'
            
        return clean_json
 
    def process_factory_alert(self, incoming_payload: dict) -> dict:
        """The main entry point for the FastAPI backend matching Contract v1.0."""
        req_id = incoming_payload.get("request_id", "REQ-UNKNOWN")
        self.stream_progress("analyzing", f"Swarm: Initializing collaborative safety diagnostics for {req_id}...")
        print("\n" + "="*60)
        
        # 1. Extract API Contract tracking data
        payload_type = incoming_payload.get("type", "unknown")
        raw_data = incoming_payload.get("data", {})
        
        # Track which modalities were provided for the final output
        mods_processed = {
            "telemetry": {"processed": False},
            "vision": {"processed": False},
            "voice": {"processed": False}
        }
        
        if payload_type == "combined":
            if raw_data.get("telemetry"): mods_processed["telemetry"]["processed"] = True
            if raw_data.get("image"): mods_processed["vision"]["processed"] = True
            if raw_data.get("audio"): mods_processed["voice"]["processed"] = True
        elif payload_type == "telemetry": mods_processed["telemetry"]["processed"] = True
        elif payload_type == "image": mods_processed["vision"]["processed"] = True
        elif payload_type == "audio": mods_processed["voice"]["processed"] = True

        try:
            # 2. Run the AI Pipeline (Input Translation -> Supervisor Routing -> Expert Diagnosis)
            clean_alert = self.input_agent(incoming_payload)
            target_domain = self.supervisor_agent(clean_alert)
            
            if target_domain not in self.collections:
                raise ValueError(f"Supervisor routed to unknown domain: {target_domain}")
                
            # The AI returns our core intelligence JSON
            ai_intelligence_str = self.domain_expert_agent(target_domain, clean_alert, raw_data)
            ai_intelligence = json.loads(ai_intelligence_str) # Convert string to dict
            
            # 3. Build the Final API Contract Response
            final_response = {
                "success": True,
                "request_id": req_id,
                "overall_risk": {
                    "level": ai_intelligence.get("level", "MEDIUM"),
                    "confidence": ai_intelligence.get("confidence", 85)
                },
                "summary": ai_intelligence.get("summary", "Analysis complete."),
                "reasoning": ai_intelligence.get("reasoning", "Based on swarm consensus."),
                "modalities": mods_processed,
                "recommended_actions": ai_intelligence.get("recommended_actions", []),
                "incident": {
                    "should_create": ai_intelligence.get("should_create_incident", True),
                    "category": ai_intelligence.get("category", "General Anomaly")
                }
            }
            
            self.stream_progress("monitoring", f"Swarm: Safety check complete. Risk: {ai_intelligence.get('level', 'MEDIUM')} | {ai_intelligence.get('summary')}")
            print(f"\n--- CONTRACT V1.0 OUTPUT DELIVERED FOR {req_id} ---")
            return final_response

        except Exception as e:
            # 4. Handle Errors according to the Contract (Test Case 9)
            print(f"[System] AI Processing Error: {e}")
            return {
                "success": False,
                "request_id": req_id,
                "error": {
                    "code": "AI_PROCESSING_ERROR",
                    "message": str(e)
                }
            }

# ==========================================
# 🧪 THE ULTIMATE SENSOR FUSION TEST SUITE
# ==========================================
if __name__ == "__main__":
    import os
    swarm = MasterOrchestrator()
    
    print("\n\n" + "🌪️"*5 + " RUNNING SENSOR FUSION TEST " + "🌪️"*5)
    
    # We combine all three inputs into a single "incident report"
    # combined_payload = {
    #     "type": "combined",
    #     "data": {
    #         "telemetry": {
    #             "machine_id": "Backgrinding_Tool_B",
    #             "spindle_rpm": 1200,
    #             "spindle_motor_current": "CRITICAL_HIGH",
    #             "coolant_flow_rate": "0.2_L/min",
    #             "status": "MECHANICAL_FRICTION_ALARM"
    #         },
    #         "audio": "test_audio.wav" if os.path.exists("test_audio.wav") else None,
    #         "image": "test_image.jpg" if os.path.exists("test_image.jpg") else None
    #     }
    # }

    # ---------------------------------------------------------
    # PRACTICAL TEST 1: THE CLOGGED SHOWERHEAD (DEPOSITION)
    # ---------------------------------------------------------
    combined_payload = {
        "request_id": "REQ-0007",   # <--- Added per the contract
        "type": "combined",
        "data": {
            "telemetry": {
                "machine_id": "Plasma_Chamber_3",
                "process": "CVD_Deposition",
                "chamber_pressure_mtorr": 2500,
                "status": "PRESSURE_SPIKE"
            },
            "audio": "test_audio.wav" if os.path.exists("test_audio.wav") else None,
            "image": "test_image.jpg" if os.path.exists("test_image.jpg") else None
        }
    }
    
    # Print the final result so you can verify it matches the contract!
    final_output = swarm.process_factory_alert(combined_payload)
    print(json.dumps(final_output, indent=2))
    
    # Send the massive combined payload to the AI
    swarm.process_factory_alert(combined_payload)