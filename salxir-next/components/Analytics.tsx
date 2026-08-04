'use client';

import Script from 'next/script';
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_MEASUREMENT_ID, gaPageview } from '@/lib/analytics';
import {
  CONSENT_EVENT,
  applyToConsentMode,
  readConsent,
  type ConsentPrefs,
} from '@/lib/consent';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? '';

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
 * GA4 + Meta Pixel + Clarity, gated on cookie consent.
 *
 * The App Router does not do a full document load between routes, so gtag's
 * automatic pageview is switched off (send_page_view: false) and *every* view,
 * including the first, is sent from PageviewTracker. Leaving it on would
 * double-count the landing page.
 *
 * Two different gating strategies, on purpose:
 *
 *   GA4      loads always, but with Consent Mode v2 defaulting every storage
 *            type to "denied". Until the visitor opts in it sets no cookies and
 *            sends only cookieless pings; consent('update') upgrades it in
 *            place. This is Google's own model, and it keeps the tag present to
 *            observe the grant when it comes.
 *
 *   Pixel    not loaded at all without consent. Neither has an equivalent of
 *   Clarity  Consent Mode, so the only way to honour a refusal is to never
 *            fetch the script.
 *
 * Each tag is additionally inert unless its id is configured, so dev and
 * preview deploys stay out of the production properties.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<ConsentPrefs | null>(null);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    // Consent Mode defaults back to denied on every page view, so a returning
    // visitor's stored grant has to be replayed on load.
    if (stored) applyToConsentMode(stored);

    const onChange = (e: Event) => setConsent((e as CustomEvent<ConsentPrefs>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const analyticsOk = consent?.analytics === true;
  const marketingOk = consent?.marketing === true;

  return (
    <>
      {/*
        Must run before gtag.js so the defaults are in place for the very first
        hit. beforeInteractive guarantees that ordering.
      */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
        `}
      </Script>

      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `}
          </Script>
          <Suspense fallback={null}>
            <PageviewTracker />
          </Suspense>
        </>
      ) : null}

      {META_PIXEL_ID && marketingOk ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');
            fbq('track','PageView');
          `}
        </Script>
      ) : null}

      {CLARITY_ID && analyticsOk ? (
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      ) : null}
    </>
  );
}
