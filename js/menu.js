/* ======================================
   DOPAMINE -- Menu Renderer
   js/menu.js
   ====================================== */

const Menu = {
  activeCat: null,

  init() {
    // data.js will call onDataChange() whenever anything updates.
    // If data already arrived before init() ran, render right away.
    this.onDataChange();
  },

  // Called by data.js every time categories/items/settings change.
  onDataChange() {
    if (!Data.catsLoaded || !Data.itemsLoaded) return;

    const cats = Data.cats;
    if (!cats.length) return;

    if (!this.activeCat || !cats.find(c => c.id === this.activeCat)) {
      this.activeCat = cats[0].id;
    }

    this.render();
  },

  render() {
    this._renderPills();
    this._renderGrid();
  },

  _renderPills() {
    const row = document.getElementById('category-row');
    if (!row) return;

    const cats = Data.cats;
    row.innerHTML = cats.map(c => `
      <button
        class="category-pill ${c.id === this.activeCat ? 'active' : ''}"
        onclick="Menu.switchCat('${c.id}', this)">
        ${c.name}
      </button>
    `).join('');
  },

  switchCat(id, btn) {
    this.activeCat = id;
    document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    this._renderGrid();
  },

  _renderGrid() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    const items = Data.items.filter(i => i.catId === this.activeCat);

    if (!items.length) {
      grid.innerHTML = '<div class="menu-empty">No items yet -- add them from the admin panel.</div>';
      return;
    }

    grid.innerHTML = items.map(item => {
      const lbp = Math.round(item.price * Data.rate).toLocaleString();
      const img = Data.getImage(item.id);

      const imgHtml = img
        ? `<div class="card-image"><img src="${img}" alt="${item.name}" loading="lazy"/></div>`
        : `<div class="card-image card-image--empty"><span class="card-image-text">No photo</span></div>`;

      return `
        <div class="menu-card visible" data-item-id="${item.id}">
          ${imgHtml}
          <div class="card-body">
            <div class="card-top">
              <div class="card-info">
                <div class="card-name">${item.name}</div>
                ${item.desc ? `<div class="card-desc">${item.desc}</div>` : ''}
              </div>
              <div class="card-price">
                <div class="price-usd">$${item.price.toFixed(2)}</div>
                <div class="price-lbp">${lbp} LBP</div>
              </div>
            </div>
            <div class="card-footer">
              <input class="item-note" id="note-${item.id}" placeholder="Note for this item..."/>
              <button class="add-to-basket" onclick="Basket.add('${item.id}')">+</button>
            </div>
          </div>
        </div>`;
    }).join('');
  },
};
