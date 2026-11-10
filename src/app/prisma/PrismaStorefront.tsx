"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { Heart, Compass, PenTool, Home, Package, LayoutGrid } from "lucide-react";

const sectionStyles: Record<string, {
  titleColor: string,
  eyebrowColor: string,
  descColor: string,
  icon: React.ReactNode,
  eyebrow: string,
  description: string
}> = {
  'Celebrations': {
    titleColor: 'text-black',
    eyebrowColor: 'text-[#C77547]', 
    descColor: 'text-[#A34F22]/80',
    icon: <Heart className="w-4 h-4" />,
    eyebrow: 'For the moments that matter',
    description: 'Beautifully designed wedding planners, invitations, and celebration kits for life\'s biggest days.',
  },
  'Planning': {
    titleColor: 'text-black',
    eyebrowColor: 'text-[#059669]', 
    descColor: 'text-[#047857]/80',
    icon: <Compass className="w-4 h-4" />,
    eyebrow: 'Clarity for everyday life',
    description: 'Budget dashboards, household systems, and planners to bring structure and calm to your daily routine.',
  },
  'Creative': {
    titleColor: 'text-black',
    eyebrowColor: 'text-[#8B5CF6]', 
    descColor: 'text-[#6D28D9]/80',
    icon: <PenTool className="w-4 h-4" />,
    eyebrow: 'Make space for creativity',
    description: 'Journals, digital stickers, and creative kits designed for reflection, memory-keeping, and self-expression.',
  },
  'Home': {
    titleColor: 'text-black',
    eyebrowColor: 'text-[#D97706]', 
    descColor: 'text-[#B45309]/80',
    icon: <Home className="w-4 h-4" />,
    eyebrow: 'Make your space work beautifully',
    description: 'Room makeover guides, organization systems, and design resources for a home you truly love.',
  },
  'Bundles': {
    // LUXURY PRISMA BUNDLE STYLING
    titleColor: 'text-white',
    eyebrowColor: 'text-[#f4cfc3] font-bold tracking-[0.2em]', 
    descColor: 'text-[#f4cfc3]/80',
    icon: <Package className="w-4 h-4 text-[#f4cfc3]" />,
    eyebrow: 'Exclusive Collections',
    description: 'Curated bundles that combine our best products so you get everything you need at a premium discount.',
  },
  'Default': {
    titleColor: 'text-black',
    eyebrowColor: 'text-black/60',
    descColor: 'text-black/70',
    icon: <LayoutGrid className="w-4 h-4" />,
    eyebrow: 'Explore',
    description: 'Discover our latest digital products.',
  }
};

export default function PrismaStorefront({ allProducts }: { allProducts: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = allProducts.filter(product => {
    if (activeFilter === "All") return true;
    return product.tags?.includes(activeFilter);
  });

  const groupedProducts = filteredProducts.reduce((acc: any, product) => {
    let category = product.tags?.[0] || 'Other Designs';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const sortedCategories = Object.entries(groupedProducts).sort(([a], [b]) => {
    if (a === 'Bundles') return 1;
    if (b === 'Bundles') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="relative w-full max-w-full">
      <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start mt-6 md:mt-12 w-full max-w-full">
        <FilterSidebar 
          type="prisma" 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          theme="light"
        />
        
        <div className="flex-1 space-y-16 md:space-y-24 w-full min-w-0">
          {sortedCategories.length === 0 ? (
            <div className="text-center py-20 text-brand-charcoal/50 font-medium">
              No products found for this category.
            </div>
          ) : (
            sortedCategories.map(([category, items]: [string, any]) => {
              const style = sectionStyles[category] || sectionStyles['Default'];
              const isBundle = category === 'Bundles';
              
              return (
                <section 
                  key={category} 
                  className={`relative w-full overflow-hidden ${
                    isBundle 
                      // DEEP PLUM BACKGROUND WITH PEACH GLOW & BORDER
                      ? 'bg-gradient-to-br from-[#1c1218] via-[#0d080a] to-black border border-[#f4cfc3]/30 shadow-[0_0_40px_-10px_rgba(244,207,195,0.25)] rounded-3xl p-6 md:p-10' 
                      : 'py-4'
                  }`}
                >
                  {/* Subtle glowing orb in the background */}
                  {isBundle && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f4cfc3]/10 rounded-full blur-[80px] pointer-events-none"></div>
                  )}

                  <div className={`relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-8 border-b ${isBundle ? 'border-[#f4cfc3]/20' : 'border-black/10'} pb-4`}>
                    <div>
                      <div className={`flex items-center gap-2 mb-2 text-xs uppercase ${style.eyebrowColor}`}>
                        <span className="w-6 h-[1px] bg-current"></span>
                        {style.eyebrow}
                      </div>
                      <h2 className={`text-3xl md:text-4xl font-serif mb-2 ${style.titleColor}`}>
                        {category === 'Home' ? 'Home & Living' : category === 'Planning' ? 'Planning & Organization' : category}
                      </h2>
                      <p className={`text-sm md:text-base ${style.descColor} max-w-lg`}>
                        {style.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <ProductCarousel items={items} theme="dark" />
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
