// Script per configurare i template email di Supabase Auth
// Esegui con: npx tsx src/scripts/configure-supabase-auth.ts
// Richiede: SUPABASE_PAT (Personal Access Token) come env var

const SUPABASE_PROJECT_REF = 'xawemvuralsgwvypiufl';
const SUPABASE_PAT = process.env.SUPABASE_PAT || '';

const CONFIRM_TEMPLATE = {
  subject: 'Conferma la tua registrazione su Sportello Scuola 2.0',
  content: `<h2>Benvenuto su Sportello Scuola 2.0!</h2>
<p>Ciao {{ .Nome }},</p>
<p>Grazie per esserti registrato sulla nostra piattaforma.</p>
<p>Clicca sul pulsante qui sotto per attivare il tuo account e accedere all'Area Riservata:</p>
<p style="text-align:center;margin:32px 0">
  <a href="{{ .ConfirmationURL }}"
     style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#235377,#1F915E);color:#ffffff;text-decoration:none;border-radius:12px;font-size:16px;font-weight:700">
    Attiva il mio Account
  </a>
</p>
<p style="color:#6b7280;font-size:13px">
Se non hai richiesto tu questa registrazione, ignora questa email.
</p>`,
};

async function api(path: string, method: string, body?: unknown) {
  const url = `https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${SUPABASE_PAT}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data: unknown = text;
  try { data = JSON.parse(text); } catch { /* ignore */ }
  return { ok: res.ok, status: res.status, data };
}

async function configureAuthTemplates() {
  if (!SUPABASE_PAT) {
    console.error('ERRORE: Imposta SUPABASE_PAT come variabile d\'ambiente');
    console.log('Ottieni un PAT da: https://supabase.com/dashboard/account/tokens');
    process.exit(1);
  }

  try {
    // 1. Get current auth config
    console.log('Fetching current auth config...');
    const getConfig = await api('/config/auth', 'GET');
    if (getConfig.ok) {
      console.log('✓ Auth config retrieved');
    } else {
      console.warn('Could not fetch config:', getConfig.data);
    }

    // 2. Configure auth settings: sender, site URL, redirect URLs
    console.log('\nConfiguring auth settings...');
    const configRes = await api('/config/auth', 'PATCH', {
      site_url: 'https://sportelloscuola2-0.it',
      uri_allow_list: JSON.stringify([
        'https://sportelloscuola2-0.it/area-riservata',
        'http://localhost:5173/area-riservata',
        'http://localhost:5173/**',
      ]),
      rate_limit_email_sent: 30,
      smtp_sender_name: 'Sportello Scuola 2.0',
      smtp_admin_email: 'assistenza@sportelloscuola2-0.it',
    });

    if (configRes.ok) {
      console.log('✓ Auth settings updated (sender, site URL, redirect URLs)');
    } else {
      console.error('Auth settings error:', configRes.data);
    }

    // 3. Update confirm signup email template
    console.log('\nUpdating confirm signup email template...');
    const templateRes = await api('/auth/templates/confirm-signup', 'PUT', {
      subject: CONFIRM_TEMPLATE.subject,
      content: CONFIRM_TEMPLATE.content,
    });

    if (templateRes.ok) {
      console.log('✓ Confirm signup template updated');
    } else {
      console.log('Template API not available via REST. To set it manually:');
      console.log('  1. Vai su https://supabase.com/dashboard/project/xawemvuralsgwvypiufl/auth/templates');
      console.log('  2. Clicca su "Confirm signup"');
      console.log('  3. Incolla il template HTML dal file src/scripts/configure-supabase-auth.ts');
      console.log('  4. Imposta il sender come: assistenza@sportelloscuola2-0.it');
      console.log('  5. Salva');
      if (templateRes.status === 404) {
        console.log('  (endpoint /auth/templates not found — using Dashboard is the only way)');
      }
    }

    console.log('\n✅ Configurazione completata!');
  } catch (err) {
    console.error('Errore:', err);
    process.exit(1);
  }
}

configureAuthTemplates();
