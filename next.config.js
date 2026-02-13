/** @type {import('next').NextConfig} */
const blobHost = process.env.BLOB_STORAGE_HOSTNAME || process.env.NEXT_PUBLIC_BLOB_HOSTNAME;
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.prismic.io', pathname: '/**' },
      ...(blobHost ? [{ protocol: 'https', hostname: blobHost, pathname: '/**' }] : []),
    ],
  },
};

module.exports = nextConfig;
