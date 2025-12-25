
import React from 'react';
import { Play, ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const handleTestRequest = () => {
    const message = "Olá! Vi o site e gostaria de solicitar um teste grátis de 6 horas no Guito Plus.";
    const whatsappUrl = `https://wa.me/5598982804577?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center pt-24 md:pt-28">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1593784991095-a205029471b6?q=80&w=2500&auto=format&fit=crop" 
          alt="Guito Plus Cinematic Experience" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        {/* Layered Overlays for maximum readability and "Netflix" feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        {/* Vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="max-w-4xl space-y-8 md:space-y-12 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-red-600/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-red-600/30">
            <Sparkles size={14} className="text-red-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.25em]">
              Sinal 4K HDR • Estabilidade Guito Serve
            </span>
          </div>
          
          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tighter text-white">
              LIBERTE O SEU <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-800">
                ENTRETENIMENTO.
              </span>
            </h1>
            <p className="text-base md:text-2xl text-gray-300 leading-relaxed max-w-3xl font-medium">
              Milhares de canais, filmes e séries sem travamentos. A evolução do IPTV chegou com tecnologia de ponta e o conforto do cinema no seu sofá.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-3 bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(220,38,38,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-600 focus-visible:ring-opacity-50"
            >
              <Play fill="white" size={24} className="group-hover:scale-110 transition-transform" /> 
              COMEÇAR AGORA
            </button>
            <button 
              onClick={handleTestRequest}
              className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-2xl text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-opacity-20"
            >
              TESTE DE 6 HORAS
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-10 md:gap-16 pt-12 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-white">4K UHD</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-600">Qualidade</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-white">24/7</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-600">Suporte Real</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black text-white">0%</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-600">Fidelidade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-40 hidden lg:flex">
        <span className="text-[10px] uppercase tracking-[0.5em] font-black">Explorar Catálogo</span>
        <ChevronDown size={24} className="text-red-600" />
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s infinite alternate ease-in-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default Hero;
