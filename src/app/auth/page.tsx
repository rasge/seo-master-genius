
'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AuthPage() {
  const supabase = createClient();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onReset={() => router.push('/')} navigateTo={() => router.push('/')} />
      
      <div className="flex-1 flex items-center justify-center p-4 pt-32 pb-20">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden glass border border-slate-200 p-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
              Libertad<span className="text-brand">PRO</span>
            </h1>
            <p className="text-slate-500 mt-3 font-medium text-lg leading-relaxed">
              Únete a la élite empresarial. <br/>Escala tu negocio con sistemas probados.
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#FF6B35',
                    brandAccent: '#FF8554',
                    brandButtonText: 'white',
                    defaultButtonBackground: 'white',
                    defaultButtonBackgroundHover: '#f8fafc',
                    inputBackground: 'white',
                    inputBorder: '#e2e8f0',
                    inputBorderHover: '#cbd5e1',
                    inputBorderFocus: '#FF6B35',
                  },
                  space: {
                    inputPadding: '14px 18px',
                    buttonPadding: '14px 18px',
                  },
                  radii: {
                    borderRadiusButton: '16px',
                    buttonBorderRadius: '16px',
                    inputBorderRadius: '16px',
                  },
                  fonts: {
                    bodyFontFamily: `'Inter', sans-serif`,
                    buttonFontFamily: `'Inter', sans-serif`,
                    inputFontFamily: `'Inter', sans-serif`,
                    labelFontFamily: `'Inter', sans-serif`,
                  },
                },
              },
              className: {
                container: 'supabase-auth-container flex flex-col gap-4',
                button: 'supabase-auth-button w-full font-bold text-lg shadow-lg hover:translate-y-[-2px] transition-all duration-300',
                input: 'supabase-auth-input text-lg font-medium outline-none focus:ring-2 focus:ring-brand/20',
                label: 'text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1',
                message: 'text-sm font-medium text-red-500 mt-2 text-center',
              }
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Tu Email de Negocio',
                  password_label: 'Contraseña de Acceso',
                  button_label: 'ACCEDER AHORA',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar con {{provider}}',
                  link_text: '¿Ya tienes cuenta? Entra aquí',
                },
                sign_up: {
                  email_label: 'Tu Email de Negocio',
                  password_label: 'Crea una contraseña fuerte',
                  button_label: 'EMPEZAR GRATIS',
                  loading_button_label: 'Generando acceso...',
                  social_provider_text: 'Regístrate con {{provider}}',
                  link_text: '¿No tienes cuenta? Crea una aquí',
                },
                forgotten_password: {
                  email_label: 'Tu Email registered',
                  button_label: 'Recuperar acceso',
                  link_text: '¿Olvidaste tu contraseña?',
                }
              }
            }}
            providers={['google']}
            redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined}
          />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
