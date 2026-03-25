'use client';

import { useState } from 'react';
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SeoReport from "@/components/SeoReport";

export default function Home() {
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleAnalyze = (url: string) => {
    setAnalyzingUrl(url);
    setShowReport(false);
    
    // Simulate report generation timing
    setTimeout(() => {
      setShowReport(true);
    }, 8500); // 8.5 seconds of "analysis" simulation
  };

  const handleReset = () => {
    setAnalyzingUrl(null);
    setShowReport(false);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Glass Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 glass border-b border-slate-200/50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex shrink-0 items-center cursor-pointer" onClick={handleReset}>
              <span className="text-2xl font-black tracking-tighter text-slate-900 group">
                Libertd<span className="text-brand group-hover:text-brand-light transition-colors">PRO</span>
                <span className="ml-1 inline-block w-1.5 h-1.5 bg-brand rounded-full"></span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-sm font-bold text-slate-600 hover:text-brand transition">Servicios</a>
              <a href="#proceso" className="text-sm font-bold text-slate-600 hover:text-brand transition">Método</a>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-sm bg-brand px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-brand-light transition"
              >
                Auditoría Gratis
              </button>
            </div>
            
            <div className="md:hidden">
              <button className="p-2 text-slate-600" id="mobile-menu-toggle">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secciones de la Landing */}
      {analyzingUrl ? (
        <div className="pt-16 min-h-screen">
          {showReport ? (
            <SeoReport url={analyzingUrl} onReset={handleReset} />
          ) : (
            <Hero onAnalyze={handleAnalyze} isAnalyzing={true} />
          )}
        </div>
      ) : (
        <>
          <Hero onAnalyze={handleAnalyze} isAnalyzing={false} />
          <ClientLogos />
          <section id="servicios">
            <Services />
          </section>
          <Stats />
          <section id="proceso">
            <Process />
          </section>
          <Testimonials />
          <BlogSection />
          <CTASection />
        </>
      )}
      
      <Footer />
    </main>
  );
}
