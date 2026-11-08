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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#f4f1ea] text-brand-charcoal rounded-3xl p-8 lg:p-12 mb-4 flex flex-col justify-center min-h-[250px]">
        <div className="flex items-center gap-3 mb-4 text-brand-charcoal/60">
          <PenTool className="w-6 h-6" />
          <span className="font-semibold tracking-wider text-sm uppercase">The Prisma Collection</span>
        </div>
        <h1 className="text-4xl lg:text-5xl mb-4 font-serif max-w-2xl">Thoughtful products for everyday living.</h1>
        <p className="text-brand-charcoal/70 max-w-lg">
          Discover practical tools, creative collections and beautifully designed digital products for the things that matter.
        </p>
      </div>

      {/* Render the Client Component */}
      <PrismaStorefront allProducts={prismaProducts} />
    </div>
  );
}
