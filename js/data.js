// ============================================
// Butik Moda — Ürün Verisi
// ============================================
const PRODUCTS = [
  {
    id: 1,
    name: "Pamuklu Bohem Bluz",
    category: "kadin",
    price: 349,
    oldPrice: 499,
    images: [
      "https://images.unsplash.com/photo-1564257577-2d3ed7bb5b10?w=800&q=80",
      "https://images.unsplash.com/photo-1485518882345-15568b007407?w=800&q=80",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=80"
    ],
    colors: ["krem", "pudra", "haki"],
    sizes: ["XS", "S", "M", "L"],
    description: "Yumuşak pamuklu kumaştan el işi detaylarla hazırlanmış bohem kesim bluz. Günlük şıklığın vazgeçilmezi.",
    stock: 12,
    featured: true,
    badge: "İndirim"
  },
  {
    id: 2,
    name: "Uzun Kolsuz Keten Elbise",
    category: "kadin",
    price: 589,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80"
    ],
    colors: ["beyaz", "bej"],
    sizes: ["S", "M", "L"],
    description: "%100 keten, nefes alan ve zarif düşüşü ile yaz akşamlarının favori parçası. Rahatlığın ve zarafetin buluştuğu bir tasarım.",
    stock: 8,
    featured: true,
    badge: "Yeni"
  },
  {
    id: 3,
    name: "Triko Hırka",
    category: "kadin",
    price: 429,
    oldPrice: 549,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
    ],
    colors: ["krem", "haki", "bordo"],
    sizes: ["S", "M", "L", "XL"],
    description: "Yumuşak örgü dokulu, rahat kesimli triko hırka. Geçiş mevsimlerinin en sadık eşlikçisi.",
    stock: 15,
    featured: false,
    badge: "İndirim"
  },
  {
    id: 4,
    name: "Yüksek Bel Kot Pantolon",
    category: "kadin",
    price: 459,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"
    ],
    colors: ["mavi", "siyah"],
    sizes: ["26", "28", "30", "32"],
    description: "Klasik yüksek bel kesim, hafif yıkama efekti ve konforlu elastik pamuklu kumaş.",
    stock: 20,
    featured: true,
    badge: null
  },
  {
    id: 5,
    name: "El Yapımı Örgü Atkı",
    category: "kadin",
    price: 249,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80"
    ],
    colors: ["krem", "pudra", "haki", "bordo"],
    sizes: ["Standart"],
    description: "Tamamen el işi, yumuşacık akrilik-yün karışımı atkı. Her biri benzersiz.",
    stock: 30,
    featured: false,
    badge: "El Yapımı"
  },
  {
    id: 6,
    name: "Uzun Kollu Basic Tişört",
    category: "kadin",
    price: 189,
    oldPrice: 249,
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80"
    ],
    colors: ["beyaz", "siyah", "krem"],
    sizes: ["XS", "S", "M", "L"],
    description: "Günlük giyimin temel parçası, yumuşak dokulu pamuklu tişört.",
    stock: 40,
    featured: false,
    badge: "İndirim"
  },

  // ============= ERKEK =============
  {
    id: 7,
    name: "Oxford Keten Gömlek",
    category: "erkek",
    price: 489,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"
    ],
    colors: ["beyaz", "mavi", "haki"],
    sizes: ["S", "M", "L", "XL"],
    description: "Klasik oxford kesim, kaliteli keten kumaş. Hem günlük hem şık ofis kullanımına uygun.",
    stock: 18,
    featured: true,
    badge: "Yeni"
  },
  {
    id: 8,
    name: "Chino Pantolon",
    category: "erkek",
    price: 529,
    oldPrice: 649,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"
    ],
    colors: ["bej", "haki", "lacivert"],
    sizes: ["30", "32", "34", "36"],
    description: "Slim-fit kesim, dayanıklı pamuklu twill kumaş. Rahatlığın ve stilin buluşma noktası.",
    stock: 22,
    featured: true,
    badge: "İndirim"
  },
  {
    id: 9,
    name: "Klasik Beyaz Tişört",
    category: "erkek",
    price: 179,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    colors: ["beyaz", "siyah", "haki"],
    sizes: ["S", "M", "L", "XL"],
    description: "Yumuşak %100 pamuk, her kombine yakışan sade klasik.",
    stock: 50,
    featured: false,
    badge: null
  },
  {
    id: 10,
    name: "Örgü Kazak",
    category: "erkek",
    price: 459,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=80"
    ],
    colors: ["haki", "lacivert", "bordo"],
    sizes: ["M", "L", "XL"],
    description: "Sade yuvarlak yaka, yumuşak yün karışımı örgü kazak. Sonbahar ve kış için ideal.",
    stock: 14,
    featured: false,
    badge: null
  },
  {
    id: 11,
    name: "Kanvas Ceket",
    category: "erkek",
    price: 789,
    oldPrice: 999,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
    ],
    colors: ["haki", "siyah"],
    sizes: ["M", "L", "XL"],
    description: "Sağlam kanvas kumaş, çoklu cep detayları ile fonksiyonel ve stil dolu ceket.",
    stock: 10,
    featured: true,
    badge: "İndirim"
  },
  {
    id: 12,
    name: "Kot Gömlek",
    category: "erkek",
    price: 399,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80"
    ],
    colors: ["mavi", "siyah"],
    sizes: ["S", "M", "L", "XL"],
    description: "Klasik kesim, yıkanmış kot kumaş. Gündelik stilin vazgeçilmezi.",
    stock: 16,
    featured: false,
    badge: null
  },

  // ============= ÇOCUK =============
  {
    id: 13,
    name: "Pamuklu Çocuk Tişört",
    category: "cocuk",
    price: 149,
    oldPrice: 199,
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"
    ],
    colors: ["beyaz", "pudra", "haki"],
    sizes: ["2-3", "4-5", "6-7", "8-9"],
    description: "Organik pamuktan, cilde dost, yumuşacık çocuk tişörtü. Rahat ve şık.",
    stock: 35,
    featured: true,
    badge: "İndirim"
  },
  {
    id: 14,
    name: "Çocuk Örgü Hırka",
    category: "cocuk",
    price: 289,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80"
    ],
    colors: ["krem", "pudra"],
    sizes: ["2-3", "4-5", "6-7"],
    description: "Yumuşak örgü, düğmeli ön kapatma. Küçüklerin keyifle giyeceği kış hırkası.",
    stock: 18,
    featured: false,
    badge: null
  },
  {
    id: 15,
    name: "Çocuk Kot Tulum",
    category: "cocuk",
    price: 329,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=800&q=80"
    ],
    colors: ["mavi"],
    sizes: ["2-3", "4-5", "6-7", "8-9"],
    description: "Sevimli kot tulum, ayarlanabilir askılar, kullanışlı cepler. Oyunda özgür hareket.",
    stock: 12,
    featured: true,
    badge: "Yeni"
  },
  {
    id: 16,
    name: "Çocuk Yazlık Elbise",
    category: "cocuk",
    price: 249,
    oldPrice: 319,
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"
    ],
    colors: ["beyaz", "pudra"],
    sizes: ["2-3", "4-5", "6-7"],
    description: "Pamuklu yazlık elbise, fırfır detayları ile masalsı bir görünüm.",
    stock: 20,
    featured: false,
    badge: "İndirim"
  },
  {
    id: 17,
    name: "Çocuk Yağmurluk",
    category: "cocuk",
    price: 389,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
    ],
    colors: ["pudra", "haki"],
    sizes: ["4-5", "6-7", "8-9"],
    description: "Su geçirmez, kapüşonlu yağmurluk. Yağmurlu günlerin neşeli arkadaşı.",
    stock: 15,
    featured: false,
    badge: "Yeni"
  },
  {
    id: 18,
    name: "Çocuk Pijama Takımı",
    category: "cocuk",
    price: 219,
    oldPrice: null,
    images: [
      "https://images.unsplash.com/photo-1566479179817-c64b9aec3a39?w=800&q=80"
    ],
    colors: ["krem", "pudra", "mavi"],
    sizes: ["2-3", "4-5", "6-7", "8-9"],
    description: "Pamuklu ve yumuşak pijama takımı. Tatlı rüyalar için.",
    stock: 28,
    featured: false,
    badge: null
  }
];

// Kategori etiketleri
const CATEGORY_LABELS = {
  kadin: "Kadın",
  erkek: "Erkek",
  cocuk: "Çocuk"
};

// Renk → HEX haritası (swatch gösterimi için)
const COLOR_MAP = {
  krem: "#f4e9d8",
  pudra: "#e8c5c1",
  haki: "#8a8862",
  bordo: "#6e2332",
  beyaz: "#ffffff",
  bej: "#d6c5a3",
  siyah: "#1a1a1a",
  mavi: "#4a6fa5",
  lacivert: "#1e2a4a"
};

// Tüm bedenleri topla (filtreler için)
const ALL_SIZES = [...new Set(PRODUCTS.flatMap(p => p.sizes))];
const ALL_COLORS = [...new Set(PRODUCTS.flatMap(p => p.colors))];
