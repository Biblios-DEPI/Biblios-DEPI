// WishlistPage.jsx
import React, { useState } from "react";
import "../styles/WishlistPage.css";

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            price: 16.99,
            originalPrice: 24.99,
            cover: "../../public/images/TheMidnightLibrary.jpg",
            addedDate: "2024-11-20",
            inStock: true,
        },
        {
            id: 2,
            title: "The Iliad",
            author: "Homer",
            price: 14.99,
            originalPrice: 19.99,
            cover: "../../public/images/TheIliad.jpg",
            addedDate: "2024-11-18",
            inStock: true,
        },
        {
            id: 3,
            title: "The Odyssey",
            author: "Homer",
            price: 18.99,
            originalPrice: 28.99,
            cover: "../../public/images/TheOdyssey.jpg",
            addedDate: "2024-11-15",
            inStock: false,
        },
        {
            id: 4,
            title: "les Misérables",
            author: "Victor Hugo",
            price: 13.99,
            originalPrice: 17.99,
            cover: "../../public/images/LesMisrables.jpg",
            addedDate: "2024-11-10",
            inStock: true,
        },
    ]);

    const [removingId, setRemovingId] = useState(null);

    const removeFromWishlist = (id) => {
        setRemovingId(id);
        setTimeout(() => {
            setWishlistItems(wishlistItems.filter((item) => item.id !== id));
            setRemovingId(null);
        }, 500);
    };

    const moveToCart = (id) => {
        const item = wishlistItems.find((item) => item.id === id);
        if (item && item.inStock) {
            setRemovingId(id);
            setTimeout(() => {
                setWishlistItems(wishlistItems.filter((item) => item.id !== id));
                setRemovingId(null);
                alert(`"${item.title}" added to cart!`);
            }, 600);
        }
    };

    const calculateSavings = () => {
        return wishlistItems
            .reduce((total, item) => {
                return total + (item.originalPrice - item.price);
            }, 0)
            .toFixed(2);
    };

    const totalPrice = wishlistItems
        .reduce((total, item) => total + item.price, 0)
        .toFixed(2);

    return (
        <div className="wishlist-page">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-book-open"></i>
                        <span>Biblios</span>
                    </div>
                    <nav className="nav-links">
                        <a href="#home">Home</a>
                        <a href="#shop">Shop</a>
                        <a href="#wishlist" className="active">
                            Wishlist
                        </a>
                        <a href="#profile">Profile</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <div className="title-section">
                        <h1>
                            <i className="fas fa-heart"></i>
                            My Wishlist
                        </h1>
                        <p className="subtitle">
                            {wishlistItems.length}{" "}
                            {wishlistItems.length === 1 ? "book" : "books"} waiting for you
                        </p>
                    </div>

                    {wishlistItems.length > 0 && (
                        <div className="savings-badge">
                            <i className="fas fa-tag"></i>
                            <span>You're saving ${calculateSavings()}</span>
                        </div>
                    )}
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">
                        <div className="empty-icon">
                            <i className="fas fa-heart-broken"></i>
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Start adding books you love and build your dream library!</p>
                        <button className="browse-button">
                            <i className="fas fa-book"></i>
                            Browse Books
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="wishlist-grid">
                            {wishlistItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`wishlist-card ${removingId === item.id ? "removing" : ""
                                        }`}
                                >
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromWishlist(item.id)}
                                        aria-label="Remove from wishlist"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>

                                    {!item.inStock && (
                                        <div className="out-of-stock-badge">Out of Stock</div>
                                    )}

                                    <div className="book-cover-container">
                                        <img
                                            src={item.cover}
                                            alt={item.title}
                                            className="book-cover"
                                        />
                                        <div className="cover-overlay">
                                            <button
                                                className="quick-view-btn"
                                                onClick={() => alert(`Viewing ${item.title}`)}
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
                                            <span className="current-price">${item.price}</span>
                                            <span className="original-price">
                                                ${item.originalPrice}
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
                                            className={`add-to-cart-btn ${!item.inStock ? "disabled" : ""
                                                }`}
                                            onClick={() => moveToCart(item.id)}
                                            disabled={!item.inStock}
                                        >
                                            <i className="fas fa-shopping-cart"></i>
                                            {item.inStock ? "Add to Cart" : "Out of Stock"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="wishlist-summary">
                            <div className="summary-card">
                                <h3>Wishlist Summary</h3>
                                <div className="summary-row">
                                    <span>Total Items:</span>
                                    <span className="summary-value">{wishlistItems.length}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Total Value:</span>
                                    <span className="summary-value">${totalPrice}</span>
                                </div>
                                <div className="summary-row highlight">
                                    <span>You're Saving:</span>
                                    <span className="summary-value savings">
                                        ${calculateSavings()}
                                    </span>
                                </div>
                                <button className="add-all-btn">
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
