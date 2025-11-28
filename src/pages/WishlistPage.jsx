import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; // Added Link for Browse button
import { useCart } from '../context/CartContext'; 
import { useWishlist } from '../context/WishlistContext'; // 1. Import Wishlist Hook
import "../styles/WishlistPage.css";

export default function WishlistPage() {
    const { addToCart } = useCart();
    // 2. Get real data and remove function from Context
    const { wishlist, removeFromWishlist: removeContextItem } = useWishlist(); 

    // 3. Define the STATIC "Out of Stock" item for demo purposes
    const staticItem = {
        id: 'static-odyssey', // Unique ID to prevent conflict
        title: "The Odyssey",
        author: "Homer",
        price: 18.99,
        originalPrice: 28.99,
        cover: "/images/TheOdyssey.jpg",
        addedDate: "2024-11-15",
        inStock: false, // The important part
    };

    // State to handle the local removal of the static item
    const [showStaticItem, setShowStaticItem] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    // 4. Combine Real Wishlist + Static Item
    const displayItems = [...wishlist];
    if (showStaticItem) {
        displayItems.push(staticItem);
    }

    // Handle Removal (Visual animation + Data Removal)
    const handleRemove = (id) => {
        setRemovingId(id);
        
        setTimeout(() => {
            if (id === 'static-odyssey') {
                // If it's the static item, just hide it locally
                setShowStaticItem(false);
                toast.error("Removed from wishlist", { position: 'bottom-center' });
            } else {
                // If it's a real item, remove from Context (Toast handled by Context)
                removeContextItem(id);
            }
            setRemovingId(null);
        }, 500); // Match animation duration
    };

    const moveToCart = (item) => {
        if (item.inStock !== false) { // Allow if inStock is true or undefined
            // 1. Add to Cart
            addToCart(item, 1);

            // 2. Animate Removal
            setRemovingId(item.id);
            
            setTimeout(() => {
                if (item.id === 'static-odyssey') {
                    setShowStaticItem(false);
                } else {
                    removeContextItem(item.id);
                }
                setRemovingId(null);
                
                // 3. Success Toast
                toast.success(`"${item.title}" moved to cart!`, {
                    style: {
                      border: '1px solid #006A8A',
                      padding: '16px',
                      color: '#006A8A',
                    },
                    iconTheme: {
                      primary: '#006A8A',
                      secondary: '#FFFAEE',
                    },
                });
            }, 600);
        }
    };

    // Helper to normalize data (since JSON books don't have originalPrice/addedDate)
    const getDisplayData = (item) => {
        const price = item.price || 0;
        // Calculate original price if missing (Mock logic: Price / 0.68)
        const originalPrice = item.originalPrice || (price / 0.68);
        
        return {
            ...item,
            image: item.image || item.cover, // Handle property mismatch
            originalPrice: originalPrice,
            addedDate: item.dateAdded || item.addedDate || new Date().toISOString(),
            inStock: item.inStock !== undefined ? item.inStock : true // Default to true
        };
    };

    const calculateSavings = () => {
        return displayItems
            .reduce((total, item) => {
                const data = getDisplayData(item);
                return total + (data.originalPrice - data.price);
            }, 0)
            .toFixed(2);
    };

    return (
        <div className="wishlist-page">
            {/* Header matches MainLayout, so internal header removed to avoid duplication if using Router Layout */}
            
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <div className="title-section">
                        <h1>
                            <i className="fas fa-heart"></i>
                            My Wishlist
                        </h1>
                        <p className="subtitle">
                            {displayItems.length}{" "}
                            {displayItems.length === 1 ? "book" : "books"} waiting for you
                        </p>
                    </div>

                    {displayItems.length > 0 && (
                        <div className="savings-badge">
                            <i className="fas fa-tag"></i>
                            <span>You're saving ${calculateSavings()}</span>
                        </div>
                    )}
                </div>

                {displayItems.length === 0 ? (
                    <div className="empty-wishlist">
                        <div className="empty-icon">
                            <i className="fas fa-heart-broken"></i>
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Start adding books you love and build your dream library!</p>
                        <Link to="/books" className="browse-button" style={{textDecoration:'none'}}>
                            <i className="fas fa-book"></i>
                            Browse Books
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="wishlist-grid">
                            {displayItems.map((rawItem) => {
                                const item = getDisplayData(rawItem);
                                return (
                                    <div
                                        key={item.id}
                                        className={`wishlist-card ${removingId === item.id ? "removing" : ""}`}
                                    >
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemove(item.id)}
                                            aria-label="Remove from wishlist"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>

                                        {!item.inStock && (
                                            <div className="out-of-stock-badge">Out of Stock</div>
                                        )}

                                        <div className="book-cover-container">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="book-cover"
                                            />
                                            <div className="cover-overlay">
                                                <button
                                                    className="quick-view-btn"
                                                    onClick={() => toast('Quick View coming soon!', { icon: '👀' })}
                                                >
                                                    <i className="fas fa-eye"></i>
                                                    Quick View
                                                </button>
                                            </div>
                                        </div>

                                        <div className="book-details">
                                            <h3 className="book-title">{item.title}</h3>
                                            <p className="book-author">by {item.author}</p>

                                            <div className="price-section">
                                                <span className="current-price">${item.price.toFixed(2)}</span>
                                                <span className="original-price">
                                                    ${item.originalPrice.toFixed(2)}
                                                </span>
                                                <span className="discount-badge">
                                                    {Math.round(
                                                        ((item.originalPrice - item.price) /
                                                            item.originalPrice) *
                                                        100
                                                    )}
                                                    % OFF
                                                </span>
                                            </div>

                                            <div className="added-date">
                                                <i className="fas fa-clock"></i>
                                                Added{" "}
                                                {new Date(item.addedDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </div>

                                            <button
                                                className={`add-to-cart-btn ${!item.inStock ? "disabled" : ""}`}
                                                onClick={() => moveToCart(item)}
                                                disabled={!item.inStock}
                                            >
                                                <i className="fas fa-shopping-cart"></i>
                                                {item.inStock ? "Move to Cart" : "Out of Stock"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="wishlist-summary">
                            <div className="summary-card">
                                <h3>Wishlist Summary</h3>
                                <div className="summary-row">
                                    <span>Total Items:</span>
                                    <span className="summary-value">{displayItems.length}</span>
                                </div>
                                <div className="summary-row highlight">
                                    <span>You're Saving:</span>
                                    <span className="summary-value savings">
                                        ${calculateSavings()}
                                    </span>
                                </div>
                                <button 
                                    className="add-all-btn"
                                    onClick={() => toast.success("Feature coming soon!")}
                                >
                                    <i className="fas fa-cart-plus"></i>
                                    Add All to Cart
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}