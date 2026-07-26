'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import { REVIEWS_URL, REVIEWS_KEY } from '@/lib/products';

/**
 * "Write a Review" button + modal (star picker, name, text). Posts to the
 * reviews Supabase table with a mailto fallback — ported from cart.js bindReview.
 */
export default function ReviewButton() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('Reviews are published after a quick moderation check.');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  function reset() {
    setOpen(false);
    setRating(5);
    setName('');
    setText('');
    setMsg('Reviews are published after a quick moderation check.');
    setSending(false);
    setDone(null);
  }

  async function submit() {
    const t = text.trim();
    if (!t) {
      setMsg('Please write a few words first.');
      return;
    }
    const who = name.trim() || 'Anonymous';
    setSending(true);
    try {
      const r = await fetch(REVIEWS_URL + '/rest/v1/website_reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: REVIEWS_KEY,
          Authorization: 'Bearer ' + REVIEWS_KEY,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ name: who, rating, text: t }),
      });
      if (!r.ok) throw new Error();
      setDone(who);
    } catch {
      window.location.href =
        'mailto:hello@salxir.com?subject=' +
        encodeURIComponent('Website review (' + rating + '/5) from ' + who) +
        '&body=' +
        encodeURIComponent(t);
      setSending(false);
      setMsg('Direct submit unavailable, your email app opened instead.');
    }
  }

  return (
    <>
      <button className="btn btn-black btn-sm" type="button" onClick={() => setOpen(true)}>
        Write a Review
      </button>

      {open && (
        <Modal onClose={reset}>
          {done ? (
            <>
              <h3 className="modal-title">Thank you{done !== 'Anonymous' ? ', ' + done : ''}! 🎉</h3>
              <p style={{ color: '#666' }}>
                Your review was received and will appear after a quick moderation check.
              </p>
            </>
          ) : (
            <>
              <h3 className="modal-title">Write a Review</h3>
              <div className="rev-pick" id="rev-pick">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={r <= rating ? 'on' : undefined}
                    aria-label={`Rate ${r} ${r === 1 ? 'star' : 'stars'}`}
                    aria-pressed={r === rating}
                    onClick={() => setRating(r)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Name (optional, posts as Anonymous)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                rows={4}
                placeholder="Your experience with Salxir…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className="btn btn-black"
                type="button"
                style={{ width: '100%' }}
                disabled={sending}
                onClick={submit}
              >
                {sending ? 'Sending…' : 'Submit Review'}
              </button>
              <p className="rev-msg">{msg}</p>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
