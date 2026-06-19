export interface Document {
  id: string;
  title: string;
  content: string;
  source: string;
  uploadedAt: string;
  metadata?: Record<string, any>;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  content: string;
  chunkIndex: number;
  embedding?: number[];
}

export interface EmbeddingResponse {
  embedding: number[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  citations?: Citation[];
  createdAt: string;
}

export interface Citation {
  documentId: string;
  chunkId: string;
  documentTitle: string;
  content: string;
  score: number;
}

export interface RagQueryRequest {
  query: string;
  limit?: number;
  threshold?: number;
}

export interface RagQueryResponse {
  answer: string;
  citations: Citation[];
}