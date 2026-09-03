// prisma/seed.ts
// Run with: npm run seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data (order matters due to FK constraints)
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  const iphone_17_pro = await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      brand: 'Apple',
      description: "Apple's flagship Pro smartphone with A19 Pro chip and titanium design.",
      variants: {
        create: [
          {
            storage: '256GB',
            color: 'Silver',
            mrp: 134900,
            price: 127400,
            imageUrl: '/images/iphone grey.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 42467, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 21233, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 10617, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 5308, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 4141, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3262, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2738, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            storage: '256GB',
            color: 'Orange',
            mrp: 134900,
            price: 127400,
            imageUrl: '/images/iphone orange.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 42467, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 21233, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 10617, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 5308, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 4141, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3262, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2738, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            storage: '512GB',
            color: 'Deep Blue',
            mrp: 154900,
            price: 146900,
            imageUrl: '/images/iphone blue.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 48967, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 24483, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 12242, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 6121, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 4775, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3761, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 3157, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
        ],
      },
    },
  });

  const samsung_galaxy_s24_ultra = await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      description: "Samsung's premium Ultra series with S Pen and 200MP camera.",
      variants: {
        create: [
          {
            storage: '256GB',
            color: 'Titanium Black',
            mrp: 129999,
            price: 119999,
            imageUrl: '/images/samsung black.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 40000, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 20000, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 10000, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 5000, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 3900, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3072, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2579, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            storage: '512GB',
            color: 'Titanium Gray',
            mrp: 144999,
            price: 134999,
            imageUrl: '/images/samsung grey.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 45000, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 22500, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 11250, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 5625, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 4388, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 3456, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2902, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
        ],
      },
    },
  });

  const pixel_9_pro = await prisma.product.create({
    data: {
      slug: 'pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      brand: 'Google',
      description: "Google's AI-first flagship with the Tensor G4 chip and Gemini built in.",
      variants: {
        create: [
          {
            storage: '128GB',
            color: 'Obsidian',
            mrp: 106999,
            price: 99999,
            imageUrl: '/images/pixel obsidian.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 33333, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 16667, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 8333, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 4167, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 3250, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 2560, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2149, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
          {
            storage: '256GB',
            color: 'Porcelain',
            mrp: 118999,
            price: 111999,
            imageUrl: '/images/pixel porclain.png',
            emiPlans: {
              create: [
                { tenureMonths: 3, monthlyAmount: 37333, interestRate: 0, cashback: 7500 },
                { tenureMonths: 6, monthlyAmount: 18667, interestRate: 0, cashback: 7500 },
                { tenureMonths: 12, monthlyAmount: 9333, interestRate: 0, cashback: 7500 },
                { tenureMonths: 24, monthlyAmount: 4667, interestRate: 0, cashback: 7500 },
                { tenureMonths: 36, monthlyAmount: 3640, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 48, monthlyAmount: 2868, interestRate: 10.5, cashback: 7500 },
                { tenureMonths: 60, monthlyAmount: 2407, interestRate: 10.5, cashback: 7500 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed complete: 3 products, 7 variants, 49 EMI plans created with local image paths.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
