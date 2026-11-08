"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  const primaryFormat = product.format?.[0] || "Digital Download";
  const isBundle = product.tags?.includes('Bundles');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col h-full transition-all duration-300">
      
      {/* IMAGE SECTION */}
      <div className="relative w-full aspect-[4/3] bg-[#1a1a1a] rounded-xl overflow-hidden mb-3 border border-white/5">
        <Link href={`/product/${product.slug || product.id}`} className="block w-full h-full">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.title} 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/20">
              No Image
            </div>
          )}
        </Link>
        
        {/* Heart Icon */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-sm opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>

        {/* Minimal Bundle Badge */}
        {isBundle && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-white text-black text-[9px] font-bold tracking-widest uppercase rounded">
            Exclusive Bundle
          </div>
        )}
      </div>
      
      {/* CONTENT SECTION */}
      <div className="flex flex-col flex-grow px-0.5">
        
        <Link href={`/product/${product.slug || product.id}`} className="mb-1">
          <h3 className="font-sans font-normal text-[14px] leading-tight text-white/90 group-hover:text-white transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <div className="text-[11px] mb-1.5 text-white/40">
          {primaryFormat}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-0.5">
          <span className="font-sans font-bold text-[16px] text-white">
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-semibold text-white/70 hover:text-white"
          >
            <ShoppingBag className="w-3 h-3" /> Quick Add
          </button>
        </div>

      </div>
    </div>
  );
}
