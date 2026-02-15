import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { getTranslations } from 'next-intl/server'

type FooterProps = {
  locale: string
}

export default async function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const tFooter = await getTranslations({ locale, namespace: 'footer' })

  return (
    <footer className="bg-gray-900 text-gray-300 pb-20 md:pb-12">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="relative mb-4 h-16 w-40">
              <Image
                src="/images/logo/logo.png"
                alt="Roversan Gıda"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="mb-4 text-gray-400">
              {tFooter('company.description')}
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.instagram.com/roversandrink/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#E4405F]"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://x.com/roversangida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#1DA1F2]"
                aria-label="X (Twitter)"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/roversan-ins-gid-san-0120b7a3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#0077B5]"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href={`/${locale}/privacy/`} className="text-gray-400 transition-colors hover:text-primary-300">
                {tFooter('privacy')}
              </Link>
              <Link href={`/${locale}/terms/`} className="text-gray-400 transition-colors hover:text-primary-300">
                {tFooter('terms')}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {tFooter('quickLinks.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about/`} className="transition-colors hover:text-primary-300">
                  {tFooter('quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/`} className="transition-colors hover:text-primary-300">
                  {tFooter('quickLinks.products')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog/`} className="transition-colors hover:text-primary-300">
                  {tFooter('quickLinks.catalog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/certificates/`} className="transition-colors hover:text-primary-300">
                  {tFooter('quickLinks.certificates')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact/`} className="transition-colors hover:text-primary-300">
                  {tFooter('quickLinks.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {tFooter('products.title')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href={`/${locale}/products/?category=Frutti`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.frutti')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=Keita`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.keita')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=Shirino`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.shirino')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=Kahve`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.brawoo')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=Kahve`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.brawali')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=Kahve`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.fruttiKahve')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=${encodeURIComponent('Enerji İçeceği')}`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.letsgo')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.fresh')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products/?category=${encodeURIComponent('Buzlaş')}`} className="transition-colors hover:text-primary-300">
                  {tFooter('products.machines')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              {tFooter('contact.title')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary-300" />
                <span className="whitespace-pre-line text-gray-400">
                  {tFooter('contact.address')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary-300" />
                <a href="tel:+904143166369" className="transition-colors hover:text-primary-200">
                  {tFooter('contact.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-primary-300" />
                <a 
                  href="https://wa.me/905427213229" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-200"
                >
                  {tFooter('contact.whatsapp')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary-300" />
                <a href="mailto:info@roversan.com" className="transition-colors hover:text-primary-200">
                  {tFooter('contact.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-500">{tFooter('copyright', { year: currentYear })}</p>
            <div className="flex items-center gap-2 text-gray-400">
              {locale === 'tr' ? (
                <>
                  <a
                    href="https://passyazilim.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span className="font-semibold">Pass Yazılım</span>
                    <svg
                      className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span>{tFooter('developedBy')}</span>
                </>
              ) : (
                <>
                  <span>{tFooter('developedBy')}</span>
                  <a
                    href="https://passyazilim.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span className="font-semibold">Pass Yazılım</span>
                    <svg
                      className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
