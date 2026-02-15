/**
 * LocalizedLink - Static export modunda locale'i koruyan Link wrapper
 * next-intl'in Link bileşeni static export'ta locale'i korumadığı için
 * bu wrapper kullanılmalı
 */

import Link from 'next/link'
import { useLocale } from 'next-intl'

type LocalizedLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

export function LocalizedLink({ href, children, className, onClick, ...props }: LocalizedLinkProps) {
  const locale = useLocale()
  
  // Eğer href zaten locale prefix'i içeriyorsa, olduğu gibi kullan
  // Aksi halde locale prefix'i ekle
  const localizedHref = href.startsWith(`/${locale}/`) || href.startsWith(`/${locale}`)
    ? href
    : `/${locale}${href === '/' ? '/' : href}/`
  
  return (
    <Link href={localizedHref} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  )
}

