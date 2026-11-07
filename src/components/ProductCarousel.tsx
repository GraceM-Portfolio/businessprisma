"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ items }: { items: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      
      // Get the width of the first card dynamically
      const firstCard = current.firstElementChild as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.clientWidth;
      const gap = 24; // Matches the 'gap-6' class (1.5rem = 24px)
      
      // Calculate exactly 3 cards to scroll
      const scrollAmount = (cardWidth + gap) * 3;
      
      current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="relative group/carousel w-full max-w-full">
      
      {/* Left Arrow */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white border border-brand-charcoal/10 shadow-md rounded-full flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable Track */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-4 pt-2 scroll-smooth w-full px-1"
      >
        {items.map((product: any) => (
          <div key={product.id} className="snap-start shrink-0 w-[85vw] sm:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white border border-brand-charcoal/10 shadow-md rounded-full flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white transition-all hidden md:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  );
}
