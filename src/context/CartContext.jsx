// src/context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available, otherwise empty array
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('biblios_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('biblios_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. Add to Cart
  const addToCart = (book, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // If book exists, just update quantity
        return prevItems.map(item =>
          item.id === book.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new book with selected quantity
        return [...prevItems, { ...book, quantity }];
      }
    });
  };

  // 2. Remove from Cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // 3. Update Quantity (Increment/Decrement in Cart Page)
  const updateQuantity = (id, type) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        // Prevent going below 1
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

  // 4. Calculate Totals
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartCount,
      cartSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};