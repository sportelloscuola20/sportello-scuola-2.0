import { EmbeddingResponse } from './types';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = import.meta.env.VITE_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

if (!OPENROUTER_API_KEY) {
  console.warn('VITE_OPENROUTER_API_KEY is not set. OpenRouter API calls will fail.');
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002', // or any other embedding model available via OpenRouter
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter embedding error: ${response.statusText}`);
    }

    const data = await response.json();
    // Assuming the response format is similar to OpenAI's: { data: [{ embedding: [...] }] }
    return data.data[0].embedding;
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
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku', // or any other model; we can make this configurable
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter chat error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat completion:', error);
    throw error;
  }
}