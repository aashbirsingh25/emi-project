import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

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

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
