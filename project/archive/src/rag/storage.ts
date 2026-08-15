import { supabase } from './supabaseClient';
import { DocumentChunk } from './types';
import { generateEmbedding } from './gemini';

/**
 * Store a document chunk and its embedding
 * @param chunk The document chunk to store
 * @returns The stored chunk with ID and embedding ID
 */
export async function storeChunkWithEmbedding(chunk: Omit<DocumentChunk, 'id' | 'embedding'>): Promise<DocumentChunk & { embeddingId: string }> {
  try {
    // Start a transaction? We'll do it sequentially for simplicity.
    // In production, you might want to use a transaction or handle errors appropriately.

    // 1. Store the chunk
    const { data: chunkData, error: chunkError } = await supabase
      .from('document_chunks')
      .insert([
        {
          document_id: chunk.documentId,
          content: chunk.content,
          chunk_index: chunk.chunkIndex,
        },
      ])
      .select()
      .single();

    if (chunkError) throw chunkError;

    // 2. Generate embedding for the chunk content
    const embedding = await generateEmbedding(chunk.content);

    // 3. Store the embedding
    const { data: embeddingData, error: embeddingError } = await supabase
      .from('embeddings')
      .insert([
        {
          chunk_id: chunkData.id,
          embedding: embedding, // This will be stored as a vector
          model: 'text-embedding-ada-002', // Should match the model used in generateEmbedding
        },
      ])
      .select()
      .single();

    if (embeddingError) throw embeddingError;

    return {
      ...chunkData,
      embeddingId: embeddingData.id,
    };
  } catch (error) {
    console.error('Error storing chunk with embedding:', error);
    throw error;
  }
}

/**
 * Store multiple chunks with embeddings
 * @param chunks Array of document chunks to store
 * @returns Array of stored chunks with IDs and embedding IDs
 */
export async function storeChunksWithEmbeddings(chunks: Omit<DocumentChunk, 'id' | 'embedding'>[]): Promise<Array<DocumentChunk & { embeddingId: string }>> {
  const results: Array<DocumentChunk & { embeddingId: string }> = [];

  for (const chunk of chunks) {
    try {
      const stored = await storeChunkWithEmbedding(chunk);
      results.push(stored);
    } catch (error) {
      console.error(`Error storing chunk at index ${chunk.chunkIndex}:`, error);
      // Depending on requirements, you might want to stop or continue
      throw error;
    }
  }

  return results;
}