'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaSearch, FaTimes } from 'react-icons/fa'
import productsJson from '@/data/products.json'
import categoriesJson from '@/data/categories.json'

type ProductVariant = {
  type: string
  weight: string
  code: string
  packInfo: string
}

type ProductInfo = {
  brand: string
  weight: string
  code: string
  packInfo: string
  variants?: ProductVariant[]
}

type Product = {
  name: string
  image: string
  category: string
  color: string
  secondImage?: string
} & Partial<ProductInfo>

const rawProducts = (productsJson.products ?? []) as Product[]

const fallbackProducts: Product[] = rawProducts.map((product) => ({
  ...product,
  secondImage: product.secondImage || undefined,
  brand: product.brand ?? '',
  weight: product.weight ?? '',
  code: product.code ?? '',
  packInfo: product.packInfo ?? '',
  color: product.color ?? 'from-primary-500 to-primary-700',
}))

const rawCategories = (categoriesJson.categories ?? []) as string[]
const categoryOptions: string[] = ['All', ...rawCategories]

// Helper function to format packInfo with calculations
const formatPackInfo = (packInfo: string): string => {
  // Replace 24x24 with 24x24=576
  packInfo = packInfo.replace(/\b24x24\b/g, '24x24=576')
  // Replace 24x26 with 24x26=624
  packInfo = packInfo.replace(/\b24x26\b/g, '24x26=624')
  return packInfo
}

// Ürün bilgileri mapping
const productInfoMap: Record<string, ProductInfo> = {
  // Frutti Dream ürünleri
  'portakal frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-120 / R-121',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-120', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-121', packInfo: '24x26' }
    ]
  },
  'çilek frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-122 / R-123',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-122', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-123', packInfo: '24x26' }
    ]
  },
  'mango frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-124 / R-125',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-124', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-125', packInfo: '24x26' }
    ]
  },
  'ananas frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-126 / R-127',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1,5 Lt)', code: 'R-126', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-127', packInfo: '24x26' }
    ]
  },
  'cola frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-128 / R-129',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-128', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-129', packInfo: '24x26' }
    ]
  },
  'coconut frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-130 / R-131',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-130', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-131', packInfo: '24x26' }
    ]
  },
  'limon frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-132 / R-133',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-132', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-133', packInfo: '24x26' }
    ]
  },
  'nar frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-134 / R-135',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-134', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-135', packInfo: '24x26' }
    ]
  },
  'muz frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-136 / R-137',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-136', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-137', packInfo: '24x26' }
    ]
  },
  'zencefil frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-142 / R-143',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-142', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-143', packInfo: '24x26' }
    ]
  },
  'şeftali frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-144 / R-145',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-144', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-145', packInfo: '24x26' }
    ]
  },
  'karışık frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-146 / R-147',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-146', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-147', packInfo: '24x26' }
    ]
  },
  'tamerhindi frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-148 / R-149',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-148', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-149', packInfo: '24x26' }
    ]
  },
  'soursop frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-150 / R-151',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-150', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-151', packInfo: '24x26' }
    ]
  },
  'passion frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-152 / R-153',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-152', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-153', packInfo: '24x26' }
    ]
  },
  'guava frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-154 / R-155',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-154', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-155', packInfo: '24x26' }
    ]
  },
  'kivi frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-156 / R-157',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-156', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-157', packInfo: '24x26' }
    ]
  },
  'elma frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-158 / R-159',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-158', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-159', packInfo: '24x26' }
    ]
  },
  'gazoz frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-160 / R-161',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-160', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-161', packInfo: '24x26' }
    ]
  },
  'vişne frutti': {
    brand: 'Frutti Dream',
    weight: '9-10 gr',
    code: 'R-140 / R-141',
    packInfo: '24x24 / 24x26',
    variants: [
      { type: 'Küçük Paket', weight: '9 gr (1.5 Lt)', code: 'R-140', packInfo: '24x24' },
      { type: 'Kutu', weight: '10 gr (2 Lt)', code: 'R-141', packInfo: '24x26' }
    ]
  },
  'lolipop frutti': {
    brand: 'Frutti Dream',
    weight: '25 gr',
    code: '-',
    packInfo: '25gr x 48 adet x 10 paket = koli'
  },
  // Shirino
  'shirino portakal': {
    brand: 'Shirino',
    weight: '5 gr',
    code: 'R-162',
    packInfo: '24x24'
  },
  'shirino limon': {
    brand: 'Shirino',
    weight: '5 gr',
    code: 'R-163',
    packInfo: '24x24'
  },
  'shirino şeftali': {
    brand: 'Shirino',
    weight: '5 gr',
    code: 'R-164',
    packInfo: '24x24'
  },
  'shirino vişne': {
    brand: 'Shirino',
    weight: '5 gr',
    code: 'R-165',
    packInfo: '24x24'
  },
  // Keita
  'keita ananas': {
    brand: 'Keïta',
    weight: '10 gr',
    code: 'R-169',
    packInfo: '24x26'
  },
  'keita cola': {
    brand: 'Keïta',
    weight: '10 gr',
    code: 'R-167',
    packInfo: '24x26'
  },
  'keita zencefil': {
    brand: 'Keïta',
    weight: '10 gr',
    code: 'R-168',
    packInfo: '24x26'
  },
  'keita chop chop': {
    brand: 'Keïta',
    weight: '10 gr',
    code: 'R-170',
    packInfo: '24x26'
  },
  'keita portakal': {
    brand: 'Keïta',
    weight: '10 gr',
    code: 'R-171',
    packInfo: '24x26'
  },
  // Kahve
  'brawoo 3 in 1': {
    brand: 'Brawoo',
    weight: '18 gr',
    code: 'R-174',
    packInfo: '24x24'
  },
  'brawoo 3 in 1 hazır karışık kahve': {
    brand: 'Brawoo',
    weight: '18 gr',
    code: 'R-174',
    packInfo: '24x24'
  },
  'brawoo 3 in 1 fındık aromalı karışık kahve': {
    brand: 'Brawoo',
    weight: '18 gr',
    code: 'R-172',
    packInfo: '24x24'
  },
  'brawoo 2 in 1': {
    brand: 'Brawoo',
    weight: '12 gr',
    code: 'R-173',
    packInfo: '24x24'
  },
  'frutti 3 in 1 kahve (kutu)': {
    brand: 'Frutti',
    weight: '18 gr',
    code: 'R-175',
    packInfo: '40x12'
  },
  'frutti 3 in 1 kahve (poşet)': {
    brand: 'Frutti',
    weight: '18 gr',
    code: 'R-176',
    packInfo: '50x20'
  },
  'brawali dubai çikolatalı cappucino': {
    brand: 'Brawali',
    weight: '12 gr',
    code: 'C200',
    packInfo: '12x24'
  },
  "let's go energy drink": {
    brand: 'Let\'s Go',
    weight: '5gr 200ml',
    code: '-',
    packInfo: '12x24'
  },
  "lets go energy drink": {
    brand: 'Let\'s Go',
    weight: '5gr 200ml',
    code: '-',
    packInfo: '12x24'
  }
}

