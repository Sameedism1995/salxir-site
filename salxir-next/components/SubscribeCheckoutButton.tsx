'use client';

import { useState } from 'react';
import { useI18n } from '@/components/i18n/LocaleProvider';
import type { BillingInterval } from '@/lib/subscriptions';

const L = {
  en: { cta: 'Continue to secure checkout →', busy: 'Redirecting…', err: 'Could not start checkout. Please try again.' },
  fi: { cta: 'Jatka turvalliseen kassaan →', busy: 'Ohjataan…', err: 'Kassan avaaminen epäonnistui. Yritä uudelleen.' },
  sv: { cta: 'Fortsätt till säker kassa →', busy: 'Omdirigerar…', err: 'Det gick inte att öppna kassan. Försök igen.' },
};

export default function SubscribeCheckoutButton({
  slug,
  interval,
}: {
  slug: string;
  interval: BillingInterval;
}) {
  const { locale } = useI18n();
  const t = L[locale] ?? L.en;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function go() {
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, interval }),
      });
      const d = await r.json();
      if (r.ok && d.url) {
        window.location.href = d.url;
        return;
      }
      setError(d.error || t.err);
    } catch {
      setError(t.err);
    }
    setBusy(false);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-black"
        disabled={busy}
        onClick={go}
        style={{ width: '100%', padding: 16 }}
      >
        {busy ? t.busy : t.cta}
      </button>
      {error && <p className="auth-err">{error}</p>}
    </>
  );
}
