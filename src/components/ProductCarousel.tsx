"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ items }: { items: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
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
      const firstCard = current.firstElementChild as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.clientWidth;
      const gap = 24; 
      const scrollAmount = (cardWidth + gap) * 3;
      
      current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <div className="relative group/carousel w-full max-w-full">
      
      {/* Left Arrow - Transparent blur so it doesn't block the card */}
      <button 
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={`absolute left-2 top-[40%] -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-md border border-brand-charcoal/10 shadow-lg rounded-full flex items-center justify-center transition-all hidden md:flex ${
          canScrollLeft ? "text-brand-green hover:bg-brand-green hover:text-white cursor-pointer" : "text-brand-charcoal/20 cursor-not-allowed opacity-0"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scroll Track - Added px-2 for breathing room */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto gap-6 no-scrollbar py-4 px-2 scroll-smooth w-full"
      >
        {items.map((product: any) => (
          <div key={product.id} className="shrink-0 w-[85vw] sm:w-[300px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={`absolute right-2 top-[40%] -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-md border border-brand-charcoal/10 shadow-lg rounded-full flex items-center justify-center transition-all hidden md:flex ${
          canScrollRight ? "text-brand-green hover:bg-brand-green hover:text-white cursor-pointer" : "text-brand-charcoal/20 cursor-not-allowed opacity-0"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  );
}
