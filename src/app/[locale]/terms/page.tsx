'use client'

import { useTranslations } from 'next-intl'

export default function TermsPage() {
  const t = useTranslations('terms')
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-2 mb-8">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>{t('intro')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.general.title')}
            </h2>
            <p>{t('sections.general.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.property.title')}
            </h2>
            <p>{t('sections.property.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.restrictions.title')}
            </h2>
            <p>{t('sections.restrictions.intro')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('sections.restrictions.illegal')}</li>
              <li>{t('sections.restrictions.rights')}</li>
              <li>{t('sections.restrictions.virus')}</li>
              <li>{t('sections.restrictions.security')}</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.product.title')}
            </h2>
            <p>{t('sections.product.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.thirdParty.title')}
            </h2>
            <p>{t('sections.thirdParty.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.liability.title')}
            </h2>
            <p>{t('sections.liability.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.changes.title')}
            </h2>
            <p>{t('sections.changes.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.law.title')}
            </h2>
            <p>{t('sections.law.content')}</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('sections.contact.title')}
            </h2>
            <p>{t('sections.contact.intro')}</p>
            <p>
              <strong>{t('sections.contact.company')}</strong><br />
              {t('sections.contact.address')}<br />
              <strong>{t('sections.contact.emailLabel')}</strong> info@roversan.com<br />
              <strong>{t('sections.contact.phoneLabel')}</strong> +90 414 316 63 69<br />
              <strong>{t('sections.contact.faxLabel')}</strong> +90 542 721 32 29
            </p>

            <p className="text-sm text-gray-600 mt-8">
              {t('lastUpdate')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

