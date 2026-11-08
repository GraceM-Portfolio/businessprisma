"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { Heart, Compass, PenTool, Home, Package, LayoutGrid } from "lucide-react";

const sectionStyles: Record<string, { bg: string, pillBg: string, pillText: string, icon: React.ReactNode }> = {
  'Celebrations': { bg: 'bg-[#fdf4ed]', pillBg: 'bg-[#d4a373]', pillText: 'text-white', icon: <Heart className="w-4 h-4" /> }, 
  'Planning': { bg: 'bg-[#e8f0ea]', pillBg: 'bg-[#112e25]', pillText: 'text-[#e8f0ea]', icon: <Compass className="w-4 h-4" /> }, 
  'Creative': { bg: 'bg-[#eff1f5]', pillBg: 'bg-[#4a5568]', pillText: 'text-white', icon: <PenTool className="w-4 h-4" /> }, 
  'Home': { bg: 'bg-[#f5efe6]', pillBg: 'bg-[#8c6a4d]', pillText: 'text-white', icon: <Home className="w-4 h-4" /> }, 
  'Bundles': { bg: 'bg-brand-green', pillBg: 'bg-brand-cream', pillText: 'text-brand-green', icon: <Package className="w-4 h-4" /> },
  'Default': { bg: 'bg-brand-light', pillBg: 'bg-brand-charcoal', pillText: 'text-brand-cream', icon: <LayoutGrid className="w-4 h-4" /> }
};

export default function PrismaStorefront({ allProducts }: { allProducts: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter products based on sidebar selection
  const filteredProducts = allProducts.filter(product => {
    if (activeFilter === "All") return true;
    return product.tags?.includes(activeFilter);
  });

  // Group the filtered products into sections
  const groupedProducts = filteredProducts.reduce((acc: any, product) => {
    let category = product.tags?.[0] || 'Other Designs';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  // Sort so Bundles are at the bottom
  const sortedCategories = Object.entries(groupedProducts).sort(([a], [b]) => {
    if (a === 'Bundles') return 1;
    if (b === 'Bundles') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="flex flex-col md:flex-row gap-12 items-start relative mt-12">
      {/* Pass the state to the sidebar */}
      <FilterSidebar 
        type="prisma" 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      
      <div className="flex-1 space-y-12 w-full min-w-0">
        {sortedCategories.length === 0 ? (
          <div className="text-center py-20 text-brand-charcoal/50">
            No products found for this category.
          </div>
        ) : (
          sortedCategories.map(([category, items]: [string, any]) => {
            const style = sectionStyles[category] || sectionStyles['Default'];
            
            return (
              <section key={category} className={`${style.bg} p-6 lg:p-8 rounded-3xl relative`}>
                <div className="mb-2 flex justify-between items-end">
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${style.pillBg} ${style.pillText}`}>
                    {style.icon}
                    <h2 className="text-sm font-bold tracking-wider uppercase">
                      {category === 'Home' ? 'Home & Living' : category === 'Planning' ? 'Planning & Organization' : category}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-brand-charcoal/40 uppercase tracking-wider hidden sm:block">
                    Swipe to explore
                  </span>
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
