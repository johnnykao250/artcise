import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

/**
 * Image moderation (e.g. block pornography / inappropriate content):
 *
 * Recommended: Google Cloud Vision API — Safe Search Detection.
 * - Labels: adult, violence, etc. Free tier: 1000 requests/month.
 * - https://cloud.google.com/vision/docs/detecting-safe-search
 *
 * Other options with free tiers: Sightengine, AWS Rekognition, Azure Content Safety.
 * Add a check here before accepting the upload; reject if adult/violence above threshold.
 */
async function checkImageModeration(_buffer: Buffer, _mimeType: string): Promise<{ ok: boolean; reason?: string }> {
  // TODO: Integrate when you have an API key, e.g.:
  // const vision = require('@google-cloud/vision');
  // const [result] = await client.safeSearchDetection(image);
  // if (result.adult === 'LIKELY' || result.adult === 'VERY_LIKELY') return { ok: false, reason: 'Image not allowed.' };
  return { ok: true };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const height = (formData.get('height') as string) ?? '';
    const width = (formData.get('width') as string) ?? '';
    const length = (formData.get('length') as string) ?? '';

    if (!image || !(image instanceof File)) {
      return NextResponse.json({ error: 'One image is required.' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(image.type)) {
      return NextResponse.json({ error: 'Image must be JPEG, PNG, or WebP.' }, { status: 400 });
    }

    if (image.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: `Image must be under ${MAX_SIZE_MB} MB.` }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const moderation = await checkImageModeration(buffer, image.type);
    if (!moderation.ok) {
      return NextResponse.json(
        { error: moderation.reason ?? 'Image could not be accepted.' },
        { status: 400 }
      );
    }

    // Optional: persist image (e.g. Vercel Blob, S3) and dimensions to DB.
    // For now we only validate and accept.
    return NextResponse.json({
      success: true,
      dimensions: { height: height.trim() || undefined, width: width.trim() || undefined, length: length.trim() || undefined },
    });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
