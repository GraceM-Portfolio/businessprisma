import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/ProductCard";

export const dynamic = 'force-dynamic';

export default async function PrismaStorefront() {
  const supabase = await createClient();
  
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true);

  const bestsellers = allProducts?.filter(p => ['complete-wedding-planner', 'budget-savings-dashboard', 'digital-memory-journal', 'small-apartment-makeover'].includes(p.slug)) || [];
  const bundles = allProducts?.filter(p => p.tags?.includes('Bundles')) || [];
  const newArrivals = allProducts?.filter(p => !p.tags?.includes('Bundles') && !['complete-wedding-planner', 'budget-savings-dashboard', 'digital-memory-journal', 'small-apartment-makeover'].includes(p.slug)).slice(0, 4) || [];

  return (
    <div className="bg-brand-cream text-brand-charcoal min-h-screen font-sans">
      
      {/* SECTION 1 — HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-[0.2em] text-brand-charcoal/50 uppercase mb-6 block">The Prisma Collection</span>
          <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] mb-6 text-brand-charcoal">
            Thoughtful products for everyday living.
          </h1>
          <p className="text-lg text-brand-charcoal/70 mb-10 leading-relaxed">
            Discover practical tools, creative collections and beautifully designed digital products for the things that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#bestsellers" className="inline-flex items-center justify-center bg-brand-green text-brand-cream px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Shop All Products
            </Link>
            <Link href="#categories" className="inline-flex items-center justify-center bg-transparent border border-brand-charcoal/20 text-brand-charcoal px-8 py-4 rounded-full font-medium hover:bg-brand-light transition-colors">
              Explore Collections
            </Link>
          </div>
        </div>
        
        {/* Editorial Image Grid */}
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          <div className="relative rounded-2xl overflow-hidden row-span-2 h-full border border-brand-charcoal/5 shadow-sm">
             <Image src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800" alt="Wedding Planner" fill className="object-cover" />
          </div>
          <div className="relative rounded-2xl overflow-hidden h-full border border-brand-charcoal/5 shadow-sm">
             <Image src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800" alt="Journal" fill className="object-cover" />
          </div>
          <div className="relative rounded-2xl overflow-hidden h-full border border-brand-charcoal/5 shadow-sm">
             <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800" alt="Budget" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — SHOP BY CATEGORY */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#f4f1ea] rounded-3xl mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand-charcoal">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link href="/prisma/celebrations" className="group block relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm hover:shadow-md transition-shadow">
            <Image src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800" alt="Celebrations" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-brand-cream">
              <h3 className="text-2xl font-serif mb-2">Celebrations</h3>
              <p className="text-sm text-brand-cream/80 mb-4">Make every occasion memorable.</p>
              <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Shop Collection <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>

          <Link href="/prisma/planning" className="group block relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm hover:shadow-md transition-shadow">
            <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800" alt="Planning" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-brand-cream">
              <h3 className="text-2xl font-serif mb-2">Planning & Org</h3>
              <p className="text-sm text-brand-cream/80 mb-4">Bring more clarity to everyday life.</p>
              <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Shop Collection <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>

          <Link href="/prisma/creative" className="group block relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm hover:shadow-md transition-shadow">
            <Image src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800" alt="Creative" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-brand-cream">
              <h3 className="text-2xl font-serif mb-2">Creative & Journaling</h3>
              <p className="text-sm text-brand-cream/80 mb-4">Make space for creativity.</p>
              <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Shop Collection <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>

          <Link href="/prisma/home" className="group block relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm hover:shadow-md transition-shadow">
            <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800" alt="Home" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-green/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-brand-cream">
              <h3 className="text-2xl font-serif mb-2">Home & Living</h3>
              <p className="text-sm text-brand-cream/80 mb-4">Make your space work beautifully.</p>
              <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Shop Collection <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>

        </div>
      </section>

      {/* SECTION 3 — BESTSELLERS */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif text-brand-charcoal">Bestsellers</h2>
            <p className="text-brand-charcoal/60 mt-2">Our most loved digital products.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map(product => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 4 — CURATED BUNDLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-brand-light rounded-3xl mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-brand-charcoal">Complete collections. Better value.</h2>
          <p className="text-brand-charcoal/60 mt-4 max-w-2xl mx-auto">Save more when you buy our curated bundles designed to work perfectly together.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundles.map(bundle => (
             <div key={bundle.id} className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm border border-brand-charcoal/5">
               <div className="w-full md:w-1/3 aspect-square relative rounded-xl overflow-hidden shrink-0">
                 <Image src={bundle.image_url} alt={bundle.title} fill className="object-cover" />
               </div>
               <div className="flex-1">
                 <h3 className="text-2xl font-serif mb-2 text-brand-charcoal">{bundle.title}</h3>
                 <p className="text-sm text-brand-charcoal/70 mb-4">{bundle.description}</p>
                 <ul className="space-y-2 mb-6">
                   {bundle.includes?.map((item: string, i: number) => (
                     <li key={i} className="flex items-start gap-2 text-sm text-brand-charcoal/80">
                       <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 shrink-0" /> {item}
                     </li>
                   ))}
                 </ul>
                 <div className="flex items-center justify-between mt-auto">
                   <span className="text-xl font-bold text-brand-charcoal">${bundle.price}</span>
                   <Link href={`/product/${bundle.slug}`} className="bg-brand-green text-brand-cream px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                     View Bundle
                   </Link>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif text-brand-charcoal">New Arrivals</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-brand-charcoal/60 hover:text-brand-green transition-colors flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 6 — PRISMA STUDIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-12">
        <div className="bg-brand-green text-brand-cream rounded-3xl p-10 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
           <div className="max-w-xl relative z-10">
              <span className="text-xs font-bold tracking-[0.2em] text-brand-peach uppercase mb-4 block">Prisma Studio</span>
              <h2 className="text-4xl lg:text-5xl font-serif mb-6">Resources for people who create.</h2>
              <p className="text-brand-cream/70 text-lg mb-8 leading-relaxed">
                Professional 3D interior assets, material libraries, and design presentation templates for interior designers and creatives.
              </p>
              <Link href="/prisma/studio" className="inline-flex items-center gap-2 bg-brand-cream text-brand-green px-8 py-4 rounded-full font-medium hover:bg-brand-peach transition-colors">
                Explore Prisma Studio <ArrowRight className="w-4 h-4" />
              </Link>
           </div>
           <div className="w-full md:w-1/3 aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800" alt="Studio Assets" fill className="object-cover" />
           </div>
        </div>
      </section>

    </div>
  );
}
