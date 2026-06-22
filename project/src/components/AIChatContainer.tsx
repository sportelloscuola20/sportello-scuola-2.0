import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { ChatMessage } from '../types/database';

const FREE_MESSAGE_LIMIT = 3;
const SUGGESTED_PROMPTS = [
  'Quali sono i miei diritti per il congedo parentale come docente?',
  'Come funziona la mobilità volontaria GPS 2026?',
  'Requisiti e procedure per le MAD 2026-2028',
  'Calcolo punteggio per passaggio di ruolo ATA → Docente',
  'CCNL Istruzione e Ricerca: ferie e permessi del personale ATA',
  'Come presentare ricorso per esclusione da graduatoria GPS',
];

function getChatCount(): number {
  try {
    return Number(localStorage.getItem('ss2_chat_count') || '0');
  } catch {
    return 0;
  }
}

function incrementChatCount(): number {
  const next = getChatCount() + 1;
  localStorage.setItem('ss2_chat_count', String(next));
  return next;
}

function resetChatCount(): void {
  localStorage.setItem('ss2_chat_count', '0');
}

function BannerPaywall() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-brand-blu to-brand-verde rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-brand-blu mb-3">Soglia di consultazione gratuita superata</h2>
        <p className="text-gray-600 mb-6">
          Abbonati a <strong className="text-brand-verde">Sportello Scuola 2.0 Pro</strong> per sbloccare l'assistenza sindacale AI illimitata ed evitare errori legali nella tua carriera.
        </p>
        <button
          onClick={() => window.location.href = '/servizi'}
          className="w-full py-4 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-bold text-lg hover:opacity-90 transition shadow-lg"
        >
          Abbonati a Sportello Scuola 2.0 Pro
        </button>
        <p className="mt-4 text-xs text-gray-400">Hai utilizzato {FREE_MESSAGE_LIMIT} consulenze gratuite. Passa a Pro per accesso illimitato.</p>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="flex items-start gap-3 animate-pulse">
      <div className="w-8 h-8 bg-brand-ottanio/20 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <p className="text-xs text-brand-ottanio font-medium mt-2">
          Il Sindacalista AI sta setacciando le gazzette ufficiali e le note ministeriali MIM...
        </p>
      </div>
    </div>
  );
}

export default function AIChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [chatCount, setChatCount] = useState<number>(getChatCount());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (chatCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true);
    }
  }, [chatCount]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const currentCount = getChatCount();
    if (currentCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const newCount = incrementChatCount();
    setChatCount(newCount);

    try {
      const { data, error } = await supabase.functions.invoke('ai-sindacalista', {
        body: {
          message: content.trim(),
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        },
      });

      if (error) throw error;

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data?.response || 'Mi scusi, non sono riuscito a elaborare la risposta. La prego di riprovare.',
        timestamp: new Date().toISOString(),
        citations: data?.citations || [],
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '**Servizio temporaneamente non disponibile.** Il Sindacalista AI è in manutenzione. Riprova tra qualche minuto o consulta le sezioni normative del portale per risposte immediate.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }, [input, sendMessage]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto">
      {showPaywall && <BannerPaywall />}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-brand-blu to-brand-verde rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-blu mb-2">Sindacalista AI</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Assistente virtuale specializzato su CCNL Istruzione e Ricerca, congedi, MAD, GPS e diritti del personale scolastico.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {SUGGESTED_PROMPTS.slice(0, 4).map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left p-3 bg-white/70 border border-gray-200 rounded-2xl text-sm text-gray-700 hover:border-brand-blu hover:bg-brand-blu/5 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Consultazioni gratuite rimanenti: {Math.max(0, FREE_MESSAGE_LIMIT - chatCount)} / {FREE_MESSAGE_LIMIT}
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-brand-blu' : 'bg-gradient-to-r from-brand-verde to-brand-ottanio'
              }`}
            >
              <span className="text-white text-xs font-bold">
                {msg.role === 'user' ? 'U' : 'AI'}
              </span>
            </div>
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-brand-blu text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('**') ? 'font-bold' : ''}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                ))}
              </div>
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Fonti:</p>
                  {msg.citations.map((c, i) => (
                    <p key={i} className="text-xs text-brand-ottanio">
                      {c.title} (affinità: {(c.confidence * 100).toFixed(0)}%)
                    </p>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(msg.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && <SkeletonLoader />}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xs p-4">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || chatCount >= FREE_MESSAGE_LIMIT}
            placeholder={
              chatCount >= FREE_MESSAGE_LIMIT
                ? 'Limite gratuito raggiunto. Abbonati a Pro per continuare.'
                : 'Scrivi la tua domanda al Sindacalista AI...'
            }
            rows={1}
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:ring-2 focus:ring-brand-blu focus:border-brand-blu disabled:opacity-50 disabled:cursor-not-allowed transition"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim() || chatCount >= FREE_MESSAGE_LIMIT}
            className="px-6 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Invia
          </button>
        </div>
        <div className="flex justify-between mt-2 max-w-4xl mx-auto">
          <p className="text-xs text-gray-400">
            Consultazioni gratuite: {Math.max(0, FREE_MESSAGE_LIMIT - chatCount)}/{FREE_MESSAGE_LIMIT}
          </p>
          {chatCount > 0 && (
            <button
              onClick={() => {
                setMessages([]);
                resetChatCount();
                setChatCount(0);
                setShowPaywall(false);
              }}
              className="text-xs text-gray-400 hover:text-red-400 transition"
            >
              Reset conversazione
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
