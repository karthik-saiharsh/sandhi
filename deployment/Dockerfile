# ============================================================
# Sandhi – Multi-stage Dockerfile
# ── Stage 1: Build React frontend
# ── Stage 2: Run FastAPI backend + serve frontend static files
# ============================================================

# ── Stage 1: Frontend build ──────────────────────────────────
FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build          # outputs to /app/frontend/dist

# ── Stage 2: Backend runtime ─────────────────────────────────
FROM python:3.11-slim AS backend

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy trained model weights (adjust path as needed)
COPY model/ ./model/

# Copy frontend build output
COPY --from=frontend-build /app/frontend/dist ./backend/static/

# Expose port
EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
