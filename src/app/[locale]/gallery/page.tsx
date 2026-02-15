"use client"

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, useCallback, useEffect, useRef } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaExpand, FaCompress } from 'react-icons/fa'

// Fallback images if API fails
const fallbackImages = [
  '/images/galeri/fuar1.jpg',
  '/images/galeri/fuar2.jpg',
  '/images/galeri/fuar3.jpg',
  '/images/galeri/fuar4.jpg',
  '/images/galeri/fuar5.jpg',
  '/images/galeri/fuar6.jpg',
  '/images/galeri/fuar7.jpg',
  '/images/galeri/fuar8.jpg',
  '/images/galeri/fuar9.jpg',
  '/images/galeri/fuar10.jpg',
  '/images/galeri/fuar11.jpg',
  '/images/galeri/fuar12.jpg',
  '/images/galeri/fuar13.jpg',
  '/images/galeri/fuar14.jpg',
  '/images/galeri/fuar15.jpg',
  '/images/galeri/fuar16.jpg',
]

export default function GalleryPage() {
  const t = useTranslations('gallery')
  const tCommon = useTranslations('common')
  const [isOpen, setIsOpen] = useState(false)
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [activateDecor, setActivateDecor] = useState(true)
  const galleryImages = fallbackImages
  const sectionRef = useRef<HTMLElement>(null)
  const [fullscreenVideo, setFullscreenVideo] = useState<number | null>(null)
  const videoRefs = {
    1: useRef<HTMLVideoElement>(null),
    2: useRef<HTMLVideoElement>(null),
    3: useRef<HTMLVideoElement>(null),
  }

  // Video index'lerini hesapla (videolar artık grid dışında, sadece fotoğraflar modal'da gösterilir)
  const getActualIndex = (displayIdx: number) => {
    // Tüm indexler geçerli çünkü videolar artık grid dışında
    return displayIdx
  }

  const openModal = (idx: number) => {
    // Artık tüm fotoğraflar modal'da gösterilebilir (videolar ayrı bölümde)
    setCurrentIdx(idx)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const showPrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [galleryImages.length])

  const showNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % galleryImages.length)
  }, [galleryImages.length])

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActivateDecor(true)
      })
    }, { threshold: 0.2 })
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, showPrev, showNext])

  // Fullscreen functions
  const toggleFullscreen = (videoNumber: number) => {
    const video = videoRefs[videoNumber as keyof typeof videoRefs].current
    if (!video) return

    if (fullscreenVideo === videoNumber) {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen()
      }
      setFullscreenVideo(null)
    } else {
      // Enter fullscreen
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen()
      } else if ((video as any).mozRequestFullScreen) {
        (video as any).mozRequestFullScreen()
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen()
      }
      setFullscreenVideo(videoNumber)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement && 
          !(document as any).mozFullScreenElement && !(document as any).msFullscreenElement) {
        setFullscreenVideo(null)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white">
      {/* Hero - Genişletilmiş ve Şık */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/galeri.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/75 via-primary-800/65 to-gold-900/75"></div>
          {/* Decorative overlay pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <FaImages className="text-4xl md:text-5xl" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-gold-100 to-white bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('hero.description')}
          </p>
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gold-400"></div>
            <div className="w-2 h-2 rounded-full bg-gold-400"></div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gold-400"></div>
          </div>
        </div>
      </section>

      {/* Reklam Filmleri Özel Bölümü - Hero'dan Hemen Sonra */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-primary-50 via-white to-primary-50">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-gold-500"></div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900">
                <span className="text-3xl md:text-5xl mr-3">🎬</span>
                <span className="bg-gradient-to-r from-primary-600 via-gold-600 to-primary-600 bg-clip-text text-transparent">
                  {t('advertisement.title')}
                </span>
              </h2>
              <div className="h-1 w-12 bg-gradient-to-l from-transparent to-gold-500"></div>
            </div>
            <p className="text-gray-600 text-base md:text-lg font-medium">{t('advertisement.latestVideos')}</p>
          </div>
          
          {/* Yaratıcı Video Yerleşimi - Asimetrik Düzen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Ana Büyük Video - Sol (8 kolon) */}
            <div className="lg:col-span-8 group relative">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_60px_rgba(251,191,36,0.7)] transition-all duration-700 hover:scale-[1.01] bg-gradient-to-br from-black via-primary-900 to-black">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-3 bg-gradient-to-r from-gold-500 via-primary-500 via-gold-400 to-primary-500 rounded-3xl blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 -z-10"></div>
                
                {/* Modern Video Badge with Animation */}
                <div className="absolute top-6 left-6 z-20 px-6 py-3.5 bg-gradient-to-r from-gold-500/95 via-primary-500/95 to-gold-500/95 backdrop-blur-lg rounded-2xl border-2 border-gold-300/60 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl animate-pulse">🎬</span>
                    <span className="bg-gradient-to-r from-white to-gold-100 bg-clip-text text-transparent">
                      {t('advertisement.title')} 1
                    </span>
                  </span>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={() => toggleFullscreen(1)}
                  className="absolute top-6 right-6 z-20 p-3 bg-white/20 backdrop-blur-lg rounded-xl border-2 border-white/40 shadow-xl hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
                  aria-label="Tam Ekran"
                >
                  {fullscreenVideo === 1 ? (
                    <FaCompress className="text-white text-xl" />
                  ) : (
                    <FaExpand className="text-white text-xl" />
                  )}
                </button>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-gold-400/50 shadow-2xl transform group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[28px] border-l-white border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent ml-1.5"></div>
                  </div>
                </div>
                
                <video
                  ref={videoRefs[1]}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src="/images/reklam filmlerimiz/WhatsApp Video 2025-11-22 at 14.34.44.mp4" type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-primary-500/10 pointer-events-none"></div>
                
                {/* Modern Corner Accents with Animation */}
                <div className="absolute top-0 left-0 w-28 h-28 border-t-4 border-l-4 border-gold-400/70 rounded-tl-3xl transform group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 border-b-4 border-r-4 border-gold-400/70 rounded-br-3xl transform group-hover:scale-110 transition-transform duration-300"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            </div>

            {/* İki Küçük Video - Sağ (4 kolon) */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
              {/* Video 2 */}
              <div className="group relative flex-1">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-700 hover:scale-105 bg-gradient-to-br from-black via-primary-800 to-black">
                  {/* Animated Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 via-gold-500 via-primary-400 to-gold-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10"></div>
                  
                    {/* Modern Video Badge */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-2 bg-gradient-to-r from-primary-500/95 to-gold-500/95 backdrop-blur-lg rounded-xl border-2 border-primary-300/50 shadow-xl transform group-hover:rotate-12 transition-transform duration-300">
                      <span className="text-white font-bold text-sm flex items-center gap-1.5">
                        <span className="text-lg">🎬</span>
                        <span className="text-xs font-black">2</span>
                      </span>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={() => toggleFullscreen(2)}
                      className="absolute top-4 right-4 z-20 p-2.5 bg-white/20 backdrop-blur-lg rounded-lg border-2 border-white/40 shadow-xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                      aria-label="Tam Ekran"
                    >
                      {fullscreenVideo === 2 ? (
                        <FaCompress className="text-white text-base" />
                      ) : (
                        <FaExpand className="text-white text-base" />
                      )}
                    </button>
                  
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-3 border-primary-300/50 shadow-xl">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-0.5"></div>
                    </div>
                  </div>
                  
                    <video
                      ref={videoRefs[2]}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      preload="metadata"
                    >
                      <source src="/images/reklam filmlerimiz/WhatsApp Video 2025-11-22 at 14.35.01.mp4" type="video/mp4" />
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-gold-500/10 pointer-events-none"></div>
                  
                  {/* Modern Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-3 border-r-3 border-gold-400/60 rounded-tr-3xl transform group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-3 border-l-3 border-gold-400/60 rounded-bl-3xl transform group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                </div>
              </div>

              {/* Video 3 */}
              <div className="group relative flex-1">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all duration-700 hover:scale-105 bg-gradient-to-br from-black via-gold-900 to-black">
                  {/* Animated Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 via-primary-500 via-gold-400 to-primary-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10"></div>
                  
                    {/* Modern Video Badge */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-2 bg-gradient-to-r from-gold-500/95 to-primary-500/95 backdrop-blur-lg rounded-xl border-2 border-gold-300/50 shadow-xl transform group-hover:rotate-12 transition-transform duration-300">
                      <span className="text-white font-bold text-sm flex items-center gap-1.5">
                        <span className="text-lg">🎬</span>
                        <span className="text-xs font-black">3</span>
                      </span>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={() => toggleFullscreen(3)}
                      className="absolute top-4 right-4 z-20 p-2.5 bg-white/20 backdrop-blur-lg rounded-lg border-2 border-white/40 shadow-xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                      aria-label="Tam Ekran"
                    >
                      {fullscreenVideo === 3 ? (
                        <FaCompress className="text-white text-base" />
                      ) : (
                        <FaExpand className="text-white text-base" />
                      )}
                    </button>
                  
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-3 border-gold-300/50 shadow-xl">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-0.5"></div>
                    </div>
                  </div>
                  
                    <video
                      ref={videoRefs[3]}
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      preload="metadata"
                    >
                      <source src="/images/reklam filmlerimiz/VIDEO-2025-11-14-22-56-43.mp4" type="video/mp4" />
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-primary-500/10 pointer-events-none"></div>
                  
                  {/* Modern Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-3 border-r-3 border-primary-400/60 rounded-tr-3xl transform group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-3 border-l-3 border-primary-400/60 rounded-bl-3xl transform group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Fotoğrafları Bölümü */}
      <section ref={sectionRef} className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-primary-50 to-gold-50">
        {/* Gold swirls (under content) */}
        <svg className="absolute inset-0 z-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <g className={activateDecor ? 'gold-swirl' : ''} transform="translate(15%,20%)">
            <path d="M0,0 c50,0 80,30 80,80 c0,50 -30,80 -80,80 c-50,0 -80,-30 -80,-80 c0,-50 30,-80 80,-80" fill="none" stroke="#f59e0b" strokeWidth="3" strokeOpacity="0.45" />
            <path d="M0,0 c70,0 110,40 110,110 c0,70 -40,110 -110,110 c-70,0 -110,-40 -110,-110 c0,-70 40,-110 110,-110" fill="none" stroke="#fbbf24" strokeWidth="2" strokeOpacity="0.3" />
          </g>
          <g className={activateDecor ? 'gold-swirl' : ''} transform="translate(75%,35%)">
            <path d="M0,0 c40,0 60,24 60,60 c0,36 -24,60 -60,60 c-36,0 -60,-24 -60,-60 c0,-36 24,-60 60,-60" fill="none" stroke="#f59e0b" strokeWidth="3" strokeOpacity="0.4" />
            <path d="M0,0 c90,0 140,50 140,140 c0,90 -50,140 -140,140 c-90,0 -140,-50 -140,-140 c0,-90 50,-140 140,-140" fill="none" stroke="#fbbf24" strokeWidth="2" strokeOpacity="0.28" />
          </g>
          <g className={activateDecor ? 'gold-swirl' : ''} transform="translate(45%,75%)">
            <path d="M0,0 c60,0 90,36 90,90 c0,54 -36,90 -90,90 c-54,0 -90,-36 -90,-90 c0,-54 36,-90 90,-90" fill="none" stroke="#f59e0b" strokeWidth="3" strokeOpacity="0.35" />
          </g>
        </svg>

        <div className="container-custom relative z-10">
          {/* Galeri Fotoğrafları Başlığı */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{t('photos.title')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto"></div>
          </div>

          {/* Galeri Fotoğrafları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((src, idx) => {
              
              // Normal fotoğraf
              return (
                <button
                  key={src}
                  onClick={() => openModal(idx)}
                  className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white/60 backdrop-blur-sm"
                  aria-label={`${t('hero.title')} ${idx + 1}`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={src}
                      alt={`${t('hero.title')} ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={idx < 4}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label={tCommon('close')}
          >
            <FaTimes className="text-2xl" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 md:left-10 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label={t('modal.previous')}
          >
            <FaChevronLeft className="text-3xl" />
          </button>

          <div className="relative w-[90vw] max-w-5xl aspect-[16/10]">
            <Image
              src={galleryImages[currentIdx]}
              alt={`${t('hero.title')} ${currentIdx + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={showNext}
            className="absolute right-4 md:right-10 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label={t('modal.next')}
          >
            <FaChevronRight className="text-3xl" />
          </button>
        </div>
      )}
    </div>
  )
}
