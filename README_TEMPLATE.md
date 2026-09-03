# EMI Store

A full-stack web app that displays smartphones with multiple EMI plans backed by
mutual funds — built for the 1Fi SDE1 assignment.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Route Handlers (Node.js)
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Prisma

## Setup & Run Instructions

```bash
git clone <your-repo-url>
cd emi-store
npm install

# Create .env from the example and fill in your own Postgres connection string
cp .env.example .env

npx prisma migrate dev --name init
npm run seed
npm run dev
```

App will be running at http://localhost:3000

## Deployed Demo

[PASTE_VERCEL_URL_HERE]

## Schema

**Product** — a phone model
- `id`, `slug` (unique, used in URL), `name`, `brand`, `description`

**Variant** — a storage/color combo of a product, belongs to one Product
- `id`, `productId`, `storage`, `color`, `mrp`, `price`, `imageUrl`

**EMIPlan** — one installment option for a Variant
- `id`, `variantId`, `tenureMonths`, `monthlyAmount`, `interestRate`, `cashback`

Relations: `Product 1—N Variant 1—N EMIPlan`

## API Endpoints

### `GET /api/products`

Returns a list of all products with variant summaries.

```json
[
  {
    "id": "clx1a2b3c",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "variants": [
      {
        "id": "clx1a2b3d",
        "storage": "256GB",
        "color": "Silver",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "https://picsum.photos/seed/iphone17pro-silver/600/600"
      },
      {
        "id": "clx1a2b3e",
        "storage": "256GB",
        "color": "Orange",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "https://picsum.photos/seed/iphone17pro-orange/600/600"
      }
    ]
  }
]
```

### `GET /api/products/[slug]`

Returns full product detail with variants and nested EMI plans.

Example: `GET /api/products/iphone-17-pro`

```json
{
  "id": "clx1a2b3c",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "brand": "Apple",
  "description": "Apple's flagship Pro smartphone with A19 Pro chip and titanium design.",
  "variants": [
    {
      "id": "clx1a2b3d",
      "storage": "256GB",
      "color": "Silver",
      "mrp": 134900,
      "price": 127400,
      "imageUrl": "https://picsum.photos/seed/iphone17pro-silver/600/600",
      "emiPlans": [
        { "id": "e1", "tenureMonths": 3, "monthlyAmount": 42467, "interestRate": 0, "cashback": 7500 },
        { "id": "e2", "tenureMonths": 6, "monthlyAmount": 21233, "interestRate": 0, "cashback": 7500 },
        { "id": "e3", "tenureMonths": 12, "monthlyAmount": 10617, "interestRate": 0, "cashback": 7500 },
        { "id": "e4", "tenureMonths": 24, "monthlyAmount": 5308, "interestRate": 0, "cashback": 7500 },
        { "id": "e5", "tenureMonths": 36, "monthlyAmount": 4141, "interestRate": 10.5, "cashback": 7500 },
        { "id": "e6", "tenureMonths": 48, "monthlyAmount": 3262, "interestRate": 10.5, "cashback": 7500 },
        { "id": "e7", "tenureMonths": 60, "monthlyAmount": 2738, "interestRate": 10.5, "cashback": 7500 }
      ]
    }
  ]
}
```

`404` response if slug doesn't exist:

```json
{ "error": "Product not found" }
```

## Seed Data

3 products, 7 total variants, 49 EMI plans (7 tenures × 7 variants):
- **iPhone 17 Pro** — 256GB Silver, 256GB Orange, 512GB Deep Blue
- **Samsung Galaxy S24 Ultra** — 256GB Titanium Black, 512GB Titanium Gray
- **Google Pixel 9 Pro** — 128GB Obsidian, 256GB Porcelain

EMI plan rule: 3/6/12/24-month tenures at 0% interest; 36/48/60-month tenures at
10.5% interest (standard amortizing EMI formula); flat ₹7,500 cashback on every plan.
