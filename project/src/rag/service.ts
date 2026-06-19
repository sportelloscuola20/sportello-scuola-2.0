import { supabase } from './supabaseClient';
import { Document } from './types';
import { ingestDocument as ingestDoc, getDocument as getDoc } from './ingestion';
import { chunkDocument } from './chunking';
import { storeChunksWithEmbeddings } from './storage';
import { ragQuery } from './retrieval';

/**
 * RAG Service for AI Assistants
 * Provides a high-level interface for document ingestion and querying.
 */

/**
 * Ingest a document into the RAG system.
 * This function will:
 *   1. Store the document in the documents table.
 *   2. Chunk the document content.
 *   3. Store each chunk with its embedding.
 * @param document The document to ingest
 * @returns The ID of the ingested document
 */
export async function ingestDocument(document: Document): Promise<string> {
  // 1. Store the document and get its ID
  const documentId = await ingestDoc(document);

  // 2. Chunk the document
  const chunks = chunkDocument({ ...document, id: documentId });

  // 3. Store the chunks with embeddings
  await storeChunksWithEmbeddings(chunks);

  return documentId;
}

/**
 * Query the RAG system with a question.
 * @param request The RAG query request (query, limit, threshold)
 * @returns The answer and citations
 */
export async function query(request: { query: string; limit?: number; threshold?: number }) {
  return await ragQuery(request);
}

/**
 * Get a document by its ID.
 * @param id The document ID
 * @returns The document or null if not found
 */
export async function getDocumentById(id: string) {
  return await getDoc(id);
}

/**
 * Get all documents (with pagination, optional filters).
 * This is a simple implementation; you can extend it as needed.
 * @param limit Maximum number of documents to return
 * @param offset Offset for pagination
 * @returns Array of documents
 */
export async function getDocuments(limit: number = 10, offset: number = 0) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('uploaded_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export default {
  ingestDocument,
  query,
  getDocumentById,
  getDocuments,
};