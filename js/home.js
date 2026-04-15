// ============================================
// Ana sayfa
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  mountLayout('home');

  const grid = document.getElementById('featured-grid');
  if (grid) {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
    grid.innerHTML = featured.map(renderProductCard).join('');
  }
});
