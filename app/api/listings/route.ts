import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MANIFEST_PATH = 'listings/_manifest.json';
const LISTINGS_PREFIX = 'listings/';

export interface StoredListing {
  id: string;
  title: string;
  description?: string;
  price?: number;
  priceFormatted?: string;
  imageUrl: string;
}

/** GET: return all listings (for search) */
export async function GET() {
  try {
    const { blobs } = await list({ prefix: LISTINGS_PREFIX, limit: 2000 });
    const manifestBlob = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifestBlob?.url) {
      return NextResponse.json([]);
    }
    const res = await fetch(manifestBlob.url);
    if (!res.ok) return NextResponse.json([]);
    const data = (await res.json()) as StoredListing[];
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

/** POST: add one listing (image + metadata). Requires x-upload-secret header. */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-upload-secret');
  const expected = process.env.UPLOAD_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const itemId = (formData.get('itemId') as string)?.trim();
    const title = (formData.get('title') as string)?.trim() || '';
    const description = (formData.get('description') as string)?.trim() || '';
    const priceRaw = (formData.get('price') as string)?.trim();
    const price = priceRaw ? Number(priceRaw) : undefined;

    if (!image || !(image instanceof File) || !itemId) {
      return NextResponse.json({ error: 'Missing image or itemId.' }, { status: 400 });
    }

    const safeId = itemId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const ext = image.name.split('.').pop() || 'jpg';
    const pathname = `${LISTINGS_PREFIX}${safeId}.${ext}`;

    const blob = await put(pathname, image, { access: 'public', addRandomSuffix: false });
    const imageUrl = blob.url;

    const newListing: StoredListing = {
      id: itemId,
      title,
      description: description || undefined,
      price: typeof price === 'number' && !Number.isNaN(price) ? price : undefined,
      priceFormatted: typeof price === 'number' && !Number.isNaN(price) ? `$${price}` : undefined,
      imageUrl,
    };

    const { blobs } = await list({ prefix: LISTINGS_PREFIX, limit: 2000 });
    const manifestBlob = blobs.find((b) => b.pathname === MANIFEST_PATH);
    let entries: StoredListing[] = [];
    if (manifestBlob?.url) {
      const res = await fetch(manifestBlob.url);
      if (res.ok) {
        const data = await res.json();
        entries = Array.isArray(data) ? data : [];
      }
    }
    const existing = entries.findIndex((l) => l.id === itemId);
    if (existing >= 0) entries[existing] = newListing;
    else entries.push(newListing);

    const manifestBody = JSON.stringify(entries);
    await put(MANIFEST_PATH, manifestBody, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true, id: itemId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
