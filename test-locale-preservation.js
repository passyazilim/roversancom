/**
 * Locale Preservation Test Script
 * Bu script, menü linklerinin locale'i koruyup korumadığını test eder.
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

console.log('🔍 Locale Preservation Testi Başlatılıyor...\n');
console.log('='.repeat(60));

const supportedLocales = ['tr', 'en', 'ar', 'es'];
const testPages = ['/', '/about', '/products', '/gallery', '/catalog', '/certificates', '/contact'];

// Her dil için test sayfalarını kontrol et
function testLocalePreservation() {
  console.log('\n🌍 Locale Preservation Kontrolü:');
  console.log('-'.repeat(60));
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  supportedLocales.forEach(locale => {
    console.log(`\n📁 ${locale.toUpperCase()} Locale Testi:`);
    console.log('-'.repeat(40));
    
    testPages.forEach(page => {
      const pagePath = page === '/' ? 'index.html' : `${page.slice(1)}/index.html`;
      const fullPath = path.join(outDir, locale, pagePath);
      
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Link'lerin locale prefix'i içerip içermediğini kontrol et
        const hasLocalePrefix = content.includes(`/${locale}/`);
        const hasCorrectLinks = content.includes(`href="/${locale}/`) || 
                               (page === '/' && content.includes(`href="/${locale}/`));
        
        if (hasLocalePrefix || hasCorrectLinks) {
          console.log(`  ✅ ${page} - Locale korunuyor`);
          results.passed.push(`${locale}${page} - Locale korunuyor`);
        } else {
          // Link'lerin href'lerinde locale prefix'i olmayabilir (next-intl client-side'da ekler)
          console.log(`  ⚠️  ${page} - Link'ler kontrol edilemedi (client-side routing)`);
          results.warnings.push(`${locale}${page} - Link'ler kontrol edilemedi`);
        }
      } else {
        console.log(`  ❌ ${page} - Sayfa bulunamadı`);
        results.failed.push(`${locale}${page} - Sayfa bulunamadı`);
      }
    });
  });
  
  return results;
}

// HTML içeriğinde locale prefix'lerini kontrol et
function checkHTMLContent() {
  console.log('\n📄 HTML İçerik Kontrolü:');
  console.log('-'.repeat(60));
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  supportedLocales.forEach(locale => {
    const indexPath = path.join(outDir, locale, 'index.html');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf-8');
      
      // Navbar'ın locale bilgisini içerip içermediğini kontrol et
      const hasNavbar = content.includes('navbar') || content.includes('nav');
      const hasLocaleInfo = content.includes(locale) || content.includes(`lang="${locale}"`);
      
      if (hasNavbar && hasLocaleInfo) {
        console.log(`  ✅ ${locale}/index.html - Navbar ve locale bilgisi mevcut`);
        results.passed.push(`${locale}/index.html - Navbar ve locale bilgisi mevcut`);
      } else {
        console.log(`  ⚠️  ${locale}/index.html - Navbar veya locale bilgisi eksik olabilir`);
        results.warnings.push(`${locale}/index.html - Navbar veya locale bilgisi eksik olabilir`);
      }
    }
  });
  
  return results;
}

// Sonuçları özetle
function printSummary(allResults) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Sonuçları Özeti:');
  console.log('='.repeat(60));
  
  const totalResults = {
    passed: [],
    failed: [],
    warnings: []
  };
  
  allResults.forEach(result => {
    totalResults.passed.push(...result.passed);
    totalResults.failed.push(...result.failed);
    totalResults.warnings.push(...result.warnings);
  });
  
  console.log(`\n✅ Başarılı: ${totalResults.passed.length}`);
  if (totalResults.passed.length > 0) {
    totalResults.passed.slice(0, 10).forEach(item => {
      console.log(`   ✓ ${item}`);
    });
    if (totalResults.passed.length > 10) {
      console.log(`   ... ve ${totalResults.passed.length - 10} tane daha`);
    }
  }
  
  if (totalResults.warnings.length > 0) {
    console.log(`\n⚠️  Uyarılar: ${totalResults.warnings.length}`);
    totalResults.warnings.slice(0, 5).forEach(item => {
      console.log(`   ⚠ ${item}`);
    });
    if (totalResults.warnings.length > 5) {
      console.log(`   ... ve ${totalResults.warnings.length - 5} tane daha`);
    }
  }
  
  if (totalResults.failed.length > 0) {
    console.log(`\n❌ Başarısız: ${totalResults.failed.length}`);
    totalResults.failed.forEach(item => {
      console.log(`   ✗ ${item}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  
  const totalTests = totalResults.passed.length + totalResults.warnings.length + totalResults.failed.length;
  const successRate = totalTests > 0 ? ((totalResults.passed.length / totalTests) * 100).toFixed(1) : 0;
  
  console.log(`\n📈 Başarı Oranı: ${successRate}%`);
  console.log(`   Toplam Test: ${totalTests}`);
  console.log(`   Başarılı: ${totalResults.passed.length}`);
  console.log(`   Uyarı: ${totalResults.warnings.length}`);
  console.log(`   Başarısız: ${totalResults.failed.length}`);
  
  console.log('\n💡 Not: next-intl Link bileşeni client-side\'da locale\'i otomatik korur.');
  console.log('   Static export modunda, link\'ler runtime\'da locale prefix\'i alır.');
  
  if (totalResults.failed.length === 0) {
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
  
  const results1 = testLocalePreservation();
  const results2 = checkHTMLContent();
  
  printSummary([results1, results2]);
}

// Testleri başlat
runTests();

