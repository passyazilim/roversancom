'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { FaRocket, FaLightbulb, FaStar, FaHeart, FaLeaf, FaGem, FaShieldAlt, FaHandshake, FaGlobeAmericas, FaChartLine } from 'react-icons/fa'

export default function AboutPage() {
  const t = useTranslations('about')
  const tCommon = useTranslations('common')
  const tContact = useTranslations('contact')
  const locale = useLocale()

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
    <div className="bg-white">
      {/* Professional Hero */}
      <section className="relative pt-40 pb-24 flex items-center justify-center overflow-hidden min-h-[70vh]">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/giris-background/assorted-juices-with-milkshake-fruits.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-gold-900/95"></div>
        </div>

        <div className="relative z-10 container-custom text-center">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight text-center mx-auto">
              {t('hero.title')}
              <br />
              <span className="text-gold-400">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Simple Stats - Symmetric */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: '50+', label: t('stats.productVariety') },
                { number: '50+', label: t('stats.exportCountries') },
                { number: '100%', label: t('stats.qualityGuarantee') },
                { number: '20+', label: t('stats.yearsExperience') },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <div className="text-4xl md:text-5xl font-black text-gold-400 mb-3">{stat.number}</div>
                  <div className="text-white/90 text-sm md:text-base font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story - Symmetric */}
      <section className="section-padding bg-white py-20">
        <div className="container-custom max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative group max-w-[500px] w-full h-[400px] md:h-[500px]">
                {/* Multi-layer Glow Effects */}
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-gold-400/40 via-primary-400/40 to-gold-400/40 rounded-3xl blur-3xl group-hover:blur-[40px] transition-all duration-700 animate-pulse"></div>
                <div className="absolute -inset-8 md:-inset-10 bg-gradient-to-r from-primary-500/20 via-gold-500/20 to-primary-500/20 rounded-3xl blur-[60px] group-hover:blur-[80px] transition-all duration-1000"></div>
                <div className="absolute -inset-12 md:-inset-14 bg-gradient-to-r from-white/10 via-primary-300/10 to-white/10 rounded-3xl blur-[80px] opacity-50"></div>
                
                {/* Floating Particles Effect */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-gold-400/30 rounded-full blur-2xl animate-float"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary-400/30 rounded-full blur-2xl animate-float" style={{animationDelay: '1.5s'}}></div>
                
                {/* Image without Frame */}
                <div className="relative z-10 w-full h-full rounded-3xl md:rounded-[2rem] overflow-hidden">
                  <Image 
                    src="/images/fabrikafoto/fabrika-foto.jpeg"
                    alt={t('company.title')}
                    fill
                    className="object-cover shadow-[0_20px_60px_rgba(0,0,0,0.3)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] transform scale-100 group-hover:scale-[1.05] transition-all duration-700 ease-out"
                    quality={95}
                    priority
                    unoptimized={false}
                  />
                </div>
                
                {/* Badge - Positioned Better */}
                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-100 z-20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-600 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaGem className="text-white text-2xl md:text-3xl" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black text-gray-900">{t('company.isoCertified')}</div>
                      <div className="text-gray-600 font-semibold text-sm md:text-base">{t('company.internationalQuality')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="lg:pl-8">
              <div className="inline-block mb-6 px-6 py-2.5 bg-primary-100 text-primary-700 rounded-full text-sm font-bold shadow-sm">
                {t('company.badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 leading-tight">
                {t('company.title')}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-semibold text-gray-900">
                  {t('company.description1')}
                </p>
                <p>
                  {t('company.description2').split('Frutti').map((part, idx, arr) => (
                    idx === 0 ? <span key={`part-${idx}`}>{part}</span> : (
                      <span key={`part-${idx}`}>
                        <strong className="text-primary-600">Frutti</strong>
                        {part.split('Keita').map((p2, i2, arr2) => (
                          i2 === 0 ? <span key={`p2-${i2}`}>{p2}</span> : (
                            <span key={`p2-${i2}`}>
                              <strong className="text-primary-600"> Keita</strong>
                              {p2.split('Shirino').map((p3, i3, arr3) => (
                                i3 === 0 ? <span key={`p3-${i3}`}>{p3}</span> : (
                                  <span key={`p3-${i3}`}>
                                    <strong className="text-primary-600"> Shirino</strong>
                                    {p3.split('Brawoo').map((p4, i4, arr4) => (
                                      i4 === 0 ? <span key={`p4-${i4}`}>{p4}</span> : (
                                        <span key={`p4-${i4}`}>
                                          <strong className="text-gold-600">Brawoo</strong>
                                          {p4.split('Frutti').map((p5, i5, arr5) => (
                                            i5 === 0 ? <span key={`p5-${i5}`}>{p5}</span> : (
                                              <span key={`p5-${i5}`}>
                                                <strong className="text-gold-600"> Frutti</strong>
                                                {p5}
                                              </span>
                                            )
                                          ))}
                                        </span>
                                      )
                                    ))}
                                  </span>
                                )
                              ))}
                            </span>
                          )
                        ))}
                      </span>
                    )
                  ))}
                </p>
                <p>
                  {t('company.description3').split('uluslararası kalite standartlarına').map((part, idx) => (
                    idx === 0 ? <span key={`desc3-${idx}`}>{part}</span> : (
                      <span key={`desc3-${idx}`}>
                        <span className="font-semibold text-primary-600">uluslararası kalite standartlarına</span>
                        {part}
                      </span>
                    )
                  ))}
                </p>
              </div>

              {/* Trust Indicators - Symmetric Grid */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-4 bg-primary-50 p-5 rounded-2xl border border-primary-100 shadow-sm">
                  <FaShieldAlt className="text-primary-600 text-2xl flex-shrink-0" />
                  <span className="font-bold text-gray-900">{t('company.trustProduction')}</span>
                </div>
                <div className="flex items-center gap-4 bg-gold-50 p-5 rounded-2xl border border-gold-100 shadow-sm">
                  <FaGem className="text-gold-600 text-2xl flex-shrink-0" />
                  <span className="font-bold text-gray-900">{t('company.fullyCertified')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Professional & Symmetric */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-gold-600 text-white rounded-full text-sm font-bold shadow-lg">
              {t('missionVision.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {t('missionVision.goals.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('missionVision.goals.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* Mission */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-10 lg:p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-lg">
                <FaRocket className="text-white text-2xl md:text-4xl" />
              </div>
              <h3 className="text-lg md:text-3xl lg:text-4xl font-black mb-3 md:mb-6 text-gray-900">{t('mission.title')}</h3>
              <div className="space-y-2 md:space-y-5 text-xs md:text-lg text-gray-700 leading-relaxed">
                <p>
                  {t('missionVision.mission.description1')}
                </p>
                <p>
                  {t('missionVision.mission.description2')}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-10 lg:p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-lg">
                <FaLightbulb className="text-white text-2xl md:text-4xl" />
              </div>
              <h3 className="text-lg md:text-3xl lg:text-4xl font-black mb-3 md:mb-6 text-gray-900">{t('vision.title')}</h3>
              <div className="space-y-2 md:space-y-5 text-xs md:text-lg text-gray-700 leading-relaxed">
                <p>
                  {t('missionVision.vision.description1')}
                </p>
                <p>
                  {t('missionVision.vision.description2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Clean Grid - Symmetric */}
      <section className="section-padding bg-white py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2.5 bg-primary-600 text-white rounded-full text-sm font-bold shadow-lg">
              {t('values.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {t('values.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
            {[
              { icon: FaShieldAlt, title: t('values.items.quality.title'), desc: t('values.items.quality.description'), color: 'from-primary-600 to-primary-700' },
              { icon: FaHandshake, title: t('values.items.trust.title'), desc: t('values.items.trust.description'), color: 'from-gold-600 to-yellow-600' },
              { icon: FaChartLine, title: t('values.items.innovation.title'), desc: t('values.items.innovation.description'), color: 'from-primary-600 to-gold-600' },
              { icon: FaGlobeAmericas, title: t('values.items.global.title'), desc: t('values.items.global.description'), color: 'from-gold-600 to-yellow-700' },
            ].map((value, i) => (
              <div 
                key={i}
                className="group text-center"
              >
                <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <div className={`w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br ${value.color} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="text-white text-xl md:text-4xl" />
                  </div>
                  <h3 className="text-sm md:text-2xl font-black mb-2 md:mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow text-xs md:text-base">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Professional & Centered */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-gold-600 text-white py-12 md:py-20">
        <div className="container-custom text-center max-w-5xl px-4 md:px-0">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8">
            <FaHandshake className="text-3xl md:text-5xl text-white" />
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-8 leading-tight px-4 md:px-0">
            {tCommon('contactUs')}
          </h2>
          <p className="text-sm md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 md:px-0">
            {tContact('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 md:px-0">
            <Link 
              href={`/${locale}/contact/`} 
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-5 bg-white text-primary-600 rounded-xl font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-center"
            >
              {tCommon('contactUs')}
            </Link>
            <Link 
              href={`/${locale}/products/`} 
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-5 bg-white/30 backdrop-blur-md border-2 border-white/60 text-white rounded-xl font-bold text-base md:text-lg hover:bg-white/40 transition-all duration-300 shadow-lg text-center"
            >
              {tCommon('viewCatalog')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
