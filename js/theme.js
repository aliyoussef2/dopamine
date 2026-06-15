/* ══════════════════════════════════════════
   ELITE COFFEE — Theme Toggle
   js/theme.js
   ══════════════════════════════════════════ */

const Theme = {
  init() {
    const saved = localStorage.getItem('ec_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ec_theme', next);
  },
};