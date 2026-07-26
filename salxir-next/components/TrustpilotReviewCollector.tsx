'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement | null, forceReload?: boolean) => void };
  }
}

/**
 * Trustpilot Review Collector widget ("Review us on Trustpilot" button).
 * Sends customers to salxir.com's Trustpilot page to leave a review instead of
 * writing one on-site. The bootstrap script is loaded once in the root layout;
 * this re-initializes the widget on mount (needed for client-side navigation).
 */
export default function TrustpilotReviewCollector() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tries = 0;
    const id = window.setInterval(() => {
      if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(el, true);
        window.clearInterval(id);
      } else if (++tries > 20) {
        window.clearInterval(id);
      }
    }, 300);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6a57c711d2c2f1c4e3a18361"
      data-style-height="52px"
      data-style-width="100%"
      data-token="4ed81c3b-97ea-4e6c-8221-d14e8989a231"
    >
      <a href="https://www.trustpilot.com/review/salxir.com" target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}
