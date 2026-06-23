import { useState, useEffect } from 'react';
import { Sparkles, Bookmark, TrendingUp, Calendar, Sun, Moon, Cloud, CloudMoon } from 'lucide-react';
import { useAuth } from '../components/Auth/AuthContext';
import { useProfileStore } from '../store/useProfileStore';
import SavedItems from '../components/SavedItems';
import CalendarWidget from '../components/CalendarWidget';

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

export default function AreaRiservataPage() {
  const { user } = useAuth();
  const { preferences } = useProfileStore();
  const greeting = getGreeting();

  const quickStats = [
    { label: 'Preferiti salvati', value: '—', icon: <Bookmark size={16} />, color: 'from-amber-400 to-orange-500' },
    { label: 'Simulazioni', value: '—', icon: <TrendingUp size={16} />, color: 'from-blue-400 to-indigo-500' },
    { label: 'Bandi seguiti', value: '—', icon: <Calendar size={16} />, color: 'from-green-400 to-emerald-500' },
    { label: 'Servizio Premium', value: user?.is_premium ? 'ATTIVO' : 'Free', icon: <Sparkles size={16} />, color: 'from-brand-ambra to-orange-500' },
  ];

  return (
    <div>
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
            Benvenuto nella tua Area Riservata. Monitora punteggi, preferiti, documenti
            e scadenze in un unico hub di controllo.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {quickStats.map(stat => (
          <div key={stat.label} className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition group">
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
    </div>
  );
}
