import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { PenTool } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function PrismaPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  // Filter for Prisma products in JavaScript
  const products = allProducts?.filter(product => {
    const tags = product.tags || [];
    return tags.includes('3D Revamp') || tags.includes('Planner') || tags.includes('Journal') || tags.includes('Coloring Book');
  }) || [];

  const groupedProducts = products.reduce((acc: any, product) => {
    const category = product.tags?.[0] || 'Other Designs';
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

      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar type="prisma" />
        <div className="flex-1 space-y-16">
          {Object.keys(groupedProducts).length === 0 ? (
             <p className="text-brand-charcoal/50">No products found.</p>
          ) : (
            Object.entries(groupedProducts).map(([category, items]: [string, any]) => (
              <section key={category}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-charcoal/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#f4f1ea] flex items-center justify-center text-brand-charcoal">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <h2 className="text-2xl font-serif">{category}s</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
