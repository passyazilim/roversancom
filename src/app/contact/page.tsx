'use client'

import { useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    referral: [] as string[],
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (checkbox.checked) {
        setFormData({
          ...formData,
          [name]: [...(formData[name as keyof typeof formData] as string[]), value],
        })
      } else {
        setFormData({
          ...formData,
          [name]: (formData[name as keyof typeof formData] as string[]).filter((item) => item !== value),
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form gönderme simülasyonu
    setTimeout(() => {
      setFormStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        referral: [],
      })
      
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    }, 1000)
  }

  return (
    <>
      {/* Hero Section - Modernized */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/iletisim.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-gold-900/85"></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="relative z-10 container-custom text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full">
            <span className="text-gold-400 font-bold">📞 BİZE ULAŞIN</span>
          </div>
          <h1 className="heading-1 text-white mb-4 drop-shadow-2xl">İletişim</h1>
          <p className="text-xl text-white/95 max-w-2xl mx-auto drop-shadow-lg">
            Sorularınız ve talepleriniz için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* İletişim Bilgileri & Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sol Taraf - İletişim Bilgileri */}
            <div className="lg:col-span-1">
              <h2 className="heading-3 mb-6">İletişim Bilgilerimiz</h2>
              
              {/* Adres */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Adres</h3>
                    <p className="text-gray-700">
                      Kadıkendi Mah. 8502. Cad. No: 12<br />
                      Eyyübiye / Şanlıurfa / Türkiye
                    </p>
                  </div>
                </div>
              </div>

              {/* Telefon */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Telefon & Faks</h3>
                    <a href="tel:+904143166369" className="text-gray-700 hover:text-primary-600 transition-colors block mb-2">
                      Tel: +90 414 316 63 69
                    </a>
                    <span className="text-gray-700 text-sm">
                      Faks: +90 542 721 32 29
                    </span>
                  </div>
                </div>
              </div>

              {/* E-posta */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">E-posta</h3>
                    <a href="mailto:info@roversan.com" className="text-gray-700 hover:text-primary-600 transition-colors">
                      info@roversan.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="mb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Çalışma Saatleri</h3>
                    <p className="text-gray-700">
                      Pazartesi - Cuma: 08:00 - 18:00<br />
                      Cumartesi: 09:00 - 14:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>

              {/* Hızlı Bilgi */}
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Hızlı İletişim</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Acil durumlar ve hızlı teklif talepleriniz için doğrudan telefonla iletişime
                  geçebilirsiniz.
                </p>
                <a href="tel:+904143166369" className="btn-primary block text-center">
                  Hemen Ara
                </a>
              </div>
            </div>

            {/* Sağ Taraf - İletişim Formu */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-primary-50 to-gold-50 rounded-2xl shadow-xl p-8 lg:p-12">
                <h2 className="heading-3 mb-6">Bize Mesaj Gönderin</h2>
                
                {formStatus === 'success' && (
                  <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    Bir hata oluştu. Lütfen tekrar deneyin veya telefon ile iletişime geçin.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Ad Soyad */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                      placeholder="Adınız ve Soyadınız"
                    />
                  </div>

                  {/* E-posta ve Telefon */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                  </div>

                  {/* Konu */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    >
                      <option value="">Konu Seçiniz</option>
                      <option value="genel">Genel Bilgi</option>
                      <option value="urun">Ürün Bilgisi</option>
                      <option value="ihracat">İhracat Talebi</option>
                      <option value="fiyat">Fiyat Teklifi</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  {/* Mesaj */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  {/* Roversan'ı Nereden Duydunuz? */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Roversan'ı Nereden Duydunuz? <span className="text-gray-400 font-normal">(Birden fazla seçenek işaretleyebilirsiniz)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'İnternet / Web Sitesi',
                        'Google Arama',
                        'Sosyal Medya',
                        'Fuarlar / Etkinlikler',
                        'Tavsiye / Referans',
                        'Sektör İçinde',
                        'Diğer',
                      ].map((option) => (
                        <label
                          key={option}
                          htmlFor={`referral-${option.replace(/\s+/g, '-').toLowerCase()}`}
                          className="flex items-center p-3 rounded-lg border border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            id={`referral-${option.replace(/\s+/g, '-').toLowerCase()}`}
                            name="referral"
                            value={option}
                            checked={formData.referral.includes(option)}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-200 cursor-pointer group-hover:border-primary-500 transition-colors"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-primary-600 transition-colors">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Gönder Butonu */}
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <FaPaperPlane />
                    <span>Mesajı Gönder</span>
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    * ile işaretli alanlar zorunludur
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harita */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container-custom">
          <h2 className="heading-2 text-center mb-12">Bizi Ziyaret Edin</h2>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.8!2d38.7936!3d37.1591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA5JzMzLjAiTiAzOMKwNDcnMzcuMCJF!5e0!3m2!1sen!2str!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Roversan Gıda Konumu"
            ></iframe>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://goo.gl/maps/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-block"
            >
              Google Maps'te Aç
            </a>
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white mb-6">
            Daha Fazla Bilgi mi İstiyorsunuz?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Ürünlerimiz, hizmetlerimiz ve iş birliği fırsatları hakkında detaylı bilgi için
            kataloglarımıza göz atın.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="btn-secondary bg-white text-primary-600 border-white hover:bg-primary-50">
                Ürün Kataloğu
              </a>
              <a href="/certificates" className="px-8 py-4 bg-white/30 backdrop-blur-md border-2 border-white/60 text-white rounded-xl font-semibold hover:bg-white/40 transition-all shadow-lg">
                Kalite & Sertifikalar
              </a>
            </div>
        </div>
      </section>
    </>
  )
}

