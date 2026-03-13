"""
Utility helpers for audio processing.
"""
import io
import numpy as np


def bytes_to_numpy(audio_bytes: bytes, sample_rate: int = 22050) -> np.ndarray:
    """
    Convert raw audio bytes to a numpy float32 array.
    Requires librosa or soundfile to be installed.
    """
    try:
        import soundfile as sf
        audio, sr = sf.read(io.BytesIO(audio_bytes))
        return audio.astype(np.float32), sr
    except Exception as e:
        raise ValueError(f"Failed to decode audio: {e}") from e
