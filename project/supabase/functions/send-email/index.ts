import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'assistenza@sportelloscuola2-0.it';
const FROM_NAME = Deno.env.get('FROM_NAME') || 'Sportello Scuola 2.0';
const REPLY_TO = 'sportelloscuola2.0@gmail.com';

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

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({
        success: false,
        error: 'RESEND_API_KEY not configured',
      }), { status: 500, headers: { 'Content-Type': 'application/json' } });
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
        reply_to: REPLY_TO,
      }),
    });

    const body = await res.text();

    if (res.ok) {
      return new Response(JSON.stringify({ success: true, data: body }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.error('Resend error:', res.status, body);
    return new Response(JSON.stringify({
      success: false,
      error: `Resend error ${res.status}`,
      detail: body,
    }), { status: res.status, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('Fatal error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
