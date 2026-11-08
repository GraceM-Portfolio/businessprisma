"use client";
import { createContext, useContext, useState } from "react";
import CartDrawer from "./CartDrawer";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  const addToCart = (product: any) => {
    // Check if item is already in cart (optional, but good for digital products)
    const exists = cartItems.find(item => item.id === product.id);
    if (!exists) {
      setCartItems([...cartItems, product]);
    }
    setIsCartOpen(true); // Open the cart drawer automatically when adding
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ isCartOpen, toggleCart, cartItems, addToCart, removeFromCart }}>
      {children}
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} items={cartItems} />
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
