import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'assistenza@sportelloscuola2-0.it';
const FROM_NAME = Deno.env.get('FROM_NAME') || 'Sportello Scuola 2.0';
const REPLY_TO = 'sportelloscuola2.0@gmail.com';
const JWT_SECRET = Deno.env.get('SUPABASE_JWT_SECRET') || '';
// Recipients allowed to receive emails through this function (prevents open relay)
const ALLOWED_RECIPIENTS = new Set(
  (Deno.env.get('ALLOWED_EMAIL_RECIPIENTS') || 'sportelloscuola2.0@gmail.com')
    .split(',').map((s) => s.trim()).filter(Boolean),
);

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// Verify an HS256 JWT (Supabase-issued tokens are signed with SUPABASE_JWT_SECRET).
// Returns true only if the signature is valid — anon, authenticated and service tokens
// are all accepted, but a forged token without the secret is rejected.
async function verifyJwt(token: string): Promise<boolean> {
  if (!JWT_SECRET || !token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [headerB64, payloadB64, signatureB64] = parts;
  try {
    const data = `${headerB64}.${payloadB64}`;
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
    const expected = btoa(String.fromCharCode(...new Uint8Array(sig)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return expected === signatureB64;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Require a valid Supabase-issued JWT (defense against open relay).
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token || !(await verifyJwt(token))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload: EmailPayload = await req.json();

    if (!payload.to || !payload.subject || !payload.html) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: to, subject, html',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Restrict recipients to the allowlist — blocks email relay/spam abuse.
    if (!ALLOWED_RECIPIENTS.has(payload.to.trim().toLowerCase())) {
      return new Response(JSON.stringify({ error: 'Recipient not allowed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
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
