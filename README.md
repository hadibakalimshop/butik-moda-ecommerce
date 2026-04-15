# Butik Moda — E-Ticaret

El emeği butik giyim için vitrin + sepet + checkout akışı olan, backend'siz statik bir e-ticaret sitesi. Saf **HTML + CSS + JavaScript** ile yazılmıştır.

## Özellikler

- 6 sayfa: ana sayfa, ürün listesi, ürün detayı, sepet, ödeme, sipariş onay
- 18 örnek ürün (kadın / erkek / çocuk) — görseller Unsplash'ten
- Kategori, beden, renk, fiyat filtreleri + arama + sıralama
- localStorage tabanlı sepet (sayfalar arası kalıcı)
- Checkout formu — kart no / tarih / CVV input mask'ları ve client-side validation
- Tamamen responsive (masaüstü / tablet / mobil)

## Çalıştırma

Herhangi bir build adımı yok. Sadece `index.html` dosyasını tarayıcıda aç:

```
start index.html
```

Ya da basit bir sunucu ile:
```
python -m http.server 8000
```

## Yapı

```
├── index.html / products.html / product.html
├── cart.html / checkout.html / success.html
├── css/   → style.css + sayfa özel stiller
├── js/    → data.js (ürünler), cart.js (sepet), main.js + sayfa scriptleri
```
