'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOCALE_COOKIE, type Locale } from '@/lib/i18n/config';
import { getDictionary, type Dictionary } from '@/lib/i18n/dictionaries';
import { CURRENCY_COOKIE, formatPrice, type Currency } from '@/lib/currency';

interface I18nCtx {
  locale: Locale;
  currency: Currency;
  dict: Dictionary;
  setLocale: (l: Locale) => void;
  setCurrency: (c: Currency) => void;
  /** Format a EUR amount in the active display currency. */
  price: (eur: number) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function LocaleProvider({
  initialLocale,
  initialCurrency,
  children,
}: {
  initialLocale: Locale;
  initialCurrency: Currency;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [currency, setCurrencyState] = useState<Currency>(initialCurrency);

  // Client state updates the chrome instantly; router.refresh() re-runs the
  // server components so localized/converted server-rendered content (page
  // heroes, bodies, prices) updates too, without a full reload.
  const setLocale = useCallback(
    (l: Locale) => {
      writeCookie(LOCALE_COOKIE, l);
      setLocaleState(l);
      router.refresh();
    },
    [router]
  );

  const setCurrency = useCallback(
    (c: Currency) => {
      writeCookie(CURRENCY_COOKIE, c);
      setCurrencyState(c);
      router.refresh();
    },
    [router]
  );

  const value = useMemo<I18nCtx>(
    () => ({
      locale,
      currency,
      dict: getDictionary(locale),
      setLocale,
      setCurrency,
      price: (eur: number) => formatPrice(eur, currency, locale),
    }),
    [locale, currency, setLocale, setCurrency]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used within LocaleProvider');
  return ctx;
}
