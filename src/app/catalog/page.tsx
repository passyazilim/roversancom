import { FaDownload, FaFileAlt, FaBox, FaCheckCircle } from 'react-icons/fa'
import Image from 'next/image'

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{
          backgroundImage: "url(/images/background/katalog.png)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/75 to-gold-900/85"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaFileAlt className="text-6xl" />
          </div>
          <h1 className="heading-1 text-white mb-6">
            Ürün Kataloğu
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Tüm ürünlerimizi detaylı olarak inceleyin. PDF formatında kataloğumuzu indirerek ürün bilgilerine ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Catalog Download Section */}
      <section className="section-padding">
        <div className="container-custom max-w-7xl">
          {/* Main Catalog Card - Perfectly Symmetric */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-16">
            <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
              {/* Left Side - Info - Symmetric Padding */}
              <div className="p-12 md:p-16 flex flex-col justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <FaFileAlt className="text-white text-5xl" />
                </div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Roversan Gıda Kataloğu</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Tüm ürün gamımızı, teknik özellikleri ve ambalaj seçeneklerini içeren detaylı kataloğumuzu indirin.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-primary-600 mr-4 text-xl flex-shrink-0" />
                    <span className="text-lg">Frutti, Keita, Shirino toz içecekler</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-primary-600 mr-4 text-xl flex-shrink-0" />
                    <span className="text-lg">Brawoo ve Frutti kahve ürünleri</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-primary-600 mr-4 text-xl flex-shrink-0" />
                    <span className="text-lg">Buzlaş makineleri ve ekipmanlar</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-primary-600 mr-4 text-xl flex-shrink-0" />
                    <span className="text-lg">Teknik özellikler ve ambalaj bilgileri</span>
                  </li>
                </ul>
                <a 
                  href="/images/katalog/roversan-katalog.pdf" 
                  download="Roversan_Gida_Katalog.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <FaDownload className="text-xl" />
                  <span>Kataloğu İndir (PDF)</span>
                </a>
              </div>

              {/* Right Side - All Products Image - Symmetric Padding */}
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 p-12 md:p-16 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0aDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                
                {/* All Products Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src="/images/products/tum-urunler-3.jpg" 
                    alt="Tüm Ürünler"
                    className="w-full h-full object-contain rounded-2xl shadow-2xl"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gold-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl">
                  50+ Ürün
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards - Perfectly Symmetric Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaBox className="text-white text-4xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">50+ Ürün</h3>
              <p className="text-gray-600 leading-relaxed">
                Geniş ürün yelpazemiz ile tüm ihtiyaçlarınıza cevap veriyoruz.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaFileAlt className="text-white text-4xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Detaylı Bilgi</h3>
              <p className="text-gray-600 leading-relaxed">
                Her ürün için teknik özellikler ve kullanım bilgileri.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaDownload className="text-white text-4xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Kolay Erişim</h3>
              <p className="text-gray-600 leading-relaxed">
                PDF formatında indirip dilediğiniz zaman inceleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Preview Section - Centered & Professional */}
      <section className="section-padding bg-gradient-to-b from-white via-primary-50 to-white relative overflow-hidden py-20">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom max-w-6xl relative z-10">
          {/* Section Header - Centered */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Katalog Önizlemesi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aşağıda kataloğumuzu inceleyebilir veya PDF olarak indirebilirsiniz
            </p>
          </div>

          {/* PDF Preview - Centered */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="p-6 md:p-8 bg-gradient-to-r from-primary-600 via-primary-700 to-gold-600 text-white relative overflow-hidden border-b border-primary-500">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0aDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnptMCAwaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
              <div className="relative z-10 flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaFileAlt className="text-4xl text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold">PDF Katalog</h3>
                  <p className="text-white/90 text-sm mt-1">İnteraktif önizleme</p>
                </div>
              </div>
            </div>
            <div className="relative bg-gray-50 p-6" style={{ height: '80vh', minHeight: '600px' }}>
              <iframe
                src="/images/katalog/roversan-katalog.pdf"
                className="w-full h-full border-0 rounded-xl shadow-inner bg-white"
                title="Roversan Gıda Kataloğu Önizlemesi"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Centered & Professional */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-20">
        <div className="container-custom max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 md:p-16 text-center text-white border border-white/20 shadow-2xl">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FaFileAlt className="text-5xl text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-6">Detaylı Bilgi İçin</h3>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ürünlerimiz hakkında daha fazla bilgi almak veya fiyat teklifi için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="btn-secondary bg-white text-primary-600 border-white hover:bg-primary-50 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                Tüm Ürünleri Gör
              </a>
              <a href="/contact" className="px-8 py-4 bg-white/30 backdrop-blur-md border-2 border-white/60 text-white rounded-xl font-semibold hover:bg-white/40 transition-all shadow-lg hover:shadow-xl text-lg">
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
