import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Bookmark, FileText, Bell, CreditCard, Settings,
  LogOut, Sparkles, ChevronRight, Shield,
} from 'lucide-react';
import { useAuth } from '../foundation/AuthContext';
import { useProfileStore } from '../../store/useProfileStore';
import OnboardingModal from './OnboardingModal';
import { supabase } from '../../lib/supabaseClient';

type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/area-riservata', icon: <LayoutDashboard size={18} /> },
  { id: 'punteggi', label: 'Punteggi & Simulazioni', path: '/area-riservata/punteggi', icon: <TrendingUp size={18} /> },
  { id: 'preferiti', label: 'I Miei Preferiti', path: '/area-riservata/preferiti', icon: <Bookmark size={18} /> },
  { id: 'documenti', label: 'Fascicolo Digitale', path: '/area-riservata/documenti', icon: <FileText size={18} /> },
  { id: 'bandi', label: 'Scadenziario Bandi', path: '/area-riservata/bandi', icon: <Bell size={18} /> },
  { id: 'abbonamento', label: 'Abbonamento', path: '/area-riservata/abbonamento', icon: <CreditCard size={18} /> },
  { id: 'impostazioni', label: 'Impostazioni', path: '/area-riservata/impostazioni', icon: <Settings size={18} /> },
];

const adminNavItems: NavItem[] = [
  { id: 'documenti-approval', label: 'Gestione Documenti', path: '/area-riservata/documenti-approval', icon: <Shield size={18} /> },
];

export default function AreaRiservataLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading, logout } = useAuth();
  const { fetchProfile, profile } = useProfileStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      setCheckingAuth(false);
    } else {
      const authTimeout = setTimeout(() => {
        setCheckingAuth(false);
      }, 15000);

      supabase.auth.getSession().then(({ data: { session } }) => {
        clearTimeout(authTimeout);
        if (!session) {
          navigate('/', { state: { showLogin: true }, replace: true });
        } else {
          setCheckingAuth(false);
        }
      });

      return () => clearTimeout(authTimeout);
    }
  }, [authLoading, navigate, user]);

  useEffect(() => {
    if (user && !checkingAuth) {
      fetchProfile(user.id);
    }
  }, [user, checkingAuth, fetchProfile]);

  useEffect(() => {
    if (profile?.onboarded === false) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [profile]);

  if (checkingAuth || authLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-blu border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-400">Verifica accesso...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blu to-brand-verde flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Sportello Scuola</p>
              <p className="text-white/50 text-xs">Area Riservata</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path
                || (item.path !== '/area-riservata' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
            {user?.is_admin && (
              <>
                <div className="border-t border-white/10 my-2" />
                {adminNavItems.map(item => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-400 shadow-lg'
                          : 'text-amber-400/60 hover:text-amber-400 hover:bg-amber-500/10'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {isActive && <ChevronRight size={14} className="ml-auto" />}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </div>

        <div className="sticky bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-[#0F172A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-verde to-brand-ottanio flex items-center justify-center text-white text-xs font-bold">
              {user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.full_name || 'Utente'}</p>
              <p className="text-white/40 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={16} />
            Esci
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-auto">
        <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <LayoutDashboard size={20} />
          </button>
          <p className="text-white text-sm font-semibold">Area Riservata</p>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-verde to-brand-ottanio flex items-center justify-center text-white text-xs font-bold">
            {user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {showOnboarding && <OnboardingModal />}
    </div>
  );
}
