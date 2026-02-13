# Upload app (C:\artciseupload) and listing storage

## Vercel setup for 1000 own listings

1. **Blob store**
   - Vercel project → Storage → Create → **Blob**.
   - Creates `BLOB_READ_WRITE_TOKEN` in the project.

2. **Environment variables**
   - `UPLOAD_SECRET`: long random string (e.g. `openssl rand -hex 32`). The upload app sends this in `x-upload-secret` to POST /api/listings.
   - After the first listing upload, copy the image URL; the hostname (e.g. `xxx.public.blob.vercel-storage.com`) is your Blob store. Set **`BLOB_STORAGE_HOSTNAME`** (or `NEXT_PUBLIC_BLOB_HOSTNAME`) to that hostname so Next.js can optimize listing images.

3. **Upload app**
   - See **C:\artciseupload\README.md**.
   - Copy `config.example.json` → `config.json`, set `uploadSecret` = same as `UPLOAD_SECRET`, and paths (Excel folder, image folder, git repo).
   - Run: `node upload.js 12596` (number only). It finds AB_12596 in Excel (column B), image `AB_12596 (2).JPG`, uploads to artcisebid.com, then runs `git push` in the Artcise repo.

## Flow

- **POST /api/listings** (header `x-upload-secret`): uploads image to Vercel Blob, appends listing to manifest, returns success.
- **GET /api/listings**: returns all listings (for search).
- Search on the site uses these listings as the data source.
