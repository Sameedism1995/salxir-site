'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import AuthForm from '@/components/auth/AuthForm';
import { supabaseBrowser } from '@/lib/auth/supabase';

export default function AccountPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sb = supabaseBrowser();
    sb.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const sb = supabaseBrowser();
    const { data } = await sb.auth.getUser();
    if (!data.user) return;
    await sb.from('profiles').upsert({ id: data.user.id, first_name: first, last_name: last });
    setSaved(true);
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <PageHero kicker="Account" title="Your account">
        {email ? email : 'Sign in or create an account'}
      </PageHero>

      <div className="wrap" style={{ maxWidth: 620, padding: '30px 24px 70px' }}>
        {!ready ? (
          <p style={{ color: '#888' }}>Loading…</p>
        ) : !email ? (
          <>
            <AuthForm redirectTo="/account" />
            <p style={{ textAlign: 'center', marginTop: 18 }}>
              <Link href="/shop" style={{ color: '#888', fontSize: 14 }}>
                Continue shopping
              </Link>
            </p>
          </>
        ) : (
          <>
            <form className="checkout-box" onSubmit={saveProfile} style={{ maxWidth: 'none' }}>
              <h3>Complete your profile</h3>
              <p style={{ fontSize: 13.5, color: '#777', marginBottom: 8 }}>
                Basic details now — you can finish the rest anytime.
              </p>
              <label htmlFor="fn">First name</label>
              <input id="fn" type="text" value={first} onChange={(e) => setFirst(e.target.value)} />
              <label htmlFor="ln">Last name</label>
              <input id="ln" type="text" value={last} onChange={(e) => setLast(e.target.value)} />
              <button type="submit" className="btn btn-black" style={{ marginTop: 14 }}>
                Save
              </button>
              {saved && <p style={{ color: 'var(--c-ashwa)', fontSize: 13.5, marginTop: 8 }}>Saved ✓</p>}
            </form>

            <button
              type="button"
              className="btn btn-ghost-dark"
              style={{ marginTop: 20 }}
              onClick={async () => {
                await supabaseBrowser().auth.signOut();
                setEmail(null);
              }}
            >
              Sign out
            </button>
          </>
        )}
      </div>

      <Footer variant="minimal" minimalRight={<a href="mailto:hello@salxir.com">hello@salxir.com</a>} />
    </>
  );
}
