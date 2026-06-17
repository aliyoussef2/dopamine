/* ======================================
   DOPAMINE -- Basket
   js/basket.js
   ====================================== */

const Basket = {
  items: [],

  init() {
    document.getElementById('close-basket')?.addEventListener('click', () => this.close());
    document.getElementById('basket-overlay')?.addEventListener('click', () => this.close());
  },

  open() {
    document.getElementById('basket-overlay')?.classList.add('open');
    document.getElementById('basket-drawer')?.classList.add('open');
  },

  close() {
    document.getElementById('basket-overlay')?.classList.remove('open');
    document.getElementById('basket-drawer')?.classList.remove('open');
  },

  add(itemId) {
    const item = Data.items.find(i => i.id === itemId);
    if (!item) return;

    const noteEl = document.getElementById(`note-${itemId}`);
    const note = noteEl ? noteEl.value.trim() : '';

    this.items.push({ ...item, note, cartId: Date.now() + Math.random() });
    if (noteEl) noteEl.value = '';

    this._updateCount();
    this._renderItems();
    this._toast(`${item.name} added to basket`);
  },

  remove(cartId) {
    this.items = this.items.filter(i => i.cartId !== cartId);
    this._updateCount();
    this._renderItems();
  },

  _updateCount() {
    const el = document.getElementById('basket-count');
    if (!el) return;
    el.textContent = this.items.length;
    el.classList.add('pop');
    setTimeout(() => el.classList.remove('pop'), 300);
  },

  _renderItems() {
    const container = document.getElementById('basket-items');
    const form = document.getElementById('customer-form');
    const footer = document.getElementById('basket-footer');
    if (!container) return;

    if (!this.items.length) {
      container.innerHTML = '<div class="basket-empty">Your basket is empty.<br/>Add something tasty from the menu!</div>';
      if (form) form.style.display = 'none';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (form) form.style.display = 'flex';
    if (footer) footer.style.display = 'block';

    container.innerHTML = this.items.map(it => `
      <div class="basket-item">
        <div class="basket-item-info">
          <div class="basket-item-name">${it.name}</div>
          ${it.note ? `<div class="basket-item-note">Note: ${it.note}</div>` : ''}
          <div class="basket-item-price">$${it.price.toFixed(2)}</div>
        </div>
        <button class="basket-item-remove" onclick="Basket.remove(${it.cartId})">Remove</button>
      </div>
    `).join('');

    this._updateTotal();
  },

  _updateTotal() {
    const totalUsd = this.items.reduce((sum, i) => sum + i.price, 0);
    const totalLbp = Math.round(totalUsd * Data.rate);
    const usdEl = document.getElementById('total-usd');
    const lbpEl = document.getElementById('total-lbp');
    if (usdEl) usdEl.textContent = `$${totalUsd.toFixed(2)}`;
    if (lbpEl) lbpEl.textContent = `${totalLbp.toLocaleString()} LBP`;
  },

  _toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('visible'), 2200);
  },
};
