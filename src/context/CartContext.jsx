import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true);
  
  // Ref to track if we have finished the initial load
  const isInitialized = useRef(false);

  // 1. CONSOLIDATED EFFECT: Handle Auth AND Initial Load together
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 1. Determine User ID
      const newUserId = user ? user.uid : 'guest';
      setUserId(newUserId);

      // 2. Load Cart Immediately (No separate effect needed)
      const storageKey = `biblios_cart_${newUserId}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        setCartItems(JSON.parse(saved));
      } else {
        setCartItems([]);
      }

      // 3. Mark as ready
      isInitialized.current = true;
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. SAVE EFFECT: Only runs when cart changes (and app is initialized)
  useEffect(() => {
    if (isInitialized.current && userId) {
      const storageKey = `biblios_cart_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // --- Cart Actions ---

  const addToCart = (book, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === book.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...book, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, type) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

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
      {!loading && children}
    </CartContext.Provider>
  );
};