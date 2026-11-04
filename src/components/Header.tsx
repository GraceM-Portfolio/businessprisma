"use client";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider"; // We will make this next

export default function Header() {
  const { toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-brand-cream rotate-45"></div>
          </div>
          <span className="font-sans font-bold text-xl tracking-tight">stackprisma</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
          <Link href="/stack" className="hover:text-brand-green transition-colors">Stack</Link>
          <Link href="/prisma" className="hover:text-brand-green transition-colors">Prisma</Link>
          <Link href="/blog" className="hover:text-brand-green transition-colors">Journal</Link>
          <Link href="/about" className="hover:text-brand-green transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:bg-brand-light rounded-full transition-colors"><Search className="w-5 h-5" /></Link>
          <button onClick={toggleCart} className="p-2 hover:bg-brand-light rounded-full transition-colors"><ShoppingCart className="w-5 h-5" /></button>
          <Link href="/login" className="hidden md:flex bg-brand-green text-brand-cream px-6 py-2.5 rounded-full font-medium text-sm hover:bg-opacity-90 transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
