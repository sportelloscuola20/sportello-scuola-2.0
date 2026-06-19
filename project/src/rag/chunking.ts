import { Document } from './types';

/**
 * Split text into chunks with overlap
 * @param text The text to split
 * @param chunkSize The target size of each chunk in characters
 * @param overlap The number of characters to overlap between chunks
 * @returns Array of text chunks
 */
export function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] {
  if (!text || text.length === 0) return [];

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.substring(start, end));

    // Move start position for next chunk, accounting for overlap
    start = end - overlap;

    // Break if we've reached the end
    if (end >= text.length) break;

    // Ensure we don't get stuck in an infinite loop
    if (start <= chunks.length > 0 && chunks[chunks.length - 1].length === 0) {
      break;
    }
  }

  return chunks;
}

/**
 * Split document into chunks with metadata
 * @param document The document to chunk
 * @param chunkSize The target size of each chunk in characters
 * @param overlap The number of characters to overlap between chunks
 * @returns Array of document chunks
 */
export function chunkDocument(
  document: Document,
  chunkSize: number = 1000,
  overlap: number = 200
): Omit<DocumentChunk, 'id' | 'embedding'>[] {
  const textChunks = chunkText(document.content, chunkSize, overlap);

  return textChunks.map((content, index) => ({
    documentId: document.id,
    content,
    chunkIndex: index
  }));
}