// Kategoriye göre özellikler
// Category features will be created dynamically using translations
function getCategoryFeatures(category: string, t: (key: string) => string): Feature[] {
  const categoryMap: Record<string, Array<{ labelKey: string; icon: string; descKey: string }>> = {
    'Frutti': [
      { labelKey: 'vitaminC', icon: '🍊', descKey: 'dailyNeed80' },
      { labelKey: 'naturalFlavor', icon: '🌿', descKey: 'noArtificialSweetener' },
      { labelKey: 'easyPreparation', icon: '⚡', descKey: 'readyIn30Sec' },
      { labelKey: 'refreshing', icon: '❄️', descKey: 'idealForIced' },
      { labelKey: 'tasty', icon: '⭐', descKey: 'realFruitTaste' }
    ],
    'Keita': [
      { labelKey: 'premiumQuality', icon: '💎', descKey: 'specialFormula' },
      { labelKey: 'energyBoosting', icon: '⚡', descKey: 'allDayEnergy' },
      { labelKey: 'richTaste', icon: '🎯', descKey: 'intenseFlavor' },
      { labelKey: 'practical', icon: '✨', descKey: 'prepareAnywhere' },
      { labelKey: 'isoCertified', icon: '🏆', descKey: 'qualityGuarantee' }
    ],
    'Shirino': [
      { labelKey: 'lightFormula', icon: '🌸', descKey: 'lowCalorie' },
      { labelKey: 'refreshingEffect', icon: '💨', descKey: 'coolingEffect' },
      { labelKey: 'naturalTastes', icon: '🍃', descKey: 'noArtificialColor' },
      { labelKey: 'healthy', icon: '💚', descKey: 'vitaminEnriched' },
      { labelKey: 'economical', icon: '💰', descKey: 'affordablePrice' }
    ],
    'Kahve': [
      { labelKey: 'premiumCoffee', icon: '☕', descKey: 'selectBeans' },
      { labelKey: 'creamy', icon: '🥛', descKey: 'softTexture' },
      { labelKey: 'aromatic', icon: '🌰', descKey: 'intenseScent' },
      { labelKey: 'energy', icon: '⚡', descKey: 'caffeineBoost' },
      { labelKey: 'practical', icon: '✨', descKey: 'readyNow' }
    ],
    'Enerji İçeceği': [
      { labelKey: 'caffeine', icon: '🔥', descKey: 'vigorAndPerformance' },
      { labelKey: 'bVitamins', icon: '💊', descKey: 'metabolismSupport' },
      { labelKey: 'caffeine', icon: '⚡', descKey: 'quickEnergy' },
      { labelKey: 'refreshing', icon: '❄️', descKey: 'moreEnjoyableWithIce' },
      { labelKey: 'carbonatedTaste', icon: '🥤', descKey: 'revitalizingDrink' }
    ],
    'Buzlaş': [
      { labelKey: 'professional', icon: '🏢', descKey: 'forBusinesses' },
      { labelKey: 'durable', icon: '💪', descKey: 'longLasting' },
      { labelKey: 'efficient', icon: '⚙️', descKey: 'lowEnergy' },
      { labelKey: 'guaranteed', icon: '🛡️', descKey: 'twoYearWarranty' },
      { labelKey: 'quality', icon: '⭐', descKey: 'premiumMaterial' }
    ]
  }
  
  const features = categoryMap[category] || []
  return features.map(f => createFeature(t, f.labelKey, f.icon, f.descKey))
}

// Ürün adına göre özellik üretici (daha isabetli içerik)
type Feature = { label: string; icon: string; desc: string }

// Helper function to create translated features
function createFeature(
  t: (key: string) => string,
  labelKey: string,
  icon: string,
  descKey: string
): Feature {
  return {
    label: t(`features.labels.${labelKey}`),
    icon,
    desc: t(`features.descriptions.${descKey}`)
  }
}

