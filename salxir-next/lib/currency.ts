import { LOCALE_BCP47, type Locale } from '@/lib/i18n/config';

/**
 * Display-only currency conversion. Prices are stored and charged in EUR
 * (Stripe is unchanged); this converts the EUR amount to the visitor's local
 * currency purely for display, using fixed indicative rates. Update RATES
 * periodically or swap for a rates API later.
 */

export const CURRENCY_COOKIE = 'NEXT_CURRENCY';

export type Currency = 'EUR' | 'SEK' | 'GBP' | 'PLN' | 'USD' | 'DKK' | 'NOK';

export const CURRENCIES: Currency[] = ['EUR', 'SEK', 'GBP', 'PLN', 'USD', 'DKK', 'NOK'];

// Indicative EUR-based rates (1 EUR = X currency).
export const RATES: Record<Currency, number> = {
  EUR: 1,
  SEK: 11.3,
  GBP: 0.84,
  PLN: 4.3,
  USD: 1.08,
  DKK: 7.46,
  NOK: 11.6,
};

const COUNTRY_CURRENCY: Record<string, Currency> = {
  SE: 'SEK',
  GB: 'GBP',
  PL: 'PLN',
  US: 'USD',
  DK: 'DKK',
  NO: 'NOK',
};

export function currencyForCountry(country: string): Currency {
  return COUNTRY_CURRENCY[country] ?? 'EUR';
}

export function isCurrency(value: string | undefined | null): value is Currency {
  return !!value && (CURRENCIES as string[]).includes(value);
}

/**
 * Format a EUR amount in the target currency for display.
 * EUR is shown to 2 decimals (matches the original €X.00); converted
 * currencies are rounded to whole units to avoid fake precision.
 */
export function formatPrice(eur: number, currency: Currency, locale: Locale): string {
  const converted = eur * RATES[currency];
  const fractionDigits = currency === 'EUR' ? 2 : 0;
  try {
    return new Intl.NumberFormat(LOCALE_BCP47[locale], {
      style: 'currency',
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(currency === 'EUR' ? eur : Math.round(converted));
  } catch {
    return `€${eur.toFixed(2)}`;
  }
}
