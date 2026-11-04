"use client";
import { ChevronDown, LayoutGrid } from "lucide-react";

// Accept props for filtering
export default function FilterSidebar({ activeFilter, setActiveFilter }: { activeFilter: string, setActiveFilter: (f: string) => void }) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div>
        <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50 flex justify-between items-center">
          Products <ChevronDown className="w-4 h-4" />
        </h3>
        <ul className="space-y-3 text-sm font-medium">
          <li 
            onClick={() => setActiveFilter('all')}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${activeFilter === 'all' ? 'text-brand-green bg-brand-light/50' : 'text-brand-charcoal/70 hover:bg-brand-light/30'}`}
          >
            <div className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> All Products</div>
          </li>
          <li 
            onClick={() => setActiveFilter('stack')}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${activeFilter === 'stack' ? 'text-brand-green bg-brand-light/50' : 'text-brand-charcoal/70 hover:bg-brand-light/30'}`}
          >
            <span>Stack (Dev)</span>
          </li>
          <li 
            onClick={() => setActiveFilter('prisma')}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${activeFilter === 'prisma' ? 'text-brand-green bg-brand-light/50' : 'text-brand-charcoal/70 hover:bg-brand-light/30'}`}
          >
            <span>Prisma (Design)</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
