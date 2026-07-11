import { Mail, Phone, Send, CheckCircle2, AlertCircle, X, ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { sendEmailBackground, getMailConfig, saveMailConfig, MailConfig } from '../../../lib/emailService';

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    messaggio: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<MailConfig>({ destinationEmail: '', web3formsKey: '', openaiKey: '' });

  useEffect(() => {
    setConfig(getMailConfig());
  }, [showSettings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveMailConfig(config);
    setShowSettings(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMessage('');

    const result = await sendEmailBackground({
      name: formData.nome,
      email: formData.email,
      subject: `Richiesta Contatto: ${formData.nome}`,
      message: formData.messaggio,
      extraData: {
        'Tipo Invio': 'Modulo di Contatto Standard',
      },
    });

    if (result.success) {
      setStatus('success');
      setFeedbackMessage(result.message);
      setFormData({ nome: '', email: '', messaggio: '' });
    } else {
      setStatus('error');
      setFeedbackMessage(result.message);
    }
  };

  return (
    <section id="contatti" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">
            Contattaci
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-normal">
            Ti forniamo supporto per qualsiasi esigenza scolastica in modo tempestivo e professionale
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-8">
              I nostri contatti
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-100 shadow-sm transition-all duration-200 hover:shadow-md">
                <Mail className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-2">Email</h4>
                  <a
                    href={`mailto:${config.destinationEmail || 'sportelloscuola2.0@gmail.com'}`}
                    className="text-blue-600 hover:text-blue-700 text-lg font-medium transition-colors"
                  >
                    {config.destinationEmail || 'sportelloscuola2.0@gmail.com'}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Clicca per aprire il tuo client mail predefinito</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-100 shadow-sm transition-all duration-200 hover:shadow-md">
                <Phone className="text-green-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="font-semibold text-[#0F172A] mb-2">Telefono</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:3889711647"
                      className="block text-green-600 hover:text-green-700 text-lg font-medium transition-colors"
                    >
                      388 971 1647
                    </a>
                    <a
                      href="tel:3346170986"
                      className="block text-green-600 hover:text-green-700 text-lg font-medium transition-colors"
                    >
                      334 617 0986
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-150 shadow-inner">
              <h4 className="font-semibold text-[#0F172A] mb-4">Orari di apertura sportello</h4>
              <div className="space-y-2.5 text-gray-700">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Lunedì - Venerdì</span>
                  <span className="font-medium">09:00 - 13:00 | 15:00 - 19:00</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium">Sabato</span>
                  <span className="font-medium">09:00 - 12:00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="font-medium">Domenica</span>
                  <span className="text-red-500 font-semibold">Chiuso</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowSettings(true)}
                title="Configura Email Ricevente"
                className="text-gray-400 hover:text-brand-blu p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
              Invia un messaggio
            </h3>

            {status === 'success' && (
              <div className="mb-6 p-5 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 text-green-800 shadow-sm animate-fade-in">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5 animate-bounce" size={24} />
                <div>
                  <h4 className="font-bold mb-1">Messaggio Spedito!</h4>
                  <p className="text-sm leading-relaxed">{feedbackMessage}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-green-700 hover:text-green-900 font-semibold text-xs mt-3 underline"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 shadow-sm animate-fade-in">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h4 className="font-bold mb-1">Invio Fallito</h4>
                  <p className="text-sm leading-relaxed">{feedbackMessage}</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-red-600 hover:text-red-700 font-semibold text-xs mt-3 underline"
                  >
                    Riprova
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-300 ${status === 'success' ? 'opacity-30 pointer-events-none' : ''}`}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome e Cognome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="es. Mario Rossi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition-all placeholder-gray-400"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Indirizzo Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="es. mario.rossi@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition-all placeholder-gray-400"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Messaggio / Richiesta di Supporto <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.messaggio}
                  onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                  placeholder="Scrivi qui la tua richiesta in dettaglio..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blu focus:border-brand-blu resize-none transition-all placeholder-gray-400"
                  required
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#064E3B] text-white px-8 py-4 rounded-xl hover:bg-[#10B981] transition-all duration-300 font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Invia Messaggio
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-150">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4 text-brand-blu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              <h3 className="text-xl font-bold text-[#0F172A]">
                Impostazioni Moduli e API
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Configura i canali di ricezione delle email e le chiavi API del portale. I dati vengono salvati esclusivamente sul tuo browser.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                  Email Destinatario Ricezioni
                </label>
                <input
                  type="email"
                  value={config.destinationEmail}
                  onChange={(e) => setConfig({ ...config, destinationEmail: e.target.value })}
                  placeholder="es. sportelloscuola2.0@gmail.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                    Web3Forms Access Key
                  </label>
                  <a
                    href="https://web3forms.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-brand-blu hover:underline flex items-center gap-0.5"
                  >
                    Ottieni Chiave Gratis
                    <ExternalLink size={10} />
                  </a>
                </div>
                <input
                  type="password"
                  value={config.web3formsKey}
                  onChange={(e) => setConfig({ ...config, web3formsKey: e.target.value })}
                  placeholder="Incolla qui la chiave (es. ab12c34d-...)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu"
                />
                <p className="text-xs text-gray-500 mt-1 leading-normal">
                  Fornisce l'invio integrato in-app senza aprire altre finestre. Se non inserita, il modulo funzionerà in modalità simulata/demo locale.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand-blu text-white rounded-lg text-sm font-semibold hover:bg-brand-blu/90 transition-colors shadow-md shadow-brand-blu/10"
                >
                  Salva Impostazioni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
