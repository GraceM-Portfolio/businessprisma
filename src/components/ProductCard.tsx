"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  // Get just the first format for a cleaner look
  const primaryFormat = product.format?.[0] || "Digital Download";
  const isBundle = product.tags?.includes('Bundles');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-300">
      
      {/* IMAGE SECTION */}
      <div className="relative w-full aspect-[4/3] bg-[#f4f1ea] rounded-xl overflow-hidden mb-3">
        <Link href={`/product/${product.slug || product.id}`} className="block w-full h-full">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.title} 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal">
              No Image
            </div>
          )}
        </Link>
        
        {/* Etsy-style Favorite Heart (Top Right) */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-charcoal hover:bg-white hover:scale-110 transition-all shadow-sm opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>

        {/* Minimal Bundle Badge */}
        {isBundle && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-green text-white text-[9px] font-bold tracking-widest uppercase rounded">
            Bundle
          </div>
        )}
      </div>
      
      {/* CONTENT SECTION - Super Minimal */}
      <div className="flex flex-col flex-grow px-1">
        
        {/* Title (Line clamped to 1 line for Etsy feel) */}
        <Link href={`/product/${product.slug || product.id}`} className="mb-1">
          <h3 className="font-sans font-medium text-[13px] leading-snug text-black group-hover:text-brand-green transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        {/* Format (Tiny and Subtle) */}
        <div className="text-[11px] text-gray-500 mb-2">
          {primaryFormat} • Instant Download
        </div>
        
        {/* Price & Quick Add Row */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-sans font-bold text-[15px] text-black">
            ${product.price}
          </span>
          
          {/* Minimal Quick Add Button (Appears on hover) */}
          <button 
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-semibold text-brand-green hover:underline"
          >
            <ShoppingBag className="w-3 h-3" /> Quick Add
          </button>
        </div>

      </div>
    </div>
  );
}
