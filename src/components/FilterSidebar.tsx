"use client";
import { ChevronDown, LayoutGrid, Heart, Compass, PenTool, Home, Package } from "lucide-react";

export default function FilterSidebar({ 
  type = 'all', 
  activeFilter = 'All', 
  setActiveFilter = () => {} 
}: { 
  type?: 'all' | 'stack' | 'prisma',
  activeFilter?: string,
  setActiveFilter?: (val: string) => void
}) {
  
  const categories = {
    all: [
      { name: "All Products", icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Stack Products", icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Prisma Products", icon: <PenTool className="w-4 h-4" /> },
    ],
    stack: [
      { name: "Starter Kits", icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "UI Kits", icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Component Packs", icon: <LayoutGrid className="w-4 h-4" /> },
    ],
    prisma: [
      { name: "Celebrations", icon: <Heart className="w-4 h-4" /> },
      { name: "Planning", icon: <Compass className="w-4 h-4" /> },
      { name: "Creative", icon: <PenTool className="w-4 h-4" /> },
      { name: "Home", icon: <Home className="w-4 h-4" /> },
      { name: "Bundles", icon: <Package className="w-4 h-4" /> },
    ]
  };

  const activeCategories = categories[type] || categories.all;

  return (
    <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pb-8">
      <div className="space-y-8">
        <div>
          {/* FIXED CONTRAST HEADER */}
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-black flex justify-between items-center">
            Shop by Category <ChevronDown className="w-4 h-4" />
          </h3>
          <ul className="space-y-1 text-sm font-medium">
            
            <li 
              onClick={() => setActiveFilter('All')}
              className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                activeFilter === 'All' ? 'text-brand-green bg-brand-light/70 font-bold' : 'text-brand-charcoal hover:bg-brand-light/30'
              }`}
            >
              <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> All Products</div>
            </li>

            {activeCategories.map((cat, i) => {
              if (cat.name === 'All Products') return null; 
              
              return (
                <li 
                  key={i} 
                  onClick={() => setActiveFilter(cat.name)}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    activeFilter === cat.name ? 'text-brand-green bg-brand-light/70 font-bold' : 'text-brand-charcoal hover:bg-brand-light/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {cat.icon} {cat.name === 'Planning' ? 'Planning & Org' : cat.name === 'Creative' ? 'Creative & Journaling' : cat.name === 'Home' ? 'Home & Living' : cat.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-black flex justify-between items-center">
            Filter by Price <ChevronDown className="w-4 h-4" />
          </h3>
          <ul className="space-y-3 text-sm text-brand-charcoal">
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/30 text-brand-green focus:ring-brand-green w-4 h-4" /> Under $15</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/30 text-brand-green focus:ring-brand-green w-4 h-4" /> $15 - $30</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/30 text-brand-green focus:ring-brand-green w-4 h-4" /> $30 - $50</li>
            <li className="flex items-center gap-3"><input type="checkbox" className="rounded border-brand-charcoal/30 text-brand-green focus:ring-brand-green w-4 h-4" /> $50+</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
