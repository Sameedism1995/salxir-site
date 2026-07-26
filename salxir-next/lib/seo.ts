import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

interface PageMetaOptions {
  /** <title> and default OG/Twitter title. */
  title: string;
  /** Meta description and default OG/Twitter description. */
  description: string;
  /** Canonical path, e.g. '/shop' or '/'. */
  path: string;
  /** OG + Twitter title when it differs from the page title. */
  socialTitle?: string;
  /** OG + Twitter description when it differs from the meta description. */
  socialDescription?: string;
  /** Twitter title override (a few pages differ from their OG title). */
  twitterTitle?: string;
  /** Twitter description override (a few pages differ from their OG description). */
  twitterDescription?: string;
  /** Social share image (defaults to the logo). */
  image?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Meta keywords (used by blog posts). */
  keywords?: string[];
}

/**
 * Builds page Metadata (canonical + Open Graph + Twitter) from the values that
 * actually vary per page, removing the boilerplate that was duplicated across
 * every route while preserving the exact original tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
  twitterTitle,
  twitterDescription,
  image = '/images/logo.png',
  imageAlt,
  imageWidth,
  imageHeight,
  keywords,
}: PageMetaOptions): Metadata {
  const ogTitle = socialTitle ?? title;
  const ogDescription = socialDescription ?? description;
  const ogImage =
    imageWidth && imageHeight
      ? { url: image, width: imageWidth, height: imageHeight, alt: imageAlt }
      : { url: image, alt: imageAlt };

  return {
    title,
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Salxir',
      title: ogTitle,
      description: ogDescription,
      url: `${SITE_URL}${path}`,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle ?? ogTitle,
      description: twitterDescription ?? ogDescription,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
