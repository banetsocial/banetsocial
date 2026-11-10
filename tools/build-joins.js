// Walks with a hidden cut through the doorway — made from footage we already have, no new generation.
// A first→last-frame clip between two rooms that were drawn separately has to invent the way from one
// to the other, and that is where furniture melts, appears and vanishes. So only the clean ends are kept:
//   part A: leave the room and push into its arch (real footage while it is clean, then a zoom toward
//           the arch), fading into the dark of the doorway;
//   part B: the next room opens out of that dark and settles on the still the site shows on arrival.
// Nothing in between is shown, so nothing can morph.
//   node tools/build-joins.js [id]   → assets/media/transitions/v2/<id>-join.mp4 + assets/data/joins.json
// joins.json also records where the arch is in the picture over time (`aim`), so phones — which see
// only an upright slice of each frame — keep the doorway in view.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const V2 = path.join(ROOT, 'assets/media/transitions/v2');
const W = 1280, H = 714, FPS = 24, FADE = 0.6, DARK = '0x0b2a33';

// a.clip: source; a.freeze: use only its first frame (the clip starts to morph almost at once);
// a.frames: length of part A; a.zoomFrom: frame the push starts; a.zoom: extra zoom at the end;
// a.arch: [[second, x 0..1], ...] where the arch is in the source; a.cy: its height
const WALKS = {
  t1: { a: { clip: 't1-kling.mp4', frames: 46, zoomFrom: 18, zoom: 1.3, arch: [[0, 0.84], [1.0, 0.81], [1.4, 0.78], [1.9, 0.72]], cy: 0.55 },
        b: { still: 'rooms/business-1280.webp', frames: 42, zoom: 0.7 } },
  t2: { a: { clip: 't2-pro.mp4', freeze: true, frames: 54, zoomFrom: 0, zoom: 2.2, arch: [[0, 0.90]], cy: 0.58 },
        b: { still: 'rooms/events-1280.webp', frames: 42, zoom: 0.7 } },
  t4: { a: { clip: 't4-kling.mp4', freeze: true, frames: 54, zoomFrom: 0, zoom: 2.2, arch: [[0, 0.895]], cy: 0.55 },
        b: { still: 'rooms/office-1280.webp', frames: 42, zoom: 0.7 } },
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerpKeys = (keys, s) => {
  if (s <= keys[0][0]) return keys[0][1];
  for (let j = 1; j < keys.length; j++) if (s <= keys[j][0]) { const [s0, x0] = keys[j - 1], [s1, x1] = keys[j]; return x0 + (x1 - x0) * (s - s0) / (s1 - s0); }
  return keys[keys.length - 1][1];
};

const joinsFile = path.join(ROOT, 'assets/data/joins.json');
const joins = fs.existsSync(joinsFile) ? JSON.parse(fs.readFileSync(joinsFile, 'utf8')) : {};
const tmp = path.join(V2, '.join-first.png');

for (const [id, w] of Object.entries(WALKS)) {
  if (process.argv[2] && process.argv[2] !== id) continue;
  const { a, b } = w, tx = a.arch[a.arch.length - 1][1];
  const P = `clip((n-${a.zoomFrom})/${a.frames - 1 - a.zoomFrom},0,1)`;
  const ZA = `(1+${a.zoom}*pow(${P},2))`;
  const IWA = `(2*trunc(${W}*${ZA}/2))`, IHA = `(2*trunc(${H}*${ZA}/2))`;
  const CXA = `clip(0.5+${(tx - 0.5).toFixed(4)}*${P},0.5/${ZA},1-0.5/${ZA})`;
  const CYA = `clip(0.5+${(a.cy - 0.5).toFixed(4)}*${P},0.5/${ZA},1-0.5/${ZA})`;
  const ZB = `(1+${b.zoom}*pow(1-n/${b.frames - 1},2))`;
  const IWB = `(2*trunc(${W}*${ZB}/2))`, IHB = `(2*trunc(${H}*${ZB}/2))`;
  const inA = a.freeze
    ? (execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(V2, a.clip), '-frames:v', '1', tmp]),
       ['-loop', '1', '-framerate', String(FPS), '-t', String(a.frames / FPS + 1), '-i', tmp])
    : ['-i', path.join(V2, a.clip)];
  const graph =
    `[0]fps=${FPS},trim=end_frame=${a.frames},setpts=PTS-STARTPTS,` +
    `scale=w='${IWA}':h='${IHA}':eval=frame:flags=lanczos,` +
    `crop=${W}:${H}:x='${IWA}*${CXA}-${W / 2}':y='${IHA}*${CYA}-${H / 2}',setsar=1,` +
    `fade=t=out:st=${(a.frames / FPS - FADE).toFixed(3)}:d=${FADE}:color=${DARK}[a];` +
    `[1]fps=${FPS},trim=end_frame=${b.frames},setpts=PTS-STARTPTS,` +
    `scale=w='${IWB}':h='${IHB}':eval=frame:flags=lanczos,` +
    `crop=${W}:${H}:x='(${IWB}-${W})/2':y='(${IHB}-${H})/2',setsar=1,` +
    `fade=t=in:st=0:d=${FADE}:color=${DARK}[b];[a][b]concat=n=2:v=1[v]`;
  const out = path.join(V2, `${id}-join.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...inA,
    '-loop', '1', '-framerate', String(FPS), '-t', String(b.frames / FPS + 1), '-i', path.join(ROOT, 'assets/media', b.still),
    '-filter_complex', graph, '-map', '[v]', '-an', '-c:v', 'libx264', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: 'inherit' });
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);

  // where the arch ends up in the finished picture, every 4 frames of part A; part B looks straight ahead
  const aim = [];
  for (let n = 0; n < a.frames; n += 4) {
    const p = clamp((n - a.zoomFrom) / (a.frames - 1 - a.zoomFrom), 0, 1), z = 1 + a.zoom * p * p;
    const c = clamp(0.5 + (tx - 0.5) * p, 0.5 / z, 1 - 0.5 / z);
    aim.push([+(n / FPS).toFixed(3), +clamp(0.5 + (lerpKeys(a.arch, n / FPS) - c) * z, 0.13, 0.87).toFixed(3)]);
  }
  const joinAt = a.frames / FPS;
  aim.push([+(joinAt - 0.08).toFixed(3), aim[aim.length - 1][1]], [+(joinAt + 0.08).toFixed(3), 0.5]);
  joins[id] = { joinAt: +joinAt.toFixed(3), aim };
  console.log(`${id}: ${a.frames}+${b.frames} frames, join at ${joinAt.toFixed(2)}s, aim ${aim.map(k => k[1]).join(' ')}`);
}
fs.writeFileSync(joinsFile, JSON.stringify(joins) + '\n');
