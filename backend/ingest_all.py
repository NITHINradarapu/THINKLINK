import os
import chromadb
from chromadb.utils import embedding_functions

# --- THE MAGIC FIX: CHUNKING ---
def chunk_text(text, chunk_size=1000, overlap=200):
    """Slices massive text into smaller chunks with a slight overlap so no sentences are cut in half."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

def ingest_agent_knowledge():
    print("[System] Connecting to ThinkLink Knowledge Base...")
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "thinklink_knowledge")
    client = chromadb.PersistentClient(path=db_path)
    ef = embedding_functions.DefaultEmbeddingFunction()

    agent_mappings = {
        "agent4_litho_collection": "knowledge_base/agent4_litho",
        "agent5_depo_collection": "knowledge_base/agent5_depo",
        "agent6_quality_collection": "knowledge_base/agent6_quality",
        "agent7_packaging_collection": "knowledge_base/agent7_packaging"
    }

    for collection_name, folder_path in agent_mappings.items():
        print(f"\n--- Loading {collection_name} ---")
        # Reset the collection just in case
        try:
            client.delete_collection(name=collection_name)
        except:
            pass
            
        collection = client.create_collection(name=collection_name, embedding_function=ef)
        
        if not os.path.exists(folder_path):
            print(f"[Warning] Folder {folder_path} not found. Skipping...")
            continue

        for filename in os.listdir(folder_path):
            if filename.endswith(".md"):
                file_path = os.path.join(folder_path, filename)
                
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # SLICE THE DOCUMENT INTO CHUNKS!
                chunks = chunk_text(content, chunk_size=1000, overlap=150)
                
                docs = []
                metadatas = []
                ids = []
                
                for i, chunk in enumerate(chunks):
                    docs.append(chunk)
                    metadatas.append({"source": filename, "chunk_index": i})
                    ids.append(f"{filename.replace('.md', '')}_chunk_{i}")
                
                # Push the bite-sized chunks to the database
                collection.upsert(
                    documents=docs,
                    metadatas=metadatas,
                    ids=ids
                )
                print(f" -> Successfully ingested {filename} (Split into {len(chunks)} chunks)")

if __name__ == "__main__":
    ingest_agent_knowledge()
    print("\n[SUCCESS] All Multi-Agent Knowledge Bases populated with chunked data!")