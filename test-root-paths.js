/**
 * Root Path Test Script
 * Bu script, dil root path'lerinin doğru çalışıp çalışmadığını test eder.
 */

const fs = require('fs');
const path = require('path');

// Test edilecek path'ler
const testPaths = [
  '/',
  '/tr/',
  '/en/',
  '/ar/',
  '/es/',
  '/tr',
  '/en',
  '/ar',
  '/es',
  '/invalid/',
  '/fr/', // Geçersiz dil
];

// Desteklenen diller
const supportedLocales = ['tr', 'en', 'ar', 'es'];
const defaultLocale = 'tr';

// Out klasöründeki dosyaları kontrol et
const outDir = path.join(__dirname, 'out');

console.log('🔍 Dil Root Path Testi Başlatılıyor...\n');
console.log('='.repeat(60));

// Test sonuçları
const results = {
  passed: [],
  failed: [],
  warnings: []
};

// Root path kontrolü
function checkRootPath() {
  console.log('\n📁 Root Path Kontrolü:');
  console.log('-'.repeat(60));
  
  // Root index.html var mı?
  const rootIndex = path.join(outDir, 'index.html');
  if (fs.existsSync(rootIndex)) {
    console.log('✅ Root index.html mevcut');
    results.passed.push('Root index.html mevcut');
    
    // Root index.html içeriğini kontrol et
    const content = fs.readFileSync(rootIndex, 'utf-8');
    if (content.includes('redirect') || content.includes('/tr/')) {
      console.log('✅ Root index.html redirect içeriyor');
      results.passed.push('Root index.html redirect içeriyor');
    } else {
      console.log('⚠️  Root index.html redirect içermiyor');
      results.warnings.push('Root index.html redirect içermiyor');
    }
  } else {
    console.log('❌ Root index.html bulunamadı');
    results.failed.push('Root index.html bulunamadı');
  }
}

// Dil path'lerini kontrol et
function checkLocalePaths() {
  console.log('\n🌍 Dil Path Kontrolü:');
  console.log('-'.repeat(60));
  
  supportedLocales.forEach(locale => {
    const localeDir = path.join(outDir, locale);
    const localeIndex = path.join(localeDir, 'index.html');
    
    if (fs.existsSync(localeDir) && fs.existsSync(localeIndex)) {
      console.log(`✅ /${locale}/ path'i mevcut`);
      results.passed.push(`/${locale}/ path'i mevcut`);
      
      // Index.html içeriğini kontrol et
      const content = fs.readFileSync(localeIndex, 'utf-8');
      if (content.length > 0) {
        console.log(`   └─ index.html içeriği: ${content.length} karakter`);
      }
    } else {
      console.log(`❌ /${locale}/ path'i bulunamadı`);
      results.failed.push(`/${locale}/ path'i bulunamadı`);
    }
  });
}

// Routing yapılandırmasını kontrol et
function checkRoutingConfig() {
  console.log('\n⚙️  Routing Yapılandırması Kontrolü:');
  console.log('-'.repeat(60));
  
  const routingFile = path.join(__dirname, 'src', 'i18n', 'routing.ts');
  if (fs.existsSync(routingFile)) {
    const content = fs.readFileSync(routingFile, 'utf-8');
    
    // localePrefix kontrolü
    if (content.includes("localePrefix: 'always'")) {
      console.log('✅ localePrefix: "always" ayarlanmış');
      results.passed.push('localePrefix: "always" ayarlanmış');
    } else {
      console.log('⚠️  localePrefix: "always" ayarlanmamış');
      results.warnings.push('localePrefix: "always" ayarlanmamış');
    }
    
    // defaultLocale kontrolü
    if (content.includes(`defaultLocale: '${defaultLocale}'`)) {
      console.log(`✅ defaultLocale: "${defaultLocale}" ayarlanmış`);
      results.passed.push(`defaultLocale: "${defaultLocale}" ayarlanmış`);
    } else {
      console.log(`⚠️  defaultLocale: "${defaultLocale}" ayarlanmamış`);
      results.warnings.push(`defaultLocale: "${defaultLocale}" ayarlanmamış`);
    }
    
    // locales kontrolü
    supportedLocales.forEach(locale => {
      if (content.includes(`'${locale}'`)) {
        console.log(`✅ Locale "${locale}" yapılandırmada mevcut`);
        results.passed.push(`Locale "${locale}" yapılandırmada mevcut`);
      } else {
        console.log(`❌ Locale "${locale}" yapılandırmada bulunamadı`);
        results.failed.push(`Locale "${locale}" yapılandırmada bulunamadı`);
      }
    });
  } else {
    console.log('❌ routing.ts dosyası bulunamadı');
    results.failed.push('routing.ts dosyası bulunamadı');
  }
}

