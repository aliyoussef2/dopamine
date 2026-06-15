/* ══════════════════════════════════════════
   ELITE COFFEE — Admin Panel
   js/admin.js
   ══════════════════════════════════════════ */

const Admin = {
  _keySeq: '',

  init() {
    // Secret keyboard shortcut: type "adminadmin"
    document.addEventListener('keydown', e => {
      if (document.getElementById('admin-overlay').classList.contains('visible')) return;
      this._keySeq = (this._keySeq + e.key.toLowerCase()).slice(-12);
      if (this._keySeq.endsWith('adminadmin')) this.open();
    });

    // Double-click footer admin btn
    document.getElementById('footer-admin-btn')
      ?.addEventListener('dblclick', () => this.open());

    // Login
    document.getElementById('admin-login-btn')
      ?.addEventListener('click', () => this.login());
    document.getElementById('admin-pass')
      ?.addEventListener('keydown', e => { if (e.key === 'Enter') this.login(); });

    // Close buttons
    document.getElementById('admin-close-btn')
      ?.addEventListener('click', () => this.close());
    document.getElementById('admin-back-btn')
      ?.addEventListener('click',  () => this.close());
  },

  open() {
    document.getElementById('admin-overlay').classList.add('visible');
    document.getElementById('admin-login-view').style.display = 'flex';
    document.getElementById('admin-panel').classList.remove('visible');
    document.getElementById('admin-user').value = '';
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-error').style.display = 'none';
    this._renderCats();
    this._renderItems();
    this._renderHoursForm();
    document.getElementById('rate-input').value = Data.rate;
    document.getElementById('wa-input').value   = Data.waNum;
  },

  close() {
    document.getElementById('admin-overlay').classList.remove('visible');
  },

  login() {
    const user = document.getElementById('admin-user').value.trim();
    const pass = document.getElementById('admin-pass').value;
    const err  = document.getElementById('admin-error');

    if (user === 'zakhouri' && pass === 'zakhourielite') {
      document.getElementById('admin-login-view').style.display = 'none';
      document.getElementById('admin-panel').classList.add('visible');
      err.style.display = 'none';
    } else {
      err.style.display = 'block';
      document.getElementById('admin-pass').value = '';
      err.animate(
        [{ transform: 'translateX(-5px)' },
         { transform: 'translateX(5px)'  },
         { transform: 'translateX(0)'    }],
        { duration: 260, iterations: 3 }
      );
    }
  },

  navTo(section, btn) {
    document.querySelectorAll('.admin-section')
      .forEach(s => s.classList.remove('visible'));
    document.querySelectorAll('.admin-nav-btn')
      .forEach(b => b.classList.remove('active'));
    document.getElementById(`admin-${section}`).classList.add('visible');
    btn.classList.add('active');
  },

  /* ── CATEGORIES ── */
  addCat() {
    const name = document.getElementById('cat-name').value.trim();
    const icon = document.getElementById('cat-icon').value.trim() || '🍴';
    if (!name) return Toast.show('Enter a category name');
    const cats = Data.cats;
    cats.push({
      id:   name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name,
      icon,
    });
    Data.cats = cats;
    document.getElementById('cat-name').value = '';
    document.getElementById('cat-icon').value = '';
    this._renderCats();
    Menu.render();
    Toast.show('Category added ✓');
  },

  delCat(id) {
    if (!confirm('Delete this category?')) return;
    Data.cats = Data.cats.filter(c => c.id !== id);
    this._renderCats();
    Menu.render();
    Toast.show('Deleted');
  },

  _renderCats() {
    const list = document.getElementById('admin-cat-list');
    const cats = Data.cats;
    list.innerHTML = cats.length
      ? cats.map(c => `
          <div class="admin-list-item">
            <div>
              <div class="admin-item-name">${c.icon} ${c.name}</div>
              <div class="admin-item-meta">${c.id}</div>
            </div>
            <button class="admin-btn danger"
              onclick="Admin.delCat('${c.id}')">Delete</button>
          </div>`).join('')
      : '<p style="color:var(--text-3);font-size:.82rem;">No categories yet.</p>';
  },

  /* ── ITEMS ── */
  addItem() {
    const name  = document.getElementById('item-name').value.trim();
    const catId = document.getElementById('item-cat').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const desc  = document.getElementById('item-desc').value.trim();

    if (!name)                    return Toast.show('Enter a name');
    if (!catId)                   return Toast.show('Select a category');
    if (isNaN(price) || price < 0) return Toast.show('Enter a valid price');

    const items = Data.items;
    items.push({ id: Date.now(), name, catId, price, desc });
    Data.items = items;

    document.getElementById('item-name').value  = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-desc').value  = '';

    this._renderItems();
    Menu.render();
    Toast.show('Item added ✓');
  },

  delItem(id) {
    Data.items = Data.items.filter(i => i.id !== id);
    this._renderItems();
    Menu.render();
    Toast.show('Removed');
  },

  _renderItems() {
    const sel = document.getElementById('item-cat');
    sel.innerHTML = Data.cats
      .map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`)
      .join('');

    const list = document.getElementById('admin-item-list');
    list.innerHTML = Data.items.length
      ? Data.items.map(it => {
          const cat = Data.cats.find(c => c.id === it.catId);
          const lbp = Math.round(it.price * Data.rate).toLocaleString();
          return `
            <div class="admin-list-item">
              <div>
                <div class="admin-item-name">${it.name}</div>
                <div class="admin-item-meta">
                  ${cat ? cat.icon + ' ' + cat.name : '—'} ·
                  $${it.price.toFixed(2)} · ${lbp} LBP
                  ${it.desc ? ' · ' + it.desc : ''}
                </div>
              </div>
              <div class="admin-item-actions">
                <span class="admin-tag">$${it.price.toFixed(2)}</span>
                <button class="admin-btn danger"
                  onclick="Admin.delItem(${it.id})">Delete</button>
              </div>
            </div>`;
        }).join('')
      : '<p style="color:var(--text-3);font-size:.82rem;">No items yet.</p>';
  },

  /* ── HOURS ── */
  _renderHoursForm() {
    document.getElementById('hours-form').innerHTML = Data.hours.map((h, i) => `
      <div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;
                  padding:8px 0;border-bottom:1px solid var(--border);">
        <span style="width:90px;font-size:.84rem;font-weight:600;
                     color:var(--text-2);">${h.day}</span>
        <input type="time" value="${h.open}"  id="ho-o-${i}"
               class="admin-input" style="width:105px;"
               ${h.closed ? 'disabled' : ''}/>
        <span style="color:var(--text-3);font-size:.8rem;">to</span>
        <input type="time" value="${h.close}" id="ho-c-${i}"
               class="admin-input" style="width:105px;"
               ${h.closed ? 'disabled' : ''}/>
        <label style="display:flex;align-items:center;gap:5px;
                      font-size:.78rem;color:var(--text-3);cursor:pointer;">
          <input type="checkbox" id="ho-x-${i}"
                 ${h.closed ? 'checked' : ''}
                 onchange="Admin._toggleDay(${i})"/> Closed
        </label>
      </div>`).join('');
  },

  _toggleDay(i) {
    const closed = document.getElementById(`ho-x-${i}`).checked;
    document.getElementById(`ho-o-${i}`).disabled = closed;
    document.getElementById(`ho-c-${i}`).disabled = closed;
  },

  saveHours() {
    Data.hours = Data.hours.map((h, i) => ({
      ...h,
      open:   document.getElementById(`ho-o-${i}`).value,
      close:  document.getElementById(`ho-c-${i}`).value,
      closed: document.getElementById(`ho-x-${i}`).checked,
    }));
    Hours.render();
    Toast.show('Hours saved ✓');
  },

  /* ── SETTINGS ── */
  saveRate() {
    Data.rate = parseInt(document.getElementById('rate-input').value) || 90000;
    Menu.render();
    this._renderItems();
    Toast.show('Rate saved ✓');
  },

  saveWA() {
    Data.waNum = document.getElementById('wa-input').value.trim();
    Toast.show('WhatsApp number saved ✓');
  },
};