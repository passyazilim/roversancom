export const metadata = {
  title: 'Kullanım Koşulları - Roversan Gıda',
  description: 'Roversan Gıda web sitesi kullanım koşulları.',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-2 mb-8">Kullanım Koşulları</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>
              Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş
              sayılırsınız. Lütfen koşulları dikkatlice okuyunuz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              1. Genel Kullanım
            </h2>
            <p>
              Bu web sitesi Roversan Gıda tarafından işletilmektedir. Site içeriği
              yalnızca bilgilendirme amaçlıdır ve önceden haber verilmeksizin
              değiştirilebilir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              2. Fikri Mülkiyet Hakları
            </h2>
            <p>
              Bu web sitesinde yer alan tüm içerik, tasarım, logo, metin, görsel ve
              diğer materyaller Roversan Gıda'nın mülkiyetindedir ve telif hakları
              ile korunmaktadır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              3. Kullanım Kısıtlamaları
            </h2>
            <p>
              Web sitesini aşağıdaki amaçlarla kullanmamanız gerekmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Yasadışı veya yetkisiz amaçlar için</li>
              <li>Başkalarının haklarını ihlal edecek şekilde</li>
              <li>Zararlı yazılım veya virüs yaymak için</li>
              <li>Site güvenliğini tehdit edecek şekilde</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              4. Ürün Bilgileri
            </h2>
            <p>
              Web sitesinde yer alan ürün bilgileri ve fiyatlar bilgilendirme amaçlıdır.
              Roversan Gıda, ürün özelliklerini ve fiyatları önceden haber vermeksizin
              değiştirme hakkını saklı tutar.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              5. Üçüncü Taraf Bağlantıları
            </h2>
            <p>
              Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir.
              Bu sitelerin içeriğinden Roversan Gıda sorumlu değildir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              6. Sorumluluk Sınırlaması
            </h2>
            <p>
              Roversan Gıda, web sitesinin kullanımından kaynaklanan doğrudan veya
              dolaylı zararlardan sorumlu tutulamaz.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              7. Değişiklikler
            </h2>
            <p>
              Roversan Gıda, bu kullanım koşullarını herhangi bir zamanda güncelleme
              hakkını saklı tutar. Değişiklikler bu sayfada yayınlanacaktır.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              8. Uygulanacak Hukuk
            </h2>
            <p>
              Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir.
              Olası uyuşmazlıklarda Şanlıurfa mahkemeleri ve icra daireleri yetkilidir.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              9. İletişim
            </h2>
            <p>
              Kullanım koşulları hakkında sorularınız için:
            </p>
            <p>
              <strong>Roversan Gıda</strong><br />
              GAP Gıda İmalatçılar Sitesi 1.Cad. No:18<br />
              Eyyübiye / Şanlıurfa / Türkiye<br />
              <strong>E-posta:</strong> info@roversan.com<br />
              <strong>Telefon:</strong> +90 414 316 63 69<br />
              <strong>Faks:</strong> +90 542 721 32 29
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