function getProductFeatures(product: Product, t: (key: string) => string): Feature[] {
  const name = product.name?.toLowerCase?.() || ""
  const features: Feature[] = []

  // Kahve & Enerji
  if (name.includes('kahve') || name.includes('cappucino')) {
    features.push(
      createFeature(t, 'caffeine', '⚡', 'energyAndFocus'),
      createFeature(t, 'creamyTexture', '🥛', 'softDrink'),
      createFeature(t, 'aromaticNotes', '🌰', 'richCoffeeAroma'),
      createFeature(t, 'quickPreparation', '⏱️', 'justAddHotWater'),
      createFeature(t, 'qualityLabel', '🏆', 'selectedBeanBlend')
    )
  } else if (name.includes("energy") || name.includes("let's go")) {
    features.push(
      createFeature(t, 'caffeine', '🔥', 'vigorAndPerformance'),
      createFeature(t, 'bVitamins', '💊', 'metabolismSupport'),
      createFeature(t, 'caffeine', '⚡', 'quickEnergy'),
      createFeature(t, 'refreshing', '❄️', 'moreEnjoyableWithIce'),
      createFeature(t, 'carbonatedTaste', '🥤', 'revitalizingDrink')
    )
  }

  // Meyveler – C vitamini ve aroma odaklı
  const fruitMap: Array<{ key: string; items: Array<{ labelKey: string; icon: string; descKey: string }> }> = [
    { key: 'limon', items: [
      { labelKey: 'vitaminC', icon: '🍋', descKey: 'highVitaminC' },
      { labelKey: 'freshTaste', icon: '💧', descKey: 'citrusFreshness' },
      { labelKey: 'antioxidant', icon: '🛡️', descKey: 'naturalProtection' },
      { labelKey: 'refreshing', icon: '❄️', descKey: 'perfectWithIce' },
    ]},
    { key: 'portakal', items: [
      { labelKey: 'vitaminC', icon: '🍊', descKey: 'immunitySupport' },
      { labelKey: 'citrusAroma', icon: '🌿', descKey: 'naturalOrangeTaste' },
      { labelKey: 'betaCarotene', icon: '🧡', descKey: 'naturalColorAndFlavor' },
      { labelKey: 'refreshing', icon: '❄️', descKey: 'idealForSummer' },
    ]},
    { key: 'nar', items: [
      { labelKey: 'antioxidant', icon: '🛡️', descKey: 'richPolyphenols' },
      { labelKey: 'vitaminC', icon: '🍒', descKey: 'dailySupport' },
      { labelKey: 'intenseTaste', icon: '🎯', descKey: 'balancedSourSweet' },
    ]},
    { key: 'ananas', items: [
      { labelKey: 'bromelain', icon: '🧬', descKey: 'naturalEnzymeSupport' },
      { labelKey: 'tropicalAroma', icon: '🌴', descKey: 'exoticFlavor' },
      { labelKey: 'vitaminC', icon: '🍍', descKey: 'dailyContribution' },
    ]},
    { key: 'çilek', items: [
      { labelKey: 'vitaminC', icon: '🍓', descKey: 'naturalSupport' },
      { labelKey: 'antioxidant', icon: '🛡️', descKey: 'freshFruitTaste' },
      { labelKey: 'naturalFlavor', icon: '🌿', descKey: 'refinedFlavor' },
    ]},
    { key: 'mango', items: [
      { labelKey: 'vitaminA', icon: '🟧', descKey: 'betaCaroteneSource' },
      { labelKey: 'tropical', icon: '🌺', descKey: 'intenseFruitAroma' },
      { labelKey: 'refreshing', icon: '❄️', descKey: 'greatWithIce' },
    ]},
    { key: 'kivi', items: [
      { labelKey: 'superC', icon: '🟢', descKey: 'veryHighVitaminC' },
      { labelKey: 'fiber', icon: '🌾', descKey: 'lightAndBalanced' },
      { labelKey: 'fresh', icon: '💧', descKey: 'sharpFreshness' },
    ]},
    { key: 'elma', items: [
      { labelKey: 'pectin', icon: '🍏', descKey: 'naturalFiber' },
      { labelKey: 'appleAroma', icon: '🌿', descKey: 'balancedTaste' },
      { labelKey: 'lightDrink', icon: '🫗', descKey: 'suitableForEveryDay' },
    ]},
    { key: 'kiraz', items: [
      { labelKey: 'antioxidant', icon: '🛡️', descKey: 'naturalPhytoComponents' },
      { labelKey: 'intenseAroma', icon: '🍒', descKey: 'richFruitNote' },
    ]},
    { key: 'şeftali', items: [
      { labelKey: 'vitaminC', icon: '🍑', descKey: 'sweetAndBalanced' },
      { labelKey: 'fiber', icon: '🌾', descKey: 'lightContent' },
    ]},
    { key: 'guava', items: [
      { labelKey: 'superC', icon: '🟡', descKey: 'veryHighVitaminC' },
      { labelKey: 'exotic', icon: '🌴', descKey: 'strongAromaticTaste' },
    ]},
    { key: 'soursop', items: [
      { labelKey: 'vitaminC', icon: '🍋', descKey: 'dailyContribution' },
      { labelKey: 'exotic', icon: '🌺', descKey: 'specialFruitAroma' },
    ]},
    { key: 'tamerhindi', items: [
      { labelKey: 'mineral', icon: '🧂', descKey: 'naturalMineralSource' },
      { labelKey: 'sourSweet', icon: '🍬', descKey: 'balancedFlavor' },
    ]},
    { key: 'zencefil', items: [
      { labelKey: 'ginger', icon: '🫚', descKey: 'freshnessAndWarming' },
      { labelKey: 'naturalFlavor', icon: '🌿', descKey: 'sharpAndBalanced' },
    ]},
    { key: 'coconut', items: [
      { labelKey: 'potassium', icon: '🧴', descKey: 'naturalSupport' },
      { labelKey: 'coconut', icon: '🥥', descKey: 'tropicalCreamyTaste' },
    ]},
    { key: 'cola', items: [
      { labelKey: 'colaFlavor', icon: '🥤', descKey: 'classicFlavor' },
      { labelKey: 'revitalizing', icon: '💨', descKey: 'coolingDrink' },
    ]},
    { key: 'gazoz', items: [
      { labelKey: 'foamy', icon: '🫧', descKey: 'lightCarbonatedFeel' },
      { labelKey: 'fresh', icon: '💧', descKey: 'lemonadeHint' },
    ]},
    { key: 'karışık', items: [
      { labelKey: 'fruitMix', icon: '🍹', descKey: 'richAromaProfile' },
      { labelKey: 'vitaminSupport', icon: '💊', descKey: 'balancedContent' },
    ]},
  ]

  for (const entry of fruitMap) {
    if (name.includes(entry.key)) {
      features.push(...entry.items.map(item => createFeature(t, item.labelKey, item.icon, item.descKey)))
    }
  }

  // Eğer spesifik eşleşme yoksa kategori bazlı yedekle
  if (features.length === 0) {
    const fallback = getCategoryFeatures(product.category, t)
    return fallback.slice(0, 5)
  }

  // Maksimum 5 özellik döndür
  return features.slice(0, 5)
}

