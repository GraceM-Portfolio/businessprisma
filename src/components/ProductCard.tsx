"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const isStack = product.tags?.includes('Stack') || product.format?.includes('Next.js') || product.format?.includes('React');
  const formatLabel = product.format?.join(" • ") || "Digital Download";

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-brand-charcoal/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      <div className="aspect-[4/3] relative overflow-hidden bg-brand-light w-full">
        <Link href={`/product/${product.slug || product.id}`}>
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">No Image</div>
          )}
        </Link>
        
        {product.tags && product.tags[0] && (
          <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm ${
            isStack ? 'bg-brand-green text-brand-cream' : 'bg-brand-peach text-brand-charcoal'
          }`}>
            {product.tags[0]}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <Link href={`/product/${product.slug || product.id}`} className="flex-1">
            <h3 className="font-serif text-lg leading-snug text-brand-charcoal group-hover:text-brand-green transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <span className="font-semibold text-brand-charcoal">${product.price}</span>
        </div>
        
        <p className="text-sm text-brand-charcoal/60 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="text-xs text-brand-charcoal/50 font-medium mb-4 uppercase tracking-wider">
          {formatLabel}
        </div>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-cream border border-brand-charcoal/10 text-sm font-medium text-brand-charcoal hover:bg-brand-green hover:text-brand-cream hover:border-brand-green transition-all"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
