/* Banet Social — scroll journey
   - One sticky stage. Scroll position picks either a room "rest" (still + live video screens)
     or a transition (frame sequence drawn on <canvas>, scrubbed forward/back by scroll).
   - Videos are mapped onto the painted screens with a projective transform (matrix3d), so
     screens that sit on a wall at an angle still line up.
   - Reduced motion / Save-Data / slow connection: rooms become stacked still sections.
   - ?calibrate: drag screen corners and copy the corrected JSON. */
(() => {
  'use strict';
  const SITE = window.SITE;
  if (!SITE) return;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const [IW, IH] = SITE.imageSize;                 // virtual image size all coordinates refer to
  const MOBILE_CROP = 0.75;                        // mobile frames = centre crop, width = 0.75 * height
  const conn = navigator.connection || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
  const isMobile = () => innerWidth < 768;
  const MAX_PLAY = () => (isMobile() ? 2 : 6);
  const calibrate = new URLSearchParams(location.search).has('calibrate');

  const worksById = Object.fromEntries(SITE.works.map(w => [w.id, w]));
  const rooms = SITE.rooms;
  const transitions = Object.fromEntries(SITE.transitions.map(t => [t.id, t]));

  /* ---------- works per room ---------- */
  function worksForRoom(room) {
    if (!room.category) return [];
    const inCat = w => w.category === room.category;
    const onWall = SITE.works.filter(w => w.wall.includes(room.id));
    const rest = SITE.works.filter(w => inCat(w) && !onWall.includes(w))
      .sort((a, b) => (b.featured - a.featured));
    return [...onWall, ...rest].filter(w => w.id !== room.portalWork);
  }
  function galleryWorks(cat) {
    return SITE.works.filter(w => w.category === cat || (cat === 'studio' && w.category === 'showreel'))
      .sort((a, b) => (b.featured - a.featured));
  }

  /* ---------- player & gallery (used in every mode) ---------- */
  const player = $('#player'), pv = $('#player-video'), pcap = $('#player-caption');
  const gallery = $('#gallery'), grid = $('#gallery-grid');
  let pushed = 0;

  function openDialog(d) {
    d.showModal();
    history.pushState({ dlg: d.id }, '');
    pushed++;
  }
  function closeDialog(d, fromPop) {
    if (!d.open) return;
    if (d === player) { pv.pause(); pv.removeAttribute('src'); pv.load(); }
    d.close();
    if (!fromPop && pushed > 0) { pushed--; history.back(); }
  }
  window.addEventListener('popstate', () => {
    // phone back button closes the top-most dialog
    const top = player.open ? player : gallery.open ? gallery : null;
    if (top) { pushed = Math.max(0, pushed - 1); closeDialog(top, true); }
  });
  for (const d of [player, gallery]) {
    d.addEventListener('cancel', e => { e.preventDefault(); closeDialog(d); });   // Esc
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) closeDialog(d); });
  }
  function play(work) {
    pv.poster = work.poster;
    pv.src = work.full;
    pcap.textContent = [work.title, work.client].filter(Boolean).join(' · ') + (work.pitch ? ` — ${work.pitch}` : '');
    openDialog(player);
    pv.play().catch(() => {});
  }
  function openGallery(cat) {
    $('#gallery-title').textContent = SITE.cats[cat] || '';
    grid.replaceChildren(...galleryWorks(cat).map(w => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'g-card';
      b.innerHTML = `<div class="thumb" style="background-image:url('${w.poster}'),url('${w.lqip}')"></div>
        <b>${w.title}</b><small>${w.client}</small>${w.pitch ? `<em>${w.pitch}</em>` : ''}`;
      b.setAttribute('aria-label', `צפייה: ${w.title}, ${w.client}`);
      b.addEventListener('click', () => play(w));
      return b;
    }));
    openDialog(gallery);
  }
  $$('[data-gallery]').forEach(b => b.addEventListener('click', () => openGallery(b.dataset.gallery)));

  /* ---------- word-by-word reveal ---------- */
  $$('[data-reveal]').forEach(h => {
    const words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map((w, i) => `<span class="w" style="transition-delay:${i * 90}ms">${w}</span>`).join(' ');
  });

  function card(w, cls) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = cls;
    b.style.backgroundImage = `url('${w.poster}'),url('${w.lqip}')`;
    b.setAttribute('aria-label', `צפייה: ${w.title}, ${w.client}`);
    b.addEventListener('click', () => play(w));
    return b;
  }

  /* =====================================================================
     STATIC MODE — reduced motion, save-data, very slow connections
     ===================================================================== */
  if (reduced || slow) {
    document.documentElement.classList.add('static');
    for (const room of rooms) {
      const ui = $(`.room-ui[data-room="${room.id}"]`);
      if (!ui) continue;
      ui.style.setProperty('--room-bg', `url('${room.still}-${isMobile() ? 720 : 1280}.webp')`);
      const list = [room.portalWork && worksById[room.portalWork], ...worksForRoom(room)].filter(Boolean).slice(0, 8);
      if (list.length) {
        const r = document.createElement('div'); r.className = 'static-rail';
        list.forEach(w => { const c = card(w, 'rail-card'); c.innerHTML = `<span>${w.title}</span>`; r.append(c); });
        ui.append(r);
      }
    }
    return;
  }

  /* =====================================================================
     JOURNEY MODE
     ===================================================================== */
  const journey = $('#journey'), stage = $('#stage'), canvas = $('#canvas'), ctx = canvas.getContext('2d');
  const screensLayer = $('#screens'), rail = $('#rail'), loader = $('#loader');
  stage.style.setProperty('--lqip', `url('${rooms[0].lqip}')`);

  // timeline in "screens" (1 = one viewport of scroll). Phones get shorter stretches so every swipe moves something.
  const M = isMobile();
  const REST = M ? { studio: 0.45, office: 0.5 } : { studio: 0.8, office: 0.7 };
  const REST_DEFAULT = M ? 0.7 : 1.0, TRANS = M ? 1.2 : 1.6;
  const REST_ZOOM = 0.04;
  const segs = []; let total = 0;
  rooms.forEach((room, i) => {
    const len = REST[room.id] || REST_DEFAULT;
    segs.push({ type: 'rest', room: i, start: total, len }); total += len;
    if (room.next) { segs.push({ type: 'trans', t: room.next, from: i, to: i + 1, start: total, len: TRANS }); total += TRANS; }
  });
  journey.style.setProperty('--journey-h', `${(total + 1) * 100}vh`);

  /* ---------- images ---------- */
  const stills = rooms.map(() => null);
  function loadStill(i) {
    if (stills[i]) return stills[i];
    const img = new Image(); img.decoding = 'async';
    img.src = `${rooms[i].still}-${isMobile() ? 720 : 1280}.webp`;
    img.onload = () => schedule();
    return (stills[i] = img);
  }
  const frames = {};                         // t -> Image[]
  const queue = []; let inflight = 0;
  function loadTransition(tid) {
    if (!tid || frames[tid]) return;
    const t = transitions[tid]; const dir = isMobile() ? t.mobile : t.desktop;
    frames[tid] = Array.from({ length: t.frames }, (_, k) => {
      const img = new Image(); img.decoding = 'async'; img._src = `${dir}${String(k + 1).padStart(4, '0')}.webp`; img._ok = false;
      queue.push(img); return img;
    });
    pump();
  }
  // frames load before videos: on a phone connection the scroll must react first
  const idleWaiters = [];
  const framesIdle = () => !queue.length && !inflight;
  function whenFramesIdle(cb) { if (framesIdle()) cb(); else idleWaiters.push(cb); }
  function pump() {
    while (inflight < 6 && queue.length) {
      const img = queue.shift(); inflight++;
      img.onload = () => { img._ok = true; inflight--; pump(); schedule(); updateLoader(); };
      img.onerror = () => { inflight--; pump(); };
      img.src = img._src;
    }
    if (framesIdle()) idleWaiters.splice(0).forEach(cb => cb());
  }
  function updateLoader() {
    const seg = current.seg; const tid = seg && (seg.type === 'trans' ? seg.t : rooms[seg.room].next);
    const f = tid && frames[tid];
    const p = f ? f.filter(i => i._ok).length / f.length : 1;
    loader.style.setProperty('--load', p >= 1 ? 0 : p);
  }

  /* ---------- canvas & cover mapping ---------- */
  const view = { w: 0, h: 0, s: 1, dx: 0, dy: 0, dpr: 1 };
  function resize() {
    view.dpr = Math.min(devicePixelRatio || 1, 2);
    view.w = stage.clientWidth; view.h = stage.clientHeight;
    canvas.width = Math.round(view.w * view.dpr); canvas.height = Math.round(view.h * view.dpr);
    view.s = Math.max(view.w / IW, view.h / IH);
    view.dx = (view.w - IW * view.s) / 2; view.dy = (view.h - IH * view.s) / 2;
    layoutScreens(); schedule(true);
  }
  // z > 1 zooms toward the focal point (fx, fy in image %) — a gentle "camera breathing in"
  function drawFull(img, z = 1, fx = 50, fy = 40) {
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    const [px, py] = toScreen([fx, fy]);
    ctx.translate(px, py); ctx.scale(z, z); ctx.translate(-px, -py);
    ctx.drawImage(img, view.dx, view.dy, IW * view.s, IH * view.s);
  }
  const focal = ri => {
    const p = rooms[ri] && rooms[ri].portal;
    return p ? [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[2][1]) / 2] : [50, 40];
  };
  function zoomScreens(z, ri) {
    const [px, py] = toScreen(focal(ri));
    screensLayer.style.transformOrigin = `${px}px ${py}px`;
    screensLayer.style.transform = z === 1 ? '' : `scale(${z})`;
  }
  function drawFrame(img, z = 1, fx = 50, fy = 40) {
    if (!isMobile()) return drawFull(img, z, fx, fy);
    const cw = IH * MOBILE_CROP, x = (IW - cw) / 2;   // mobile frame covers the centre strip only
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    const [px, py] = toScreen([fx, fy]);
    ctx.translate(px, py); ctx.scale(z, z); ctx.translate(-px, -py);
    ctx.drawImage(img, view.dx + x * view.s, view.dy, cw * view.s, IH * view.s);
  }
  const toScreen = ([px, py]) => [view.dx + px / 100 * IW * view.s, view.dy + py / 100 * IH * view.s];

  /* ---------- projective mapping for video screens ---------- */
  const BW = 180, BH = 320;                        // base element size (9:16)
  function homography(dst) {
    const src = [[0, 0], [BW, 0], [BW, BH], [0, BH]];
    const A = [], b = [];
    for (let i = 0; i < 4; i++) {
      const [x, y] = src[i], [u, v] = dst[i];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
    }
    // gaussian elimination
    for (let c = 0; c < 8; c++) {
      let p = c; for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
      for (let r = 0; r < 8; r++) if (r !== c) {
        const f = A[r][c] / A[c][c];
        for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
        b[r] -= f * b[c];
      }
    }
    const h = b.map((v, i) => v / A[i][i]);
    return `matrix3d(${h[0]},${h[3]},0,${h[6]},${h[1]},${h[4]},0,${h[7]},0,0,1,0,${h[2]},${h[5]},0,1)`;
  }

  // build one element per screen per room
  const roomScreens = rooms.map((room, ri) => {
    const list = [];
    const side = worksForRoom(room);
    if (room.portal && room.portalWork && worksById[room.portalWork]) list.push({ quad: room.portal, work: worksById[room.portalWork], portal: true });
    room.screens.forEach((q, k) => { if (side[k]) list.push({ quad: q, work: side[k], portal: false }); });
    for (const s of list) {
      const el = card(s.work, 'screen' + (s.portal ? ' portal' : ' side'));
      el.dataset.room = ri; el.inert = true; el.tabIndex = -1;
      s.el = el; screensLayer.append(el);
    }
    return list;
  });
  function layoutScreens() {
    roomScreens.forEach(list => list.forEach(s => { s.el.style.transform = homography(s.quad.map(toScreen)); }));
    if (calibrate) placeHandles();
  }

  /* ---------- video playback ---------- */
  const playing = new Set();
  function startVideo(holder, w) {
    if (playing.size >= MAX_PLAY() || holder.querySelector('video')) return;
    if (isMobile() && !framesIdle()) {           // phone: let the next transition's frames win the bandwidth
      whenFramesIdle(() => { if (holder.isConnected && (holder.classList.contains('on') || holder.closest('.rail'))) startVideo(holder, w); });
      return;
    }
    const v = document.createElement('video');
    Object.assign(v, { muted: true, loop: true, playsInline: true, autoplay: true, preload: 'auto', poster: w.poster });
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.src = w.preview;
    holder.append(v); playing.add(v);
    v.play().catch(() => {});
  }
  function stopVideos(container) {
    $$('video', container).forEach(v => { v.pause(); v.removeAttribute('src'); v.load(); v.remove(); playing.delete(v); });
  }

  /* ---------- mobile rail ---------- */
  let railRoom = -1;
  const railIO = new IntersectionObserver(entries => {
    for (const e of entries) {
      const w = worksById[e.target.dataset.id];
      if (e.isIntersecting && e.intersectionRatio >= 0.5) startVideo(e.target, w);
      else stopVideos(e.target);
    }
  }, { root: rail, threshold: [0, 0.5] });
  function fillRail(ri) {
    if (railRoom === ri) return;
    $$('.rail-card', rail).forEach(c => { railIO.unobserve(c); stopVideos(c); });
    rail.replaceChildren(); railRoom = ri;
    worksForRoom(rooms[ri]).slice(0, 8).forEach(w => {
      const c = card(w, 'rail-card'); c.dataset.id = w.id; c.innerHTML = `<span>${w.title}</span>`;
      rail.append(c); railIO.observe(c);
    });
  }

  /* ---------- room activation ---------- */
  let activeRoom = -1;
  function activateRoom(ri) {
    if (ri === activeRoom) return;
    if (activeRoom >= 0) {
      roomScreens[activeRoom].forEach(s => { s.el.classList.remove('on'); s.el.inert = true; s.el.tabIndex = -1; stopVideos(s.el); });
      $(`.room-ui[data-room="${rooms[activeRoom].id}"]`)?.classList.remove('on');
    }
    activeRoom = ri;
    // phone rail lives in the work rooms; the opening room keeps the screen clear for the showreel and the scroll hint
    rail.classList.toggle('on', ri > 0 && isMobile() && !!rooms[ri].category);
    if (ri < 0) return;
    $(`.room-ui[data-room="${rooms[ri].id}"]`)?.classList.add('on');
    const list = roomScreens[ri];
    // portal first, then the screens nearest the centre
    const order = list.slice().sort((a, b) => (b.portal - a.portal) ||
      (Math.abs(a.quad[0][0] - 50) - Math.abs(b.quad[0][0] - 50)));
    for (const s of order) {
      const visible = !(isMobile() && !s.portal);
      s.el.classList.add('on'); s.el.inert = !visible; s.el.tabIndex = visible ? 0 : -1;
      if (visible) startVideo(s.el, s.work);
    }
    if (isMobile() && ri > 0 && rooms[ri].category) fillRail(ri);
  }

  /* ---------- scroll → state ---------- */
  const current = { seg: null, t: 0 };
  let raf = 0, force = false;
  function schedule(f) { force = force || !!f; if (!raf) raf = requestAnimationFrame(render); }
  function render() {
    raf = 0;
    const top = journey.getBoundingClientRect().top;
    const p = Math.min(Math.max(-top / view.h, 0), total - 0.0001);
    const seg = segs.find(s => p >= s.start && p < s.start + s.len) || segs[segs.length - 1];
    const t = (p - seg.start) / seg.len;
    current.seg = seg; current.t = t;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (seg.type === 'rest') {
      const img = loadStill(seg.room);
      // the camera creeps forward while you rest in a room, so scrolling always answers
      const z = rooms[seg.room].next ? 1 + REST_ZOOM * t : 1;
      const [fx, fy] = focal(seg.room);
      if (img.complete && img.naturalWidth) drawFull(img, z, fx, fy);
      zoomScreens(z, seg.room);
      activateRoom(seg.room);
      // preload: this room's outgoing transition, and the one that brought us here
      loadTransition(rooms[seg.room].next); loadStill(seg.room + 1 < rooms.length ? seg.room + 1 : seg.room);
    } else {
      activateRoom(-1); zoomScreens(1, 0);
      loadTransition(seg.t);
      const next = rooms[seg.to].next; if (t > 0.5) loadTransition(next);
      const f = frames[seg.t];
      let k = Math.round(t * (f.length - 1)), img = null;
      for (let j = k; j >= 0; j--) if (f[j]._ok) { img = f[j]; break; }
      const [fx, fy] = focal(seg.from);
      // hand-off: the rest ended slightly zoomed; ease that back out while the real push-in takes over
      if (img) drawFrame(img, 1 + REST_ZOOM * Math.max(0, 1 - t / 0.2), fx, fy);
      else {
        // frames still downloading: fake the push-in on the still so the scroll is never "dead"
        const s = loadStill(seg.from);
        if (s.complete) drawFull(s, 1 + REST_ZOOM + 2.2 * t * t, fx, fy);
      }
    }
    updateLoader();
    force = false;
  }

  addEventListener('scroll', () => schedule(), { passive: true });
  addEventListener('resize', () => { railRoom = -1; resize(); });
  // stop everything when the tab is hidden
  document.addEventListener('visibilitychange', () => { if (document.hidden) playing.forEach(v => v.pause()); else playing.forEach(v => v.play().catch(() => {})); });

  loadStill(0);
  resize();

  /* =====================================================================
     CALIBRATION MODE (?calibrate)
     ===================================================================== */
  let handles = [];
  function placeHandles() {
    if (activeRoom < 0) return;
    let h = 0;
    roomScreens[activeRoom].forEach(s => s.quad.forEach(pt => {
      const [x, y] = toScreen(pt); const el = handles[h++]; if (el) el.style.transform = `translate(${x}px,${y}px)`;
    }));
  }
  if (calibrate) {
    document.documentElement.classList.add('calibrate');
    const panel = document.createElement('div'); panel.className = 'cal-panel';
    panel.innerHTML = '<b>Calibrate</b> — scroll to a room, drag the red dots, then copy:<textarea readonly></textarea>';
    document.body.append(panel);
    const ta = $('textarea', panel);
    const dump = () => {
      if (activeRoom < 0) return;
      const room = rooms[activeRoom], list = roomScreens[activeRoom];
      const portal = list.find(s => s.portal);
      ta.value = JSON.stringify({ room: room.id, portal: portal ? portal.quad : null, screens: list.filter(s => !s.portal).map(s => s.quad) });
    };
    const rebuild = () => {
      handles.forEach(h => h.remove()); handles = [];
      if (activeRoom < 0) return;
      roomScreens[activeRoom].forEach(s => s.quad.forEach((pt, qi) => {
        const d = document.createElement('div'); d.className = 'cal-handle'; stage.append(d); handles.push(d);
        d.addEventListener('pointerdown', e => {
          d.setPointerCapture(e.pointerId);
          const move = ev => {
            const r = stage.getBoundingClientRect();
            s.quad[qi] = [+(((ev.clientX - r.left - view.dx) / view.s / IW) * 100).toFixed(2), +(((ev.clientY - r.top - view.dy) / view.s / IH) * 100).toFixed(2)];
            s.el.style.transform = homography(s.quad.map(toScreen)); placeHandles(); dump();
          };
          d.addEventListener('pointermove', move);
          d.addEventListener('pointerup', () => d.removeEventListener('pointermove', move), { once: true });
        });
      }));
      placeHandles(); dump();
    };
    let lastRoom = -2;
    addEventListener('scroll', () => requestAnimationFrame(() => { if (activeRoom !== lastRoom) { lastRoom = activeRoom; rebuild(); } }), { passive: true });
    setTimeout(rebuild, 300);
  }
})();
