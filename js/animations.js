/* ======================================
   DOPAMINE -- Scroll Animations
   js/animations.js
   ====================================== */

const Animations = {
  observer: null,

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      this.observer.observe(el);
    });
  },

  observe(elements) {
    elements.forEach(el => {
      this.observer.observe(el);
    });
  },
};
