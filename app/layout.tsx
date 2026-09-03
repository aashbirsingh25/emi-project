import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck, Smartphone, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "EMI Store — Mutual Fund Backed Smartphone EMI Plans",
  description: "Shop premium smartphones with low-cost and 0% interest EMI plans backed by mutual funds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f5f5f7] text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5.5 h-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  EMI Store
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> MF-Backed Plans
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Mutual Fund Backed EMI</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-8 text-center text-xs text-gray-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">EMI Store</span> &copy; {new Date().getFullYear()} — Premium Smartphones with MF-backed EMI
            </div>
            <div className="text-gray-400">
              Snapmint-inspired e-commerce PDP implementation
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
