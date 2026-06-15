/* ══════════════════════════════════════════
   ELITE COFFEE — Hours Renderer
   js/hours.js
   ══════════════════════════════════════════ */

const Hours = {
  fmt(t) {
    if (!t) return '';
    const [h, m] = t.split(':');
    const hh = parseInt(h);
    return `${hh % 12 || 12}:${m} ${hh >= 12 ? 'PM' : 'AM'}`;
  },

  render() {
    const grid = document.getElementById('hours-grid');
    if (!grid) return;

    grid.innerHTML = Data.hours.map((h, i) => `
      <div class="hour-card" style="transition-delay: ${i * 0.05}s">
        <div class="hour-day">${h.day}</div>
        <div class="hour-time ${h.closed ? 'hour-closed' : ''}">
          ${h.closed ? 'Closed' : this.fmt(h.open) + ' – ' + this.fmt(h.close)}
        </div>
      </div>
    `).join('');

    Animations.observe(grid.querySelectorAll('.hour-card'));

    // Update about section hours summary
    const open       = Data.hours.filter(h => !h.closed);
    const aboutHours = document.getElementById('about-hours');
    if (aboutHours && open.length) {
      aboutHours.textContent =
        `${open[0].day}–${open[open.length - 1].day}, ` +
        `${this.fmt(open[0].open)} – ${this.fmt(open[0].close)}`;
    }
  },
};