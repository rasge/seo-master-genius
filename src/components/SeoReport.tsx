'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Search, Settings, Shield, Zap, Layout, ArrowRight } from 'lucide-react';

interface SeoReportProps {
  url: string;
  onReset: () => void;
}

export default function SeoReport({ url, onReset }: SeoReportProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Analizando estructura HTML...');

  const steps = [
    'Rastreando URL...',
    'Analizando estructura HTML...',
    'Verificando Meta Tags...',
    'Comprobando Core Web Vitals...',
    'Validando Schema Markup...',
    'Generando informe final...'
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setStatus(steps[currentStep]);
        setProgress((prev) => Math.min(prev + 15, 95));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setProgress(100);
        }, 800);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="relative inline-block mb-10">
          <div className="w-32 h-32 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-brand">
            {progress}%
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 animate-pulse">
          Escaneando: <span className="text-brand break-all">{url}</span>
        </h2>
        <p className="text-slate-500 font-medium text-lg">{status}</p>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${steps.indexOf(status) >= idx ? 'bg-brand/5 border-brand/20 text-brand' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
              <div className={`w-2 h-2 rounded-full ${steps.indexOf(status) >= idx ? 'bg-brand animate-pulse' : 'bg-slate-300'}`}></div>
              <span className="text-sm font-semibold">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 glass">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full uppercase tracking-wider">Reporte SEO</span>
            <span className="text-slate-400 text-sm font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 break-all">{url}</h2>
          <p className="mt-2 text-slate-600 font-medium text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Auditoría completada con éxito.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center px-10 py-6 bg-brand rounded-3xl shadow-2xl shadow-brand/30 transform hover:scale-105 transition duration-300">
          <div className="text-6xl font-black text-white leading-none">82</div>
          <div className="text-white/80 font-bold uppercase text-xs mt-2 tracking-widest">Puntaje SEO</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard title="Core Web Vitals" value="Óptimo" score={94} icon={<Zap className="text-yellow-500" />} />
        <MetricCard title="Indexabilidad" value="Excelente" score={88} icon={<Layout className="text-blue-500" />} />
        <MetricCard title="E-E-A-T Signal" value="Mejorable" score={65} icon={<Shield className="text-brand" />} />
        <MetricCard title="Meta Tags" value="Corregido" score={78} icon={<Settings className="text-indigo-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-red-500" /> Problemas Críticos
          </h3>
          <ul className="space-y-4">
            <IssueItem 
              severity="critical"
              title="LCP (Largest Contentful Paint) Lento"
              desc="La imagen principal tarda más de 3.2s en cargar. Impacta negativamente en el posicionamiento móvil."
            />
            <IssueItem 
              severity="warning"
              title="Falta de Schema Markup"
              desc="No se detectó JSON-LD de tipo 'Organization'. Google no entiende quién eres."
            />
            <IssueItem 
              severity="warning"
              title="Meta Descripción Duplicada"
              desc="8 páginas tienen la misma meta descripción. Canibalización detectada."
            />
          </ul>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-brand-light">
            <Search className="w-7 h-7" /> Plan de Acción
          </h3>
          <div className="space-y-6">
            <ActionItem 
              num="01"
              title="Optimizar Imágenes Críticas"
              desc="Cambia todas las imágenes de portada a formato WebP y usa Next/Image."
            />
            <ActionItem 
              num="02"
              title="Implementar Schema Pro"
              desc="Inyecta marcado estructurado para capturar el Knowledge Panel de Google."
            />
            <div className="pt-6 border-t border-white/10 mt-6">
              <button onClick={onReset} className="w-full py-4 bg-brand hover:bg-brand-light text-white font-black rounded-xl transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2 group">
                RE-ANALIZAR OTRO SITIO <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, score, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-brand/30 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-brand/5 transition">
          {icon}
        </div>
        <div className={`font-bold text-lg ${score > 80 ? 'text-green-500' : score > 60 ? 'text-yellow-500' : 'text-red-500'}`}>
          {score}%
        </div>
      </div>
      <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest">{title}</h4>
      <p className="text-xl font-black text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function IssueItem({ title, desc, severity }: any) {
  return (
    <li className="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition">
      <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
      <div>
        <h5 className="font-bold text-slate-900 leading-none mb-1">{title}</h5>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function ActionItem({ num, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <div className="text-brand-light font-black text-2xl leading-none opacity-50">{num}</div>
      <div>
        <h5 className="font-bold text-white mb-1">{title}</h5>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
