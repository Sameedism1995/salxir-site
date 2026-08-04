import type { Metadata } from 'next';
import Script from 'next/script';
import { Poppins } from 'next/font/google';
import './globals.css';
import Analytics from '@/components/Analytics';
import ConsentBanner from '@/components/ConsentBanner';
import { CartProvider } from '@/components/CartProvider';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { getI18n } from '@/lib/i18n/server';
import { SITE_URL } from '@/lib/site';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Salxir | Pure Himalayan Shilajit – Lab-Tested & Shipped from Finland',
    template: '%s',
  },
  description:
    'Discover pure, lab-tested Himalayan Shilajit in 6 formats: resin, capsules, tablets, honey sticks, and blends. Free shipping across Finland on orders over €40. #WithLoveFromEarth',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

// Organization + WebSite JSON-LD (site-wide), ported from the original home page.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Salxir',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    'Pure Himalayan Shilajit and natural superfoods, lab-tested, quality-checked, and shipped from Finland.',
  sameAs: [
    'https://www.instagram.com/salxirglobal',
    'https://www.facebook.com/salxirglobal/',
    'https://www.tiktok.com/@salxirglobal',
    'https://fi.linkedin.com/company/salxirglobal',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'hello@salxir.com',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Salxir',
  url: SITE_URL,
  description: 'Pure Himalayan Shilajit and natural superfoods, lab-tested and shipped from Finland',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, currency } = await getI18n();
  return (
    <html lang={locale} className={poppins.variable}>
      <body>
        {/* Site-wide structured data (App Router renders these into <head>). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LocaleProvider initialLocale={locale} initialCurrency={currency}>
          <CartProvider>{children}</CartProvider>
          {/* Inside LocaleProvider: the banner is localized via useI18n(). */}
          <ConsentBanner />
        </LocaleProvider>
        {/* GA4 + Pixel + Clarity, gated on consent. Each no-ops without its id. */}
        <Analytics />
        {/* Trustpilot widget bootstrap (loads once, powers TrustBox widgets). */}
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
