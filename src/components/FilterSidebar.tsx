"use client";
import { LayoutGrid, Heart, Compass, PenTool, Home, Package } from "lucide-react";

export default function FilterSidebar({ 
  type = 'all', 
  activeFilter = 'All', 
  setActiveFilter = () => {} 
}: { 
  type?: 'all' | 'stack' | 'prisma',
  activeFilter?: string,
  setActiveFilter?: (val: string) => void
}) {
  
  const categories = [
    { name: "All", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Celebrations", icon: <Heart className="w-4 h-4" /> },
    { name: "Planning", icon: <Compass className="w-4 h-4" /> },
    { name: "Creative", icon: <PenTool className="w-4 h-4" /> },
    { name: "Home", icon: <Home className="w-4 h-4" /> },
    { name: "Bundles", icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="md:hidden w-full overflow-x-auto no-scrollbar flex gap-2 mb-8 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveFilter(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors border ${
              activeFilter === cat.name 
                ? 'bg-brand-purple text-brand-cream border-brand-purple' 
                : 'bg-transparent text-brand-charcoal/70 border-brand-charcoal/20 hover:border-brand-purple'
            }`}
          >
            {cat.icon} {cat.name === 'Planning' ? 'Planning & Org' : cat.name === 'Creative' ? 'Creative & Journaling' : cat.name === 'Home' ? 'Home & Living' : cat.name}
          </button>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <aside className="hidden md:block w-64 flex-shrink-0 sticky top-24 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pb-8 pr-4 border-r border-brand-charcoal/10">
        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-brand-charcoal/50 flex justify-between items-center">
              Shop by Category
            </h3>
            <ul className="space-y-1 text-sm font-medium">
              {categories.map((cat) => (
                <li 
                  key={cat.name}
                  onClick={() => setActiveFilter(cat.name)}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    activeFilter === cat.name ? 'text-brand-purple bg-brand-purple/5 font-semibold' : 'text-brand-charcoal/70 hover:text-brand-charcoal hover:bg-brand-light/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon} {cat.name === 'Planning' ? 'Planning & Org' : cat.name === 'Creative' ? 'Creative & Journaling' : cat.name === 'Home' ? 'Home & Living' : cat.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
