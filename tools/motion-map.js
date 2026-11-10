// Adaptive scroll for the walks: measures how much the picture changes between every two frames of
// each walk (1 - SSIM) and spends the scroll in proportion to it, so every swipe moves the picture by
// about the same amount — fast moments (passing a door frame) get more scroll, calm ones less, like a
// steady drone. Doors get extra scroll on top, so a slow scroll still opens them by hand.
//   node tools/motion-map.js        → assets/data/motion.json  { id: [[t, seconds], ...] }
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const FPS = 15, SAMPLES = 40;
const UNIFORM = 0.35;                          // share of the scroll spread evenly (keeps calm parts moving)
const DOORS = { enter: [2.5, 3.75, 1.8], exit: [1.8, 3.4, 1.5] };   // [from s, to s, extra weight]

const out = {};
for (const id of ['enter', 't1', 't2', 't3', 't4', 'exit']) {
  const dir = path.join(ROOT, 'assets/media/sequences', id, 'd');
  if (!fs.existsSync(dir)) continue;
  const n = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).length;
  const log = path.join(ROOT, `qa-motion-${id}.log`);
  const seq = path.join(dir, '%04d.webp').replace(/\\/g, '/');
  // frame i vs frame i+1 (the same sequence shifted by one)
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', seq, '-framerate', String(FPS), '-start_number', '2', '-i', seq,
    '-filter_complex', `[0]scale=320:178,format=gray[a];[1]scale=320:178,format=gray[b];[a][b]ssim=stats_file=qa-motion-${id}.log`,
    '-f', 'null', '-'], { cwd: ROOT });
  const ssim = fs.readFileSync(log, 'utf8').trim().split('\n').map(l => +l.match(/All:([0-9.]+)/)[1]);
  fs.unlinkSync(log);
  const motion = ssim.map(s => Math.max(0, 1 - s));                       // n-1 steps
  const mean = motion.reduce((a, b) => a + b, 0) / motion.length;
  const w = motion.map((m, i) => {
    let x = UNIFORM * mean + (1 - UNIFORM) * m;
    const d = DOORS[id], sec = (i + 0.5) / FPS;
    if (d && sec >= d[0] && sec <= d[1]) x *= d[2];
    return x;
  });
  const cum = [0]; for (const x of w) cum.push(cum[cum.length - 1] + x);
  const total = cum[cum.length - 1];
  // invert: for evenly spaced scroll t, which frame (in seconds) are we at
  const knots = [];
  for (let k = 0; k <= SAMPLES; k++) {
    const target = total * k / SAMPLES;
    let j = 0; while (j < cum.length - 2 && cum[j + 1] < target) j++;
    const f = j + (target - cum[j]) / Math.max(cum[j + 1] - cum[j], 1e-9);
    knots.push([+(k / SAMPLES).toFixed(3), +(Math.min(f, n - 1) / FPS).toFixed(3)]);
  }
  out[id] = { time: knots, mean };
  const peak = Math.max(...motion), peakAt = motion.indexOf(peak);
  console.log(`${id}: ${n} frames, mean change ${mean.toFixed(3)}, peak ${peak.toFixed(3)} at ${(peakAt / FPS).toFixed(2)}s`);
}
// how long each walk is on the scroll: busier walks get more, calm ones less (around the median)
const means = Object.values(out).map(o => o.mean).sort((a, b) => a - b), med = means[means.length >> 1];
for (const o of Object.values(out)) o.len = +Math.min(1.5, Math.max(0.75, Math.sqrt(o.mean / med))).toFixed(3);
fs.writeFileSync(path.join(ROOT, 'assets/data/motion.json'), JSON.stringify(out) + '\n');
console.log('scroll length factors:', Object.entries(out).map(([k, o]) => k + ' ' + o.len).join(', '));
