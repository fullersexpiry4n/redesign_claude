-- RE·DESIGN — Supabase Schema
-- Run this in: supabase.com → SQL Editor → New query

-- ── Enable UUID extension ────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Products ─────────────────────────────────────────────────────────────────
CREATE TABLE products (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lot            TEXT UNIQUE NOT NULL,
  type           TEXT NOT NULL,          -- "Lampada da tavolo", "Sospensione", ...
  title          TEXT NOT NULL,
  maison         TEXT NOT NULL,          -- "STILNOVO" (mono caps)
  maison_name    TEXT NOT NULL,          -- "Stilnovo" (display)
  city           TEXT NOT NULL,
  year           INTEGER NOT NULL,
  designer       TEXT NOT NULL DEFAULT '—',
  attribution    TEXT NOT NULL DEFAULT 'Manifattura',
  price          INTEGER NOT NULL,       -- Euros (whole number)
  description    TEXT,
  meta           JSONB,                  -- { "Periodo": "1962", ... }
  provenance     JSONB,                  -- [{ "label": "Milano, c. 1962" }, ...]
  shade_tone     TEXT DEFAULT '#E8E1D2',
  status         TEXT NOT NULL DEFAULT 'available'
                   CHECK (status IN ('available', 'reserved', 'sold')),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Product images ───────────────────────────────────────────────────────────
CREATE TABLE product_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id   UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,            -- Public Supabase Storage URL
  storage_path TEXT,                     -- Path inside the bucket
  sort_order   INTEGER DEFAULT 0,
  is_primary   BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE orders (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_ids              UUID[] NOT NULL,
  stripe_session_id        TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  customer_email           TEXT,
  customer_name            TEXT,
  amount                   INTEGER NOT NULL, -- Total in Euros
  currency                 TEXT DEFAULT 'eur',
  status                   TEXT NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  metadata                 JSONB,
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

-- ── Auto-update updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Storage bucket ────────────────────────────────────────────────────────────
-- Run in supabase.com → Storage → New bucket: "product-images", public = true
-- Then add policy: allow authenticated users to upload

-- ── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders         ENABLE ROW LEVEL SECURITY;

-- Public: read available + sold products (sold = archive)
CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (status IN ('available', 'sold'));

-- Public: read images of publicly visible products
CREATE POLICY "Public read product images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id
        AND p.status IN ('available', 'sold')
    )
  );

-- Service role bypasses RLS (for webhook, admin API)
-- No extra policy needed — service role key bypasses RLS by default

-- ── Table grants ──────────────────────────────────────────────────────────────
GRANT SELECT ON products       TO anon;
GRANT SELECT ON product_images TO anon;
GRANT ALL    ON products       TO authenticated;
GRANT ALL    ON product_images TO authenticated;
GRANT ALL    ON orders         TO authenticated;

-- ── Admin RLS policies (authenticated = admin) ────────────────────────────────
CREATE POLICY "Authenticated full access products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated full access product_images"
  ON product_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated full access orders"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── Seed with existing catalogue pieces ──────────────────────────────────────
CREATE POLICY "temp_seed_insert" ON products FOR INSERT WITH CHECK (true);
INSERT INTO products (lot, type, title, maison, maison_name, city, year, designer, attribution, price, description, meta, provenance, shade_tone) VALUES
('0142', 'Lampada da tavolo', 'Modello 2128', 'STILNOVO', 'Stilnovo', 'Milano', 1962, 'Bruno Gatta', 'Design attribuito a', 2400,
 'Base in marmo di Carrara, stelo in ottone brunito, diffusore in vetro opalino. Etichetta Stilnovo originale presente sotto la base. In produzione tra il 1962 e il 1968. Cablatura sostituita; conforme CE; lampadina E14 inclusa.',
 '{"Periodo":"1962","Materiali":"marmo, ottone, opalino","Dimensioni":"h 38 · ø 22 cm","Cablatura":"sostituita, conforme CE","Etichetta":"originale presente","Stato":"eccellente"}',
 '[{"label":"Milano, c. 1962"},{"label":"Collezione privata, Lombardia"},{"label":"Returned, 2026"}]',
 '#E8E1D2'),
('0086', 'Sospensione', 'Modello 2097/50', 'ARTELUCE', 'Arteluce', 'Milano', 1958, 'Gino Sarfatti', 'Design di', 12800,
 'Il 2097 è la voce più riconoscibile di Sarfatti — cinquanta porte-lampadine in ottone satinato. Cablaggio conforme CE.',
 '{"Periodo":"1958","Materiali":"ottone satinato, acciaio","Dimensioni":"ø 150 cm · h 60 cm","Cablatura":"sostituita, conforme CE","Stato":"ottimo"}',
 '[{"label":"Milano, c. 1958"},{"label":"Studio di architettura, Bologna","unknown":true},{"label":"Returned, 2026"}]',
 '#D9D2C2'),
