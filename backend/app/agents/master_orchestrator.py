import os
import re
import json
import requests
import chromadb
from chromadb.utils import embedding_functions
from faster_whisper import WhisperModel
# from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

class MasterOrchestrator:
    def __init__(self):
        print("\n[System] Booting ThinkLink Multi-Agent Swarm...")
        
        self.script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # ========================================================
        # 1. LOAD GENIEX (The Snapdragon NPU Brain)
        # Replacing Phi-3/Ollama with the hardware-accelerated Qwen3
        # ========================================================
        self.geniex_url = "http://127.0.0.1:18181/v1/chat/completions"
        self.geniex_model = "Qwen3-8B"
        print(f"[System] AI Engine routing to Qualcomm NPU via GenieX ({self.geniex_url})")
            
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
        # print("[System] Loading Vision Engine (BLIP Base)...")
        # try:
        #     self.vision_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        #     self.vision_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        #     print("[System] Vision Engine Loaded Successfully (<1GB RAM).")
        # except Exception as e:
        #     print(f"[Warning] Failed to load BLIP Vision model: {e}")
        #     self.vision_model = None

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
        """
        Utility: All agents pass their prompts through this single brain.
        Now natively routed to the Snapdragon NPU via GenieX!
        """
        # 1. Parse the legacy Phi-3 formatted prompt into System and User messages
        system_match = re.search(r'<\|system\|>(.*?)<\|end\|>', prompt, re.DOTALL)
        user_match = re.search(r'<\|user\|>(.*?)<\|end\|>', prompt, re.DOTALL)
        
        system_text = system_match.group(1).strip() if system_match else "You are a highly capable industrial safety AI."
        user_text = user_match.group(1).strip() if user_match else prompt.replace('<|assistant|>', '').strip()
        
        # 2. Package for GenieX API
        payload = {
            "model": self.geniex_model,
            "messages": [
                {"role": "system", "content": system_text},
                {"role": "user", "content": user_text}
            ],
            "temperature": 0.1
        }
        
        try:
            # SENIOR FIX: Lowered timeout from 45 to 2 seconds so the server doesn't freeze!
            response = requests.post(self.geniex_url, json=payload, timeout=2.0)
            response.raise_for_status() 
            
            data = response.json()
            return data['choices'][0]['message']['content'].strip()
            
        except requests.exceptions.RequestException as e:
            # Fail fast and return a mock response so the system keeps moving!
            print(f"[Warning] AI offline (Timeout/Error). Returning Mock Response. Error: {e}")
            return "CRITICAL ALERT: Smoke detected. Mock AI override active."
    
    def input_agent(self, payload: dict) -> str:
        """
        Agent 1: Ingests Telemetry, Audio, or Images and normalizes them into text.
        Expected payload format: 
        { "type": "telemetry" | "audio" | "image", "data": <json_dict> | <file_path>, "notes": <optional_text> }
        """
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
            
            factory_jargon = "TDMAT, PACVD, Lithography, Inductively Coupled Plasma, RIE, Etcher, Sub-threshold leakage, Modulino, ChromaDB"
            
            segments, info = self.audio_model.transcribe(
                audio_file_path, 
                beam_size=5,
                initial_prompt=factory_jargon
            )
            transcription = "".join([segment.text for segment in segments])
            print(f"[Input Agent] Worker said: '{transcription}'")
            
            prompt = f"""<|system|>
Format this worker's raw voice transcription into a formal, 1-sentence factory alert.<|end|>
<|user|>
VOICE MEMO: {transcription}<|end|>
<|assistant|>"""
            formatted_alert = self.run_llm(prompt)
            return formatted_alert

      # ----------------------------------------
        # MODALITY 3: IMAGES (Camera Photos via Qwen3-VL)
        # ----------------------------------------
        elif payload_type == "image":
            self.stream_progress("analyzing", "Swarm: Input Agent analyzing machine photo (Qwen3-VL)...")
            print("[Input Agent] Analyzing Worker Photo via Snapdragon NPU...")
            
            image_path = payload.get("data")
            prompt = "You are a Senior Semiconductor Defect Translator. Look at this industrial machine photo and write a highly technical, 1-sentence factory alert about any visible defects, smoke, or anomalies."
            
            translated_alert = self.run_vlm(image_path, prompt)
            print(f"[Input Agent] Vision Alert: '{translated_alert}'")
            return translated_alert
                
            image_path = payload.get("data")
            
            raw_image = Image.open(image_path).convert('RGB')
            inputs = self.vision_processor(raw_image, return_tensors="pt")
            out = self.vision_model.generate(**inputs)
            vision_analysis = self.vision_processor.decode(out[0], skip_special_tokens=True)
            
            print(f"[Input Agent] Raw Vision Analysis: '{vision_analysis}'")
            
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
            import os
            if image_path and os.path.exists(image_path):
                self.stream_progress("analyzing", "Swarm: Input Agent analyzing camera photo...")
                print("[Input Agent] Analyzing Image...")
                vision_text = self.run_vlm(image_path, "Describe the industrial machinery in this image, focusing ONLY on visible defects, smoke, leaks, or anomalies in one concise sentence. If normal, state 'Machinery appears visually nominal.'")
                print(f"[Input Agent] Vision Caption: '{vision_text}'")
                
            # 4. SENSOR FUSION: Synthesize all 3 inputs into ONE alert
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
            return str(payload) 
        
    def run_vlm(self, image_path: str, prompt_text: str) -> str:
        """
        Native Vision-Language routing to Qualcomm NPU via GenieX.
        Replaces BLIP entirely.
        """
        import os
        
        if not os.path.exists(image_path):
            return f"Error: Image not found at {image_path}"
            
        # GenieX accepts absolute file URIs for local execution!
        abs_path = os.path.abspath(image_path).replace("\\", "/")
        file_url = f"file:///{abs_path}"

        payload = {
            "model": "ai-hub-models/Qwen3-VL-4B-Instruct", # The new AI Hub model
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt_text},
                        {"type": "image_url", "image_url": {"url": file_url}}
                    ]
                }
            ],
            "max_tokens": 150,
            "temperature": 0.1
        }
        
        try:
            response = requests.post(self.geniex_url, json=payload, timeout=10.0)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content'].strip()
        except Exception as e:
            print(f"[ERROR] Vision AI offline via GenieX: {e}")
            return "Visual analysis failed due to backend timeout."

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
            "PACKAGING": ["DICING", "BONDING", "PACKAGING", "GRINDING", "BACKGRINDING", "CRACKING", "SAW", "SCRATCH", "FRICTION"]
        }
        
        scores = {"LITHOGRAPHY": 0, "DEPOSITION": 0, "QUALITY": 0, "PACKAGING": 0}
        
        for domain, keywords in domain_keywords.items():
            for word in keywords:
                if word in clean_upper:
                    scores[domain] += 1
                    
        best_domain = max(scores, key=scores.get)
        
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

        results = collection.query(query_texts=[sensor_text], n_results=2)
        context = ""
        
        if results and results.get('documents') and len(results['documents'][0]) > 0:
            for doc in results['documents'][0]:
                context += doc + "\n\n"
        else:
            print(f"[Agent {domain}] WARNING: No matching manuals found in Vector DB!")
            context = "No specific manuals found in the database. Rely strictly on general semiconductor engineering best practices to diagnose this."

        raw_data_string = json.dumps(raw_telemetry, indent=2) if raw_telemetry else "None provided."
                
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

        import re
        match = re.search(r'\{.*\}', raw_output, re.DOTALL)
        if match:
            clean_json = match.group(0)
        else:
            print(f"[Agent {domain}] WARNING: No JSON found in output.")
            clean_json = '{"error": "Failed to generate valid JSON.", "raw_output": "Check terminal."}'
            
        return clean_json

    def visual_qa(self, image_path: str, question: str) -> dict:
        """
        Uses Qwen3-VL-4B to answer a specific question about an industrial image in one step.
        """
        self.stream_progress("analyzing", "Swarm: AI running Visual Q&A...")
        print(f"[Visual Q&A] Analyzing image: {image_path} with question: {question}")
        
        prompt = f"""You are an expert industrial safety assistant. 
An operator has taken this photo and asked a question about it.
Answer the user's question directly, clearly, and concisely, keeping it under 3-4 sentences.
If there are safety concerns visible in the image, highlight them immediately.

Question: {question}"""

        answer = self.run_vlm(image_path, prompt)
        print(f"[Visual Q&A] Answer: '{answer}'")
        
        return {
            "success": "Visual analysis failed" not in answer,
            "answer": answer,
            "caption": "Native VLM Analysis", # Legacy field kept for frontend compatibility
            "question": question
        }

    def process_factory_alert(self, incoming_payload: dict) -> dict:
        """The main entry point for the FastAPI backend matching Contract v1.0."""
        req_id = incoming_payload.get("request_id", "REQ-UNKNOWN")
        self.stream_progress("analyzing", f"Swarm: Initializing collaborative safety diagnostics for {req_id}...")
        print("\n" + "="*60)
        
        payload_type = incoming_payload.get("type", "unknown")
        raw_data = incoming_payload.get("data", {})
        
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
            clean_alert = self.input_agent(incoming_payload)
            target_domain = self.supervisor_agent(clean_alert)
            
            if target_domain not in self.collections:
                raise ValueError(f"Supervisor routed to unknown domain: {target_domain}")
                
            ai_intelligence_str = self.domain_expert_agent(target_domain, clean_alert, raw_data)
            ai_intelligence = json.loads(ai_intelligence_str) 
            
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
            print(f"[System] AI Processing Error: {e}")
            return {
                "success": False,
                "request_id": req_id,
                "error": {
                    "code": "AI_PROCESSING_ERROR",
                    "message": str(e)
                }
            }

# Create a singleton instance so you can easily import it into main.py or your websockets
orchestrator_agent = MasterOrchestrator()

if __name__ == "__main__":
    import os
    swarm = orchestrator_agent
    
    print("\n\n" + "🌪️"*5 + " RUNNING SENSOR FUSION TEST " + "🌪️"*5)
    
    combined_payload = {
        "request_id": "REQ-0007", 
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
    
    final_output = swarm.process_factory_alert(combined_payload)
    print(json.dumps(final_output, indent=2))