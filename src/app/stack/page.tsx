import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Code2 } from "lucide-react";

export default function StackPage() {
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

      <div className="flex flex-col md:flex-row gap-12">
        <FilterSidebar type="stack" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           <ProductCard product={{ id: 1, title: "SaaS Dashboard Starter Kit", description: "Complete Next.js dashboard...", price: 79, tags: ['Stack'] }} />
           <ProductCard product={{ id: 2, title: "Developer UI Kit", description: "Reusable components for faster development.", price: 29, tags: ['Stack'] }} />
        </div>
      </div>
    </div>
  );
}
