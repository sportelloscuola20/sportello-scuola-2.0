import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || '';
const STRIPE_API = 'https://api.stripe.com/v1';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { return_url } = await req.json();
    if (!return_url) {
      return new Response(JSON.stringify({ error: 'Missing return_url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get authenticated user from Supabase Auth
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const jwt = authHeader.replace('Bearer ', '');

    const userResp = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'apikey': supabaseAnonKey,
      },
    });

    if (!userResp.ok) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userData = await userResp.json();
    const userId = userData.id;
    const userEmail = userData.email;

    // Get or create Stripe customer
    const customersResp = await fetch(`${STRIPE_API}/customers?email=${encodeURIComponent(userEmail)}&limit=1`, {
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const customersData = await customersResp.json();
    let customerId: string;

    if (customersData.data?.length > 0) {
      customerId = customersData.data[0].id;
    } else {
      const createResp = await fetch(`${STRIPE_API}/customers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: userEmail,
          metadata: { supabase_user_id: userId },
        }),
      });

      const createData = await createResp.json();
      if (!createResp.ok) {
        return new Response(JSON.stringify({ error: createData.error?.message || 'Failed to create customer' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      customerId = createData.id;
    }

    // Create portal session
    const portalResp = await fetch(`${STRIPE_API}/billing_portal/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        customer: customerId,
        return_url,
      }),
    });

    const portalData = await portalResp.json();

    if (!portalResp.ok) {
      return new Response(JSON.stringify({ error: portalData.error?.message || 'Failed to create portal session' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url: portalData.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('Fatal error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
