
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, History } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  navigateTo: (id: string) => void;
}

export default function Navbar({ onReset, navigateTo }: NavbarProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/70 glass border-b border-slate-200/50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex shrink-0 items-center cursor-pointer" onClick={onReset}>
              <Link href="/">
                <span className="text-2xl font-black tracking-tighter text-slate-900 group">
                  Libertad<span className="text-brand group-hover:text-brand-light transition-colors">PRO</span>
                  <span className="ml-1 inline-block w-1.5 h-1.5 bg-brand rounded-full"></span>
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => navigateTo('servicios')} className="text-sm font-bold text-slate-600 hover:text-brand transition cursor-pointer">Servicios</button>
              <button onClick={() => navigateTo('proceso')} className="text-sm font-bold text-slate-600 hover:text-brand transition cursor-pointer">Método</button>
              
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition border border-slate-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white glass rounded-xl shadow-2xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs font-bold text-slate-400 uppercase">Mi Cuenta</p>
                        <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                      </div>
                      
                      <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition font-medium">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/history" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition font-medium">
                        <History className="w-4 h-4" /> Historial
                      </Link>
                      
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-slate-100 mt-1 font-bold"
                      >
                        <LogOut className="w-4 h-4" /> Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/auth"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-brand/20 hover:bg-brand-light hover:translate-y-[-1px] transition-all active:scale-95 uppercase tracking-tight"
                >
                  LOGIN / REGISTRO
                </Link>
              )}
            </div>
            
            <div className="md:hidden">
              {user ? (
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-slate-600"
                >
                  <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xs">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
              ) : (
                <Link href="/auth" className="p-2 text-slate-600">
                   <User className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
