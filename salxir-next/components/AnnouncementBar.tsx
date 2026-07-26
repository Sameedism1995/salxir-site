'use client';

import { useI18n } from '@/components/i18n/LocaleProvider';

/** Top black announcement strip, present on every page (localized). */
export default function AnnouncementBar() {
  const { dict } = useI18n();
  return <div className="announce">{dict.announce}</div>;
}
