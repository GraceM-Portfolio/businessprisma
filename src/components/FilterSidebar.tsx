"use client";
import { useState } from "react";
import { ChevronDown, LayoutGrid } from "lucide-react";

export default function FilterSidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50 flex justify-between items-center">
          Products <ChevronDown className="w-4 h-4" />
        </h3>
        <ul className="space-y-3 text-sm font-medium">
          <li className="flex items-center justify-between text-brand-green bg-brand-light/50 p-2 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> All Products</div>
            <span className="text-xs text-brand-charcoal/50">18</span>
          </li>
          <li className="flex items-center justify-between p-2 hover:bg-brand-light/30 rounded-lg cursor-pointer text-brand-charcoal/70">
            <span>Starter Kits</span> <span className="text-xs text-brand-charcoal/50">4</span>
          </li>
          <li className="flex items-center justify-between p-2 hover:bg-brand-light/30 rounded-lg cursor-pointer text-brand-charcoal/70">
            <span>UI Kits</span> <span className="text-xs text-brand-charcoal/50">5</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50">Filter by Price</h3>
        <ul className="space-y-2 text-sm text-brand-charcoal/70">
          <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green" /> Under $25</li>
          <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green" /> $25 - $50</li>
          <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green" /> $50 - $100</li>
        </ul>
      </div>
    </aside>
  );
}
