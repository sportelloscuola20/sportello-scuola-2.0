-- Fix: rimuovi set-returning function da COALESCE, semplifica trigger
-- Le scadenze sono già gestite dalla Edge Function ingest-news
DROP TRIGGER IF EXISTS trg_auto_generate_scadenze ON intelligence_news;

CREATE OR REPLACE FUNCTION auto_generate_scadenze()
RETURNS TRIGGER AS $$
DECLARE
  extracted_date TIMESTAMPTZ;
BEGIN
  -- Prova a estrarre una data dal livello 3 (Impatto Operativo)
  BEGIN
    SELECT (regexp_matches(
      (SELECT value::text FROM jsonb_array_elements(NEW.produzione_livelli) WHERE jsonb_extract_path_text(value, 'livello') = '3' LIMIT 1),
      '\d{2}/\d{2}/\d{4}'
    ))[1]::TIMESTAMPTZ INTO extracted_date;
  EXCEPTION WHEN OTHERS THEN
    extracted_date := NULL;
  END;

  INSERT INTO intelligence_scadenze (
    news_id, titolo, normativa, soggetti_coinvolti,
    data_scadenza, priorita, impatto, tipo, auto_generata
  )
  SELECT
    NEW.id,
    'Scadenza: ' || NEW.titolo,
    NEW.fonte_primaria,
    NEW.target,
    COALESCE(extracted_date, NEW.data_pubblicazione + INTERVAL '30 days'),
    NEW.criticita,
    NEW.impatto,
    'auto_' || NEW.categoria,
    TRUE
  WHERE NOT EXISTS (
    SELECT 1 FROM intelligence_scadenze WHERE news_id = NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auto_generate_scadenze
  AFTER INSERT ON intelligence_news
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_scadenze();
