import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { PenTool, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

// Unique colors for each Prisma section
const sectionStyles: Record<string, { bg: string, pillBg: string, pillText: string }> = {
  '3D Revamp': { bg: 'bg-[#f5efe6]', pillBg: 'bg-[#8c6a4d]', pillText: 'text-white' }, // Warm Mocha
  'Planner': { bg: 'bg-[#e6ede8]', pillBg: 'bg-[#2d4a36]', pillText: 'text-white' }, // Forest Sage
  'Journal': { bg: 'bg-[#f7ecee]', pillBg: 'bg-[#9e5d6b]', pillText: 'text-white' }, // Dusty Rose
  'Coloring Book': { bg: 'bg-[#e9edf2]', pillBg: 'bg-[#4a5568]', pillText: 'text-white' }, // Ice Blue
  'Default': { bg: 'bg-brand-light', pillBg: 'bg-brand-charcoal', pillText: 'text-brand-cream' }
};

export default async function PrismaPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  const products = allProducts?.filter(product => {
    const tags = product.tags || [];
    return tags.includes('3D Revamp') || tags.includes('Planner') || tags.includes('Journal') || tags.includes('Coloring Book');
  }) || [];

  const groupedProducts = products.reduce((acc: any, product) => {
    let category = product.tags?.[0] || 'Other Designs';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#f4f1ea] text-brand-charcoal rounded-3xl p-8 lg:p-12 mb-12 flex flex-col justify-center min-h-[250px]">
        <div className="flex items-center gap-3 mb-4 text-brand-charcoal/60">
          <PenTool className="w-6 h-6" />
          <span className="font-semibold tracking-wider text-sm uppercase">Prisma Collection</span>
        </div>
        <h1 className="text-4xl lg:text-5xl mb-4 font-serif">Reimagine your space.</h1>
        <p className="text-brand-charcoal/70 max-w-lg">
          Interior design services and creative digital products to help you design beautiful spaces and live inspired.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <FilterSidebar type="prisma" />
        
        <div className="flex-1 space-y-12 w-full overflow-hidden">
          {Object.entries(groupedProducts).map(([category, items]: [string, any]) => {
            const style = sectionStyles[category] || sectionStyles['Default'];
            
            return (
              <section key={category} className={`${style.bg} p-6 lg:p-8 rounded-3xl transition-colors duration-300`}>
                
                {/* Section Header - No "View all" link */}
                <div className="mb-6 pb-2">
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${style.pillBg} ${style.pillText}`}>
                    <FileText className="w-4 h-4" />
                    <h2 className="text-sm font-bold tracking-wider uppercase">{category}s</h2>
                  </div>
                </div>
                
                {/* Carousel (9 cards) - Shows 3 at a time on desktop */}
                <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-4">
                  {items.map((product: any) => (
                    <div key={product.id} className="snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[calc(33.333%-1rem)]">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
