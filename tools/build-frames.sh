#!/usr/bin/env bash
# Turns room stills + transition videos into what the site loads.
#   bash tools/build-frames.sh
# Output:
#   assets/media/rooms/<room>-{1280,720}.webp   + <room>-lqip.txt (tiny blurred placeholder)
#   assets/media/sequences/<t>/{d,m}/0001.webp ... d = desktop (856px, source size of the drafts), m = mobile (crop of the center, 540px tall-friendly)
# The last 6 frames of every transition are crossfaded into the next room's still so the hand-off is invisible.
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/assets/media"
FPS=15
XFADE=6

declare -A STILL=( [studio]=stills/v5-studio.png [business]=stills/v5-business.png [events]=stills/v5-events.png [ai]=stills/v5-ai.png [office]=stills/v4-office.png )
mkdir -p rooms
for r in "${!STILL[@]}"; do
  ffmpeg -v error -y -i "${STILL[$r]}" -vf "scale=1280:-2:flags=lanczos" -c:v libwebp -quality 80 "rooms/$r-1280.webp"
  ffmpeg -v error -y -i "${STILL[$r]}" -vf "scale=720:-2:flags=lanczos" -c:v libwebp -quality 78 "rooms/$r-720.webp"
  ffmpeg -v error -y -i "${STILL[$r]}" -vf "scale=24:-2,gblur=sigma=0.8" -c:v libwebp -quality 40 "rooms/$r-lqip.webp"
  printf 'data:image/webp;base64,%s' "$(base64 -w0 "rooms/$r-lqip.webp")" > "rooms/$r-lqip.txt"; rm -f "rooms/$r-lqip.webp"
done

# transition id : video : next room
for spec in "t1:transitions/t1-studio-business.mp4:business" "t2:transitions/t2-business-events.mp4:events" \
            "t3:transitions/t3-events-ai.mp4:ai" "t4:transitions/t4-ai-office.mp4:office"; do
  IFS=: read -r t vid next <<<"$spec"
  out="sequences/$t"; rm -rf "$out"; mkdir -p "$out/d" "$out/m" "$out/tmp"
  # 1) resample to 15 fps at 856x478
  ffmpeg -v error -y -i "$vid" -vf "fps=$FPS,scale=856:478:flags=lanczos,setsar=1" "$out/tmp/%04d.png"
  n=$(ls "$out/tmp" | wc -l)
  # 2) crossfade the last XFADE frames toward the next still
  ffmpeg -v error -y -i "${STILL[$next]}" -vf "scale=856:478:flags=lanczos,setsar=1" "$out/tmp/still.png"
  for k in $(seq 1 $XFADE); do
    i=$((n - XFADE + k)); f=$(printf '%s/tmp/%04d.png' "$out" $i)
    a=$(awk -v k=$k -v x=$XFADE 'BEGIN{printf "%.3f", k/x}')
    ffmpeg -v error -y -i "$f" -i "$out/tmp/still.png" -filter_complex "[0][1]blend=all_expr='A*(1-$a)+B*$a'" "$f.x.png" && mv "$f.x.png" "$f"
  done
  rm "$out/tmp/still.png"
  # 3) encode: desktop full frame, mobile = center crop 9:16-ish (the portal screen is centered)
  for f in "$out"/tmp/*.png; do
    b=$(basename "$f" .png)
    ffmpeg -v error -y -i "$f" -c:v libwebp -quality 72 "$out/d/$b.webp"
    ffmpeg -v error -y -i "$f" -vf "crop=ih*0.75:ih,scale=360:-2" -c:v libwebp -quality 72 "$out/m/$b.webp"
  done
  rm -rf "$out/tmp"
  echo "$t: $n frames, desktop $(du -sh "$out/d" | cut -f1), mobile $(du -sh "$out/m" | cut -f1)"
done
