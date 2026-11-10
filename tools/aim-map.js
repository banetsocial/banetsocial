// Where is the camera heading? For each walk, estimate frame by frame the horizontal "focus of
// expansion": walking forward, everything streams outward from the point you walk toward, so that is
// where the picture moves least relative to its detail. Phones show only an upright slice of each
// frame; they centre that slice on this point, like a drone operator keeping the doorway in frame.
//   node tools/aim-map.js      → adds  aim: [x0..1 per frame]  to assets/data/motion.json
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const W = 160, H = 90, SMOOTH = 7;              // analysis size; temporal smoothing radius (frames)
const motionFile = path.join(ROOT, 'assets/data/motion.json');
const motion = JSON.parse(fs.readFileSync(motionFile, 'utf8'));

for (const id of Object.keys(motion)) {
  const seq = path.join(ROOT, 'assets/media/sequences', id, 'd', '%04d.webp').replace(/\\/g, '/');
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', seq, '-vf', `scale=${W}:${H},format=gray`, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 28 });
  const n = raw.length / (W * H);
  const px = (f, x, y) => raw[f * W * H + y * W + x];
  const xs = [];
  for (let f = 0; f < n - 1; f++) {
    // per column: picture change between f and f+1, and texture (horizontal + vertical gradient)
    const change = new Float64Array(W), tex = new Float64Array(W);
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      change[x] += Math.abs(px(f + 1, x, y) - px(f, x, y));
      tex[x] += Math.abs(px(f, x + 1, y) - px(f, x - 1, y)) + Math.abs(px(f, x, y + 1) - px(f, x, y - 1));
    }
    // relative motion over a window of columns; only where there is enough detail to judge
    const B = 12; let best = W / 2, bestScore = Infinity;
    const texMean = tex.reduce((a, b) => a + b, 0) / W;
    for (let c = B; c < W - B; c++) {
      let ch = 0, tx = 0;
      for (let k = c - B; k <= c + B; k++) { ch += change[k]; tx += tex[k]; }
      if (tx < texMean * (2 * B + 1) * 0.35) continue;
      const score = ch / tx;
      if (score < bestScore) { bestScore = score; best = c; }
    }
    xs.push(best / W);
  }
  xs.push(xs[xs.length - 1]);
  // heavy temporal smoothing (a camera operator does not twitch), then pull gently toward the middle
  const sm = xs.map((_, i) => {
    let s = 0, c = 0;
    for (let k = Math.max(0, i - SMOOTH); k <= Math.min(xs.length - 1, i + SMOOTH); k++) { s += xs[k]; c++; }
    return 0.5 + (s / c - 0.5) * 0.85;
  });
  motion[id].aim = sm.map(v => +v.toFixed(3));
  const show = sm.filter((_, i) => i % 8 === 0).map(v => v.toFixed(2)).join(' ');
  console.log(`${id.padEnd(5)} ${show}`);
}
fs.writeFileSync(motionFile, JSON.stringify(motion) + '\n');
