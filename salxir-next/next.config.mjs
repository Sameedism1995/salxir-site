/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local product photography lives in /public/images and is served as-is.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Business hub lives on a separate domain (mirrors the original meta-refresh).
      { source: '/for-businesses', destination: 'https://global.salxir.com/', permanent: false },
      // Legacy B2B URL still indexed by Google (ranks ~pos 2.7) but 404s — send it to the business hub.
      { source: '/work-with-us', destination: 'https://global.salxir.com/', permanent: true },
    ];
  },
  async rewrites() {
    // Serve the static admin panel + pre-built agent embeds (in /public) at
    // their directory paths, matching the original site structure.
    return [
      { source: '/admin', destination: '/admin/index.html' },
      { source: '/polish-agent', destination: '/polish-agent/index.html' },
      { source: '/finnish-agent', destination: '/finnish-agent/index.html' },
    ];
  },
  async headers() {
    // Mirrors the original _headers security policy.
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        ],
      },
    ];
  },
};
export default nextConfig;
