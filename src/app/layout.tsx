import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roversan Gıda - Toz İçecek ve Kahve Üretimi',
  description: 'Geniş ürün yelpazesi ve çeşitli markalarımızla kaliteli toz içecek ve kahve ürünleri. Şanlıurfa\'da modern tesisimizde üretim yapıyoruz.',
  keywords: 'roversan, toz içecek, 3\'ü 1 arada kahve, instant kahve, buzlaş makinesi, şanlıurfa gıda, hazır kahve, gıda üretimi',
  icons: {
    icon: '/images/logo/favicon.png',
    shortcut: '/images/logo/favicon.png',
    apple: '/images/logo/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

