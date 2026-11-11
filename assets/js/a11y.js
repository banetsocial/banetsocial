/* Accessibility menu — one round button on the side of every page, opening a panel of adjustments.
   The choices are kept in localStorage ('a11y') and applied as classes on <html> by a one-line script in
   each page's <head>, so they are in place before the first paint. "Stop motion" also switches the
   journey (desktop) and the phone page to their still versions, so it reloads the page. */
(() => {
  const KEY = 'a11y', html = document.documentElement;
  const FLAGS = [
    { k: 'contrast', label: 'ניגודיות גבוהה', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>' },
    { k: 'still', label: 'עצירת תנועה וסרטונים', note: 'הדף ייטען מחדש', reload: true, icon: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7M14 8.5v7"/>' },
    { k: 'links', label: 'הדגשת קישורים וכפתורים', icon: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>' },
    { k: 'font', label: 'גופן קריא', icon: '<path d="M5 19 11 5h2l6 14M8 14h8"/>' },
    { k: 'cursor', label: 'סמן עכבר גדול', icon: '<path d="M6 3v15l4-4 3 7 2.5-1-3-7h5.5z"/>' },
    { k: 'spacing', label: 'ריווח שורות ואותיות', icon: '<path d="M4 6h16M4 12h16M4 18h16"/>' },
  ];
  let st = {};
  try { st = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const apply = () => {
    for (const s of [1, 2, 3]) html.classList.toggle('a11y-s' + s, st.size === s);
    for (const f of FLAGS) html.classList.toggle('a11y-' + f.k, !!st[f.k]);
  };
  apply();

  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="4.2" r="2.1" fill="currentColor" stroke="none"/><path d="M4.5 8.2c2.5.8 5 1.2 7.5 1.2s5-.4 7.5-1.2M12 9.4v4.6m0 0-3 7m3-7 3 7"/></svg>';
  const statement = new URL('accessibility.html', document.baseURI).href;

  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'a11y-btn a11y-ui';
  btn.setAttribute('aria-label', 'תפריט נגישות'); btn.setAttribute('aria-haspopup', 'dialog');
  btn.innerHTML = ICON + '<span>נגישות</span>';

  const dlg = document.createElement('dialog');
  dlg.className = 'a11y-panel a11y-ui'; dlg.setAttribute('aria-labelledby', 'a11y-title');
  dlg.innerHTML = `
    <div class="a11y-head"><h2 id="a11y-title">${ICON}התאמות נגישות</h2>
      <button type="button" class="a11y-x" aria-label="סגירת תפריט הנגישות">×</button></div>
    <div class="a11y-size" role="group" aria-labelledby="a11y-size-l">
      <span id="a11y-size-l">גודל טקסט</span>
      <button type="button" data-size="-1" aria-label="הקטנת טקסט">א−</button>
      <output aria-live="polite"></output>
      <button type="button" data-size="1" aria-label="הגדלת טקסט">א+</button>
    </div>
    <div class="a11y-grid">${FLAGS.map(f => `
      <button type="button" class="a11y-t" data-k="${f.k}" aria-pressed="false">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${f.icon}</svg>
        <b>${f.label}</b>${f.note ? `<small>${f.note}</small>` : ''}</button>`).join('')}
    </div>
    <div class="a11y-foot">
      <button type="button" class="a11y-reset">איפוס כל ההתאמות</button>
      <a href="${statement}">הצהרת נגישות</a>
    </div>`;

  const out = dlg.querySelector('output');
  const sync = () => {
    out.textContent = ['רגיל', '110%', '125%', '140%'][st.size || 0];
    dlg.querySelector('[data-size="-1"]').disabled = !st.size;
    dlg.querySelector('[data-size="1"]').disabled = st.size === 3;
    for (const t of dlg.querySelectorAll('.a11y-t')) t.setAttribute('aria-pressed', String(!!st[t.dataset.k]));
    btn.classList.toggle('on', Object.keys(st).some(k => st[k]));
  };
  dlg.addEventListener('click', e => {
    if (e.target === dlg) return dlg.close();                      // a click on the dim backdrop closes
    const b = e.target.closest('button'); if (!b) return;
    if (b.classList.contains('a11y-x')) return dlg.close();
    if (b.dataset.size) { st.size = Math.max(0, Math.min(3, (st.size || 0) + +b.dataset.size)); }
    else if (b.dataset.k) {
      const f = FLAGS.find(x => x.k === b.dataset.k);
      st[f.k] = !st[f.k];
      if (f.reload) { save(); location.reload(); return; }
    } else if (b.classList.contains('a11y-reset')) {
      const hadStill = st.still; st = {}; save();
      if (hadStill) { location.reload(); return; }
    }
    save(); apply(); sync();
    dispatchEvent(new Event('resize'));                           // the journey re-measures its text
  });
  btn.addEventListener('click', () => { sync(); dlg.showModal(); dlg.querySelector('.a11y-x').focus(); });
  dlg.addEventListener('close', () => btn.focus());

  // "stop motion" on any page: every video stays still
  if (st.still) {
    const stop = () => document.querySelectorAll('video').forEach(v => { if (!v.closest('dialog')) { v.autoplay = false; v.pause(); } });
    stop(); new MutationObserver(stop).observe(document.body, { childList: true, subtree: true });
    document.addEventListener('play', e => { const v = e.target; if (v.tagName === 'VIDEO' && !v.closest('dialog')) v.pause(); }, true);
  }

  document.body.append(btn, dlg);
  sync();
})();
