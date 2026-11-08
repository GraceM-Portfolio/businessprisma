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
    <div className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* IMAGE SECTION */}
      <div className="relative w-full aspect-[4/3] bg-[#f4f1ea] overflow-hidden">
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
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </Link>
        
        {/* Heart Icon */}
        <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white hover:scale-110 transition-all shadow-sm opacity-0 group-hover:opacity-100">
          <Heart className="w-3.5 h-3.5" />
        </button>

        {isBundle && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#f4cfc3] text-[#112e25] text-[9px] font-bold tracking-widest uppercase rounded">
            Bundle
          </div>
        )}
      </div>
      
      {/* CONTENT SECTION (White Card Retail Style) */}
      <div className="p-4 flex flex-col flex-grow">
        
        <Link href={`/product/${product.slug || product.id}`} className="mb-1">
          <h3 className="font-sans font-normal text-[14px] leading-tight text-gray-900 group-hover:text-[#a86ca7] transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <div className="text-[11px] mb-3 text-gray-500">
          {primaryFormat}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="font-sans font-bold text-[16px] text-black">
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-[#f8f6f0] hover:bg-[#a86ca7] hover:text-white text-black px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add
          </button>
        </div>

      </div>
    </div>
  );
}
