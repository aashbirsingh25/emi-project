import Link from 'next/link';
import { Smartphone, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100 shadow-sm">
        <Smartphone className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Not Found</h2>
        <p className="text-sm text-gray-500">
          The smartphone product you are looking for does not exist or has been removed.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Product Catalog
      </Link>
    </div>
  );
}
