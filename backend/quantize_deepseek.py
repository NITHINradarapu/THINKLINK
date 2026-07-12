import qai_hub as hub

# 1. Import the specific export pipeline for the quantized Llama 3 model
from qai_hub_models.models.llama_v3_8b_chat_quantized.export import export_model

print("Fetching pre-quantized Llama 3 8B from Qualcomm AI Hub...")

# 2. Target your Snapdragon Chip
target_device = "Snapdragon X Elite Compute Platform"

print("Submitting compile job to Qualcomm Cloud...")

# 3. Use the built-in export pipeline
# This automatically handles the correct input shapes, quantization parameters, 
# and cloud submission specifically tailored for Llama 3.
exported_assets = export_model(
    device=target_device,
    skip_profiling=True,
    skip_inferencing=True
)

print("SUCCESS! Model compiled and ready for the Snapdragon NPU.")
print("Check your working directory or the Qualcomm AI Hub web dashboard for your downloaded QNN files!")