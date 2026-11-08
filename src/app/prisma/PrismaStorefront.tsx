"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { Heart, Compass, PenTool, Home, Package, LayoutGrid } from "lucide-react";

const sectionStyles: Record<string, {
  bg: string,
  textColor: string,
  mutedText: string,
  icon: React.ReactNode,
  eyebrow: string,
  description: string
}> = {
  'Celebrations': {
    bg: 'bg-gradient-to-br from-[#fdf4ed] via-[#fbe8dd] to-[#f5d4c1]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <Heart className="w-4 h-4" />,
    eyebrow: 'For the moments that matter',
    description: 'Beautifully designed wedding planners, invitations, and celebration kits for life\'s biggest days.',
  },
  'Planning': {
    bg: 'bg-gradient-to-br from-[#e8f0ea] via-[#dcebe0] to-[#c4dccb]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <Compass className="w-4 h-4" />,
    eyebrow: 'Clarity for everyday life',
    description: 'Budget dashboards, household systems, and planners to bring structure and calm to your daily routine.',
  },
  'Creative': {
    bg: 'bg-gradient-to-br from-[#eff1f5] via-[#e6e2f0] to-[#dcd3eb]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <PenTool className="w-4 h-4" />,
    eyebrow: 'Make space for creativity',
    description: 'Journals, digital stickers, and creative kits designed for reflection, memory-keeping, and self-expression.',
  },
  'Home': {
    bg: 'bg-gradient-to-br from-[#f7f1e8] via-[#f0e6d6] to-[#e2d0b8]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <Home className="w-4 h-4" />,
    eyebrow: 'Make your space work beautifully',
    description: 'Room makeover guides, organization systems, and design resources for a home you truly love.',
  },
  'Bundles': {
    bg: 'bg-gradient-to-br from-[#112e25] via-[#1a3b30] to-[#0d221b]',
    textColor: 'text-white',
    mutedText: 'text-white/70',
    icon: <Package className="w-4 h-4" />,
    eyebrow: 'Complete collections. Better value.',
    description: 'Curated bundles that combine our best products so you get everything you need at a premium discount.',
  },
  'Default': {
    bg: 'bg-brand-light',
    textColor: 'text-black',
    mutedText: 'text-black/70',
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
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start relative mt-6 md:mt-12 w-full max-w-full">
      <FilterSidebar 
        type="prisma" 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      
      <div className="flex-1 space-y-8 md:space-y-12 w-full min-w-0">
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
                className={`${style.bg} rounded-3xl p-6 md:p-8 border ${isBundles ? 'border-white/10' : 'border-black/5'} shadow-sm`}
              >
                <div className={`flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-6 border-b ${isBundles ? 'border-white/10' : 'border-black/10'} pb-4`}>
                  <div>
                    <div className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-[0.2em] ${style.mutedText}`}>
                      <span className="w-6 h-[1px] bg-current"></span>
                      {style.eyebrow}
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-serif mb-1 ${style.textColor}`}>
                      {category === 'Home' ? 'Home & Living' : category === 'Planning' ? 'Planning & Organization' : category}
                    </h2>
                    <p className={`text-sm ${style.mutedText}`}>
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
  );
}
