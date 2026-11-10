import { createClient } from "@/lib/supabase/server";
import { Code2 } from "lucide-react";
import StackStorefront from "./StackStorefront";

export const dynamic = 'force-dynamic';

export default async function StackPage() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  const stackProducts = allProducts?.filter(p => 
    p.tags?.includes('Starter Kit') || 
    p.tags?.includes('UI Kit') || 
    p.tags?.includes('Components') ||
    p.tags?.includes('Bundles')
  ) || [];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* 
          STICKY HERO SECTION
          - sticky top-24: Locks it just below the header
          - z-0: Keeps it behind the products
        */}
        <div className="sticky top-24 z-0 bg-black text-white rounded-3xl p-8 lg:p-16 mb-8 border border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle tech grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 text-white/50">
              <Code2 className="w-5 h-5" />
              <span className="font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase font-mono">The Stack Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-serif max-w-3xl leading-[1.1] text-white">
              Build faster. <br className="hidden md:block"/><span className="italic text-white/70">Ship smarter.</span>
            </h1>
            <p className="text-white/60 font-medium max-w-lg text-sm md:text-base leading-relaxed">
              Premium developer tools, UI kits and starter templates to help you build modern web applications with ease.
            </p>
          </div>
        </div>

        {/* 
          SCROLLING PRODUCTS SECTION
          - relative z-10: Brings it above the sticky hero
          - bg-[#0a0a0a]: Solid background to hide the hero underneath
          - shadow-[0_-20px_50px_rgba(0,0,0,0.5)]: Adds a beautiful shadow as it slides over the hero
        */}
        <div className="relative z-10 bg-[#0a0a0a] pt-10 pb-20 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <StackStorefront allProducts={stackProducts} />
        </div>

      </div>
    </div>
  );
}
