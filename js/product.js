// ============================================
// Ürün Detay Sayfası
// ============================================
let currentProduct = null;
let selectedColor = null;
let selectedSize = null;

document.addEventListener('DOMContentLoaded', () => {
  mountLayout('');
  const id = +getQueryParam('id');
  currentProduct = PRODUCTS.find(p => p.id === id);

  if (!currentProduct) {
    document.getElementById('product-root').innerHTML = `
      <div class="empty-state">
        <h2>Ürün bulunamadı</h2>
        <p>Aradığınız ürün mevcut değil ya da kaldırılmış olabilir.</p>
        <a href="products.html" class="btn btn-primary">Tüm Ürünler</a>
      </div>
    `;
    return;
  }

  document.title = `${currentProduct.name} — Butik Moda`;
  renderDetail();
  renderSimilar();
});

function renderDetail() {
  const p = currentProduct;
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  document.getElementById('breadcrumb-category').innerHTML = `
    <a href="products.html?category=${p.category}">${CATEGORY_LABELS[p.category]}</a>
    <span class="sep">/</span>
    <span>${p.name}</span>
  `;

  document.getElementById('product-root').innerHTML = `
    <div class="product-layout">
      <div class="gallery">
        <div class="gallery-main">
          <img id="main-image" src="${p.images[0]}" alt="${p.name}">
        </div>
        ${p.images.length > 1 ? `
          <div class="gallery-thumbs">
            ${p.images.map((src, i) => `
              <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                <img src="${src}" alt="${p.name} ${i + 1}">
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="product-info">
        <span class="product-category-label">${CATEGORY_LABELS[p.category]}</span>
        <h1 class="product-name">${p.name}</h1>
        <div class="product-prices">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-oldprice">${formatPrice(p.oldPrice)}</span>` : ''}
          ${discount ? `<span class="discount-tag">%${discount} indirim</span>` : ''}
        </div>
        <p class="product-description">${p.description}</p>

        <div class="variant-section">
          <div class="variant-label">
            <span>Renk</span>
            <span class="selected-value" id="selected-color">Seçiniz</span>
          </div>
          <div class="variant-list-colors">
            ${p.colors.map(c => `
              <button class="variant-color" data-color="${c}" title="${c}"
                      style="background:${COLOR_MAP[c] || '#ccc'}"></button>
            `).join('')}
          </div>
        </div>

        <div class="variant-section">
          <div class="variant-label">
            <span>Beden</span>
            <span class="selected-value" id="selected-size">Seçiniz</span>
          </div>
          <div class="variant-list-sizes">
            ${p.sizes.map(s => `<button class="variant-size" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>

        <div class="quantity-row">
          <span class="qty-label">Adet</span>
          <div class="qty-stepper">
            <button id="qty-minus" aria-label="Azalt">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${p.stock}">
            <button id="qty-plus" aria-label="Arttır">+</button>
          </div>
          <span class="stock-info ${p.stock < 5 ? 'low' : ''}">
            ${p.stock < 5 ? `Son ${p.stock} adet!` : `${p.stock} adet stokta`}
          </span>
        </div>

        <div class="action-row">
          <button class="btn btn-primary btn-lg" id="add-to-cart-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Sepete Ekle
          </button>
        </div>

        <div class="product-meta">
          <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> 500₺ üzeri siparişlerde ücretsiz kargo</div>
          <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg> 14 gün içinde kolay iade</div>
          <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> El emeğiyle hazırlanmıştır</div>
        </div>
      </div>
    </div>
  `;

  attachDetailHandlers();
}

function attachDetailHandlers() {
  // Thumbnail tıklama
  document.querySelectorAll('.gallery-thumb').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('main-image').src = currentProduct.images[+t.dataset.index];
    });
  });

  // Renk seçimi
  document.querySelectorAll('.variant-color').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.variant-color').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      selectedColor = el.dataset.color;
      document.getElementById('selected-color').textContent = selectedColor;
    });
  });

  // Beden seçimi
  document.querySelectorAll('.variant-size').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.variant-size').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      selectedSize = el.dataset.size;
      document.getElementById('selected-size').textContent = selectedSize;
    });
  });

  // Adet kontrolü
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, +qtyInput.value - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = Math.min(currentProduct.stock, +qtyInput.value + 1);
  });
  qtyInput.addEventListener('change', () => {
    let v = +qtyInput.value || 1;
    v = Math.min(Math.max(1, v), currentProduct.stock);
    qtyInput.value = v;
  });

  // Sepete ekle
  document.getElementById('add-to-cart-btn').addEventListener('click', handleAddToCart);
}

function handleAddToCart() {
  if (!selectedColor) {
    toast('Lütfen bir renk seçin', 'error');
    return;
  }
  if (!selectedSize) {
    toast('Lütfen bir beden seçin', 'error');
    return;
  }
  const qty = +document.getElementById('qty-input').value;
  addToCart({
    productId: currentProduct.id,
    color: selectedColor,
    size: selectedSize,
    qty
  });
  toast(`${currentProduct.name} sepete eklendi ♡`);
}

function renderSimilar() {
  const container = document.getElementById('similar-grid');
  if (!container) return;
  const similar = PRODUCTS
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);
  if (similar.length === 0) {
    document.getElementById('similar-section').style.display = 'none';
    return;
  }
  container.innerHTML = similar.map(renderProductCard).join('');
}
