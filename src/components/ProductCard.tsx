import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <div className="aspect-[4/3] bg-brand-light rounded-2xl mb-4 overflow-hidden relative border border-brand-charcoal/5">
        {/* Fallback image handling */}
        <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20 bg-[#e5e2d9]">
            {/* If you have real images, use next/image here */}
            <span className="text-sm font-medium">Product Image</span>
        </div>
        {product.tags && product.tags[0] && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
            product.category?.type === 'stack' ? 'bg-brand-green text-brand-cream' : 'bg-brand-peach text-brand-charcoal'
          }`}>
            {product.tags[0]}
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mt-auto">
        <div>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-green transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-brand-charcoal/60 line-clamp-1">{product.description}</p>
        </div>
        <span className="font-semibold whitespace-nowrap ml-4">${product.price}</span>
      </div>
    </div>
  );
}
