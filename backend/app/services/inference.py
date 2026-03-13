"""
Inference service.
Loads the trained PyTorch model from the model/ directory and runs predictions.
"""
import sys
import pathlib
import torch

# ---------------------------------------------------------------------------
# Make the sibling `model/` directory importable so we can reuse data-loading
# and architecture code directly from the training codebase.
# ---------------------------------------------------------------------------
MODEL_DIR = pathlib.Path(__file__).resolve().parents[4] / "model"
if str(MODEL_DIR) not in sys.path:
    sys.path.insert(0, str(MODEL_DIR))

# Lazy-loaded model singleton
_model = None
_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Path to saved weights – update this once you export your trained checkpoint.
WEIGHTS_PATH = MODEL_DIR / "weights" / "sandhi_model.pt"


def _load_model():
    """Load and cache the model from disk."""
    global _model
    if _model is not None:
        return _model

    if not WEIGHTS_PATH.exists():
        raise FileNotFoundError(
            f"Model weights not found at {WEIGHTS_PATH}. "
            "Please train and export the model first."
        )

    # TODO: replace SandhiModel with your actual model class from model/main.py
    # from main import SandhiModel
    # _model = SandhiModel()
    # _model.load_state_dict(torch.load(WEIGHTS_PATH, map_location=_device))
    # _model.eval()
    # _model.to(_device)

    return _model


async def run_inference(audio_bytes: bytes) -> dict:
    """
    Run model inference on raw audio bytes.
    Returns a dict with prediction results.
    """
    # TODO: implement real pre-processing + inference once the model API is stable.
    # model = _load_model()
    # tensor = preprocess(audio_bytes).to(_device)
    # with torch.no_grad():
    #     output = model(tensor)
    # return postprocess(output)

    return {"message": "Inference placeholder – model not yet loaded."}
