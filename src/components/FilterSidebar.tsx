"use client";
import { LayoutGrid, Heart, Compass, PenTool, Home, Package, LayoutTemplate, MonitorPlay, Code2 } from "lucide-react";

export default function FilterSidebar({ 
  type = 'all', 
  activeFilter = 'All', 
  setActiveFilter = () => {},
  theme = 'light'
}: { 
  type?: 'all' | 'stack' | 'prisma',
  activeFilter?: string,
  setActiveFilter?: (val: string) => void,
  theme?: 'light' | 'dark'
}) {
  
  const categories = {
    prisma: [
      { name: "All", icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Celebrations", icon: <Heart className="w-4 h-4" /> },
      { name: "Planning", icon: <Compass className="w-4 h-4" /> },
      { name: "Creative", icon: <PenTool className="w-4 h-4" /> },
      { name: "Home", icon: <Home className="w-4 h-4" /> },
      { name: "Bundles", icon: <Package className="w-4 h-4" /> },
    ],
    stack: [
      { name: "All", icon: <LayoutGrid className="w-4 h-4" /> },
      { name: "Starter Kit", icon: <LayoutTemplate className="w-4 h-4" /> },
      { name: "UI Kit", icon: <MonitorPlay className="w-4 h-4" /> },
      { name: "Components", icon: <Code2 className="w-4 h-4" /> },
      { name: "Bundles", icon: <Package className="w-4 h-4" /> },
    ]
  };

  const activeCategories = categories[type] || categories.stack;
  
  // Dynamic classes based on theme
  const isDark = theme === 'dark';
  const borderClass = isDark ? 'border-white/10' : 'border-brand-charcoal/10';
  const headingClass = isDark ? 'text-white/40' : 'text-brand-charcoal/50';
  const inactiveClass = isDark ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-brand-charcoal/70 hover:text-black hover:bg-brand-light/50';
  const activeClass = isDark ? 'text-white bg-white/10 font-semibold' : 'text-black bg-black/5 font-semibold';
  const mobileInactive = isDark ? 'bg-transparent text-white/70 border-white/20 hover:border-white' : 'bg-transparent text-brand-charcoal/70 border-brand-charcoal/20 hover:border-black';
  const mobileActive = isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black';

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="md:hidden w-full overflow-x-auto no-scrollbar flex gap-2 mb-8 pb-2">
        {activeCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveFilter(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors border ${
              activeFilter === cat.name ? mobileActive : mobileInactive
            }`}
          >
            {cat.icon} {cat.name === 'Starter Kit' ? 'Starter Kits' : cat.name === 'UI Kit' ? 'UI Kits' : cat.name === 'Components' ? 'Component Packs' : cat.name}
          </button>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <aside className={`hidden md:block w-64 flex-shrink-0 sticky top-24 h-fit max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar pb-8 pr-4 border-r ${borderClass}`}>
        <div className="space-y-8">
          <div>
            <h3 className={`text-xs font-bold tracking-widest uppercase mb-4 flex justify-between items-center ${headingClass}`}>
              Shop by Category
            </h3>
            <ul className="space-y-1 text-sm font-medium">
              {activeCategories.map((cat) => (
                <li 
                  key={cat.name}
                  onClick={() => setActiveFilter(cat.name)}
                  className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${
                    activeFilter === cat.name ? activeClass : inactiveClass
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon} {cat.name === 'Starter Kit' ? 'Starter Kits' : cat.name === 'UI Kit' ? 'UI Kits' : cat.name === 'Components' ? 'Component Packs' : cat.name}
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
