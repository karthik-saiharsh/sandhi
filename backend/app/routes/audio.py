from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.inference import run_inference

router = APIRouter()


@router.post("/process")
async def process_audio(file: UploadFile = File(...)):
    """
    Accept an audio file, run model inference, and return the result.
    """
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="File must be an audio file.")

    audio_bytes = await file.read()
    result = await run_inference(audio_bytes)
    return {"result": result}
