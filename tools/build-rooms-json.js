// Builds assets/data/rooms.json from screen corners measured on the 1376x768 stills.
//   node tools/build-rooms-json.js
// Each screen is a quad [TL, TR, BR, BL] in percent of the image, so side screens that sit
// on a wall at an angle are mapped exactly (CSS matrix3d). Rooms are symmetrical, so only the
// LEFT side is measured; the right side is mirrored. Fine-tune in the browser with ?calibrate.
const fs = require('fs');
const path = require('path');
const W = 1376, H = 768;
const pct = ([x, y]) => [+(x / W * 100).toFixed(2), +(y / H * 100).toFixed(2)];
const quad = q => q.map(pct);
const mirror = q => [[W - q[1][0], q[1][1]], [W - q[0][0], q[0][1]], [W - q[3][0], q[3][1]], [W - q[2][0], q[2][1]]];
const rect = (l, t, r, b) => [[l, t], [r, t], [r, b], [l, b]];
const sides = left => {
  // order on the page: outer-left ... inner-left, inner-right ... outer-right
  const right = left.slice().reverse().map(mirror);
  return [...left, ...right].map(quad);
};

const STUDIO_LEFT = [
  [[143, 268], [212, 280], [212, 472], [143, 490]],
  [[243, 288], [290, 295], [290, 452], [243, 462]],
  [[313, 300], [347, 305], [347, 440], [313, 447]],
  [[365, 311], [392, 315], [392, 431], [365, 436]],
];
const BUSINESS_LEFT = [
  [[145, 270], [211, 282], [211, 448], [145, 460]],
  [[243, 290], [290, 296], [290, 442], [243, 450]],
  [[313, 303], [347, 307], [347, 435], [313, 440]],
  [[365, 313], [392, 316], [392, 428], [365, 432]],
];
const EVENTS_LEFT = [
  [[138, 268], [212, 282], [212, 458], [138, 472]],
  [[236, 290], [291, 297], [291, 446], [236, 454]],
  [[309, 303], [348, 307], [348, 436], [309, 441]],
  [[361, 312], [393, 316], [393, 428], [361, 432]],
];
const AI_LEFT = [
  [[142, 270], [228, 283], [228, 480], [142, 493]],
  [[291, 292], [376, 298], [376, 468], [291, 474]],
  [[436, 305], [519, 309], [519, 460], [436, 462]],
];

const rooms = [
  {
    id: 'studio', category: 'studio', title: 'וידאו שנראה כמו קולנוע',
    still: 'assets/media/rooms/studio', lqip: '', next: 't1',
    portal: quad(rect(612, 150, 764, 452)), portalWork: 'showreel',
    screens: sides(STUDIO_LEFT),
  },
  {
    id: 'business', category: 'business', title: 'סרטונים שמביאים לקוחות',
    still: 'assets/media/rooms/business', lqip: '', next: 't2',
    portal: quad(rect(612, 150, 764, 452)), portalWork: 'itamar-shalom',
    screens: sides(BUSINESS_LEFT),
  },
  {
    id: 'events', category: 'events', title: 'הרגעים שלא חוזרים',
    still: 'assets/media/rooms/events', lqip: '', next: 't3',
    portal: quad(rect(612, 150, 764, 372)), portalWork: 'orchestra',
    screens: sides(EVENTS_LEFT),
  },
  {
    id: 'ai', category: 'ai', title: 'מה שאי אפשר לצלם, אפשר לייצר',
    still: 'assets/media/rooms/ai', lqip: '', next: 't4',
    portal: quad(rect(628, 283, 746, 487)), portalWork: 'ai-slichti',
    screens: sides(AI_LEFT),
  },
  {
    id: 'office', category: null, title: 'בואו נדבר',
    still: 'assets/media/rooms/office', lqip: '', next: null,
    portal: null, portalWork: null, screens: [],
    door: [50, 40.4, 2.6],          // the open glass door to the beach: centre x%, y%, zoom that fills the view
  },
];

// outside the rooms: the building we walk into, and the beach we walk out onto
const scenes = {
  exterior: { still: 'assets/media/rooms/exterior', lqip: '', door: [50, 56.3, 2.9] },
  beach: { still: 'assets/media/rooms/beach', lqip: '' },
};

