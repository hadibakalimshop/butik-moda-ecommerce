// ============================================
// Ortak helper'lar
// ============================================

function formatPrice(n) {
  return '₺' + n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function getAllQueryParams() {
  const params = {};
  new URLSearchParams(window.location.search).forEach((v, k) => { params[k] = v; });
  return params;
}

function setQueryParams(params) {
  const url = new URL(window.location);
  url.search = '';
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '' && !(Array.isArray(v) && v.length === 0)) {
      if (Array.isArray(v)) url.searchParams.set(k, v.join(','));
      else url.searchParams.set(k, v);
    }
  });
  window.history.replaceState({}, '', url);
}

// ============================================
// Ürün kartı bileşeni (her yerde kullanılır)
// ============================================
function renderProductCard(product) {
  const badge = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : '';
  const oldPrice = product.oldPrice
    ? `<span class="product-card-oldprice">${formatPrice(product.oldPrice)}</span>`
    : '';
  return `
    <a class="product-card" href="product.html?id=${product.id}">
      <div class="product-card-image">
        ${badge}
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${CATEGORY_LABELS[product.category]}</span>
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-prices">
          <span class="product-card-price">${formatPrice(product.price)}</span>
          ${oldPrice}
        </div>
      </div>
    </a>
  `;
}

// ============================================
// Toast bildirimleri
// ============================================
function toast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'error' ? ' error' : '');
  const icon = type === 'error'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  el.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

// ============================================
// Header HTML (tek kaynaktan)
// ============================================
function renderHeader(activePage = '') {
  const navLinks = [
    { label: 'Ana Sayfa', href: 'index.html', key: 'home' },
    { label: 'Kadın', href: 'products.html?category=kadin', key: 'kadin' },
    { label: 'Erkek', href: 'products.html?category=erkek', key: 'erkek' },
    { label: 'Çocuk', href: 'products.html?category=cocuk', key: 'cocuk' },
    { label: 'Tüm Ürünler', href: 'products.html', key: 'products' }
  ];
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          Butik Moda
          <small>EL EMEĞİ KOLEKSİYON</small>
        </a>
        <button class="icon-btn menu-toggle" aria-label="Menü">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <nav>
          <ul class="main-nav">
            ${navLinks.map(l => `<li><a href="${l.href}" class="${l.key === activePage ? 'active' : ''}">${l.label}</a></li>`).join('')}
          </ul>
        </nav>
        <div class="header-actions">
          <a href="cart.html" class="icon-btn" aria-label="Sepet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-badge">0</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

// ============================================
// Footer HTML
// ============================================
function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col footer-brand">
            <span class="logo">Butik Moda</span>
            <p>El emeğiyle hazırlanan, özenle seçilmiş butik parçalar. Her bir tasarım bir hikâye anlatır.</p>
            <div class="social-links">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="10" y1="14" x2="8" y2="22"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Alışveriş</h4>
            <ul>
              <li><a href="products.html?category=kadin">Kadın</a></li>
              <li><a href="products.html?category=erkek">Erkek</a></li>
              <li><a href="products.html?category=cocuk">Çocuk</a></li>
              <li><a href="products.html">Tüm Ürünler</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Yardım</h4>
            <ul>
              <li><a href="#">Kargo & Teslimat</a></li>
              <li><a href="#">İade & Değişim</a></li>
              <li><a href="#">Beden Rehberi</a></li>
              <li><a href="#">İletişim</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Bültenimize Katılın</h4>
            <p>Yeni koleksiyonlar ve özel fırsatlardan ilk sizin haberiniz olsun.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault(); toast('Teşekkürler! Aboneliğiniz alındı ♡'); this.reset();">
              <input type="email" placeholder="E-posta adresiniz" required>
              <button type="submit">Katıl</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          © ${new Date().getFullYear()} Butik Moda — Tüm hakları saklıdır. El emeğiyle, sevgiyle hazırlandı.
        </div>
      </div>
    </footer>
  `;
}

// ============================================
// Layout kurulum (her sayfa çağırır)
// ============================================
function mountLayout(activePage = '') {
  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (headerSlot) headerSlot.outerHTML = renderHeader(activePage);
  if (footerSlot) footerSlot.outerHTML = renderFooter();

  // Menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
  updateCartBadge();
}
