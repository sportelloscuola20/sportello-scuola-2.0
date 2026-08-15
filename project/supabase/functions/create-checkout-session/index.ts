import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || '';
const STRIPE_PRICE_ID = Deno.env.get('STRIPE_PRICE_ID') || '';
const STRIPE_API = 'https://api.stripe.com/v1';
const APP_URL = Deno.env.get('APP_URL') || 'https://sportelloscuola2-0.it';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Verify the Supabase user JWT (same pattern as create-portal-session).
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID) {
      return new Response(JSON.stringify({ error: 'Stripe not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      customerId = createData.id;
    }

    // Create checkout session
    const checkoutResp = await fetch(`${STRIPE_API}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'subscription',
        customer: customerId,
        line_items[0][price]: STRIPE_PRICE_ID,
        line_items[0][quantity]: '1',
        success_url: `${APP_URL}/area-riservata?checkout=success`,
        cancel_url: `${APP_URL}/area-riservata?checkout=cancelled`,
        metadata: {
          supabase_user_id: userId,
        },
      }),
    });

    const checkoutData = await checkoutResp.json();

    if (!checkoutResp.ok) {
      return new Response(JSON.stringify({ error: checkoutData.error?.message || 'Failed to create checkout session' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url: checkoutData.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    console.error('Fatal error:', msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
