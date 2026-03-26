'use client';

import { useState, useCallback } from 'react';
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
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import Link from 'next/link';

export default function Home() {
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const { user } = useAuth();
  const supabase = createClient();

  const handleAnalyze = async (url: string) => {
    setAnalyzingUrl(url);
    setShowReport(true); // Mostrar reporte inmediatamente (él maneja la simulación)
    
    // 1. Create analysis entry in Supabase (PENDING)
    try {
      const { data } = await supabase
        .from('analyses')
        .insert({
          url,
          user_id: user?.id || null,
          status: 'pending',
          domain: new URL(url).hostname.replace('www.', '')
        })
        .select()
        .single();
      
      if (data) {
        setAnalysisId(data.id);
      }
    } catch (e) {
      console.error("Error creating analysis record:", e);
    }
  };

  const handleReset = useCallback(() => {
    setAnalyzingUrl(null);
    setAnalysisId(null);
    setShowReport(false);
  }, []);

  const navigateTo = useCallback((id: string) => {
    handleReset();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  }, [handleReset]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar onReset={handleReset} navigateTo={navigateTo} />

      {/* Secciones de la Landing */}
      {analyzingUrl ? (
        <div className="pt-16 min-h-screen">
          {showReport ? (
            <SeoReport 
              url={analyzingUrl} 
              analysisId={analysisId}
              onReset={handleReset} 
            />
          ) : (
            <Hero onAnalyze={handleAnalyze} isAnalyzing={true} />
          )}
        </div>
      ) : (
        <>
          {!user ? (
            <div className="relative isolate pt-14">
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand to-brand-light opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
              </div>
              
              <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                  <div className="flex">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20 font-bold mb-8">
                      REPORTE SEO 2026 REVELADO. <Link href="/auth" className="font-black text-brand"><span className="absolute inset-0" aria-hidden="true" />Leer más <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                  </div>
                  <h1 className="mt-10 text-4xl font-black tracking-tighter text-slate-900 sm:text-7xl uppercase leading-[0.9]">
                    Escala tu Negocio al <span className="text-brand">Siguiente Nivel</span>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-slate-600 font-medium">
                    Analizamos tu web, detectamos fallos y te damos el plan exacto para dominar Google. Únete a los 2,500+ empresarios que ya están creciendo.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      href="/auth"
                      className="rounded-xl bg-brand px-8 py-4 text-lg font-black text-white shadow-2xl shadow-brand/30 hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-all hover:translate-y-[-2px]"
                    >
                      REGISTRARME GRATIS
                    </Link>
                    <Link href="/auth" className="text-sm font-black leading-6 text-slate-900 uppercase tracking-widest">
                      Ya tengo cuenta <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                  <div className="relative mx-auto max-w-[500px] lg:max-w-none">
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                       <div className="flex items-center gap-2 mb-6">
                         <div className="w-3 h-3 rounded-full bg-red-400"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                         <div className="w-3 h-3 rounded-full bg-green-400"></div>
                       </div>
                       <div className="space-y-4">
                         <div className="h-4 w-3/4 bg-slate-100 rounded-full"></div>
                         <div className="h-4 w-full bg-slate-100 rounded-full"></div>
                         <div className="h-20 w-full bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center">
                            <span className="text-brand font-black text-2xl animate-pulse">89% SEO SCORE</span>
                         </div>
                         <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Hero onAnalyze={handleAnalyze} isAnalyzing={false} />
          )}
          
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
