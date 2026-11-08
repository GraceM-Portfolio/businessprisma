"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { 
  Heart, Compass, PenTool, Home, Package, LayoutGrid, 
  ArrowRight, Star
} from "lucide-react";

// Dark, moody, luxurious gradients inspired by the QUNDI mood board
const sectionStyles: Record<string, {
  bg: string,
  textColor: string,
  mutedText: string,
  icon: React.ReactNode,
  eyebrow: string,
  description: string,
  decorativeIcon: React.ReactNode
}> = {
  'Celebrations': {
    bg: 'bg-gradient-to-br from-[#1a1015] via-[#0a0a0a] to-[#0a0a0a]',
    textColor: 'text-white',
    mutedText: 'text-white/50',
    icon: <Heart className="w-4 h-4 text-[#a36b8a]" />,
    eyebrow: 'For the moments that matter',
    description: 'Beautifully designed wedding planners, invitations, and celebration kits for life\'s biggest days.',
    decorativeIcon: <Heart className="w-64 h-64 text-white/[0.02]" />,
  },
  'Planning': {
    bg: 'bg-gradient-to-bl from-[#14181c] via-[#0a0a0a] to-[#0a0a0a]',
    textColor: 'text-white',
    mutedText: 'text-white/50',
    icon: <Compass className="w-4 h-4 text-[#6b8a9e]" />,
    eyebrow: 'Clarity for everyday life',
    description: 'Budget dashboards, household systems, and planners to bring structure and calm to your daily routine.',
    decorativeIcon: <Compass className="w-64 h-64 text-white/[0.02]" />,
  },
  'Creative': {
    bg: 'bg-gradient-to-tr from-[#1a141c] via-[#0a0a0a] to-[#0a0a0a]',
    textColor: 'text-white',
    mutedText: 'text-white/50',
    icon: <PenTool className="w-4 h-4 text-[#9e6b9b]" />,
    eyebrow: 'Make space for creativity',
    description: 'Journals, digital stickers, and creative kits designed for reflection, memory-keeping, and self-expression.',
    decorativeIcon: <PenTool className="w-64 h-64 text-white/[0.02]" />,
  },
  'Home': {
    bg: 'bg-gradient-to-br from-[#1c1614] via-[#0a0a0a] to-[#0a0a0a]',
    textColor: 'text-white',
    mutedText: 'text-white/50',
    icon: <Home className="w-4 h-4 text-[#9e866b]" />,
    eyebrow: 'Make your space work beautifully',
    description: 'Room makeover guides, organization systems, and design resources for a home you truly love.',
    decorativeIcon: <Home className="w-64 h-64 text-white/[0.02]" />,
  },
  'Bundles': {
    bg: 'bg-gradient-to-br from-[#2a1020] via-[#11050c] to-[#050505]',
    textColor: 'text-white',
    mutedText: 'text-white/60',
    icon: <Package className="w-4 h-4 text-white" />,
    eyebrow: 'Complete collections. Better value.',
    description: 'Curated bundles that combine our best products so you get everything you need at a premium discount.',
    decorativeIcon: <Package className="w-64 h-64 text-white/[0.03]" />,
  },
  'Default': {
    bg: 'bg-[#0a0a0a]',
    textColor: 'text-white',
    mutedText: 'text-white/50',
    icon: <LayoutGrid className="w-4 h-4 text-white" />,
    eyebrow: 'Explore',
    description: 'Discover our latest digital products.',
    decorativeIcon: <LayoutGrid className="w-64 h-64 text-white/[0.02]" />,
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
                className={`${style.bg} rounded-3xl relative overflow-hidden shadow-2xl border border-white/5`}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 pointer-events-none overflow-hidden rounded-3xl">
                  {style.decorativeIcon}
                </div>

                {/* Section Header */}
                <div className="relative z-10 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4 md:mb-2">
                    <div>
                      {/* Eyebrow */}
                      <div className={`flex items-center gap-2 mb-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] ${style.mutedText}`}>
                        <span className="w-4 md:w-6 h-[1px] bg-current"></span>
                        {style.eyebrow}
                      </div>
                      
                      {/* Title */}
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-serif ${style.textColor}`}>
                          {category === 'Home' ? 'Home & Living' : category === 'Planning' ? 'Planning & Organization' : category}
                        </h2>
                        {isBundles && (
                          <span className="px-2 py-1 bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Best Value
                          </span>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className={`text-xs md:text-sm max-w-lg ${style.mutedText}`}>
                        {style.description}
                      </p>
                    </div>
                    
                    {/* Explore Link */}
                    <button className={`hidden md:flex group/link text-sm font-semibold items-center gap-2 shrink-0 ${style.textColor} hover:opacity-70 transition-colors`}>
                      Explore All
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                {/* Product Carousel */}
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
