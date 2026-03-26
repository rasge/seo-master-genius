
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Clock, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, supabase, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 });
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      // Fetch stats
      const { count: total } = await supabase
        .from('analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      const { count: thisMonth } = await supabase
        .from('analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', firstDayOfMonth);

      setStats({ 
        total: total || 0, 
        thisMonth: thisMonth || 0 
      });

      // Fetch recent analyses
      const { data } = await supabase
        .from('analyses')
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentAnalyses(data || []);
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
    <div className="min-h-screen bg-slate-50">
      <Navbar onReset={() => router.push('/')} navigateTo={() => router.push('/')} />
      
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              ¡Hola, <span className="text-brand">{user?.email?.split('@')[0]}</span>! 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1">Este es el resumen de tu crecimiento.</p>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-bold rounded-xl shadow-xl shadow-brand/20 hover:bg-brand-light transition active:scale-95"
          >
            <Plus className="w-5 h-5" /> NUEVO ANÁLISIS
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Total Análisis" 
            value={stats.total} 
            icon={<BarChart3 className="text-blue-500" />} 
            trend="+12% vs mes anterior"
          />
          <StatCard 
            title="Análisis este mes" 
            value={stats.thisMonth} 
            icon={<TrendingUp className="text-brand" />} 
            trend="En camino a tu meta"
          />
          <StatCard 
            title="Plan Actual" 
            value="FREE" 
            icon={<Globe className="text-emerald-500" />} 
            trend="Válido hasta siempre"
          />
        </div>

        {/* Recent Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden glass">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" /> Últimos Análisis
            </h2>
            <Link href="/history" className="text-sm font-bold text-brand hover:text-brand-light transition">
              Ver todo
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Dominio</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAnalyses.length > 0 ? (
                  recentAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{analysis.domain || analysis.url}</td>
                      <td className="px-6 py-4">
                        <ScoreBadge score={analysis.score_overall} />
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={analysis.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/analysis/${analysis.id}`}
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-brand transition font-bold text-sm"
                        >
                          Ver <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                          <BarChart3 className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-medium">No has realizado análisis todavía.</p>
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

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 glass">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl">
          {icon}
        </div>
      </div>
      <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{title}</h3>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-3xl font-black text-slate-900">{value}</span>
      </div>
      <p className="text-xs font-medium text-slate-400 mt-2">{trend}</p>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  if (!score) return <span className="text-slate-300 font-bold">-</span>;
  
  const color = score >= 70 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black ${color}`}>
      {score}%
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    completed: { color: 'text-green-500', icon: <CheckCircle2 className="w-3 h-3" />, text: 'Completado' },
    running: { color: 'text-blue-500', icon: <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />, text: 'Analizando...' },
    pending: { color: 'text-slate-400', icon: <Clock className="w-3 h-3" />, text: 'Pendiente' },
    failed: { color: 'text-red-500', icon: <AlertCircle className="w-3 h-3" />, text: 'Falló' }
  };

  const config = configs[status] || configs.pending;

  return (
    <span className={`flex items-center gap-1.5 text-xs font-bold ${config.color}`}>
      {config.icon} {config.text}
    </span>
  );
}
