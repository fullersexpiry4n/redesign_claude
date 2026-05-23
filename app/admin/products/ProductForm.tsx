'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Product, ProductImage, ProductStatus } from '@/types/database';

type FormState = {
  lot: string;
  type: string;
  title: string;
  maison: string;
  maison_name: string;
  city: string;
  year: string;
  designer: string;
  attribution: string;
  price: string;
  description: string;
  shade_tone: string;
  status: ProductStatus;
};

function emptyForm(): FormState {
  return {
    lot: '',
    type: '',
    title: '',
    maison: '',
    maison_name: '',
    city: '',
    year: '',
    designer: '',
    attribution: '',
    price: '',
    description: '',
    shade_tone: 'warm',
    status: 'available',
  };
}

function productToForm(p: Product): FormState {
  return {
    lot: p.lot,
    type: p.type,
    title: p.title,
    maison: p.maison,
    maison_name: p.maison_name,
    city: p.city,
    year: String(p.year),
    designer: p.designer ?? '',
    attribution: p.attribution ?? '',
    price: String(p.price),
    description: p.description ?? '',
    shade_tone: p.shade_tone ?? 'warm',
    status: p.status,
  };
}

const FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  padding: '11px 14px',
  border: '1px solid rgba(20,20,20,0.25)',
  background: 'transparent',
  outline: 'none',
  boxSizing: 'border-box',
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  opacity: 0.55,
  marginBottom: 7,
};

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
      </label>
      {children}
    </div>
  );
}

const MAX_IMAGES = 10;

