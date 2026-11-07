"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Plus } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const formatLabel = product.format?.join(" • ") || "Digital Download";
  const isBundle = product.tags?.includes('Bundles');

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
      
      {/* Tall Editorial Image */}
      <div className="aspect-[4/5] relative overflow-hidden bg-[#f4f1ea] w-full">
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
        
        {/* Premium Pill Tag */}
        {product.tags && product.tags[0] && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-[9px] font-bold tracking-[0.15em] uppercase text-brand-charcoal rounded-full shadow-sm">
            {product.tags[0]}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Format */}
        <div className="text-[10px] text-brand-charcoal/40 font-bold tracking-[0.15em] uppercase mb-2">
          {formatLabel}
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug || product.id}`} className="mb-2">
          <h3 className="font-serif text-lg leading-snug text-brand-charcoal group-hover:text-brand-green transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-brand-charcoal/60 line-clamp-2 mb-6 flex-grow font-light">
          {product.description}
        </p>
        
        {/* Footer: Price & Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-charcoal/5">
          <span className="font-serif text-xl font-medium text-brand-charcoal">
            ${product.price}
          </span>
          
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-cream text-brand-charcoal hover:bg-brand-green hover:text-brand-cream transition-all duration-300"
            aria-label="Add to cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
