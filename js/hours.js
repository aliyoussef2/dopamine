/* ======================================
   DOPAMINE -- Hours Renderer
   js/hours.js
   ====================================== */

const Hours = {
  render() {
    const grid = document.getElementById('hours-grid');
    if (!grid) return;

    const hours = Data.hours;
    if (!hours || !hours.length) return;

    const todayIdx = (new Date().getDay() + 6) % 7;

    grid.innerHTML = hours.map((h, i) => `
      <div class="hour-card ${i === todayIdx ? 'today' : ''}">
        <div class="hour-day-name">${h.day}</div>
        ${h.closed
          ? '<div class="hour-closed">Closed</div>'
          : `<div class="hour-time">${this._format(h.open)} - ${this._format(h.close)}</div>`}
      </div>
    `).join('');

    const aboutHours = document.getElementById('about-hours');
    if (aboutHours && hours[todayIdx]) {
      const t = hours[todayIdx];
      aboutHours.textContent = t.closed
        ? 'Closed today'
        : `Today: ${this._format(t.open)} - ${this._format(t.close)}`;
    }
  },

  _format(time) {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
  },
};
