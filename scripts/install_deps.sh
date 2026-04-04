#!/bin/bash
set -e

# Build Go CLI if not already built
if [ ! -f "$CLAUDE_PROJECT_DIR/dist/mmk-cn" ]; then
  echo "Building mmk-cn CLI..."
  cd "$CLAUDE_PROJECT_DIR"
  make build
  echo "✓ mmk-cn built"
else
  echo "✓ mmk-cn already exists"
fi

exit 0
