export type ProductStatus = 'available' | 'reserved' | 'sold';

export type ProvenanceStop = {
  label: string;
  unknown?: boolean;
};

export type Product = {
  id: string;
  lot: string;
  type: string;
  title: string;
  maison: string;
  maison_name: string;
  city: string;
  year: number;
  designer: string;
  attribution: string;
  price: number;
  description: string | null;
  meta: Record<string, string> | null;
  provenance: ProvenanceStop[] | null;
  shade_tone: string;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  storage_path: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  product_ids: string[];
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type CartItem = {
  productId: string;
  lot: string;
  title: string;
  maison_name: string;
  price: number;
  shadeTone: string;
};
