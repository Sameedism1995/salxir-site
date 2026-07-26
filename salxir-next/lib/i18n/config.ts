/** Supported locales and country→locale mapping. */

export const LOCALES = ['en', 'fi', 'sv'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fi: 'Suomi',
  sv: 'Svenska',
};

/** Short label shown in the switcher (matches the FI · SV · EN convention). */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  fi: 'FI',
  sv: 'SV',
};

/** BCP-47 tag used for number/date formatting. */
export const LOCALE_BCP47: Record<Locale, string> = {
  en: 'en-GB',
  fi: 'fi-FI',
  sv: 'sv-SE',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Map an ISO country code to a default locale. */
export function localeForCountry(country: string): Locale {
  switch (country) {
    case 'FI':
      return 'fi';
    case 'SE':
    case 'AX': // Åland
      return 'sv';
    default:
      return 'en';
  }
}
