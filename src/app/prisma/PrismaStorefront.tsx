"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { 
  Heart, Compass, PenTool, Home, Package, LayoutGrid, 
  ArrowRight, Star
} from "lucide-react";

// Reverted to the Warm, Earthy Aesthetic
const sectionStyles: Record<string, {
  bg: string,
  textColor: string,
  mutedText: string,
  icon: React.ReactNode,
  eyebrow: string,
  description: string,
  decorativeIcon: React.ReactNode,
  accentText: string
}> = {
  'Celebrations': {
    bg: 'bg-gradient-to-br from-[#fdf4ed] via-[#fbe8dd] to-[#f5d4c1]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <Heart className="w-4 h-4" />,
    eyebrow: 'For the moments that matter',
    description: 'Beautifully designed wedding planners, invitations, and celebration kits for life\'s biggest days.',
    decorativeIcon: <Heart className="w-72 h-72 text-black/[0.03]" />,
    accentText: 'text-[#a05a3c]',
  },
  'Planning': {
    bg: 'bg-gradient-to-br from-[#e8f0ea] via-[#dcebe0] to-[#c4dccb]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <Compass className="w-4 h-4" />,
    eyebrow: 'Clarity for everyday life',
    description: 'Budget dashboards, household systems, and planners to bring structure and calm to your daily routine.',
    decorativeIcon: <Compass className="w-72 h-72 text-black/[0.03]" />,
    accentText: 'text-[#112e25]',
  },
  'Creative': {
    bg: 'bg-gradient-to-br from-[#eff1f5] via-[#e6e2f0] to-[#dcd3eb]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <PenTool className="w-4 h-4" />,
    eyebrow: 'Make space for creativity',
    description: 'Journals, digital stickers, and creative kits designed for reflection, memory-keeping, and self-expression.',
    decorativeIcon: <PenTool className="w-72 h-72 text-black/[0.03]" />,
    accentText: 'text-[#5a4a7a]',
  },
  'Home': {
    bg: 'bg-gradient-to-br from-[#f7f1e8] via-[#f0e6d6] to-[#e2d0b8]',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <Home className="w-4 h-4" />,
    eyebrow: 'Make your space work beautifully',
    description: 'Room makeover guides, organization systems, and design resources for a home you truly love.',
    decorativeIcon: <Home className="w-72 h-72 text-black/[0.03]" />,
    accentText: 'text-[#8c6a4d]',
  },
  'Bundles': {
    bg: 'bg-gradient-to-br from-[#112e25] via-[#1a3b30] to-[#0d221b]',
    textColor: 'text-white',
    mutedText: 'text-white/70',
    icon: <Package className="w-4 h-4" />,
    eyebrow: 'Complete collections. Better value.',
    description: 'Curated bundles that combine our best products so you get everything you need at a premium discount.',
    decorativeIcon: <Package className="w-72 h-72 text-white/[0.04]" />,
    accentText: 'text-[#f4cfc3]',
  },
  'Default': {
    bg: 'bg-brand-light',
    textColor: 'text-black',
    mutedText: 'text-black/70',
    icon: <LayoutGrid className="w-4 h-4" />,
    eyebrow: 'Explore',
    description: 'Discover our latest digital products.',
    decorativeIcon: <LayoutGrid className="w-72 h-72 text-black/[0.03]" />,
    accentText: 'text-black',
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
      
      {/* Sidebar (Mobile pill menu + Desktop sticky) */}
      <FilterSidebar 
        type="prisma" 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      
      <div className="flex-1 space-y-10 md:space-y-16 w-full min-w-0">
        {sortedCategories.length === 0 ? (
          <div className="text-center py-20 text-white/50 font-medium">
            No products found for this category.
          </div>
        ) : (
          sortedCategories.map(([category, items]: [string, any]) => {
            const style = sectionStyles[category] || sectionStyles['Default'];
            const isBundles = category === 'Bundles';
            
            return (
              <section 
                key={category} 
                className={`${style.bg} rounded-3xl relative overflow-hidden shadow-sm border border-black/5`}
              >
                <div className={`absolute -top-8 -right-8 ${isBundles ? 'text-white/[0.04]' : 'text-black/[0.03]'} pointer-events-none`}>
                  {style.decorativeIcon}
                </div>
                <div className={`absolute top-10 left-1/2 w-40 h-40 rounded-full blur-3xl ${isBundles ? 'bg-[#f4cfc3]/10' : 'bg-white/40'} pointer-events-none`}></div>

                <div className="relative z-10 p-6 lg:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2">
                    <div>
                      <div className={`flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-[0.2em] ${isBundles ? 'text-[#f4cfc3]' : style.accentText}`}>
                        <span className="w-6 h-[1px] bg-current"></span>
                        {style.eyebrow}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className={`text-3xl lg:text-4xl font-serif ${style.textColor}`}>
                          {category === 'Home' ? 'Home & Living' : category === 'Planning' ? 'Planning & Organization' : category}
                        </h2>
                        {isBundles && (
                          <span className="px-3 py-1 bg-[#f4cfc3] text-[#112e25] text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Best Value
                          </span>
                        )}
                      </div>
                      
                      <p className={`text-sm max-w-lg ${style.mutedText}`}>
                        {style.description}
                      </p>
                    </div>
                    
                    <button className={`hidden md:flex group/link text-sm font-semibold items-center gap-2 shrink-0 ${style.textColor} hover:opacity-70 transition-colors`}>
                      Explore All
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                <div className="relative z-10 px-2 pb-2 md:px-4 md:pb-4">
                  <ProductCarousel items={items} />
                </div>

              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
