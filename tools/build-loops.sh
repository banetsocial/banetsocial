#!/usr/bin/env bash
# The living loops (Kling O3, locked camera, first frame = last frame) → small silent MP4s the
# canvas draws instead of the still while you stand in a room, outside, or on the beach.
#   bash tools/build-loops.sh
# Output: assets/media/loops/<scene>-{d,m}.mp4   d = 1280x714, m = 960x536
# If assets/media/arch/<scene>.png exists (the real next room seen through the arch, same patch as
# on the room still), it is laid over the loop so the loop and the still show the same doorway.
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets/media/loops"
for src in src/*.mp4; do
  n=$(basename "$src" .mp4)
  base="[0]scale=1280:714:flags=lanczos,setsar=1[v]"
  if [ -f "../arch/$n.png" ]; then in=(-i "../arch/$n.png"); mix="$base;[v][1]overlay=format=auto"; else in=(); mix="$base;[v]null"; fi
  ffmpeg -v error -y -i "$src" "${in[@]}" -an -filter_complex "$mix,format=yuv420p" \
    -c:v libx264 -preset slow -crf 26 -profile:v high -movflags +faststart "$n-d.mp4"
  ffmpeg -v error -y -i "$src" "${in[@]}" -an -filter_complex "$mix,scale=960:536:flags=lanczos,format=yuv420p" \
    -c:v libx264 -preset slow -crf 28 -profile:v main -movflags +faststart "$n-m.mp4"
  echo "$n: $(du -h "$n-d.mp4" | cut -f1) / $(du -h "$n-m.mp4" | cut -f1)"
done
