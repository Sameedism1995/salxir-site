# Salxir — Next.js 15

Production migration of the Salxir marketing site (originally static HTML/CSS/JS)
into a Next.js 15 App Router codebase. **Visually identical** to the original —
the hand-tuned stylesheet is preserved verbatim as `app/globals.css` with Tailwind
preflight disabled, so nothing is restyled.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS (utilities only; original CSS preserved) + shadcn/ui foundation
- `next/image` (optimized) · `next/font` (Poppins) · Metadata API for SEO

## Run locally

```bash
npm install        # fast on a normal machine
npm run dev        # http://localhost:3000
```

Then open the original site side-by-side to confirm the visual match.

## Verify

```bash
npm run build      # production build — passes, 17 routes prerendered
npm run lint       # ESLint — 0 warnings/errors
```

## Deploy to Vercel

Zero config — Vercel auto-detects Next.js.

**Option A — CLI (fastest):**

```bash
npm i -g vercel
vercel            # preview deploy; follow the prompts
vercel --prod     # promote to production
```

**Option B — Git + Dashboard:**

1. Push this `salxir-next` folder to a Git repo.
2. In the Vercel dashboard: New Project → import the repo.
3. If it's a subfolder, set **Root Directory** to `salxir-next`.
4. Deploy.

After deploying, point the `salxir.com` domain at the Vercel project in
Project → Settings → Domains.

## Structure

```
app/            route segments (one folder per page) + sitemap.ts, robots.ts, not-found.tsx
components/     reusable UI (Navbar, Footer, PageShell, cards, cart, modals, …)
lib/            products catalog + Supabase/Stripe constants, site nav, utils
public/         images, admin panel, and the polish/finnish agent embeds (served as-is)
```

## Notes

- **Storefront:** the shop/cart/checkout ports the original `cart.js` logic to React —
  live Supabase catalog with a static fallback, localStorage cart, and the same
  Stripe checkout contract.
- **Environment variables (optional):** Supabase/Stripe config is read from
  `NEXT_PUBLIC_*` vars (see `.env.example`) and falls back to the original public
  values, so the app runs with zero config. These are anon (RLS-protected) keys and
  a public Stripe price — safe to expose client-side, exactly as the original did.
- **Static sub-apps:** `/admin`, `/polish-agent`, `/finnish-agent` are served from
  `public/` via rewrites in `next.config.mjs`.
- **`/for-businesses`** redirects to `https://global.salxir.com/` (was a meta-refresh).
- **SEO:** per-page metadata, canonical, Open Graph, Twitter cards, and JSON-LD
  (Organization, WebSite, Breadcrumb, FAQ) are all preserved; `robots`/`sitemap`
  are generated to match the originals.
```
