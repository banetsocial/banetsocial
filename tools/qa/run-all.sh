#!/usr/bin/env bash
# The whole quality loop in one command. Run it after every change; fix what it flags; run again.
#   bash tools/qa/run-all.sh [url]        (default: the local preview, http://localhost:5173/)
# 1. clips.sh   — every walk starts/ends on its rooms (SSIM ≥ 0.90), reports its sharpest frame step
# 2. sweep.mjs  — scrolls the whole journey on desktop and phone in 2% steps: no jumps, no blank
#                 frames, no JS errors; reports how even the motion is
# Exit code 0 = PASS. Results also in tools/qa/out/.
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
URL="${1:-http://localhost:5173/}"
cd "$ROOT"
fail=0

echo "== clips"
clips=$(bash tools/qa/clips.sh 2>/dev/null)
echo "$clips"
echo "$clips" | awk 'NR>1 && ($2 < 0.90 || $3 < 0.90) { bad=1; print "  FAIL seam: " $1 } END { exit bad }' || fail=1

echo "== journey sweep ($URL)"
node tools/qa/sweep.mjs "$URL" desktop 0.02 > tools/qa/out/desktop.txt 2>&1 &
node tools/qa/sweep.mjs "$URL" mobile 0.02 > tools/qa/out/mobile.txt 2>&1
wait
cat tools/qa/out/desktop.txt tools/qa/out/mobile.txt
node -e "
let bad = 0;
for (const m of ['desktop', 'mobile']) {
  const r = require('./tools/qa/out/' + m + '.json');
  const d = r.rows.map(x => x.diff).filter(x => x > 0).sort((a, b) => a - b), q = p => d[Math.floor(d.length * p)];
  console.log(m.padEnd(8), 'median', q(.5).toFixed(1), ' p95', q(.95).toFixed(1), ' max', d[d.length - 1].toFixed(1));
  if (r.spikes.length || r.blank.length || r.errors.length) bad = 1;
}
process.exit(bad);" || fail=1

if [ $fail = 0 ]; then echo "PASS"; else echo "FAIL"; fi
exit $fail
