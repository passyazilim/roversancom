'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { FaDownload, FaFileAlt, FaBox, FaCheckCircle, FaArrowRight, FaStar, FaGlobe, FaClock, FaExpand, FaCompress } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function CatalogPage() {
  const t = useTranslations('catalog')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null)

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

  // Görsel yüklendiğinde aspect ratio'yu al
  useEffect(() => {
    const img = new window.Image()
    const imageUrl = getProductImage()
    img.onload = () => {
      const aspectRatio = img.width / img.height
      setImageAspectRatio(aspectRatio)
    }
    img.src = imageUrl
  }, [locale])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsFullscreen(false)
      document.body.style.overflow = ''
    }
  }


  return (
    <>
      {/* Fullscreen PDF Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <FaFileAlt className="text-xl" />
              <h3 className="text-lg font-bold">{t('preview.pdfTitle')}</h3>
            </div>
            <button
              onClick={toggleFullscreen}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 border border-white/30 hover:border-white/50"
            >
              <FaCompress className="text-sm" />
              <span>{t('preview.close')}</span>
            </button>
          </div>
          <div className="flex-1 p-4">
            <iframe
              src="/images/katalog/roversan-katalog.pdf"
              className="w-full h-full border-0 rounded-xl"
              title={t('preview.iframeTitle')}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
        {/* Hero Section - Full Viewport Height */}
        <section className="relative min-h-screen md:h-screen py-12 md:py-0 text-white overflow-hidden flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-cover bg-center" style={{
            backgroundImage: "url(/images/background/katalog.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-gold-900/90"></div>
          </div>
          
          {/* Decorative Side Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-0 sm:top-6 md:top-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gold-400/20 rounded-full blur-2xl sm:blur-3xl animate-float"></div>
            <div className="absolute bottom-4 right-0 sm:bottom-6 md:bottom-10 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary-400/20 rounded-full blur-2xl sm:blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-4 sm:left-6 md:left-10 w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/10 rounded-full blur-xl sm:blur-2xl"></div>
            <div className="absolute top-1/3 right-4 sm:right-10 md:right-20 w-14 h-14 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gold-300/15 rounded-full blur-xl sm:blur-2xl"></div>
          </div>

          <div className="container-custom relative z-10 w-full px-4 sm:px-6">
            <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="md:col-span-5 text-center md:text-left order-2 md:order-1">
                <div className="inline-block mb-4 md:mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto md:mx-0 border-2 border-white/30 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <FaFileAlt className="text-4xl md:text-5xl text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-primary-100 max-w-xl mx-auto md:mx-0 leading-relaxed drop-shadow-lg mb-6">
                  {t('hero.description')}
                </p>
                
                {/* Decorative Badges */}
                <div className="flex flex-wrap items-center gap-3 mt-6 justify-center md:justify-start">
                  <div className="bg-white/10 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20">
                    <span className="text-xs md:text-sm font-semibold text-white">📄 {t('badges.pdfFormat')}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20">
                    <span className="text-xs md:text-sm font-semibold text-white">🌐 {t('badges.multiLanguage')}</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Product Image Showcase */}
              <div className="md:col-span-7 relative mt-4 md:mt-0 flex items-center justify-center order-1 md:order-2">
                <div className="relative group w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px]">
                  {/* Multi-layer Glow Effects */}
                  <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 lg:-inset-6 bg-gradient-to-r from-gold-400/40 via-primary-400/40 to-gold-400/40 rounded-3xl blur-2xl sm:blur-3xl group-hover:blur-[40px] transition-all duration-700 animate-pulse"></div>
                  <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 lg:-inset-10 bg-gradient-to-r from-primary-500/20 via-gold-500/20 to-primary-500/20 rounded-3xl blur-[40px] sm:blur-[60px] group-hover:blur-[80px] transition-all duration-1000"></div>
                  <div className="absolute -inset-6 sm:-inset-8 md:-inset-12 lg:-inset-14 bg-gradient-to-r from-white/10 via-primary-300/10 to-white/10 rounded-3xl blur-[60px] sm:blur-[80px] opacity-50"></div>
                  
                  {/* Floating Particles Effect */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gold-400/30 rounded-full blur-xl sm:blur-2xl animate-float"></div>
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary-400/30 rounded-full blur-xl sm:blur-2xl animate-float" style={{animationDelay: '1.5s'}}></div>
                  
                  {/* Modern Frame with Gradient Background */}
                  <div className="relative z-10 rounded-2xl sm:rounded-3xl md:rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/10 via-primary-50/20 to-gold-50/20 backdrop-blur-sm border-2 border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-all duration-700">
                    {/* Inner Container - Dynamic aspect ratio based on image */}
                    <div 
                      className="relative w-full overflow-hidden"
                      style={{
                        aspectRatio: imageAspectRatio ? `${imageAspectRatio}` : '4/3'
                      }}
                    >
                      <Image 
                        key={`product-image-${locale}`}
                        src={getProductImage()}
                        alt={t('catalog.allProducts')}
                        fill
                        className="object-contain transform scale-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                        quality={95}
                        priority
                        unoptimized={false}
                        sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 480px"
                        onLoad={(e) => {
                          const img = e.currentTarget as HTMLImageElement
                          if (img.naturalWidth && img.naturalHeight) {
                            const aspectRatio = img.naturalWidth / img.naturalHeight
                            setImageAspectRatio(aspectRatio)
                          }
                        }}
                      />
                      {/* Shine Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </div>
                    
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-t-2 sm:border-t-3 md:border-t-4 border-l-2 sm:border-l-3 md:border-l-4 border-gold-400/50 rounded-tl-2xl sm:rounded-tl-3xl z-10"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-t-2 sm:border-t-3 md:border-t-4 border-r-2 sm:border-r-3 md:border-r-4 border-primary-400/50 rounded-tr-2xl sm:rounded-tr-3xl z-10"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-b-2 sm:border-b-3 md:border-b-4 border-l-2 sm:border-l-3 md:border-l-4 border-primary-400/50 rounded-bl-2xl sm:rounded-bl-3xl z-10"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-b-2 sm:border-b-3 md:border-b-4 border-r-2 sm:border-r-3 md:border-r-4 border-gold-400/50 rounded-br-2xl sm:rounded-br-3xl z-10"></div>
                  </div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-6 md:right-6 bg-gradient-to-br from-gold-400 to-gold-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-black shadow-2xl border-2 border-white/40 transform rotate-12 group-hover:rotate-0 transition-all duration-300 z-20 backdrop-blur-sm">
                    {t('catalog.productCount')}
                  </div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-6 md:left-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-2xl border-2 border-white/40 transform -rotate-12 group-hover:rotate-0 transition-all duration-300 flex items-center gap-0.5 sm:gap-1 md:gap-2 z-20 backdrop-blur-sm">
                    <FaStar className="text-gold-300 text-[8px] sm:text-xs" />
                    <span className="hidden sm:inline">{t('badges.premium')}</span>
                    <span className="sm:hidden">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Preview & Download Section - Side by Side */}
        <section className="section-padding relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-gold-100/30 to-transparent"></div>
          </div>
          
          <div className="container-custom max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              {/* Left Side - PDF Preview */}
              <div className="relative group">
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-primary-100">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDE0aDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 flex-shrink-0">
                          <FaFileAlt className="text-xl sm:text-2xl text-white" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white">{t('preview.pdfTitle')}</h3>
                          <p className="text-white/80 text-[10px] sm:text-xs flex items-center gap-1">
                            <FaClock className="text-[10px] sm:text-xs" />
                            {t('preview.interactive')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={toggleFullscreen}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 border border-white/30 hover:border-white/50 hover:scale-105 text-xs sm:text-sm flex-1 sm:flex-none"
                          title={t('buttons.fullscreen')}
                        >
                          <FaExpand className="text-xs sm:text-sm" />
                          <span className="hidden sm:inline">{t('buttons.fullscreen')}</span>
                        </button>
                        <a 
                          href="/images/katalog/roversan-katalog.pdf" 
                          download="Roversan_Gida_Katalog.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 border border-white/30 hover:border-white/50 hover:scale-105 text-xs sm:text-sm flex-1 sm:flex-none"
                        >
                          <FaDownload className="text-xs sm:text-sm" />
                          <span>{t('buttons.download')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4" style={{ height: '50vh', minHeight: '300px', maxHeight: '600px' }}>
                    <iframe
                      src="/images/katalog/roversan-katalog.pdf"
                      className="w-full h-full border-0 rounded-lg sm:rounded-xl shadow-inner bg-white"
                      title={t('preview.iframeTitle')}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Download Card */}
              <div className="relative group">
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl h-full">
                  <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden h-full">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDE0aDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg border border-white/30">
                        <FaFileAlt className="text-white text-2xl sm:text-3xl" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">{t('catalog.title')}</h2>
                      <p className="text-white/95 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                        {t('catalog.description')}
                      </p>
                      
                      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                        <li className="flex items-center text-white">
                          <FaCheckCircle className="text-white mr-2 sm:mr-3 text-xs sm:text-sm flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{t('catalog.items.powerDrinks')}</span>
                        </li>
                        <li className="flex items-center text-white">
                          <FaCheckCircle className="text-white mr-2 sm:mr-3 text-xs sm:text-sm flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{t('catalog.items.coffee')}</span>
                        </li>
                        <li className="flex items-center text-white">
                          <FaCheckCircle className="text-white mr-2 sm:mr-3 text-xs sm:text-sm flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{t('catalog.items.machines')}</span>
                        </li>
                        <li className="flex items-center text-white">
                          <FaCheckCircle className="text-white mr-2 sm:mr-3 text-xs sm:text-sm flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{t('catalog.items.technical')}</span>
                        </li>
                      </ul>
                      
                      <a 
                        href="/images/katalog/roversan-katalog.pdf" 
                        download="Roversan_Gida_Katalog.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gold-50 text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <FaDownload className="text-sm sm:text-base" />
                        <span>{t('catalog.download')}</span>
                        <FaArrowRight className="text-xs sm:text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-0">
              {[
                {
                  icon: FaBox,
                  title: t('features.products.title'),
                  description: t('features.products.description'),
                  gradient: 'from-primary-500 to-primary-600',
                },
                {
                  icon: FaFileAlt,
                  title: t('features.details.title'),
                  description: t('features.details.description'),
                  gradient: 'from-gold-500 to-gold-600',
                },
                {
                  icon: FaGlobe,
                  title: t('features.access.title'),
                  description: t('features.access.description'),
                  gradient: 'from-blue-500 to-blue-600',
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 transform transition-all duration-300 ${
                    hoveredCard === index ? 'shadow-xl -translate-y-2 border-primary-300' : ''
                  }`}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg transform transition-transform duration-300 ${
                      hoveredCard === index ? 'scale-110' : ''
                    }`}>
                      <feature.icon className="text-white text-xl sm:text-2xl" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-center text-xs sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 py-8 sm:py-12 relative overflow-hidden">
          <div className="container-custom max-w-4xl relative z-10 px-4 sm:px-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-center text-white border border-white/20 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-white/30 shadow-lg">
                <FaFileAlt className="text-white text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
                {t('cta.title')}
              </h3>
              <p className="text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link 
                  href={`/${locale}/products/`} 
                  className="group inline-flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-primary-50 font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <span>{tCommon('allProducts')}</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href={`/${locale}/contact/`} 
                  className="group inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <span>{tCommon('contactUs')}</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}