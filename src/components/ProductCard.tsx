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
      isBundle ? 'bg-white/5 border border-white/10 rounded-xl p-3' : ''
    }`}>
      
      <div className={`relative w-full overflow-hidden mb-3 ${
        isBundle ? 'aspect-[16/9] rounded-md' : 'aspect-[3/2] rounded-none'
      } ${isDark || isBundle ? 'bg-[#1a1a1a]' : 'bg-[#e8e4db]'}`}>
        
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
            <div className={`absolute inset-0 flex items-center justify-center ${isDark || isBundle ? 'text-white/20' : 'text-black/20'}`}>
              No Image
            </div>
          )}
        </Link>
        
        <button className={`absolute top-2 right-2 w-7 h-7 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-sm opacity-0 group-hover:opacity-100 ${isDark || isBundle ? 'bg-black/50 text-white hover:bg-black/80' : 'bg-white/90 text-black hover:bg-white'}`}>
          <Heart className="w-3.5 h-3.5" />
        </button>

        {isBundle && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-peach text-[#112e25] text-[9px] font-bold tracking-widest uppercase rounded">
            Bundle
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow px-1">
        
        <Link href={`/product/${product.slug || product.id}`} className="mb-1">
          <h3 className={`font-sans font-semibold text-[14px] leading-tight transition-colors line-clamp-1 ${
            isDark || isBundle ? 'text-white group-hover:text-[#f4cfc3]' : 'text-[#222222] group-hover:text-black'
          }`}>
            {product.title}
          </h3>
        </Link>
        
        <div className={`text-[11px] mb-2 ${isDark || isBundle ? 'text-white/60' : 'text-[#757575]'}`}>
          {primaryFormat}
        </div>
        
        <div className={`flex items-center justify-between mt-auto pt-2 ${isDark || isBundle ? 'border-t border-white/10' : 'border-t border-black/10'}`}>
          <span className={`font-sans font-bold text-[16px] ${isDark || isBundle ? 'text-white' : 'text-black'}`}>
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-bold hover:underline ${
              isDark || isBundle ? 'text-[#f4cfc3]' : 'text-black'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
          </button>
        </div>

      </div>
    </div>
  );
}
