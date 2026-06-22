import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@sportelloscuola2-0.it';
const FROM_NAME = Deno.env.get('FROM_NAME') || 'Sportello Scuola 2.0';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
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
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (RESEND_API_KEY) {
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

      if (res.ok) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const body = await res.text();
      console.error('Resend error:', res.status, body);
      return new Response(JSON.stringify({
        success: false,
        error: `Resend error ${res.status}`,
        detail: body,
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      success: false,
      queued: false,
      message: 'RESEND_API_KEY not configured. Set it in Supabase Edge Function env vars.',
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('Fatal error:', e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
