#!/usr/bin/env bash
# Media pipeline for portfolio works.
#   bash tools/encode-works.sh <source-dir> [slug ...]
# Reads tools/works-src.tsv. For each row writes assets/media/works/<slug>/:
#   preview.mp4  H.264, max 540px long side, ~1 Mbps, no audio, 7 s from the "strong moment"
#   full.mp4     H.264, max 1080px long side, ~3.5 Mbps, AAC audio, faststart
#   poster.webp  540px long side, taken from inside the preview window
#   lqip.txt     tiny blurred placeholder as a data: URI (inlined into works.json)
# Optional per-work start time: tools/preview-starts.tsv (slug<TAB>seconds). Otherwise 25% of the duration.
set -u
SRC="$1"; shift
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TSV="$ROOT/tools/works-src.tsv"
STARTS="$ROOT/tools/preview-starts.tsv"
OUT="$ROOT/assets/media/works"
ONLY=" $* "
VF_COLOR="format=yuv420p"
COLOR_TAGS=(-color_primaries bt709 -color_trc bt709 -colorspace bt709)

tail -n +2 "$TSV" | while IFS=$'\t' read -r slug id ext cat title client featured; do
  [ "$ONLY" != "  " ] && [[ "$ONLY" != *" $slug "* ]] && continue
  in="$SRC/$id.$ext"
  [ -s "$in" ] || { echo "SKIP $slug (no source)"; continue; }
  d="$OUT/$slug"; mkdir -p "$d"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in" </dev/null)
  start=""
  [ -f "$STARTS" ] && start=$(awk -F'\t' -v s="$slug" '$1==s{print $2}' "$STARTS")
  [ -z "$start" ] && start=$(awk -v d="$dur" 'BEGIN{ s=d*0.25; if (s+7>d) s=(d>7)?d-7:0; printf "%.2f", s }')
  # scale so the LONG side is N px, keep even dimensions
  fit() { echo "scale='if(gt(iw,ih),$1,-2)':'if(gt(iw,ih),-2,$1)':flags=lanczos"; }

  [ -s "$d/preview.mp4" ] || ffmpeg -v error -y -ss "$start" -t 7 -i "$in" </dev/null \
    -vf "$(fit 540),$VF_COLOR" -c:v libx264 -profile:v main -preset slow -b:v 1000k -maxrate 1200k -bufsize 2000k \
    -r 30 -an "${COLOR_TAGS[@]}" -movflags +faststart "$d/preview.mp4"

  [ -s "$d/full.mp4" ] || ffmpeg -v error -y -i "$in" </dev/null \
    -vf "$(fit 1080),$VF_COLOR" -c:v libx264 -profile:v high -preset medium -b:v 3500k -maxrate 4200k -bufsize 7000k \
    -c:a aac -b:a 128k -ac 2 "${COLOR_TAGS[@]}" -movflags +faststart "$d/full.mp4"

  pt=$(awk -v s="$start" 'BEGIN{printf "%.2f", s+2}')
  [ -s "$d/poster.webp" ] || ffmpeg -v error -y -ss "$pt" -i "$in" </dev/null -frames:v 1 \
    -vf "$(fit 540)" -c:v libwebp -quality 72 "$d/poster.webp"

  if [ ! -s "$d/lqip.txt" ]; then
    ffmpeg -v error -y -ss "$pt" -i "$in" </dev/null -frames:v 1 -vf "scale=12:-2,gblur=sigma=0.6" \
      -c:v libwebp -quality 40 "$d/lqip.webp"
    printf 'data:image/webp;base64,%s' "$(base64 -w0 "$d/lqip.webp")" > "$d/lqip.txt"; rm -f "$d/lqip.webp"
  fi
  printf '%s\tstart=%s\tdur=%.0f\tpreview=%sKB\tfull=%sMB\n' "$slug" "$start" "$dur" \
    "$(( $(stat -c%s "$d/preview.mp4") / 1024 ))" "$(( $(stat -c%s "$d/full.mp4") / 1048576 ))"
done
echo ALL-DONE