function getProductInfo(product: Product): ProductInfo | null {
  // Eğer ürün API'den geliyorsa ve brand, weight, code, packInfo bilgileri varsa bunları kullan
  if (product.brand || product.weight || product.code || product.packInfo || (product.variants && product.variants.length > 0)) {
    const info: ProductInfo = {
      brand: product.brand ?? '',
      weight: product.weight ?? '',
      code: product.code ?? '',
      packInfo: product.packInfo ?? '',
    }

    if (product.variants && product.variants.length > 0) {
      info.variants = product.variants
    }

    return info
  }

  // Mevcut ürünler için productInfoMap kullan
  const normalizedName = product.name.toLowerCase().trim()
  
  // Özel eşleştirmeler - ürün adlarına göre
  const mapping: Record<string, string> = {
    'portakal frutti': 'portakal frutti',
    'çilek frutti': 'çilek frutti',
    'mango frutti': 'mango frutti',
    'ananas frutti': 'ananas frutti',
    'cola frutti': 'cola frutti',
    'coconut frutti': 'coconut frutti',
    'limon frutti': 'limon frutti',
    'nar frutti': 'nar frutti',
    'muz frutti': 'muz frutti',
    'zencefil frutti': 'zencefil frutti',
    'şeftali frutti': 'şeftali frutti',
    'karışık frutti': 'karışık frutti',
    'tamerhindi frutti': 'tamerhindi frutti',
    'soursop frutti': 'soursop frutti',
    'passion frutti': 'passion frutti',
    'guava frutti': 'guava frutti',
    'kivi frutti': 'kivi frutti',
    'elma frutti': 'elma frutti',
    'gazoz frutti': 'gazoz frutti',
    'vişne frutti': 'vişne frutti',
    'lolipop frutti': 'lolipop frutti',
    'shirino portakal': 'shirino portakal',
    'shirino limon': 'shirino limon',
    'shirino şeftali': 'shirino şeftali',
    'shirino vişne': 'shirino vişne',
    'keita ananas': 'keita ananas',
    'keita cola': 'keita cola',
    'keita zencefil': 'keita zencefil',
    'keita chop chop': 'keita chop chop',
    'keita portakal': 'keita portakal',
    'brawoo 3 in 1': 'brawoo 3 in 1',
    'brawoo 3 in 1 hazır karışık kahve': 'brawoo 3 in 1 hazır karışık kahve',
    'brawoo 3 in 1 fındık aromalı karışık kahve': 'brawoo 3 in 1 fındık aromalı karışık kahve',
    'brawoo 2 in 1': 'brawoo 2 in 1',
    'frutti 3 in 1 kahve (kutu)': 'frutti 3 in 1 kahve (kutu)',
    'frutti 3 in 1 kahve (poşet)': 'frutti 3 in 1 kahve (poşet)',
  }
  
  const key = mapping[normalizedName] || normalizedName
  return productInfoMap[key] || null
}

// Particle component
function Particle({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: '50%',
        top: '50%',
        background: color,
        animation: `particle-burst 0.8s ease-out ${delay}s forwards`,
        transform: `translate(${x}px, ${y}px) scale(0)`,
        opacity: 0
      }}
    />
  )
}

