'use client';

import { useEffect, useRef, useState } from 'react';
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, type Locale } from '@/lib/i18n/config';
import { useI18n } from '@/components/i18n/LocaleProvider';

/** Compact language switcher (EN / FI / SV) shown in the navbar. */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div className="lang-switch" ref={ref}>
      <button
        type="button"
        className="lang-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
      >
        {LOCALE_LABELS[locale]}
        <span aria-hidden="true" className="lang-caret">
          ⌄
        </span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {LOCALES.map((l: Locale) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                className={l === locale ? 'on' : undefined}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
              >
                {LOCALE_NAMES[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