('0014', 'Lampada da tavolo', 'Vetro a incalmo', 'MAZZEGA', 'Mazzega', 'Murano', 1971, 'Carlo Nason', 'Attribuito a', 3200,
 'Diffusore in vetro soffiato a Murano con tecnica incalmo. Tono ambra su bianco opalino. Base in ottone brunito.',
 '{"Periodo":"1971","Materiali":"vetro incalmo, ottone","Dimensioni":"h 42 · ø 28 cm","Cablatura":"sostituita, conforme CE","Stato":"molto buono"}',
 '[{"label":"Murano, c. 1971"},{"label":"Mercato antiquario, Vicenza"},{"label":"Returned, 2026"}]',
 '#EFEAD8'),
('0231', 'Piantana', 'Modello 387', 'O‑LUCE', 'O‑Luce', 'Milano', 1974, 'Vico Magistretti', 'Design di', 5400,
 'Piantana regolabile in altezza con stelo in acciaio verniciato bianco e diffusore conico in metallo. Tre proprietari documentati.',
 '{"Periodo":"1974","Materiali":"acciaio, metallo verniciato","Dimensioni":"h 160 — 210 cm · ø 35 cm","Cablatura":"sostituita, conforme CE","Stato":"molto buono"}',
 '[{"label":"Milano, c. 1974"},{"label":"Collezione privata, Torino"},{"label":"Collezione privata, Genova"},{"label":"Returned, 2026"}]',
 '#E2DBC9'),
('0307', 'Applique', 'Vetro opalino', 'STILNOVO', 'Stilnovo', 'Milano', 1965, '—', 'Manifattura', 1800,
 'Applique da parete con diffusore in vetro opalino bianco su braccio in ottone brunito.',
 '{"Periodo":"1965","Materiali":"vetro opalino, ottone","Dimensioni":"l 32 · h 18 · sporg. 22 cm","Cablatura":"sostituita, conforme CE","Etichetta":"manifattura presente","Stato":"eccellente"}',
 '[{"label":"Milano, c. 1965"},{"label":"Returned, 2026"}]',
 '#EBE5D2'),
('0412', 'Sospensione', 'Murano, fascia rossa', 'VISTOSI', 'Vistosi', 'Murano', 1973, 'Alessandro Pianon', 'Attribuito a', 2900,
 'Sospensione in vetro soffiato di Murano con caratteristica fascia rossa alla base del diffusore.',
 '{"Periodo":"1973","Materiali":"vetro soffiato Murano","Dimensioni":"ø 38 cm · h diffusore 30 cm","Cablatura":"sostituita, conforme CE","Stato":"ottimo"}',
 '[{"label":"Murano, c. 1973"},{"label":"Collezione privata, Venezia"},{"label":"Returned, 2026"}]',
 '#E5DECC'),
('0198', 'Lampada da tavolo', 'Eclisse', 'ARTEMIDE', 'Artemide', 'Milano', 1965, 'Vico Magistretti', 'Design di', 1650,
 'La sfera interna ruotante regola il fascio luminoso. Esemplare in laccato bianco originale. Premio Compasso d''Oro 1967.',
 '{"Periodo":"1965","Materiali":"metallo laccato","Dimensioni":"ø 18 cm","Cablatura":"originale, conforme CE","Premio":"Compasso d''Oro 1967","Stato":"molto buono"}',
 '[{"label":"Milano, c. 1965"},{"label":"Collezione privata, Milano"},{"label":"Returned, 2026"}]',
 '#DDD7C5'),
('0055', 'Sospensione', 'Modello 1063 / 100', 'ARTELUCE', 'Arteluce', 'Milano', 1954, 'Gino Sarfatti', 'Design di', 8400,
 'Cento porte-lampadine su struttura in filo di acciaio brunito. Produzione Arteluce originale, 1954.',
 '{"Periodo":"1954","Materiali":"acciaio brunito, vetro","Dimensioni":"ø 120 cm · h 80 cm","Cablatura":"sostituita, conforme CE","Stato":"ottimo"}',
 '[{"label":"Milano, c. 1954"},{"label":"Archivio privato, Milano"},{"label":"Returned, 2026"}]',
 '#D4CEBC'),
('0389', 'Lampada da tavolo', 'Pipistrello', 'MARTINELLI LUCE', 'Martinelli Luce', 'Lucca', 1965, 'Gae Aulenti', 'Design di', 2100,
 'La Pipistrello — stelo telescopico, diffusore opalino a calice, base laccata. Versione originale bianco/arancio, anni Settanta.',
 '{"Periodo":"1965","Materiali":"metallo, vetro opalino","Dimensioni":"h 62 — 86 cm · ø 55 cm","Cablatura":"sostituita, conforme CE","Stato":"buono"}',
 '[{"label":"Lucca, c. 1970s"},{"label":"Returned, 2026"}]',
 '#E6E0CF');
DROP POLICY "temp_seed_insert" ON products;
