#!/bin/sh
# Build YouTube Playables submission ZIP (index.html + bundled assets).
# Output: deep-catch-playables.zip at repo root
set -e
cd "$(dirname "$0")/.."
rm -f deep-catch-playables.zip
zip -r deep-catch-playables.zip index.html assets/icon.png
ls -lh deep-catch-playables.zip
echo "Bundle ready. Upload via Playables Developer Portal."
