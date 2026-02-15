export default function FlavorWave() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* 1) Turuncu-Kırmızı Meyve Dalgası - Frutti (Soft, Yatay Geniş, Slow Oscillation) */}
      <div className="absolute -top-20 left-0 w-[120%] h-[280px] bg-gradient-to-r from-orange-400/40 via-red-400/35 to-yellow-400/40 rounded-full blur-[100px] animate-waveSlow" />
      <div className="absolute top-96 -left-10 w-[130%] h-[260px] bg-gradient-to-r from-orange-300/30 via-yellow-300/25 to-orange-400/30 rounded-full blur-[90px] animate-waveSlow" style={{animationDelay: '2s'}} />
      <div className="absolute top-[800px] left-0 w-[125%] h-[270px] bg-gradient-to-r from-orange-400/35 via-red-300/30 to-yellow-400/35 rounded-full blur-[100px] animate-waveSlow" style={{animationDelay: '4s'}} />
      <div className="absolute top-[200px] -left-5 w-[128%] h-[250px] bg-gradient-to-r from-orange-500/30 via-red-500/25 to-yellow-500/30 rounded-full blur-[110px] animate-waveSlow" style={{animationDelay: '1s'}} />
      
      {/* 2) Mavi-Mor Premium Dalga - Keita (Daha İnce, Hafif Parlayan, Linear Movement) */}
      <div className="absolute top-40 -left-20 w-[140%] h-[240px] bg-gradient-to-r from-blue-400/35 via-indigo-400/30 to-purple-400/35 rounded-full blur-[100px] animate-waveMedium" />
      <div className="absolute top-[500px] left-0 w-[125%] h-[230px] bg-gradient-to-r from-blue-300/30 via-cyan-300/25 to-indigo-300/30 rounded-full blur-[90px] animate-waveMedium" style={{animationDelay: '1s'}} />
      <div className="absolute top-[900px] -left-15 w-[135%] h-[235px] bg-gradient-to-r from-blue-400/32 via-indigo-300/28 to-purple-400/32 rounded-full blur-[100px] animate-waveMedium" style={{animationDelay: '3s'}} />
      <div className="absolute top-[350px] -left-10 w-[132%] h-[220px] bg-gradient-to-r from-blue-500/28 via-indigo-500/23 to-purple-500/28 rounded-full blur-[95px] animate-waveMedium" style={{animationDelay: '2s'}} />
      
      {/* 3) Pembe-Mor Özel Seri Dalga - Shirino (Daha Küçük, Hafif Yukarı-Aşağı) */}
      <div className="absolute top-72 left-10 w-[110%] h-[220px] bg-gradient-to-r from-pink-400/35 via-fuchsia-400/30 to-purple-400/35 rounded-full blur-[100px] animate-waveFast" />
      <div className="absolute top-[600px] -left-15 w-[115%] h-[210px] bg-gradient-to-r from-pink-300/30 via-purple-300/25 to-fuchsia-300/30 rounded-full blur-[90px] animate-waveFast" style={{animationDelay: '0.5s'}} />
      <div className="absolute top-[1000px] left-5 w-[112%] h-[215px] bg-gradient-to-r from-pink-400/32 via-fuchsia-300/28 to-purple-400/32 rounded-full blur-[100px] animate-waveFast" style={{animationDelay: '1.5s'}} />
      <div className="absolute top-[450px] left-8 w-[118%] h-[200px] bg-gradient-to-r from-pink-500/28 via-fuchsia-500/23 to-purple-500/28 rounded-full blur-[95px] animate-waveFast" style={{animationDelay: '2.5s'}} />
      
      {/* Amber Wave - Hazır Kahve */}
      <div className="absolute top-[300px] -left-8 w-[122%] h-[240px] bg-gradient-to-r from-amber-400/30 via-orange-400/25 to-amber-500/30 rounded-full blur-[100px] animate-waveSlow" style={{animationDelay: '0.5s'}} />
      <div className="absolute top-[700px] left-0 w-[120%] h-[230px] bg-gradient-to-r from-amber-300/25 via-orange-300/20 to-amber-400/25 rounded-full blur-[90px] animate-waveMedium" style={{animationDelay: '1.5s'}} />
    </div>
  );
}

