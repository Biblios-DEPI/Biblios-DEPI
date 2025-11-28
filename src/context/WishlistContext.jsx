import { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // Load from localStorage on start
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('biblios_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('biblios_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 1. Toggle Function (Add or Remove)
  const toggleWishlist = (book) => {
    const exists = wishlist.find(item => item.id === book.id);

    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== book.id));
      toast.error('Removed from Wishlist', { duration: 2000 });
    } else {
      setWishlist(prev => [...prev, { ...book, dateAdded: new Date().toISOString() }]);
      toast.success('Added to Wishlist!', {
        icon: '❤️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  // 2. Remove Function (Directly)
  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    toast.error('Removed from Wishlist');
  };

  // 3. Helper to check status
  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};