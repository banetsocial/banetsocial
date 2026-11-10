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
  function play(work, from) {
    pv.poster = work.poster;
    pv.src = work.full;
    pcap.textContent = [work.title, work.client].filter(Boolean).join(' · ') + (work.pitch ? ` — ${work.pitch}` : '');
    openDialog(player);
    pv.play().catch(() => {});   // still inside the tap, so phones allow sound
    if (from && !reduced) flyIn(from);
  }
  // the tapped card leaps off the wall, spins once and lands as the player
  // What flies is a light stand-in (the poster on a plain box), not the <video>: on phones the video
  // is busy starting to load and play at that exact moment, and moving it in 3D made the leap stutter.
  // The real player is revealed under the stand-in as it lands.
  function flyIn(from) {
    const a = from.getBoundingClientRect(), b = pv.getBoundingClientRect();
    if (!a.width || !b.width) return;
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    const s = Math.max(a.width / b.width, 0.08);
    const lift = Math.min(innerHeight * 0.12, 90);
    const P = 'perspective(1400px) ';
    const ghost = document.createElement('div');
    ghost.className = 'fly-ghost';
    Object.assign(ghost.style, { left: `${b.left}px`, top: `${b.top}px`, width: `${b.width}px`, height: `${b.height}px`,
      backgroundImage: `url('${pv.poster}')` });
    player.append(ghost);
    pv.style.opacity = '0';
    const dur = isMobile() ? 820 : 950;
    const anim = ghost.animate([
      { transform: `${P}translate3d(${dx}px,${dy}px,0) scale(${s}) rotateY(0deg)` },
      { transform: `${P}translate3d(${dx * 0.4}px,${dy * 0.4 - lift}px,0) scale(${(s + 1) * 0.5}) rotateY(200deg)`, offset: 0.5 },
      { transform: `${P}translate3d(0,0,0) scale(1.04) rotateY(354deg)`, offset: 0.85 },
      { transform: `${P}translate3d(0,0,0) scale(1) rotateY(360deg)` }
    ], { duration: dur, easing: 'cubic-bezier(.25,.75,.3,1)' });
    const land = () => { pv.style.opacity = ''; ghost.remove(); };
    anim.onfinish = land; anim.oncancel = land;
    setTimeout(land, dur + 250);   // belt and braces: never leave the player hidden
    player.addEventListener('close', land, { once: true });
    for (const el of [pcap, player.querySelector('.close')])
      el.animate([{ opacity: 0 }, { opacity: 0, offset: 0.7 }, { opacity: 1 }], { duration: dur + 150 });
  }
  function openGallery(cat) {
    $('#gallery-title').textContent = SITE.cats[cat] || '';
    grid.replaceChildren(...galleryWorks(cat).map(w => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'g-card';
      b.innerHTML = `<div class="thumb" style="background-image:url('${w.poster}'),url('${w.lqip}')"></div>
        <b>${w.title}</b><small>${w.client}</small>${w.pitch ? `<em>${w.pitch}</em>` : ''}`;
      b.setAttribute('aria-label', `צפייה: ${w.title}, ${w.client}`);
      b.addEventListener('click', () => play(w, b.querySelector('.thumb')));
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
    b.addEventListener('click', () => play(w, b));
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
      // absolute URL: a relative url() inside a custom property resolves against the stylesheet (assets/css/), not the page
      ui.style.setProperty('--room-bg', `url('${new URL(`${room.still}-1280.webp`, location.href).href}')`);
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
     Outside the building → walk in through the front door → the rooms → out through the
     office door onto the beach, where the prices and the rest stand as panels on the sand.
     The rooms sit side by side in one wide "panorama". Scrolling turns the camera to the right,
     leaning in a little mid-turn like a step forward, and settles in the next room.
     Neighbouring rooms blend into each other over their shared edge.
     ===================================================================== */
  const journey = $('#journey'), stage = $('#stage'), canvas = $('#canvas'), ctx = canvas.getContext('2d');
  const screensLayer = $('#screens'), rail = $('#rail'), loader = $('#loader');
  const SC = SITE.scenes || {};
  stage.style.setProperty('--lqip', `url('${(SC.exterior || rooms[0]).lqip}')`);
  const office = $('#office'), panels = office ? $('.block', office) : [];
  if (loader) loader.hidden = true;

  // timeline in "screens" (1 = one viewport of scroll). Phones get shorter stretches so every swipe moves something.
  const M = isMobile();
  const REST = M ? { studio: 1.5, office: 0.6 } : { studio: 0.8, office: 0.7 };
  const REST_DEFAULT = M ? 1.2 : 0.9, TRANS = M ? 1.25 : 1.5;
  const REST_ZOOM = 0.035;                 // camera creeps forward while you rest in a room
  const OVERLAP = 0.26;                    // share of a room's width that blends into its neighbour
  const STEP = IW * (1 - OVERLAP);         // distance between rooms in the panorama (virtual px)
  const WALK = 0.08;                       // mid-turn lean-in, as if stepping toward the next room
  const BOB = 4;                           // footstep sway (virtual px)
  const BLUR = M ? 0 : 3.5;                // motion blur at full turning speed (desktop only: cheap there)
  const canBlur = BLUR > 0 && 'filter' in ctx;
  const INTRO = M ? 0.45 : 0.6, DOOR = M ? 1.1 : 1.3;   // standing outside; walking through a door
  const segs = []; let total = 0;
  if (SC.exterior) {
    segs.push({ type: 'intro', start: 0, len: INTRO }); total += INTRO;
    segs.push({ type: 'enter', start: total, len: DOOR }); total += DOOR;
  }
  rooms.forEach((room, i) => {
    const len = REST[room.id] || REST_DEFAULT;
    segs.push({ type: 'rest', room: i, start: total, len }); total += len;
    if (room.next) { segs.push({ type: 'trans', from: i, to: i + 1, start: total, len: TRANS }); total += TRANS; }
  });
  const LAST = rooms.length - 1;
  if (SC.beach && rooms[LAST].door) { segs.push({ type: 'exit', start: total, len: DOOR }); total += DOOR; }

  /* ---------- images ---------- */
  const stills = rooms.map(() => null);
  // a copy of the still whose left edge fades out, so it melts into the room before it
  function feather(img) {
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'destination-in';
    const gr = g.createLinearGradient(0, 0, c.width * OVERLAP, 0);
    gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.55, 'rgba(0,0,0,.45)'); gr.addColorStop(1, '#000');
    g.fillStyle = gr; g.fillRect(0, 0, c.width, c.height);
    return c;
  }
  function loadStill(i) {
    if (i < 0 || i >= rooms.length) return null;
    if (stills[i]) return stills[i];
    const img = new Image(); img.decoding = 'async';
    img.onload = () => { img._ok = true; if (i > 0) img._f = feather(img); schedule(); };
    img.src = `${rooms[i].still}-1280.webp`;
    return (stills[i] = img);
  }

  const sceneImg = {};
  function loadScene(name) {
    if (!SC[name]) return null;
    if (sceneImg[name]) return sceneImg[name];
    const img = new Image(); img.decoding = 'async';
    img.onload = () => { img._ok = true; schedule(); };
    img.src = `${SC[name].still}-1280.webp`;
    return (sceneImg[name] = img);
  }

  // Every walk (in through the front door, room to room through the arches, out to the beach) is a
  // real video (Kling) as frames, scrubbed by the scroll. seq.time maps scroll t → clip seconds; the
  // doors get the most scroll, so a slow scroll opens them by hand. Until a walk's frames arrive, the
  // code-built camera move stands in.
  const SEQ = SC.seqs || {};
  const seqImgs = {};
  function loadSeq(id) {
    const q = SEQ[id];
    if (!q || seqImgs[id]) return;
    const imgs = seqImgs[id] = [], base = M ? q.mobile : q.desktop;
    // every 4th frame first (a rough walk is usable at once), then fill in the rest
    const order = [];
    for (const step of [4, 2, 1]) for (let i = 0; i < q.frames; i += step) if (!order.includes(i)) order.push(i);
    order.forEach(i => {
      const img = new Image(); img.decoding = 'async';
      img.onload = () => { img._ok = true; schedule(); };
      img.src = base + String(i + 1).padStart(4, '0') + '.webp';
      imgs[i] = img;
    });
  }
  function seqFrame(id, t) {
    const q = SEQ[id], imgs = seqImgs[id];
    if (!q || !imgs) return null;
    const k = q.time; let sec = k[k.length - 1][1];
    for (let j = 1; j < k.length; j++) if (t <= k[j][0]) {
      const [t0, s0] = k[j - 1], [t1, s1] = k[j];
      sec = s0 + (s1 - s0) * (t - t0) / (t1 - t0); break;
    }
    const want = Math.min(q.frames - 1, Math.max(0, Math.round(sec * q.fps)));
    for (let d = 0; d < q.frames; d++) {            // nearest frame that has arrived
      const a = imgs[want - d], b = imgs[want + d];
      if (a && a._ok) return a;
      if (b && b._ok) return b;
    }
    return null;
  }
  const transId = seg => 't' + (seg.from + 1);

  // Living loops: the same view as the still, filmed with a locked camera (waves, flickering lights,
  // drifting clouds). While you stand somewhere its loop is drawn instead of the still; only one plays.
  const LOOPS = SC.loops || {};
  const loopVid = {};
  let liveLoop = null;
  function useLoop(id) {
    let v = null;
    if (id && LOOPS[id]) {
      v = loopVid[id];
      if (!v) {
        v = loopVid[id] = document.createElement('video');
        Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'auto' });
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        v.addEventListener('loadeddata', () => schedule());
        v.addEventListener('playing', () => schedule());
        v.src = M ? LOOPS[id].mobile : LOOPS[id].desktop;
      }
    }
    for (const k in loopVid) if (loopVid[k] !== v && !loopVid[k].paused) loopVid[k].pause();
    if (v && v.paused) v.play().catch(() => {});
    liveLoop = v && v.readyState >= 2 && !v.paused ? v : null;
    return liveLoop;
  }
  // a frame the canvas can draw: a loaded image, or a loop that is playing
  const drawable = img => !!img && (img._ok || (img.tagName === 'VIDEO' && img.readyState >= 2));

  /* ---------- canvas & cover mapping ---------- */
  const view = { w: 0, h: 0, s: 1, dx: 0, dy: 0, dpr: 1 };
  function resize() {
    view.dpr = Math.min(devicePixelRatio || 1, 2);
    view.w = stage.clientWidth; view.h = stage.clientHeight;
    canvas.width = Math.round(view.w * view.dpr); canvas.height = Math.round(view.h * view.dpr);
    view.s = Math.max(view.w / IW, view.h / IH);
    view.dx = (view.w - IW * view.s) / 2; view.dy = (view.h - IH * view.s) / 2;
    // the beach section starts right after the last scroll step, over the pinned stage
    if (office) office.style.setProperty('--journey-gap', `${Math.round(total * view.h)}px`);
    layoutScreens(); schedule(true);
  }
  // room-relative image % → stage px, for a room at rest with no zoom (screens are laid out in this frame)
  const toScreen = ([px, py]) => [view.dx + px / 100 * IW * view.s, view.dy + py / 100 * IH * view.s];
  const focal = ri => {
    const p = rooms[ri] && rooms[ri].portal;
    return p ? [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[2][1]) / 2] : [50, 40];
  };

  /* ---------- camera ---------- */
  // cam = { x, y } centre of view in panorama px, z = zoom (1 = cover fit)
  const roomX = i => i * STEP;
  // Phones see only a narrow upright slice of each (wide) room, so the side screens fall outside the
  // frame. There, resting in a room means looking around it: the view slides from one side to the other.
  // Every walk lands in the middle of a room and the next one leaves from the middle, so the look-around
  // starts and ends there: middle → left wall → right wall → middle. The office (no screens) stays put.
  function panPath(i) {
    const hw = view.w / 2 / view.s, L = Math.min(hw, IW / 2), R = Math.max(IW - hw, IW / 2), C = IW / 2;
    if (!rooms[i].next) return [C, C];
    return [C, L, R, C];
  }
  function panX(i, t) {
    const P = panPath(i), n = P.length - 1, k = Math.min(Math.floor(t * n), n - 1), u = ease(t * n - k);
    return P[k] + (P[k + 1] - P[k]) * u;
  }
  function restCam(i, t) {
    if (M && view.w < view.h) return { x: roomX(i) + panX(i, t), y: IH / 2, z: 1, blur: 0 };
    const z = rooms[i].next ? 1 + REST_ZOOM * t : 1;
    const [fx, fy] = focal(i);
    const Fx = roomX(i) + fx / 100 * IW, Fy = fy / 100 * IH;     // zoom toward the room's centre screen
    const Cx = roomX(i) + IW / 2, Cy = IH / 2;
    return { x: Fx + (Cx - Fx) / z, y: Fy + (Cy - Fy) / z, z, blur: 0 };
  }
  const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const band = (p, a, b) => Math.min(Math.max((p - a) / (b - a), 0), 1);
  function transCam(seg, t) {
    const a = restCam(seg.from, 1), b = restCam(seg.to, 0);
    const p = ease(t), arc = Math.sin(Math.PI * p);
    const z = a.z + (b.z - a.z) * p + WALK * arc;
    const y = a.y + (b.y - a.y) * p + BOB * Math.sin(p * Math.PI * 6) * arc;
    // speed of the turn (derivative of the eased curve) drives the motion blur
    const speed = t < 0.5 ? 12 * t * t : 12 * (1 - t) * (1 - t);
    return { x: a.x + (b.x - a.x) * p, y, z, blur: canBlur ? BLUR * Math.min(speed / 3, 1) : 0, p };
  }
  function clampCam(cam) {   // never show past the top/bottom of the images
    const half = view.h / 2 / (view.s * cam.z);
    cam.y = Math.min(Math.max(cam.y, half), IH - half);
    return cam;
  }

  /* ---------- per-room screen layers (they ride along with the camera) ---------- */
  const layers = rooms.map((_, ri) => {
    const L = document.createElement('div'); L.className = 'room-layer'; L.dataset.room = ri;
    screensLayer.append(L); return L;
  });

  // only >= 0: draw that room alone (the walks land on the room by itself, not blended with its
  // neighbours); src: what to draw for it (its living loop) instead of the still
  function draw(cam, opacity, only = -1, src = null) {
    const S = view.s * cam.z, halfW = view.w / 2 / S;
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.fillStyle = '#061A22'; ctx.fillRect(0, 0, view.w, view.h);
    ctx.filter = cam.blur > 0.3 ? `blur(${cam.blur.toFixed(1)}px)` : 'none';
    const top = view.h / 2 - cam.y * S;
    rooms.forEach((_, i) => {
      const x0 = roomX(i), inView = (only < 0 || only === i) && x0 < cam.x + halfW && x0 + IW > cam.x - halfW;
      const L = layers[i], o = inView ? (opacity[i] || 0) : 0;
      L.style.opacity = o; L.classList.toggle('vis', o > 0.01);
      if (!inView) return;
      const img = loadStill(i);
      if (only === i && drawable(src)) {
        ctx.drawImage(src, view.w / 2 + (x0 - cam.x) * S, top, IW * S, IH * S);
      } else if (img && img._ok) {
        // the next room's left edge fades so the two rooms melt together
        const pic = only < 0 && img._f && x0 > cam.x - halfW ? img._f : img;
        ctx.drawImage(pic, view.w / 2 + (x0 - cam.x) * S, top, IW * S, IH * S);
      }
      if (o > 0.01) {
        // same affine map as the canvas: room-relative layout → panorama → camera
        const tx = view.w / 2 + (x0 - cam.x) * S - cam.z * view.dx, ty = top - cam.z * view.dy;
        L.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${cam.z.toFixed(4)})`;
        L.style.filter = cam.blur > 0.3 ? `blur(${cam.blur.toFixed(1)}px)` : '';
      }
    });
    ctx.filter = 'none';
  }

  // one stand-alone image (outside, beach) with its own camera: centre cx, cy in image px, zoom z
  function paint(img, cx, cy, z, alpha = 1, blur = 0) {
    if (!drawable(img) || alpha <= 0.004) return false;
    const S = view.s * z, hw = view.w / 2 / S, hh = view.h / 2 / S;
    cx = Math.min(Math.max(cx, hw), IW - hw); cy = Math.min(Math.max(cy, hh), IH - hh);
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.globalAlpha = alpha; ctx.filter = blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : 'none';
    ctx.drawImage(img, view.w / 2 - cx * S, view.h / 2 - cy * S, IW * S, IH * S);
    ctx.globalAlpha = 1; ctx.filter = 'none';
    return true;
  }
  function clearStage(img) {
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    if (drawable(img)) { ctx.fillStyle = '#061A22'; ctx.fillRect(0, 0, view.w, view.h); }
    else ctx.clearRect(0, 0, view.w, view.h);          // not loaded yet: the blurred preview behind shows
  }
  function hideLayers() { layers.forEach(L => { L.style.opacity = 0; L.classList.remove('vis'); }); }
  // walking up to a door: aim drifts from the middle of the view to the door while the zoom grows
  // at a constant perceived speed (exponential), with the same footstep sway as the turns
  function doorCam(door, t) {
    const e = ease(t), [dx, dy, zD] = door;
    return {
      cx: IW / 2 + (dx / 100 * IW - IW / 2) * e,
      cy: IH / 2 + (dy / 100 * IH - IH / 2) * e + BOB * Math.sin(e * Math.PI * 6) * Math.sin(Math.PI * e),
      z: Math.pow(zD, e),
      blur: canBlur ? BLUR * Math.sin(Math.PI * Math.min(t, 1)) : 0,
    };
  }
  // the room/beach we arrive in: still a step away when it fades in, settles at rest
  const arriveZoom = t => Math.pow(1.35, 1 - ease(band(t, 0.45, 1)));
  const crossfade = t => ease(band(t, 0.5, 0.9));

  /* ---------- beach panels: they stand on the sand and tilt as they pass ---------- */
  function shapePanels() {
    const vh = view.h;
    for (const el of panels) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > 2 * vh) continue;
      const q = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      el.style.setProperty('--q', q.toFixed(3));
      el.style.setProperty('--qa', Math.pow(Math.abs(q), 1.4).toFixed(3));
    }
  }

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
      s.el = el; layers[ri].append(el);
    }
    return list;
  });
  function layoutScreens() {
    roomScreens.forEach(list => list.forEach(s => { s.el.style.transform = homography(s.quad.map(toScreen)); }));
    if (calibrate) placeHandles();
  }

  /* ---------- video playback ---------- */
  const playing = new Set();
  let videoRoom = -1;
  function startVideo(holder, w) {
    if (playing.size >= MAX_PLAY() || holder.querySelector('video')) return;
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
  // which room's screens are live (videos + clickable). During a turn this hands over at the midpoint.
  function setVideoRoom(ri) {
    if (ri === videoRoom) return;
    if (videoRoom >= 0) roomScreens[videoRoom].forEach(s => { s.el.inert = true; s.el.tabIndex = -1; stopVideos(s.el); });
    videoRoom = ri;
    if (ri < 0) return;
    // portal first, then the screens nearest the centre; phones play only the centre screen (the rail has the rest)
    const order = roomScreens[ri].slice().sort((a, b) => (b.portal - a.portal) ||
      (Math.abs(a.quad[0][0] - 50) - Math.abs(b.quad[0][0] - 50)));
    for (const s of order) {
      s.el.inert = false; s.el.tabIndex = 0;
      if (s.portal || !isMobile()) startVideo(s.el, s.work);
    }
  }

  /* ---------- mobile rail: a small cover-flow of this room's works ---------- */
  let railRoom = -1, railTimer = 0;
  function fillRail(ri) {
    if (railRoom === ri) return;
    $$('.rail-card', rail).forEach(stopVideos);
    rail.replaceChildren(); railRoom = ri;
    worksForRoom(rooms[ri]).slice(0, 8).forEach((w, k) => {
      const c = card(w, 'rail-card'); c.dataset.id = w.id; c.style.setProperty('--i', k);
      c.innerHTML = `<span>${w.title}</span>`;
      rail.append(c);
    });
    rail.scrollLeft = 0;
    shapeRail();
  }
  // each card leans and shrinks with its distance from the centre; only the centre card plays
  function shapeRail() {
    const r = rail.getBoundingClientRect(), mid = r.left + r.width / 2;
    let best = null, bestD = 9;
    for (const c of $$('.rail-card', rail)) {
      const b = c.getBoundingClientRect();
      const d = Math.max(-2, Math.min(2, (b.left + b.width / 2 - mid) / b.width));
      const a = Math.min(Math.abs(d), 1);
      c.style.setProperty('--ry', `${(d * 18).toFixed(1)}deg`);
      c.style.setProperty('--sc', (1 - a * 0.16).toFixed(3));
      c.style.setProperty('--dim', (1 - a * 0.3).toFixed(3));
      c.classList.toggle('centre', a < 0.5);
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = c; }
    }
    clearTimeout(railTimer);
    railTimer = setTimeout(() => {
      if (!rail.classList.contains('on')) return;
      $$('.rail-card', rail).forEach(c => { if (c !== best) stopVideos(c); });
      if (best && bestD < 0.5) startVideo(best, worksById[best.dataset.id]);
    }, 180);
  }
  rail.addEventListener('scroll', () => requestAnimationFrame(shapeRail), { passive: true });

  /* ---------- room captions ---------- */
  let uiRoom = -1;
  function setUI(ri) {
    if (ri === uiRoom) return;
    if (uiRoom >= 0) $(`.room-ui[data-room="${rooms[uiRoom].id}"]`)?.classList.remove('on');
    uiRoom = ri;
    // phone rail lives in the work rooms; the opening room keeps the screen clear for the showreel and the scroll hint
    const railOn = ri > 0 && isMobile() && !!rooms[ri].category;
    if (railOn) fillRail(ri);
    else $$('.rail-card', rail).forEach(stopVideos);
    rail.classList.toggle('on', railOn);
    if (railOn) shapeRail();
    if (ri >= 0) $(`.room-ui[data-room="${rooms[ri].id}"]`)?.classList.add('on');
  }

  /* ---------- scroll → state ---------- */
  const current = { seg: null, t: 0 };
  let raf = 0;
  function schedule() { if (!raf) raf = requestAnimationFrame(render); }
  function render() {
    raf = 0;
    const top = journey.getBoundingClientRect().top;
    const pRaw = Math.max(-top / view.h, 0);
    if (panels.length && pRaw > total - 1.5) shapePanels();
    stage.classList.toggle('outside', !!SC.exterior && pRaw < INTRO + DOOR * 0.4);
    if (pRaw >= total && segs[segs.length - 1].type === 'exit') {
      // on the beach: keep walking slowly toward the sea while the panels pass by
      const beach = useLoop('beach') || loadScene('beach'), q = Math.min((pRaw - total) / 4, 1);
      clearStage(beach); paint(beach, IW / 2, IH / 2, 1 + 0.08 * q);
      hideLayers(); setUI(-1); setVideoRoom(-1);
      if (liveLoop) schedule();
      return;
    }
    const p = Math.min(pRaw, total - 0.0001);
    const seg = segs.find(s => p >= s.start && p < s.start + s.len) || segs[segs.length - 1];
    const t = (p - seg.start) / seg.len;
    current.seg = seg; current.t = t;

    if (seg.type === 'intro') {
      const ext = useLoop('exterior') || loadScene('exterior');
      clearStage(ext); paint(ext, IW / 2, IH / 2, 1 + REST_ZOOM * t);
      hideLayers(); setUI(0); setVideoRoom(-1);
      loadStill(0); loadSeq('enter');
    } else if (seg.type === 'enter' && seqFrame('enter', t)) {
      // the clip starts on the exterior still; carry over the small creep-in of the intro and let it go
      const img = seqFrame('enter', t), z = 1 + REST_ZOOM * (1 - ease(band(t, 0, 0.35)));
      useLoop(null); clearStage(img); paint(img, IW / 2, IH / 2, z);
      hideLayers(); setUI(-1); setVideoRoom(t > 0.8 ? 0 : -1);
      loadStill(1); loadSeq('t1');
    } else if (seg.type === 'enter') {
      loadSeq('enter'); useLoop(null);
      const ext = loadScene('exterior'), a = crossfade(t), c = doorCam(SC.exterior.door, band(t, 0, 0.85));
      if (a > 0.004) draw(clampCam({ x: roomX(0) + IW / 2, y: IH / 2, z: arriveZoom(t), blur: c.blur * 0.6 }), { 0: a });
      else { clearStage(ext); hideLayers(); }
      paint(ext, c.cx, c.cy, c.z, 1 - a, c.blur);
      setUI(-1); setVideoRoom(t > 0.5 ? 0 : -1);
      loadStill(1);
    } else if (seg.type === 'exit' && seqFrame('exit', t)) {
      // out through the office door: start where the room's camera left off, settle into the clip
      walk(seqFrame('exit', t), LAST, t);
      setVideoRoom(-1); loadScene('beach'); useLoop(null);
    } else if (seg.type === 'exit') {
      loadSeq('exit'); useLoop(null);
      const room = rooms[LAST], a = crossfade(t), c = doorCam(room.door, band(t, 0, 0.85));
      draw(clampCam({ x: roomX(LAST) + c.cx, y: c.cy, z: c.z, blur: c.blur }), {});
      paint(loadScene('beach'), IW / 2, IH / 2, arriveZoom(t), a);
      setUI(-1); setVideoRoom(-1);
    } else if (seg.type === 'rest') {
      // the room by itself, alive (its loop), the screens fading in as the walk settles
      const live = useLoop(rooms[seg.room].id), solo = !!SEQ.t1;
      draw(clampCam(restCam(seg.room, t)), { [seg.room]: solo ? ease(band(t, 0, 0.1)) : 1 }, solo ? seg.room : -1, live);
      setVideoRoom(seg.room); setUI(seg.room);
      loadStill(seg.room + 1);
      loadSeq(seg.room === LAST ? 'exit' : 't' + (seg.room + 1));
      if (seg.room === LAST) loadScene('beach');
    } else if (seqFrame(transId(seg), t)) {
      // through the arch into the next room: the real walk, scrubbed by the scroll
      walk(seqFrame(transId(seg), t), seg.from, t, true);
      useLoop(null); setVideoRoom(t > 0.85 ? seg.to : -1);
      loadStill(seg.to + 1); loadSeq(seg.to === LAST ? 'exit' : 't' + (seg.to + 1));
    } else {
      loadSeq(transId(seg)); useLoop(null);
      const cam = clampCam(transCam(seg, t));
      // screens of the room we leave fade out as we turn away; the next room's fade in as it arrives
      draw(cam, { [seg.from]: 1 - band(cam.p, 0.2, 0.55), [seg.to]: band(cam.p, 0.45, 0.8) });
      setUI(-1); setVideoRoom(cam.p < 0.5 ? seg.from : seg.to);
      loadStill(seg.to + 1);
    }
    if (liveLoop) schedule();          // a living loop on screen: keep painting its frames
  }
  // one frame of a walk, starting from where the room's camera was (phone look-around, desktop
  // creep-in) and settling into the clip's own framing within the first steps
  // toArch: the arches are on the right-hand wall. A phone in portrait sees only the middle of the
  // clip, so there the view turns toward the arch while walking up to it and back to the middle
  // as the next room opens up.
  function walk(img, from, t, toArch = false) {
    const r = restCam(from, 1), u = ease(band(t, 0, 0.3));
    let cx = r.x - roomX(from);
    cx += (IW / 2 - cx) * u;
    if (toArch && M && view.w < view.h) cx += (IW - IW / 2) * Math.sin(Math.PI * ease(band(t, 0.05, 0.9)));
    clearStage(img);
    paint(img, cx, r.y + (IH / 2 - r.y) * u, r.z + (1 - r.z) * u);
    hideLayers(); setUI(-1);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { railRoom = -1; uiRoom = -1; resize(); });
  // stop everything when the tab is hidden
  document.addEventListener('visibilitychange', () => { if (document.hidden) playing.forEach(v => v.pause()); else playing.forEach(v => v.play().catch(() => {})); });

  loadScene('exterior'); loadStill(0); loadStill(1);
  resize();

  /* =====================================================================
     CALIBRATION MODE (?calibrate)
     ===================================================================== */
  let handles = [];
  const activeRoomForCal = () => uiRoom;
  function placeHandles() {
    const ri = activeRoomForCal(); if (ri < 0) return;
    let h = 0;
    roomScreens[ri].forEach(s => s.quad.forEach(pt => {
      const [x, y] = toScreen(pt); const el = handles[h++]; if (el) el.style.transform = `translate(${x}px,${y}px)`;
    }));
  }
  if (calibrate) {
    document.documentElement.classList.add('calibrate');
    const panel = document.createElement('div'); panel.className = 'cal-panel';
    panel.innerHTML = '<b>Calibrate</b> — scroll to the start of a room, drag the red dots, then copy:<textarea readonly></textarea>';
    document.body.append(panel);
    const ta = $('textarea', panel);
    const dump = () => {
      const ri = activeRoomForCal(); if (ri < 0) return;
      const room = rooms[ri], list = roomScreens[ri];
      const portal = list.find(s => s.portal);
      ta.value = JSON.stringify({ room: room.id, portal: portal ? portal.quad : null, screens: list.filter(s => !s.portal).map(s => s.quad) });
    };
    const rebuild = () => {
      handles.forEach(h => h.remove()); handles = [];
      const ri = activeRoomForCal(); if (ri < 0) return;
      roomScreens[ri].forEach(s => s.quad.forEach((pt, qi) => {
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
    addEventListener('scroll', () => requestAnimationFrame(() => { if (uiRoom !== lastRoom) { lastRoom = uiRoom; rebuild(); } }), { passive: true });
    setTimeout(rebuild, 300);
  }
})();
