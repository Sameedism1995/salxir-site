'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/auth/supabase';
import { useI18n } from '@/components/i18n/LocaleProvider';

const L = {
  en: {
    signinTitle: 'Sign in to your account',
    signupTitle: 'Create your account',
    signinSub: 'Welcome back — enter your email and password.',
    signupSub: 'Just an email and password to start. You can add your details later.',
    email: 'Email address',
    password: 'Password',
    signin: 'Sign in',
    signup: 'Create account',
    toSignup: 'New here? Create an account',
    toSignin: 'Already have an account? Sign in',
    short: 'Password must be at least 6 characters.',
    badLogin: 'Wrong email or password. Please try again.',
    exists: 'An account with this email already exists. Try signing in.',
    err: 'Something went wrong. Please try again.',
  },
  fi: {
    signinTitle: 'Kirjaudu tilillesi',
    signupTitle: 'Luo tili',
    signinSub: 'Tervetuloa takaisin — syötä sähköposti ja salasana.',
    signupSub: 'Aloita sähköpostilla ja salasanalla. Voit lisätä tietosi myöhemmin.',
    email: 'Sähköpostiosoite',
    password: 'Salasana',
    signin: 'Kirjaudu',
    signup: 'Luo tili',
    toSignup: 'Uusi täällä? Luo tili',
    toSignin: 'Onko sinulla jo tili? Kirjaudu',
    short: 'Salasanassa on oltava vähintään 6 merkkiä.',
    badLogin: 'Väärä sähköposti tai salasana. Yritä uudelleen.',
    exists: 'Tällä sähköpostilla on jo tili. Kokeile kirjautua.',
    err: 'Jotain meni pieleen. Yritä uudelleen.',
  },
  sv: {
    signinTitle: 'Logga in på ditt konto',
    signupTitle: 'Skapa ditt konto',
    signinSub: 'Välkommen tillbaka — ange e-post och lösenord.',
    signupSub: 'Börja med e-post och lösenord. Du kan lägga till dina uppgifter senare.',
    email: 'E-postadress',
    password: 'Lösenord',
    signin: 'Logga in',
    signup: 'Skapa konto',
    toSignup: 'Ny här? Skapa ett konto',
    toSignin: 'Har du redan ett konto? Logga in',
    short: 'Lösenordet måste vara minst 6 tecken.',
    badLogin: 'Fel e-post eller lösenord. Försök igen.',
    exists: 'Ett konto med denna e-post finns redan. Prova att logga in.',
    err: 'Något gick fel. Försök igen.',
  },
};

export default function AuthForm({
  redirectTo = '/account',
  title,
  sub,
}: {
  redirectTo?: string;
  title?: string;
  sub?: string;
}) {
  const { locale } = useI18n();
  const t = L[locale] ?? L.en;
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && password.length < 6) {
      setError(t.short);
      return;
    }
    setBusy(true);
    const sb = supabaseBrowser();
    const creds = { email: email.trim(), password };

    if (mode === 'signin') {
      const { error } = await sb.auth.signInWithPassword(creds);
      setBusy(false);
      if (error) setError(t.badLogin);
      else window.location.assign(redirectTo);
      return;
    }

    const { data, error } = await sb.auth.signUp(creds);
    if (error) {
      setBusy(false);
      setError(/registered|exists/i.test(error.message) ? t.exists : t.err);
      return;
    }
    // With email confirmation disabled, a session is returned immediately.
    if (data.session) {
      window.location.assign(redirectTo);
      return;
    }
    // Fallback: confirmation is still on — sign in to obtain a session.
    const signIn = await sb.auth.signInWithPassword(creds);
    setBusy(false);
    if (signIn.error) setError(t.err);
    else window.location.assign(redirectTo);
  }

  const isSignup = mode === 'signup';
  return (
    <div className="auth-card">
      <h2>{title ?? (isSignup ? t.signupTitle : t.signinTitle)}</h2>
      <p className="auth-sub">{sub ?? (isSignup ? t.signupSub : t.signinSub)}</p>

      <form onSubmit={submit} className="auth-email">
        <label htmlFor="auth-email">{t.email}</label>
        <input
          id="auth-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <label htmlFor="auth-password">{t.password}</label>
        <input
          id="auth-password"
          type="password"
          required
          minLength={6}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="btn btn-black"
          disabled={busy}
          style={{ width: '100%', padding: 15, marginTop: 6 }}
        >
          {busy ? '…' : isSignup ? t.signup : t.signin}
        </button>
      </form>
      {error && <p className="auth-err">{error}</p>}

      <button
        type="button"
        className="auth-link"
        onClick={() => {
          setMode(isSignup ? 'signin' : 'signup');
          setError('');
        }}
      >
        {isSignup ? t.toSignin : t.toSignup}
      </button>
    </div>
  );
}
