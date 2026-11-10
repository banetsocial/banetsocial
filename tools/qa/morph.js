// Morph detector. In a real camera move each frame is (roughly) the previous one shifted and zoomed;
// when furniture melts into other furniture, or things pop in and out, part of the change cannot be
// explained by any camera move. For every pair of frames: find the best global zoom + shift that maps
// frame i onto frame i+1, and measure what is left (the "unexplained" change, 0..255).
//   node tools/qa/morph.js <clip.mp4> [more clips...]
// Prints, per clip, the unexplained change over time and its worst stretch.
const { execFileSync } = require('child_process');
const W = 160, H = 90, FPS = 12;

function analyse(file) {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vf', `fps=${FPS},scale=${W}:${H},format=gray`, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 28 });
  const n = raw.length / (W * H), fr = i => raw.subarray(i * W * H, (i + 1) * W * H);
  const res = [];
  for (let i = 0; i < n - 1; i++) {
    const a = fr(i), b = fr(i + 1);
    let best = Infinity;
    // zoom about a centre that may sit anywhere in the middle half (the point you walk toward), plus shift
    for (const z of [1, 1.01, 1.02, 1.035, 1.05, 1.07, 1.1]) for (const cx of [0.3, 0.5, 0.7]) for (let dx = -8; dx <= 8; dx += 2) for (let dy = -4; dy <= 4; dy += 2) {
      let s = 0, c = 0;
      for (let y = 6; y < H - 6; y += 2) for (let x = 8; x < W - 8; x += 2) {
        // where pixel (x,y) of frame i+1 came from in frame i
        const sx = Math.round((x - cx * W) / z + cx * W - dx), sy = Math.round((y - H / 2) / z + H / 2 - dy);
        if (sx < 0 || sy < 0 || sx >= W || sy >= H) continue;
        s += Math.abs(b[y * W + x] - a[sy * W + sx]); c++;
      }
      const m = s / c; if (m < best) best = m;
    }
    res.push(best);
  }
  return res;
}

for (const file of process.argv.slice(2)) {
  const r = analyse(file);
  // worst one-second stretch
  let worst = 0, at = 0;
  for (let i = 0; i + FPS <= r.length; i++) { const m = r.slice(i, i + FPS).reduce((a, b) => a + b, 0) / FPS; if (m > worst) { worst = m; at = i / FPS; } }
  const mean = r.reduce((a, b) => a + b, 0) / r.length;
  const bars = r.filter((_, i) => i % 3 === 0).map(v => ' ▁▂▃▄▅▆▇█'[Math.min(8, Math.round(v / 3))]).join('');
  console.log(`${file.split(/[\\/]/).pop().padEnd(20)} mean ${mean.toFixed(1)}  worst 1s ${worst.toFixed(1)} @${at.toFixed(1)}s  ${bars}`);
}
