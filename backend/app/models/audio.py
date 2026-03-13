from pydantic import BaseModel
from typing import Optional


class AudioResponse(BaseModel):
    """Response schema for audio processing endpoints."""
    result: dict
    message: Optional[str] = None
