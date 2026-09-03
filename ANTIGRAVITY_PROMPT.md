# Antigravity Master Prompt — EMI Store Assignment

Paste everything in the fenced block below directly into Antigravity as your first prompt.
Before pasting: create the project folder, put `schema.prisma` and `seed.ts` (attached
separately) into it, and have your Neon `DATABASE_URL` ready to paste into `.env`.

---

```
Build a full-stack Next.js 14 (App Router, TypeScript) app called "EMI Store" that
displays smartphones with EMI plans backed by mutual funds, similar to Snapmint.

STACK: Next.js 14 (App Router) + TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL (Neon).
I already have a `prisma/schema.prisma` and `prisma/seed.ts` file — use them as-is,
don't regenerate the schema. I'll paste my DATABASE_URL into .env myself.

PROJECT SETUP:
- Initialize Next.js app with TypeScript + Tailwind + App Router.
- Install and configure Prisma, pointing at the existing prisma/schema.prisma.
- Add a `prisma/seed.ts` wiring in package.json:
  "prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }
- Create a singleton Prisma client at lib/prisma.ts (standard Next.js pattern to avoid
  exhausting connections in dev).

API ROUTES (App Router route handlers):
- GET /api/products
  -> returns array of { id, slug, name, brand, variants: [{ id, storage, color, mrp,
     price, imageUrl }] } — one row per product, variants summarized (no EMI plans
     nested here, keep it light for the listing page).
- GET /api/products/[slug]
  -> returns { id, slug, name, brand, description, variants: [{ id, storage, color,
     mrp, price, imageUrl, emiPlans: [{ id, tenureMonths, monthlyAmount, interestRate,
     cashback }] }] } fully nested, ordered by variant then by tenureMonths ascending.
  -> 404 JSON response if slug not found.

FRONTEND PAGES:
1. Home page "/":
   - Header with "EMI Store" branding.
   - Responsive grid (1 col mobile, 2 col tablet, 3 col desktop) of product cards.
   - Each card: image, product name, "Starting from ₹X" (lowest-priced variant),
     links to /products/[slug].
   - Fetch from /api/products, client or server component — your choice, but no
     hardcoded product data anywhere.

2. Product page "/products/[slug]":
   Layout: two-column on desktop (stacks on mobile).
   LEFT column:
   - Large product image in a light-gray rounded card.
   - Product name + selected variant's storage/color as subtitle.
   - Variant selector: pill/chip buttons for each variant (e.g. storage or color),
     selecting a variant updates price, image, and EMI plan list without a full page
     reload (client-side state).
   RIGHT column:
   - Price block: large selling price, MRP shown with strikethrough next to it.
   - Heading: "EMI plans backed by mutual funds".
   - List of EMI plan cards, one per plan, each showing:
     "₹{monthlyAmount} x {tenureMonths} months" (bold, prominent),
     interest rate ("0% interest" or "10.5% interest") aligned right,
     cashback line below in green: "Additional cashback of ₹{cashback}" (only if > 0).
   - Plans are selectable (radio-button behavior) — clicking a card highlights it
     with a colored border/background, only one selected at a time.
   - "Proceed with this plan" button below the list, disabled until a plan is
     selected. On click, show a confirmation (toast, modal, or inline message) that
     summarizes the chosen plan — no real payment flow needed.
   - Handle loading and not-found states gracefully.

STYLING:
- Tailwind CSS. Light gray page background (#f5f5f7-ish), white rounded cards with
  subtle shadow, generous spacing, similar visual density to the Snapmint reference
  (clean e-commerce PDP style). Green (#16a34a or similar) for cashback text.
  Fully responsive — test mental model at 375px, 768px, 1280px widths.

DO NOT hardcode any product/pricing/EMI data in frontend components — everything must
be fetched from the API routes, which read from the database via Prisma.

DELIVERABLES TO GENERATE ALONGSIDE THE APP:
- .env.example with `DATABASE_URL="postgresql://user:password@host/db?sslmode=require"`
- README.md including:
  - Project overview (one paragraph)
  - Tech stack list
  - Setup & run instructions (clone, npm install, set .env, npx prisma migrate dev,
    npm run seed, npm run dev)
  - Prisma schema summary (Product / Variant / EMIPlan and their relations)
  - API endpoint docs: method, path, and a real example JSON response for both
    /api/products and /api/products/[slug]
  - Note that the app is deployed at [DEPLOY_URL_PLACEHOLDER] (I'll fill this in
    after deploying)

After scaffolding, run `npx prisma migrate dev --name init` and `npm run seed` and
confirm the dev server boots with data visible on both pages.
```

---

## After Antigravity finishes — your manual checklist (don't skip)

1. Verify `.env` has your real Neon `DATABASE_URL` (Antigravity should NOT have
   committed real credentials — only `.env.example`).
2. Run the app locally, click into every one of the 3 products, switch every
   variant, select an EMI plan, click Proceed.
3. `git init`, push to GitHub.
4. Deploy to Vercel:
   - Import the GitHub repo.
   - Add `DATABASE_URL` as an environment variable in Vercel project settings.
   - Set build command to `npx prisma generate && npx prisma migrate deploy && next build`
     (or add a `postinstall: prisma generate` script) so the Prisma client is
     generated at build time on Vercel.
5. Fill the deploy URL into README.md, commit.
6. Record 2-3 min video: homepage → product page → variant switch → EMI selection →
   Proceed → quick look at Neon DB tables / Prisma schema → one API response in
   browser. Upload to Drive/YouTube with public link access.
7. Submit via the form: https://forms.gle/V4vqbcSAhJV7BqoAA
