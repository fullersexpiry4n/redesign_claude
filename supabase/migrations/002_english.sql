-- RE·DESIGN — Translate Italian fields to English
-- Run in: supabase.com → SQL Editor → New query

-- ── Rename meta JSON keys ─────────────────────────────────────────────────────
-- Periodo → Period
UPDATE products
SET meta = (meta - 'Periodo') || jsonb_build_object('Period', meta->>'Periodo')
WHERE meta ? 'Periodo';

-- Materiali → Materials
UPDATE products
SET meta = (meta - 'Materiali') || jsonb_build_object('Materials', meta->>'Materiali')
WHERE meta ? 'Materiali';

-- Dimensioni → Dimensions
UPDATE products
SET meta = (meta - 'Dimensioni') || jsonb_build_object('Dimensions', meta->>'Dimensioni')
WHERE meta ? 'Dimensioni';

-- Cablatura → Wiring
UPDATE products
SET meta = (meta - 'Cablatura') || jsonb_build_object('Wiring', meta->>'Cablatura')
WHERE meta ? 'Cablatura';

-- Stato → Condition
UPDATE products
SET meta = (meta - 'Stato') || jsonb_build_object('Condition', meta->>'Stato')
WHERE meta ? 'Stato';

-- Etichetta → Label
UPDATE products
SET meta = (meta - 'Etichetta') || jsonb_build_object('Label', meta->>'Etichetta')
WHERE meta ? 'Etichetta';

-- Premio → Award
UPDATE products
SET meta = (meta - 'Premio') || jsonb_build_object('Award', meta->>'Premio')
WHERE meta ? 'Premio';

-- ── Translate Wiring values ───────────────────────────────────────────────────
UPDATE products SET meta = jsonb_set(meta, '{Wiring}', '"replaced, CE compliant"')
WHERE meta->>'Wiring' ILIKE '%sostituita%';

UPDATE products SET meta = jsonb_set(meta, '{Wiring}', '"original, CE compliant"')
WHERE meta->>'Wiring' ILIKE '%originale%';

-- ── Translate Condition values ────────────────────────────────────────────────
UPDATE products SET meta = jsonb_set(meta, '{Condition}', '"excellent"')
WHERE meta->>'Condition' ILIKE 'eccellente';

UPDATE products SET meta = jsonb_set(meta, '{Condition}', '"very good"')
WHERE meta->>'Condition' ILIKE 'molto buono';

UPDATE products SET meta = jsonb_set(meta, '{Condition}', '"good"')
WHERE meta->>'Condition' ILIKE 'buono';

UPDATE products SET meta = jsonb_set(meta, '{Condition}', '"excellent"')
WHERE meta->>'Condition' ILIKE 'ottimo';

-- ── Translate type (product type) ─────────────────────────────────────────────
UPDATE products SET type = 'Table lamp'  WHERE type = 'Lampada da tavolo';
UPDATE products SET type = 'Pendant'     WHERE type = 'Sospensione';
UPDATE products SET type = 'Floor lamp'  WHERE type = 'Piantana';
UPDATE products SET type = 'Wall lamp'   WHERE type = 'Applique';
UPDATE products SET type = 'Sconce'      WHERE type = 'Applique a parete';
UPDATE products SET type = 'Chandelier'  WHERE type = 'Lampadario';
UPDATE products SET type = 'Desk lamp'   WHERE type = 'Lampada da scrivania';

-- ── Translate attribution ─────────────────────────────────────────────────────
UPDATE products SET attribution = 'Design by'    WHERE attribution = 'Design di';
UPDATE products SET attribution = 'Attributed to' WHERE attribution IN ('Attribuito a', 'Design attribuito a');
UPDATE products SET attribution = 'Manufacturer'  WHERE attribution = 'Manifattura';
