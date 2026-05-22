import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const supabase = createServiceClient();

  const rawIds = session.metadata?.product_ids;
  if (!rawIds) {
    console.error('Webhook: no product_ids in session metadata', session.id);
    return;
  }

  let productIds: string[];
  try {
    productIds = JSON.parse(rawIds);
  } catch {
    console.error('Webhook: failed to parse product_ids', rawIds);
    return;
  }

  const { error: updateError } = await supabase
    .from('products')
    .update({ status: 'sold' })
    .in('id', productIds);

  if (updateError) {
    console.error('Webhook: failed to mark products sold', updateError);
    return;
  }

  const { error: orderError } = await supabase.from('orders').insert({
    product_ids: productIds,
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
    customer_email: session.customer_details?.email ?? null,
    customer_name: session.customer_details?.name ?? null,
    amount: session.amount_total ?? 0,
    currency: session.currency ?? 'eur',
    status: 'paid',
    metadata: {
      session_mode: session.mode,
      payment_status: session.payment_status,
    },
  });

  if (orderError) {
    console.error('Webhook: failed to create order record', orderError);
  }
}
