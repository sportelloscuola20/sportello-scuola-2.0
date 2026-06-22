import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/assistente': 'Assistente AI',
  '/calcolo-punteggio': 'Calcolo Punteggio',
  '/normative': 'Normative e Documenti',
  '/notizie': 'Notizie',
  '/scadenze': 'Scadenze',
  '/faq': 'FAQ',
  '/contatti': 'Contatti',
  '/servizi': 'Servizi',
  '/interpelli': 'Centro Nazionale Interpelli',
};

export default function Breadcrumb() {
  const { pathname } = useLocation();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const items: Array<{ label: string; href: string }> = [{ label: 'Home', href: '/' }];

  let currentPath = '';
  for (const seg of segments) {
    currentPath += `/${seg}`;
    const label = routeLabels[currentPath] || seg;
    items.push({ label, href: currentPath });
  }

  return (
    <nav className="bg-gray-50 px-4 py-2 sm:px-6 lg:px-8" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <Fragment key={index}>
            <Link to={item.href} className="hover:text-indigo-600 transition-colors">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
