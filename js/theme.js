const Theme = {
  init() {
    const saved = localStorage.getItem('ec_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this._updateBtn(saved);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ec_theme', next);
    this._updateBtn(next);
  },

  _updateBtn(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  },
};