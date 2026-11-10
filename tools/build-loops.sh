#!/usr/bin/env bash
# The living loops (Kling O3, locked camera, first frame = last frame) → small silent MP4s the
# canvas draws instead of the still while you stand in a room, outside, or on the beach.
#   bash tools/build-loops.sh
# Output: assets/media/loops/<scene>-{d,m}.mp4   d = 1280x714, m = 960x536
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets/media/loops"
for src in src/*.mp4; do
  n=$(basename "$src" .mp4)
  ffmpeg -v error -y -i "$src" -an -vf "scale=1280:714:flags=lanczos,setsar=1,format=yuv420p" \
    -c:v libx264 -preset slow -crf 26 -profile:v high -movflags +faststart "$n-d.mp4"
  ffmpeg -v error -y -i "$src" -an -vf "scale=960:536:flags=lanczos,setsar=1,format=yuv420p" \
    -c:v libx264 -preset slow -crf 28 -profile:v main -movflags +faststart "$n-m.mp4"
  echo "$n: $(du -h "$n-d.mp4" | cut -f1) / $(du -h "$n-m.mp4" | cut -f1)"
done
