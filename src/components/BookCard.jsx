import React from 'react';
// Assuming you have an icon library or can use SVGs for the close and cart icons.
import { X, ShoppingCart } from 'lucide-react'; // Using lucide-react as an example icon library 
import '../styles/book-card.css'; // New CSS file for the card styling

// Mock props structure based on the image content
const BookCard = ({ 
    book, 
    originalPrice, 
    discountPercentage, 
    dateAdded, 
    onClose, 
    onMoveToCart 
}) => {

    const finalPrice = book.price.toFixed(2);
    const originalPriceFormatted = originalPrice.toFixed(2);
    
    // Calculate the actual discount text if not provided as a prop (as per the image)
    const discountText = discountPercentage ? `${discountPercentage}% OFF` : '22% OFF';

    // Fallback image if book.image is missing
    const imageUrl = book.image || 'https://via.placeholder.com/300x450?text=No+Cover'; 

    return (
        <div className="book-card-container">
            {/* Close Button */}
            <button className="book-card-close-btn" onClick={onClose} aria-label="Remove item">
                <X size={20} />
            </button>

            {/* Book Image and Details */}
            <div className="book-card-content">
                <div className="book-card-cover">
                    <img src={imageUrl} alt={`${book.title} Book Cover`} />
                </div>
                
                <div className="book-card-details">
                    <h3 className="book-card-title">{book.title}</h3>
                    <p className="book-card-author">by {book.author}</p>
                </div>

                {/* Pricing and Info */}
                <div className="book-card-pricing">
                    <span className="book-card-price">${finalPrice}</span>
                    <span className="book-card-original-price">${originalPriceFormatted}</span>
                    <span className="book-card-discount-tag">{discountText}</span>
                </div>
                
                <div className="book-card-info-bottom">
                    <span className="book-card-date-added">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="book-card-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Added {dateAdded}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button className="book-card-action-btn" onClick={onMoveToCart}>
                <ShoppingCart size={18} />
                <span>Move to Cart</span>
            </button>
        </div>
    );
};

export default BookCard;