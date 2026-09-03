import { notFound } from 'next/navigation';
import ProductDetailClient, { ProductDetail } from '@/components/ProductDetailClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getProduct(slug: string): Promise<ProductDetail | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        description: true,
        variants: {
          select: {
            id: true,
            storage: true,
            color: true,
            mrp: true,
            price: true,
            imageUrl: true,
            emiPlans: {
              select: {
                id: true,
                tenureMonths: true,
                monthlyAmount: true,
                interestRate: true,
                cashback: true,
              },
              orderBy: {
                tenureMonths: 'asc',
              },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error('Error in getProduct:', error);
    return null;
  }
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found — EMI Store',
    };
  }

  return {
    title: `${product.name} — EMI Plans | EMI Store`,
    description: product.description || `Buy ${product.name} with mutual fund backed EMI plans.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
