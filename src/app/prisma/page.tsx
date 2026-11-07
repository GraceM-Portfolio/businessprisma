import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { Heart, Compass, PenTool, Home, Package, LayoutGrid } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

const sectionStyles: Record<string, { bg: string, pillBg: string, pillText: string, icon: React.ReactNode }> = {
  'Celebrations': { bg: 'bg-[#fdf4ed]', pillBg: 'bg-[#d4a373]', pillText: 'text-white', icon: <Heart className="w-4 h-4" /> }, 
  'Planning': { bg: 'bg-[#e8f0ea]', pillBg: 'bg-[#112e25]', pillText: 'text-[#e8f0ea]', icon: <Compass className="w-4 h-4" /> }, 
  'Creative': { bg: 'bg-[#eff1f5]', pillBg: 'bg-[#4a5568]', pillText: 'text-white', icon: <PenTool className="w-4 h-4" /> }, 
  'Home': { bg: 'bg-[#f5efe6]', pillBg: 'bg-[#8c6a4d]', pillText: 'text-white', icon: <Home className="w-4 h-4" /> }, 
  'Bundles': { bg: 'bg-brand-green', pillBg: 'bg-brand-cream', pillText: 'text-brand-green', icon: <Package className="w-4 h-4" /> },
  'Default': { bg: 'bg-brand-light', pillBg: 'bg-brand-charcoal', pillText: 'text-brand-cream', icon: <LayoutGrid className="w-4 h-4" /> }
};

export default async function PrismaPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  const products = allProducts?.filter(p => 
    p.tags?.includes('Celebrations') || 
    p.tags?.includes('Planning') || 
    p.tags?.includes('Creative') || 
    p.tags?.includes('Home') ||
    p.tags?.includes('Bundles')
  ) || [];

  const groupedProducts = products.reduce((acc: any, product) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#f4f1ea] text-brand-charcoal rounded-3xl p-8 lg:p-12 mb-12 flex flex-col justify-center min-h-[250px]">
        <div className="flex items-center gap-3 mb-4 text-brand-charcoal/60">
          <PenTool className="w-6 h-6" />
          <span className="font-semibold tracking-wider text-sm uppercase">The Prisma Collection</span>
        </div>
        <h1 className="text-4xl lg:text-5xl mb-4 font-serif max-w-2xl">Thoughtful products for everyday living.</h1>
        <p className="text-brand-charcoal/70 max-w-lg">
          Discover practical tools, creative collections and beautifully designed digital products for the things that matter.
        </p>
      </div>

      {/* 
        items-start is CRITICAL here. 
        It stops the sidebar from stretching to the full height of the product column.
      */}
      <div className="flex flex-col md:flex-row gap-12 items-start relative">
        <FilterSidebar type="prisma" />
        
        <div className="flex-1 space-y-12 w-full min-w-0">
          {sortedCategories.map(([category, items]: [string, any]) => {
            const style = sectionStyles[category] || sectionStyles['Default'];
            
            return (
              <section key={category} className={`${style.bg} p-6 lg:p-8 rounded-3xl relative`}>
                <div className="mb-6 pb-2 flex justify-between items-end">
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
          })}
        </div>
      </div>
    </div>
  );
}
