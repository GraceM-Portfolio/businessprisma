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
    <div className="group flex flex-col h-full bg-white rounded-xl border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
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
            <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">
              No Image
            </div>
          )}
        </Link>
        
        <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-charcoal hover:bg-white hover:scale-110 transition-all shadow-sm opacity-0 group-hover:opacity-100">
          <Heart className="w-3.5 h-3.5" />
        </button>

        {isBundle && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-peach text-brand-charcoal text-[9px] font-bold tracking-widest uppercase rounded">
            Bundle
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        
        <Link href={`/product/${product.slug || product.id}`} className="mb-1">
          <h3 className="font-sans font-normal text-[14px] leading-tight text-brand-charcoal group-hover:text-brand-green transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <div className="text-[11px] mb-3 text-brand-charcoal/60">
          {primaryFormat}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-brand-charcoal/5">
          <span className="font-sans font-bold text-[16px] text-brand-charcoal">
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-brand-cream hover:bg-brand-green hover:text-brand-cream text-brand-charcoal px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add
          </button>
        </div>

      </div>
    </div>
  );
}
