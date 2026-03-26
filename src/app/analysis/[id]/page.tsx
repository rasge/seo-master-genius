
'use client';

import { useEffect, useState, use } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeoReport from '@/components/SeoReport';
import { useRouter } from 'next/navigation';

export default function AnalysisViewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user, supabase, loading: authLoading } = useAuth();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    // Allow anonymous view if they have a link?
    // For now, let's allow fetching it

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

      if (error || !data) {
        router.push('/');
        return;
      }

      setAnalysis(data);
      setLoading(false);
    };

    fetchData();
  }, [resolvedParams.id, authLoading, supabase, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onReset={() => router.push('/')} navigateTo={() => router.push('/')} />
      <div className="pt-24 pb-20">
        <SeoReport 
          url={analysis.url} 
          analysisId={analysis.id}
          onReset={() => router.push('/')} 
        />
      </div>
      <Footer />
    </div>
  );
}
