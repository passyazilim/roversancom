"use client"

import Image from 'next/image'
import { useState, useCallback, useEffect, useRef } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages } from 'react-icons/fa'

const galleryImages = [
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
  const [isOpen, setIsOpen] = useState(false)
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [activateDecor, setActivateDecor] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const openModal = (idx: number) => {
    setCurrentIdx(idx)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const showPrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  const showNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % galleryImages.length)
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/galeri.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/60 to-gold-900/70"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FaImages className="text-5xl" />
          </div>
          <h1 className="heading-1 text-white mb-4">Galeri</h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
            Fuarlarımızdan ve etkinliklerimizden kareler
          </p>
        </div>
      </section>

      {/* Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((src, idx) => (
              <button
                key={src}
                onClick={() => openModal(idx)}
                className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white/60 backdrop-blur-sm"
                aria-label={`Galeri görseli ${idx + 1}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`Galeri ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={idx < 4}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Kapat"
          >
            <FaTimes className="text-2xl" />
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 md:left-10 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Önceki"
          >
            <FaChevronLeft className="text-3xl" />
          </button>

          <div className="relative w-[90vw] max-w-5xl aspect-[16/10]">
            <Image
              src={galleryImages[currentIdx]}
              alt={`Galeri büyük ${currentIdx + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={showNext}
            className="absolute right-4 md:right-10 text-white/90 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Sonraki"
          >
            <FaChevronRight className="text-3xl" />
          </button>
        </div>
      )}
    </div>
  )
}
