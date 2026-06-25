import { Menu, X, User, LogOut, ChevronDown, Settings, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';

const sidebarShortcuts = [
  { label: 'Punteggi & Simulazioni', path: '/area-riservata/punteggi' },
  { label: 'I Miei Preferiti', path: '/area-riservata/preferiti' },
  { label: 'Fascicolo Digitale', path: '/area-riservata/documenti' },
  { label: 'Scadenziario Bandi', path: '/area-riservata/bandi' },
  { label: 'Abbonamento', path: '/area-riservata/abbonamento' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const initials = user?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  const menuItems = [
    { label: 'Calcolo Punteggio', href: '/calcolo-punteggio' },
    { label: 'Servizi', href: '/servizi' },
    { label: 'Sindacalista AI', href: '/sindacalista-ai' },
    { label: 'Interpelli', href: '/interpelli' },
    { label: 'Normative e Documenti', href: '/normative' },
    { label: 'Notizie e Scadenze', href: '/notizie-scadenze' },
  ];

  return (
    <header id="main-navbar" className="bg-white/80 backdrop-blur-md shadow-soft border-b border-slate-200/60 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Sportello Scuola 2.0"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="h-12 flex flex-col justify-center font-display uppercase text-[13px] sm:text-[15px] leading-none tracking-[0.12em] font-normal">
              <span className="text-brand-blu">Sportello</span>
              <span className="text-brand-verde">Scuola <span className="text-brand-ottanio">2.0</span></span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-brand-blu/10 text-brand-blu'
                    : 'text-gray-600 hover:text-brand-blu hover:bg-brand-blu/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-brand-blu/10 text-brand-blu px-3 py-1.5 rounded-2xl font-medium text-sm hover:bg-brand-blu/20 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-verde to-brand-ottanio flex items-center justify-center text-white text-[10px] font-bold">
                    {initials}
                  </div>
                  <span className="max-w-[120px] truncate">{user.full_name || user.email}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200/60 rounded-2xl shadow-xl animate-fade-in-up overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-verde to-brand-ottanio flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.full_name || 'Utente'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          <div className="flex gap-1.5 mt-1">
                            {user.is_admin && (
                              <span className="px-2 py-0.5 bg-brand-ambra/10 text-brand-ambra text-[10px] rounded-full font-semibold">
                                Admin
                              </span>
                            )}
                            {user.is_premium && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-verde/10 text-brand-verde text-[10px] rounded-full font-semibold">
                                <Sparkles size={10} />
                                Premium
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-b border-slate-100">
                      <Link
                        to="/area-riservata"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-blu to-brand-verde text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <User size={16} />
                        VAI ALL'AREA RISERVATA
                      </Link>
                    </div>

                    <div className="p-2 border-b border-slate-100">
                      {sidebarShortcuts.map(sc => (
                        <Link
                          key={sc.path}
                          to={sc.path}
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-brand-blu/5 hover:text-brand-blu transition"
                        >
                          {sc.label}
                        </Link>
                      ))}
                    </div>

                    <div className="p-2">
                      <Link
                        to="/area-riservata/impostazioni"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-brand-blu/5 hover:text-brand-blu transition w-full"
                      >
                        <Settings size={14} />
                        Impostazioni
                      </Link>
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 rounded-xl hover:bg-red-50 transition mt-0.5"
                      >
                        <LogOut size={14} />
                        Esci
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-brand-blu text-white px-5 py-2 rounded-xl hover:bg-brand-blu/90 transition-colors duration-200 font-medium text-sm flex items-center gap-2"
              >
                <User size={16} />
                Accedi
              </button>
            )}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={handleNavClick}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive(item.href)
                      ? 'bg-brand-blu/10 text-brand-blu'
                      : 'text-gray-600 hover:text-brand-blu hover:bg-brand-blu/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/area-riservata"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-brand-blu font-medium"
                  >
                    Area Riservata
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl font-medium"
                  >
                    Esci
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setShowLogin(true); setIsMenuOpen(false); }}
                  className="px-3 py-2 text-left text-brand-blu font-medium"
                >
                  Accedi
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}
