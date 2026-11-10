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
    titleColor: 'text-[#A34F22]',    // Dark Orange/Terracotta
    eyebrowColor: 'text-[#C77547]',
    descColor: 'text-[#A34F22]/80',
    icon: <Heart className="w-4 h-4" />,
    eyebrow: 'For the moments that matter',
    description: 'Beautifully designed wedding planners, invitations, and celebration kits for life\'s biggest days.',
  },
  'Planning': {
    titleColor: 'text-[#112E25]',    // Deep Forest Green
    eyebrowColor: 'text-[#2C4F42]',
    descColor: 'text-[#112E25]/80',
    icon: <Compass className="w-4 h-4" />,
    eyebrow: 'Clarity for everyday life',
    description: 'Budget dashboards, household systems, and planners to bring structure and calm to your daily routine.',
  },
  'Creative': {
    titleColor: 'text-[#4A3B66]',    // Dark Plum/Purple
    eyebrowColor: 'text-[#6A5A8A]',
    descColor: 'text-[#4A3B66]/80',
    icon: <PenTool className="w-4 h-4" />,
    eyebrow: 'Make space for creativity',
    description: 'Journals, digital stickers, and creative kits designed for reflection, memory-keeping, and self-expression.',
  },
  'Home': {
    titleColor: 'text-[#5C4033]',    // Dark Brown/Mocha
    eyebrowColor: 'text-[#7A5C4A]',
    descColor: 'text-[#5C4033]/80',
    icon: <Home className="w-4 h-4" />,
    eyebrow: 'Make your space work beautifully',
    description: 'Room makeover guides, organization systems, and design resources for a home you truly love.',
  },
  'Bundles': {
    titleColor: 'text-white',
    eyebrowColor: 'text-white/60',
    descColor: 'text-white/70',
    icon: <Package className="w-4 h-4" />,
    eyebrow: 'Complete collections. Better value.',
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
      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start mt-6 md:mt-12 w-full max-w-full">
        <FilterSidebar 
          type="prisma" 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />
        
        <div className="flex-1 space-y-16 md:space-y-24 w-full min-w-0">
          {sortedCategories.length === 0 ? (
            <div className="text-center py-20 text-brand-charcoal/50 font-medium">
              No products found for this category.
            </div>
          ) : (
            sortedCategories.map(([category, items]: [string, any]) => {
              const style = sectionStyles[category] || sectionStyles['Default'];
              const isBundles = category === 'Bundles';
              
              return (
                <section 
                  key={category} 
                  className={`relative ${
                    isBundles 
                      // Keep the dark glass container ONLY for Bundles
                      ? 'bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-3xl p-6 md:p-8' 
                      // No background, borders, or shadows for the other sections
                      : 'py-4' 
                  }`}
                >
                  <div className={`flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-8 border-b ${isBundles ? 'border-white/10' : 'border-brand-charcoal/20'} pb-4`}>
                    <div>
                      <div className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-[0.2em] ${style.eyebrowColor}`}>
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
                  
                  <ProductCarousel items={items} />
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
