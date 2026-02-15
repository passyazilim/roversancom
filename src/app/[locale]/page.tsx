'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { FaLeaf, FaCertificate, FaGlobeAmericas, FaIndustry, FaHandshake, FaShieldAlt, FaChevronLeft, FaChevronRight, FaCrown, FaChartLine, FaAward, FaBox, FaUsers, FaClock, FaIndustry as FaFactory } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import FlavorWave from '@/components/FlavorWave'

export default function Home() {
  const t = useTranslations('home')
  const tCommon = useTranslations('common')
  const tProducts = useTranslations('products')
  const locale = useLocale()
  
  // Helper function to get translated product name
  const getTranslatedProductName = (productName: string): string => {
    const nameMap: Record<string, string> = {
      'Brawali Dubai Çikolatalı Cappucino': 'dubaiCappucino',
      'Portakal Frutti': 'portakalFrutti',
      'Çilek Frutti': 'çilekFrutti',
      'Kivi Frutti': 'kiviFrutti',
      'Mango Frutti': 'mangoFrutti',
      'Ananas Frutti': 'ananasFrutti',
      'Elma Frutti': 'elmaFrutti',
      'Nar Frutti': 'narFrutti',
      'Şeftali Frutti': 'şeftaliFrutti',
      'Kiraz Frutti': 'kirazFrutti',
      'Muz Frutti': 'muzFrutti',
      'Limon Frutti': 'limonFrutti',
      'Zencefil Frutti': 'zencefilFrutti',
      'Guava Frutti': 'guavaFrutti',
      'Passion Frutti': 'passionFrutti',
      'Soursop Frutti': 'soursopFrutti',
      'Tamarhindi Frutti': 'tamerhindiFrutti',
      'Coconut Frutti': 'coconutFrutti',
      'Cola Frutti': 'colaFrutti',
      'Gazoz Frutti': 'gazozFrutti',
      'Lolipop Frutti': 'lolipopFrutti',
      'Karışık Frutti': 'karışıkFrutti',
      'Keita Portakal': 'keitaPortakal',
      'Keita Ananas': 'keitaAnanas',
      'Keita Cola': 'keitaCola',
      'Keita Chop Chop': 'keitaChopChop',
      'Keita Zencefil': 'keitaZencefil',
      'Shirino Portakal': 'shirinoPortakal',
      'Shirino Şeftali': 'shirinoŞeftali',
      'Shirino Vişne': 'shirinoVişne',
      'Shirino Limon': 'shirinoLimon',
      'Brawoo 3 in 1 Hazır Karışık Kahve': 'brawoo3in1Karisik',
      'Brawoo 3 in 1 Fındık Aromalı Karışık Kahve': 'brawoo3in1Findik',
      'Brawoo 2 in 1 Kahve': 'brawoo2in1',
      'Frutti 3 in 1 Kahve (Kutu)': 'frutti3in1Kutu',
      'Frutti 3 in 1 Kahve (Poşet)': 'frutti3in1Poşet',
      'Buzlaş': 'buzlas',
      'Lets Go': 'letsGoEnergy',
      'İkili Slush Buzlaş Makinesi': 'ikiliSlush',
      'Üçlü Slush Buzlaş Makinesi': 'üçlüSlush'
    }
    
    const key = nameMap[productName]
    if (key) {
      try {
        const translationKey = `productNames.${key}` as any
        // Try to get translation - if it doesn't exist, it will throw
        return tProducts(translationKey) || productName
      } catch (e) {
        // Fallback to original name if translation not found
        return productName
      }
    }
    return productName
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const [productCount, setProductCount] = useState(0)
  const [countryCount, setCountryCount] = useState(0)
  const [qualityCount, setQualityCount] = useState(0)
  const [experienceCount, setExperienceCount] = useState(0)
  const [certificateCount, setCertificateCount] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)

  // Tüm ürünler listesi - Yeni ürünler en başa eklenir
  // Not: Uzun isimli ürünler tasarımı bozmaması için buradan çıkarıldı (ürünler sayfasında mevcut)
  const allProducts = [
    // Frutti Serisi
    {
      name: 'Portakal Frutti',
      image: '/images/products/portakal-frutti.jpg',
      description: t('products.slider.portakal'),
      color: 'from-orange-400 to-orange-600',
      badge: t('products.badges.popular'),
      category: 'frutti'
    },
    {
      name: 'Çilek Frutti',
      image: '/images/products/cilek-frutti.jpg',
      description: t('products.slider.cilek'),
      color: 'from-red-400 to-pink-600',
      badge: t('products.badges.bestseller'),
      category: 'frutti'
    },
    {
      name: 'Kivi Frutti',
      image: '/images/products/kivi-frutti.jpg',
      description: t('products.slider.kivi'),
      color: 'from-green-400 to-emerald-600',
      badge: t('products.badges.tropical'),
      category: 'frutti'
    },
    {
      name: 'Mango Frutti',
      image: '/images/products/mango-frutti.jpg',
      description: t('products.slider.mango'),
      color: 'from-yellow-400 to-orange-500',
      badge: t('products.badges.exotic'),
      category: 'frutti'
    },
    {
      name: 'Ananas Frutti',
      image: '/images/products/ananas-frutti.jpg',
      description: t('products.slider.ananasFrutti'),
      color: 'from-yellow-300 to-yellow-500',
      badge: t('products.badges.tropical'),
      category: 'frutti'
    },
    {
      name: 'Elma Frutti',
      image: '/images/products/elma-frutti.jpg',
      description: t('products.slider.elmaFrutti'),
      color: 'from-green-300 to-green-500',
      badge: t('products.badges.popular'),
      category: 'frutti'
    },
    {
      name: 'Nar Frutti',
      image: '/images/products/nar-frutti.jpg',
      description: t('products.slider.narFrutti'),
      color: 'from-red-600 to-pink-700',
      badge: t('products.badges.bestseller'),
      category: 'frutti'
    },
    {
      name: 'Şeftali Frutti',
      image: '/images/products/seftali-frutti.jpg',
      description: t('products.slider.seftaliFrutti'),
      color: 'from-orange-300 to-pink-400',
      badge: t('products.badges.popular'),
      category: 'frutti'
    },
    {
      name: 'Kiraz Frutti',
      image: '/images/products/kiraz-frutti.jpg',
      description: t('products.slider.kirazFrutti'),
      color: 'from-red-500 to-red-700',
      badge: t('products.badges.bestseller'),
      category: 'frutti'
    },
    {
      name: 'Muz Frutti',
      image: '/images/products/muz-frutti.jpg',
      description: t('products.slider.muzFrutti'),
      color: 'from-yellow-200 to-yellow-400',
      badge: t('products.badges.popular'),
      category: 'frutti'
    },
    {
      name: 'Limon Frutti',
      image: '/images/products/limon.jpg',
      description: t('products.slider.limonFrutti'),
      color: 'from-yellow-300 to-green-300',
      badge: t('products.badges.popular'),
      category: 'frutti'
    },
    {
      name: 'Zencefil Frutti',
      image: '/images/products/zencefil-frutti.jpg',
      description: t('products.slider.zencefilFrutti'),
      color: 'from-amber-500 to-orange-600',
      badge: t('products.badges.exotic'),
      category: 'frutti'
    },
    {
      name: 'Guava Frutti',
      image: '/images/products/guava-frutti.jpg',
      description: t('products.slider.guavaFrutti'),
      color: 'from-pink-300 to-pink-500',
      badge: t('products.badges.exotic'),
      category: 'frutti'
    },
    {
      name: 'Passion Frutti',
      image: '/images/products/passion-frutti.jpg',
      description: t('products.slider.passionFrutti'),
      color: 'from-purple-400 to-pink-500',
      badge: t('products.badges.tropical'),
      category: 'frutti'
    },
    {
      name: 'Soursop Frutti',
      image: '/images/products/soursop-frutti.jpg',
      description: t('products.slider.soursopFrutti'),
      color: 'from-green-200 to-green-400',
      badge: t('products.badges.exotic'),
      category: 'frutti'
    },
    {
      name: 'Tamarhindi Frutti',
      image: '/images/products/tamerhindi-frutti.jpg',
      description: t('products.slider.tamerhindiFrutti'),
      color: 'from-amber-600 to-brown-600',
      badge: t('products.badges.classic'),
      category: 'frutti'
    },
    {
      name: 'Coconut Frutti',
      image: '/images/products/coconut-frutti.jpg',
      description: t('products.slider.coconutFrutti'),
      color: 'from-white to-gray-200',
      badge: t('products.badges.tropical'),
      category: 'frutti'
    },
    {
      name: 'Cola Frutti',
      image: '/images/products/cola-frutti.jpg',
      description: t('products.slider.colaFrutti'),
      color: 'from-amber-800 to-brown-900',
      badge: t('products.badges.classic'),
      category: 'frutti'
    },
    {
      name: 'Gazoz Frutti',
      image: '/images/products/gazoz-frutti.jpg',
      description: t('products.slider.gazozFrutti'),
      color: 'from-green-100 to-green-300',
      badge: t('products.badges.classic'),
      category: 'frutti'
    },
    {
      name: 'Lolipop Frutti',
      image: '/images/products/lolipop-frutti.jpg',
      description: t('products.slider.lolipopFrutti'),
      color: 'from-pink-400 to-purple-500',
      badge: t('products.badges.new'),
      category: 'frutti'
    },
    {
      name: 'Karışık Frutti',
      image: '/images/products/karisik-frutti.jpg',
      description: t('products.slider.karisikFrutti'),
      color: 'from-purple-400 to-pink-600',
      badge: t('products.badges.popular'),
      category: 'frutti'
    },
    // Keita Serisi
    {
      name: 'Keita Portakal',
      image: '/images/products/keita-portakal.jpg',
      description: t('products.slider.keitaPortakal'),
      color: 'from-orange-500 to-orange-700',
      badge: t('products.badges.popular'),
      category: 'keita'
    },
    {
      name: 'Keita Ananas',
      image: '/images/products/keita-ananas.jpg',
      description: t('products.slider.keitaAnanas'),
      color: 'from-yellow-400 to-yellow-600',
      badge: t('products.badges.tropical'),
      category: 'keita'
    },
    {
      name: 'Keita Cola',
      image: '/images/products/keita-cola.jpg',
      description: t('products.slider.keitaCola'),
      color: 'from-amber-700 to-brown-800',
      badge: t('products.badges.classic'),
      category: 'keita'
    },
    {
      name: 'Keita Chop Chop',
      image: '/images/products/keita-chop-chop.jpg',
      description: t('products.slider.keitaChopChop'),
      color: 'from-red-500 to-orange-600',
      badge: t('products.badges.new'),
      category: 'keita'
    },
    {
      name: 'Keita Zencefil',
      image: '/images/products/keita-zencefil.jpg',
      description: t('products.slider.keitaZencefil'),
      color: 'from-amber-600 to-orange-700',
      badge: t('products.badges.exotic'),
      category: 'keita'
    },
    // Shirino Serisi
    {
      name: 'Shirino Portakal',
      image: '/images/products/shirino-portakal.jpg',
      description: t('products.slider.shirinoPortakal'),
      color: 'from-orange-400 to-orange-600',
      badge: t('products.badges.popular'),
      category: 'shirino'
    },
    {
      name: 'Shirino Şeftali',
      image: '/images/products/shirino-seftali.jpg',
      description: t('products.slider.shirinoSeftali'),
      color: 'from-orange-300 to-pink-400',
      badge: t('products.badges.bestseller'),
      category: 'shirino'
    },
    {
      name: 'Shirino Vişne',
      image: '/images/products/shirino-visne.jpg',
      description: t('products.slider.shirinoVisne'),
      color: 'from-red-600 to-pink-700',
      badge: t('products.badges.popular'),
      category: 'shirino'
    },
    {
      name: 'Shirino Limon',
      image: '/images/products/shirino-limon.jpg',
      description: t('products.slider.shirinoLimon'),
      color: 'from-yellow-300 to-green-300',
      badge: t('products.badges.popular'),
      category: 'shirino'
    },
    // Brawoo Serisi
    {
      name: 'Brawoo 2 in 1 Kahve',
      image: '/images/products/brawoo-2-in-1.jpg',
      description: t('products.slider.brawoo2in1'),
      color: 'from-amber-700 to-brown-800',
      badge: t('products.badges.classic'),
      category: 'brawoo'
    },
    // Diğer Ürünler
    {
      name: 'Buzlaş',
      image: '/images/products/buzlas.jpg',
      description: t('products.slider.buzlas'),
      color: 'from-blue-300 to-blue-500',
      badge: t('products.badges.new'),
      category: 'other'
    },
    {
      name: 'Lets Go',
      image: '/images/products/letsgo foto.jpeg',
      description: t('products.slider.letsGo'),
      color: 'from-red-500 to-orange-600',
      badge: t('products.badges.new'),
      category: 'other'
    }
  ]

  // Random sıralama ve başlangıç noktası - sadece istemci tarafında
  const [productSlides, setProductSlides] = useState(allProducts)

  // İstemci tarafında random sıralama yap (hydration hatasını önlemek için)
  useEffect(() => {
    const shuffled = [...allProducts].sort(() => Math.random() - 0.5)
    setProductSlides(shuffled)
    setCurrentSlide(Math.floor(Math.random() * shuffled.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length)
    }, 5000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          // Trigger SVG animation when section is visible
          const section = entry.target as HTMLElement
          section.classList.add('stats-visible')
        }
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    const currentRef = statsRef.current
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (statsVisible) {
      const duration = 2000
      const steps = 60

      const productTarget = 50
      const countryTarget = 50
      const qualityTarget = 100
      const experienceTarget = 20
      const certificateTarget = 5

      const productIncrement = productTarget / steps
      const countryIncrement = countryTarget / steps
      const qualityIncrement = qualityTarget / steps
      const experienceIncrement = experienceTarget / steps
      const certificateIncrement = certificateTarget / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        setProductCount(Math.min(Math.floor(productIncrement * step), productTarget))
        setCountryCount(Math.min(Math.floor(countryIncrement * step), countryTarget))
        setQualityCount(Math.min(Math.floor(qualityIncrement * step), qualityTarget))
        setExperienceCount(Math.min(Math.floor(experienceIncrement * step), experienceTarget))
        setCertificateCount(Math.min(Math.floor(certificateIncrement * step), certificateTarget))

        if (step >= steps) {
          clearInterval(timer)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [statsVisible])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)
  }

  // Dil bazlı görsel seçimi
  const getProductImage = () => {
    switch (locale) {
      case 'en':
        return '/images/products/tum-urunler-ingilizce.jpg'
      case 'ar':
        return '/images/products/tum-urunler-arapca.jpg'
      case 'es':
        return '/images/products/tum-urunler-ispanyolca.jpg'
      case 'tr':
      default:
        return '/images/products/tum-urunler-turkce.jpg'
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-screen lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/giris-background/assorted-juices-with-milkshake-fruits.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-gold-900/80"></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center py-12 md:py-20">
          <div className="animate-fadeInUp">
            <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/30">
              {t('hero.badge')}
            </div>
            <h1 className="heading-1 mb-6">
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                {t('hero.title')}
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              {t('hero.description').split('\n').map((line: string, idx: number) => (
                <span key={idx}>
                  {idx > 0 && <br className="hidden md:block" />}
                  {line.includes('lezzet ve kalite') || line.includes('taste and quality') ? (
                    <>
                      {line.split('lezzet ve kalite')[0] || line.split('taste and quality')[0]}
                      <span className="font-bold text-gold-300">
                        {line.includes('lezzet ve kalite') ? 'lezzet ve kalite' : 'taste and quality'}
                      </span>
                      {line.split('lezzet ve kalite')[1] || line.split('taste and quality')[1]}
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
              <Link href={`/${locale}/products/`} className="btn-primary text-lg">
                🛍️ {tCommon('viewCatalog')}
              </Link>
              <Link href={`/${locale}/contact/`} className="btn-secondary text-lg">
                📞 {tCommon('contactUs')}
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <span className="text-gold-400 text-lg">✓</span>
                <span className="text-white font-semibold">{t('hero.trust.iso')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <span className="text-gold-400 text-lg">✓</span>
                <span className="text-white font-semibold">{t('hero.trust.halal')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <span className="text-gold-400 text-lg">✓</span>
                <span className="text-white font-semibold">{t('hero.trust.export')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Ürün Grupları */}
        <button 
          onClick={() => {
            const productSection = document.querySelector('#urun-gruplari');
            if (productSection) {
              const elementPosition = productSection.getBoundingClientRect().top;
              // Responsive offset: navbar height + spacing
              const offset = window.innerWidth >= 1024 ? 120 : window.innerWidth >= 640 ? 100 : 80;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
              });
            }
          }}
          className="group absolute bottom-2 md:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110"
          aria-label={t('hero.scrollToProducts')}
        >
          <div className="relative flex flex-col items-center gap-2 animate-scroll-float">
            {/* Main arrow with gold gradient */}
            <div className="relative">
              <svg
                className="w-7 h-7 md:w-9 md:h-9 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="scrollArrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                    <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#fde68a" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <path 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  stroke="url(#scrollArrowGradient)"
                />
              </svg>
            </div>
            
            {/* Animated scrolling line with gold gradient */}
            <div className="relative w-[2px] h-10 md:h-14 bg-gradient-to-b from-gold-400/60 via-gold-300/40 to-transparent overflow-hidden rounded-full">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gold-300/50 animate-scroll-pulse"></div>
            </div>
          </div>
        </button>

      </section>

      {/* Ürün Tanıtım Slider */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${productSlides[currentSlide].color} opacity-30 blur-3xl transition-all duration-1000`}></div>
        <div className={`absolute inset-10 bg-gradient-to-r ${productSlides[currentSlide].color} opacity-40 blur-2xl rounded-full animate-pulse transition-all duration-1000`}></div>
        <div className={`absolute inset-20 bg-gradient-to-tl ${productSlides[currentSlide].color} opacity-20 blur-xl rounded-full animate-pulse transition-all duration-1000`} style={{ animationDelay: '0.5s' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-gold-400 font-bold">{t('products.badge')}</span>
            </div>
            <h2 className="heading-2 text-white mb-4 drop-shadow-2xl">{t('products.title')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('products.description')}
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Main Slider */}
            <div className="relative h-auto min-h-[550px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl" style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {productSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center p-6 md:p-16 gap-6 md:gap-8">
                    {/* Product Image - 3D Effect */}
                    <div className="relative h-64 md:h-full flex items-center justify-center group">
                      {/* Glow effects */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-30 blur-3xl rounded-full group-hover:opacity-50 transition-all duration-500`}></div>
                      <div className={`absolute inset-10 bg-gradient-to-tl ${slide.color} opacity-40 blur-2xl rounded-full group-hover:scale-110 transition-all duration-500`}></div>
                      
                      {/* Product image with 3D transform */}
                      <div className="relative w-full h-full perspective-1000">
                        <div className="relative w-full h-full group-hover:scale-110 group-hover:rotate-y-12 transition-all duration-700 transform-style-3d">
                          <Image
                            src={slide.image}
                            alt={slide.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                            style={{
                              filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))'
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Floating badge */}
                      <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-gold-500 to-yellow-500 text-white rounded-full text-sm font-bold shadow-2xl animate-bounce">
                        {slide.badge}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center md:text-left relative z-20 pb-4 md:pb-0 flex flex-col h-full">
                      <div className="flex-1 space-y-3 md:space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-xs md:text-sm font-semibold border border-white/30 mb-3 md:mb-4">
                          <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-gold-400 rounded-full animate-pulse"></span>
                          <span className="text-gold-400">{tCommon('premiumQuality')}</span>
                        </div>
                        
                        <h3 className={`text-xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r ${slide.color} bg-clip-text text-transparent drop-shadow-2xl leading-tight line-clamp-2`}>
                          {getTranslatedProductName(slide.name)}
                        </h3>
                        
                        <p className="text-sm md:text-lg lg:text-xl text-white/95 leading-relaxed font-light mb-2 md:mb-0 line-clamp-2">
                          {slide.description}
                        </p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-3">
                          <div className="px-2 md:px-4 py-1.5 md:py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <span className="text-white/80 text-xs md:text-sm">{t('products.features.natural')}</span>
                          </div>
                          <div className="px-2 md:px-4 py-1.5 md:py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <span className="text-white/80 text-xs md:text-sm">{t('products.features.iso')}</span>
                          </div>
                          <div className="px-2 md:px-4 py-1.5 md:py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                            <span className="text-white/80 text-xs md:text-sm">{t('products.features.halal')}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons - Always at bottom */}
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start pt-4 md:pt-6 mt-auto">
                        <Link href={`/${locale}/products/`} className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gold-500 to-yellow-500 text-gray-900 rounded-xl font-bold text-sm md:text-base hover:scale-105 transition-transform shadow-2xl whitespace-nowrap">
                          {tCommon('allProducts')}
                        </Link>
                        <Link href={`/${locale}/contact/`} className="hidden sm:inline-block px-6 md:px-8 py-3 md:py-4 bg-white/30 backdrop-blur-md border-2 border-white/60 text-white rounded-xl font-bold text-sm md:text-base hover:bg-white/40 transition-all shadow-lg whitespace-nowrap">
                          {tCommon('orderNow')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Buttons - Modern Glass Effect */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-md hover:bg-white/40 rounded-xl flex items-center justify-center transition-all duration-300 group z-20 border-2 border-white/60 hover:scale-110 shadow-2xl"
                aria-label={tCommon('previousProduct')}
              >
                <FaChevronLeft className="text-white text-2xl group-hover:-translate-x-1 transition-transform drop-shadow-lg" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-md hover:bg-white/40 rounded-xl flex items-center justify-center transition-all duration-300 group z-20 border-2 border-white/60 hover:scale-110 shadow-2xl"
                aria-label={tCommon('nextProduct')}
              >
                <FaChevronRight className="text-white text-2xl group-hover:translate-x-1 transition-transform drop-shadow-lg" />
              </button>
            </div>

            {/* Slide Indicators - Enhanced */}
            <div className="flex justify-center gap-3 mt-10">
              {productSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-500 rounded-full relative overflow-hidden group ${
                    index === currentSlide
                      ? 'w-16 h-4 bg-gradient-to-r from-gold-500 to-yellow-500 shadow-lg'
                      : 'w-4 h-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm'
                  }`}
                  aria-label={`${slide.name}`}
                >
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Neden Roversan Gıda? - Modern Showcase */}
      <section id="ozellikler" className="section-padding bg-gradient-to-br from-white via-primary-50/40 to-gold-50/30 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary-200/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-gold-200/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2.5 bg-gradient-to-r from-primary-100 to-gold-100 rounded-full border border-primary-200/50 mb-4 md:mb-5 lg:mb-6">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-primary-600 rounded-full animate-pulse"></span>
              <span className="text-primary-700 font-bold text-xs md:text-sm uppercase tracking-wider">{t('whyUs.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-5 lg:mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-gold-600 to-primary-600 bg-clip-text text-transparent">
                {t('whyUs.title')}
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('whyUs.description')}
            </p>
          </div>

          {/* Features Grid - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Özellik 1 - Doğal Ürünler */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 border-2 border-primary-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-emerald-500/10 transition-all duration-500 blur-xl rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-18 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <FaLeaf className="text-white text-2xl md:text-2xl lg:text-3xl" />
              </div>
                <h3 className="text-xl md:text-xl lg:text-2xl font-black mb-3 md:mb-3 lg:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{t('whyUs.features.natural.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-sm lg:text-base">
                {t('whyUs.features.natural.description')}
              </p>
              </div>
            </div>

            {/* Özellik 2 - Sertifikalar */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 border-2 border-gold-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-yellow-500/0 group-hover:from-gold-500/10 group-hover:via-gold-500/5 group-hover:to-yellow-500/10 transition-all duration-500 blur-xl rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-18 lg:w-20 lg:h-20 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <FaCertificate className="text-white text-2xl md:text-2xl lg:text-3xl" />
              </div>
                <h3 className="text-xl md:text-xl lg:text-2xl font-black mb-3 md:mb-3 lg:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{t('whyUs.features.certificates.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-sm lg:text-base">
                {t('whyUs.features.certificates.description')}
              </p>
              </div>
            </div>

            {/* Özellik 3 - Global İhracat */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-cyan-500/10 transition-all duration-500 blur-xl rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-18 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <FaGlobeAmericas className="text-white text-2xl md:text-2xl lg:text-3xl" />
              </div>
                <h3 className="text-xl md:text-xl lg:text-2xl font-black mb-3 md:mb-3 lg:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{t('whyUs.features.global.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-sm lg:text-base">
                {t('whyUs.features.global.description')}
              </p>
              </div>
            </div>

            {/* Özellik 4 - Modern Tesis */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 border-2 border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-indigo-500/10 transition-all duration-500 blur-xl rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-18 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <FaIndustry className="text-white text-2xl md:text-2xl lg:text-3xl" />
              </div>
                <h3 className="text-xl md:text-xl lg:text-2xl font-black mb-3 md:mb-3 lg:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{t('whyUs.features.modern.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-sm lg:text-base">
                {t('whyUs.features.modern.description')}
              </p>
              </div>
            </div>

            {/* Özellik 5 - Müşteri Memnuniyeti */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 border-2 border-green-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-emerald-500/10 transition-all duration-500 blur-xl rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-18 lg:w-20 lg:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <FaHandshake className="text-white text-2xl md:text-2xl lg:text-3xl" />
                </div>
                <h3 className="text-xl md:text-xl lg:text-2xl font-black mb-3 md:mb-3 lg:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{t('whyUs.features.customer.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-sm lg:text-base">
                  {t('whyUs.features.customer.description')}
                </p>
              </div>
            </div>

            {/* Özellik 6 - Kalite Garantisi */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-2xl lg:rounded-3xl p-5 md:p-6 lg:p-8 border-2 border-red-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-rose-500/0 group-hover:from-red-500/10 group-hover:via-red-500/5 group-hover:to-rose-500/10 transition-all duration-500 blur-xl rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-18 lg:w-20 lg:h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl md:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <FaShieldAlt className="text-white text-2xl md:text-2xl lg:text-3xl" />
              </div>
                <h3 className="text-xl md:text-xl lg:text-2xl font-black mb-3 md:mb-3 lg:mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">{t('whyUs.features.quality.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-sm lg:text-base">
                {t('whyUs.features.quality.description')}
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hakkımızda Özet - Modern Card */}
      <section className="section-padding bg-gradient-to-br from-primary-100 via-gold-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 text-primary-700 border border-primary-600/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                <span className="text-sm font-semibold">{t('about.summary.badge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {t('about.summary.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-5">
                {t('about.summary.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 rounded-full bg-gold-500"></span><span className="text-gray-700">{t('about.summary.point1')}</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 rounded-full bg-gold-500"></span><span className="text-gray-700">{t('about.summary.point2')}</span></li>
                <li className="flex items-start gap-3"><span className="mt-1 w-2 h-2 rounded-full bg-gold-500"></span><span className="text-gray-700">{t('about.summary.point3')}</span></li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/about/`} className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg">
                  {t('about.summary.button1')}
                </Link>
                <Link href={`/${locale}/certificates/`} className="px-6 py-3 rounded-xl font-semibold bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 transition-all shadow-sm">
                  {t('about.summary.button2')}
              </Link>
              </div>

              {/* flowing keywords ribbon */}
              <div className="mt-8 relative overflow-hidden rounded-xl border border-primary-100 bg-white/60 backdrop-blur-sm">
                <div className="whitespace-nowrap animate-brands-scroll flex gap-10 py-3 px-6 text-sm font-semibold text-primary-700">
                  <span>{t('about.keywords.premium')}</span>
                  <span>{t('about.keywords.iso')}</span>
                  <span>{t('about.keywords.halal')}</span>
                  <span>{t('about.keywords.kosher')}</span>
                  <span>{t('about.keywords.global')}</span>
                  <span>{t('about.keywords.taste')}</span>
                  <span>{t('about.keywords.innovation')}</span>
                  <span>{t('about.keywords.trust')}</span>
                  <span>{t('about.keywords.premium')}</span>
                  <span>{t('about.keywords.iso')}</span>
                  <span>{t('about.keywords.halal')}</span>
                  <span>{t('about.keywords.kosher')}</span>
                  <span>{t('about.keywords.global')}</span>
                  <span>{t('about.keywords.taste')}</span>
                  <span>{t('about.keywords.innovation')}</span>
                  <span>{t('about.keywords.trust')}</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="mt-8 grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
                <div className="rounded-xl md:rounded-2xl bg-white shadow-md p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-primary-700 drop-shadow-sm">50+</div>
                  <div className="text-xs text-gray-600">{t('about.summary.stat1')}</div>
                </div>
                <div className="rounded-xl md:rounded-2xl bg-white shadow-md p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-primary-700 drop-shadow-sm">100%</div>
                  <div className="text-xs text-gray-600">{t('about.summary.stat2')}</div>
                </div>
                <div className="rounded-xl md:rounded-2xl bg-white shadow-md p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-primary-700 drop-shadow-sm">50+</div>
                  <div className="text-xs text-gray-600">{t('about.summary.stat3')}</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="group relative h-96 lg:h-full min-h-[420px]">
              {/* Creative visual: layered glass with subtle animated ring */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                <Image
                  src="/images/fabrikafoto/fabrika-foto.jpeg"
                  alt={t('about.summary.title')}
                  fill
                  className="object-cover"
                  quality={95}
                  priority
                  unoptimized={false}
                />
                {/* Subtle overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0"></div>
                {/* animated golden ring */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-yellow-400/20 to-amber-600/10 blur-3xl animate-pulse"></div>
              </div>
              {/* Floating badge - bottom right */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md border-2 border-primary-200 rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-gold-600 flex items-center justify-center text-white shadow-lg">
                  <FaCrown className="text-xl" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900">{t('about.summary.premiumProduction')}</div>
                  <div className="text-xs text-gray-600 font-medium">{t('about.summary.currentStandards')}</div>
                </div>
              </div>
              {/* Additional badge on top-left */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-gold-600 text-white rounded-xl shadow-xl px-4 py-2 flex items-center gap-2 z-10">
                <FaShieldAlt className="text-sm" />
                <span className="text-sm font-bold">{t('about.summary.badge')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ürün Grupları - Modern Design */}
      <section id="urun-gruplari" className="section-padding bg-[#f8f5ef] relative overflow-hidden">
        {/* Floating Soft Particles - Toz İçecek Teması */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Particle 1 */}
          <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-primary-400/3 rounded-full blur-sm animate-float-1"></div>
          <div className="absolute top-[20%] left-[25%] w-1.5 h-1.5 bg-amber-400/3 rounded-full blur-sm animate-float-2"></div>
          <div className="absolute top-[15%] left-[35%] w-2.5 h-2.5 bg-orange-400/3 rounded-full blur-sm animate-float-3"></div>
          
          {/* Particle 2 */}
          <div className="absolute top-[30%] left-[50%] w-1.5 h-1.5 bg-primary-300/3 rounded-full blur-sm animate-float-4"></div>
          <div className="absolute top-[40%] left-[60%] w-2 h-2 bg-amber-300/3 rounded-full blur-sm animate-float-1"></div>
          <div className="absolute top-[35%] left-[70%] w-1.5 h-1.5 bg-orange-300/3 rounded-full blur-sm animate-float-2"></div>
          
          {/* Particle 3 */}
          <div className="absolute top-[50%] left-[20%] w-2 h-2 bg-primary-400/3 rounded-full blur-sm animate-float-3"></div>
          <div className="absolute top-[60%] left-[30%] w-1.5 h-1.5 bg-amber-400/3 rounded-full blur-sm animate-float-4"></div>
          <div className="absolute top-[55%] left-[40%] w-2.5 h-2.5 bg-orange-400/3 rounded-full blur-sm animate-float-1"></div>
          
          {/* Particle 4 */}
          <div className="absolute top-[70%] left-[55%] w-1.5 h-1.5 bg-primary-300/3 rounded-full blur-sm animate-float-2"></div>
          <div className="absolute top-[80%] left-[65%] w-2 h-2 bg-amber-300/3 rounded-full blur-sm animate-float-3"></div>
          <div className="absolute top-[75%] left-[75%] w-1.5 h-1.5 bg-orange-300/3 rounded-full blur-sm animate-float-4"></div>
          
          {/* Particle 5 - Additional scattered */}
          <div className="absolute top-[25%] left-[80%] w-2 h-2 bg-primary-400/3 rounded-full blur-sm animate-float-1"></div>
          <div className="absolute top-[45%] left-[10%] w-1.5 h-1.5 bg-amber-400/3 rounded-full blur-sm animate-float-2"></div>
          <div className="absolute top-[65%] left-[85%] w-2.5 h-2.5 bg-orange-400/3 rounded-full blur-sm animate-float-3"></div>
          <div className="absolute top-[85%] left-[15%] w-1.5 h-1.5 bg-primary-300/3 rounded-full blur-sm animate-float-4"></div>
        </div>
        
        {/* Flavor Wave Spectrum - Yatay Akan Dalgalar */}
        <FlavorWave />

        <div className="container-custom relative z-10">
          {/* Modern Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-50/80 via-gold-50/80 to-primary-50/80 backdrop-blur-sm rounded-2xl border border-primary-200/60 shadow-lg mb-8">
              <div className="relative">
                <span className="absolute w-3 h-3 bg-primary-500 rounded-full animate-ping opacity-75"></span>
                <span className="relative w-2 h-2 bg-primary-600 rounded-full"></span>
              </div>
              <span className="text-primary-700 font-bold text-xs uppercase tracking-wider">{t('categories.sectionTitle')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-gold-500 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {t('categories.sectionHeading')}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
              {t('categories.sectionDescription')}
            </p>
          </div>

          {/* Modern Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 relative z-10 items-stretch">
            {/* Frutti Dream - Floating Logo Design */}
            <Link 
              href={`/${locale}/products/?category=Frutti`} 
              className="group relative overflow-visible rounded-3xl bg-white shadow-2xl hover:shadow-orange-500/60 hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-orange-300 flex flex-col h-full"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/0 via-orange-300/0 to-yellow-400/0 group-hover:from-orange-400/10 group-hover:via-orange-300/8 group-hover:to-yellow-400/10 transition-all duration-700 pointer-events-none"></div>
              
              {/* Floating Center Logo */}
              <div className="relative -mt-16 sm:-mt-20 mb-8 sm:mb-12 z-30">
                <div className="relative w-full flex justify-center">
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] group/logo">
                    {/* Main Circular Logo */}
                    <div className="relative h-full bg-white rounded-full p-8 sm:p-12 shadow-2xl border-2 border-gray-200 group-hover/logo:border-orange-500 group-hover/logo:shadow-orange-500/50 group-hover/logo:shadow-2xl transition-all duration-500">
                      <Image
                        src="/images/markalarimiz/frutti-logo-new-pdf.png"
                        alt="Frutti Dream"
                        fill
                        className="object-contain p-4 sm:p-6 group-hover:scale-125 transition-transform duration-500"
                      />
                    </div>
                    {/* Badge on Logo */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-xl z-30 group-hover:scale-125 group-hover:shadow-orange-500/50 transition-all duration-500">
                      {t('categories.frutti.badge')}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="relative px-4 sm:px-6 pb-6 sm:pb-6 pt-16 sm:pt-4 z-10 flex flex-col min-h-[200px] sm:min-h-[220px] flex-grow">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">🍊</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] sm:text-[10px] font-black text-orange-600 uppercase tracking-widest block">{t('categories.frutti.name')}</span>
                    <h3 className="text-lg sm:text-xl font-black mt-1 text-gray-900 group-hover:text-orange-600 transition-colors">
                      {t('categories.frutti.series')}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6 text-center flex-grow min-h-[40px] sm:min-h-[60px]">
                  {t('categories.frutti.description')}
                </p>
                <div className="hidden sm:flex justify-center mt-auto pt-3 pb-2">
                  <div className="inline-flex items-center gap-2 text-orange-600 font-bold text-[11px] sm:text-xs group-hover:gap-3 transition-all">
                    <span>{t('categories.exploreCategory')}</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Keita - Floating Logo Design */}
            <Link 
              href={`/${locale}/products/?category=Keita`} 
              className="group relative overflow-visible rounded-3xl bg-white shadow-2xl hover:shadow-blue-500/60 hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-blue-300 flex flex-col h-full"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-indigo-300/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:via-indigo-300/8 group-hover:to-purple-400/10 transition-all duration-700 pointer-events-none"></div>
              
              {/* Floating Center Logo */}
              <div className="relative -mt-16 sm:-mt-20 mb-8 sm:mb-12 z-30">
                <div className="relative w-full flex justify-center">
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] group/logo">
                    {/* Main Circular Logo */}
                    <div className="relative h-full bg-white rounded-full p-8 sm:p-12 shadow-2xl border-2 border-gray-200 group-hover/logo:border-blue-500 group-hover/logo:shadow-blue-500/50 group-hover/logo:shadow-2xl transition-all duration-500">
                      <Image
                        src="/images/markalarimiz/keita.png"
                        alt="Keita"
                        fill
                        className="object-contain p-4 sm:p-6 group-hover:scale-125 transition-transform duration-500"
                      />
                    </div>
                    {/* Badge on Logo */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-xl z-30 group-hover:scale-125 group-hover:shadow-blue-500/50 transition-all duration-500">
                      {t('categories.keita.badge')}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="relative px-4 sm:px-6 pb-6 sm:pb-6 pt-16 sm:pt-4 z-10 flex flex-col min-h-[200px] sm:min-h-[220px] flex-grow">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">⚡</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-widest block">{t('categories.keita.name')}</span>
                    <h3 className="text-lg sm:text-xl font-black mt-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {t('categories.keita.series')}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6 text-center flex-grow min-h-[40px] sm:min-h-[60px]">
                  {t('categories.keita.description')}
                </p>
                <div className="hidden sm:flex justify-center mt-auto pt-3 pb-2">
                  <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-[11px] sm:text-xs group-hover:gap-3 transition-all">
                    <span>{t('categories.exploreCategory')}</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Shirino - Floating Logo Design */}
            <Link 
              href={`/${locale}/products/?category=Shirino`} 
              className="group relative overflow-visible rounded-3xl bg-white shadow-2xl hover:shadow-purple-500/60 hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-purple-300 flex flex-col h-full"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-400/0 via-fuchsia-300/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:via-fuchsia-300/8 group-hover:to-purple-400/10 transition-all duration-700 pointer-events-none"></div>
              
              {/* Floating Center Logo */}
              <div className="relative -mt-16 sm:-mt-20 mb-8 sm:mb-12 z-30">
                <div className="relative w-full flex justify-center">
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] group/logo">
                    {/* Main Circular Logo */}
                    <div className="relative h-full bg-white rounded-full p-8 sm:p-12 shadow-2xl border-2 border-gray-200 group-hover/logo:border-purple-500 group-hover/logo:shadow-purple-500/50 group-hover/logo:shadow-2xl transition-all duration-500">
                      <Image
                        src="/images/markalarimiz/shirino.png"
                        alt="Shirino"
                        fill
                        className="object-contain p-4 sm:p-6 group-hover:scale-125 transition-transform duration-500"
                      />
                    </div>
                    {/* Badge on Logo */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-xl z-30 group-hover:scale-125 group-hover:shadow-purple-500/50 transition-all duration-500">
                      {t('categories.shirino.badge')}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="relative px-4 sm:px-6 pb-6 sm:pb-6 pt-16 sm:pt-4 z-10 flex flex-col min-h-[200px] sm:min-h-[220px] flex-grow">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">🌸</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] sm:text-[10px] font-black text-purple-600 uppercase tracking-widest block">{t('categories.shirino.name')}</span>
                    <h3 className="text-lg sm:text-xl font-black mt-1 text-gray-900 group-hover:text-purple-600 transition-colors">
                      {t('categories.shirino.series')}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6 text-center flex-grow min-h-[40px] sm:min-h-[60px]">
                  {t('categories.shirino.description')}
                </p>
                <div className="hidden sm:flex justify-center mt-auto pt-3 pb-2">
                  <div className="inline-flex items-center gap-2 text-purple-600 font-bold text-[11px] sm:text-xs group-hover:gap-3 transition-all">
                    <span>{t('categories.exploreCategory')}</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hazır Kahve - Floating Logo Design with Three Brands */}
            <Link 
              href={`/${locale}/products/?category=Kahve`} 
              className="group relative overflow-visible rounded-3xl bg-white shadow-2xl hover:shadow-amber-500/60 hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-amber-300 flex flex-col h-full"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/0 via-orange-300/0 to-yellow-400/0 group-hover:from-amber-400/10 group-hover:via-orange-300/8 group-hover:to-yellow-400/10 transition-all duration-700 pointer-events-none"></div>
              
              {/* Floating Center Logo */}
              <div className="relative -mt-16 sm:-mt-20 mb-8 sm:mb-12 z-30">
                <div className="relative w-full flex justify-center">
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] group/logo">
                    {/* Main Circular Logo */}
                    <div className="relative h-full bg-white rounded-full p-6 sm:p-8 shadow-2xl border-2 border-gray-200 group-hover/logo:border-amber-500 group-hover/logo:shadow-amber-500/50 group-hover/logo:shadow-2xl transition-all duration-500">
                      {/* Three Logos Vertical Layout - Single Composition */}
                      <div className="relative h-full w-full flex flex-col items-center justify-between py-1 sm:py-2 group-hover/logo:scale-110 transition-transform duration-500">
                        {/* Brawoo - Top */}
                        <div className="relative w-[55%] sm:w-[60%] h-auto flex-shrink-0">
                          <Image
                            src="/images/markalarimiz/brawoo-kahve.jpg"
                            alt="Brawoo"
                            width={120}
                            height={60}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        
                        {/* Frutti - Center */}
                        <div className="relative w-[55%] sm:w-[60%] h-auto flex-shrink-0">
                          <Image
                            src="/images/markalarimiz/frutti-kahve.jpg"
                            alt="Frutti Kahve"
                            width={120}
                            height={60}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        
                        {/* Brawali - Bottom */}
                        <div className="relative w-[55%] sm:w-[60%] h-auto flex-shrink-0">
                          <Image
                            src="/images/markalarimiz/brawali.png"
                            alt="Brawali"
                            width={120}
                            height={60}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Badge on Logo */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-xl z-30 group-hover:scale-125 group-hover:shadow-amber-500/50 transition-all duration-500">
                      {t('categories.coffee.badge')}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="relative px-4 sm:px-6 pb-6 sm:pb-6 pt-16 sm:pt-4 z-10 flex flex-col min-h-[200px] sm:min-h-[220px] flex-grow">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">☕</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] sm:text-[10px] font-black text-amber-600 uppercase tracking-widest block">{t('categories.coffee.name')}</span>
                    <h3 className="text-lg sm:text-xl font-black mt-1 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {t('categories.coffee.series')}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-6 text-center flex-grow min-h-[40px] sm:min-h-[60px]">
                  {t('categories.coffee.description')}
                </p>
                <div className="hidden sm:flex justify-center mt-auto pt-3 pb-2">
                  <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-[11px] sm:text-xs group-hover:gap-3 transition-all">
                    <span>{t('categories.exploreCategory')}</span>
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Modern CTA Button */}
          <div className="text-center mt-12">
            <Link 
              href={`/${locale}/products/`} 
              className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-primary-600 via-primary-700 to-gold-600 text-white rounded-2xl font-extrabold text-lg md:text-xl hover:from-primary-700 hover:via-gold-600 hover:to-primary-700 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>{t('categories.exploreAll')}</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Markalarımız - Premium Showcase (Modern) */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-primary-600 to-gold-600 text-white rounded-full">
              <span className="font-bold">{t('brands.sectionTitle')}</span>
            </div>
            <h2 className="heading-2 mb-4">{t('brands.sectionHeading')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('brands.sectionDescription')}
            </p>
          </div>
          
          {/* Single row, logos only (no boxes) */}
          <div className="relative overflow-hidden py-8">
            <div className="flex animate-brands-scroll gap-10 items-center">
              {/* Set A */}
              <div className="flex gap-10 shrink-0 items-center">
                {[
                  { nameKey: 'frutti', img: '/images/markalarimiz/frutti-logo-new-pdf.png' },
                  { nameKey: 'keita', img: '/images/markalarimiz/keita.png' },
                  { nameKey: 'shirino', img: '/images/markalarimiz/shirino.png' },
                  { nameKey: 'brawoo', img: '/images/markalarimiz/brawoo-kahve.jpg' },
                  { nameKey: 'fruttiKahve', img: '/images/markalarimiz/frutti-kahve.jpg' },
                  { nameKey: 'brawali', img: '/images/markalarimiz/brawali.png' },
                  { nameKey: 'fresh', img: '/images/markalarimiz/fresh-logo-pdf.png' },
                ].map((b, idx) => (
                  <div key={`r-a-${idx}`} className="group flex flex-col items-center">
                    <div className="relative w-[180px] h-[100px]">
                      <Image src={b.img} alt={t(`brands.brandNames.${b.nameKey}`)} fill className="object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.06]" />
                </div>
                    <span className="mt-2 text-sm font-semibold text-gray-800 opacity-80">{t(`brands.brandNames.${b.nameKey}`)}</span>
              </div>
                ))}
              </div>
              {/* Set B (duplicate) */}
              <div className="flex gap-10 shrink-0 items-center">
                {[
                  { nameKey: 'frutti', img: '/images/markalarimiz/frutti-logo-new-pdf.png' },
                  { nameKey: 'keita', img: '/images/markalarimiz/keita.png' },
                  { nameKey: 'shirino', img: '/images/markalarimiz/shirino.png' },
                  { nameKey: 'brawoo', img: '/images/markalarimiz/brawoo-kahve.jpg' },
                  { nameKey: 'fruttiKahve', img: '/images/markalarimiz/frutti-kahve.jpg' },
                  { nameKey: 'brawali', img: '/images/markalarimiz/brawali.png' },
                  { nameKey: 'fresh', img: '/images/markalarimiz/fresh-logo-pdf.png' },
                ].map((b, idx) => (
                  <div key={`r-b-${idx}`} className="group flex flex-col items-center">
                    <div className="relative w-[180px] h-[100px]">
                      <Image src={b.img} alt={t(`brands.brandNames.${b.nameKey}`)} fill className="object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.06]" />
            </div>
                    <span className="mt-2 text-sm font-semibold text-gray-800 opacity-80">{t(`brands.brandNames.${b.nameKey}`)}</span>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Bölümü */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-gold-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTRoMnYyaC0yem0wIDBoMnYyaC0yem0wIDBoMnYyaC0yem0wIDBoMnYyaC0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Modern Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-lg">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold uppercase tracking-wider text-gold-200">{t('brands.premiumProducts')}</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
                {t('brands.title')}
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('brands.description')}
            </p>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link 
                href={`/${locale}/products/`} 
                className="group relative px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {tCommon('allProducts')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
              <Link 
                href={`/${locale}/contact/`} 
                className="group relative px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white/40 text-white rounded-2xl font-bold text-lg hover:bg-white/30 hover:border-white/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {tCommon('contactUs')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rakamlarla Roversan - Professional & Compact */}
      <section ref={statsRef} className="section-padding bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white relative overflow-hidden stats-section">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0aDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-400/15 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Compact Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mb-4">
              <div className="p-2 bg-gradient-to-br from-gold-400/30 via-primary-500/30 to-gold-500/30 rounded-lg border border-gold-400/40 shadow-lg">
                <FaChartLine className="text-lg text-gold-300" style={{filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))'}} />
              </div>
              <span className="text-white font-semibold text-xs uppercase tracking-wide">{t('stats.title')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
              {t('stats.title')}
            </h2>
            <p className="text-lg text-primary-200 max-w-2xl mx-auto">
              {t('stats.description')}
            </p>
          </div>

          {/* Professional Stats Grid - Compact Design */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {/* Ürün Çeşidi */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20 hover:border-gold-400/40 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-gold-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaBox className="text-white text-xl md:text-2xl" />
                </div>
              </div>
              <div className="text-center mb-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-br from-white to-gold-200 bg-clip-text text-transparent">
                    {productCount}
                  </span>
                  <span className="text-gold-400 ml-1">+</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs md:text-sm font-semibold text-white mb-1">{t('stats.products.title')}</h3>
                <p className="text-[10px] md:text-xs text-primary-200">{t('stats.products.description')}</p>
              </div>
            </div>

            {/* İhracat Ülkesi */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20 hover:border-cyan-400/40 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaGlobeAmericas className="text-white text-xl md:text-2xl" />
                </div>
              </div>
              <div className="text-center mb-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent">
                    {countryCount}
                  </span>
                  <span className="text-cyan-400 ml-1">+</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs md:text-sm font-semibold text-white mb-1">{t('stats.countries.title')}</h3>
                <p className="text-[10px] md:text-xs text-primary-200">{t('stats.countries.description')}</p>
              </div>
            </div>

            {/* Kalite Garantisi */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20 hover:border-emerald-400/40 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaAward className="text-white text-xl md:text-2xl" />
                </div>
              </div>
              <div className="text-center mb-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-br from-white to-emerald-200 bg-clip-text text-transparent">
                    {qualityCount}
                  </span>
                  <span className="text-emerald-400 ml-1">%</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs md:text-sm font-semibold text-white mb-1">{t('stats.quality.title')}</h3>
                <p className="text-[10px] md:text-xs text-primary-200">{t('stats.quality.description')}</p>
              </div>
            </div>

            {/* Yıllık Deneyim */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20 hover:border-purple-400/40 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaClock className="text-white text-xl md:text-2xl" />
                </div>
              </div>
              <div className="text-center mb-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent">
                    {experienceCount}
                  </span>
                  <span className="text-purple-400 ml-1">+</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs md:text-sm font-semibold text-white mb-1">{t('stats.experience.title')}</h3>
                <p className="text-[10px] md:text-xs text-primary-200">{t('stats.experience.description')}</p>
              </div>
            </div>

            {/* Sertifika */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/20 hover:border-red-400/40 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FaCertificate className="text-white text-xl md:text-2xl" />
                </div>
              </div>
              <div className="text-center mb-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-br from-white to-red-200 bg-clip-text text-transparent">
                    {certificateCount}
                  </span>
                  <span className="text-red-400 ml-1">+</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xs md:text-sm font-semibold text-white mb-1">{t('stats.certificate.title')}</h3>
                <p className="text-[10px] md:text-xs text-primary-200">{t('stats.certificate.description')}</p>
              </div>
            </div>

          </div>

          {/* Animated Stats Background SVG - Behind Cards */}
          <div className="absolute -inset-20 md:-inset-40 overflow-visible pointer-events-none z-0">
            <svg className="w-full h-full opacity-25" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
                </linearGradient>
              </defs>
              
              {/* Chart Lines - Animated - Spread Out */}
              <g className="stats-draw">
                <path
                  d="M 100 500 Q 400 400, 700 450 T 1300 430 T 1400 400"
                  fill="none"
                  stroke="url(#statGradient)"
                  strokeWidth="4"
                  className="stat-line"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                />
                <path
                  d="M 50 550 Q 350 470, 650 500 T 1250 480 T 1350 450"
                  fill="none"
                  stroke="url(#statGradient)"
                  strokeWidth="3"
                  className="stat-line"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{animationDelay: '0.3s'}}
                />
                <path
                  d="M 150 530 Q 450 420, 750 470 T 1350 450 T 1450 420"
                  fill="none"
                  stroke="url(#statGradient)"
                  strokeWidth="3.5"
                  className="stat-line"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{animationDelay: '0.6s'}}
                />
                
                {/* Data Points - Spread Out */}
                <circle cx="250" cy="430" r="12" fill="#fbbf24" className="stat-point" opacity="0" />
                <circle cx="500" cy="410" r="12" fill="#f59e0b" className="stat-point" opacity="0" style={{animationDelay: '0.4s'}} />
                <circle cx="750" cy="390" r="12" fill="#fbbf24" className="stat-point" opacity="0" style={{animationDelay: '0.8s'}} />
                <circle cx="1000" cy="370" r="12" fill="#f59e0b" className="stat-point" opacity="0" style={{animationDelay: '1.2s'}} />
                <circle cx="1250" cy="350" r="12" fill="#fbbf24" className="stat-point" opacity="0" style={{animationDelay: '1.6s'}} />
              </g>
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}
