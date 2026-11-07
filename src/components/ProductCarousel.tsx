"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ items }: { items: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Use a small threshold (1px) to account for rounding errors
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

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

      // Update arrow states after scroll animation
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="relative group/carousel w-full max-w-full">
      
      {/* Left Arrow */}
      <button 
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-[40%] -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white border border-brand-charcoal/10 shadow-md rounded-full flex items-center justify-center transition-all hidden md:flex ${
          canScrollLeft ? "text-brand-green hover:bg-brand-green hover:text-white cursor-pointer" : "text-brand-charcoal/20 cursor-not-allowed opacity-50"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* 
        THE FIX: Removed 'snap-x snap-mandatory'. 
        This allows the scrollBy(3 cards) function to work perfectly without the browser fighting it.
      */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-6 no-scrollbar pb-4 pt-2 scroll-smooth w-full px-1"
      >
        {items.map((product: any) => (
          // Removed 'snap-start'
          <div key={product.id} className="shrink-0 w-[85vw] sm:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white border border-brand-charcoal/10 shadow-md rounded-full flex items-center justify-center transition-all hidden md:flex ${
          canScrollRight ? "text-brand-green hover:bg-brand-green hover:text-white cursor-pointer" : "text-brand-charcoal/20 cursor-not-allowed opacity-50"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  );
}
