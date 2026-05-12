# NOVA NFT — Next.js (App Router)

Next.js 15 + React 19 + Tailwind v4 port of the NOVA NFT marketplace.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/` — App Router pages (`/`, `/nfts`)
- `components/` — UI components (Navbar, Hero, Collection, ClaimToken, Roadmap, Footer)
- `hooks/use-wallet.tsx` — MetaMask wallet context (client-only)
- `data/nfts.ts` — NFT mock data
- `app/globals.css` — Tailwind v4 + design tokens
- `public/assets/` — NFT images

All components that use state/hooks are marked with `"use client"`.
