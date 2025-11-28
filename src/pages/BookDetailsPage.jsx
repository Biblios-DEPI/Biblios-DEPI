import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import toast from 'react-hot-toast';
import { auth } from '../firebase'; // Added auth import
import booksData from '../data/books.json';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/book-details.css';

const BookDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate(); // Hook for redirection

  // --- STATE FOR RATING ---
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { id } = useParams();
  const book = booksData.find((b) => b.id === parseInt(id));
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setQuantity(1);
    setRating(0);
  }

  // Handle case where book is not found
  if (!book) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2 className="main-title">Book Not Found 😢</h2>
        <Link to="/books" className="btn sub-text" style={{ marginTop: '20px' }}>
          Browse All Books
        </Link>
      </div>
    );
  }

  const MIN_QUANTITY = 1;
  const PRIMARY_COLOR = '#006A8A';
  const NUMBER_COLOR = 'black';
  const DISABLED_COLOR = '#ccc';

  const isMainBookLiked = isInWishlist(book.id);

  // --- NEW: LOGIN CHECK FUNCTION ---
  const handleWishlistClick = (bookItem) => {
    if (!auth.currentUser) {
        toast.error("Please login to save items to your wishlist");
        navigate('/login');
        return;
    }
    toggleWishlist(bookItem);
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
   toast.success(`${quantity} copy of "${book.title}" added to cart!`);
  };

  const handleRelatedMoveToCart = (relatedBook) => {
    addToCart(relatedBook, 1);
    toast.success(`"${relatedBook.title}" moved to cart!`);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(MIN_QUANTITY, prevQuantity - 1));
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  return (
    <div className="detail-container">
      <section className="book-detail">
        <div className="book-img">
          <img src={book.image} alt={`${book.title} Book Cover`} />
        </div>

        <div className="book-info">
          <h2 className="main-title">{book.title}</h2>
          <p className="sub-text"><strong>By {book.author}</strong></p>

          {/* RATING */}
          <div className="rating-wrapper" style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              const isActive = ratingValue <= (hover || rating);
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={isActive ? PRIMARY_COLOR : "white"}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              );
            })}
            <span style={{ marginLeft: '10px', color: PRIMARY_COLOR, fontWeight: 'bold' }}>
              ({book.rating.toFixed(1)} Avg)
            </span>
          </div>

          <p className="sub-text">{book.description}</p>
          <div className="price main-title">${book.price.toFixed(2)}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }} onClick={decrementQuantity} disabled={quantity === MIN_QUANTITY}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={quantity === MIN_QUANTITY ? DISABLED_COLOR : PRIMARY_COLOR} viewBox="0 0 24 24" width="24" height="24"><path d="M19 13H5v-2h14v2z" /></svg>
              </button>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: NUMBER_COLOR, minWidth: '24px', textAlign: 'center' ,transform: 'translateY(-5px)'}}>{quantity}</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }} onClick={incrementQuantity}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={PRIMARY_COLOR} viewBox="0 0 24 24" width="24" height="24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
              </button>
            </div>

            <button onClick={handleAddToCart} className="btn sub-text" style={{ cursor: 'pointer', border: 'none' }}>
              Add to Cart
            </button>

            {/* MAIN WISHLIST BUTTON WITH AUTH CHECK */}
            <button
                onClick={() => handleWishlistClick(book)}
                style={{
                    background: 'none',
                    border: `1px solid ${isMainBookLiked ? '#ff6b6b' : '#ccc'}`,
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                title={isMainBookLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            >
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isMainBookLiked ? "#ff6b6b" : "none"} stroke={isMainBookLiked ? "#ff6b6b" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="related-books">
        <h3 className="main-title" style={{ fontSize: '36px' }}>Related Books in {book.category}</h3>
        <hr className="gradient-hr" />

        <div className="related-grid">
          {booksData
            .filter(b => b.category === book.category && b.id !== book.id)
            .slice(0, 5)
            .map(relatedBook => {
              const currentPrice = relatedBook.price;
              const originalPrice = relatedBook.originalPrice;
              const hasDiscount = originalPrice && originalPrice > currentPrice;
              const discountPercent = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
              const isRelatedLiked = isInWishlist(relatedBook.id);

              return (
                <div key={relatedBook.id} className="wishlist-card">
                  <div className="book-cover-container">
                    <img src={relatedBook.image} alt={relatedBook.title} className="book-cover" />
                    
                    {/* RELATED WISHLIST BUTTON WITH AUTH CHECK */}
                    <button 
                        className="wishlist-icon-btn" 
                        onClick={() => handleWishlistClick(relatedBook)}
                        aria-label="Add to Wishlist"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isRelatedLiked ? "#ff6b6b" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>

                    <div className="cover-overlay">
                      <Link to={`/books/${relatedBook.id}`} className="quick-view-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Book Details
                      </Link>
                    </div>
                  </div>

                  <div className="book-details">
                    <h4 className="book-title">{relatedBook.title}</h4>
                    <p className="book-author">by {relatedBook.author}</p>
                    <div className="price-section">
                      <span className="current-price">${currentPrice.toFixed(2)}</span>
                      {hasDiscount && (
                        <>
                            <span className="original-price">${originalPrice.toFixed(2)}</span>
                            <span className="discount-badge">{discountPercent}% OFF</span>
                        </>
                      )}
                    </div>
                    <button className="move-to-cart-btn" onClick={() => handleRelatedMoveToCart(relatedBook)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </div>
  );
};

export default BookDetailsPage;