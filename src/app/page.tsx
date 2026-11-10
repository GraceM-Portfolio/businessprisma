import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Award, Headphones, Code2, PenTool, MonitorPlay, LayoutTemplate, FileText, Paintbrush } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-brand-charcoal/60 uppercase mb-6">
            <span>Stackprisma</span>
            <span className="w-8 h-[1px] bg-brand-charcoal/30"></span>
          </div>
          <h1 className="text-5xl lg:text-7xl leading-[1.1] mb-6 text-brand-charcoal font-serif">
            Build better.<br />
            Reimagine your space.
          </h1>
          <p className="text-lg text-brand-charcoal/70 mb-8 max-w-md">
            Thoughtful digital tools for people who build software, and creative solutions for people reimagining their homes.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-black text-brand-cream px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-all">
            Explore Our Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-brand-light flex items-center justify-center shadow-lg w-full">
          <div className="text-brand-charcoal/30 flex flex-col items-center">
            <MonitorPlay className="w-16 h-16 mb-4" />
            <p>Dashboard Mockup Image</p>
          </div>
        </div>
      </section>

      {/* TWO CATEGORY BLOCKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Stack Block - Changed to Black */}
          <div className="bg-black text-brand-cream p-8 lg:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6" />
                <span className="font-semibold tracking-wider text-sm uppercase">Stack</span>
              </div>
              <h2 className="text-4xl mb-4 font-serif">Build with Stack.</h2>
              <p className="text-brand-cream/80 mb-8 max-w-sm">
                Premium developer tools, UI kits and starter templates to help you build modern web applications with ease.
              </p>
              <Link href="/stack" className="inline-flex items-center gap-2 bg-brand-cream text-black px-6 py-3 rounded-full font-medium hover:bg-brand-peach transition-colors">
                Shop Stack <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12 relative z-10 border-t border-brand-cream/20 pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <LayoutTemplate className="w-6 h-6 text-brand-peach" />
                <span className="text-xs font-medium">Starter Kits</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <MonitorPlay className="w-6 h-6 text-brand-peach" />
                <span className="text-xs font-medium">UI Kits</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Code2 className="w-6 h-6 text-brand-peach" />
                <span className="text-xs font-medium">Component Packs</span>
              </div>
            </div>
          </div>

          {/* Prisma Block */}
          <div className="bg-[#f4f1ea] p-8 lg:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-brand-charcoal">
                <PenTool className="w-6 h-6" />
                <span className="font-semibold tracking-wider text-sm uppercase">Prisma</span>
              </div>
              <h2 className="text-4xl mb-4 text-brand-charcoal font-serif">Reimagine with Prisma.</h2>
              <p className="text-brand-charcoal/70 mb-8 max-w-sm">
                Interior design services and creative digital products to help you design beautiful spaces and live inspired.
              </p>
              <Link href="/prisma" className="inline-flex items-center gap-2 bg-black text-brand-cream px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Shop Prisma <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12 relative z-10 border-t border-brand-charcoal/10 pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <MonitorPlay className="w-6 h-6 text-brand-charcoal" />
                <span className="text-xs font-medium">Space Revamps</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <FileText className="w-6 h-6 text-brand-charcoal" />
                <span className="text-xs font-medium">Planners & Journals</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Paintbrush className="w-6 h-6 text-brand-charcoal" />
                <span className="text-xs font-medium">Coloring Books</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-brand-charcoal/10 w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2 block">Why Stackprisma</span>
          <h2 className="text-4xl font-serif">Quality. Creativity. Trust.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-semibold">Secure Checkout</h3>
            <p className="text-sm text-brand-charcoal/60">M-Pesa, Visa, Mastercard and more.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-semibold">Instant Access</h3>
            <p className="text-sm text-brand-charcoal/60">Get your digital products immediately after purchase.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-semibold">Trusted Quality</h3>
            <p className="text-sm text-brand-charcoal/60">Carefully curated and professionally designed.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
              <Headphones className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-semibold">Dedicated Support</h3>
            <p className="text-sm text-brand-charcoal/60">We're here when you need us.</p>
          </div>
        </div>
      </section>

      {/* POPULAR PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2 block">Featured Products</span>
            <h2 className="text-4xl font-serif">Popular Picks</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium hover:text-black flex items-center gap-1 transition-colors">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, title: "SaaS Dashboard Starter Kit", price: 79, tag: "Stack", description: "Complete Next.js dashboard" },
            { id: 2, title: "3D Living Room Revamp", price: 149, tag: "Prisma", description: "Personalised 3D redesign" },
            { id: 3, title: "Room Makeover Planner", price: 19, tag: "Prisma", description: "Plan your dream space" },
            { id: 4, title: "Developer UI Kit", price: 29, tag: "Stack", description: "Reusable components" },
          ].map((product) => (
            <ProductCard key={product.id} product={{...product, tags: [product.tag]}} />
          ))}
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12 w-full">
        <div className="bg-[#f4f1ea] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-lg">
              <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2 block">Our Vision</span>
              <h2 className="text-3xl mb-4 font-serif">Two paths. One creative studio.</h2>
              <p className="text-brand-charcoal/70 mb-6">
                StackPrisma brings together technology and design to help you build, create and live better. Whether you're a developer, a designer, or someone with big ideas — you're in the right place.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 bg-black text-brand-cream px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
           </div>
           <div className="text-black font-serif italic text-3xl lg:text-4xl max-w-[250px] leading-tight rotate-[-5deg]">
              Better tools.<br/>Brighter spaces.
           </div>
        </div>
      </section>
    </div>
  );
}
