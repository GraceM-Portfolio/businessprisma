"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ items }: { items: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by the width of one card + gap (approx 350px)
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Left Arrow (Only shows if there are more than 3 items) */}
      {items.length > 3 && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-brand-charcoal/10 shadow-lg rounded-full flex items-center justify-center text-brand-charcoal hover:bg-brand-green hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Scrollable Track */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-4 scroll-smooth"
      >
        {items.map((product: any) => (
          <div key={product.id} className="snap-start shrink-0 w-[85vw] sm:w-[300px] lg:w-[calc(33.333%-1rem)]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {items.length > 3 && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-brand-charcoal/10 shadow-lg rounded-full flex items-center justify-center text-brand-charcoal hover:bg-brand-green hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
