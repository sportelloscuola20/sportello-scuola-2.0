import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../foundation/AuthContext';
import { ChatService } from '../../services';
import { trackChatMessage } from '../../lib/analytics';
import { MessageSquare, Plus, Trash2, Clock, Send, Sparkles, BookOpen, ArrowRight, Copy, Check } from 'lucide-react';
import type { ChatMessage } from '../../types/database';

const FREE_MESSAGE_LIMIT = 3;

const SUGGESTED_PROMPTS = [
  { category: 'GPS & Supplenze', prompt: 'Come si calcola il punteggio di maternità sui servizi di supplenza temporanea?' },
  { category: 'Interpelli', prompt: 'Cosa succede se rifiuto un interpello o una convocazione da GPS?' },
  { category: 'Diritti', prompt: 'Quali sono i diritti previsti dal CCNL per i permessi per motivi di studio (150 ore)?' },
  { category: 'Mobilità', prompt: 'Come funziona la mobilità volontaria GPS 2026?' },
  { category: 'Concorsi', prompt: 'Requisiti e calendario per i concorsi docenti 2026?' },
  { category: 'ATA', prompt: 'Calcolo punteggio per passaggio di ruolo ATA → Docente' },
];

const FOLLOW_UP_PROMPTS: Record<string, string[]> = {
  default: [
    'Approfondisci questo argomento',
    'Quali sono le scadenze relative?',
    'Ci sono aggiornamenti recenti?',
  ],
};

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

interface AIChatContainerProps {
  assistantType?: string;
}

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

function generateConversationTitle(firstMessage: string): string {
  const clean = firstMessage.replace(/[^\w\sàèéìòù]/gi, '').trim();
  const words = clean.split(/\s+/).slice(0, 6).join(' ');
  return words.length > 40 ? words.slice(0, 40) + '...' : words || 'Nuova conversazione';
}

function BannerPaywall() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-brand-blu to-brand-verde rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-brand-blu mb-3">Soglia di consultazione gratuita superata</h2>
        <p className="text-gray-600 mb-6">
          Abbonati a <strong className="text-brand-verde">Sportello Scuola 2.0 Pro</strong> per sbloccare l'assistenza normativa AI illimitata.
        </p>
        <a href="/servizi"
          className="inline-block w-full py-4 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-bold text-lg hover:opacity-90 transition shadow-lg">
          Abbonati a Sportello Scuola 2.0 Pro
        </a>
        <p className="mt-4 text-xs text-gray-400">Hai utilizzato {FREE_MESSAGE_LIMIT} consulenze gratuite.</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gradient-to-r from-brand-verde to-brand-ottanio rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">AI</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-brand-ottanio/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-brand-ottanio/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-brand-ottanio/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs text-gray-400 ml-1">Analizzando le fonti normative...</span>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1 rounded-lg hover:bg-gray-100 transition" title="Copia risposta">
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
    </button>
  );
}

function MessageRenderer({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <p>{content}</p>;
  }

  const lines = content.split('\n');
  return (
    <div className="prose prose-sm max-w-none">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        if (trimmed.startsWith('### ')) {
          return <h4 key={i} className="text-sm font-bold text-brand-blu mt-3 mb-1">{trimmed.slice(4)}</h4>;
        }
        if (trimmed.startsWith('## ')) {
          return <h3 key={i} className="text-base font-bold text-brand-blu mt-4 mb-1">{trimmed.slice(3)}</h3>;
        }
        if (trimmed.startsWith('# ')) {
          return <h2 key={i} className="text-lg font-bold text-brand-blu mt-4 mb-2">{trimmed.slice(2)}</h2>;
        }
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return <p key={i} className="font-bold text-brand-blu">{trimmed.slice(2, -2)}</p>;
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          return (
            <p key={i} className="ml-3 text-gray-700 before:content-['•'] before:mr-2 before:text-brand-verde">
              {trimmed.slice(2).replace(/\*\*/g, '')}
            </p>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^(\d+)\.\s(.*)/);
          if (num) {
            return (
              <p key={i} className="ml-3 text-gray-700">
                <span className="font-bold text-brand-blu mr-1">{num[1]}.</span>
                {num[2].replace(/\*\*/g, '')}
              </p>
            );
          }
        }
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={i} className="border-l-3 border-brand-verde pl-3 italic text-gray-600 my-2">
              {trimmed.slice(2).replace(/\*\*/g, '')}
            </blockquote>
          );
        }

        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-blu font-semibold">$1</strong>');
        return <p key={i} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
      })}
    </div>
  );
}

