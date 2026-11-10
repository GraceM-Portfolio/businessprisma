"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product, theme = 'light' }: { product: any, theme?: 'light' | 'dark' }) {
  const { addToCart } = useCart();
  
  const primaryFormat = product.format?.[0] || "Digital Download";
  const isBundle = product.tags?.includes('Bundles');
  const isDark = theme === 'dark';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className={`group flex flex-col h-full transition-all duration-300 ${
      isBundle ? 'bg-white/5 border border-white/10 rounded-xl p-4' : ''
    }`}>
      
      <div className={`relative w-full aspect-[4/3] bg-[#1a1a1a] overflow-hidden mb-4 ${
        isBundle ? 'rounded-lg' : 'rounded-none'
      }`}>
        <Link href={`/product/${product.slug || product.id}`} className="block w-full h-full">
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.title} 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/20">
              No Image
            </div>
          )}
        </Link>
        
        <button className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-sm opacity-0 group-hover:opacity-100 ${isDark || isBundle ? 'bg-black/50 text-white hover:bg-black/80' : 'bg-white/90 text-black hover:bg-white'}`}>
          <Heart className="w-4 h-4" />
        </button>

        {isBundle && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-brand-peach text-[#112e25] text-[10px] font-bold tracking-widest uppercase rounded">
            Bundle
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow px-1">
        
        <Link href={`/product/${product.slug || product.id}`} className="mb-1.5">
          <h3 className={`font-sans font-semibold text-[15px] leading-tight transition-colors line-clamp-1 ${
            isDark || isBundle ? 'text-white group-hover:text-[#f4cfc3]' : 'text-[#222222] group-hover:text-black'
          }`}>
            {product.title}
          </h3>
        </Link>
        
        <div className={`text-[12px] mb-3 ${isDark || isBundle ? 'text-white/60' : 'text-[#757575]'}`}>
          {primaryFormat}
        </div>
        
        <div className={`flex items-center justify-between mt-auto pt-3 ${isDark || isBundle ? 'border-t border-white/10' : 'border-t border-black/10'}`}>
          <span className={`font-sans font-bold text-[18px] ${isDark || isBundle ? 'text-white' : 'text-black'}`}>
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[12px] font-bold hover:underline ${
              isDark || isBundle ? 'text-[#f4cfc3]' : 'text-black'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>

      </div>
    </div>
  );
}
