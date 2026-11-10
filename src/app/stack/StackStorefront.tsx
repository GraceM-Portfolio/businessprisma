"use client";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCarousel from "@/components/ProductCarousel";
import { LayoutTemplate, MonitorPlay, Code2, Terminal, LayoutGrid } from "lucide-react";

const sectionStyles: Record<string, {
  titleColor: string,
  eyebrowColor: string,
  descColor: string,
  icon: React.ReactNode,
  eyebrow: string,
  description: string
}> = {
  'Starter Kit': {
    titleColor: 'text-white',
    eyebrowColor: 'text-[#60A5FA]', // Light Blue
    descColor: 'text-white/60',
    icon: <LayoutTemplate className="w-4 h-4" />,
    eyebrow: 'The perfect starting point',
    description: 'Production-ready boilerplates to launch your next SaaS or web application in days, not months.',
  },
  'UI Kit': {
    titleColor: 'text-white',
    eyebrowColor: 'text-[#2DD4BF]', // Teal
    descColor: 'text-white/60',
    icon: <MonitorPlay className="w-4 h-4" />,
    eyebrow: 'Design faster',
    description: 'Beautifully crafted Figma and Tailwind UI kits for dashboards, landing pages, and mobile apps.',
  },
  'Components': {
    titleColor: 'text-white',
    eyebrowColor: 'text-[#A78BFA]', // Light Purple
    descColor: 'text-white/60',
    icon: <Code2 className="w-4 h-4" />,
    eyebrow: 'Build with confidence',
    description: 'Drop-in React components with accessibility and performance built-in.',
  },
  'Bundles': {
    titleColor: 'text-white',
    eyebrowColor: 'text-cyan-400 font-mono', 
    descColor: 'text-cyan-100/60',
    icon: <Terminal className="w-4 h-4 text-cyan-400" />,
    eyebrow: 'sys.bundle_collection.init()',
    description: 'Get the ultimate developer toolkit with our curated bundles at a discounted price.',
  },
  'Default': {
    titleColor: 'text-white',
    eyebrowColor: 'text-white/60',
    descColor: 'text-white/70',
    icon: <LayoutGrid className="w-4 h-4" />,
    eyebrow: 'Explore',
    description: 'Discover our latest developer tools.',
  }
};

export default function StackStorefront({ allProducts }: { allProducts: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = allProducts.filter(product => {
    if (activeFilter === "All") return true;
    return product.tags?.includes(activeFilter);
  });

  const groupedProducts = filteredProducts.reduce((acc: any, product) => {
    let category = product.tags?.[0] || 'Other Tools';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const sortedCategories = Object.entries(groupedProducts).sort(([a], [b]) => {
    if (a === 'Bundles') return 1;
    if (b === 'Bundles') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="relative w-full max-w-full">
      
      {/* DARK MODE BACKGROUND BLOBS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-teal-900/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] left-1/3 w-[500px] h-[500px] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start mt-6 md:mt-12 w-full max-w-full">
        <FilterSidebar 
          type="stack" 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          theme="dark"
        />
        
        <div className="flex-1 space-y-16 md:space-y-24 w-full min-w-0">
          {sortedCategories.length === 0 ? (
            <div className="text-center py-20 text-white/50 font-medium">
              No products found for this category.
            </div>
          ) : (
            sortedCategories.map(([category, items]: [string, any]) => {
              const style = sectionStyles[category] || sectionStyles['Default'];
              const isBundle = category === 'Bundles';
              
              return (
                <section 
                  key={category} 
                  className={`relative w-full overflow-hidden ${
                    isBundle 
                      ? 'bg-[#050505] border border-cyan-500/30 ring-1 ring-cyan-500/20 shadow-[0_0_50px_-12px_rgba(6,182,212,0.4)] rounded-3xl p-6 md:p-10' 
                      : 'py-4'
                  }`}
                >
                  {isBundle && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                  )}

                  <div className={`relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-8 border-b ${isBundle ? 'border-cyan-500/20' : 'border-white/10'} pb-4`}>
                    <div>
                      <div className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-[0.2em] ${style.eyebrowColor}`}>
                        <span className="w-6 h-[1px] bg-current"></span>
                        {style.eyebrow}
                      </div>
                      <h2 className={`text-3xl md:text-4xl font-serif mb-2 ${style.titleColor}`}>
                        {category === 'Starter Kit' ? 'Starter Kits' : category === 'UI Kit' ? 'UI Kits' : category === 'Components' ? 'Component Packs' : category}
                      </h2>
                      <p className={`text-sm md:text-base ${style.descColor} max-w-lg`}>
                        {style.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <ProductCarousel items={items} theme="dark" />
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
