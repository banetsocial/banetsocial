#!/usr/bin/env bash
# The walk in through the front door (Kling O3 clip) → a frame sequence the scroll scrubs.
#   bash tools/build-enter.sh
# Output: assets/media/sequences/enter/{d,m}/0001.webp ...
#   d = 1280 wide (desktop), m = 960 wide (phones; drawn as a centre "cover" crop)
# The last XFADE frames are blended into the studio still the site shows at rest, so the
# hand-off from the video to the room is invisible.
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets/media"
FPS=15
XFADE=5
VID=transitions/v2/enter-kling.mp4
STILL=rooms/studio-1280.webp
out=sequences/enter
rm -rf "$out"; mkdir -p "$out/d" "$out/m" "$out/tmp"

ffmpeg -v error -y -i "$VID" -vf "fps=$FPS,scale=1280:714:flags=lanczos,setsar=1" "$out/tmp/%04d.png"
n=$(ls "$out/tmp" | wc -l)
ffmpeg -v error -y -i "$STILL" -vf "scale=1280:714:flags=lanczos,setsar=1" "$out/tmp/still.png"
for k in $(seq 1 $XFADE); do
  i=$((n - XFADE + k)); f=$(printf '%s/tmp/%04d.png' "$out" $i)
  a=$(awk -v k=$k -v x=$XFADE 'BEGIN{printf "%.3f", k/x}')
  ffmpeg -v error -y -i "$f" -i "$out/tmp/still.png" -filter_complex "[0][1]blend=all_expr='A*(1-$a)+B*$a'" "$f.x.png" && mv "$f.x.png" "$f"
done
rm "$out/tmp/still.png"
for f in "$out"/tmp/*.png; do
  b=$(basename "$f" .png)
  ffmpeg -v error -y -i "$f" -c:v libwebp -quality 74 "$out/d/$b.webp"
  ffmpeg -v error -y -i "$f" -vf "scale=960:-2:flags=lanczos" -c:v libwebp -quality 70 "$out/m/$b.webp"
done
rm -rf "$out/tmp"
echo "enter: $n frames"; du -sh "$out/d" "$out/m"
