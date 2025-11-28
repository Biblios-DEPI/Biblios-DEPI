import { createContext, useState, useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

const WishlistContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true);
  
  const isInitialized = useRef(false);

  // 1. CONSOLIDATED EFFECT: Handle Auth AND Initial Load together
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const newUserId = user ? user.uid : 'guest';
      setUserId(newUserId);

      const storageKey = `biblios_wishlist_${newUserId}`;
      const saved = localStorage.getItem(storageKey);
      
      if (saved) {
        setWishlist(JSON.parse(saved));
      } else {
        setWishlist([]);
      }

      isInitialized.current = true;
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. SAVE EFFECT
  useEffect(() => {
    if (isInitialized.current && userId) {
      const storageKey = `biblios_wishlist_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, userId]);

  // --- Actions ---

  const toggleWishlist = (book) => {
    const exists = wishlist.find(item => item.id === book.id);

    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== book.id));
      toast.error('Removed from Wishlist');
    } else {
      setWishlist(prev => [...prev, { ...book, dateAdded: new Date().toISOString() }]);
      
      // --- UPDATED: Removed the manual dark styling ---
      // Now it will use the white style from App.jsx automatically
      toast.success('Added to Wishlist!');
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    toast.error('Removed from Wishlist');
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {!loading && children} 
    </WishlistContext.Provider>
  );
};