'use client';

import { useI18n } from '@/components/i18n/LocaleProvider';

/**
 * Renders a EUR price in the visitor's display currency (client-side so it
 * reflects the current locale/currency even on prerendered pages).
 */
export default function Price({ eur, compare }: { eur: number; compare?: number | null }) {
  const { price } = useI18n();
  return (
    <>
      {price(eur)}
      {compare && compare > eur ? <s>{price(compare)}</s> : null}
    </>
  );
}
