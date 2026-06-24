import NewsHub from '../components/NewsHub';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
            Notizie e Scadenze
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hub informativo unificato con notizie del settore istruzione, approfondimenti normativi
            e scadenze ministeriali con countdown in tempo reale.
          </p>
        </div>

        <NewsHub />
      </div>
    </div>
  );
}
