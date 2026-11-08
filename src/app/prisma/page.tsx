import { createClient } from "@/lib/supabase/server";
import { PenTool } from "lucide-react";
import PrismaStorefront from "./PrismaStorefront";

export const dynamic = 'force-dynamic';

export default async function PrismaPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  const prismaProducts = allProducts?.filter(p => 
    p.tags?.includes('Celebrations') || 
    p.tags?.includes('Planning') || 
    p.tags?.includes('Creative') || 
    p.tags?.includes('Home') ||
    p.tags?.includes('Bundles')
  ) || [];

  return (
    <div className="bg-brand-cream min-h-screen text-brand-charcoal pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        <div className="bg-[#f4f1ea] text-brand-charcoal rounded-3xl p-8 lg:p-16 mb-8 border border-brand-charcoal/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-brand-charcoal/60">
            <PenTool className="w-5 h-5" />
            <span className="font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">The Prisma Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-serif max-w-3xl leading-[1.1] text-brand-charcoal">
            Thoughtful products for <br className="hidden md:block"/><span className="italic text-brand-charcoal/70">everyday living.</span>
          </h1>
          <p className="text-brand-charcoal/60 font-medium max-w-lg text-sm md:text-base leading-relaxed">
            Discover practical tools, creative collections and beautifully designed digital products for the things that matter.
          </p>
        </div>

        <PrismaStorefront allProducts={prismaProducts} />
      </div>
    </div>
  );
}
