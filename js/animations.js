/* ══════════════════════════════════════════
   ELITE COFFEE — Scroll Animations
   js/animations.js
   ══════════════════════════════════════════ */

const Animations = {
  _observer: null,

  init() {
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this._observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe all reveal elements on page load
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      this._observer.observe(el);
    });
  },

  observe(elements) {
    elements.forEach((el, i) => {
      setTimeout(() => this._observer?.observe(el), i * 80);
    });
  },
};


const Toast = {
  _timer: null,

  show(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('visible');
    clearTimeout(this._timer);
    this._timer = setTimeout(() => el.classList.remove('visible'), 2400);
  },
};