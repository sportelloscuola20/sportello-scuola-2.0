// @ts-nocheck
import Stripe from 'https://esm.sh/stripe@17.0.0?target=deno&no-check';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4?target=deno';

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || '';
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-02-24.acacia',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function upsertCustomerId(userId: string, stripeCustomerId: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: stripeCustomerId })
    .eq('id', userId);
  if (error) console.error('Errore aggiornamento stripe_customer_id:', error);
}

async function setPremiumStatus(userId: string, subscriptionId: string, status: string, periodStart: string, periodEnd: string) {
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ is_premium: status === 'active' || status === 'trialing' })
    .eq('id', userId);
  if (profileError) console.error('Errore aggiornamento premium profile:', profileError);

  const { error: subError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_subscription_id: subscriptionId,
      stripe_customer_id: null,
      status,
      current_period_start: periodStart,
      current_period_end: periodEnd,
    }, { onConflict: 'stripe_subscription_id' });
  if (subError) console.error('Errore upsert subscription:', subError);
}

async function cancelSubscription(subscriptionId: string) {
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscriptionId);
  if (subError) console.error('Errore cancellazione subscription:', subError);

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscriptionId)
    .single();

  if (sub?.user_id) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ is_premium: false })
      .eq('id', sub.user_id);
    if (profileError) console.error('Errore revoca premium profile:', profileError);
  }
}

Deno.serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (err) {
    console.error('Firma webhook non valida:', err.message);
    return new Response(JSON.stringify({ error: 'Firma webhook non valida' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id || session.subscription_details?.metadata?.user_id;
        if (userId && session.customer) {
          await upsertCustomerId(userId, session.customer as string);
          if (session.subscription) {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
            await setPremiumStatus(
              userId,
              subscription.id,
              subscription.status,
              new Date(subscription.current_period_start * 1000).toISOString(),
              new Date(subscription.current_period_end * 1000).toISOString(),
            );
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.user_id;
        if (userId) {
          await setPremiumStatus(
            userId,
            subscription.id,
            subscription.status,
            new Date(subscription.current_period_start * 1000).toISOString(),
            new Date(subscription.current_period_end * 1000).toISOString(),
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await cancelSubscription(subscription.id);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Errore gestione webhook:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
