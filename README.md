# Holloway Coffee

Premium specialty coffee e-commerce (fictional brand).
Current state: foundation plus the **homepage**. Shop, product, cart and checkout pages are not built yet.

**Stack:** React 18, Vite 5, TypeScript (strict), Tailwind CSS 3.4, Lucide React. Supabase will be added later, when needed.

## Requirements

- Node.js **18.18 or newer** (Node 20 or 22 recommended)
- npm 9 or newer

## Install and run

```bash
npm install
npm run dev
```

Vite prints a local address (normally http://localhost:5173). Open it to see the foundation check screen.

## Scripts

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Starts the dev server with hot reload                |
| `npm run build`     | Type-checks, then builds to `dist/`                  |
| `npm run preview`   | Serves the production build locally (run build first) |
| `npm run typecheck` | Type-checks without building                         |

The first `npm install` creates `package-lock.json`. Commit it so everyone installs identical versions.

## Environment variables

Copy `.env.example` to `.env` when you need one. Nothing is required yet.
`.env` is git-ignored. Only browser-safe values may use the `VITE_` prefix, because they are bundled into public JavaScript. Never add a Supabase `service_role` key or any other secret to this project.

## Project structure

```
src/
  assets/images/      Locally stored, optimised photography (added per page)
  components/
    layout/           Container, Section
    ui/               Button and other small reusable pieces
  config/             Site info and breakpoints
  features/           One folder per feature (cart, shop, ...)
    home/             Homepage: Header, Sections, Footer
  hooks/              Reusable hooks (useViewport)
  lib/                Small utilities (cn)
  pages/              Route-level pages (empty for now)
  styles/
    tokens.css        Design tokens: single source of truth
    index.css         Tailwind layers and global element styles
  types/              Shared TypeScript types
```

Import from `src` with the `@` alias, for example `import { cn } from '@/lib/cn'`.

## Design system

All tokens live in `src/styles/tokens.css`. `tailwind.config.ts` reads them, so utility classes and raw CSS always agree.

**Brand colours**

| Name        | Hex       | Tailwind          |
| ----------- | --------- | ----------------- |
| Warm ivory  | `#EDE3D3` | `ivory`           |
| Espresso    | `#38251C` | `espresso`        |
| Caramel     | `#A66C45` | `caramel`         |
| Muted olive | `#77745A` | `olive`           |
| White       | `#FFFFFF` | `white`           |

**Supporting shades.** Caramel (about 3.4:1) and olive (about 3.7:1) do not reach WCAG AA contrast for small text on ivory, so there are darker companions: `caramel-deep`, `olive-deep`, `espresso-soft`, plus `ivory-light` and `ivory-deep` for surfaces. Use the plain brand colours for large type, fills and graphics, and the deep shades for small text.

**Semantic roles** are preferred inside components: `bg-surface`, `bg-surface-raised`, `bg-surface-inverse`, `text-ink`, `text-ink-muted`, `text-ink-inverse`, `text-accent-text`, `border-line`.
Opacity modifiers work, for example `bg-espresso/60`.

**Typography.** Fraunces (editorial serif) for headings, DM Sans for body text. Both are self-hosted via Fontsource, so there are no third-party font requests. The size scale is fluid: `text-xs` to `text-4xl`, plus `text-display`.

**Spacing and layout.** Tailwind's default spacing scale remains. Added: `px-gutter`, `py-section`, `py-section-sm`, and widths `max-w-container`, `max-w-narrow`, `max-w-measure`.

**Borders, radii, shadows.** `border` (1px hairline), `border-strong` (2px), `rounded-sm` / `rounded-md` / `rounded-lg` / `rounded-xl` / `rounded-pill`, `shadow-soft`, `shadow-lifted`.

**Breakpoints** (mobile first):

| Tier    | Range            | Tailwind prefix |
| ------- | ---------------- | --------------- |
| Mobile  | below 768px      | (none)          |
| Tablet  | 768px to 1023px  | `md:`           |
| Desktop | 1024px and up    | `lg:`           |

`sm` (640px), `xl` (1280px) and `2xl` (1536px) are also available. Breakpoints are defined in both `tailwind.config.ts` and `src/config/breakpoints.ts`. Keep them in sync.

**Accessibility defaults.** Skip link, visible `:focus-visible` outline, 44px minimum touch targets on standard buttons, and reduced-motion support are built in.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository (default branch `main`).
2. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, builds the site and publishes it.

The site uses a relative base path, so it works at `username.github.io/repo-name/` without extra settings.

## Images

Photos are real Pexels photographs (never AI-generated), listed in one place: `src/data/content.ts`.
`<Photo />` serves each at four widths with `srcset`, lazy loading (the hero loads eagerly) and async decoding, using Pexels' compressed CDN.
To change a photo, replace its ID. To store images locally instead, download them, optimise to AVIF/WebP and point `Photo` at the local files.

## Cart and checkout

- **Cart:** `src/lib/cart.tsx` holds the cart (saved in `localStorage`, validated on load so it can never hold unknown products or duplicate lines). The bag icon opens the cart page (`#/cart`); adding a product opens a side drawer.
- **Checkout:** `#/checkout` is one page with five steps and a persistent order summary (collapsible on mobile). Confirmation is `#/order`.
- **Demo payments:** no payment gateway is connected. No card details are collected, nothing is charged, and every order is labelled as a demo order. To go live, add a provider (for example Stripe Checkout) and only show the confirmation after the provider confirms payment.
- **Test discount codes:** `WELCOME10` (10% off), `COFFEE5` ($5 off), `FREESHIP` (free delivery).
- **Placeholder rules to confirm:** free delivery over $50 after discounts, 8% estimated tax, 1kg bags priced at 3.5x the 250g price.

## Fonts

Headings use Young Serif, body text Figtree, handwritten notes Caveat (`--font-serif`, `--font-sans`, `--font-hand` in `src/styles/tokens.css`). Extra accent colours (terracotta, butter, sage, blush) sit beside the five brand colours.

## Hand-drawn layer

Illustrations live in `src/components/art/Doodles.tsx` (SVG, coloured with `text-*` classes, given a pen-wobble by one shared filter). Also: the scrolling ribbon (`Marquee.tsx`), the mood picker (`features/home/MoodPicker.tsx`), hard "sticker" shadows (`shadow-hard`), colour-block sections, and scroll-in reveals via `data-reveal` (all motion respects reduced-motion settings).

## Little surprises

Adding to the bag fires a burst of coffee beans (`components/art/Confetti.tsx`, also on the order confirmation). Every product page has a handwritten barista's note (`src/data/notes.ts`). Cart, checkout and confirmation share a coloured title band (`components/art/PageBand.tsx`).
