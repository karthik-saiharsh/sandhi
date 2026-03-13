# Sandhi

> **Audio processing application powered by PyTorch + FastAPI + React**

---

## Repository Structure

```
sandhi/
├── model/          # Training & experimentation (do not modify)
├── backend/        # FastAPI inference server
├── frontend/       # React + Vite + Tailwind UI
├── deployment/     # Dockerfile & dev launcher
└── README.md
```

---

## Quick Start (Development)

```bash
# From the repo root
chmod +x deployment/start.sh
./deployment/start.sh
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:5173        |
| Backend  | http://localhost:8000        |
| API Docs | http://localhost:8000/docs   |

---

## Backend (`/backend`)

**Stack:** FastAPI · PyTorch · uvicorn · soundfile

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Wiring in model weights

The inference service (`app/services/inference.py`) automatically adds the sibling
`model/` directory to `sys.path`. Once you export a trained checkpoint, update
`WEIGHTS_PATH` in that file and implement the `_load_model()` TODO.

---

## Frontend (`/frontend`)

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · wavesurfer.js

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:8000` so no
CORS configuration is needed during development.

---

## Docker (Production)

```bash
# Build from repo root
docker build -f deployment/Dockerfile -t sandhi .

# Run
docker run -p 8000:8000 sandhi
```

The container serves the compiled React app as static files from FastAPI, so only
one port is needed in production.

---

## Model Training

See [`model/README.md`](model/README.md) for training instructions. The `model/`
directory is intentionally kept separate and should **not** be modified by the
application layer.
