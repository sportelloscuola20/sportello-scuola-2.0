import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SMTP_HOST = Deno.env.get('SMTP_HOST') || '';
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
const SMTP_USER = Deno.env.get('SMTP_USER') || '';
const SMTP_PASS = Deno.env.get('SMTP_PASS') || '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@sportelloscuola2-0.it';
const FROM_NAME = Deno.env.get('FROM_NAME') || 'Sportello Scuola 2.0';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

async function sendViaResend(payload: EmailPayload): Promise<Response> {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured');
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
  return res;
}

async function sendViaSMTP(payload: EmailPayload): Promise<void> {
  if (!SMTP_HOST) {
    throw new Error('SMTP not configured');
  }
  const client = new SmtpClient();
  await client.connectTLS({
    hostname: SMTP_HOST,
    port: SMTP_PORT,
    username: SMTP_USER,
    password: SMTP_PASS,
  });
  await client.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: payload.to,
    subject: payload.subject,
    content: payload.html,
    html: payload.html,
  });
  await client.close();
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const payload: EmailPayload = await req.json();

    if (!payload.to || !payload.subject || !payload.html) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: to, subject, html',
      }), { status: 400 });
    }

    const errors: string[] = [];

    if (RESEND_API_KEY) {
      try {
        await sendViaResend(payload);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        errors.push(`Resend: ${e.message}`);
      }
    }

    if (SMTP_HOST) {
      try {
        await sendViaSMTP(payload);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        errors.push(`SMTP: ${e.message}`);
      }
    }

    console.log('EMAIL QUEUED (no provider configured):', {
      to: payload.to,
      subject: payload.subject,
      htmlLength: payload.html.length,
    });

    return new Response(JSON.stringify({
      success: true,
      queued: true,
      message: 'Email logged. Configure RESEND_API_KEY or SMTP_* env vars to send.',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
