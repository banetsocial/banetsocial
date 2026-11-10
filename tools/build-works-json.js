// Builds assets/data/works.json from tools/works-src.tsv + encoded media.
//   node tools/build-works-json.js
// Order inside each category = order in the TSV (featured rows are sorted first).
// "wall" lists which works hang on the room's painted screens; everything else lives in the gallery.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const WALL = {
  showreel: ['showreel'],
  studio: ['studio-mix', 'single-a-base', 'clip-bts', 'jerusalem', 'nature', 'sukkot-festival', 'warehouse', 'karlin-donors-1'],
  business: ['itamar-shalom', 'karlin-renovation', 'bichler', 'darshu', 'mapana', 'karlin-donors-2', 'karlin-frame'],
  events: ['orchestra', 'sukkot', 'dinner', 'gabbaim', 'chassidic-event', 'live-keys', 'conference'],
  ai: ['ai-slichti', 'ai-hayom', 'ai-nishpoch', 'ai-kodem', 'ai-beyom', 'ai-koenig'],
};

// Real outcomes, in Yossi's words (NOTES.md). Never invent numbers here.
const PITCH = {
  'itamar-shalom': 'סרטוני מכירה שהביאו לו חשיפה מול לקוחות חדשים',
  'karlin-renovation': 'סרטוני אווירה שעזרו לגייס תרומות לבניין',
};

const rows = fs.readFileSync(path.join(ROOT, 'tools/works-src.tsv'), 'utf8')
  .trim().split(/\r?\n/).slice(1).map(l => l.split('\t'));

const works = rows.map(([slug, , , category, title, client, featured]) => {
  const dir = `assets/media/works/${slug}`;
  const lqipFile = path.join(ROOT, dir, 'lqip.txt');
  const wallCats = Object.entries(WALL).filter(([, list]) => list.includes(slug)).map(([c]) => c);
  return {
    id: slug,
    category,
    title,
    client,
    pitch: PITCH[slug] || '',
    stat: '',
    featured: featured === '1',
    wall: wallCats,                       // rooms whose painted screens show this work
    poster: `${dir}/poster.webp`,
    preview: `${dir}/preview.mp4`,
    full: `${dir}/full.mp4`,
    lqip: fs.existsSync(lqipFile) ? fs.readFileSync(lqipFile, 'utf8').trim() : '',
  };
});

const missing = works.filter(w => !fs.existsSync(path.join(ROOT, w.preview)));
if (missing.length) console.warn('missing media:', missing.map(w => w.id).join(', '));

fs.mkdirSync(path.join(ROOT, 'assets/data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'assets/data/works.json'), JSON.stringify({ works }, null, 2) + '\n');
const byCat = works.reduce((a, w) => ((a[w.category] = (a[w.category] || 0) + 1), a), {});
console.log('works.json:', works.length, 'works', byCat);
