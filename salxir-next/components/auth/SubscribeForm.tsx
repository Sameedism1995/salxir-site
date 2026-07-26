'use client';

import AuthForm from '@/components/auth/AuthForm';
import { useI18n } from '@/components/i18n/LocaleProvider';

const COPY = {
  en: {
    title: 'Create your account to subscribe',
    sub: 'Just your email to start — you can complete your profile later.',
  },
  fi: {
    title: 'Luo tili tilausta varten',
    sub: 'Aloita pelkällä sähköpostilla — voit täydentää profiilin myöhemmin.',
  },
  sv: {
    title: 'Skapa konto för att prenumerera',
    sub: 'Börja med bara din e-post — du kan slutföra profilen senare.',
  },
};

export default function SubscribeForm({ redirectTo }: { redirectTo: string }) {
  const { locale } = useI18n();
  const c = COPY[locale] ?? COPY.en;
  return <AuthForm redirectTo={redirectTo} title={c.title} sub={c.sub} />;
}
