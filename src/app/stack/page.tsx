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
    <div className="bg-brand-cream min-h-screen text-brand-charcoal pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* BLACK HERO SECTION */}
        <div className="bg-[#0a0a0a] text-white rounded-3xl p-8 lg:p-16 mb-8 border border-white/10 shadow-lg relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 text-white/50">
              <Code2 className="w-5 h-5" />
              <span className="font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">The Stack Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-serif max-w-3xl leading-[1.1] text-white">
              Build faster. <br className="hidden md:block"/><span className="italic text-white/70">Ship smarter.</span>
            </h1>
            <p className="text-white/60 font-medium max-w-lg text-sm md:text-base leading-relaxed">
              Premium developer tools, UI kits and starter templates to help you build modern web applications with ease.
            </p>
          </div>
        </div>

        <StackStorefront allProducts={stackProducts} />
      </div>
    </div>
  );
}
