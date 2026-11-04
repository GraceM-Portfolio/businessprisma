"use client";
import { useCart } from "./CartProvider";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="w-full md:w-auto self-start flex items-center justify-center gap-2 bg-brand-green text-brand-cream px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all text-lg shadow-lg hover:shadow-xl"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart - ${product.price}
    </button>
  );
}
