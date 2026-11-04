import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { PenTool } from "lucide-react";

export default function PrismaPage() {
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
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           <ProductCard product={{ id: 2, title: "3D Living Room Revamp", description: "Personalised 3D redesign of your space.", price: 149, tags: ['Prisma'] }} />
           <ProductCard product={{ id: 3, title: "Room Makeover Planner", description: "Plan your dream space with step-by-step guidance.", price: 19, tags: ['Prisma'] }} />
        </div>
      </div>
    </div>
  );
}