export default function ProductForm({ product, images = [] }: { product?: Product; images?: ProductImage[] }) {
  const router = useRouter();
  const isEdit = !!product;
  const [form, setForm] = useState<FormState>(
    product ? productToForm(product) : emptyForm()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>(images);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null); // 0–100

  const remaining = MAX_IMAGES - existingImages.length;

  function set(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const payload = {
      lot: form.lot.trim(),
      type: form.type.trim(),
      title: form.title.trim(),
      maison: form.maison.trim(),
      maison_name: form.maison_name.trim(),
      city: form.city.trim(),
      year: parseInt(form.year, 10),
      designer: form.designer.trim() || null,
      attribution: form.attribution.trim() || null,
      price: parseInt(form.price, 10),
      description: form.description.trim() || null,
      shade_tone: form.shade_tone,
      status: form.status,
    };

    let productId = product?.id;

    if (isEdit && productId) {
      const { error: updateError } = await supabase
        .from('products')
        .update(payload)
        .eq('id', productId);
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    } else {
      const { data, error: insertError } = await supabase
        .from('products')
        .insert(payload)
        .select('id')
        .single();
      if (insertError || !data) {
        setError(insertError?.message ?? 'Insert failed');
        setLoading(false);
        return;
      }
      productId = data.id;
    }

    // Upload new images sequentially with byte-accurate progress
    if (imageFiles.length > 0) {
      const totalBytes = imageFiles.reduce((s, f) => s + f.size, 0);
      let doneBytes = 0;
      setUploadProgress(0);

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const sortOrder = existingImages.length + i;
        const isPrimary = existingImages.length === 0 && i === 0;

        const fd = new FormData();
        fd.append('file', file);
        fd.append('productId', productId!);
        fd.append('sortOrder', String(sortOrder));
        fd.append('isPrimary', String(isPrimary));

        const ok = await new Promise<boolean>((resolve) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/api/admin/upload');
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const pct = Math.round(((doneBytes + e.loaded) / totalBytes) * 100);
              setUploadProgress(Math.min(pct, 99));
            }
          };
          xhr.onload = () => {
            doneBytes += file.size;
            resolve(xhr.status >= 200 && xhr.status < 300);
          };
          xhr.onerror = () => resolve(false);
          xhr.send(fd);
        });

        if (!ok) {
          setUploadProgress(null);
          setError(`Product saved, but upload ${i + 1} failed`);
          setLoading(false);
          return;
        }
      }
      setUploadProgress(100);
    }

    router.push('/admin');
    router.refresh();
  }

  async function handleDelete() {
    if (!product?.id) return;
    if (!window.confirm(`Delete "${product.title}"? This action is irreversible.`)) return;

    setLoading(true);
    const supabase = createClient();
    const { error: delError } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id);

    if (delError) {
      setError(delError.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  async function handleDeleteImage(imageId: string) {
    setDeletingId(imageId);
    const res = await fetch('/api/admin/images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageId }),
    });
    if (res.ok) {
      setExistingImages((prev) => prev.filter((i) => i.id !== imageId));
    } else {
      const body = await res.json();
      setError(`Deletion failed: ${body.error}`);
    }
    setDeletingId(null);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginBottom: 20,
        }}
      >
        <Field label="Lot *" id="f-lot">
          <input
            id="f-lot"
            name="lot"
            value={form.lot}
            onChange={(e) => set('lot', e.target.value)}
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Type *" id="f-type">
          <input
            id="f-type"
            name="type"
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
            placeholder="e.g. Table lamp"
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Title *" id="f-title">
          <input
            id="f-title"
            name="title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Maison (code) *" id="f-maison">
          <input
            id="f-maison"
            name="maison"
            value={form.maison}
            onChange={(e) => set('maison', e.target.value)}
            placeholder="e.g. STILNOVO"
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Maison (full name) *" id="f-maison-name">
          <input
            id="f-maison-name"
            name="maison_name"
            value={form.maison_name}
            onChange={(e) => set('maison_name', e.target.value)}
            placeholder="e.g. Stilnovo S.p.A."
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="City *" id="f-city">
          <input
            id="f-city"
            name="city"
            value={form.city}
            onChange={(e) => set('city', e.target.value)}
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Year *" id="f-year">
          <input
            id="f-year"
            name="year"
            type="number"
            inputMode="numeric"
            value={form.year}
            onChange={(e) => set('year', e.target.value)}
            min={1900}
            max={2010}
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Designer" id="f-designer">
          <input
            id="f-designer"
            name="designer"
            value={form.designer}
            onChange={(e) => set('designer', e.target.value)}
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Attribution" id="f-attribution">
          <input
            id="f-attribution"
            name="attribution"
            value={form.attribution}
            onChange={(e) => set('attribution', e.target.value)}
            placeholder="e.g. attr."
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Price (€ whole) *" id="f-price">
          <input
            id="f-price"
            name="price"
            type="number"
            inputMode="numeric"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            min={0}
            required
            style={FIELD_STYLE}
          />
        </Field>

        <Field label="Shade Tone" id="f-shade">
          <select
            id="f-shade"
            name="shade_tone"
            value={form.shade_tone}
            onChange={(e) => set('shade_tone', e.target.value)}
            style={{ ...FIELD_STYLE, cursor: 'pointer' }}
          >
            <option value="warm">Warm</option>
            <option value="cool">Cool</option>
            <option value="neutral">Neutral</option>
          </select>
        </Field>

        <Field label="Status" id="f-status">
          <select
            id="f-status"
            name="status"
            value={form.status}
            onChange={(e) => set('status', e.target.value as ProductStatus)}
            style={{ ...FIELD_STYLE, cursor: 'pointer' }}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </Field>
      </div>

      {/* Description — full width */}
      <div style={{ marginBottom: 20 }}>
        <Field label="Description" id="f-description">
          <textarea
            id="f-description"
            name="description"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            style={{ ...FIELD_STYLE, resize: 'vertical', lineHeight: 1.6 }}
          />
        </Field>
      </div>

      {/* Existing images */}
      {existingImages.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={LABEL_STYLE}>Images ({existingImages.length}/{MAX_IMAGES})</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
            {existingImages.map((img) => (
              <div key={img.id} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="100px"
                  style={{ objectFit: 'cover' }}
                />
                {img.is_primary && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(0,0,0,0.55)', color: '#fff',
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    textAlign: 'center', padding: '3px 0', letterSpacing: '0.1em',
                  }}>
                    PRIMARY
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img.id)}
                  disabled={deletingId === img.id}
                  aria-label="Delete image"
                  style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 22, height: 22, border: 0, borderRadius: '50%',
                    background: 'rgba(139,26,26,0.85)', color: '#fff',
                    cursor: 'pointer', fontSize: 13, lineHeight: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image upload */}
      {remaining > 0 && (
        <div style={{ marginBottom: 32 }}>
          <label htmlFor="f-image" style={LABEL_STYLE}>
            Add images (max {remaining} more{remaining === MAX_IMAGES ? '' : ` · ${existingImages.length} existing`})
          </label>
          <input
            id="f-image"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []).slice(0, remaining);
              setImageFiles(files);
            }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer' }}
          />
          {imageFiles.length > 0 && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.6, marginTop: 6 }}>
              {imageFiles.length} file{imageFiles.length > 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#8B1A1A',
            border: '1px solid #8B1A1A',
            padding: '10px 14px',
            marginBottom: 24,
            letterSpacing: '0.08em',
          }}
        >
          {error}
        </div>
      )}

      {uploadProgress !== null && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            opacity: 0.7,
            marginBottom: 8,
          }}>
            Uploading — {uploadProgress}%
          </div>
          <div style={{
            width: '100%',
            height: 3,
            background: 'rgba(20,20,20,0.12)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${uploadProgress}%`,
              background: 'var(--inchiostro)',
              transition: 'width 150ms ease',
            }} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            padding: '14px 28px',
            background: loading ? 'var(--fg-muted)' : 'var(--inchiostro)',
            color: 'var(--avorio)',
            border: 0,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 120ms ease',
            lineHeight: 1,
          }}
        >
          {uploadProgress !== null
            ? `Uploading ${uploadProgress}%…`
            : loading
            ? 'Saving…'
            : isEdit
            ? 'Update piece'
            : 'Create piece'}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              padding: '14px 28px',
              background: 'transparent',
              color: '#8B1A1A',
              border: '1px solid #8B1A1A',
              cursor: loading ? 'not-allowed' : 'pointer',
              lineHeight: 1,
            }}
          >
            Delete piece
          </button>
        )}
      </div>
    </form>
  );
}
