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
