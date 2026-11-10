#!/usr/bin/env bash
# Every walk (Kling O3 clips) → a frame sequence the scroll scrubs.
#   bash tools/build-seqs.sh            (all)      bash tools/build-seqs.sh t2   (one)
# Output: assets/media/sequences/<id>/{d,m}/0001.webp ...   d = 1280 wide, m = 960 wide
# The last XFADE frames blend into the still the site shows when you arrive, so the hand-off
# from the walk to the room (or the beach) has no seam.
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets/media"
FPS=15
XFADE=5
# id : clip : still we arrive at
SPECS="enter:transitions/v2/enter-kling.mp4:rooms/studio-1280.webp
t1:transitions/v2/t1-kling.mp4:rooms/business-1280.webp
t2:transitions/v2/t2-pro.mp4:rooms/events-1280.webp
t3:transitions/v2/t3-kling.mp4:rooms/ai-1280.webp
t4:transitions/v2/t4-kling.mp4:rooms/office-1280.webp
exit:transitions/v2/exit-kling.mp4:rooms/beach-1280.webp"

for spec in $SPECS; do
  IFS=: read -r id vid still <<<"$spec"
  [ $# -gt 0 ] && [ "$1" != "$id" ] && continue
  out=sequences/$id
  rm -rf "$out"; mkdir -p "$out/d" "$out/m" "$out/tmp"
  ffmpeg -v error -y -i "$vid" -vf "fps=$FPS,scale=1280:714:flags=lanczos,setsar=1" "$out/tmp/%04d.png"
  n=$(ls "$out/tmp" | wc -l)
  ffmpeg -v error -y -i "$still" -vf "scale=1280:714:flags=lanczos,setsar=1" "$out/tmp/still.png"
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
  echo "$id: $n frames $(du -sh "$out/d" | cut -f1) / $(du -sh "$out/m" | cut -f1)"
done
