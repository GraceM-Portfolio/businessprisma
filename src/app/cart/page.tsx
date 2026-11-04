import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-3xl border border-brand-charcoal/10 p-6 lg:p-8 flex flex-col md:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-6">
          <div className="flex gap-4 border-b border-brand-charcoal/10 pb-6">
            <div className="w-24 h-24 bg-brand-light rounded-xl flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">SaaS Dashboard Starter Kit</h3>
              <p className="text-sm text-brand-charcoal/60 mb-2">Format: Next.js, Tailwind</p>
              <button className="text-sm text-red-500 hover:underline">Remove</button>
            </div>
            <div className="font-semibold">$79.00</div>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full md:w-80 bg-brand-light/50 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm mb-4 text-brand-charcoal/70">
            <div className="flex justify-between"><span>Subtotal</span><span>$79.00</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>Calculated at checkout</span></div>
          </div>
          <div className="border-t border-brand-charcoal/10 pt-4 mb-6 flex justify-between font-bold text-lg">
            <span>Total</span><span>$79.00</span>
          </div>
          <button className="w-full bg-brand-green text-brand-cream py-3 rounded-full font-medium hover:bg-opacity-90 transition-all flex justify-center items-center gap-2">
            Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
