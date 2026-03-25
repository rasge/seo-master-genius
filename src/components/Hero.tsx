

'use client';

import { useState } from 'react';

interface HeroProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export default function Hero({ onAnalyze, isAnalyzing }: HeroProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && url.length > 5) {
      onAnalyze(url);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-48 lg:pb-32 grid-background">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-16 w-96 h-96 bg-brand/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-slate-200 rounded-full blur-3xl animate-float"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl text-balance">
          {isAnalyzing ? "Analizando tu sitio web..." : "¿Quieres multiplicar las ventas de tu negocio con "}
          {!isAnalyzing && (
            <span className="text-brand relative inline-block">
              estrategias probadas?
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand-light/30 rounded-full"></span>
            </span>
          )}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
          {isAnalyzing 
            ? "Por favor espera mientras nuestros algoritmos de SEO Avanzado escanean tu dominio."
            : "Dile adiós a depender del boca a boca. Implementamos los sistemas de captación que están escalando a las marcas líderes."}
        </p>

        {!isAnalyzing && (
          <div className="mt-12 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-white/50 glass p-2 rounded-xl shadow-2xl border border-slate-200 focus-within:border-brand/40 transition-colors">
              <input
                type="url"
                placeholder="Escribe la URL de tu web (ej: https://tuweb.com)..."
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg bg-transparent border-0 focus:ring-0 text-slate-800 placeholder:text-slate-400 font-medium text-lg w-full outline-none"
                id="hero-url-input"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-brand text-white font-bold rounded-lg hover:bg-brand-light transition shadow-lg shadow-brand/20 active:scale-95 whitespace-nowrap text-lg"
              >
                ANÁLISIS GRATIS
              </button>
            </form>
            <p className="mt-4 text-sm text-slate-500 font-medium">
              Únete a +2,500 dueños de negocios obsesionados con el crecimiento.
            </p>
          </div>
        )}
        
        {!isAnalyzing && (
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 lg:gap-x-12 opacity-50 contrast-125">
            <span className="text-sm font-bold tracking-widest uppercase">Resultados</span>
            <span className="text-sm font-bold tracking-widest uppercase">SEO</span>
            <span className="text-sm font-bold tracking-widest uppercase">CRO</span>
            <span className="text-sm font-bold tracking-widest uppercase">COPY</span>
          </div>
        )}
      </div>
    </section>
  );
}
