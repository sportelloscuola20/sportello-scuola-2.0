import { useEffect, useState, Fragment } from 'react';

export default function Breadcrumb() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<Array<{ label: string; href: string }>>([]);

  useEffect(() => {
    const updateBreadcrumb = () => {
      const hash = window.location.hash.substring(1); // Remove the '#'
      let currentLabel = 'Home';
      let currentHash = '#home';

      // Mapping from hash to label
      const hashToLabel: Record<string, string> = {
        '': 'Home',
        'home': 'Home',
        'platform-users': 'Per chi è la piattaforma',
        'assistente-ai': 'Assistenti AI',
        'calcolo-punteggio': 'Calcolo Punteggio',
        'normative': 'Normative e Documenti',
        'notizie': 'News',
        'scadenze': 'Scadenze',
        'faq': 'FAQ',
        'contatti': 'Contatti',
      };

      // If hash is empty, we are on home
      if (!hash) {
        currentLabel = 'Home';
        currentHash = '#home';
      } else {
        currentLabel = hashToLabel[hash] || hash;
        currentHash = `#${hash}`;
      }

      // Build breadcrumb items
      const items: Array<{ label: string; href: string }> = [
        { label: 'Home', href: '#home' },
      ];

      // If not home, add the current page
      if (currentLabel !== 'Home') {
        items.push({ label: currentLabel, href: currentHash });
      }

      setBreadcrumbItems(items);
    };

    // Initial update
    updateBreadcrumb();

    // Update on hashchange
    window.addEventListener('hashchange', updateBreadcrumb);
    return () => {
      window.removeEventListener('hashchange', updateBreadcrumb);
    };
  }, []);

  // Update JSON-LD for breadcrumb structured data
  useEffect(() => {
    if (breadcrumbItems.length === 0) return;

    // Remove any existing breadcrumb script
    const existingScript = document.getElementById('breadcrumb-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Create JSON-LD script
    const script = document.createElement('script');
    script.id = 'breadcrumb-schema';
    script.type = 'application/ld+json';

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://sportelloscuola2.it${item.href}`,
      })),
    };

    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [breadcrumbItems]);

  if (breadcrumbItems.length <= 1) {
    // Only show breadcrumb if we are not on home (or if we want to show home alone, but typically we hide on home)
    return null;
  }

  return (
    <nav className="bg-gray-50 px-4 py-2 sm:px-6 lg:px-8" aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-500">
        {breadcrumbItems.map((item, index) => (
          <Fragment key={index}>
            {!item.href && <span>{item.label}</span>}
            {item.href && (
              <>
                <a href={item.href} className="hover:text-indigo-600 transition-colors">
                  {item.label}
                </a>
                {index < breadcrumbItems.length - 1 && <span className="mx-2">/</span>}
              </>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}