#!/usr/bin/env bash
# ============================================================
# start.sh – Local development launcher for Sandhi
# Starts the FastAPI backend and Vite frontend concurrently.
# ============================================================

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 Starting Sandhi..."

# ── Backend ─────────────────────────────────────────────────
echo "  → Starting FastAPI backend on http://localhost:8000"
cd "$ROOT_DIR/backend"

if [ ! -d ".venv" ]; then
  echo "  → Creating Python virtual environment..."
  python3 -m venv .venv
fi

source .venv/bin/activate
pip install -q -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# ── Frontend ─────────────────────────────────────────────────
echo "  → Starting Vite frontend on http://localhost:5173"
cd "$ROOT_DIR/frontend"
npm install -q
npm run dev &
FRONTEND_PID=$!

# ── Cleanup on exit ──────────────────────────────────────────
cleanup() {
  echo ""
  echo "Stopping servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo ""
echo "  Backend  → http://localhost:8000"
echo "  Frontend → http://localhost:5173"
echo "  API Docs → http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop."
wait
