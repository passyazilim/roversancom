'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { FaCertificate, FaAward, FaShieldAlt, FaCheckCircle } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

export default function CertificatesPage() {
  const t = useTranslations('certificates')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const [visibleCerts, setVisibleCerts] = useState<number[]>([])
  const certsRef = useRef<HTMLDivElement>(null)

  const certificates = [
    {
      id: 1,
      icon: FaCertificate,
      title: t('certificates.iso9001.title'),
      description: t('certificates.iso9001.description'),
      scope: t('certificates.iso9001.scope'),
      percentage: 100,
      key: 'iso9001'
    },
    {
      id: 2,
      icon: FaShieldAlt,
      title: t('certificates.iso22000.title'),
      description: t('certificates.iso22000.description'),
      scope: t('certificates.iso22000.scope'),
      percentage: 100,
      key: 'iso22000'
    },
    {
      id: 3,
      icon: FaAward,
      title: t('certificates.haccp.title'),
      description: t('certificates.haccp.description'),
      scope: t('certificates.haccp.scope'),
      percentage: 100,
      key: 'haccp'
    },
    {
      id: 4,
      icon: FaCertificate,
      title: t('certificates.halal.title'),
      description: t('certificates.halal.description'),
      scope: t('certificates.halal.scope'),
      percentage: 100,
      key: 'halal'
    },
    {
      id: 5,
      icon: FaCertificate,
      title: t('certificates.kosher.title'),
      description: t('certificates.kosher.description'),
      scope: t('certificates.kosher.scope'),
      percentage: 100,
      key: 'kosher'
    },
    {
      id: 6,
      icon: FaShieldAlt,
      title: t('certificates.gmp.title'),
      description: t('certificates.gmp.description'),
      scope: t('certificates.gmp.scope'),
      percentage: 100,
      key: 'gmp'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const certId = parseInt(entry.target.getAttribute('data-cert-id') || '0')
            setVisibleCerts(prev => {
              if (!prev.includes(certId)) {
                return [...prev, certId]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (certsRef.current) {
      const certElements = certsRef.current.querySelectorAll('[data-cert-id]')
      certElements.forEach(el => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background/kalite-ve-sertifikalar-background/close-up-graduation-diploma.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-primary-800/30 to-gold-900/40"></div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 container-custom text-center">
          <h1 className="heading-1 text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-extrabold">{t('hero.title')}</h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] font-semibold">
            {t('hero.description')}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="heading-2 mb-4 md:mb-6">{t('qualityPolicy.title')}</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 px-4 md:px-0">
              {t('qualityPolicy.description1')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-primary-50 rounded-xl p-4 md:p-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaCheckCircle className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{t('principles.foodSafety.title')}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {t('principles.foodSafety.description')}
              </p>
            </div>

            <div className="bg-primary-50 rounded-xl p-4 md:p-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaCheckCircle className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{t('principles.hygiene.title')}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {t('principles.hygiene.description')}
              </p>
            </div>

            <div className="bg-primary-50 rounded-xl p-4 md:p-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <FaCheckCircle className="text-white text-xl md:text-2xl" />
              </div>
              <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{t('principles.improvement.title')}</h3>
              <p className="text-sm md:text-base text-gray-700">
                {t('principles.improvement.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={certsRef} className="section-padding bg-gradient-to-br from-primary-50 via-white to-gold-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
            <div className="inline-block mb-3 md:mb-4 px-4 md:px-6 py-1.5 md:py-2 bg-gradient-to-r from-primary-600 to-gold-600 text-white rounded-full text-xs md:text-sm">
              <span className="font-bold">{t('badge')}</span>
            </div>
            <h2 className="heading-2 mb-3 md:mb-4 text-lg md:text-3xl lg:text-4xl">{t('assurance.title')}</h2>
            <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('assurance.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {certificates.map((cert) => {
              const Icon = cert.icon
              const isVisible = visibleCerts.includes(cert.id)
              return (
                <div
                  key={cert.id}
                  data-cert-id={cert.id}
                  className="group relative bg-white rounded-xl md:rounded-3xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-gold-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 md:w-32 md:h-32 mb-3 md:mb-6">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <defs>
                          <linearGradient id={`gradient-${cert.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="100%" stopColor="#fbbf24" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          strokeWidth="2.5"
                          stroke={`url(#gradient-${cert.id})`}
                          strokeDasharray="100 100"
                          strokeDashoffset={isVisible ? '0' : '100'}
                          strokeLinecap="round"
                          style={{
                            transition: 'stroke-dashoffset 2s ease-out',
                            transitionDelay: '0.2s'
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Icon className="text-primary-600 text-xl md:text-3xl mb-1" />
                        <div className="text-xs md:text-sm font-bold text-gray-900">
                          {isVisible ? cert.percentage : 0}%
                        </div>
                      </div>
                    </div>

                    <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 text-gray-900">{cert.title}</h3>
                    <p className="text-gray-700 mb-2 md:mb-4 text-xs md:text-sm leading-relaxed">
                      {cert.description}
                    </p>
                    <div className="text-xs text-gray-600 bg-primary-50 px-2 md:px-4 py-1 md:py-2 rounded-full">
                      <strong>{t('assurance.scope')}</strong> {cert.scope}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <QualityControlSection />

      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center px-4 md:px-0">
          <h2 className="heading-2 text-white mb-4 md:mb-6 text-lg md:text-3xl lg:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="text-sm md:text-xl text-primary-100 mb-6 md:mb-8 max-w-3xl mx-auto">
            {t('cta.description')}
          </p>
          <Link href={`/${locale}/contact/`} className="btn-secondary inline-block bg-white text-primary-600 border-white hover:bg-primary-50 text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
            {tCommon('contactUs')}
          </Link>
        </div>
      </section>
    </div>
  )
}

function QualityControlSection() {
  const t = useTranslations('certificates.qualityControl')
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = parseInt(entry.target.getAttribute('data-step-id') || '0')
            setVisibleSteps((prev) => {
              if (!prev.includes(stepId)) {
                return [...prev, stepId]
              }
              return prev
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      const stepElements = sectionRef.current.querySelectorAll('[data-step-id]')
      stepElements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    { id: 1, icon: '🔍', title: t('steps.raw.title'), desc: t('steps.raw.description'), color: 'primary', align: 'right' },
    { id: 2, icon: '⚙️', title: t('steps.production.title'), desc: t('steps.production.description'), color: 'primary', align: 'left' },
    { id: 3, icon: '🧪', title: t('steps.lab.title'), desc: t('steps.lab.description'), color: 'gold', align: 'right' },
    { id: 4, icon: '📦', title: t('steps.packaging.title'), desc: t('steps.packaging.description'), color: 'gold', align: 'left' },
    { id: 5, icon: '✅', title: t('steps.final.title'), desc: t('steps.final.description'), color: 'gold-final', align: 'right' },
  ]

  const getColorClasses = (color: string) => {
    if (color === 'primary') return 'from-primary-600 to-primary-700'
    if (color === 'gold') return 'from-primary-600 to-gold-600'
    return 'from-gold-500 to-yellow-500'
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTQwYWYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE0aDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10">
        <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
          <div className="inline-block mb-3 md:mb-4 px-4 md:px-6 py-1.5 md:py-2 bg-primary-600 text-white rounded-full text-xs md:text-sm font-bold">
            {t('badge')}
          </div>
          <h2 className="heading-2 mb-3 md:mb-4 text-primary-600 text-lg md:text-3xl lg:text-4xl">{t('title')}</h2>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-600 via-primary-500 to-gold-500"></div>
            
            <div className="space-y-6 md:space-y-12">
              {steps.map((step) => {
                const isVisible = visibleSteps.includes(step.id)
                return (
                  <div key={step.id} data-step-id={step.id} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    {/* Mobile: Show number badge on top */}
                    <div className="flex md:hidden justify-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(step.color)} text-white rounded-full flex items-center justify-center font-bold text-xl shadow-xl relative z-10 transition-all duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                        {step.id}
                      </div>
                    </div>
                    {step.align === 'right' ? (
                      <>
                        <div className={`md:text-right transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="flex md:justify-end items-center mb-3 md:mb-4">
                              <span className="text-2xl md:text-4xl mr-2 md:mr-3">{step.icon}</span>
                              <h3 className={`text-lg md:text-2xl font-bold ${step.color === 'gold-final' ? 'text-gold-600' : 'text-primary-600'}`}>{step.title}</h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                        <div className="hidden md:flex justify-center">
                          <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(step.color)} text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-xl relative z-10 transition-all duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                            {step.id}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:flex justify-center">
                          <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(step.color)} text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-xl relative z-10 transition-all duration-700 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}`}>
                            {step.id}
                          </div>
                        </div>
                        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="flex items-center mb-3 md:mb-4">
                              <span className="text-2xl md:text-4xl mr-2 md:mr-3">{step.icon}</span>
                              <h3 className={`text-lg md:text-2xl font-bold ${step.color === 'gold-final' ? 'text-gold-600' : 'text-primary-600'}`}>{step.title}</h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

