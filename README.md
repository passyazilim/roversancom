# Roversan Gıda - Kurumsal Web Sitesi

Modern ve profesyonel bir kurumsal web sitesi. Next.js 14 ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern Tasarım**: Minimal ve profesyonel görünüm
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görüntüleme
- **SEO Optimizasyonu**: Arama motorları için optimize edilmiş
- **Hızlı Performans**: Next.js 14 ile yüksek performans
- **TypeScript**: Tip güvenli kod yapısı
- **Tailwind CSS**: Özelleştirilebilir stil sistemi

## 📦 Teknolojiler

- **Framework**: Next.js 14
- **Stil**: Tailwind CSS
- **Dil**: TypeScript
- **İkonlar**: React Icons
- **Font**: Inter (Google Fonts)

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18.x veya üzeri
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 📁 Proje Yapısı

```
roversan-gida/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── about/              # Hakkımızda sayfası
│   │   ├── certificates/       # Sertifikalar sayfası
│   │   ├── contact/            # İletişim sayfası
│   │   ├── export/             # İhracat sayfası
│   │   ├── oem-services/       # OEM Hizmetleri sayfası
│   │   ├── products/           # Ürünler sayfası
│   │   ├── layout.tsx          # Ana layout
│   │   ├── page.tsx            # Ana sayfa
│   │   └── globals.css         # Global stiller
│   └── components/             # Yeniden kullanılabilir componentler
│       ├── Navbar.tsx          # Navigasyon menüsü
│       └── Footer.tsx          # Footer bileşeni
├── public/                     # Statik dosyalar
├── package.json                # Proje bağımlılıkları
├── tailwind.config.ts          # Tailwind yapılandırması
├── tsconfig.json               # TypeScript yapılandırması
└── next.config.js              # Next.js yapılandırması
```

## 🎨 Sayfalar

### Ana Sayfa (/)
- Hero section
- Özellikler bölümü
- Hakkımızda özeti
- Ürün kategorileri
- CTA bölümleri
- İstatistikler

### Hakkımızda (/about)
- Firma hikayesi
- Misyon & Vizyon
- Değerlerimiz
- Tesis bilgileri

### Ürünlerimiz (/products)
- Toz içecekler
- Kahve ürünleri
- Yağ ürünleri
- OEM ürünler

### OEM Hizmetleri (/oem-services)
- OEM/ODM açıklaması
- Hizmet adımları
- Avantajlar
- Üretim kategorileri

### Sertifikalar (/certificates)
- Kalite politikası
- ISO sertifikaları
- Helal & Kosher
- Kalite kontrol süreci

### İhracat (/export)
- İhracat bölgeleri
- İhracat avantajları
- İhracat süreci
- Global istatistikler

### İletişim (/contact)
- İletişim bilgileri
- İletişim formu
- Harita entegrasyonu

## 🎯 Özelleştirme

### Renkler

Renk paleti `tailwind.config.ts` dosyasından özelleştirilebilir:

```typescript
colors: {
  primary: {
    50: '#fdf8f3',
    // ... diğer tonlar
  },
  gold: {
    50: '#fefbf3',
    // ... diğer tonlar
  },
}
```

### Firma Bilgileri

İletişim bilgileri `src/components/Footer.tsx` ve `src/app/contact/page.tsx` dosyalarında güncellenebilir.

## 📝 Üretim Derleme

Üretim için optimize edilmiş build oluşturmak için:

```bash
npm run build
```

Build'i başlatmak için:

```bash
npm start
```

## 🔍 Linting

Kod kalitesini kontrol etmek için:

```bash
npm run lint
```

## 🏭 Ürünler

- **Frutti Toz İçecekler**: Portakal, çilek, limon, şeftali, hindistan cevizi
- **Keita Toz İçecekler**: Kola, zencefil, ananas, chop chop, portakal
- **Shirino Toz İçecekler**: Portakal, limon, şeftali, vişne
- **Brawoo Kahve**: 3'ü 1 arada instant kahve
- **Frutti Kahve**: 3'ü 1 arada instant kahve
- **Buzlaş Makineleri**: İkili ve üçlü slush makineleri

## 🌐 Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabı oluşturun
2. Projeyi GitHub'a yükleyin
3. Vercel'de "Import Project" seçeneğini kullanın
4. Next.js otomatik olarak algılanır ve deploy edilir

### Diğer Platformlar

- **Netlify**: Next.js plugin ile desteklenir
- **AWS Amplify**: Next.js SSR destekli
- **DigitalOcean App Platform**: Next.js template'i kullanın

## 📱 Responsive Tasarım

Tüm sayfalar mobil öncelikli tasarlanmıştır:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Erişilebilirlik

- Semantik HTML
- ARIA etiketleri
- Klavye navigasyonu
- Alt text'ler (görseller eklendiğinde)

## 📄 Lisans

Bu proje Roversan Gıda için özel olarak geliştirilmiştir.

## 👥 İletişim

**Roversan Gıda**
- **Adres**: GAP Gıda İmalatçılar Sitesi 1.Cad. No:18, Eyyübiye / Şanlıurfa / Türkiye
- **Telefon**: +90 414 316 63 69
- **Faks**: +90 542 721 32 29
- **E-posta**: info@roversan.com

---

© 2025 Roversan Gıda. Tüm hakları saklıdır.

