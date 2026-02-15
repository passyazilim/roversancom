'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaWhatsapp, FaGlobe } from 'react-icons/fa'

export default function ContactPage() {
  const t = useTranslations('contact')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: '',
    referral: [] as string[],
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error' | 'sending'>('idle')

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
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus('error')
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
      return
    }

    setFormStatus('sending')

    const referralText = formData.referral.length > 0 
      ? formData.referral.join(', ') 
      : '-'

    // PHP backend endpoint - PHPMailer kullanıyor (daha güvenilir)
    // Static export'ta PHP dosyası root'ta olmalı
    const phpEndpoint = typeof window !== 'undefined' 
      ? `${window.location.origin}/api/contact-phpmailer.php`
      : '/api/contact-phpmailer.php'

    // PHP backend ile gönder
    let responseReceived = false
    
    try {
      console.log('Sending request to:', phpEndpoint)
      
      // Fetch without AbortController initially - browser extension'lar sorun çıkarabilir
      const fetchPromise = fetch(phpEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          country: formData.country || '',
          subject: formData.subject || t('form.subjects.select'),
          referral: formData.referral.length > 0 ? formData.referral : [],
          message: formData.message,
        }),
        // CORS mode
        mode: 'cors',
        credentials: 'omit',
      })

      // Timeout için promise race
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          if (!responseReceived) {
            reject(new Error('Request timeout'))
          }
        }, 15000) // 15 saniye timeout
      })

      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response
      responseReceived = true

      console.log('Response received:', response.status, response.statusText)

      // Response body'yi oku
      let result
      try {
        const text = await response.text()
        console.log('Response text:', text.substring(0, 200))
        result = JSON.parse(text)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        throw new Error('Invalid response from server')
      }

      if (response.ok && (result.message || result.status === 'success')) {
        console.log('Email sent successfully')
        setFormStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          subject: '',
          message: '',
          referral: [],
        })

        setTimeout(() => {
          setFormStatus('idle')
        }, 5000)
      } else {
        console.error('Form submission failed:', result)
        throw new Error(result.error || 'Form submission failed')
      }
    } catch (error: any) {
      responseReceived = true
      console.error('PHP Backend Error:', error)
      console.error('Error name:', error?.name)
      console.error('Error message:', error?.message)
      
      // Hata türüne göre mesaj
      if (error?.name === 'AbortError' || error?.message === 'Request timeout') {
        console.error('Request timeout - PHP endpoint yanıt vermiyor')
      } else if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError') || error?.message?.includes('Network request failed')) {
        console.error('Network error - PHP endpoint bulunamıyor')
        console.error('Endpoint URL:', phpEndpoint)
      } else if (error?.message?.includes('port closed')) {
        console.error('Message port closed - Bu genellikle browser extension hatasıdır')
      }
      
      // Her durumda mailto fallback
      console.log('Falling back to mailto link...')
      fallbackToMailto()
    }
  }

  const fallbackToMailto = () => {
    const subject = encodeURIComponent(formData.subject || t('form.subjects.select'))
    const referralText = formData.referral.length > 0 
      ? formData.referral.join(', ') 
      : '-'
    
    const emailBody = encodeURIComponent(`
${t('form.name')}: ${formData.name}
${t('form.email')}: ${formData.email}
${t('form.phone')}: ${formData.phone || '-'}
${t('form.country')}: ${formData.country || '-'}
${t('form.subject')}: ${formData.subject || '-'}

${t('referral.title')}: ${referralText}

${t('form.message')}:
${formData.message}
    `.trim())
    
    const mailtoLink = `mailto:info@roversan.com?subject=${subject}&body=${emailBody}`
    
    // Mailto link'i aç
    window.location.href = mailtoLink
    
    // Başarı mesajı göster
    setFormStatus('success')
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      subject: '',
      message: '',
      referral: [],
    })
    
    setTimeout(() => {
      setFormStatus('idle')
    }, 5000)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/iletisim.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-gold-900/90"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gold-400 rounded-full mix-blend-overlay filter blur-3xl opacity-15 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-400 rounded-full mix-blend-overlay filter blur-3xl opacity-15 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="relative z-10 container-custom text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">{tCommon('contact')}</h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-lg">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Ana İçerik - Yaratıcı Layout */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          {/* Üst Kartlar - İletişim Kanalları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Telefon Kartı */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-300 group">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                <FaPhoneAlt className="text-2xl text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('info.phoneFax')}</h3>
              <a href="tel:+904143166369" className="text-gray-600 hover:text-primary-600 transition-colors block">
                {t('info.phoneNumber')}
              </a>
            </div>

            {/* WhatsApp Kartı */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-300 group">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                <FaWhatsapp className="text-2xl text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('info.whatsapp')}</h3>
              <a 
                href={`https://wa.me/905427213229?text=${encodeURIComponent(t('info.whatsappMessage', {defaultValue: 'Merhaba, Roversan Gıda hakkında bilgi almak istiyorum.'}))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors block"
              >
                {t('info.whatsappNumber')}
              </a>
              <p className="text-xs text-gray-500 mt-1">{t('info.whatsappAvailable', {defaultValue: '7/24 Mesaj Gönderin'})}</p>
            </div>

            {/* E-posta Kartı */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-300 group">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <FaEnvelope className="text-2xl text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('info.email')}</h3>
              <a href="mailto:info@roversan.com" className="text-gray-600 hover:text-blue-600 transition-colors block text-sm">
                {t('info.emailDetail')}
              </a>
            </div>

            {/* Adres Kartı */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-300 group">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <FaMapMarkerAlt className="text-2xl text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('info.address')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('info.addressDetail')}
              </p>
            </div>
          </div>

          {/* İki Kolonlu Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sol Taraf - Detaylı İletişim Bilgileri */}
            <div className="space-y-8">
              {/* Çalışma Saatleri */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4">
                    <FaClock className="text-xl text-gold-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t('info.hours')}</h2>
                </div>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {t('info.hoursDetail')}
                </div>
              </div>

              {/* Hızlı İletişim Butonları */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">{t('info.quickContact.title')}</h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  {t('info.quickContact.description')}
                </p>
                <div className="space-y-4">
                  <a 
                    href="tel:+904143166369" 
                    className="bg-white text-primary-600 font-semibold py-4 px-6 rounded-xl transition-all duration-200 block text-center hover:bg-gray-100 hover:scale-105 flex items-center justify-center shadow-lg"
                  >
                    <FaPhoneAlt className="mr-3" />
                    {t('info.quickContact.call')}
                  </a>
                  <a 
                    href={`https://wa.me/905427213229?text=${encodeURIComponent(t('info.whatsappMessage', {defaultValue: 'Merhaba, Roversan Gıda hakkında bilgi almak istiyorum.'}))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 block text-center hover:scale-105 flex items-center justify-center shadow-lg"
                  >
                    <FaWhatsapp className="mr-3 text-xl" />
                    {t('info.quickContact.whatsapp')}
                  </a>
                </div>
              </div>

            </div>

            {/* Sağ Taraf - İletişim Formu */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-200">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <FaPaperPlane className="text-xl text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t('form.title')}</h2>
                </div>
                <p className="text-gray-600">{t('map.formDescription')}</p>
              </div>
              
              {formStatus === 'sending' && (
                <div className="mb-6 bg-blue-50 border-2 border-blue-200 text-blue-800 px-5 py-4 rounded-xl">
                  <p className="font-semibold">{t('form.sending')}</p>
                  <p className="text-sm mt-1">Mesajınız gönderiliyor, lütfen bekleyin...</p>
                </div>
              )}

              {formStatus === 'success' && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-800 px-5 py-4 rounded-xl">
                  <p className="font-semibold">{t('form.success')}</p>
                  <p className="text-sm mt-1">{t('form.willReply')}</p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-800 px-5 py-4 rounded-xl">
                  <p className="font-semibold">{t('form.error')}</p>
                  <p className="text-sm mt-1">{t('form.errorMessage')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Ad Soyad */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    placeholder={t('form.namePlaceholder')}
                  />
                </div>

                {/* E-posta ve Telefon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                </div>

                {/* Ülke ve Konu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.country')}
                    </label>
                    <div className="relative">
                      <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all appearance-none bg-white"
                      >
                        <option value="">{t('form.countryPlaceholder')}</option>
                        <option value="TR">Türkiye</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="CH">Switzerland</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="EG">Egypt</option>
                        <option value="IQ">Iraq</option>
                        <option value="IR">Iran</option>
                        <option value="PK">Pakistan</option>
                        <option value="IN">India</option>
                        <option value="CN">China</option>
                        <option value="JP">Japan</option>
                        <option value="OTHER">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('form.subject')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all appearance-none bg-white"
                    >
                      <option value="">{t('form.subjects.select')}</option>
                      <option value="genel">{t('form.subjects.general')}</option>
                      <option value="urun">{t('form.subjects.product')}</option>
                      <option value="ihracat">{t('form.subjects.export')}</option>
                      <option value="fiyat">{t('form.subjects.price')}</option>
                      <option value="diger">{t('form.subjects.other')}</option>
                    </select>
                  </div>
                </div>

                {/* Mesaj */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  ></textarea>
                </div>

                {/* Referral */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {t('referral.title')}
                    <span className="text-gray-500 font-normal ml-2 text-xs">({t('referral.subtitle')})</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      t('referral.website'),
                      t('referral.search'),
                      t('referral.social'),
                      t('referral.fairs'),
                      t('referral.recommendation'),
                      t('referral.industry'),
                      t('referral.other'),
                    ].map((option) => (
                      <label
                        key={option}
                        htmlFor={`referral-${option.replace(/\s+/g, '-').toLowerCase()}`}
                        className="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`referral-${option.replace(/\s+/g, '-').toLowerCase()}`}
                          name="referral"
                          value={option}
                          checked={formData.referral.includes(option)}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-200 cursor-pointer"
                        />
                        <span className="ml-3 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gönder Butonu */}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                >
                  <FaPaperPlane className="mr-3" />
                  <span>
                    {formStatus === 'idle' ? t('form.send') : 
                     formStatus === 'sending' ? t('form.sending') : 
                     formStatus === 'success' ? t('form.send') : 
                     t('form.send')}
                  </span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  <span className="text-red-500">*</span>{t('map.requiredFields')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Modern Harita Bölümü */}
      <section className="section-padding bg-gradient-to-b from-white via-primary-50/30 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gold-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-200 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-4xl text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent">
              {t('map.visitTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('map.visitDescription')}
            </p>
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-4 shadow-xl border-2 border-primary-200 hover:border-primary-400 transition-all duration-300 hover:shadow-2xl">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-primary-700 font-bold text-lg">
                {t('info.addressDetail')}
              </p>
            </div>
          </div>
          
          {/* Ultra Modern Harita Container */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-gold-400 to-primary-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-transparent">
              {/* Premium Header Bar */}
              <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-gold-600 p-6 relative overflow-hidden">
                {/* Animated Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTRoMnYyaC0yem0wIDBoMnYyaC0yem0wIDBoMnYyaC0yem0wIDBoMnYyaC0yIi8+PC9nPjwvZz48L3N2Zz4=')] animate-pulse"></div>
                </div>
                <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                      <FaMapMarkerAlt className="text-3xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{t('map.locationTitle')}</h3>
                      <p className="text-white/90 text-sm">{t('map.facilityName')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.google.com/maps/search/ROVERSAN+Şanlıurfa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/30 hover:border-white/50 hover:scale-105 shadow-lg"
                    >
                      <span>{t('cta.googleMaps')}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Google Maps Embed */}
              <div className="relative group/map w-full" style={{ height: '650px' }}>
                <iframe
                  src="https://www.google.com/maps?q=ROVERSAN+Şanlıurfa&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Roversan Gıda - ${t('info.addressDetail')}`}
                  className="absolute inset-0 w-full h-full"
                ></iframe>
                
                {/* Premium Overlay Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/5 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent"></div>
                </div>

                {/* Location Marker - Fixed to center, smaller size */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 group/marker" style={{ transform: 'translate(-50%, -50%)' }}>
                  {/* Marker Pin - Smaller */}
                  <div className="relative cursor-pointer pointer-events-auto">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <FaMapMarkerAlt className="text-white text-sm" />
                    </div>
                    {/* Pulsing Ring Effect */}
                    <div className="absolute inset-0 w-10 h-10 bg-primary-600 rounded-full animate-ping opacity-30"></div>
                  </div>
                  
                  {/* Factory Image on Hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 opacity-0 invisible group-hover/marker:opacity-100 group-hover/marker:visible transition-all duration-200 z-30 pointer-events-auto">
                    <a
                      href="https://www.google.com/maps/search/ROVERSAN+Şanlıurfa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-200">
                        <div className="relative w-full h-48">
                          <Image 
                            src="/images/fabrikafoto/fabrika-foto.jpeg"
                            alt="Roversan Gıda Fabrikası"
                            fill
                            className="object-cover"
                            quality={90}
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=ROVERSAN+Şanlıurfa"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
                    <span className="text-lg">{t('map.getDirections')}</span>
            </a>
            <a
              href="tel:+904143166369"
              className="group inline-flex items-center gap-3 bg-white border-2 border-primary-300 hover:border-primary-500 text-primary-700 hover:text-primary-800 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <FaPhoneAlt className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="text-lg">{t('map.callNow')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/products/`} className="bg-white text-primary-600 border-2 border-white hover:bg-primary-50 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              {t('cta.productCatalog')}
            </Link>
            <Link href={`/${locale}/certificates/`} className="bg-white/20 backdrop-blur-md border-2 border-white/60 text-white hover:bg-white/30 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              {tCommon('quality')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}