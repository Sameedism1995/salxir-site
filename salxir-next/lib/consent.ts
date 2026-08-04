/**
 * Cookie consent state.
 *
 * The storefront ships from Finland, so ePrivacy/GDPR apply: analytics and
 * marketing cookies need opt-in consent before the corresponding tags load.
 *
 * The storage key and JSON shape are deliberately identical to the ones the
 * previous (Vite) version of salxir.com used:
 *
 *   salxir_cookie_consent -> {"essential":true,"analytics":true,"marketing":true,"timestamp":1772812880154}
 *
 * Same origin, so a visitor who already made a choice on the old site keeps it
 * and is not asked twice.
 */

export const CONSENT_KEY = 'salxir_cookie_consent';
export const CONSENT_EVENT = 'salxir:consent';

export interface ConsentPrefs {
  /** Always true; strictly necessary cookies (cart, locale) need no consent. */
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export const DENY_ALL: ConsentPrefs = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
};

/** Stored preferences, or null if the visitor has not chosen yet. */
export function readConsent(): ConsentPrefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
    if (typeof parsed !== 'object' || parsed === null) return null;
    return {
      essential: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      timestamp: typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now(),
    };
  } catch {
    return null;
  }
}

/**
 * Persist a choice, push it to Google Consent Mode, and notify listeners so
 * <Analytics /> can mount or skip the gated tags without a page reload.
 */
export function writeConsent(prefs: { analytics: boolean; marketing: boolean }): ConsentPrefs {
  const next: ConsentPrefs = {
    essential: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: Date.now(),
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  } catch {
    /* private mode: still apply for this page view */
  }

  applyToConsentMode(next);

  try {
    window.dispatchEvent(new CustomEvent<ConsentPrefs>(CONSENT_EVENT, { detail: next }));
  } catch {
    /* no-op */
  }

  return next;
}

/** Mirror a choice into Google Consent Mode v2. Safe to call before gtag loads. */
export function applyToConsentMode(prefs: ConsentPrefs): void {
  if (typeof window === 'undefined') return;
  const analytics = prefs.analytics ? 'granted' : 'denied';
  const marketing = prefs.marketing ? 'granted' : 'denied';
  try {
    window.gtag?.('consent', 'update', {
      analytics_storage: analytics,
      ad_storage: marketing,
      ad_user_data: marketing,
      ad_personalization: marketing,
    });
  } catch {
    /* swallow */
  }
}
