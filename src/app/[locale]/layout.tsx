import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import Analytics from '@/components/Analytics'

export const dynamic = 'force-static'
export const revalidate = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type LayoutParams = {
  locale: string
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: LayoutParams
}) {
  const { locale } = params
  
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer locale={locale} />
          <CookieBanner />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

