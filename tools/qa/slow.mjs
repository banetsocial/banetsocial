// Slow-line QA: opens the journey in headless Chrome on a throttled connection (default 700 kbit/s,
// 600 ms latency — a weak hotspot) and reports when the first picture and the walks become usable.
//   node tools/qa/slow.mjs [url] [kbps] [latencyMs]
// Writes screenshots to tools/qa/out/slow-*.png. Needs Chrome + Node 22+.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';

const url = process.argv[2] || 'http://localhost:5173/index.html?full=1';
const kbps = +(process.argv[3] || 700), latency = +(process.argv[4] || 600);
const outDir = new URL('./out/', import.meta.url);
mkdirSync(outDir, { recursive: true });

const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', `--remote-debugging-port=${port}`, '--autoplay-policy=no-user-gesture-required',
  `--user-data-dir=${tmpdir()}/qa-slow-${port}`, 'about:blank'], { stdio: 'ignore' });
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
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.result?.value;
const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(new URL(`slow-${name}.png`, outDir), Buffer.from(r.result.data, 'base64')); };

await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Network.emulateNetworkConditions', { offline: false, latency, downloadThroughput: kbps * 125, uploadThroughput: kbps * 125 });

const t0 = Date.now(), at = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
await send('Page.navigate', { url });
// how many frames of one walk have arrived: [full, light]
const count = `(() => { const n = s => performance.getEntriesByType('resource').filter(e => e.responseEnd && e.name.includes(s)).length;
  return { ext: n('exterior-1280'), posters: n('poster.webp'), enterFull: n('sequences/enter/d/'), enterLite: n('sequences/enter/l/'),
           t3Full: n('sequences/t3/d/'), t3Lite: n('sequences/t3/l/'), load: window.__journeyLoad }; })()`;
let seen = {};
for (let s = 0; s < 40; s++) {
  await sleep(1000);
  const c = await evaluate(count); if (!c) continue;
  if (c.ext && !seen.ext) { seen.ext = at(); console.log('first picture (exterior):', seen.ext, 'posters loaded by then:', c.posters); }
  if (c.enterLite >= 11 && !seen.e1) { seen.e1 = at(); console.log('front-door walk usable (rough):', seen.e1); }
  if (c.enterLite >= 41 && !seen.e2) { seen.e2 = at(); console.log('front-door walk complete (light):', seen.e2); }
  if (c.t3Lite >= 41 && !seen.t3) { seen.t3 = at(); console.log('walk 3 complete (light):', seen.t3); }
  if (s === 7) {
    // 8 seconds in, a visitor scrolls into the front-door walk
    await evaluate(`scrollTo(0, document.querySelector('#journey').offsetTop + innerHeight * 1.6)`); await sleep(400);
    await shot('enter-8s'); console.log('8s  :', JSON.stringify(c));
  }
  if (s === 14) {
    // 15 seconds in, they press "AI room" and scroll on into the walk after it
    await evaluate(`document.querySelector('#jump [data-go="ai"]')?.click()`); await sleep(300);
    await evaluate(`scrollBy(0, innerHeight * 2.2)`); await sleep(500);
    await shot('after-ai-15s'); console.log('15s :', JSON.stringify(c));
  }
}
console.log('40s :', JSON.stringify(await evaluate(count)));
console.log(errors.length ? 'JS errors: ' + errors.join(' | ') : 'no JS errors');
ws.close(); chrome.kill();
process.exit(0);
