"use client";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import { usePathname } from "next/navigation";

export default function Header() {
  const { toggleCart } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Stack", href: "/stack" },
    { name: "Prisma", href: "/prisma" },
    { name: "Journal", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO: Now with the QUNDI dark purple text */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#a86ca7] rounded flex items-center justify-center group-hover:bg-[#c98fc8] transition-colors">
            <div className="w-4 h-4 border-2 border-black rotate-45"></div>
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-[#d8b4e2]">
            stackprisma
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`relative transition-colors ${
                  isActive 
                    ? "text-white font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#a86ca7]" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"><Search className="w-5 h-5" /></Link>
          <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"><ShoppingCart className="w-5 h-5" /></button>
          <Link href="/login" className="hidden md:flex bg-[#a86ca7] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#c98fc8] transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
