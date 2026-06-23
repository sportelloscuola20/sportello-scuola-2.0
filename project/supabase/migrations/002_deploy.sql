CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://xawemvuralsgwvypiufl.supabase.co/functions/v1/send-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhd2VtdnVyYWxzZ3d2eXBpdWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODg5NDUsImV4cCI6MjA5NjA2NDk0NX0.KfJ94SAE6RStG8XH3d4h2sMcsZDwJBFGkCvafItHs_U'
      ),
      body := jsonb_build_object(
        'to', 'sportelloscuola2.0@gmail.com',
        'subject', 'Nuova Registrazione — ' || COALESCE(NEW.full_name, 'Utente senza nome'),
        'html',
          '<div style="font-family:sans-serif;max-width:600px;margin:0 auto">' ||
          '<div style="background:linear-gradient(135deg,#B45309,#D97706);padding:24px;text-align:center;border-radius:16px 16px 0 0">' ||
          '<h2 style="color:#fff;margin:0">Nuovo Utente Iscritto</h2>' ||
          '<p style="color:rgba(255,255,255,0.8);margin:4px 0 0">Notifica Operativa</p>' ||
          '</div>' ||
          '<div style="background:#fff;padding:24px;border-radius:0 0 16px 16px;border:1px solid #e5e7eb">' ||
          '<table style="width:100%;border-collapse:collapse">' ||
          '<tr><td style="padding:8px;font-weight:600;color:#4a5568;width:120px">Nome</td>' ||
          '<td style="padding:8px;color:#1a1a2e">' || COALESCE(NEW.full_name, '-') || '</td></tr>' ||
          '<tr style="background:#f8fafc"><td style="padding:8px;font-weight:600;color:#4a5568">Ruolo</td>' ||
          '<td style="padding:8px;color:#1a1a2e">' || COALESCE(NEW.ruolo, '-') || '</td></tr>' ||
          '<tr><td style="padding:8px;font-weight:600;color:#4a5568">Email</td>' ||
          '<td style="padding:8px;color:#1a1a2e">' || COALESCE(NEW.email, '-') || '</td></tr>' ||
          '</table>' ||
          '<p style="font-size:12px;color:#9ca3af;margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb">' ||
          'Inviato automaticamente da Sportello Scuola 2.0</p>' ||
          '</div></div>'
      )::text
    );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_profile();
