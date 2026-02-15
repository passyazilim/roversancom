'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function Analytics() {
  useEffect(() => {
    const handleCookieConsent = () => {
      const consent = localStorage.getItem('cookieConsent')
      if (consent === 'accepted') {
        // Enable analytics when consent is given
        if (typeof window !== 'undefined') {
          // Google Analytics will be initialized via Script component
          // Meta Pixel will be initialized via Script component
        }
      }
    }

    // Check initial consent
    handleCookieConsent()

    // Listen for consent changes
    window.addEventListener('cookieConsentAccepted', handleCookieConsent)
    window.addEventListener('cookieConsentRejected', () => {
      // Disable analytics if rejected
      if (typeof window !== 'undefined' && (window as any).gtag) {
        // Disable Google Analytics
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied'
        })
      }
    })

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleCookieConsent)
      window.removeEventListener('cookieConsentRejected', handleCookieConsent)
    }
  }, [])

  const hasConsent = () => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('cookieConsent') === 'accepted'
  }

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KN2ZFYD0W3"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KN2ZFYD0W3');
          `,
        }}
      />

      {/* Meta Pixel Code - Backup via Script component */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1548085519661899');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1548085519661899&ev=PageView&noscript=1"
          alt=""
          loading="lazy"
          fetchPriority="low"
        />
      </noscript>
      {/* End Meta Pixel Code */}
    </>
  )
}

