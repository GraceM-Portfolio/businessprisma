"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const isStack = product.tags?.includes('Stack') || product.format?.includes('Next.js') || product.format?.includes('React') || product.title.includes('Kit');

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-brand-charcoal/5 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden bg-brand-light">
        {product.image_url ? (
          <Image 
            src={product.image_url} 
            alt={product.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">No Image</div>
        )}
        
        {product.tags && product.tags[0] && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
            isStack ? 'bg-brand-green text-brand-cream' : 'bg-brand-peach text-brand-charcoal'
          }`}>
            {product.tags[0]}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/product/${product.slug || product.id}`}>
            <h3 className="font-semibold text-lg group-hover:text-brand-green transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <span className="font-semibold whitespace-nowrap ml-4">${product.price}</span>
        </div>
        
        <p className="text-sm text-brand-charcoal/60 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full py-2.5 rounded-full border border-brand-charcoal/20 text-sm font-medium hover:bg-brand-green hover:text-brand-cream hover:border-brand-green transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