const transitions = ['t1', 't2', 't3', 't4'].map(id => {
  const dir = path.join(__dirname, '..', 'assets/media/sequences', id, 'd');
  const frames = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.webp')).length : 0;
  return { id, frames, desktop: `assets/media/sequences/${id}/d/`, mobile: `assets/media/sequences/${id}/m/`, mobileCrop: 0.75 };
});

// Every walk is a real video (Kling O3) as frames, scrubbed by the scroll (tools/build-seqs.sh).
// time: [scroll t, clip seconds] knots. The doors get the most scroll: slow scrolling opens them by hand.
const SEQ_TIME = {
  enter: [[0, 0], [0.35, 2.5], [0.8, 3.75], [1, 5.04]],   // doors swing open 2.5–3.75s
  exit: [[0, 0], [0.3, 1.8], [0.75, 3.4], [1, 5.04]],     // office door opens 1.8–3.4s
};
// tools/motion-map.js: scroll spent in proportion to how much the picture moves (falls back to SEQ_TIME)
const motionFile = path.join(__dirname, '..', 'assets/data/motion.json');
const MOTION = fs.existsSync(motionFile) ? JSON.parse(fs.readFileSync(motionFile, 'utf8')) : {};
// phones (portrait) see only the middle of each walk: how far to turn toward the arch on the right while
// walking through it. Chosen by comparing 0 / 0.6 / 1 frame by frame: walk 1 barely turns by itself,
// walk 4 heads straight into its arch.
const PHONE_TURN = { t1: 1, t2: 0.6, t3: 0.9, t4: 0 };
// two-part walks (into a doorway, a moment of dark, out of the next one): the phone turn only covers
// the first part, up to the dark moment at this clip second
const JOIN_AT = { t3: 4.62 };
const scrollAt = (time, sec) => { for (let j = 1; j < time.length; j++) if (time[j][1] >= sec) { const [t0, s0] = time[j - 1], [t1, s1] = time[j]; return +(t0 + (t1 - t0) * (sec - s0) / Math.max(s1 - s0, 1e-6)).toFixed(3); } return 1; };
const seqs = {};
for (const id of ['enter', 't1', 't2', 't3', 't4', 'exit']) {
  const dir = path.join(__dirname, '..', 'assets/media/sequences', id, 'd');
  const frames = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.webp')).length : 0;
  if (frames) seqs[id] = { frames, fps: 24, steps: (MOTION[id] && MOTION[id].steps) || null, desktop: `assets/media/sequences/${id}/d/`, mobile: `assets/media/sequences/${id}/m/`,
    time: (MOTION[id] && MOTION[id].time) || SEQ_TIME[id] || [[0, 0], [1, 5.04]], len: (MOTION[id] && MOTION[id].len) || 1, turn: PHONE_TURN[id] || 0, turnUntil: JOIN_AT[id] && MOTION[id] ? scrollAt(MOTION[id].time, JOIN_AT[id]) : 0.92 };
}
scenes.seqs = seqs;
// living loops (tools/build-loops.sh): locked camera, drawn instead of the still while you stand there
const loops = {};
for (const id of ['exterior', 'studio', 'business', 'events', 'ai', 'office', 'beach']) {
  if (fs.existsSync(path.join(__dirname, '..', `assets/media/loops/${id}-d.mp4`)))
    loops[id] = { desktop: `assets/media/loops/${id}-d.mp4`, mobile: `assets/media/loops/${id}-m.mp4` };
}
scenes.loops = loops;
for (const r of [...rooms, scenes.exterior, scenes.beach]) {
  const f = path.join(__dirname, '..', r.still + '-lqip.txt');
  if (fs.existsSync(f)) r.lqip = fs.readFileSync(f, 'utf8').trim();
}
fs.writeFileSync(path.join(__dirname, '..', 'assets/data/rooms.json'),
  JSON.stringify({ imageSize: [W, H], rooms, scenes, transitions }, null, 2) + '\n');
console.log('rooms.json:', rooms.map(r => `${r.id}(${r.screens.length})`).join(' '), transitions.map(t => `${t.id}:${t.frames}`).join(' '));
