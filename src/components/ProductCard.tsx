"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const isStack = product.tags?.includes('Stack') || product.format?.includes('Next.js') || product.format?.includes('React') || product.title.includes('Kit');

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-brand-charcoal/5 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden bg-brand-light w-full">
        {product.image_url ? (
          <Image 
            src={product.image_url} 
            alt={product.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 85vw, 280px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">No Image</div>
        )}
        
        {/* Tag Pill */}
        {product.tags && product.tags[0] && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${
            isStack ? 'bg-brand-green text-brand-cream' : 'bg-brand-peach text-brand-charcoal'
          }`}>
            {product.tags[0]}
          </div>
        )}
      </div>
      
      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 gap-2">
          <Link href={`/product/${product.slug || product.id}`} className="flex-1">
            <h3 className="font-semibold text-base text-brand-charcoal group-hover:text-brand-green transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <span className="font-bold text-brand-green whitespace-nowrap">${product.price}</span>
        </div>
        
        <p className="text-xs text-brand-charcoal/60 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full py-2 rounded-full border border-brand-charcoal/15 text-xs font-semibold text-brand-charcoal hover:bg-brand-green hover:text-brand-cream hover:border-brand-green transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
