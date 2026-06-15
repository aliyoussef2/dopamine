/* ══════════════════════════════════════════
   ELITE COFFEE — Basket
   js/basket.js
   ══════════════════════════════════════════ */

const Basket = {
  items: [],

  open() {
    document.getElementById('basket-overlay').classList.add('open');
    document.getElementById('basket-drawer').classList.add('open');
  },

  close() {
    document.getElementById('basket-overlay').classList.remove('open');
    document.getElementById('basket-drawer').classList.remove('open');
  },

  add(itemId) {
    const item = Data.items.find(i => i.id === itemId);
    if (!item) return;

    const note = document.getElementById(`note-${itemId}`)?.value.trim() || '';
    const existing = this.items.find(b => b.id === itemId && b.note === note);

    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...item, qty: 1, note });
    }

    this.refresh();
    Toast.show(`${item.name} added ✓`);

    // Animate add button
    const btn = document.querySelector(`[data-item-id="${itemId}"] .add-to-basket`);
    if (btn) {
      btn.style.transform = 'scale(1.35) rotate(90deg)';
      setTimeout(() => btn.style.transform = '', 320);
    }
  },

  changeQty(index, delta) {
    this.items[index].qty += delta;
    if (this.items[index].qty <= 0) this.items.splice(index, 1);
    this.refresh();
  },

  getTotal() {
    return this.items.reduce((sum, b) => sum + b.price * b.qty, 0);
  },

  refresh() {
    const count = this.items.reduce((s, b) => s + b.qty, 0);

    // Update badge
    const badge = document.getElementById('basket-count');
    badge.textContent = count;
    badge.classList.add('pop');
    setTimeout(() => badge.classList.remove('pop'), 300);

    // Update totals
    const total = this.getTotal();
    document.getElementById('total-usd').textContent = '$' + total.toFixed(2);
    document.getElementById('total-lbp').textContent =
      Math.round(total * Data.rate).toLocaleString() + ' LBP';

    const itemsEl  = document.getElementById('basket-items');
    const formEl   = document.getElementById('customer-form');
    const footerEl = document.getElementById('basket-footer');

    if (!this.items.length) {
      itemsEl.innerHTML = `
        <div class="basket-empty">
          <div class="empty-icon">🛍</div>
          <p>Your basket is empty.<br/>Browse the menu and add items!</p>
        </div>`;
      formEl.style.display   = 'none';
      footerEl.style.display = 'none';
      return;
    }

    formEl.style.display   = 'flex';
    footerEl.style.display = 'block';

    itemsEl.innerHTML = this.items.map((b, i) => {
      const lbp = Math.round(b.price * b.qty * Data.rate).toLocaleString();
      return `
        <div class="basket-item">
          <div class="basket-item-info">
            <div class="basket-item-name">${b.name}</div>
            <div class="basket-item-price">
              $${(b.price * b.qty).toFixed(2)} · ${lbp} LBP
            </div>
            ${b.note ? `<div class="basket-item-note">📝 ${b.note}</div>` : ''}
          </div>
          <div class="basket-item-controls">
            <button class="qty-btn" onclick="Basket.changeQty(${i}, 1)">+</button>
            <span class="qty-num">${b.qty}</span>
            <button class="qty-btn" onclick="Basket.changeQty(${i}, -1)">−</button>
          </div>
        </div>`;
    }).join('');
  },

  init() {
    document.getElementById('basket-overlay')
      ?.addEventListener('click', () => this.close());
    document.getElementById('close-basket')
      ?.addEventListener('click', () => this.close());
    document.getElementById('whatsapp-order-btn')
      ?.addEventListener('click', () => Order.send());
    this.refresh();
  },
};