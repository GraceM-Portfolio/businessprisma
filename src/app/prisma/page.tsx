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
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1a1015] via-[#0a0a0a] to-[#050505] border border-white/5 rounded-3xl p-8 lg:p-16 mb-4 relative overflow-hidden shadow-2xl">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4a2040] rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-white/50">
              <PenTool className="w-5 h-5" />
              <span className="font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">The Prisma Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 font-serif max-w-3xl leading-[1.1] text-white">
              Thoughtful products for <span className="italic text-white/70">everyday living.</span>
            </h1>
            <p className="text-white/50 font-medium max-w-lg text-sm md:text-base leading-relaxed">
              Discover practical tools, creative collections and beautifully designed digital products for the things that matter.
            </p>
          </div>
        </div>

        <PrismaStorefront allProducts={prismaProducts} />
      </div>
    </div>
  );
}
