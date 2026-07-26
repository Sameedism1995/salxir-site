import type { MetadataRoute } from 'next';
import { CATALOG } from '@/lib/catalog';

/**
 * Sitemap: the original static pages plus a URL per product detail page.
 * (The product pages are new, so they're appended to the original set.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-07-10';
  const productPages: MetadataRoute.Sitemap = CATALOG.map((p) => ({
    url: `https://salxir.com/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: 'https://salxir.com/', lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://salxir.com/shop', lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://salxir.com/products', lastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...productPages,
    { url: 'https://salxir.com/about', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://salxir.com/blog', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://salxir.com/faq', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://salxir.com/contact', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://salxir.com/privacy', lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://salxir.com/terms', lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
