// ============================================
// Ürün Listesi — filtre, sıralama, arama
// ============================================
const state = {
  categories: [],
  sizes: [],
  colors: [],
  minPrice: null,
  maxPrice: null,
  search: '',
  sort: 'default'
};

document.addEventListener('DOMContentLoaded', () => {
  mountLayout('products');
  loadStateFromUrl();
  renderFilters();
  applyStateToFilterUI();
  attachFilterHandlers();
  renderProducts();
});

// ---------- URL senkronu ----------
function loadStateFromUrl() {
  const q = getAllQueryParams();
  if (q.category) state.categories = q.category.split(',');
  if (q.size) state.sizes = q.size.split(',');
  if (q.color) state.colors = q.color.split(',');
  if (q.minPrice) state.minPrice = +q.minPrice;
  if (q.maxPrice) state.maxPrice = +q.maxPrice;
  if (q.search) state.search = q.search;
  if (q.sort) state.sort = q.sort;
}
function syncStateToUrl() {
  setQueryParams({
    category: state.categories,
    size: state.sizes,
    color: state.colors,
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    search: state.search,
    sort: state.sort === 'default' ? null : state.sort
  });
}

// ---------- Filtre UI render ----------
function renderFilters() {
  // Kategori
  const catBox = document.getElementById('filter-categories');
  catBox.innerHTML = Object.entries(CATEGORY_LABELS).map(([key, label]) => `
    <label class="filter-check">
      <input type="checkbox" value="${key}" data-filter="category"> ${label}
    </label>
  `).join('');

  // Beden
  const sizeBox = document.getElementById('filter-sizes');
  sizeBox.innerHTML = ALL_SIZES.map(s =>
    `<button class="size-chip" data-size="${s}">${s}</button>`
  ).join('');

  // Renk
  const colorBox = document.getElementById('filter-colors');
  colorBox.innerHTML = ALL_COLORS.map(c => `
    <button class="color-swatch" data-color="${c}" title="${c}" style="background:${COLOR_MAP[c] || '#ccc'}"></button>
  `).join('');
}

function applyStateToFilterUI() {
  document.querySelectorAll('input[data-filter="category"]').forEach(el => {
    el.checked = state.categories.includes(el.value);
  });
  document.querySelectorAll('.size-chip').forEach(el => {
    el.classList.toggle('active', state.sizes.includes(el.dataset.size));
  });
  document.querySelectorAll('.color-swatch').forEach(el => {
    el.classList.toggle('active', state.colors.includes(el.dataset.color));
  });
  document.getElementById('min-price').value = state.minPrice ?? '';
  document.getElementById('max-price').value = state.maxPrice ?? '';
  document.getElementById('search-input').value = state.search;
  document.getElementById('sort-select').value = state.sort;
}

// ---------- Handlers ----------
function attachFilterHandlers() {
  document.querySelectorAll('input[data-filter="category"]').forEach(el => {
    el.addEventListener('change', () => {
      if (el.checked) state.categories.push(el.value);
      else state.categories = state.categories.filter(c => c !== el.value);
      onStateChange();
    });
  });

  document.querySelectorAll('.size-chip').forEach(el => {
    el.addEventListener('click', () => {
      const s = el.dataset.size;
      if (state.sizes.includes(s)) state.sizes = state.sizes.filter(x => x !== s);
      else state.sizes.push(s);
      el.classList.toggle('active');
      onStateChange();
    });
  });

  document.querySelectorAll('.color-swatch').forEach(el => {
    el.addEventListener('click', () => {
      const c = el.dataset.color;
      if (state.colors.includes(c)) state.colors = state.colors.filter(x => x !== c);
      else state.colors.push(c);
      el.classList.toggle('active');
      onStateChange();
    });
  });

  document.getElementById('min-price').addEventListener('input', e => {
    state.minPrice = e.target.value ? +e.target.value : null;
    onStateChange();
  });
  document.getElementById('max-price').addEventListener('input', e => {
    state.maxPrice = e.target.value ? +e.target.value : null;
    onStateChange();
  });

  document.getElementById('search-input').addEventListener('input', e => {
    state.search = e.target.value.trim();
    onStateChange();
  });

  document.getElementById('sort-select').addEventListener('change', e => {
    state.sort = e.target.value;
    onStateChange();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    Object.assign(state, { categories: [], sizes: [], colors: [], minPrice: null, maxPrice: null, search: '', sort: 'default' });
    applyStateToFilterUI();
    onStateChange();
  });

  // Mobil filtre drawer
  const toggle = document.getElementById('mobile-filter-toggle');
  const filters = document.querySelector('.filters');
  const closeBtn = document.querySelector('.filters-close');
  if (toggle) toggle.addEventListener('click', () => filters.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => filters.classList.remove('open'));
}

function onStateChange() {
  syncStateToUrl();
  renderProducts();
}

// ---------- Filtreleme + sıralama ----------
function filterProducts() {
  return PRODUCTS.filter(p => {
    if (state.categories.length && !state.categories.includes(p.category)) return false;
    if (state.sizes.length && !p.sizes.some(s => state.sizes.includes(s))) return false;
    if (state.colors.length && !p.colors.some(c => state.colors.includes(c))) return false;
    if (state.minPrice != null && p.price < state.minPrice) return false;
    if (state.maxPrice != null && p.price > state.maxPrice) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function sortProducts(list) {
  const arr = [...list];
  switch (state.sort) {
    case 'price-asc': arr.sort((a, b) => a.price - b.price); break;
    case 'price-desc': arr.sort((a, b) => b.price - a.price); break;
    case 'name-asc': arr.sort((a, b) => a.name.localeCompare(b.name, 'tr')); break;
    case 'newest': arr.sort((a, b) => b.id - a.id); break;
    default: break;
  }
  return arr;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const count = document.getElementById('result-count');
  const filtered = sortProducts(filterProducts());

  count.textContent = `${filtered.length} ürün bulundu`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h2>Aramanıza uygun ürün bulunamadı</h2>
        <p>Filtreleri değiştirerek tekrar deneyin.</p>
        <button class="btn btn-outline" onclick="document.getElementById('clear-filters').click()">Filtreleri Temizle</button>
      </div>
    `;
    return;
  }
  grid.innerHTML = filtered.map(renderProductCard).join('');
}
