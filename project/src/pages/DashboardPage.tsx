import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Bookmark, User, Calendar, ClipboardCheck,
  LogOut, Bell, ChevronRight, Sun, Moon, Cloud, CloudMoon,
  Settings, Sparkles, GraduationCap, FileText,
} from 'lucide-react';
import { useAuth } from '../components/Auth/AuthContext';
import SavedItems from '../components/SavedItems';
import ProfileConfig from '../components/ProfileConfig';
import CalendarWidget from '../components/CalendarWidget';
import ServiceTracker from '../components/ServiceTracker';

type DashboardTab = 'dashboard' | 'preferiti' | 'profilo' | 'appuntamenti' | 'pratiche';

const greetings = [
  { hour: 5, icon: <Moon size={16} />, text: 'Buonanotte' },
  { hour: 6, icon: <Sun size={16} />, text: 'Buongiorno' },
  { hour: 12, icon: <Sun size={16} />, text: 'Buon pomeriggio' },
  { hour: 18, icon: <CloudMoon size={16} />, text: 'Buonasera' },
  { hour: 22, icon: <Cloud size={16} />, text: 'Buonanotte' },
];

function getGreeting() {
  const h = new Date().getHours();
  const g = greetings.find(g => h >= g.hour);
  return g || greetings[0];
}

const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'preferiti', label: 'I Miei Preferiti', icon: <Bookmark size={18} /> },
  { id: 'profilo', label: 'Profilo', icon: <User size={18} /> },
  { id: 'appuntamenti', label: 'Appuntamenti', icon: <Calendar size={18} /> },
  { id: 'pratiche', label: 'Stato Pratiche', icon: <ClipboardCheck size={18} /> },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const greeting = getGreeting();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const quickStats = [
    { label: 'Notizie salvate', value: 12, icon: <Bookmark size={16} />, color: 'from-amber-400 to-orange-500' },
    { label: 'Scadenze seguite', value: 5, icon: <Bell size={16} />, color: 'from-red-400 to-rose-500' },
    { label: 'Calcoli effettuati', value: 3, icon: <GraduationCap size={16} />, color: 'from-blue-400 to-indigo-500' },
    { label: 'Documenti preferiti', value: 7, icon: <FileText size={16} />, color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-300 ${
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
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blu/20 via-brand-verde/10 to-brand-ottanio/20 border border-white/10 p-6 sm:p-10 mb-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-verde/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blu/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  {greeting.icon}
                  <span>{greeting.text}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {greeting.text}, {user?.full_name?.split(' ')[0] || 'Utente'}!
                </h1>
                <p className="text-white/60 text-sm max-w-xl">
                  Benvenuto nella tua Area Riservata. Gestisci i tuoi preferiti, configura il profilo professionale
                  e monitora lo stato delle tue pratiche scolastiche.
                </p>
              </div>
            </div>

            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {quickStats.map(stat => (
                    <div
                      key={stat.label}
                      className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition group"
                    >
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${stat.color} transition-opacity`} />
                      <div className="relative">
                        <div className="text-white/60 mb-2">{stat.icon}</div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <SavedItems />
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <CalendarWidget />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <ProfileConfig />
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <ServiceTracker />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferiti' && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <SavedItems />
              </div>
            )}

            {activeTab === 'profilo' && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <ProfileConfig />
              </div>
            )}

            {activeTab === 'appuntamenti' && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <CalendarWidget />
              </div>
            )}

            {activeTab === 'pratiche' && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <ServiceTracker />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
