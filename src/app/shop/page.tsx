import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";

// Mock data to get you started. Replace with Supabase fetch.
const mockProducts = [
  { id: 1, title: "SaaS Dashboard Starter Kit", description: "Complete Next.js dashboard...", price: 79, category: { type: 'stack' }, tags: ['Stack'] },
  { id: 2, title: "3D Living Room Revamp", description: "Personalised 3D redesign...", price: 149, category: { type: 'prisma' }, tags: ['Prisma'] },
  { id: 3, title: "Room Makeover Planner", description: "Plan your dream space...", price: 19, category: { type: 'prisma' }, tags: ['Prisma'] },
  { id: 4, title: "Developer UI Kit", description: "Reusable components...", price: 29, category: { type: 'stack' }, tags: ['Stack'] },
];

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-4">Build your next project.</h1>
        <p className="text-brand-charcoal/60">Premium digital tools for developers and designers.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Products</h2>
            <select className="bg-transparent text-sm font-medium border-none outline-none cursor-pointer">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
