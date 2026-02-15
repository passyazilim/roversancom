export const metadata = {
  title: 'Gizlilik Politikası - Roversan Gıda',
  description: 'Roversan Gıda gizlilik politikası ve kişisel verilerin korunması.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-2 mb-8">Gizlilik Politikası</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>
              Roversan Gıda olarak kişisel verilerinizin güvenliğine önem veriyor ve
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamındaki
              yükümlülüklerimizi yerine getiriyoruz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Toplanan Veriler
            </h2>
            <p>
              Web sitemiz aracılığıyla aşağıdaki kişisel veriler toplanabilir:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ad ve soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>İletişim mesajları</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Verilerin Kullanım Amacı
            </h2>
            <p>
              Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>İletişim taleplerinin yanıtlanması</li>
              <li>Ürün ve hizmet bilgilendirmesi</li>
              <li>Müşteri memnuniyetinin sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Verilerin Güvenliği
            </h2>
            <p>
              Kişisel verileriniz, yetkisiz erişim ve kullanıma karşı uygun güvenlik
              önlemleri ile korunmaktadır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Çerezler (Cookies)
            </h2>
            <p>
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanabilir.
              Tarayıcı ayarlarınızdan çerezleri kontrol edebilirsiniz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Haklarınız
            </h2>
            <p>
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen verilere ilişkin bilgi talep etme</li>
              <li>Verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini talep etme</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. İletişim
            </h2>
            <p>
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <p>
              <strong>E-posta:</strong> info@roversan.com<br />
              <strong>Telefon:</strong> +90 414 316 63 69
            </p>

            <p className="text-sm text-gray-600 mt-8">
              Son güncelleme: Ocak 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

