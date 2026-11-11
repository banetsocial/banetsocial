#!/usr/bin/env bash
# Clip QA for the walks: does each clip start on the room it leaves and end on the room it reaches
# (SSIM vs the stills, 1 = identical), and is there any sudden jump inside it (lowest SSIM between
# neighbouring frames, and where)?
#   bash tools/qa/clips.sh
set -eu
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT/assets/media"
ssim() { ffmpeg -v error -i "$1" -i "$2" -filter_complex "[0]scale=640:358,format=gray[a];[1]scale=640:358,format=gray[b];[a][b]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*' | cut -d: -f2; ffmpeg -i "$1" -i "$2" -filter_complex "[0]scale=640:358,format=gray[a];[1]scale=640:358,format=gray[b];[a][b]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*' | cut -d: -f2; }
SPECS="enter:transitions/v2/enter-kling.mp4:stills/v7-exterior-logo.jpg:rooms/studio-1280.webp
t1:transitions/v2/t1-walk.mp4:rooms/studio-1280.webp:rooms/business-1280.webp
t2:transitions/v2/t2-walk.mp4:rooms/business-1280.webp:rooms/events-1280.webp
t3:transitions/v2/t3-walk.mp4:rooms/events-1280.webp:rooms/ai-1280.webp
t4:transitions/v2/t4-walk.mp4:rooms/ai-1280.webp:rooms/office-1280.webp
exit:transitions/v2/exit-kling.mp4:rooms/office-1280.webp:rooms/beach-1280.webp"
T=$(mktemp -d)
printf '%-6s %-8s %-8s %-10s %s\n' clip start end minStep atSec
for spec in $SPECS; do
  IFS=: read -r id vid a b <<<"$spec"
  ffmpeg -v error -y -i "$vid" -frames:v 1 "$T/first.png"
  ffmpeg -v error -y -sseof -0.05 -i "$vid" -frames:v 1 "$T/last.png"
  s=$(ffmpeg -i "$T/first.png" -i "$a" -filter_complex "[0]scale=640:358,format=gray[x];[1]scale=640:358,format=gray[y];[x][y]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*' | cut -d: -f2)
  e=$(ffmpeg -i "$T/last.png" -i "$b" -filter_complex "[0]scale=640:358,format=gray[x];[1]scale=640:358,format=gray[y];[x][y]ssim" -f null - 2>&1 | grep -o 'All:[0-9.]*' | cut -d: -f2)
  # neighbouring frames: compare the clip with itself shifted by one frame
  m=$(ffmpeg -i "$vid" -i "$vid" -filter_complex "[0]scale=320:178,format=gray,trim=start_frame=1,setpts=PTS-STARTPTS[x];[1]scale=320:178,format=gray[y];[x][y]ssim=stats_file=qa-ssim.log" -f null - >/dev/null 2>&1; awk '{split($3,a,":"); split($1,b,":"); print a[2], b[2]}' qa-ssim.log | sort -n | head -1)
  read -r mv mn <<<"$m"
  printf '%-6s %-8.3f %-8.3f %-10.3f %.2fs\n' "$id" "$s" "$e" "$mv" "$(awk -v n="$mn" 'BEGIN{print n/24}')"
done
rm -rf "$T" qa-ssim.log
