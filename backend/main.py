import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import torch
import uvicorn
from contextlib import asynccontextmanager

from .download_model import download_model
from .inference import load_model, reconstruct_waveform
from .audio_utils import parse_audio_file, apply_packet_loss, waveform_to_base64

model = None
device = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, device
    print("Startup: Checking for models...")
    try:
        download_model()
    except Exception as e:
        print(f"Failed to download model: {e}")
        
    print("Startup: Loading model...")
    try:
        model, device = load_model()
        print("Startup: Model initialized.")
    except Exception as e:
        print(f"Failed to load model: {e}")
    yield

app = FastAPI(lifespan=lifespan)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/reconstruct")
async def reconstruct(
    audio_file: UploadFile = File(...),
    loss_percentage: float = Form(30.0)
):
    global model, device
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")

    try:
        audio_bytes = await audio_file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read upload file: {str(e)}")

    try:
        # Load audio
        original_audio = parse_audio_file(audio_bytes)
        
        # Apply simulated mask
        masked_audio = apply_packet_loss(original_audio, loss_percentage)
        
        # Run inference 
        # Convert to tensor
        masked_tensor = torch.tensor(masked_audio, dtype=torch.float32)
        reconstructed_audio = reconstruct_waveform(model, device, masked_tensor)
        
        # Return Base64 responses
        return {
            "original_audio": waveform_to_base64(original_audio),
            "masked_audio": waveform_to_base64(masked_audio),
            "reconstructed_audio": waveform_to_base64(reconstructed_audio)
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Audio processing failure: {str(e)}")


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
