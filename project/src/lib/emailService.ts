const CREATOR_EMAIL = import.meta.env.VITE_CREATOR_EMAIL || 'sportelloscuola2.0@gmail.com';

function onboardingTemplate(params: {
  fullName: string;
  email: string;
  ruolo: string;
  token?: string;
}): string {
  const { fullName, email, ruolo, token } = params;
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Benvenuto su Sportello Scuola 2.0</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',system-ui,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="background:linear-gradient(135deg,#235377,#1F915E);border-radius:16px 16px 0 0;padding:32px;text-align:center">
<img src="https://placehold.co/80x80/ffffff/235377?text=SS" alt="Sportello Scuola 2.0" style="width:80px;height:80px;border-radius:50%;margin-bottom:12px">
<h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0">Benvenuto su Sportello Scuola 2.0</h1>
<p style="color:rgba(255,255,255,0.85);font-size:14px;margin:8px 0 0">La piattaforma tecnologica per la tua carriera nella scuola</p>
</td></tr>
<tr><td style="background:#ffffff;padding:32px;border-radius:0 0 16px 16px;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
<p style="font-size:16px;color:#1a1a2e;margin:0 0 16px">Gentile <strong>${fullName}</strong>,</p>
<p style="font-size:14px;color:#4a5568;line-height:1.6;margin:0 0 20px">
La tua registrazione su Sportello Scuola 2.0 &egrave; stata completata con successo. 
Hai ora accesso a tutti i servizi della piattaforma per la gestione della tua carriera nel sistema scolastico italiano.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:20px">
<tr><td style="font-size:13px;font-weight:600;color:#235377;padding-bottom:8px">Riepilogo Account</td></tr>
<tr><td style="font-size:13px;color:#4a5568;padding:4px 0"><strong>Email:</strong> ${email}</td></tr>
<tr><td style="font-size:13px;color:#4a5568;padding:4px 0"><strong>Ruolo:</strong> ${ruolo === 'docente' ? 'Docente' : ruolo === 'ata' ? 'ATA' : 'Aspirante'}</td></tr>
<tr><td style="font-size:13px;color:#4a5568;padding:4px 0"><strong>Stato:</strong> <span style="color:#eab308;font-weight:600">In attesa di verifica email</span></td></tr>
</table>

${token ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
<tr><td align="center">
<a href="${token}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#235377,#1F915E);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:700">Verifica il tuo Account</a>
</td></tr>
</table>` : ''}

<p style="font-size:13px;color:#6b7280;line-height:1.5;margin:0 0 8px">
<strong>Cosa puoi fare ora:</strong>
</p>
<ul style="font-size:13px;color:#6b7280;line-height:1.6;padding-left:20px;margin:0 0 20px">
<li>Calcolare il tuo punteggio GPS e ATA con i simulatori ufficiali</li>
<li>Salvare notizie e scadenze come preferiti</li>
<li>Configurare il tuo profilo professionale per la pre-compilazione automatica</li>
<li>Accedere all'archivio completo di notizie e normative</li>
<li>Ricevere notifiche personalizzate sulle scadenze</li>
</ul>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
<p style="font-size:11px;color:#9ca3af;line-height:1.4;margin:0">
Sportello Scuola 2.0 — Piattaforma per la gestione della carriera scolastica.<br>
Questa email &egrave; stata inviata automaticamente a ${email}.<br>
Se non hai richiesto questa registrazione, ignora questa email.
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function adminAlertTemplate(params: {
  uuid: string;
  fullName: string;
  email: string;
  ruolo: string;
  profilo?: string;
  punteggio?: number;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}): string {
  const { uuid, fullName, email, ruolo, profilo, punteggio, timestamp, ip, userAgent } = params;
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notifica Admin — Nuova Registrazione</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',system-ui,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="background:linear-gradient(135deg,#B45309,#D97706);border-radius:16px 16px 0 0;padding:24px;text-align:center">
<h2 style="color:#ffffff;font-size:20px;font-weight:700;margin:0">Nuova Registrazione</h2>
<p style="color:rgba(255,255,255,0.85);font-size:13px;margin:4px 0 0">Notifica Operativa — ${timestamp}</p>
</td></tr>
<tr><td style="background:#ffffff;padding:32px;border-radius:0 0 16px 16px">
<table width="100%" cellpadding="6" cellspacing="0" style="margin-bottom:20px">
<tr style="background:#f8fafc"><td style="font-size:13px;font-weight:600;color:#4a5568;width:120px">UUID</td><td style="font-size:13px;color:#1a1a2e;font-family:monospace">${uuid}</td></tr>
<tr><td style="font-size:13px;font-weight:600;color:#4a5568">Nome</td><td style="font-size:13px;color:#1a1a2e;font-weight:600">${fullName}</td></tr>
<tr style="background:#f8fafc"><td style="font-size:13px;font-weight:600;color:#4a5568">Email</td><td style="font-size:13px;color:#1a1a2e">${email}</td></tr>
<tr><td style="font-size:13px;font-weight:600;color:#4a5568">Ruolo</td><td style="font-size:13px;color:#1a1a2e">${ruolo}</td></tr>
${profilo ? `<tr style="background:#f8fafc"><td style="font-size:13px;font-weight:600;color:#4a5568">Profilo</td><td style="font-size:13px;color:#1a1a2e">${profilo}</td></tr>` : ''}
${punteggio !== undefined ? `<tr><td style="font-size:13px;font-weight:600;color:#4a5568">Punteggio</td><td style="font-size:13px;color:#B45309;font-weight:700">${punteggio} pt</td></tr>` : ''}
${ip ? `<tr style="background:#f8fafc"><td style="font-size:13px;font-weight:600;color:#4a5568">IP</td><td style="font-size:13px;color:#4a5568">${ip}</td></tr>` : ''}
${userAgent ? `<tr><td style="font-size:13px;font-weight:600;color:#4a5568">User Agent</td><td style="font-size:13px;color:#4a5568;word-break:break-all">${userAgent}</td></tr>` : ''}
</table>

<p style="font-size:13px;color:#6b7280;line-height:1.5;margin:0">
<a href="https://app.sportelloscuola2-0.it/admin/users/${uuid}" style="color:#235377;font-weight:600;text-decoration:underline">Apri nel CRM →</a>
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const EMAIL_QUEUE_KEY = 'ss2_email_queue';

function queueEmail(payload: { to: string; subject: string; html: string }) {
  try {
    const existing = JSON.parse(localStorage.getItem(EMAIL_QUEUE_KEY) || '[]');
    existing.push({ ...payload, queuedAt: new Date().toISOString() });
    localStorage.setItem(EMAIL_QUEUE_KEY, JSON.stringify(existing));
    console.log('[EMAIL QUEUED]', { to: payload.to, subject: payload.subject });
  } catch {
    console.log('[EMAIL LOG]', payload);
  }
}

async function trySendViaApi(payload: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseUrl.startsWith('http') && anonKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/functions/v1/send-email`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${anonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) return true;
      const text = await res.text();
      if (res.status === 404) {
        console.log('[EMAIL] Edge Function not deployed. Queueing.');
        return false;
      }
      console.warn('[EMAIL] API error:', res.status, text);
      return false;
    } catch (e) {
      console.warn('[EMAIL] Network error:', e);
      return false;
    }
  }
  return false;
}

