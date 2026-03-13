from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import audio

app = FastAPI(
    title="Sandhi API",
    description="Backend API for the Sandhi audio processing application.",
    version="0.1.0",
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(audio.router, prefix="/api/audio", tags=["audio"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}
