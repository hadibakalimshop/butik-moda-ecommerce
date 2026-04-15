// ============================================
// Checkout — form validation + sipariş
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  mountLayout('');
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }
  renderMiniCart();
  attachCardMasks();
  document.getElementById('checkout-form').addEventListener('submit', handleSubmit);
});

function renderMiniCart() {
  const box = document.getElementById('mini-cart');
  const cart = getCart();
  const subtotal = getCartSubtotal();
  const shipping = getShippingFee();
  const total = getCartTotal();

  box.innerHTML = `
    <h3>Sipariş Özeti</h3>
    ${cart.map(item => {
      const p = PRODUCTS.find(x => x.id === item.productId);
      if (!p) return '';
      return `
        <div class="mini-item">
          <img src="${p.images[0]}" alt="${p.name}">
          <div class="mini-item-info">
            <div class="mini-item-name">${p.name}</div>
            <div class="mini-item-var">${item.size} • ${item.color} • ${item.qty} adet</div>
          </div>
          <div class="mini-item-total">${formatPrice(p.price * item.qty)}</div>
        </div>
      `;
    }).join('')}
    <div class="summary-row" style="margin-top: 1rem;">
      <span class="muted">Ara Toplam</span>
      <span>${formatPrice(subtotal)}</span>
    </div>
    <div class="summary-row">
      <span class="muted">Kargo</span>
      ${shipping === 0 ? '<span class="free">Ücretsiz</span>' : `<span>${formatPrice(shipping)}</span>`}
    </div>
    <div class="summary-row total">
      <span>Toplam</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;
}

function attachCardMasks() {
  // Kart no: 16 hane, 4'erli grup
  const cardNo = document.getElementById('cardNumber');
  cardNo.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
  });

  // Son kul. MM/YY
  const exp = document.getElementById('cardExpiry');
  exp.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
  });

  // CVV 3 hane
  const cvv = document.getElementById('cardCvv');
  cvv.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
  });

  // Telefon
  const phone = document.getElementById('phone');
  phone.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^\d\s]/g, '').slice(0, 14);
  });

  // Posta kodu
  const zip = document.getElementById('zip');
  zip.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
  });
}

function validate(form) {
  const errors = {};
  const data = Object.fromEntries(new FormData(form));

  if (!data.fullName || data.fullName.trim().length < 3) errors.fullName = 'Ad soyad en az 3 karakter olmalı';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) errors.email = 'Geçerli bir e-posta girin';
  if (!data.phone || data.phone.replace(/\s/g, '').length < 10) errors.phone = 'Geçerli bir telefon girin';
  if (!data.address || data.address.trim().length < 10) errors.address = 'Tam adres girin';
  if (!data.city || data.city.trim().length < 2) errors.city = 'Şehir girin';
  if (!/^\d{5}$/.test(data.zip || '')) errors.zip = 'Posta kodu 5 haneli olmalı';

  const cardNum = (data.cardNumber || '').replace(/\s/g, '');
  if (!/^\d{16}$/.test(cardNum)) errors.cardNumber = 'Kart numarası 16 hane olmalı';
  if (!data.cardName || data.cardName.trim().length < 3) errors.cardName = 'Kart üzerindeki ismi girin';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry || '')) errors.cardExpiry = 'AA/YY formatında girin';
  else {
    const [mm, yy] = data.cardExpiry.split('/').map(Number);
    const now = new Date();
    const exp = new Date(2000 + yy, mm - 1, 1);
    exp.setMonth(exp.getMonth() + 1);
    if (exp <= now) errors.cardExpiry = 'Kartın son kullanma tarihi geçmiş';
  }
  if (!/^\d{3}$/.test(data.cardCvv || '')) errors.cardCvv = 'CVV 3 hane olmalı';

  return { errors, data };
}

function handleSubmit(e) {
  e.preventDefault();
  // Önceki hataları temizle
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

  const { errors } = validate(e.target);

  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([field, msg]) => {
      const input = document.getElementById(field);
      const err = document.getElementById(`err-${field}`);
      if (input) input.classList.add('error');
      if (err) err.textContent = msg;
    });
    toast('Lütfen formdaki hataları düzeltin', 'error');
    // İlk hatalı alana kaydır
    const firstError = document.querySelector('input.error');
    if (firstError) firstError.focus();
    return;
  }

  // Sipariş oluştur
  const orderCode = 'BTK-' + Date.now().toString().slice(-8);
  clearCart();
  window.location.href = `success.html?order=${orderCode}`;
}
