"use client";
import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="w-full md:w-auto self-start flex items-center justify-center gap-3 bg-prisma-espresso text-prisma-ivory px-10 py-4 rounded-full font-medium hover:bg-prisma-charcoal transition-all text-lg shadow-lg hover:shadow-xl"
    >
      <ShoppingBag className="w-5 h-5" />
      Add to Cart — ${product.price}
    </button>
  );
}
