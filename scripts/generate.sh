#!/usr/bin/env bash
# scripts/generate.sh — Scaffold a card news project and run image generation
#
# Usage:
#   ./scripts/generate.sh <topic> [slides] [output-dir]
#
# Environment:
#   GEMINI_API_KEY  — required for image generation (skipped if not set)
#
# Examples:
#   ./scripts/generate.sh "도쿄 벚꽃 명소 TOP 7"
#   ./scripts/generate.sh "AI 트렌드 2025" 10 output/ai-trends
#   GEMINI_API_KEY=... ./scripts/generate.sh "Sustainable Fashion"

set -euo pipefail

TOPIC="${1:-}"
SLIDES="${2:-7}"
OUTPUT="${3:-}"

if [[ -z "$TOPIC" ]]; then
  echo "Usage: $0 <topic> [slides] [output-dir]" >&2
  exit 1
fi

# Resolve mmk-cn binary: PATH first, then ./dist/mmk-cn
if command -v mmk-cn &>/dev/null; then
  MMK_CN=mmk-cn
elif [[ -f "./dist/mmk-cn" ]]; then
  MMK_CN="./dist/mmk-cn"
else
  echo "ERROR: mmk-cn binary not found. Run 'make build' first." >&2
  exit 1
fi

# Derive output directory from topic slug if not provided
if [[ -z "$OUTPUT" ]]; then
  SLUG=$(echo "$TOPIC" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9]/-/g' \
    | sed 's/-\+/-/g' \
    | sed 's/^-//;s/-$//' \
    | cut -c1-40)
  OUTPUT="output/${SLUG}"
fi

echo "=== Card News Generator ==="
echo "Topic:   ${TOPIC}"
echo "Slides:  ${SLIDES}"
echo "Output:  ${OUTPUT}"
echo ""

# Step 1: Scaffold (skip if directory already exists)
if [[ -d "$OUTPUT" ]]; then
  echo "[scaffold] Directory already exists, skipping: ${OUTPUT}"
else
  echo "[scaffold] Running mmk-cn new..."
  "$MMK_CN" new "$TOPIC" --slides "$SLIDES" --output "$OUTPUT"
  echo "[scaffold] Done: ${OUTPUT}"
fi

echo ""

# Step 2: Image generation (requires batch.json + GEMINI_API_KEY)
BATCH="${OUTPUT}/batch.json"

if [[ ! -f "$BATCH" ]]; then
  echo "[imagegen] No batch.json found at ${BATCH}"
  echo "[imagegen] Skipping image generation."
  echo "           (Claude should write batch.json before running imagegen)"
elif [[ -z "${GEMINI_API_KEY:-}" ]]; then
  echo "[imagegen] GEMINI_API_KEY is not set, skipping image generation."
  echo "           Set GEMINI_API_KEY=... and re-run to generate images."
else
  echo "[imagegen] Running batch image generation..."
  "$MMK_CN" imagegen \
    --batch "$BATCH" \
    --aspect-ratio 3:4 \
    --image-size 2K
  echo "[imagegen] Done."
fi

echo ""
echo "=== Complete: ${OUTPUT} ==="
