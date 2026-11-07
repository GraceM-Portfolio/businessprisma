"use client";
import { ChevronDown, LayoutGrid, Heart, Compass, PenTool, Home, Package } from "lucide-react";

export default function FilterSidebar({ type = 'all' }: { type?: 'all' | 'stack' | 'prisma' }) {
  
  const categories = {
    all: [
      { name: "Stack Products", count: 18, icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Prisma Products", count: 16, icon: <PenTool className="w-4 h-4" /> },
    ],
    stack: [
      { name: "Starter Kits", count: 6, icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "UI Kits", count: 6, icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Component Packs", count: 6, icon: <LayoutGrid className="w-4 h-4" /> },
    ],
    prisma: [
      { name: "Celebrations", count: 3, icon: <Heart className="w-4 h-4" /> },
      { name: "Planning & Org", count: 3, icon: <Compass className="w-4 h-4" /> },
      { name: "Creative & Journaling", count: 4, icon: <PenTool className="w-4 h-4" /> },
      { name: "Home & Living", count: 2, icon: <Home className="w-4 h-4" /> },
      { name: "Bundles", count: 4, icon: <Package className="w-4 h-4" /> },
    ]
  };

  const activeCategories = categories[type] || categories.all;

  return (
    <aside className="w-full md:w-64 flex-shrink-0 sticky top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-8">
      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50 flex justify-between items-center">
            Shop by Category <ChevronDown className="w-4 h-4" />
          </h3>
          <ul className="space-y-2 text-sm font-medium">
            <li className="flex items-center justify-between text-brand-green bg-brand-light/50 p-2.5 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> All Products</div>
              <span className="text-xs text-brand-charcoal/50">{type === 'prisma' ? '16' : '18'}</span>
            </li>
            {activeCategories.map((cat, i) => (
              <li key={i} className="flex items-center justify-between p-2.5 hover:bg-brand-light/30 rounded-lg cursor-pointer text-brand-charcoal/70 transition-colors">
                <div className="flex items-center gap-2">
                  {cat.icon} {cat.name}
                </div>
                <span className="text-xs text-brand-charcoal/50">{cat.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50 flex justify-between items-center">
            Filter by Price <ChevronDown className="w-4 h-4" />
          </h3>
          <ul className="space-y-3 text-sm text-brand-charcoal/70">
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> Under $15</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> $15 - $30</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> $30 - $50</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> $50+</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50 flex justify-between items-center">
            Format <ChevronDown className="w-4 h-4" />
          </h3>
          <ul className="space-y-3 text-sm text-brand-charcoal/70">
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> PDF / Printable</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> Canva Templates</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/20 text-brand-green focus:ring-brand-green w-4 h-4" /> Spreadsheets</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
