"""
Global Data Standardization
  - Resample all audio to 22,050 Hz
  - Convert to mono
  - Peak-normalize amplitude to [-1, 1]
"""

import pathlib
import numpy as np
import librosa
import soundfile as sf
from tqdm import tqdm

TARGET_SR = 22_050
WAVS_DIR = pathlib.Path(__file__).parent / "LJSpeech-1.1" / "wavs"


def standardize_audio(wav_path: pathlib.Path):
    """Resample to 22_050 Hz mono and peak-normalize a single wav file."""
    # Load at original sample rate; mono=True averages channels if stereo
    audio, sr = librosa.load(str(wav_path), sr=None, mono=True)

    # Resample if needed
    if sr != TARGET_SR:
        audio = librosa.resample(audio, orig_sr=sr, target_sr=TARGET_SR)

    # Peak normalization to [-1, 1]
    peak = np.max(np.abs(audio))
    if peak > 0:
        audio = audio / peak

    # Write back (16-bit PCM to match original LJSpeech format)
    sf.write(str(wav_path), audio, TARGET_SR, subtype="PCM_16")


def main_processor():
    wav_files = sorted(WAVS_DIR.glob("*.wav"))
    if not wav_files:
        print(f"No wav files found in {WAVS_DIR}")
        return

    print(f"Standardizing {len(wav_files)} files to {TARGET_SR} Hz / mono / peak-normalized …")

    for wav_path in tqdm(wav_files, desc="Phase 1", unit="file"):
        standardize_audio(wav_path)


if __name__ == "__main__":
    main_processor()
