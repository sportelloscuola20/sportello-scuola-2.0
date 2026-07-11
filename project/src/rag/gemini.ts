const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_BASE_URL = import.meta.env.VITE_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.1-flash-lite';

if (!GEMINI_API_KEY) {
  console.warn('VITE_GEMINI_API_KEY is not set. Gemini API calls will fail.');
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch(
      `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: { temperature: 0.1 },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini embedding error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return Array.from(content).map(c => c.charCodeAt(0) / 65535).slice(0, 1536);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

export async function generateChatCompletion(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  temperature = 0.7,
  maxTokens = 1000
): Promise<string> {
  try {
    const systemInstruction = messages.find(m => m.role === 'system')?.content || '';
    const userMessages = messages.filter(m => m.role !== 'system');

    const response = await fetch(
      `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: userMessages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
            responseMimeType: 'text/plain',
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini chat error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    console.error('Error generating chat completion:', error);
    throw error;
  }
}
