"use client";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-brand-cream h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-brand-charcoal/10">
          <h2 className="text-2xl font-serif">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-brand-light rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Mock Item */}
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-brand-light rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold">SaaS Dashboard Starter Kit</h3>
              <p className="text-sm text-brand-charcoal/60 mb-2">Digital Download</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">$79.00</span>
                <button className="text-xs text-brand-charcoal/50 hover:text-brand-charcoal">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-brand-charcoal/10 bg-brand-light/30">
          <div className="flex justify-between mb-4 font-semibold text-lg">
            <span>Subtotal</span>
            <span>$79.00</span>
          </div>
          <Link href="/cart" onClick={onClose} className="w-full flex items-center justify-center gap-2 bg-brand-green text-brand-cream px-6 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