export async function sendOnboardingEmail(params: {
  fullName: string;
  email: string;
  ruolo: string;
}): Promise<{ error: string | null }> {
  const { fullName, email, ruolo } = params;
  const html = onboardingTemplate({ fullName, email, ruolo });

  const sent = await trySendViaApi({
    to: email,
    subject: 'Benvenuto su Sportello Scuola 2.0 — Attiva il tuo Account',
    html,
  });

  if (!sent) {
    queueEmail({ to: email, subject: 'Benvenuto su Sportello Scuola 2.0', html });
  }

  return { error: null };
}

export async function sendAdminNotification(params: {
  uuid: string;
  fullName: string;
  email: string;
  ruolo: string;
  profilo?: string;
  punteggio?: number;
  ip?: string;
  userAgent?: string;
}): Promise<{ error: string | null }> {
  const html = adminAlertTemplate({
    ...params,
    timestamp: new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
  });

  const sent = await trySendViaApi({
    to: CREATOR_EMAIL,
    subject: `[Sportello Scuola] Nuova Registrazione — ${params.fullName}`,
    html,
  });

  if (!sent) {
    queueEmail({ to: CREATOR_EMAIL, subject: `Nuova Registrazione — ${params.fullName}`, html });
  }

  return { error: null };
}

export { onboardingTemplate, adminAlertTemplate };
