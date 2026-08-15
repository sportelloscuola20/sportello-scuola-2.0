import { supabase } from './supabaseClient';
import { Document } from './types';

export async function ingestDocument(document: Document): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([
        {
          title: document.title,
          content: document.content,
          source: document.source,
          metadata: document.metadata || {},
          uploaded_by: document.metadata?.userId, // Assuming we pass userId in metadata
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error ingesting document:', error);
    throw error;
  }
}

export async function getDocument(id: string): Promise<Document | null> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      source: data.source || '',
      uploadedAt: data.uploaded_at,
      metadata: data.metadata,
    };
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}