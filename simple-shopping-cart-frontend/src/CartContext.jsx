import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load from localStorage when app loads
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart)
  }, [cart]);

 
 
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };




  // increment: explicit increase by 1 (used by + button)
  const increment = (id) => {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it)));
  };

  // decrement: decrease by 1; if quantity becomes 0 (<=1) remove from cart
  const decrement = (id) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        // remove item
        return prev.filter((it) => it.id !== id);
      }
      // decrease quantity
      return prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it));
    });
  };



  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart,increment, decrement, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
