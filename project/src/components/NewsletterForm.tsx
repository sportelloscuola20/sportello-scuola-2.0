import { useState } from 'react';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    const { error } = await supabase.from('newsletter_subscriptions').insert({
      email: email.trim(),
      is_active: true,
    });

    if (!error || error.message?.includes('duplicate')) {
      setStatus('success');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-4 bg-brand-verde/10 rounded-2xl border border-brand-verde/20">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-brand-verde flex-shrink-0" size={20} />
          <p className="text-brand-verde font-medium text-sm">
            Iscrizione completata. Riceverai il report con le scadenze ministeriali ogni lunedì mattina.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="La tua email per la newsletter"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl text-sm focus:ring-2 focus:ring-brand-blu focus:border-brand-blu transition"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-medium text-sm hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <Send size={18} />
        )}
        Iscriviti
      </button>
    </form>
  );
}
