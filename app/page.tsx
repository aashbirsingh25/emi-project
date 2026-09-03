import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Tag, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

interface VariantSummary {
  id: string;
  storage: string | null;
  color: string | null;
  mrp: number;
  price: number;
  imageUrl: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  variants: VariantSummary[];
}

// Helper to format INR currency
function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Fetch products from /api/products
async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        brand: true,
        variants: {
          select: {
            id: true,
            storage: true,
            color: true,
            mrp: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });

    return products;
  } catch (err) {
    console.error("Fetch products error:", err);
    return [];
  }
}


export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      {/* Banner / Hero section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold backdrop-blur-md border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Mutual Fund Backed Financing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Own Your Dream Phone with Smart EMI Plans
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Flexible tenure, 0% interest options, and flat ₹7,500 cashback backed by top-performing mutual funds.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-blue-500 to-transparent" />
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Featured Smartphones
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Choose a phone to explore exclusive mutual fund EMI plans
          </p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-200 text-gray-700">
          {products.length} Products
        </span>
      </div>

      {/* Product Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => {
          // Calculate lowest price among variants
          const lowestPrice = product.variants.length > 0
            ? Math.min(...product.variants.map((v) => v.price))
            : 0;

          // Main image from first variant
          const mainImage = product.variants[0]?.imageUrl || "https://picsum.photos/seed/phone/600/600";

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Card Top Badge & Image Container */}
              <div className="relative aspect-square w-full bg-[#f8f8fa] p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-gray-800 backdrop-blur-sm border border-gray-200 shadow-sm">
                    {product.brand}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> ₹7,500 Cashback
                  </span>
                </div>

                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300 ease-out flex items-center justify-center">
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    <span>{product.variants.length} Variant{product.variants.length > 1 ? 's' : ''} available</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block">
                      Starting from
                    </span>
                    <span className="text-xl font-black text-gray-900">
                      {formatINR(lowestPrice)}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-gray-700 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-4">
          <p className="text-gray-500">No products found. Make sure the database is migrated and seeded.</p>
          <div className="text-xs bg-slate-100 p-3 rounded-lg font-mono inline-block text-left text-gray-700">
            npx prisma migrate dev --name init<br />
            npm run seed
          </div>
        </div>
      )}
    </div>
  );
}
