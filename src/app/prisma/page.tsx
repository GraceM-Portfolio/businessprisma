import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { PenTool, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

// Color mappings for Prisma
const sectionStyles: Record<string, { bg: string, text: string, pillBg: string, pillText: string }> = {
  '3D Revamp': { bg: 'bg-[#fdfaf5]', text: 'text-brand-charcoal', pillBg: 'bg-[#f4cfc3]', pillText: 'text-brand-charcoal' },
  'Planner': { bg: 'bg-[#f0f4f1]', text: 'text-brand-green', pillBg: 'bg-[#e6eee6]', pillText: 'text-brand-green' },
  'Journal': { bg: 'bg-[#f0f4f1]', text: 'text-brand-green', pillBg: 'bg-[#e6eee6]', pillText: 'text-brand-green' },
  'Coloring Book': { bg: 'bg-[#f4f4f8]', text: 'text-brand-charcoal', pillBg: 'bg-[#e6e6f0]', pillText: 'text-brand-charcoal' },
  'Default': { bg: 'bg-brand-light', text: 'text-brand-charcoal', pillBg: 'bg-brand-charcoal', pillText: 'text-brand-cream' }
};

export default async function PrismaPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // Filter purely for Prisma items
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
              <section key={category} className={`${style.bg} p-6 lg:p-8 rounded-3xl`}>
                
                {/* Colored Section Header */}
                <div className="flex justify-between items-center mb-6 pb-2">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.pillBg} ${style.pillText}`}>
                    <FileText className="w-4 h-4" />
                    <h2 className="text-sm font-bold tracking-wider uppercase">{category}s</h2>
                  </div>
                  <Link href={`/shop?tag=${category}`} className="text-sm font-medium text-brand-charcoal/60 hover:text-brand-green flex items-center gap-1 transition-colors">
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {/* Horizontal Carousel */}
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
