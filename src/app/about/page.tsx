// src/app/about/page.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-4 block">Our Vision</span>
        <h1 className="text-5xl lg:text-6xl mb-6">Two paths. One creative studio.</h1>
        <p className="text-xl text-brand-charcoal/60 max-w-2xl mx-auto">
          StackPrisma brings together technology and design to help you build, create, and live better. Whether you're a developer, a designer, or someone with big ideas — you're in the right place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="bg-brand-green text-brand-cream p-8 rounded-3xl aspect-square flex flex-col justify-center">
          <h2 className="text-3xl mb-4">Better Tools.</h2>
          <p className="text-brand-cream/80">We build premium developer tools, UI kits, and starter templates so you can ship modern web applications faster.</p>
        </div>
        <div className="bg-[#f4f1ea] text-brand-charcoal p-8 rounded-3xl aspect-square flex flex-col justify-center">
          <h2 className="text-3xl mb-4">Brighter Spaces.</h2>
          <p className="text-brand-charcoal/70">We create interior design services and digital products to help you reimagine your home and live inspired.</p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-8 py-3.5 rounded-full font-medium hover:bg-opacity-90 transition-all">
          Explore Our Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
