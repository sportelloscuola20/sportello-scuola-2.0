import type { KnowledgeLink } from '../types/intelligence';
import { supabase } from '../lib/supabaseClient';

export async function fetchKnowledgeGraph(newsId: string): Promise<KnowledgeLink[]> {
  try {
    const { data, error } = await supabase.rpc('get_related_news', {
      p_news_id: newsId,
      p_max_depth: 2,
      p_limit: 20,
    });
    if (!error && data) {
      return data.map((r: any) => ({
        id: `${newsId}-${r.news_id}`,
        news_id_a: newsId,
        news_id_b: r.news_id,
        tipo_relazione: r.relazione,
        peso: r.peso_val,
        created_at: new Date().toISOString(),
      })) as KnowledgeLink[];
    }
  } catch {}
  return [];
}
