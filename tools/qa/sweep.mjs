// Journey QA: scrolls the whole journey in small steps in headless Chrome and measures how much the
// picture changes between neighbouring steps. A smooth walk changes a little every step; a seam, a
// pop or a hard cut shows up as a spike far above its neighbours. Also flags blank frames and JS errors.
//   node tools/qa/sweep.mjs [url] [desktop|mobile] [step]
// Writes tools/qa/out/<mode>.json and prints the worst spots. Needs Chrome + Node 22+.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';

const url = process.argv[2] || 'http://localhost:5173/';
const mode = process.argv[3] || 'desktop';
const step = +(process.argv[4] || 0.02);
const [W, H, mob] = mode === 'mobile' ? [390, 844, true] : [1280, 720, false];
const outDir = new URL('./out/', import.meta.url);
mkdirSync(outDir, { recursive: true });

const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', `--remote-debugging-port=${port}`, '--autoplay-policy=no-user-gesture-required',
  `--user-data-dir=${tmpdir()}/qa-${mode}-${port}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 120 && !ws; i++) {
  try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); ws = new WebSocket(l.find(x => x.type === 'page').webSocketDebuggerUrl); }
  catch { await sleep(250); }
}
await new Promise(r => (ws.onopen = r));
let id = 0; const pend = {}; const errors = [];
ws.onmessage = m => {
  const d = JSON.parse(m.data);
  if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; }
  if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.text + ' ' + (d.params.exceptionDetails.exception?.description || '').slice(0, 200));
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push(JSON.stringify(d.params.args).slice(0, 200));
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.result?.value;

await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: mob });
if (mob) await send('Emulation.setTouchEmulationEnabled', { enabled: true });
await send('Page.navigate', { url });
await sleep(5000);

// in-page probe: the stage canvas reduced to 64x36 grey levels
await evaluate(`window.__qa = (() => {
  const c = document.querySelector('#stage canvas, .stage canvas'), t = document.createElement('canvas');
  t.width = 64; t.height = 36; const g = t.getContext('2d', { willReadFrequently: true });
  return () => { g.drawImage(c, 0, 0, 64, 36); const d = g.getImageData(0, 0, 64, 36).data, a = new Uint8Array(64 * 36);
    let sum = 0; for (let i = 0; i < a.length; i++) { a[i] = (d[i*4] * 3 + d[i*4+1] * 6 + d[i*4+2]) / 10; sum += a[i]; } return { a: Array.from(a), mean: sum / a.length }; };
})(); true`);
const end = await evaluate(`(document.querySelector('#journey').scrollHeight) / innerHeight`);
const frame = () => new Promise(r => setTimeout(r, 0));

// pass 1: walk through slowly so every walk's frames are downloaded
for (let p = 0; p < end; p += 0.25) { await evaluate(`scrollTo(0, innerHeight*${p})`); await sleep(350); }
// ...and wait until they have all arrived (up to 4 minutes), so the measurement is of the finished walk
const t0 = Date.now(); let ld;
for (;;) { ld = await evaluate(`JSON.stringify(window.__journeyLoad || null)`); ld = ld && JSON.parse(ld);
  if (!ld || ld.got >= ld.want || Date.now() - t0 > 240000) break; await sleep(1000); }
const loadNote = ld ? `frames ${ld.got}/${ld.want}, waited ${((Date.now() - t0) / 1000).toFixed(0)}s` : 'no load counter';
await evaluate(`scrollTo(0, 0)`); await sleep(1500);

// pass 2: measure
const rows = []; let prev = null;
for (let p = 0; p < end; p += step) {
  await evaluate(`scrollTo(0, innerHeight*${p.toFixed(3)})`);
  await evaluate(`new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
  await sleep(60);
  const s = await evaluate(`__qa()`);
  let diff = 0;
  if (prev) { for (let i = 0; i < s.a.length; i++) diff += Math.abs(s.a[i] - prev[i]); diff /= s.a.length; }
  rows.push({ p: +p.toFixed(3), diff: +diff.toFixed(2), mean: +s.mean.toFixed(1) });
  prev = s.a;
}
chrome.kill();

// spikes: a step whose change is far above the local typical change (median of ±10 steps)
const spikes = [];
rows.forEach((r, i) => {
  if (i === 0) return;
  const win = rows.slice(Math.max(1, i - 10), i + 11).map(x => x.diff).sort((a, b) => a - b);
  const med = win[win.length >> 1];
  const score = r.diff / Math.max(med, 1.5);
  if (r.diff > 6 && score > 3) spikes.push({ p: r.p, diff: r.diff, localMedian: med, score: +score.toFixed(1) });
});
const blank = rows.filter(r => r.mean < 4).map(r => r.p);
const report = { url, mode, step, steps: rows.length, errors, blank, spikes: spikes.sort((a, b) => b.score - a.score), rows };
writeFileSync(new URL(`${mode}.json`, outDir), JSON.stringify(report, null, 1));
console.log(`${mode}: ${rows.length} steps, ${spikes.length} spikes, ${blank.length} blank, ${errors.length} errors  (${loadNote})`);
for (const s of report.spikes.slice(0, 12)) console.log(`  p=${s.p}  change ${s.diff} vs typical ${s.localMedian}  (x${s.score})`);
if (errors.length) console.log('  errors:', errors.slice(0, 5));
process.exit(0);
