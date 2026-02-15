'use client'

import Image from 'next/image'
import { FaRocket, FaLightbulb, FaStar, FaHeart, FaLeaf, FaGem, FaShieldAlt, FaHandshake, FaGlobeAmericas, FaChartLine } from 'react-icons/fa'

export default function AboutPage() {
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
              Kalite ve Güvenin
              <br />
              <span className="text-gold-400">Lezzet Adresi</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              20 yılı aşkın deneyimimizle gıda sektöründe güvenilir ve yenilikçi çözümler üretiyoruz
            </p>

            {/* Simple Stats - Symmetric */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: '50+', label: 'Ürün Çeşidi' },
                { number: '50+', label: 'İhracat Ülkesi' },
                { number: '100%', label: 'Kalite Garantisi' },
                { number: '20+', label: 'Yıllık Tecrübe' },
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
            <div className="relative">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                src="/images/background/giris-background/assorted-juices-with-milkshake-fruits.jpg"
                  alt="Roversan Gıda"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Badge - Positioned Better */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaGem className="text-white text-3xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">ISO Sertifikalı</div>
                    <div className="text-gray-600 font-semibold">Uluslararası Kalite</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="lg:pl-8">
              <div className="inline-block mb-6 px-6 py-2.5 bg-primary-100 text-primary-700 rounded-full text-sm font-bold shadow-sm">
                FİRMAMIZ
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 leading-tight">
                Roversan Gıda
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-semibold text-gray-900">
                  Şanlıurfa GAP Gıda İmalatçılar Sitesi'nde modern tesisimizde, 
                  toz içecek ve kahve üretiminde uzmanlaşmış lider bir firmayız.
                </p>
                <p>
                  <strong className="text-primary-600">Frutti</strong>, 
                  <strong className="text-primary-600"> Keita</strong> ve 
                  <strong className="text-primary-600"> Shirino</strong> markaları 
                  altında ürettiğimiz toz içecekler ile <strong className="text-gold-600">Brawoo</strong> ve 
                  <strong className="text-gold-600"> Frutti</strong> kahve ürünlerimiz, 
                  yurt içi ve yurt dışı pazarlarda tercih edilmektedir.
                </p>
                <p>
                  Modern tesisimizde <span className="font-semibold text-primary-600">uluslararası kalite standartlarına</span> tam 
                  uyum sağlayarak üretim yapmaktayız.
                </p>
              </div>

              {/* Trust Indicators - Symmetric Grid */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="flex items-center gap-4 bg-primary-50 p-5 rounded-2xl border border-primary-100 shadow-sm">
                  <FaShieldAlt className="text-primary-600 text-2xl flex-shrink-0" />
                  <span className="font-bold text-gray-900">Güvenilir Üretim</span>
                </div>
                <div className="flex items-center gap-4 bg-gold-50 p-5 rounded-2xl border border-gold-100 shadow-sm">
                  <FaGem className="text-gold-600 text-2xl flex-shrink-0" />
                  <span className="font-bold text-gray-900">Tam Sertifikalı</span>
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
              VİZYON & MİSYON
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Hedeflerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Geleceğe dönük stratejilerimiz ve temel değerlerimiz
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {/* Mission */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-10 lg:p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-lg">
                <FaRocket className="text-white text-2xl md:text-4xl" />
              </div>
              <h3 className="text-lg md:text-3xl lg:text-4xl font-black mb-3 md:mb-6 text-gray-900">Misyonumuz</h3>
              <div className="space-y-2 md:space-y-5 text-xs md:text-lg text-gray-700 leading-relaxed">
                <p>
                  En yüksek kalite standartlarında toz içecek ve kahve ürünleri üreterek,
                  müşterilerimize lezzetli ve güvenilir ürünler sunmak.
                </p>
                <p>
                  Yenilikçi ürünlerimiz ve kaliteli hizmetimizle müşteri memnuniyetini en üst
                  seviyede tutarak, sektörde öncü bir marka olmak.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-10 lg:p-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-lg">
                <FaLightbulb className="text-white text-2xl md:text-4xl" />
              </div>
              <h3 className="text-lg md:text-3xl lg:text-4xl font-black mb-3 md:mb-6 text-gray-900">Vizyonumuz</h3>
              <div className="space-y-2 md:space-y-5 text-xs md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Türkiye ve dünya pazarlarında gıda sektörünün lider markası olmak
                  ve sürdürülebilir büyüme ile sektöre değer katmak.
                </p>
                <p>
                  İnovasyon ve kalite odaklı üretimimizle global bir oyuncu olarak
                  her geçen gün büyüyerek müşterilerimize en iyi hizmeti sunmak.
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
              TEMEL DEĞERLERİMİZ
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Bizi Farklı Kılan Değerler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              İş yapış şeklimizi belirleyen ve bizi öne çıkaran prensipler
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
            {[
              { icon: FaShieldAlt, title: 'Kalite', desc: 'En yüksek standartlarda üretim', color: 'from-primary-600 to-primary-700' },
              { icon: FaHandshake, title: 'Güven', desc: 'Müşterilerimizle güvene dayalı ilişkiler', color: 'from-gold-600 to-yellow-600' },
              { icon: FaChartLine, title: 'Yenilikçilik', desc: 'Sürekli gelişim ve Ar-Ge', color: 'from-primary-600 to-gold-600' },
              { icon: FaGlobeAmericas, title: 'Global Vizyon', desc: 'Dünya pazarlarında büyüme', color: 'from-gold-600 to-yellow-700' },
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
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-gold-600 text-white py-20">
        <div className="container-custom text-center max-w-5xl">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FaHandshake className="text-5xl text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ürünlerimiz ve hizmetlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact" 
              className="px-10 py-5 bg-white text-primary-600 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              İletişime Geç
            </a>
            <a 
              href="/products" 
              className="px-10 py-5 bg-white/30 backdrop-blur-md border-2 border-white/60 text-white rounded-xl font-bold text-lg hover:bg-white/40 transition-all duration-300 shadow-lg"
            >
              Ürünlerimizi Görün
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
