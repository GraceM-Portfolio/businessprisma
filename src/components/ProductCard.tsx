"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  // Format label from the array (e.g., "PDF, Canva template")
  const formatLabel = product.format?.join(" • ") || "Digital Download";

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-prisma-espresso/10 shadow-sm hover:shadow-xl hover:border-prisma-espresso/20 transition-all duration-300 overflow-hidden">
      
      {/* Image Container with standard 4:3 ratio */}
      <div className="aspect-[4/3] relative overflow-hidden bg-prisma-cream w-full">
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
            <div className="absolute inset-0 flex items-center justify-center text-prisma-espresso/20">No Image</div>
          )}
        </Link>
        
        {/* Category Tag */}
        {product.tags && product.tags[0] && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-prisma-espresso rounded-full shadow-sm">
            {product.tags[0]}
          </div>
        )}
      </div>
      
      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <Link href={`/product/${product.slug || product.id}`} className="flex-1">
            <h3 className="font-serif text-lg leading-snug text-prisma-espresso group-hover:text-prisma-bronze transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <span className="font-semibold text-prisma-espresso">${product.price}</span>
        </div>
        
        <p className="text-sm text-prisma-espresso/60 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="text-xs text-prisma-taupe font-medium mb-4 uppercase tracking-wider">
          {formatLabel}
        </div>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-prisma-ivory border border-prisma-espresso/10 text-sm font-medium text-prisma-espresso hover:bg-prisma-espresso hover:text-white hover:border-prisma-espresso transition-all"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
