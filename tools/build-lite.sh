#!/usr/bin/env bash
# A light copy of every walk for slow connections: every 3rd frame, 480 wide (about 10 KB each,
# 0.4 MB a walk instead of 5 MB). The site loads these first, so a walk moves within a second or
# two even on a weak line, and swaps in the full frames as they arrive.
#   bash tools/build-lite.sh            (all)      bash tools/build-lite.sh t2   (one)
# Output: assets/media/sequences/<id>/l/0001.webp, 0004.webp, ...  (same numbering as d/)
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets/media/sequences"
STEP=3
for id in */; do
  id=${id%/}
  [ $# -gt 0 ] && [ "$1" != "$id" ] && continue
  rm -rf "$id/l"; mkdir -p "$id/l"
  n=$(ls "$id/d" | wc -l)
  for i in $(seq 1 $STEP "$n"); do
    b=$(printf '%04d' "$i")
    ffmpeg -v error -y -i "$id/d/$b.webp" -vf "scale=480:268:flags=lanczos" -c:v libwebp -quality 40 "$id/l/$b.webp"
  done
  echo "$id: $(ls "$id/l" | wc -l) lite frames, $(du -sk "$id/l" | cut -f1) KB"
done
