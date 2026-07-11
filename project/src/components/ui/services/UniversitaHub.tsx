import { useState, useEffect } from 'react';
import { GraduationCap, ExternalLink, RefreshCw, MapPin, Wifi, Building, Globe, Search, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import type { HubUniversita } from '../../../types/database';

const TIPO_STILI: Record<string, string> = {
  telematica: 'bg-purple-100 text-purple-700 border-purple-200',
  pubblica: 'bg-blue-100 text-blue-700 border-blue-200',
  privata: 'bg-amber-100 text-amber-700 border-amber-200',
};

const STATO_COLORS: Record<string, string> = {
  aperte: 'text-green-600 bg-green-50 border-green-200',
  chiuse: 'text-red-600 bg-red-50 border-red-200',
  'in arrivo': 'text-amber-600 bg-amber-50 border-amber-200',
  'n/d': 'text-gray-400 bg-gray-50 border-gray-200',
};

export default function UniversitaHub() {
  const [universita, setUniversita] = useState<HubUniversita[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('');

  const fetchUniversita = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('hub_universita')
        .select('*')
        .order('ordine', { ascending: true });
      if (!error && data) {
        setUniversita(data as HubUniversita[]);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchUniversita(); }, []);

  const filtered = universita.filter(u => {
    const matchSearch = !searchQuery || u.nome.toLowerCase().includes(searchQuery.toLowerCase()) || (u.citta || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchTipo = !filterTipo || u.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  return (
    <section id="hub-universita" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            <span className="inline-flex items-center gap-3">
              <GraduationCap size={32} className="text-brand-verde" />
              Hub Università — Percorsi Abilitanti e TFA
            </span>
          </h2>
          <p className="text-gray-600 font-normal max-w-3xl mx-auto">
            Elenco degli atenei che offrono percorsi di formazione iniziale docenti, TFA sostegno e percorsi abilitanti da 30, 36 e 60 CFU.
            Monitoraggio centralizzato delle iscrizioni.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span className="flex items-center gap-1.5">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Caricamento...' : `${filtered.length} atenei`}
          </span>
          <button onClick={fetchUniversita} disabled={loading}
            className="flex items-center gap-1 text-brand-verde font-semibold hover:text-brand-verde/80 transition disabled:opacity-50">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Aggiorna
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mt-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {['', 'telematica', 'pubblica', 'privata'].map(t => (
              <button key={t} onClick={() => setFilterTipo(t)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  filterTipo === t ? 'bg-brand-verde text-white' : 'bg-white text-gray-600 border border-slate-200/60 hover:border-brand-verde/30'
                }`}>
                {t === '' ? 'Tutti' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cerca ateneo..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200/60 bg-white text-sm focus:ring-2 focus:ring-brand-verde/20 focus:border-brand-verde transition outline-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={32} className="animate-spin text-brand-verde/30" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nessun ateneo trovato.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(u => {
              const tipoStile = TIPO_STILI[u.tipo] || 'bg-gray-100 text-gray-600';
              const statoCss = STATO_COLORS[u.stato_iscrizioni.toLowerCase()] || STATO_COLORS['n/d'];
              return (
                <div key={u.id} className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-slate-200/60 hover:border-brand-verde/30 hover:shadow-medium transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tipoStile}`}>
                        {u.tipo === 'telematica' ? <Wifi size={20} /> : <Building size={20} />}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0F172A]">{u.nome}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tipoStile}`}>
                          {u.tipo === 'telematica' ? 'Telematica' : u.tipo === 'pubblica' ? 'Pubblica' : 'Privata'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statoCss}`}>
                        {u.stato_iscrizioni === 'n/d' ? 'Stato n/d' : u.stato_iscrizioni}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                    <MapPin size={12} />
                    {u.citta && <span>{u.citta}, </span>}
                    <span>{u.regione || 'n/d'}</span>
                  </div>

                  {u.note && (
                    <p className="text-xs text-gray-500 mb-4 italic line-clamp-2">{u.note}</p>
                  )}

                  <div className="flex gap-3">
                    <a href={u.url_corso} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-verde/10 text-brand-verde rounded-2xl text-sm font-semibold hover:bg-brand-verde/20 transition">
                      <Globe size={14} /> Corso
                    </a>
                    {u.url_avvisi && (
                      <a href={u.url_avvisi} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-blu/10 text-brand-blu rounded-2xl text-sm font-semibold hover:bg-brand-blu/20 transition">
                        <ExternalLink size={14} /> Avvisi
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
