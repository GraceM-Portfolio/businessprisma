"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { ShoppingBag, Download } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const formatLabel = product.format?.join(" • ") || "Digital Download";
  const isBundle = product.tags?.includes('Bundles');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col h-full bg-white rounded-lg border border-brand-charcoal/10 hover:border-brand-charcoal/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      
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
            <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal">
              No Image
            </div>
          )}
        </Link>
        
        {/* Category Pill */}
        {product.tags && product.tags[0] && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-brand-charcoal rounded shadow-sm pointer-events-none">
            {product.tags[0]}
          </div>
        )}

        {/* Bundle Badge */}
        {isBundle && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-brand-peach text-brand-charcoal text-[10px] font-bold tracking-widest uppercase rounded shadow-sm pointer-events-none">
            Bundle
          </div>
        )}
      </div>
      
      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Title & Price Row */}
        <div className="flex justify-between items-start gap-3 mb-1">
          <Link href={`/product/${product.slug || product.id}`} className="flex-1">
            <h3 className="font-sans font-semibold text-[15px] leading-tight text-black group-hover:text-brand-green transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <span className="font-serif text-lg font-medium text-black">
            ${product.price}
          </span>
        </div>
        
        {/* Format & Instant Download Label - FIXED CONTRAST */}
        <div className="flex items-center gap-1.5 text-[11px] text-brand-charcoal mb-3">
          <Download className="w-3 h-3" />
          <span className="uppercase tracking-wider font-semibold">{formatLabel}</span>
        </div>

        {/* Short Description - FIXED CONTRAST */}
        <p className="text-xs text-brand-charcoal line-clamp-2 mb-4 flex-grow font-normal leading-relaxed">
          {product.description}
        </p>
        
        {/* Add to Cart Button */}
        <div className="mt-auto pt-2">
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-brand-cream border border-brand-charcoal/20 text-brand-charcoal text-sm font-semibold hover:bg-brand-green hover:text-brand-cream hover:border-brand-green transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" /> 
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
