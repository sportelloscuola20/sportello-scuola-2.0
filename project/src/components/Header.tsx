import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Assistente AI', href: '#assistente-ai' },
    { label: 'Calcolo Punteggio', href: '#calcolo-punteggio' },
    { label: 'Normative', href: '#normative' },
    { label: 'Scadenze', href: '#scadenze' },
    { label: 'Contatti', href: '#contatti' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Logo Sportello Scuola 2.0"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight transition-transform duration-300">
                <span className="text-[#1b4365]">Sportello </span>
                <span className="text-[#0A955A]">Scuola </span>
                <span className="text-[#2F777D]">2.0</span>
              </span>
            </a>
          </div>

          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#assistente-ai"
            className="hidden md:block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm"
          >
            Assistente AI
          </a>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
