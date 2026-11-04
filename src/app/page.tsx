 // src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Search, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Award, 
  Headphones,
  Code2,
  PenTool,
  MonitorPlay,
  LayoutTemplate,
  FileText,
  Paintbrush
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Placeholder */}
            <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-brand-cream rotate-45"></div>
            </div>
            <span className="font-sans font-bold text-xl tracking-tight">stackprisma</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link href="/" className="text-brand-charcoal relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-green">Home</Link>
            <Link href="/stack" className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">Stack</Link>
            <Link href="/prisma" className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">Prisma</Link>
            <Link href="/about" className="text-brand-charcoal/70 hover:text-brand-charcoal transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-brand-light rounded-full transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-brand-light rounded-full transition-colors"><ShoppingCart className="w-5 h-5" /></button>
            <Link href="/login" className="hidden md:flex bg-brand-green text-brand-cream px-6 py-2.5 rounded-full font-medium text-sm hover:bg-opacity-90 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-brand-charcoal/60 uppercase mb-6">
              <span>Stackprisma</span>
              <span className="w-8 h-[1px] bg-brand-charcoal/30"></span>
            </div>
            <h1 className="text-5xl lg:text-7xl leading-[1.1] mb-6 text-brand-charcoal">
              Build better.<br />
              Reimagine your space.
            </h1>
            <p className="text-lg text-brand-charcoal/70 mb-8 max-w-md">
              Thoughtful digital tools for people who build software, and creative solutions for people reimagining their homes.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-8 py-3.5 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Explore Our Collections <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-brand-light flex items-center justify-center shadow-lg">
            {/* Replace with actual Next/Image of laptop/phone mockup */}
            <div className="text-brand-charcoal/30 flex flex-col items-center">
              <MonitorPlay className="w-16 h-16 mb-4" />
              <p>Dashboard Mockup Image</p>
            </div>
          </div>
        </section>

        {/* TWO CATEGORY BLOCKS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Stack Block */}
            <div className="bg-brand-green text-brand-cream p-8 lg:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-6 h-6" />
                  <span className="font-semibold tracking-wider text-sm uppercase">Stack</span>
                </div>
                <h2 className="text-4xl mb-4">Build with Stack.</h2>
                <p className="text-brand-cream/80 mb-8 max-w-sm">
                  Premium developer tools, UI kits and starter templates to help you build modern web applications with ease.
                </p>
                <Link href="/stack" className="inline-flex items-center gap-2 bg-brand-cream text-brand-green px-6 py-3 rounded-full font-medium hover:bg-brand-peach transition-colors">
                  Shop Stack <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Features Icons */}
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
                <h2 className="text-4xl mb-4 text-brand-charcoal">Reimagine with Prisma.</h2>
                <p className="text-brand-charcoal/70 mb-8 max-w-sm">
                  Interior design services and creative digital products to help you design beautiful spaces and live inspired.
                </p>
                <Link href="/prisma" className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                  Shop Prisma <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Features Icons */}
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-brand-charcoal/10">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2 block">Why Stackprisma</span>
            <h2 className="text-4xl">Quality. Creativity. Trust.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold">Secure Checkout</h3>
              <p className="text-sm text-brand-charcoal/60">M-Pesa, Visa, Mastercard and more.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold">Instant Access</h3>
              <p className="text-sm text-brand-charcoal/60">Get your digital products immediately after purchase.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold">Trusted Quality</h3>
              <p className="text-sm text-brand-charcoal/60">Carefully curated and professionally designed.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mb-2">
                <Headphones className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-semibold">Dedicated Support</h3>
              <p className="text-sm text-brand-charcoal/60">We're here when you need us.</p>
            </div>
          </div>
        </section>

        {/* POPULAR PICKS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2 block">Featured Products</span>
              <h2 className="text-4xl">Popular Picks</h2>
            </div>
            <Link href="/shop" className="text-sm font-medium hover:text-brand-green flex items-center gap-1 transition-colors">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Cards (Mocked for now, connect to Supabase later) */}
            {[
              { title: "SaaS Dashboard Starter Kit", price: "$79", tag: "Stack", img: "/mockup1.jpg" },
              { title: "3D Living Room Revamp", price: "$149", tag: "Prisma", img: "/mockup2.jpg" },
              { title: "Room Makeover Planner", price: "$19", tag: "Prisma", img: "/mockup3.jpg" },
              { title: "Developer UI Kit", price: "$29", tag: "Stack", img: "/mockup4.jpg" },
            ].map((product, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-brand-light rounded-2xl mb-4 overflow-hidden relative border border-brand-charcoal/5">
                  {/* Product Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20 bg-[#e5e2d9]">
                     <span className="text-sm">Image</span>
                  </div>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${product.tag === 'Stack' ? 'bg-brand-green text-brand-cream' : 'bg-brand-peach text-brand-charcoal'}`}>
                    {product.tag}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-green transition-colors">{product.title}</h3>
                    <p className="text-sm text-brand-charcoal/60">Digital Download</p>
                  </div>
                  <span className="font-semibold">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
          <div className="bg-[#f4f1ea] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="max-w-lg">
                <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2 block">Our Vision</span>
                <h2 className="text-3xl mb-4">Two paths. One creative studio.</h2>
                <p className="text-brand-charcoal/70 mb-6">
                  StackPrisma brings together technology and design to help you build, create and live better. Whether you're a developer, a designer, or someone with big ideas — you're in the right place.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
             <div className="text-brand-green font-serif italic text-3xl lg:text-4xl max-w-[250px] leading-tight rotate-[-5deg]">
                Better tools.<br/>Brighter spaces.
             </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-green text-brand-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-brand-cream rounded flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-brand-green rotate-45"></div>
              </div>
              <span className="font-sans font-bold text-xl tracking-tight">stackprisma</span>
            </div>
            <p className="text-brand-cream/60 text-sm mb-6">Build. Design. Create.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-brand-cream/60">
              <li><Link href="/stack" className="hover:text-brand-cream transition-colors">Stack</Link></li>
              <li><Link href="/prisma" className="hover:text-brand-cream transition-colors">Prisma</Link></li>
              <li><Link href="/bundles" className="hover:text-brand-cream transition-colors">Bundles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-brand-cream/60">
              <li><Link href="/help" className="hover:text-brand-cream transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-brand-cream transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-brand-cream transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Join our newsletter</h4>
            <p className="text-xs text-brand-cream/60 mb-3">Get updates on new products, special offers and creative inspiration.</p>
            <div className="flex bg-brand-cream/10 rounded-full p-1 border border-brand-cream/20">
              <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-sm px-4 py-2 w-full text-brand-cream placeholder:text-brand-cream/40" />
              <button className="bg-brand-cream text-brand-green p-2 rounded-full"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-cream/10 text-xs text-brand-cream/40">
          © {new Date().getFullYear()} StackPrisma. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
