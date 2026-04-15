// ============================================
// Sepet sayfası
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  mountLayout('');
  renderCartPage();
});

function renderCartPage() {
  const root = document.getElementById('cart-root');
  const cart = getCart();

  if (cart.length === 0) {
    root.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <h2>Sepetiniz boş</h2>
        <p>Henüz sepetinize ürün eklemediniz. Koleksiyonumuzu keşfedin!</p>
        <a href="products.html" class="btn btn-primary">Alışverişe Başla</a>
      </div>
    `;
    return;
  }

  const subtotal = getCartSubtotal();
  const shipping = getShippingFee();
  const total = getCartTotal();
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map((item, idx) => renderCartRow(item, idx)).join('')}
      </div>
      <aside class="cart-summary">
        <h3>Sipariş Özeti</h3>
        <div class="summary-row">
          <span>Ara Toplam</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Kargo</span>
          ${shipping === 0
            ? `<span class="free">Ücretsiz</span>`
            : `<span>${formatPrice(shipping)}</span>`
          }
        </div>
        ${remainingForFree > 0 ? `
          <div class="shipping-hint">
            Ücretsiz kargo için <strong>${formatPrice(remainingForFree)}</strong> daha ekleyin!
          </div>
        ` : ''}
        <div class="summary-row total">
          <span>Toplam</span>
          <span>${formatPrice(total)}</span>
        </div>
        <div class="summary-actions">
          <a href="checkout.html" class="btn btn-primary btn-block btn-lg">Ödemeye Geç</a>
          <div style="text-align:center; margin-top: 0.75rem;">
            <a href="products.html" style="font-size: 0.9rem; color: var(--c-muted);">← Alışverişe Devam Et</a>
          </div>
        </div>
      </aside>
    </div>
  `;

  attachCartHandlers();
}

function renderCartRow(item, idx) {
  const p = PRODUCTS.find(x => x.id === item.productId);
  if (!p) return '';
  return `
    <div class="cart-item" data-index="${idx}">
      <a href="product.html?id=${p.id}" class="cart-item-image">
        <img src="${p.images[0]}" alt="${p.name}">
      </a>
      <div class="cart-item-info">
        <a href="product.html?id=${p.id}" class="cart-item-name">${p.name}</a>
        <span class="cart-item-variant">${CATEGORY_LABELS[p.category]} • Beden: ${item.size} • Renk: ${item.color}</span>
        <span class="cart-item-price">${formatPrice(p.price)} × ${item.qty} = ${formatPrice(p.price * item.qty)}</span>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-qty">
          <button class="qty-dec" aria-label="Azalt">−</button>
          <span>${item.qty}</span>
          <button class="qty-inc" aria-label="Arttır">+</button>
        </div>
        <button class="cart-item-remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          Kaldır
        </button>
      </div>
    </div>
  `;
}

function attachCartHandlers() {
  document.querySelectorAll('.cart-item').forEach(row => {
    const idx = +row.dataset.index;
    row.querySelector('.qty-dec').addEventListener('click', () => {
      const cart = getCart();
      if (cart[idx].qty > 1) {
        updateQty(idx, cart[idx].qty - 1);
        renderCartPage();
      }
    });
    row.querySelector('.qty-inc').addEventListener('click', () => {
      const cart = getCart();
      const p = PRODUCTS.find(x => x.id === cart[idx].productId);
      if (cart[idx].qty < p.stock) {
        updateQty(idx, cart[idx].qty + 1);
        renderCartPage();
      } else {
        toast('Stok limitine ulaşıldı', 'error');
      }
    });
    row.querySelector('.cart-item-remove').addEventListener('click', () => {
      removeFromCart(idx);
      toast('Ürün sepetten çıkarıldı');
      renderCartPage();
    });
  });
}
