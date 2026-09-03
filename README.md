# EMI Store

A full-stack Next.js 14 web application that displays smartphones with multiple EMI plans backed by mutual funds — built for the 1Fi SDE1 assignment.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Route Handlers (Node.js)
- **Database:** PostgreSQL (hosted on Neon)
- **ORM:** Prisma ORM

## Setup & Run Instructions

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd emi-store

# 2. Install dependencies
npm install

# 3. Create .env file and set your PostgreSQL connection string
cp .env.example .env

# 4. Run Prisma database migrations
npx prisma migrate dev --name init

# 5. Seed the database with sample products and EMI plans
npm run seed

# 6. Start the development server
npm run dev
```

App will be running at [http://localhost:3000](http://localhost:3000)

## Deployed Demo

Deployed application URL: [DEPLOY_URL_PLACEHOLDER]

## Prisma Schema Summary

- **Product** — Represents a phone model
  - `id`, `slug` (unique, used in URL), `name`, `brand`, `description`, `createdAt`
- **Variant** — Represents a storage/color combination of a product (belongs to `Product`)
  - `id`, `productId`, `storage`, `color`, `mrp`, `price`, `imageUrl`
- **EMIPlan** — Represents an installment option for a specific variant (belongs to `Variant`)
  - `id`, `variantId`, `tenureMonths`, `monthlyAmount`, `interestRate`, `cashback`

Relationships: `Product (1) -> (N) Variant (1) -> (N) EMIPlan`

## API Endpoint Documentation

### 1. `GET /api/products`

Returns an array of all products with summarized variant details (without nested EMI plans).

**Example Response:**

```json
[
  {
    "id": "cm1a2b3c4d5e6f",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "variants": [
      {
        "id": "cm1v1a2b3c",
        "storage": "256GB",
        "color": "Silver",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "https://picsum.photos/seed/iphone17pro-silver/600/600"
      },
      {
        "id": "cm1v1a2b3d",
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

---

### 2. `GET /api/products/[slug]`

Returns full product details with nested variants and their corresponding EMI plans ordered by `tenureMonths` ascending.

**Example Request:** `GET /api/products/iphone-17-pro`

**Example Response (200 OK):**

```json
{
  "id": "cm1a2b3c4d5e6f",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "brand": "Apple",
  "description": "Apple's flagship Pro smartphone with A19 Pro chip and titanium design.",
  "variants": [
    {
      "id": "cm1v1a2b3c",
      "storage": "256GB",
      "color": "Silver",
      "mrp": 134900,
      "price": 127400,
      "imageUrl": "https://picsum.photos/seed/iphone17pro-silver/600/600",
      "emiPlans": [
        {
          "id": "cm1e1",
          "tenureMonths": 3,
          "monthlyAmount": 42467,
          "interestRate": 0,
          "cashback": 7500
        },
        {
          "id": "cm1e2",
          "tenureMonths": 6,
          "monthlyAmount": 21233,
          "interestRate": 0,
          "cashback": 7500
        },
        {
          "id": "cm1e3",
          "tenureMonths": 12,
          "monthlyAmount": 10617,
          "interestRate": 0,
          "cashback": 7500
        },
        {
          "id": "cm1e4",
          "tenureMonths": 24,
          "monthlyAmount": 5308,
          "interestRate": 0,
          "cashback": 7500
        },
        {
          "id": "cm1e5",
          "tenureMonths": 36,
          "monthlyAmount": 4141,
          "interestRate": 10.5,
          "cashback": 7500
        },
        {
          "id": "cm1e6",
          "tenureMonths": 48,
          "monthlyAmount": 3262,
          "interestRate": 10.5,
          "cashback": 7500
        },
        {
          "id": "cm1e7",
          "tenureMonths": 60,
          "monthlyAmount": 2738,
          "interestRate": 10.5,
          "cashback": 7500
        }
      ]
    }
  ]
}
```

**Example 404 Response (Product not found):**

```json
{
  "error": "Product not found"
}
```

## Seed Data Summary

The seed script creates 3 flagship smartphone products, 7 variants, and 49 EMI plans:
- **iPhone 17 Pro** (256GB Silver, 256GB Orange, 512GB Deep Blue)
- **Samsung Galaxy S24 Ultra** (256GB Titanium Black, 512GB Titanium Gray)
- **Google Pixel 9 Pro** (128GB Obsidian, 256GB Porcelain)