export default function AIChatContainer({ assistantType }: AIChatContainerProps) {
  const { user } = useAuth();
  const isAdmin = user?.is_admin === true;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [chatCount, setChatCount] = useState<number>(getChatCount());
  const [streamingText, setStreamingText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isTyping, streamingText]);

  useEffect(() => {
    if (!isAdmin && chatCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true);
    }
  }, [chatCount, isAdmin]);

  useEffect(() => {
    if (user?.id) loadConversations();
  }, [user?.id]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const loadConversations = async () => {
    if (!user?.id) return;
    const { data } = await ChatService.loadConversations(user.id);
    if (data) setConversations(data);
  };

  const loadConversationMessages = async (convId: string) => {
    const { data } = await ChatService.loadConversationMessages(convId);
    if (data) {
      setMessages(data.map(m => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: m.created_at,
        citations: m.citations || [],
      })));
      setActiveConversationId(convId);
    }
  };

  const createNewConversation = async (firstMessage?: string): Promise<string | null> => {
    if (!user?.id) return null;
    const { data } = await ChatService.createConversation(user.id);
    if (data) {
      const title = firstMessage ? generateConversationTitle(firstMessage) : 'Nuova conversazione';
      setConversations(prev => [{ ...data, title }, ...prev.filter(c => c.id !== data.id)]);
      return data.id;
    }
    return null;
  };

  const deleteConversation = async (convId: string) => {
    await ChatService.deleteConversation(convId);
    setConversations(prev => prev.filter(c => c.id !== convId));
    if (activeConversationId === convId) {
      setActiveConversationId(null);
      setMessages([]);
    }
  };

  const typewriterEffect = useCallback((text: string, onComplete: () => void) => {
    setIsTyping(true);
    setStreamingText('');
    let index = 0;
    const chunkSize = 3;
    const baseDelay = 8;

    const type = () => {
      if (index < text.length) {
        const nextIndex = Math.min(index + chunkSize, text.length);
        setStreamingText(text.slice(0, nextIndex));
        index = nextIndex;

        const char = text[nextIndex - 1];
        let delay = baseDelay;
        if (char === '.' || char === '!' || char === '?') delay = 80;
        else if (char === ',') delay = 40;
        else if (char === '\n') delay = 30;

        setTimeout(type, delay);
      } else {
        setIsTyping(false);
        setStreamingText('');
        onComplete();
      }
    };

    type();
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading || isTyping) return;

    const currentCount = getChatCount();
    if (!isAdmin && currentCount >= FREE_MESSAGE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    let convId = activeConversationId;
    if (!convId && user?.id) {
      convId = await createNewConversation(content.trim());
      if (convId) setActiveConversationId(convId);
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

    const startTime = Date.now();

    try {
      const response = await ChatService.generateChatResponse(
        content.trim(),
        messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
      );
      const latencyMs = Date.now() - startTime;

      // Typewriter effect
      await new Promise<void>(resolve => {
        typewriterEffect(response.text, resolve);
      });

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toISOString(),
        citations: response.citations,
      };

      setMessages(prev => [...prev, assistantMsg]);

      if (convId) {
        await ChatService.saveMessage(convId, 'user', content.trim());
        await ChatService.saveMessage(convId, 'assistant', response.text, response.citations, latencyMs);
        if (user?.id) {
          await ChatService.logGeminiCall(user.id, content.trim(), response.text, latencyMs, Math.ceil(content.length / 4));
        }
        trackChatMessage({ latency_ms: latencyMs, has_citations: (response.citations?.length ?? 0) > 0 });
      }
    } catch {
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Mi scuso, il servizio è temporaneamente in sovraccarico. Riprova tra qualche istante.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isTyping, messages, isAdmin, user?.id, activeConversationId, typewriterEffect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }, [input, sendMessage]);

  const handleFollowUp = useCallback((prompt: string) => {
    sendMessage(prompt);
  }, [sendMessage]);

  const lastAssistantMsg = messages.filter(m => m.role === 'assistant').pop();
  const showFollowUps = !isLoading && !isTyping && lastAssistantMsg && messages[messages.length - 1]?.role === 'assistant';

  return (
    <div className="flex h-full max-w-6xl mx-auto">
      {showPaywall && <BannerPaywall />}

      {user?.id && (
        <div className={`${showSidebar ? 'w-72' : 'w-12'} bg-gray-50 border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col overflow-hidden`}>
          <button onClick={() => setShowSidebar(!showSidebar)}
            className="p-3 hover:bg-gray-200 transition flex items-center gap-2 text-gray-600"
            title="Conversazioni">
            <MessageSquare size={18} />
            {showSidebar && <span className="text-sm font-medium">Conversazioni</span>}
          </button>

          {showSidebar && (
            <>
              <button onClick={async () => {
                const convId = await createNewConversation();
                if (convId) {
                  setActiveConversationId(convId);
                  setMessages([]);
                }
              }}
                className="mx-3 mb-2 flex items-center gap-2 px-3 py-2 bg-brand-blu text-white rounded-xl text-sm font-medium hover:bg-brand-blu/90 transition">
                <Plus size={14} /> Nuova conversazione
              </button>

              <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {conversations.map(conv => (
                  <div key={conv.id}
                    onClick={() => loadConversationMessages(conv.id)}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition ${
                      activeConversationId === conv.id ? 'bg-brand-blu/10 text-brand-blu' : 'text-gray-600 hover:bg-gray-200'
                    }`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{conv.title}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock size={9} />
                        {new Date(conv.updated_at).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); deleteConversation(conv.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition">
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-brand-blu to-brand-verde rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-blu mb-2">
                Assistente Normativo {assistantType ? `- ${assistantType}` : ''}
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto text-sm">
                Assistente virtuale specializzato su normativa scolastica. Risposte basate su fonti primarie certificate (G.U., MIM, Normattiva, ARAN, INPS).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {SUGGESTED_PROMPTS.map(({ category, prompt }) => (
                  <button key={prompt} onClick={() => sendMessage(prompt)}
                    className="text-left p-4 bg-white/70 border border-gray-200 rounded-2xl hover:border-brand-blu hover:bg-brand-blu/5 transition group">
                    <span className="text-[10px] font-bold text-brand-verde uppercase tracking-wider">{category}</span>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-800">{prompt}</p>
                  </button>
                ))}
              </div>
              {!isAdmin && (
                <p className="text-xs text-gray-400 mt-6">
                  Consultazioni gratuite rimanenti: {Math.max(0, FREE_MESSAGE_LIMIT - chatCount)} / {FREE_MESSAGE_LIMIT}
                </p>
              )}
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'user' ? 'bg-brand-blu' : 'bg-gradient-to-r from-brand-verde to-brand-ottanio'
              }`}>
                <span className="text-white text-xs font-bold">{msg.role === 'user' ? 'U' : 'AI'}</span>
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-brand-blu text-white'
                  : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
              }`}>
                <MessageRenderer content={msg.content} isUser={msg.role === 'user'} />
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                      <BookOpen size={10} /> Fonti normative:
                    </p>
                    {msg.citations.map((c, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-brand-ottanio">
                        <ArrowRight size={10} />
                        <span>{c.title}</span>
                        <span className="text-gray-400">({(c.confidence * 100).toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.role === 'assistant' && <CopyButton text={msg.content} />}
                </div>
              </div>
            </div>
          ))}

          {/* Streaming text display */}
          {isTyping && streamingText && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-verde to-brand-ottanio rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div className="max-w-[80%] p-4 rounded-2xl bg-white border border-gray-200 text-gray-800 shadow-sm">
                <MessageRenderer content={streamingText} isUser={false} />
                <span className="inline-block w-1.5 h-4 bg-brand-ottanio animate-pulse ml-0.5" />
              </div>
            </div>
          )}

          {isLoading && !isTyping && <TypingIndicator />}

          {/* Follow-up suggestions */}
          {showFollowUps && (
            <div className="flex flex-wrap gap-2 ml-11 animate-fade-in-up">
              {FOLLOW_UP_PROMPTS.default.map(prompt => (
                <button key={prompt} onClick={() => handleFollowUp(prompt)}
                  className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-brand-blu hover:text-brand-blu hover:bg-brand-blu/5 transition">
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xs p-4">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || isTyping || (!isAdmin && chatCount >= FREE_MESSAGE_LIMIT)}
              placeholder={
                isAdmin
                  ? 'Scrivi la tua domanda all\'Assistente Normativo...'
                  : chatCount >= FREE_MESSAGE_LIMIT
                    ? 'Limite gratuito raggiunto.'
                    : 'Scrivi la tua domanda all\'Assistente Normativo...'
              }
              rows={1}
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:ring-2 focus:ring-brand-blu focus:border-brand-blu disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || isTyping || !input.trim() || (!isAdmin && chatCount >= FREE_MESSAGE_LIMIT)}
              className="px-5 py-3 bg-gradient-to-r from-brand-blu to-brand-verde text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex justify-between mt-2 max-w-4xl mx-auto">
            {isAdmin ? (
              <p className="text-xs text-brand-verde font-medium">Accesso amministratore: consultazioni illimitate</p>
            ) : (
              <p className="text-xs text-gray-400">
                Consultazioni gratuite: {Math.max(0, FREE_MESSAGE_LIMIT - chatCount)}/{FREE_MESSAGE_LIMIT}
              </p>
            )}
            {chatCount > 0 && (
              <button onClick={() => {
                setMessages([]);
                setActiveConversationId(null);
                resetChatCount();
                setChatCount(0);
                setShowPaywall(false);
              }} className="text-xs text-gray-400 hover:text-red-400 transition">
                Reset conversazione
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
