'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from '@/i18n/routing'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaGlobe, FaChevronDown } from 'react-icons/fa'


type NavLinkProps = {
  href: string
  label: string
  onEnter: () => void
  onLeave: () => void
  onTap: () => void
  isCompact?: boolean
  locale: string
}

const NavLink = ({ href, label, onEnter, onLeave, onTap, isCompact, locale }: NavLinkProps) => {
  const pathname = usePathname()
  // next-intl's usePathname() returns pathname without locale prefix
  // So we can directly compare with href
  const isActive = pathname === href && href !== '/'
  
  // Static export modunda locale'i manuel olarak ekle
  // trailingSlash: true olduğu için sonuna / ekle
  const localizedHref = `/${locale}${href === '/' ? '/' : href}/`

  return (
    <Link
      href={localizedHref}
      className={`nav-item relative font-bold text-white transition-all duration-300 group ${
        isCompact ? 'px-3 py-2 text-sm' : 'px-3.5 py-2.5 text-base'
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onTap}
      onClick={onTap}
    >
      <div className="nav-wave-layer" aria-hidden="true" />
      <span
        className={`nav-label relative z-20 inline-block whitespace-nowrap ${
          isActive ? 'drop-shadow-[0_0_18px_rgba(255,225,140,0.35)] text-gold-300' : ''
        }`}
      >
        {label}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full" />
      )}
    </Link>
  )
}

const locales = ['tr', 'en', 'ar', 'es'] as const

// Static export modunda useLocale() güvenilir değil, browser URL'inden okuyoruz
const getLocaleFromUrl = (): string => {
  if (typeof window === 'undefined') return 'tr'
  const pathname = window.location.pathname
  const localeMatch = pathname.match(/^\/(tr|en|ar|es)(\/|$)/)
  return localeMatch ? localeMatch[1] : 'tr'
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isSloshing, setIsSloshing] = useState(false)
  const [currentLocale, setCurrentLocale] = useState<string>('tr')

  const pathname = usePathname()
  const locale = useLocale()
  const tCommon = useTranslations('common')
  const tLang = useTranslations('languages')

  // Browser URL'inden locale'i oku ve state'e kaydet
  // URL değiştiğinde (navigation veya popstate) locale'i güncelle
  useEffect(() => {
    const updateLocale = () => {
      const urlLocale = getLocaleFromUrl()
      setCurrentLocale((prev) => {
        // Sadece değiştiyse güncelle (gereksiz re-render'ları önle)
        if (prev !== urlLocale) {
          return urlLocale
        }
        return prev
      })
    }
    
    // İlk yüklemede locale'i oku
    updateLocale()
    
    // URL değiştiğinde locale'i güncelle (popstate event - back/forward button)
    window.addEventListener('popstate', updateLocale)
    
    // Next.js client-side navigation için: pathname değiştiğinde locale'i kontrol et
    // pathname değiştiğinde URL de değişmiş olabilir
    updateLocale()
    
    return () => {
      window.removeEventListener('popstate', updateLocale)
    }
  }, [pathname])

  const langDropdownRef = useRef<HTMLDivElement>(null)

  const changeLanguage = (newLocale: string) => {
    // Static export modunda usePathname() ve useLocale() güvenilir değil
    // Browser URL'ini direkt okuyup locale ve pathname'i manuel parse ediyoruz
    if (typeof window === 'undefined') return
    
    const currentUrl = window.location.pathname
    // URL formatı: /locale/path/ veya /locale/path
    // Locale'i çıkar (tr, en, ar, es)
    const localeMatch = currentUrl.match(/^\/(tr|en|ar|es)(\/.*)?$/)
    
    let currentPath = '/'
    if (localeMatch) {
      // Locale prefix'ini çıkar, kalan path'i al
      currentPath = localeMatch[2] || '/'
      // Trailing slash yoksa ekle (trailingSlash: true)
      if (currentPath !== '/' && !currentPath.endsWith('/')) {
        currentPath = currentPath + '/'
      }
    } else {
      // Locale prefix yoksa, mevcut pathname'i kullan
      currentPath = pathname || '/'
      if (currentPath !== '/' && !currentPath.endsWith('/')) {
        currentPath = currentPath + '/'
      }
    }
    
    // Yeni URL'i oluştur
    const newUrl = `/${newLocale}${currentPath === '/' ? '/' : currentPath}`
    window.location.href = newUrl
    setIsLangOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangOpen])

  useEffect(() => {
    if (!isSloshing) return
    const timeout = setTimeout(() => setIsSloshing(false), 900)
    return () => clearTimeout(timeout)
  }, [isSloshing])

  const navLinks = [
    { href: '/', label: tCommon('home') },
    { href: '/about', label: tCommon('about') },
    { href: '/products', label: tCommon('products') },
    { href: '/gallery', label: tCommon('gallery') },
    { href: '/catalog', label: tCommon('catalog') },
    { href: '/certificates', label: tCommon('quality') },
    { href: '/contact', label: tCommon('contact') }
  ]

  return (
    <nav className={`fixed inset-x-0 ${isOpen ? 'z-[70]' : 'z-50'} pointer-events-none transition-all duration-300 ${isScrolled ? 'bottom-4' : 'top-4'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative pointer-events-auto rounded-full border ${
            isOpen 
              ? 'border-white/40 bg-white/20 backdrop-blur-xl z-[70]' 
              : isScrolled 
                ? 'border-white/20 bg-black/40' 
                : 'border-white/15 bg-white/10'
          } backdrop-blur-xl shadow-xl transition-all duration-500 ${
            isScrolled ? 'scale-[0.92]' : 'scale-100'
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-0 rounded-full overflow-hidden transition-opacity duration-300 ${
              isSloshing ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-800/35 via-orange-900/25 to-amber-800/35 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700/25 via-white/5 to-amber-700/25 liquid-slosh" />
          </div>
          <div
            className={`relative z-[70] flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'px-4 py-2.5' : 'px-5 md:px-6 py-3 md:py-3.5'
            }`}
          >
            <Link href={`/${currentLocale}/`} className="flex flex-shrink-0 items-center group relative mr-4">
              <div
                className={`relative logo-glow logo-glow-hover transition-all duration-500 group-hover:scale-[1.02] ${
                  isScrolled ? 'h-10 w-32' : 'h-12 md:h-14 w-36 md:w-44'
                }`}
              >
                <Image
                  src="/images/logo/logo.png"
                  alt="Roversan Gıda Logo"
                  fill
                  className="object-contain transition-all duration-500 group-hover:brightness-110"
                  priority
                />
              </div>
            </Link>

            <div
              className={`hidden flex-1 items-center justify-center transition-all duration-500 lg:flex ${
                isScrolled ? 'gap-1' : 'gap-1.5'
              }`}
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onEnter={() => setIsSloshing(true)}
                  onLeave={() => setIsSloshing(false)}
                  onTap={() => setIsSloshing(true)}
                  isCompact={isScrolled}
                  locale={currentLocale}
                />
              ))}

              <div
                ref={langDropdownRef}
                className={`relative flex-shrink-0 border-l-2 border-white/20 transition-all duration-500 ${
                  isScrolled ? 'ml-3 pl-3' : 'ml-4 pl-4'
                }`}
              >
                <button
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-white/80 transition-colors duration-300 hover:scale-110 hover:text-white"
                  aria-label="Change Language"
                >
                  <FaGlobe className={isScrolled ? 'text-base' : 'text-lg'} />
                  <span className="hidden text-sm font-semibold uppercase xl:inline">{currentLocale}</span>
                  <FaChevronDown
                    className={`text-xs transition-transform duration-300 ${
                      isLangOpen
                        ? isScrolled
                          ? 'rotate-0'
                          : 'rotate-180'
                        : isScrolled
                          ? 'rotate-180'
                          : 'rotate-0'
                    }`}
                  />
                </button>

                {isLangOpen && (
                  <div
                    className={`absolute right-0 z-50 min-w-[140px] rounded-xl border border-white/20 bg-white/95 py-2 shadow-2xl backdrop-blur-xl ${
                      isScrolled ? 'bottom-full mb-2' : 'top-full mt-2'
                    }`}
                  >
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => changeLanguage(loc)}
                        className={`w-full px-4 py-2 text-left text-sm font-semibold transition-colors duration-200 ${
                          currentLocale === loc
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        <span className="mr-2">
                          {loc === 'tr' ? '🇹🇷' : loc === 'en' ? '🇬🇧' : loc === 'ar' ? '🇸🇦' : '🇪🇸'}
                        </span>
                        {tLang(loc)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`flex flex-shrink-0 items-center border-l-2 border-white/20 transition-all duration-500 ${
                  isScrolled ? 'ml-3 gap-2 pl-3' : 'ml-4 gap-3 pl-4'
                }`}
              >
                <a
                  href="https://www.instagram.com/roversandrink/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform text-white/80 transition-colors duration-300 hover:scale-110 hover:text-[#E4405F]"
                  aria-label="Instagram"
                >
                  <FaInstagram className={isScrolled ? 'text-base' : 'text-lg'} />
                </a>
                <a
                  href="https://x.com/roversangida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform text-white/80 transition-colors duration-300 hover:scale-110 hover:text-[#1DA1F2]"
                  aria-label="X (Twitter)"
                >
                  <FaTwitter className={isScrolled ? 'text-base' : 'text-lg'} />
                </a>
                <a
                  href="mailto:info@roversan.com"
                  className="transform text-white/80 transition-colors duration-300 hover:scale-110 hover:text-[#C7A27A]"
                  aria-label="E-posta"
                >
                  <FaEnvelope className={isScrolled ? 'text-base' : 'text-lg'} />
                </a>
                <a
                  href="tel:+904143166369"
                  className="transform text-white/80 transition-colors duration-300 hover:scale-110 hover:text-emerald-400"
                  aria-label="Telefon"
                >
                  <FaPhoneAlt className={isScrolled ? 'text-base' : 'text-lg'} />
                </a>
              </div>
            </div>

            <button
              className={`relative z-[70] text-white transition-all duration-500 hover:text-gray-200 lg:hidden ${
                isScrolled ? 'rounded-lg p-1.5 hover:bg-white/10' : 'rounded-lg p-2 hover:bg-white/10'
              }`}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={isScrolled ? 22 : 28} className="relative z-[70]" /> : <HiMenu size={isScrolled ? 22 : 28} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div className="pointer-events-auto relative z-[60] mt-3 space-y-2 rounded-2xl border border-white/40 bg-white/15 backdrop-blur-xl px-2 pb-4 shadow-2xl lg:hidden">
            {navLinks.map((link) => {
              // next-intl's usePathname() returns pathname without locale prefix
              const isActive = pathname === link.href && link.href !== '/'
              // Static export modunda locale'i manuel olarak ekle
              // trailingSlash: true olduğu için sonuna / ekle
              const localizedHref = `/${currentLocale}${link.href === '/' ? '/' : link.href}/`
              return (
                <Link
                  key={link.href}
                  href={localizedHref}
                  className={`relative block rounded-lg px-4 py-3 font-bold transition-all drop-shadow-md ${
                    isActive ? 'bg-gold-500/30 text-gold-300' : 'text-white/95 hover:bg-white/20 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-full bg-gold-400" />
                  )}
                </Link>
              )
            })}

            <div className="mt-6 border-t-2 border-white/20 pt-6">
              <div className="mb-4 px-4">
                <div className="mb-3 flex items-center gap-2 text-white/90 font-semibold">
                  <FaGlobe className="text-lg" />
                  <span>{tCommon('language')}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        changeLanguage(loc)
                        setIsOpen(false)
                      }}
                      className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        currentLocale === loc ? 'bg-gold-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span>{loc === 'tr' ? '🇹🇷' : loc === 'en' ? '🇬🇧' : loc === 'ar' ? '🇸🇦' : '🇪🇸'}</span>
                      {tLang(loc)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 border-t-2 border-white/20 pt-4">
              <a
                href="https://www.instagram.com/roversandrink/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 transition-colors hover:text-[#E4405F]"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://x.com/roversangida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 transition-colors hover:text-[#1DA1F2]"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a href="mailto:info@roversan.com" className="text-amber-700 transition-colors hover:text-amber-800" aria-label="E-posta">
                <FaEnvelope className="text-2xl" />
              </a>
              <a href="tel:+904143166369" className="text-amber-700 transition-colors hover:text-amber-800" aria-label="Telefon">
                <FaPhoneAlt className="text-2xl" />
              </a>
            </div>
          </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
