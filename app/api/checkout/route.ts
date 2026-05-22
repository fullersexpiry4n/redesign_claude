import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';
import { CartItem } from '@/types/database';

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const productIds = items.map((i) => i.productId);

    const { data: products, error } = await supabase
      .from('products')
      .select('id, title, maison_name, price, status, lot')
      .in('id', productIds);

    if (error || !products) {
      return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }

    // Reject if any product is no longer available
    const unavailable = products.filter((p) => p.status !== 'available');
    if (unavailable.length > 0) {
      const names = unavailable.map((p) => p.title).join(', ');
      return NextResponse.json(
        { error: `No longer available: ${names}` },
        { status: 409 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const lineItems = products.map((p) => ({
      price_data: {
        currency: 'eur',
        unit_amount: p.price,
        product_data: {
          name: `${p.maison_name} — ${p.title}`,
          metadata: { lot: p.lot, product_id: p.id },
        },
      },
      quantity: 1,
    }));

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      metadata: {
        product_ids: JSON.stringify(productIds),
      },
      payment_intent_data: {
        metadata: {
          product_ids: JSON.stringify(productIds),
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