// Root page.tsx kontrolü
function checkRootPage() {
  console.log('\n📄 Root Page Kontrolü:');
  console.log('-'.repeat(60));
  
  const rootPage = path.join(__dirname, 'src', 'app', 'page.tsx');
  if (fs.existsSync(rootPage)) {
    const content = fs.readFileSync(rootPage, 'utf-8');
    
    if (content.includes('redirect')) {
      console.log('✅ Root page.tsx redirect içeriyor');
      results.passed.push('Root page.tsx redirect içeriyor');
      
      // Redirect hedefini kontrol et
      if (content.includes(`'/tr/'`) || content.includes(`"/tr/"`)) {
        console.log('✅ Root page.tsx /tr/ ye redirect ediyor');
        results.passed.push('Root page.tsx /tr/ ye redirect ediyor');
      } else {
        console.log('⚠️  Root page.tsx /tr/ ye redirect etmiyor');
        results.warnings.push('Root page.tsx /tr/ ye redirect etmiyor');
      }
    } else {
      console.log('⚠️  Root page.tsx redirect içermiyor');
      results.warnings.push('Root page.tsx redirect içermiyor');
    }
  } else {
    console.log('❌ Root page.tsx bulunamadı');
    results.failed.push('Root page.tsx bulunamadı');
  }
}

// Sonuçları özetle
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Sonuçları Özeti:');
  console.log('='.repeat(60));
  
  console.log(`\n✅ Başarılı: ${results.passed.length}`);
  results.passed.forEach(item => {
    console.log(`   ✓ ${item}`);
  });
  
  if (results.warnings.length > 0) {
    console.log(`\n⚠️  Uyarılar: ${results.warnings.length}`);
    results.warnings.forEach(item => {
      console.log(`   ⚠ ${item}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log(`\n❌ Başarısız: ${results.failed.length}`);
    results.failed.forEach(item => {
      console.log(`   ✗ ${item}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  
  const totalTests = results.passed.length + results.warnings.length + results.failed.length;
  const successRate = ((results.passed.length / totalTests) * 100).toFixed(1);
  
  console.log(`\n📈 Başarı Oranı: ${successRate}%`);
  console.log(`   Toplam Test: ${totalTests}`);
  console.log(`   Başarılı: ${results.passed.length}`);
  console.log(`   Uyarı: ${results.warnings.length}`);
  console.log(`   Başarısız: ${results.failed.length}`);
  
  if (results.failed.length === 0) {
    console.log('\n🎉 Tüm kritik testler başarılı!');
  } else {
    console.log('\n⚠️  Bazı testler başarısız oldu. Lütfen kontrol edin.');
  }
}

// Testleri çalıştır
function runTests() {
  if (!fs.existsSync(outDir)) {
    console.log('❌ Out klasörü bulunamadı. Önce "npm run build" çalıştırın.');
    return;
  }
  
  checkRootPath();
  checkLocalePaths();
  checkRoutingConfig();
  checkRootPage();
  printSummary();
}

// Testleri başlat
runTests();

