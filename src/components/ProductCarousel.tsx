"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ items }: { items: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const firstCard = current.firstElementChild as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.clientWidth;
      const gap = 24; // Matches 'gap-6'
      const scrollAmount = (cardWidth + gap) * 3; // Scroll exactly 3 cards

      const isAtStart = current.scrollLeft <= 10;
      const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;

      if (direction === 'right') {
        if (isAtEnd) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else if (direction === 'left') {
        if (isAtStart) {
          current.scrollTo({ left: current.scrollWidth, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  if (!items || items.length <= 3) {
    return (
      <div className="flex overflow-x-auto gap-6 no-scrollbar pb-4 pt-2 px-2 w-full">
        {items.map((product: any) => (
          <div key={product.id} className="shrink-0 w-[85vw] sm:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative group/carousel w-full max-w-full">
      
      {/* Left Arrow - Modern Floating */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 md:-left-6 top-[35%] -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
        aria-label="Previous items"
      >
        <ChevronLeft className="w-6 h-6 ml-0.5" strokeWidth={1.5} />
      </button>

      {/* Scrollable Track */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 no-scrollbar py-4 px-2 scroll-smooth w-full"
      >
        {items.map((product: any) => (
          <div key={product.id} className="shrink-0 w-[85vw] sm:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow - Modern Floating */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 md:-right-6 top-[35%] -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
        aria-label="Next items"
      >
        <ChevronRight className="w-6 h-6 mr-0.5" strokeWidth={1.5} />
      </button>

    </div>
  );
}
