import os
import requests
import tarfile
from urllib.parse import urlparse

# Settings
RELEASE_URL = "https://github.com/karthik-saiharsh/sandhi/releases/download/1.1.0/models.tar.gz"
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
ARCHIVE_PATH = os.path.join(MODELS_DIR, "models.tar.gz")
GENERATOR_MODEL_NAME = "sandhi_generator.pth"
TARGET_MODEL_PATH = os.path.join(MODELS_DIR, "generator.pth")

def download_model():
    if os.path.exists(TARGET_MODEL_PATH):
        print("Model already exists locally. Skipping download.")
        return

    os.makedirs(MODELS_DIR, exist_ok=True)
    
    print(f"Downloading model from {RELEASE_URL}...")
    try:
        response = requests.get(RELEASE_URL, stream=True)
        response.raise_for_status()
        
        with open(ARCHIVE_PATH, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        print("Download complete. Extracting...")
        
        with tarfile.open(ARCHIVE_PATH, "r:gz") as tar:
            # We only need the generator
            member = tar.getmember(GENERATOR_MODEL_NAME)
            
            # Extract and rename
            member.name = "generator.pth"
            tar.extract(member, path=MODELS_DIR)
            print(f"Extracted {GENERATOR_MODEL_NAME} to {TARGET_MODEL_PATH}")
            
    except Exception as e:
        print(f"Failed to download or extract model: {e}")
        # Clean up partial files
        if os.path.exists(ARCHIVE_PATH):
            os.remove(ARCHIVE_PATH)
        if os.path.exists(TARGET_MODEL_PATH):
            os.remove(TARGET_MODEL_PATH)
        raise e
    finally:
        # Clean up archive
        if os.path.exists(ARCHIVE_PATH):
            os.remove(ARCHIVE_PATH)
            
if __name__ == "__main__":
    download_model()
