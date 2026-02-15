import { getRequestConfig, setRequestLocale } from 'next-intl/server'
import { routing } from './i18n/routing'

type SupportedLocale = (typeof routing.locales)[number]

const isSupportedLocale = (value: unknown): value is SupportedLocale =>
  typeof value === 'string' && routing.locales.includes(value as SupportedLocale)

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : routing.defaultLocale

  setRequestLocale(resolvedLocale)

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
    onError(error) {
      // Build sırasında çeviri hatası olsa da devam et
      if (process.env.NODE_ENV === 'production') {
        console.warn('Translation error:', error.message)
        return
      }
      throw error
    },
    getMessageFallback({ namespace, key, error }) {
      // Eksik çeviri için fallback
      const path = [namespace, key].filter((part) => part != null).join('.')
      return path
    }
  }
})
