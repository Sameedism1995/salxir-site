import type { MetadataRoute } from 'next';
import { CATALOG } from '@/lib/catalog';
import { getAllPosts } from '@/lib/blog';

/**
 * Sitemap: static pages, a URL per product detail page, and a URL per blog
 * post. Blog posts were previously missing entirely, which left the entire
 * content library undeclared.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = '2026-08-04';

  const productPages: MetadataRoute.Sitemap = CATALOG.map((p) => ({
    url: `https://salxir.com/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `https://salxir.com/blog/${p.slug}`,
    lastModified: p.updated ?? p.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: 'https://salxir.com/', lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://salxir.com/shop', lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://salxir.com/products', lastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...productPages,
    {
      url: 'https://salxir.com/where-to-buy-shilajit-europe',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://salxir.com/where-to-buy-shilajit-uk',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: 'https://salxir.com/about', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://salxir.com/blog', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ...blogPages,
    { url: 'https://salxir.com/faq', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://salxir.com/contact', lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://salxir.com/privacy', lastModified, changeFrequency: 'yearly', priority: 0.5 },
    { url: 'https://salxir.com/terms', lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
