import type { MetadataRoute } from 'next';

/** Mirrors the original robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/polish-agent/', '/finnish-agent/', '/cart'],
    },
    sitemap: 'https://salxir.com/sitemap.xml',
  };
}
