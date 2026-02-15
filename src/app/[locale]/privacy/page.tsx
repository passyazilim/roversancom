'use client'

import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-2 mb-8">{t('title')}</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            {/* 1. Veri Sorumlusunun Kimliği */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('section1.title')}
            </h2>
            <p>{t('section1.content')}</p>

            {/* 2. Kişisel Verilerin İşlenmesi ve İşleme Amaçları */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('section2.title')}
            </h2>
            <p className="mb-4">{t('section2.intro')}</p>
            <p className="mb-4">{t('section2.content')}</p>
            <p className="mb-2 font-semibold">{t('section2.website.title')}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{t('section2.website.visit')}</li>
              <li>{t('section2.website.online')}</li>
            </ul>
            <p>{t('section2.principles')}</p>

            {/* 3. Kişisel Verilerinizi Kimlere ve Hangi Amaçlarla Aktarıyoruz? */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('section3.title')}
            </h2>
            <p className="mb-4">{t('section3.content')}</p>
            <p className="text-sm text-gray-600">{t('section3.note')}</p>

            {/* 4. Kişisel Verilerinizi Toplamamızın Yöntemi ve Hukuki Sebebi Nedir? */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('section4.title')}
            </h2>
            <p>{t('section4.content')}</p>

            {/* 5. Kişisel Verilerin Korunmasına Yönelik Haklarınız */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('section5.title')}
            </h2>
            <p className="mb-4">{t('section5.intro')}</p>
            <p className="mb-4">{t('section5.rightsIntro')}</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>{t('section5.rights.learn')}</li>
              <li>{t('section5.rights.info')}</li>
              <li>{t('section5.rights.purpose')}</li>
              <li>{t('section5.rights.transfer')}</li>
              <li>{t('section5.rights.correct')}</li>
              <li>{t('section5.rights.delete')}</li>
              <li>{t('section5.rights.notify')}</li>
              <li>{t('section5.rights.object')}</li>
              <li>{t('section5.rights.compensation')}</li>
            </ul>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">
              {t('section5.howTo.title')}
            </h3>
            <p className="mb-4">{t('section5.howTo.content')}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{t('section5.howTo.methods.personal')}</li>
              <li>{t('section5.howTo.methods.mail')}</li>
              <li>{t('section5.howTo.methods.registered')}</li>
              <li>{t('section5.howTo.methods.email')}</li>
            </ul>
            <p className="text-sm text-gray-600">{t('section5.howTo.note')}</p>

            {/* 6. Veri Gizliliği İlkelerinde Yapılacak Değişiklikler */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('section6.title')}
            </h2>
            <p>{t('section6.content')}</p>

            {/* Çerezler */}
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              {t('cookies.title')}
            </h2>
            <p>{t('cookies.content')}</p>

            {/* Aydınlatma Metni Bölümü */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h1 className="heading-2 mb-8">{t('disclosure.title')}</h1>
              <p className="mb-6">{t('disclosure.intro')}</p>

              {/* 1. Veri Sorumlusunun Kimliği */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section1.title')}
              </h2>
              <p>{t('disclosure.section1.content')}</p>

              {/* 2. Kişisel Verilerin İşlenmesi ve İşleme Amaçları */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section2.title')}
              </h2>
              <p className="mb-4">{t('disclosure.section2.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>{t('disclosure.section2.dataTypes.identity')}</li>
                <li>{t('disclosure.section2.dataTypes.contact')}</li>
                <li>{t('disclosure.section2.dataTypes.transaction')}</li>
                <li>{t('disclosure.section2.dataTypes.marketing')}</li>
              </ul>
              <p className="mb-4">{t('disclosure.section2.purposes.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('disclosure.section2.purposes.legal')}</li>
                <li>{t('disclosure.section2.purposes.service')}</li>
                <li>{t('disclosure.section2.purposes.product')}</li>
                <li>{t('disclosure.section2.purposes.marketing')}</li>
                <li>{t('disclosure.section2.purposes.analytics')}</li>
                <li>{t('disclosure.section2.purposes.quality')}</li>
                <li>{t('disclosure.section2.purposes.security')}</li>
              </ul>
              <p className="mt-4">{t('disclosure.section2.principles')}</p>

              {/* 3. Kişisel Verilerinizi Kimlere ve Hangi Amaçlarla Aktarıyoruz? */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section3.title')}
              </h2>
              <p>{t('disclosure.section3.content')}</p>

              {/* 4. Kişisel Verilerinizi Toplamamızın Yöntemi ve Hukuki Sebebi Nedir? */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section4.title')}
              </h2>
              <p>{t('disclosure.section4.content')}</p>

              {/* 5. Kişisel Verilerin Korunmasına Yönelik Haklarınız */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section5.title')}
              </h2>
              <p className="mb-4">{t('disclosure.section5.intro')}</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>{t('disclosure.section5.rights.learn')}</li>
                <li>{t('disclosure.section5.rights.info')}</li>
                <li>{t('disclosure.section5.rights.purpose')}</li>
                <li>{t('disclosure.section5.rights.transfer')}</li>
                <li>{t('disclosure.section5.rights.correct')}</li>
                <li>{t('disclosure.section5.rights.delete')}</li>
                <li>{t('disclosure.section5.rights.notify')}</li>
                <li>{t('disclosure.section5.rights.object')}</li>
                <li>{t('disclosure.section5.rights.compensation')}</li>
              </ul>
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">
                {t('disclosure.section5.howTo.title')}
              </h3>
              <p className="mb-4">{t('disclosure.section5.howTo.content')}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>{t('disclosure.section5.howTo.methods.email')}</li>
                <li>{t('disclosure.section5.howTo.methods.mail')}</li>
                <li>{t('disclosure.section5.howTo.methods.phone')}</li>
              </ul>
              <p className="text-sm text-gray-600">{t('disclosure.section5.howTo.note')}</p>

              {/* 6. Veri Gizliliği İlkelerinde Yapılacak Değişiklikler */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section6.title')}
              </h2>
              <p>{t('disclosure.section6.content')}</p>

              {/* 7. Değişiklikler */}
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {t('disclosure.section7.title')}
              </h2>
              <p>{t('disclosure.section7.content')}</p>

              <p className="mt-8 text-right font-semibold">{t('disclosure.closing')}</p>
              <p className="text-right font-semibold">Roversan Gıda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

