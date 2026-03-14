import torch
import intel_extension_for_pytorch as ipex

print(f"PyTorch Version: {torch.__version__}")
print(f"IPEX Version: {ipex.__version__}")
print(f"XPU Available: {torch.xpu.is_available()}")

if hasattr(torch, "xpu") and torch.xpu.is_available():
    print(f"Device Name: {torch.xpu.get_device_name(0)}")