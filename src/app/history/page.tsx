
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  ArrowLeft,
  Calendar,
  LayoutGrid,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface Analysis {
  id: string;
  domain: string;
  url: string;
  score_overall: number;
  created_at: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
}

export default function HistoryPage() {
  const { user, supabase, loading: authLoading } = useAuth();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      // Fetch all analyses
      const { data } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setAnalyses(data || []);
      setLoading(false);
    };

    fetchData();
  }, [user, authLoading, supabase, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onReset={() => router.push('/')} navigateTo={() => router.push('/')} />
      
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation / Header */}
        <div className="mb-10">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand font-bold text-sm transition transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4" /> VOLVER AL DASHBOARD
          </Link>
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 leading-tight">
                Historial de <span className="text-brand">Análisis</span>
              </h1>
              <p className="text-slate-500 font-medium mt-1">Explora cada auditoría realizada en tu cuenta.</p>
            </div>
            <div className="flex bg-white/50 backdrop-blur rounded-2xl p-1 border border-slate-100 shadow-sm self-start">
              <button className="px-4 py-2 bg-white rounded-xl shadow-sm text-brand font-bold text-sm flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> VISTA LISTA
              </button>
            </div>
          </div>
        </div>

        {/* Extended History Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden glass">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Dominio / URL</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Auditado el</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Score Global</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Estado</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analyses.length > 0 ? (
                  analyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 break-all">{analysis.domain || analysis.url}</span>
                          <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">{analysis.url}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-300" />
                          {new Date(analysis.created_at).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <ScoreBadge score={analysis.score_overall} size="lg" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <StatusIndicator status={analysis.status} />
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/analysis/${analysis.id}`}
                            className="p-3 bg-brand/5 text-brand rounded-2xl hover:bg-brand hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-md shadow-brand/5"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-32 text-center">
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                          <Clock className="w-12 h-12 text-slate-200" />
                        </div>
                        <div className="max-w-xs mx-auto">
                          <h3 className="text-lg font-bold text-slate-900">Sin historial aún</h3>
                          <p className="text-slate-400 font-medium mt-1">Comienza tu primera auditoría ahora para generar crecimiento inteligente.</p>
                        </div>
                        <Link 
                          href="/"
                          className="px-8 py-4 bg-brand text-white font-black rounded-2xl shadow-xl shadow-brand/20 hover:bg-brand-light transition transform hover:scale-105"
                        >
                          CERRAR PRIMER TRATO SEO
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ScoreBadge({ score, size = 'sm' }: { score: number, size?: 'sm'|'lg' }) {
  if (!score) return <span className="text-slate-300 font-bold">-</span>;
  
  const color = score >= 80 ? 'bg-green-100 text-green-700 shadow-green-200/50' : score >= 50 ? 'bg-yellow-100 text-yellow-700 shadow-yellow-200/50' : 'bg-red-100 text-red-700 shadow-red-200/50';
  
  return (
    <div className={`inline-flex items-center justify-center font-black rounded-2xl shadow-lg border border-white/50 ${size === 'lg' ? 'w-14 h-14 text-lg' : 'px-3 py-1.5 text-xs'} ${color}`}>
      {score}%
    </div>
  );
}

function StatusIndicator({ status }: { status: Analysis['status'] }) {
  const configs: Record<string, { color: string; text: string; pulse: boolean }> = {
    completed: { color: 'bg-green-500', text: 'LISTO', pulse: false },
    running: { color: 'bg-blue-500', text: 'EN PROGRESO', pulse: true },
    pending: { color: 'bg-slate-300', text: 'PENDIENTE', pulse: false },
    failed: { color: 'bg-red-500', text: 'ERROR', pulse: false }
  };

  const config = configs[status] || configs.pending;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-2.5 h-2.5 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}></div>
      <span className="text-[10px] font-black text-slate-400 tracking-tighter uppercase">{config.text}</span>
    </div>
  );
}
