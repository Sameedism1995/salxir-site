import { cookies } from 'next/headers';
import { LOCALE_COOKIE, isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { getDictionary, type Dictionary } from '@/lib/i18n/dictionaries';
import { CURRENCY_COOKIE, isCurrency, formatPrice, type Currency } from '@/lib/currency';

export interface I18n {
  locale: Locale;
  currency: Currency;
  dict: Dictionary;
  price: (eur: number) => string;
}

/** Read locale + currency from cookies for server components. */
export async function getI18n(): Promise<I18n> {
  const store = await cookies();
  const lc = store.get(LOCALE_COOKIE)?.value;
  const cur = store.get(CURRENCY_COOKIE)?.value;
  const locale: Locale = isLocale(lc) ? lc : DEFAULT_LOCALE;
  const currency: Currency = isCurrency(cur) ? cur : 'EUR';
  return {
    locale,
    currency,
    dict: getDictionary(locale),
    price: (eur: number) => formatPrice(eur, currency, locale),
  };
}
