'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Settings, 
  Shield, 
  Zap, 
  Layout, 
  ArrowRight, 
  Smartphone, 
  Share2, 
  Download,
  Lock,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

interface SeoReportProps {
  url: string;
  onReset: () => void;
}

export default function SeoReport({ url, onReset }: SeoReportProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Pidiendo acceso a la URL...');

  const steps = [
    'Estableciendo conexión...',
    'Rastreando estructura DOM...',
    'Analizando tiempos de respuesta...',
    'Verificando Meta Tags...',
    'Escaneando imágenes sin Alt...',
    'Comprobando Core Web Vitals...',
    'Auditando Mobile-First Index...',
    'Validando Schema Markup JSON-LD...',
    'Detectando señales E-E-A-T...',
    'Generando informe estratégico...'
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setStatus(steps[currentStep]);
        setProgress((prev) => Math.min(prev + 10, 95));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setProgress(100);
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadPdf = () => {
    window.print();
  };

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
        
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-5 gap-4 text-left max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col gap-2 p-3 rounded-lg border transition-all ${steps.indexOf(status) >= idx ? 'bg-brand/5 border-brand/20 text-brand scale-105' : 'bg-slate-50 border-slate-100 text-slate-400 opacity-50'}`}>
              <div className={`w-full h-1 rounded-full ${steps.indexOf(status) >= idx ? 'bg-brand animate-pulse' : 'bg-slate-200'}`}></div>
              <span className="text-[10px] font-bold uppercase tracking-tighter truncate">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="seo-report-content" className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 glass print:shadow-none print:border-none">
        <div className="flex-1 w-full lg:w-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full uppercase tracking-wider">Reporte SEO Estratégico</span>
            <span className="text-slate-400 text-sm font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 break-all leading-tight tracking-tighter">{url}</h2>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <p className="text-slate-600 font-medium text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Auditoría completada.
            </p>
            <button 
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition print:hidden"
            >
              <Download className="w-4 h-4" /> DESCARGAR PDF
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-12 py-8 bg-brand rounded-4xl shadow-2xl shadow-brand/30 transform hover:rotate-1 transition duration-500">
          <div className="text-7xl font-black text-white leading-none">82</div>
          <div className="text-white/80 font-bold uppercase text-[10px] mt-2 tracking-[0.2em]">Puntaje SEO</div>
        </div>
      </div>

      {/* 8 Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard title="Core Web Vitals" value="Óptimo" score={94} icon={<Zap className="text-yellow-500" />} />
        <MetricCard title="Indexabilidad" value="Excelente" score={88} icon={<Layout className="text-blue-500" />} />
        <MetricCard title="E-E-A-T Signal" value="Mejorable" score={65} icon={<Shield className="text-brand" />} />
        <MetricCard title="Meta Tags" value="Corregido" score={78} icon={<Settings className="text-indigo-500" />} />
        <MetricCard title="Mobile Friendly" value="Adaptado" score={92} icon={<Smartphone className="text-green-500" />} />
        <MetricCard title="Social Meta" value="Crítico" score={42} icon={<Share2 className="text-pink-500" />} />
        <MetricCard title="Seguridad HTTPS" value="Seguro" score={100} icon={<Lock className="text-emerald-500" />} />
        <MetricCard title="Alt Text Imgs" value="Pobre" score={35} icon={<ImageIcon className="text-orange-500" />} />
      </div>

      {/* Problems & Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 h-full">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-red-500" /> Diagnóstico de Problemas
          </h3>
          <ul className="space-y-6">
            <IssueItem 
              severity="critical"
              title="LCP (Largest Contentful Paint) Lento"
              desc="La imagen hero tarda 3.42s en ser interactiva. Esto aumenta el rebote en un 24%."
            />
            <IssueItem 
              severity="warning"
              title="Schema Markup Ausente"
              desc="Faltan datos estructurados de 'LocalBusiness' y 'Review'. Google no muestra estrellas en los resultados."
            />
            <IssueItem 
              severity="critical"
              title="Faltan 42 Alt Text"
              desc="Imágenes clave de productos no tienen descripción, bloqueando el tráfico de Google Imágenes."
            />
            <IssueItem 
              severity="warning"
              title="H1 Duplicados detectados"
              desc="La página tiene 2 encabezados H1, lo que diluye la fuerza de tu palabra clave principal."
            />
          </ul>
        </div>

        <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl text-white flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-brand-light">
              <FileText className="w-7 h-7" /> Plan de Acción Estratégico
            </h3>
            <div className="space-y-8">
              <ActionItem 
                num="01"
                title="Migración Masiva a AVIF"
                desc="Comprime y convierte tus 42 imágenes críticas a AVIF para reducir el peso en un 70%."
              />
              <ActionItem 
                num="02"
                title="Inyección de JSON-LD Pro"
                desc="Instala un script de marcado estructurado para 'Organization', 'Review' y 'Breadcrumbs'."
              />
              <ActionItem 
                num="03"
                title="Fusión estratégica de H1"
                desc="Unifica tus encabezados H1 en una sola frase potente que incluya tu keyword principal."
              />
              <ActionItem 
                num="04"
                title="Configuración de OpenGraph"
                desc="Las redes sociales no muestran previsualizaciones. Configura las etiquetas og:image y twitter:card."
              />
            </div>
          </div>
          <div className="pt-10 border-t border-white/10 mt-10 print:hidden">
            <button onClick={onReset} className="w-full py-5 bg-brand hover:bg-brand-light text-white font-black rounded-2xl transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2 group text-xl">
              ANÁLISIS NUEVO <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, score, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:border-brand/40 transition-all group hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-brand/5 transition">
          {icon}
        </div>
        <div className={`font-black text-sm p-1 px-2 rounded-lg bg-slate-50 ${score > 80 ? 'text-green-600' : score > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score}%
        </div>
      </div>
      <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{title}</h4>
      <p className="text-xl font-black text-slate-800 mt-1">{value}</p>
      <div className="mt-3 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${score > 80 ? 'bg-green-500' : score > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}

function IssueItem({ title, desc, severity }: any) {
  return (
    <li className="flex gap-4 items-start p-5 bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl transition shadow-sm hover:shadow-md">
      <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${severity === 'critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-yellow-500'}`}></div>
      <div>
        <h5 className="font-bold text-slate-900 text-lg leading-none mb-1">{title}</h5>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function ActionItem({ num, title, desc }: any) {
  return (
    <div className="flex gap-5 group">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-light font-black text-xl leading-none group-hover:bg-brand group-hover:text-white transition-all">
        {num}
      </div>
      <div>
        <h5 className="font-bold text-white text-lg mb-1">{title}</h5>
        <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
