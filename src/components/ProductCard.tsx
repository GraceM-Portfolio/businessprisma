"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const formatLabel = product.format?.join(" • ") || "Digital Download";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the link wrapping the card from triggering
    addToCart(product);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl transition-all duration-300 hover:shadow-lg overflow-hidden border border-brand-charcoal/5">
      
      {/* Rectangular Image (4:3) */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[#f4f1ea] w-full">
        <Link href={`/product/${product.slug || product.id}`}>
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">No Image</div>
          )}
        </Link>
        
        {product.tags && product.tags[0] && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold tracking-[0.15em] uppercase text-brand-charcoal rounded-full shadow-sm">
            {product.tags[0]}
          </div>
        )}
      </div>
      
      {/* Compact Content */}
      <div className="p-4 flex flex-col flex-grow">
        
        <div className="text-[9px] text-brand-charcoal/40 font-bold tracking-[0.15em] uppercase mb-1">
          {formatLabel}
        </div>

        <Link href={`/product/${product.slug || product.id}`} className="mb-1">
          <h3 className="font-serif text-base leading-snug text-brand-charcoal group-hover:text-brand-green transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-xs text-brand-charcoal/60 line-clamp-2 mb-4 flex-grow font-light">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-charcoal/5">
          <span className="font-serif text-lg font-medium text-brand-charcoal">
            ${product.price}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-cream text-brand-charcoal text-xs font-medium hover:bg-brand-green hover:text-brand-cream transition-all duration-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
