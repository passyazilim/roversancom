# PHP Backend Kurulum Talimatları

## ✅ Hazır!

PHP backend çözümü hazır. Hostinger'da PHP desteği olduğu için bu çözüm en uygunudur.

## 📁 Dosya Yapısı

Build sonrası `out/` klasöründe:
```
out/
  ├── api/
  │   └── contact.php  ← Bu dosya Hostinger'a yüklenecek
  ├── index.html
  └── ...
```

## 🚀 Hostinger'a Yükleme

### 1. Build Yapın

```bash
npm run build
```

### 2. Dosyaları Yükleyin

1. `out/` klasöründeki **tüm dosyaları** Hostinger `public_html` klasörüne yükleyin
2. `out/api/contact.php` dosyasının da yüklendiğinden emin olun

### 3. Test Edin

Formu test edin. Email'ler `info@roversan.com` adresine gönderilecektir.

## ⚙️ Email Ayarları

PHP dosyasında mevcut email ayarlarınız kullanılıyor:
- **SMTP Host:** srvc92.trwww.com
- **Port:** 465
- **Username:** contact@roversan.com
- **From:** contact@roversan.com
- **To:** info@roversan.com

Bu ayarlar `public/api/contact.php` dosyasında mevcuttur.

## 🔧 Sorun Giderme

### PHP mail() çalışmıyorsa

Hostinger'da `mail()` fonksiyonu çalışmıyorsa, PHPMailer versiyonunu kullanabilirsiniz:

1. `contact-phpmailer.php` dosyasını `contact.php` olarak yeniden adlandırın
2. Hostinger'da PHPMailer'in yüklü olduğundan emin olun

### CORS Hatası Alıyorsanız

PHP dosyasında CORS headers zaten var. Yine de sorun yaşıyorsanız, `.htaccess` dosyası ekleyin:

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

### Email Gidmiyorsa

1. Hostinger'da email gönderme izinlerini kontrol edin
2. SMTP ayarlarının doğru olduğundan emin olun
3. Spam klasörünü kontrol edin

## 📝 Önemli Notlar

1. **Güvenlik:** PHP dosyasındaki şifreler production'da güvenli bir şekilde saklanmalıdır. Şimdilik kod içinde mevcut.

2. **Fallback:** Form gönderimi başarısız olursa, otomatik olarak mailto link açılır.

3. **Validation:** Hem frontend hem backend'de validation yapılıyor.

## ✅ Avantajları

- ✅ Ücretsiz (Hostinger'da PHP zaten mevcut)
- ✅ Kendi sunucunuzda çalışır
- ✅ Hızlı ve güvenilir
- ✅ Ek servis gerektirmez
- ✅ Spam koruması eklenebilir

## 🎉 Hazır!

Build yapıp Hostinger'a yükleyebilirsiniz. Form otomatik olarak çalışacaktır!

