import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// This forces Next.js to fetch fresh data from Supabase on every request
export const dynamic = 'force-dynamic';

export default async function StackPage() {
  const supabase = createClient();
  
  // Fetch only Stack products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .or('tags.cs.{"Starter Kit"},tags.cs.{"UI Kit"},tags.cs.{"Components"}');

  // Group by tag to create the sections (e.g., Starter Kits, UI Kits, etc.)
  const groupedProducts = (products || []).reduce((acc: any, product) => {
    const category = product.tags?.[0] || 'Other Tools';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-brand-green text-brand-cream rounded-3xl p-8 lg:p-12 mb-12 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-brand-peach">
            <Code2 className="w-6 h-6" />
            <span className="font-semibold tracking-wider text-sm uppercase">Stack Collection</span>
          </div>
          <h1 className="text-4xl lg:text-5xl mb-4 font-serif">Build faster. Ship smarter.</h1>
          <p className="text-brand-cream/80 max-w-lg">
            Premium developer tools, UI kits and starter templates to help you build modern web applications with ease.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar type="stack" />
        
        <div className="flex-1 space-y-16">
          {Object.keys(groupedProducts).length === 0 ? (
             <p className="text-brand-charcoal/50">Loading products...</p>
          ) : (
            Object.entries(groupedProducts).map(([category, items]: [string, any]) => (
              <section key={category}>
                {/* Section Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-charcoal/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-brand-light flex items-center justify-center text-brand-green">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <h2 className="text-2xl font-serif">{category}s</h2>
                  </div>
                  <Link href={`/shop?tag=${category}`} className="text-sm text-brand-charcoal/50 hover:text-brand-green flex items-center gap-1 transition-colors">
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {/* Products Grid */}
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
