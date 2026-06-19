import { useState, useEffect } from 'react';
import { MessageCircle, Send, FileText, Sparkles, ArrowLeft } from 'lucide-react';
import ragService from '../rag/service';
import { Document } from '../rag/types';

export default function AIChatContainer({
  assistantType,
  initialMessages = []
}: {
  assistantType: string;
  initialMessages?: Array<{ role: 'user' | 'assistant', content: string }>;
}) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, citations?: any[] }>>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<Array<string>>([]);

  // Load suggested prompts based on assistant type
  useEffect(() => {
    const promptsMap: Record<string, Array<string>> = {
      'Docente': [
        "Posso accettare questa supplenza?",
        "Calcola il mio punteggio GPS",
        "Aiutami a creare una UDA"
      ],
      'ATA': [
        "Quanto vale questo attestato?",
        "Quali sono i requisiti per la mobilità ATA?",
        "Come si calcola il punteggio per il profilo di assistente amministrativo?"
      ],
      'Dirigente': [
        "Come gestire una richiesta di permesso?",
        "Qual è la procedura per le nomine?",
        "Quali sono gli obblighi in materia di sicurezza sul lavoro?"
      ],
      'Sindacale': [
        "Posso rifiutare questa supplenza?",
        "Hai diritto ai permessi per legge 104?",
        "Quali sono le sanzioni per violazione del CCNL?"
      ]
    };

    setSuggestedPrompts(promptsMap[assistantType as keyof typeof promptsMap] || []);
  }, [assistantType]);

  // Add a welcome message if no messages yet
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = `Ciao! Sono il tuo assistente AI specializzato per ${assistantType.toLowerCase()}. Come posso aiutarti oggi?`;
      setMessages(prev => [...prev, { role: 'assistant' as const, content: welcomeMessage }]);
    }
  }, [messages.length, assistantType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Query the RAG system
      const response = await ragService.query({
        query: input,
        limit: 5,
        threshold: 0.7
      });

      const assistantMessage = {
        role: 'assistant' as const,
        content: response.answer,
        citations: response.citations
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error querying RAG:', error);
      setMessages(prev => [...prev, {
        role: 'assistant' as const,
        content: 'Si è verificato un errore. Per favore, riprova più tardi.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Assistente {assistantType}
          </h2>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
            <span className="text-indigo-600 font-medium">AI Potenziato</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 mb-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-lg ${msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500 border-t pt-2">
                    <strong>Fonti:</strong>
                    <ul className="mt-1 list-disc pl-5 space-y-1">
                      {msg.citations.map((cite, idx) => (
                        <li key={idx}>
                          <em>{cite.documentTitle}</em> (attendibilità: {(cite.score * 100).toFixed(0)}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-start mb-4">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
            </div>
            <span className="ml-2 text-gray-500">L'assistente sta pensando...</span>
          </div>
        )}

        {/* Suggested Prompts - only show if no messages beyond the welcome message */}
        {(messages.length === 1 && messages[0].role === 'assistant') && suggestedPrompts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Prova una di queste domande:
            </h3>
            <div className="flex flex-wrap gap-3">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(prompt);
                    handleSubmit(new Event('submit') as React.FormEvent);
                  }}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-medium px-4 py-2 rounded-lg transition-colors border border-indigo-200 hover:border-indigo-300 text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi il tuo messaggio qui..."
            className="flex-1 min-h-[60px] rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            disabled={loading}
            rows={2}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex-shrink-0 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Invio...' : 'Invia'}
            <Send className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}