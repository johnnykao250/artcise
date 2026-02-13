# Image moderation (e.g. block inappropriate content)

To reduce the risk of users submitting pornography or other inappropriate images, run an **image moderation / safe-search** check before accepting uploads.

## Recommended: Google Cloud Vision API — Safe Search

- **What it does:** Returns labels like `adult`, `violence`, `racy` (e.g. `UNLIKELY`, `POSSIBLE`, `LIKELY`, `VERY_LIKELY`).
- **Free tier:** 1,000 requests per month (then paid).
- **Docs:** https://cloud.google.com/vision/docs/detecting-safe-search

**Steps to enable:**

1. Create a Google Cloud project and enable the Vision API.
2. Create an API key or service account.
3. In `app/api/submit/route.ts`, in `checkImageModeration()`:
   - Call the Vision API with the image buffer.
   - If `adult` or `violence` is `LIKELY` or `VERY_LIKELY`, return `{ ok: false, reason: 'Image not allowed.' }`.
4. Store the API key in an env var (e.g. `GOOGLE_CLOUD_VISION_API_KEY`) and never commit it.

## Other options (free tiers)

- **Sightengine** — moderation API
- **AWS Rekognition** — content moderation
- **Azure Content Safety**

The submit API already has a placeholder `checkImageModeration()`; plug in one of the above there.
