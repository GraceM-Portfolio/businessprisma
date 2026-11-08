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
    bg: 'bg-[#fdf4ed]',
    textColor: 'text-gray-900',
    mutedText: 'text-gray-600',
    icon: <Heart className="w-4 h-4" />,
    eyebrow: 'Celebrations',
    description: 'Make every occasion memorable.',
  },
  'Planning': {
    bg: 'bg-[#e8f0ea]',
    textColor: 'text-gray-900',
    mutedText: 'text-gray-600',
    icon: <Compass className="w-4 h-4" />,
    eyebrow: 'Planning & Organization',
    description: 'Bring more clarity to everyday life.',
  },
  'Creative': {
    bg: 'bg-[#eff1f5]',
    textColor: 'text-gray-900',
    mutedText: 'text-gray-600',
    icon: <PenTool className="w-4 h-4" />,
    eyebrow: 'Creative & Journaling',
    description: 'Make space for creativity.',
  },
  'Home': {
    bg: 'bg-[#f7f1e8]',
    textColor: 'text-gray-900',
    mutedText: 'text-gray-600',
    icon: <Home className="w-4 h-4" />,
    eyebrow: 'Home & Living',
    description: 'Make your space work beautifully.',
  },
  'Bundles': {
    bg: 'bg-[#112e25]',
    textColor: 'text-white',
    mutedText: 'text-white/70',
    icon: <Package className="w-4 h-4" />,
    eyebrow: 'Bundles',
    description: 'Complete collections. Better value.',
  },
  'Default': {
    bg: 'bg-gray-50',
    textColor: 'text-gray-900',
    mutedText: 'text-gray-600',
    icon: <LayoutGrid className="w-4 h-4" />,
    eyebrow: 'Shop',
    description: 'Discover our digital products.',
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
                className={`${style.bg} rounded-2xl p-6 md:p-8 border ${isBundles ? 'border-white/10' : 'border-black/5'}`}
              >
                {/* Retail Section Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-6 border-b ${isBundles ? 'border-white/10' : 'border-black/10'} pb-4">
                  <div>
                    <h2 className={`text-2xl md:text-3xl font-serif mb-1 ${style.textColor}`}>
                      {style.eyebrow}
                    </h2>
                    <p className={`text-sm ${style.mutedText}`}>
                      {style.description}
                    </p>
                  </div>
                </div>
                
                {/* Product Carousel */}
                <ProductCarousel items={items} />
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