export default function ProductsPage() {
  const products = fallbackProducts
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const locale = useLocale()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; color: string; delay: number }>>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [showProductInfo, setShowProductInfo] = useState(false)

  const categories = categoryOptions

  // URL parametresinden kategoriyi oku ve güncelle
  useEffect(() => {
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam)
      if (categories.includes(decodedCategory)) {
        setSelectedCategory(decodedCategory)
      }
    }
  }, [categoryParam, categories])

  const filteredProducts = products.filter(p => {
    let matchesCategory = false
    if (selectedCategory === 'All') {
      matchesCategory = true
    } else if (selectedCategory === 'Frutti') {
      // Frutti seçildiğinde sadece Frutti kategorisindeki ürünleri göster
      matchesCategory = p.category === 'Frutti'
    } else {
      matchesCategory = p.category === selectedCategory
    }
    const matchesSearch = searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleProductClick = (product: typeof products[0], event: React.MouseEvent) => {
    // Generate particles
    const newParticles = []
    const colors = product.color.match(/(?:from|to)-(\w+-\d+)/g)?.map(c => {
      const match = c.match(/(\w+)-(\d+)/)
      if (!match) return '#fbbf24'
      const colorName = match[1]
      const shade = match[2]
      // Simple color mapping
      const colorMap: Record<string, string> = {
        'yellow': '#fbbf24', 'orange': '#fb923c', 'red': '#ef4444',
        'pink': '#ec4899', 'purple': '#a855f7', 'blue': '#3b82f6',
        'green': '#22c55e', 'amber': '#f59e0b', 'gold': '#fbbf24'
      }
      return colorMap[colorName] || '#fbbf24'
    }) || ['#fbbf24', '#fb923c']

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20
      const distance = 100 + Math.random() * 100
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      const color = colors[Math.floor(Math.random() * colors.length)]
      newParticles.push({ x, y, color, delay: i * 0.02 })
    }
    
    setParticles(newParticles)
    setSelectedProduct(product)
    
    setTimeout(() => {
      setShowModal(true)
      setParticles([])
    }, 400)
  }

  const closeModal = () => {
    setShowModal(false)
    setCurrentImageIndex(0)
    setAvailableImages([])
    setShowProductInfo(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  // Helper function to get second image path from "urunler-2-foto" folder or API
  const getSecondImagePath = (product: typeof products[0]) => {
    // If product has secondImage from API, use it
    if ('secondImage' in product && (product as any).secondImage) {
      return (product as any).secondImage
    }
    
    const name = product.name.toLowerCase()
    
    // Mapping product names to 2nd photo folder filenames (fallback for old products)
    const imageMap: Record<string, string> = {
      // Frutti
      'ananas frutti': '/images/urunler-2-foto/ananas-frutti.jpg',
      'çilek frutti': '/images/urunler-2-foto/cilek-frutti.jpg',
      'coconut frutti': '/images/urunler-2-foto/hindistan-cevizi-frutti.jpg',
      'cola frutti': '/images/urunler-2-foto/kola-frutti.jpg',
      'elma frutti': '/images/urunler-2-foto/elma-frutti.jpg',
      'gazoz frutti': '/images/urunler-2-foto/gazoz-frutti.jpg',
      'guava frutti': '/images/urunler-2-foto/guava-frutti.jpg',
      'karışık frutti': '/images/urunler-2-foto/karisik-frutti.jpg',
      'kivi frutti': '/images/urunler-2-foto/kivi-frutti.jpg',
      'limon frutti': '/images/urunler-2-foto/limon-frutti.jpg',
      'mango frutti': '/images/urunler-2-foto/mango-frutti.jpg',
      'muz frutti': '/images/urunler-2-foto/muz-frutti.jpg',
      'nar frutti': '/images/urunler-2-foto/nar-frutii.jpg', // Note: typo in filename
      'passion frutti': '/images/urunler-2-foto/passion-frutti.jpg',
      'portakal frutti': '/images/urunler-2-foto/frutti-portakal.jpg',
      'şeftali frutti': '/images/urunler-2-foto/seftali-frutti.jpg',
      'soursop frutti': '/images/urunler-2-foto/soursop-frutti.jpg',
      'tamerhindi frutti': '/images/urunler-2-foto/tamerhindi-frutti.jpg',
      'zencefil frutti': '/images/urunler-2-foto/zencefil-frutti.jpg',
      'lolipop frutti': '', // No 2nd photo available
      // Keita
      'keita ananas': '/images/urunler-2-foto/ananas-keita.jpg',
      'keita chop chop': '/images/urunler-2-foto/chop-chop-keita.jpg',
      'keita cola': '/images/urunler-2-foto/kola-keita.jpg',
      'keita portakal': '/images/urunler-2-foto/portakal-keita.jpg',
      'keita zencefil': '/images/urunler-2-foto/keita-zencefil.jpg',
      // Shirino
      'shirino limon': '/images/urunler-2-foto/limon-shirino.jpg',
      'shirino portakal': '/images/urunler-2-foto/portakal-shirino.jpg',
      'shirino şeftali': '/images/urunler-2-foto/seftali-shirino.jpg',
      'shirino vişne': '/images/urunler-2-foto/vişne shirino.jpg',
      // Kahve
      'brawoo 2 in 1': '/images/urunler-2-foto/2in1-brawoo.jpg',
      'brawoo 3 in 1': '/images/urunler-2-foto/3in1-brawoo-karisik.jpg',
      'brawoo 3 in 1 hazır karışık kahve': '/images/urunler-2-foto/3in1-brawoo-karisik.jpg',
      'brawoo 3 in 1 fındık aromalı karışık kahve': '/images/urunler-2-foto/3in1-brawo.jpg',
      'frutti 3 in 1 kahve (kutu)': '/images/urunler-2-foto/3in1-kutu-frutti-kahve.jpg',
      'frutti 3 in 1 kahve (poşet)': '/images/urunler-2-foto/3in1-frutti-poset-kahve.jpg',
      'brawali dubai çikolatalı cappucino': '/images/products/dubai brawali.jpeg',
      // Enerji İçeceği
      'let\'s go energy drink': '', // No 2nd photo available
    }
    
    return imageMap[name] || ''
  }

  // Check if second image exists and set available images (show only 2nd photo)
  useEffect(() => {
    if (selectedProduct) {
      const secondImage = getSecondImagePath(selectedProduct)
      
      // If we have a mapping for the second image, try to show it directly
      if (secondImage) {
        // Try second image first
        setAvailableImages([secondImage])
        setCurrentImageIndex(0)
        
        // Verify it loads, if not fallback to first image
        const img = new window.Image()
        img.onload = () => {
          // Image loaded successfully
        }
        img.onerror = () => {
          // Second image doesn't exist, use first image
          setAvailableImages([selectedProduct.image])
          setCurrentImageIndex(0)
        }
        img.src = secondImage
      } else {
        // No second image mapping, use first image
        setAvailableImages([selectedProduct.image])
        setCurrentImageIndex(0)
      }
    } else {
      setAvailableImages([])
    }
  }, [selectedProduct])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const productFeatures = selectedProduct ? getProductFeatures(selectedProduct, t) : []
  const productInfo = selectedProduct ? getProductInfo(selectedProduct) : null

  // Get display title for products
  const getProductDisplayTitle = (product: typeof products[0]) => {
    const name = product.name.toLowerCase().trim()
    
    // Product name mapping to translation keys
    const productNameMap: Record<string, string> = {
      'portakal frutti': 'portakalFrutti',
      'çilek frutti': 'çilekFrutti',
      'mango frutti': 'mangoFrutti',
      'ananas frutti': 'ananasFrutti',
      'cola frutti': 'colaFrutti',
      'coconut frutti': 'coconutFrutti',
      'limon frutti': 'limonFrutti',
      'nar frutti': 'narFrutti',
      'muz frutti': 'muzFrutti',
      'zencefil frutti': 'zencefilFrutti',
      'şeftali frutti': 'şeftaliFrutti',
      'karışık frutti': 'karışıkFrutti',
      'tamerhindi frutti': 'tamerhindiFrutti',
      'soursop frutti': 'soursopFrutti',
      'passion frutti': 'passionFrutti',
      'guava frutti': 'guavaFrutti',
      'kivi frutti': 'kiviFrutti',
      'elma frutti': 'elmaFrutti',
      'gazoz frutti': 'gazozFrutti',
      'kiraz frutti': 'kirazFrutti',
      'lolipop frutti': 'lolipopFrutti',
      'keita ananas': 'keitaAnanas',
      'keita chop chop': 'keitaChopChop',
      'keita cola': 'keitaCola',
      'keita portakal': 'keitaPortakal',
      'keita zencefil': 'keitaZencefil',
      'shirino limon': 'shirinoLimon',
      'shirino portakal': 'shirinoPortakal',
      'shirino şeftali': 'shirinoŞeftali',
      'shirino vişne': 'shirinoVişne',
      'brawoo 2 in 1': 'brawoo2in1',
      'brawoo 3 in 1': 'brawoo3in1',
      'brawoo 3 in 1 kahve': 'brawoo3in1',
      'brawoo 3 in 1 hazır karışık kahve': 'brawoo3in1Karisik',
      'brawoo 3 in 1 fındık aromalı karışık kahve': 'brawoo3in1Findik',
      'frutti 3 in 1 kahve (kutu)': 'frutti3in1Kutu',
      'frutti 3 in 1 kahve (poşet)': 'frutti3in1Poşet',
      'brawali dubai çikolatalı cappucino': 'dubaiCappucino',
      "let's go energy drink": 'letsGoEnergy',
      "lets go energy drink": 'letsGoEnergy',
      'ikili slush buzlaş makinesi': 'ikiliSlush',
      'üçlü slush buzlaş makinesi': 'üçlüSlush'
    }
    
    const translationKey = productNameMap[name]
    if (translationKey) {
      try {
        return t(`productNames.${translationKey}`)
      } catch (e) {
        // Fallback to original name if translation not found
      }
    }
    
    // Fallback to original logic if no translation found
    if (product.category === 'Frutti') {
      const flavor = product.name.replace('Frutti', '').trim()
      return `${flavor} Aromalı Toz İçecek`
    } else if (product.category === 'Keita') {
      const flavor = product.name.replace('Keita', '').trim()
      return `${flavor} Aromalı Toz İçecek`
    } else if (product.category === 'Shirino') {
      const flavor = product.name.replace('Shirino', '').trim()
      return `${flavor} Aromalı Toz İçecek`
    } else if (product.category === 'Kahve') {
      if (name.includes('3') && name.includes('1')) {
        return `${product.name} - Hazır Karışık Kahve`
      } else if (name.includes('brawoo')) {
        return `${product.name} Hazır Karışık Kahve`
      } else if (name.includes('dubai')) {
        return `${product.name} - Hazır Kahve`
      } else {
        return product.name
      }
    } else if (product.category === 'Enerji İçeceği') {
      return `${product.name} - Enerji İçeceği`
    } else if (product.category === 'Buzlaş') {
      return `${product.name} - Slush Makinesi`
    } else {
      return product.name
    }
  }


  // Get category display name for filter buttons
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'All': t('categories.all'),
      'Frutti': t('categories.frutti'),
      'Keita': t('categories.keita'),
      'Shirino': t('categories.shirino'),
      'Frutti Dream Lolipop': t('categories.fruttiDreamLolipop'),
      'Kahve': t('categories.kahve'),
      'Enerji İçeceği': t('categories.enerji'),
      'Buzlaş': t('categories.buzlaş')
    }
    return categoryMap[category] || category
  }
  
  // Get category subtitle
  const getCategorySubtitle = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Frutti': t('categorySubtitle.frutti'),
      'Keita': t('categorySubtitle.keita'),
      'Shirino': t('categorySubtitle.shirino'),
      'Frutti Dream Lolipop': t('categorySubtitle.fruttiDreamLolipop'),
      'Kahve': t('categorySubtitle.kahve'),
      'Enerji İçeceği': t('categorySubtitle.enerji'),
      'Buzlaş': t('categorySubtitle.buzlaş')
    }
    return categoryMap[category] || `${category} Serisi`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Hero */}
      <section className="relative h-[70vh] pt-24 md:pt-28 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/background/urunler.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-purple-900/85 to-gold-900/90"></div>
        </div>
        <div className="relative z-10 container-custom text-center text-white h-full flex flex-col items-center justify-center">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
            <span className="text-gold-400 font-bold">{t('hero.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 px-4">
            <span className="bg-gradient-to-r from-gold-300 to-yellow-300 bg-clip-text text-transparent">
              {filteredProducts.length}+
            </span>
            <br />
            <span className="text-white">{t('hero.title')}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mt-2 px-4">
            {t('hero.subtitle')}
          </p>
          {/* Centered quality label moved below texts */}
          <div className="relative w-52 h-52 md:w-64 md:h-64 mx-auto mt-6 drop-shadow-2xl">
            <Image
              src="/images/etiketler/etiket-quality.png"
              alt="Quality Etiketi"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
            <div className="relative">
              <input
                type="text"
                id="product-search"
                name="product-search"
                placeholder={t('search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 pl-12 sm:pl-14 rounded-xl sm:rounded-2xl border-2 border-primary-200 focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/20 text-base sm:text-lg shadow-lg"
              />
              <FaSearch className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-16 px-4 sm:px-0 overflow-x-auto pb-2 -mx-4 sm:mx-0 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-base md:text-lg transition-all duration-300 whitespace-nowrap shrink-0 active:scale-95 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-gold-600 text-white shadow-2xl scale-105 sm:scale-110'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg hover:scale-105'
                }`}
              >
                <span>{getCategoryDisplayName(category)}</span>
                <span className="ml-1">
                  {category === 'All' 
                    ? ` (${products.length})` 
                    : category === 'Frutti'
                    ? ` (${products.filter(p => p.category === 'Frutti').length})`
                    : ` (${products.filter(p => p.category === category).length})`}
                </span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 px-4 sm:px-0">
              {filteredProducts.map((product, index) => (
                <div 
                  key={index} 
                  className="group relative cursor-pointer"
                  onClick={(e) => handleProductClick(product, e)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-white rounded-xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4 border border-gray-100 active:translate-y-0">
                    {/* Image */}
                    <div className="relative h-40 sm:h-72 md:h-80 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badge - Category or Brand for Coffee */}
                      {product.category === 'Kahve' ? (() => {
                        const productName = product.name.toLowerCase()
                        let brand = ''
                        if (productName.includes('brawoo')) {
                          brand = 'Brawoo'
                        } else if (productName.includes('frutti') && productName.includes('kahve')) {
                          brand = 'Frutti Kahve'
                        } else if (productName.includes('brawali')) {
                          brand = 'Brawali'
                        }
                        return brand ? (
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-[10px] sm:text-xs font-bold shadow-xl backdrop-blur-sm border border-amber-400/50">
                            ☕ {brand}
                          </div>
                        ) : (
                          <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r ${product.color} text-white rounded-full text-xs sm:text-sm font-bold shadow-xl`}>
                            {product.category}
                          </div>
                        )
                      })() : (
                        <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r ${product.color} text-white rounded-full text-xs sm:text-sm font-bold shadow-xl`}>
                          {product.category}
                        </div>
                      )}

                      {/* Click Hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                          <div className="text-4xl mb-2">✨</div>
                          <div className="font-bold">{tCommon('viewDetails')}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-2 sm:p-6">
                      <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {getProductDisplayTitle(product)}
                      </h3>
                      <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm">{getCategorySubtitle(product.category)}</p>
                    </div>
                  </div>

                  {/* Particles (rendered on click) */}
                  {selectedProduct === product && particles.map((particle, i) => (
                    <Particle key={i} {...particle} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tCommon('productNotFound')}</h3>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
                className="btn-primary"
              >
                {tCommon('showAllProducts')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeModal}
        >
          <div 
            className={`bg-white rounded-2xl md:rounded-3xl max-w-6xl w-full max-h-[95vh] md:max-h-[95vh] flex flex-col transition-all duration-500 ${
              showModal ? 'scale-100 rotate-0' : 'scale-50 rotate-12'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Image Gallery */}
            <div className={`relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex-shrink-0 bg-gradient-to-br ${selectedProduct.color} overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/40 backdrop-blur-md hover:bg-white/60 active:bg-white/70 rounded-full flex items-center justify-center transition-all z-20 border-2 border-white/60 shadow-lg touch-manipulation"
                aria-label={t('modal.close')}
              >
                <FaTimes className="text-white text-lg sm:text-xl drop-shadow-lg" />
              </button>
              
              {/* Main Image Display */}
              <div className="relative h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                {availableImages.length > 0 && (
                  <>
                    <div className="relative w-full h-full max-w-2xl">
                      <img
                        src={availableImages[currentImageIndex] || availableImages[0]}
                        alt={`${getProductDisplayTitle(selectedProduct)} - ${tCommon('image')} ${currentImageIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                        onError={(e) => {
                          // If image fails to load, try first image
                          if (availableImages[currentImageIndex] !== selectedProduct.image) {
                            setAvailableImages([selectedProduct.image])
                          }
                        }}
                      />
                    </div>

                    </>
                  )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 min-h-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div className={`inline-block px-3 py-1 md:px-4 md:py-1.5 bg-gradient-to-r ${selectedProduct.color} text-white rounded-full text-[10px] sm:text-xs font-bold self-start`}>
                  {selectedProduct.category}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 flex-1 min-w-0 break-words">
                  {getProductDisplayTitle(selectedProduct)}
                </h2>
              </div>

              {/* Product Info Toggle Button - Elegant Design */}
              <div className="mb-6">
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-2xl border border-primary-500/20">
                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowProductInfo(!showProductInfo)}
                    className="w-full py-3 md:py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base hover:bg-white/20 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] transition-all text-center shadow-lg mb-0 flex items-center justify-center gap-2"
                  >
                    <span className="text-base md:text-lg">📋</span>
                    <span className="whitespace-nowrap">
                      {showProductInfo ? (
                        <>
                          <span className="hidden sm:inline">{t('modal.hideInfo')}</span>
                          <span className="sm:hidden">{t('modal.hideInfoMobile')}</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">{t('modal.showInfo')}</span>
                          <span className="sm:hidden">{t('modal.showInfoMobile')}</span>
                        </>
                      )}
                    </span>
                    <span className={`transform transition-transform duration-300 text-sm md:text-base ${showProductInfo ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {/* Contact Button */}
                  <Link 
                    href={`/${locale}/contact/`} 
                    className="block w-full mt-3 py-2.5 md:py-3 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white rounded-lg md:rounded-xl font-semibold text-xs md:text-sm hover:bg-white/30 hover:border-white/60 active:scale-[0.98] transition-all text-center shadow-lg"
                  >
                    <span className="hidden sm:inline">📞 {tCommon('contactUs')}</span>
                    <span className="sm:hidden">📞 {tCommon('contact')}</span>
                  </Link>

                  {/* Product Information - Expandable */}
                  {productInfo && showProductInfo && (
                    <div className="mt-4 pt-4 border-t border-white/20 space-y-3 animate-fadeIn">
                      {/* Variants - Table Design */}
                      {productInfo.variants && productInfo.variants.length > 0 ? (
                        <div>
                          <div className="text-xs md:text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                            <span>📦</span>
                            <span>{t('modal.details')}</span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                              <thead>
                                <tr className="bg-white/20 border-b border-white/30">
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.brand')}</th>
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.code')}</th>
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.weight')}</th>
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.packInfo')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {productInfo.variants.map((variant, idx) => (
                                  <tr key={idx} className="border-b border-white/10 hover:bg-white/15 transition-colors">
                                    <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{productInfo.brand}</td>
                                    <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{variant.code}</td>
                                    <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{variant.weight}</td>
                                    <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{formatPackInfo(variant.packInfo)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs md:text-sm font-semibold text-white/90 mb-3 flex items-center gap-2">
                            <span>📦</span>
                            <span>{t('modal.details')}</span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                              <thead>
                                <tr className="bg-white/20 border-b border-white/30">
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.brand')}</th>
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.code')}</th>
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.weight')}</th>
                                  <th className="text-left px-3 py-2 text-[10px] md:text-xs font-semibold text-white/90">{t('modal.packInfo')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10 hover:bg-white/15 transition-colors">
                                  <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{productInfo.brand}</td>
                                  <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{productInfo.code}</td>
                                  <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{productInfo.weight}</td>
                                  <td className="px-3 py-2 text-[10px] md:text-xs text-white/90">{formatPackInfo(productInfo.packInfo)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Features Grid - Compact */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {productFeatures.map((feature, i) => (
                  <div 
                    key={i}
                    className="group relative"
                    style={{
                      animation: 'fadeInUp 0.5s ease-out forwards',
                      animationDelay: `${i * 0.1}s`,
                      opacity: 0
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedProduct.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                    <div className="relative bg-white border-2 border-gray-100 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:border-primary-300 hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0">
                      <div className="text-2xl sm:text-3xl mb-1">{feature.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-1 text-[10px] sm:text-xs">{feature.label}</h3>
                      <p className="text-[9px] sm:text-xs text-gray-600 leading-tight">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(1);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-purple-600 to-gold-600 text-white">
        <div className="container-custom text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
            {t('hero.cta.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href={`/${locale}/contact/`} className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-primary-600 rounded-xl font-black text-base sm:text-lg hover:scale-105 sm:hover:scale-110 active:scale-95 transition-all shadow-2xl text-center">
              {tCommon('contactUs')}
            </Link>
            <Link href={`/${locale}/catalog/`} className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white/30 backdrop-blur-md border-2 border-white/60 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white/40 active:scale-95 transition-all shadow-lg text-center">
              {t('hero.cta.downloadCatalog')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
