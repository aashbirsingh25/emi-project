'use client';

import { useState } from 'react';
import { Check, ShieldCheck, Sparkles, TrendingUp, Info, AlertCircle, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashback: number;
}

export interface Variant {
  id: string;
  storage: string | null;
  color: string | null;
  mrp: number;
  price: number;
  imageUrl: string;
  emiPlans: EMIPlan[];
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string | null;
  variants: Variant[];
}

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  // Currently selected variant ID (defaults to first variant)
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );

  // Currently selected EMI plan ID (resets when variant changes)
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Confirmation modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find selected variant object
  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  // Handle variant selection change
  const handleVariantSelect = (variantId: string) => {
    setSelectedVariantId(variantId);
    setSelectedPlanId(null); // Reset plan choice on variant switch
  };

  // Currently selected EMI plan object
  const activePlan = activeVariant?.emiPlans.find((p) => p.id === selectedPlanId);

  // Calculate discount percentage
  const discountPercent = activeVariant
    ? Math.round(((activeVariant.mrp - activeVariant.price) / activeVariant.mrp) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Back button link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Product Image, Subtitle, Variant Selectors */}
        <div className="lg:col-span-6 space-y-6">
          {/* Large Product Image Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {product.brand}
              </span>
            </div>

            <div className="w-full aspect-square max-w-md flex items-center justify-center p-4">
              <img
                src={activeVariant.imageUrl}
                alt={`${product.name} - ${activeVariant.color || ''}`}
                className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Product Title + Subtitle Card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                {[activeVariant.storage, activeVariant.color].filter(Boolean).join(' • ')}
              </p>
              {product.description && (
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Variant Selector */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Select Variant ({product.variants.length} options)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = v.id === selectedVariantId;
                  const label = [v.storage, v.color].filter(Boolean).join(' / ');
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleVariantSelect(v.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pricing Block, EMI Plans, Action CTA */}
        <div className="lg:col-span-6 space-y-6">
          {/* Price Block & Mutual Fund Header */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-gray-900">
                {formatINR(activeVariant.price)}
              </span>
              <span className="text-base sm:text-lg text-gray-400 line-through font-medium">
                {formatINR(activeVariant.mrp)}
              </span>
              {discountPercent > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* MF Backed Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-emerald-900">Mutual Fund Backed Financing</p>
                <p className="text-emerald-700">Zero hidden fees, instant approval & flat ₹7,500 cashback.</p>
              </div>
            </div>
          </div>

          {/* EMI Plans Section */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                EMI plans backed by mutual funds
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Select your preferred tenure and monthly payment option
              </p>
            </div>

            {/* List of EMI Plan Cards */}
            <div className="space-y-3">
              {activeVariant.emiPlans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                const isZeroPercent = plan.interestRate === 0;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Radio indicator & Monthly Amount x Tenure */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <div>
                          <p className="text-base sm:text-lg font-bold text-gray-900">
                            {formatINR(plan.monthlyAmount)}
                            <span className="text-sm font-semibold text-gray-600">
                              {' '}x {plan.tenureMonths} months
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Right: Interest Rate Badge */}
                      <div className="shrink-0 text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                            isZeroPercent
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {isZeroPercent ? '0% interest' : `${plan.interestRate}% interest`}
                        </span>
                      </div>
                    </div>

                    {/* Cashback Line in Green */}
                    {plan.cashback > 0 && (
                      <div className="mt-2.5 pl-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Additional cashback of {formatINR(plan.cashback)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                disabled={!selectedPlanId}
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 shadow-md ${
                  selectedPlanId
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-[0.99]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                {selectedPlanId ? 'Proceed with this plan' : 'Select an EMI Plan to Proceed'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative space-y-6 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">EMI Plan Summary</h3>
                  <p className="text-xs text-gray-500">Mutual Fund Backed Purchase</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Plan Details Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-medium">Device</span>
                <span className="font-bold text-gray-900">{product.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-medium">Selected Variant</span>
                <span className="font-semibold text-gray-800">
                  {[activeVariant.storage, activeVariant.color].filter(Boolean).join(' • ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-medium">Selling Price</span>
                <span className="font-bold text-gray-900">{formatINR(activeVariant.price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-medium">Monthly Installment</span>
                <span className="font-extrabold text-blue-600">
                  {formatINR(activePlan.monthlyAmount)} / month
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-medium">Tenure</span>
                <span className="font-bold text-gray-900">{activePlan.tenureMonths} Months</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-medium">Interest Rate</span>
                <span className="font-bold text-gray-900">
                  {activePlan.interestRate === 0 ? '0% (No Cost EMI)' : `${activePlan.interestRate}%`}
                </span>
              </div>
              {activePlan.cashback > 0 && (
                <div className="flex justify-between py-1 text-emerald-600 font-bold">
                  <span>Guaranteed Cashback</span>
                  <span>+{formatINR(activePlan.cashback)}</span>
                </div>
              )}
            </div>

            {/* Note */}
            <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs flex items-start gap-2 border border-blue-100">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Plan confirmed! Your Mutual Fund EMI arrangement is locked in for <strong>{activePlan.tenureMonths} months</strong> at <strong>{formatINR(activePlan.monthlyAmount)}/mo</strong>.
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
