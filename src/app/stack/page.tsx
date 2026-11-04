import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Code2, LayoutGrid } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

// Unique colors for each Stack section
const sectionStyles: Record<string, { bg: string, pillBg: string, pillText: string }> = {
  'Starter Kit': { bg: 'bg-[#e8f0ea]', pillBg: 'bg-[#112e25]', pillText: 'text-[#e8f0ea]' }, // Sage Green
  'UI Kit': { bg: 'bg-[#fdf4ed]', pillBg: 'bg-[#d4a373]', pillText: 'text-white' }, // Warm Terracotta
  'Components': { bg: 'bg-[#eff1f5]', pillBg: 'bg-[#4a5568]', pillText: 'text-white' }, // Slate Blue
  'Default': { bg: 'bg-brand-light', pillBg: 'bg-brand-charcoal', pillText: 'text-brand-cream' }
};

export default async function StackPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  const products = allProducts?.filter(product => {
    const tags = product.tags || [];
    return tags.includes('Starter Kit') || tags.includes('UI Kit') || tags.includes('Components');
  }) || [];

  const groupedProducts = products.reduce((acc: any, product) => {
    let category = product.tags?.[0] || 'Other Tools';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-brand-green text-brand-cream rounded-3xl p-8 lg:p-12 mb-12 flex flex-col justify-center min-h-[250px]">
        <div className="flex items-center gap-3 mb-4 text-brand-peach">
          <Code2 className="w-6 h-6" />
          <span className="font-semibold tracking-wider text-sm uppercase">Stack Collection</span>
        </div>
        <h1 className="text-4xl lg:text-5xl mb-4 font-serif">Build faster. Ship smarter.</h1>
        <p className="text-brand-cream/80 max-w-lg">
          Premium developer tools, UI kits and starter templates to help you build modern web applications with ease.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <FilterSidebar type="stack" />
        
        <div className="flex-1 space-y-12 w-full overflow-hidden">
          {Object.entries(groupedProducts).map(([category, items]: [string, any]) => {
            const style = sectionStyles[category] || sectionStyles['Default'];
            
            return (
              <section key={category} className={`${style.bg} p-6 lg:p-8 rounded-3xl transition-colors duration-300`}>
                
                {/* Section Header - No "View all" link */}
                <div className="mb-6 pb-2">
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${style.pillBg} ${style.pillText}`}>
                    <LayoutGrid className="w-4 h-4" />
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
