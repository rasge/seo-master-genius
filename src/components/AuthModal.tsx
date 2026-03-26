
'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const supabase = createClient();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden glass border border-slate-200 p-8 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            Libertad<span className="text-brand">PRO</span>
          </h2>
          <p className="text-slate-600 mt-2 font-medium">
            Entra para ver tus análisis y acelerar tu crecimiento.
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
                },
                space: {
                  inputPadding: '12px 16px',
                  buttonPadding: '12px 16px',
                },
                radii: {
                  borderRadiusButton: '12px',
                  buttonBorderRadius: '12px',
                  inputBorderRadius: '12px',
                },
              },
            },
            className: {
              container: 'supabase-auth-container',
              button: 'supabase-auth-button font-bold text-lg',
              input: 'supabase-auth-input',
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Tu Email',
                password_label: 'Tu Contraseña',
                button_label: 'Entrar',
                loading_button_label: 'Entrando...',
                social_provider_text: 'Entrar con {{provider}}',
                link_text: '¿Ya tienes cuenta? Entra aquí',
              },
              sign_up: {
                email_label: 'Tu Email',
                password_label: 'Crea una contraseña',
                button_label: 'Registrarme',
                loading_button_label: 'Creando cuenta...',
                social_provider_text: 'Regístrate con {{provider}}',
                link_text: '¿No tienes cuenta? Regístrate aquí',
              },
              magic_link: {
                email_input_label: 'Tu Email',
                button_label: 'Enviar Magic Link',
                loading_button_label: 'Enviando...',
                link_text: 'Entrar sin contraseña',
              },
              forgotten_password: {
                email_label: 'Tu Email',
                button_label: 'Recuperar contraseña',
                link_text: '¿Olvidaste tu contraseña?',
              }
            }
          }}
          providers={['google']}
          redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined}
        />
      </div>
    </div>
  );
}
