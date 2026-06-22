import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';

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

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Notizie', href: '/notizie' },
    { label: 'Scadenze', href: '/scadenze' },
    { label: 'Assistente AI', href: '/assistente/docente' },
    { label: 'Calcolo Punteggio', href: '/calcolo-punteggio' },
    { label: 'Interpelli', href: '/interpelli' },
    { label: 'Servizi', href: '/servizi' },
    { label: 'Normative', href: '/normative' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Logo Sportello Scuola 2.0"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight transition-transform duration-300">
                <span className="text-brand-blu">Sportello </span>
                <span className="text-brand-verde">Scuola </span>
                <span className="text-brand-ottanio">2.0</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
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
                  className="flex items-center gap-2 bg-brand-blu/10 text-brand-blu px-4 py-2 rounded-2xl font-medium text-sm hover:bg-brand-blu/20 transition"
                >
                  <User size={16} />
                  {user.full_name || user.email}
                  <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800 truncate">{user.full_name || 'Utente'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      {user.is_premium && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-brand-verde/10 text-brand-verde text-xs rounded-full font-semibold">
                          Premium
                        </span>
                      )}
                    </div>
                    <Link
                      to="/calcolo-punteggio"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      I miei Punteggi Salvati
                    </Link>
                    <Link
                      to="/notizie"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      Le mie Scadenze Preferite
                    </Link>
                    <Link
                      to="/servizi"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      Le mie Prenotazioni
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
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
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive(item.href)
                      ? 'bg-brand-blu/10 text-brand-blu'
                      : 'text-gray-600 hover:text-brand-blu hover:bg-brand-blu/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl font-medium"
                >
                  Esci
                </button>
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
