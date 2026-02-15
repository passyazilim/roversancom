'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'

export default function CookieBanner() {
  const t = useTranslations('privacy.cookieBanner')
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
    // Enable analytics scripts
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookieConsentAccepted'))
    }
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
    // Disable analytics scripts
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookieConsentRejected'))
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary-500 shadow-2xl p-4 md:p-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('title')}</h3>
            <p className="text-gray-700 text-sm md:text-base">
              {t('message')}{' '}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                {t('learnMore')}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {t('reject')}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-gold-600 hover:from-primary-700 hover:to-gold-700 rounded-lg transition-all shadow-lg"
            >
              {t('accept')}
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Kapat"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

