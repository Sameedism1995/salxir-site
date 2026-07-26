/**
 * Shared site-wide constants: nav, socials, footer content.
 * Mirrors the markup that was duplicated across every original HTML page.
 */

export const SITE_URL = 'https://salxir.com';
export const SUPPORT_EMAIL = 'hello@salxir.com';
export const BUSINESS_URL = 'https://global.salxir.com';

export const ANNOUNCEMENT = 'FREE SHIPPING ACROSS FINLAND ON ORDERS OVER €40!';

export type NavKey = 'shop' | 'products' | 'about' | 'blog' | 'faq' | null;

export const NAV_LINKS: { href: string; label: string; key: Exclude<NavKey, null> }[] = [
  { href: '/shop', label: 'Shop', key: 'shop' },
  { href: '/products', label: 'Our Products', key: 'products' },
  { href: '/about', label: 'About Us', key: 'about' },
  { href: '/blog', label: 'Blog', key: 'blog' },
  { href: '/faq', label: 'FAQ', key: 'faq' },
];

export const SOCIALS = [
  { href: 'https://www.instagram.com/salxirglobal', label: 'Instagram' },
  { href: 'https://www.facebook.com/salxirglobal/', label: 'Facebook' },
  { href: 'https://www.tiktok.com/@salxirglobal', label: 'TikTok' },
  { href: 'https://fi.linkedin.com/company/salxirglobal', label: 'LinkedIn' },
];
