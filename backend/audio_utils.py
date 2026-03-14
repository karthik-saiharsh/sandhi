import base64
import io
import librosa
import numpy as np
import soundfile as sf
import random

SAMPLE_RATE = 22050
CLIP_SAMPLES = 22050 # 1 second matching the notebook architecture

def parse_audio_file(file_bytes):
    """Parses uploaded audio file using librosa explicitly. We resample to 22_050Hz and mono."""
    audio, sr = librosa.load(io.BytesIO(file_bytes), sr=SAMPLE_RATE, mono=True)
    
    # Peak normalization like data-pre-processing.py
    peak = np.max(np.abs(audio))
    if peak > 0:
        audio = audio / peak
        
    return audio

def apply_packet_loss(audio, loss_percentage=30):
    """
    Simulates packet loss using the dataset approach.
    We just zero out chunks of data.
    """
    mask = np.ones_like(audio)
    packet_length = int(SAMPLE_RATE * 0.05) # 50 milliseconds per packet
    num_packets = len(audio) // packet_length
    
    # Calculate how many packets to drop
    packets_to_drop = int(num_packets * (float(loss_percentage) / 100.0))
    
    if num_packets > 0 and packets_to_drop > 0:
        drop_indices = random.sample(range(num_packets), min(packets_to_drop, num_packets))
        for idx in drop_indices:
            start = idx * packet_length
            end = start + packet_length
            mask[start:end] = 0.0
            
    masked_audio = audio * mask
    return masked_audio

def waveform_to_base64(audio):
    """Converts numpy array to base64 encoded wav string."""
    buffer = io.BytesIO()
    sf.write(buffer, audio, SAMPLE_RATE, format='WAV', subtype='PCM_16')
    buffer.seek(0)
    return base64.b64encode(buffer.read()).decode('utf-8')
