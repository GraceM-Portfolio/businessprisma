"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ items, theme = 'light' }: { items: any[], theme?: 'light' | 'dark' }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const firstCard = current.firstElementChild as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.clientWidth;
      const gap = 16; 
      const scrollAmount = (cardWidth + gap) * 3; 

      const isAtStart = current.scrollLeft <= 10;
      const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10;

      if (direction === 'right') {
        if (isAtEnd) current.scrollTo({ left: 0, behavior: 'smooth' });
        else current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else if (direction === 'left') {
        if (isAtStart) current.scrollTo({ left: current.scrollWidth, behavior: 'smooth' });
        else current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="flex items-center gap-4 w-full max-w-full">
      {items.length > 3 && (
        <button 
          onClick={() => scroll('left')}
          className={`hidden md:flex shrink-0 w-12 h-12 backdrop-blur-xl border shadow-sm rounded-full items-center justify-center hover:scale-105 transition-all duration-300 ${
            theme === 'dark' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-gray-200/60 border-white/60 text-gray-800 hover:bg-gray-300/80'
          }`}
        >
          <ChevronLeft className="w-6 h-6 ml-0.5" strokeWidth={2} />
        </button>
      )}

      <div 
        ref={scrollRef}
        className="flex-1 flex overflow-x-auto gap-4 no-scrollbar pb-2 pt-4 scroll-smooth w-full"
      >
        {items.map((product: any) => (
          // INCREASED WIDTH: w-[420px] on large screens
          <div key={product.id} className="shrink-0 w-[90vw] sm:w-[360px] lg:w-[420px]">
            <ProductCard product={product} theme={theme} />
          </div>
        ))}
      </div>

      {items.length > 3 && (
        <button 
          onClick={() => scroll('right')}
          className={`hidden md:flex shrink-0 w-12 h-12 backdrop-blur-xl border shadow-sm rounded-full items-center justify-center hover:scale-105 transition-all duration-300 ${
            theme === 'dark' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-gray-200/60 border-white/60 text-gray-800 hover:bg-gray-300/80'
          }`}
        >
          <ChevronRight className="w-6 h-6 mr-0.5" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
