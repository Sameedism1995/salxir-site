'use client';

import Script from 'next/script';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_MEASUREMENT_ID, gaPageview } from '@/lib/analytics';

/**
 * Sends a page_view on every route change.
 *
 * useSearchParams() opts the subtree into client-side rendering, which is why
 * this lives in its own component behind a Suspense boundary -- without it the
 * whole app would be forced out of static rendering at build time.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const qs = searchParams?.toString();
    gaPageview(qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

/**
 * GA4 base tag + client-side pageviews.
 *
 * The App Router does not do a full document load between routes, so gtag's
 * automatic pageview is switched off (send_page_view: false) and *every* view,
 * including the first, is sent from PageviewTracker. Leaving it on would
 * double-count the landing page.
 *
 * Renders nothing at all when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset, so dev
 * and preview traffic never reaches the production property.
 */
export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
