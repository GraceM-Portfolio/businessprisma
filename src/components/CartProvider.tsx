"use client";
import { createContext, useContext, useState } from "react";
import CartDrawer from "./CartDrawer";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const addToCart = (product: any) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  return (
    <CartContext.Provider value={{ isCartOpen, toggleCart, cartItems, addToCart }}>
      {children}
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} items={cartItems} />
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
