"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";

// Temporary mock data matching the SQL above
const mockProducts = [
  { id: 1, title: "SaaS Dashboard Starter Kit", description: "Complete Next.js dashboard", price: 79, category: { type: 'stack' }, tags: ['Starter Kit'] },
  { id: 2, title: "3D Living Room Revamp", description: "Personalised 3D redesign", price: 149, category: { type: 'prisma' }, tags: ['3D Revamp'] },
  // ... add a few more here for testing
];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = mockProducts.filter(product => {
    if (activeFilter === 'all') return true;
    return product.category.type === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-4">Build your next project.</h1>
        <p className="text-brand-charcoal/60">Premium digital tools for developers and designers.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{activeFilter === 'all' ? 'All Products' : activeFilter === 'stack' ? 'Stack Products' : 'Prisma Products'}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
