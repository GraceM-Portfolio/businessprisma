import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function ShopPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-4 font-serif">Build your next project.</h1>
        <p className="text-brand-charcoal/60">Premium digital tools for developers and designers.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar type="all" />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-charcoal/10">
            <h2 className="text-xl font-semibold">All Products ({products?.length || 0})</h2>
            <select className="bg-transparent text-sm font-medium border-none outline-none cursor-pointer">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
