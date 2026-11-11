#!/usr/bin/env bash
# Renders tools/og-card.html to assets/media/brand/og.jpg (1200x630, the share-card picture).
# Needs Chrome and ffmpeg. Keep the result under ~300 KB, or WhatsApp may skip the picture.
set -e
cd "$(dirname "$0")/.."
TMP="$(mktemp -d)"
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --virtual-time-budget=6000 --window-size=1200,630 \
  --screenshot="$(cygpath -w "$TMP/og.png")" "file:///$(cygpath -m "$PWD/tools/og-card.html")" 2>/dev/null
ffmpeg -loglevel error -y -i "$TMP/og.png" -vf scale=1200:630 -q:v 3 assets/media/brand/og.jpg
ls -la assets/media/brand/og.jpg
