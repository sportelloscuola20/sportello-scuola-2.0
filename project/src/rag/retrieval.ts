import { supabase } from './supabaseClient';
import { generateEmbedding, generateChatCompletion } from './gemini';
import { Document, DocumentChunk, Citation, RagQueryRequest, RagQueryResponse } from './types';
import { createLineage } from '../foundation/types';

/**
 * Retrieve relevant document chunks for a given query
 * @param query The user's query
 * @param limit Maximum number of chunks to return
 * @param threshold Minimum similarity score (0-1) to consider a chunk relevant
 * @returns Array of chunks with their similarity scores and document information
 */
export async function retrieveRelevantChunks(
  query: string,
  limit: number = 5,
  threshold: number = 0.7
): Promise<Array<{
  chunk: DocumentChunk & { embeddingId: string };
  document: Document;
  similarity: number;
}>> {
  try {
    // 1. Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // 2. Use the match_embeddings function to get the most similar chunks
    const { data: matchData, error: matchError } = await supabase.rpc('match_embeddings', {
      query_embedding: queryEmbedding,
      match_count: limit * 2, // Get more than needed to account for threshold filtering
    });

    if (matchError) throw matchError;

    // 3. Filter by threshold and get the chunk IDs
    const chunkMatches = matchData
      .filter((match: { similarity: number }) => match.similarity >= threshold)
      .slice(0, limit)
      .map((match: { chunk_id: string; similarity: number }) => ({
        chunkId: match.chunk_id,
        similarity: match.similarity,
      }));

    if (chunkMatches.length === 0) {
      return [];
    }

    // 4. Fetch the chunks and their associated document information
    const chunkIds = chunkMatches.map(match => match.chunkId);

    const { data: chunksData, error: chunksError } = await supabase
      .from('document_chunks')
      .select(`
        id,
        document_id,
        content,
        chunk_index,
        documents!inner (
          id,
          title,
          content,
          source,
          uploaded_at,
          metadata
        )
      `)
      .in('id', chunkIds);

    if (chunksError) throw chunksError;

    // 5. Fetch the embeddings for these chunks to get the embeddingId
    const { data: embeddingsData, error: embeddingsError } = await supabase
      .from('embeddings')
      .select('id, chunk_id')
      .in('chunk_id', chunkIds);

    if (embeddingsError) throw embeddingsError;

    // 6. Combine the data
    const results = chunksData.map(chunkRow => {
      const match = chunkMatches.find(m => m.chunkId === chunkRow.id);
      if (!match) {
        throw new Error(`No match found for chunk ${chunkRow.id}`);
      }

      const embedding = embeddingsData.find(e => e.chunk_id === chunkRow.id);
      if (!embedding) {
        throw new Error(`No embedding found for chunk ${chunkRow.id}`);
      }

      const document: Document = {
        id: chunkRow.documents.id,
        title: chunkRow.documents.title,
        content: chunkRow.documents.content,
        source: chunkRow.documents.source || '',
        uploadedAt: chunkRow.documents.uploaded_at,
        metadata: chunkRow.documents.metadata,
      };

      const chunk: DocumentChunk & { embeddingId: string } = {
        id: chunkRow.id,
        documentId: chunkRow.document_id,
        content: chunkRow.content,
        chunkIndex: chunkRow.chunk_index,
        embeddingId: embedding.id,
      };

      return {
        chunk,
        document,
        similarity: match.similarity,
      };
    });

    return results;
  } catch (error) {
    console.error('Error retrieving relevant chunks:', error);
    throw error;
  }
}

/**
 * Format the retrieved chunks into a context string for the LLM
 * @param retrievedChunks Array of retrieved chunks with document and similarity
 * @returns A formatted string containing the context
 */
export function formatContext(retrievedChunks: Array<{
  chunk: DocumentChunk & { embeddingId: string };
  document: Document;
  similarity: number;
}>): string {
  if (retrievedChunks.length === 0) {
    return '';
  }

  return retrievedChunks
    .map(
      (item, index) =>
        `[Fonte ${index + 1}: ${item.document.title}]\n${item.chunk.content}\n`
    )
    .join('\n---\n');
}

/**
 * Generate a response with citations using the LLM
 * @param query The user's query
 * @param retrievedChunks Array of retrieved chunks with document and similarity
 * @param systemPrompt Optional system prompt to guide the LLM's behavior
 * @returns A promise that resolves to the answer and citations
 */
export async function generateResponseWithCitations(
  query: string,
  retrievedChunks: Array<{
    chunk: DocumentChunk & { embeddingId: string };
    document: Document;
    similarity: number;
  }>,
  systemPrompt?: string
): Promise<RagQueryResponse> {
  // Format the context for the LLM
  const context = formatContext(retrievedChunks);

  // Default system prompt if none provided
  const defaultSystemPrompt = `Sei un assistente AI specializzato nel supporto al personale scolastico (docenti, ATA, dirigenti).
  Rispondi alla domanda dell'utente basandoti esclusivamente sul contesto fornito dalle fonti.
  Se il contesto non contiene informazioni sufficienti per rispondere, dillo chiaramente e invita l'utente a riformulare la domanda o a consultare direttamente le normative.
  Quando fai riferimento a informazioni specifiche, cita la fonte corrispondente tra parentesi quadre indicando il numero della fonte (es. [Fonte 1]).
  Non inventare informazioni e non andare oltre il contesto fornito.`;

  // Prepare the messages for the chat completion
  const messages = [
    {
      role: 'system',
      content: systemPrompt || defaultSystemPrompt,
    },
    {
      role: 'user',
      content: `Contesto:\n${context}\n\nDomanda: ${query}`,
    },
  ];

  // Generate the answer using the LLM
  const answer = await generateChatCompletion(messages, 0.3, 1000); // Lower temperature for more factual responses

  // Format the citations for the response
  const citations: Citation[] = retrievedChunks.map((item, index) => ({
    documentId: item.document.id,
    chunkId: item.chunk.id,
    documentTitle: item.document.title,
    content: item.chunk.content,
    score: item.similarity,
  }));

  return {
    answer,
    citations,
    lineage: createLineage('ai_generation', 'rag-retrieval', {
      metadata: {
        query: query.slice(0, 100),
        chunkCount: retrievedChunks.length,
        avgSimilarity: retrievedChunks.reduce((s, c) => s + c.similarity, 0) / retrievedChunks.length,
      },
    }),
  };
}

/**
 * Main RAG query function that orchestrates retrieval and response generation
 * @param request The RAG query request
 * @param systemPrompt Optional system prompt to guide the LLM's behavior
 * @returns A promise that resolves to the RAG query response
 */
export async function ragQuery(
  request: RagQueryRequest,
  systemPrompt?: string
): Promise<RagQueryResponse> {
  const { query, limit = 5, threshold = 0.7 } = request;

  // Retrieve relevant chunks
  const retrievedChunks = await retrieveRelevantChunks(query, limit, threshold);

  // If no relevant chunks are found, return a response indicating that
  if (retrievedChunks.length === 0) {
    return {
      answer: 'Non sono riuscito a trovare informazioni pertinenti nel mio sapere per rispondere alla tua domanda. Puoi provare a riformulare la domanda o verificare se le informazioni sono disponibili nelle normative caricate.',
      citations: [],
      lineage: createLineage('rag_retrieval', 'rag-retrieval', {
        metadata: { query: query.slice(0, 100), chunksFound: 0 },
      }),
    };
  }

  // Generate response with citations
  return await generateResponseWithCitations(query, retrievedChunks, systemPrompt);
}