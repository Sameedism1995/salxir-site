'use client';

/**
 * Cookie consent banner.
 *
 * Shows only when no choice is stored. Reject is given equal visual weight to
 * Accept -- under EDPB guidance a banner where refusing is harder than
 * accepting is not valid consent, which is the most common way these get
 * challenged.
 *
 * Inline styles rather than Tailwind/globals.css so the banner cannot be
 * affected by, or affect, the rest of the design system.
 */

import { useEffect, useState } from 'react';
import { readConsent, writeConsent } from '@/lib/consent';
import { useI18n } from '@/components/i18n/LocaleProvider';

type Copy = {
  title: string;
  body: string;
  accept: string;
  reject: string;
  customise: string;
  analytics: string;
  analyticsHint: string;
  marketing: string;
  marketingHint: string;
  save: string;
  privacy: string;
};

const COPY: Record<string, Copy> = {
  en: {
    title: 'Cookies on salxir.com',
    body: 'We use essential cookies to run the shop. With your permission we also use analytics cookies to understand how the site is used, and marketing cookies to measure our ads. You can change your mind at any time.',
    accept: 'Accept all',
    reject: 'Reject non-essential',
    customise: 'Choose individually',
    analytics: 'Analytics',
    analyticsHint: 'How pages are found and used.',
    marketing: 'Marketing',
    marketingHint: 'Measuring ads and reaching similar people.',
    save: 'Save choices',
    privacy: 'Privacy policy',
  },
  fi: {
    title: 'Evästeet salxir.com-sivustolla',
    body: 'Käytämme välttämättömiä evästeitä kaupan toimintaan. Luvallasi käytämme myös analytiikkaevästeitä sivuston käytön ymmärtämiseen ja markkinointievästeitä mainonnan mittaamiseen. Voit muuttaa valintaasi milloin tahansa.',
    accept: 'Hyväksy kaikki',
    reject: 'Hylkää ei-välttämättömät',
    customise: 'Valitse erikseen',
    analytics: 'Analytiikka',
    analyticsHint: 'Miten sivuja löydetään ja käytetään.',
    marketing: 'Markkinointi',
    marketingHint: 'Mainonnan mittaaminen.',
    save: 'Tallenna valinnat',
    privacy: 'Tietosuojaseloste',
  },
  sv: {
    title: 'Kakor på salxir.com',
    body: 'Vi använder nödvändiga kakor för att driva butiken. Med ditt samtycke använder vi även analyskakor för att förstå hur webbplatsen används och marknadsföringskakor för att mäta våra annonser. Du kan ändra dig när som helst.',
    accept: 'Acceptera alla',
    reject: 'Neka icke-nödvändiga',
    customise: 'Välj enskilt',
    analytics: 'Analys',
    analyticsHint: 'Hur sidor hittas och används.',
    marketing: 'Marknadsföring',
    marketingHint: 'Mätning av annonser.',
    save: 'Spara val',
    privacy: 'Integritetspolicy',
  },
};

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Rendered inside LocaleProvider (see app/layout.tsx).
  const { locale } = useI18n();
  const t = COPY[locale] ?? COPY.en;

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  const decide = (a: boolean, m: boolean) => {
    writeConsent({ analytics: a, marketing: m });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t.title}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#12263a',
        color: '#f7f4ee',
        padding: '20px 24px',
        boxShadow: '0 -6px 24px rgba(0,0,0,.25)',
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <strong style={{ display: 'block', fontSize: 16, marginBottom: 6 }}>{t.title}</strong>
        <p style={{ margin: '0 0 12px', maxWidth: 780 }}>
          {t.body}{' '}
          <a href="/privacy" style={{ color: '#f7f4ee', textDecoration: 'underline' }}>
            {t.privacy}
          </a>
        </p>

        {expanded && (
          <div style={{ margin: '0 0 14px', display: 'grid', gap: 10 }}>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                style={{ marginTop: 3 }}
              />
              <span>
                <strong>{t.analytics}</strong>
                <br />
                <span style={{ opacity: 0.8 }}>{t.analyticsHint}</span>
              </span>
            </label>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                style={{ marginTop: 3 }}
              />
              <span>
                <strong>{t.marketing}</strong>
                <br />
                <span style={{ opacity: 0.8 }}>{t.marketingHint}</span>
              </span>
            </label>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" onClick={() => decide(true, true)} style={primaryBtn}>
            {t.accept}
          </button>
          <button type="button" onClick={() => decide(false, false)} style={primaryBtn}>
            {t.reject}
          </button>
          {expanded ? (
            <button type="button" onClick={() => decide(analytics, marketing)} style={ghostBtn}>
              {t.save}
            </button>
          ) : (
            <button type="button" onClick={() => setExpanded(true)} style={ghostBtn}>
              {t.customise}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Accept and Reject share styling on purpose -- see the note at the top. */
const primaryBtn: React.CSSProperties = {
  background: '#f7f4ee',
  color: '#12263a',
  border: '1px solid #f7f4ee',
  borderRadius: 6,
  padding: '9px 18px',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
};

const ghostBtn: React.CSSProperties = {
  background: 'transparent',
  color: '#f7f4ee',
  border: '1px solid rgba(247,244,238,.5)',
  borderRadius: 6,
  padding: '9px 18px',
  fontSize: 14,
  cursor: 'pointer',
};
