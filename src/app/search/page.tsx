import { Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl mb-6">Search our collections</h1>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for UI kits, dashboards, planners..." 
            className="w-full pl-12 pr-4 py-4 rounded-full border border-brand-charcoal/20 bg-white focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-lg"
          />
        </div>
      </div>

      <div>
        <p className="mb-6 text-brand-charcoal/60">Showing results for <span className="font-semibold text-brand-charcoal">"dashboard"</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Map actual search results here */}
            <ProductCard product={{ id: 1, title: "SaaS Dashboard Starter Kit", description: "Complete Next.js dashboard...", price: 79, tags: ['Stack'] }} />
        </div>
      </div>
    </div>
  );
}
