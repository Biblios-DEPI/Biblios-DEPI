import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // 1. Import useParams
import booksData from '../data/books.json'; // 2. Import the data source
import '../styles/book-details.css';

const BookDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  
  // --- STATE FOR RATING ---
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);

  // --- TASK A: Make Dynamic ---
  const { id } = useParams();
  // Use .find() to get the book, converting id from string to number
  const book = booksData.find((b) => b.id === parseInt(id)); 

  // Handle case where book is not found
  if (!book) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2 className="main-title">Book Not Found 😢</h2>
        <p className="sub-text">The book ID `{id}` does not match any entry in our catalog.</p>
        <Link to="/books" className="btn sub-text" style={{ marginTop: '20px' }}>
          Browse All Books
        </Link>
      </div>
    );
  }
  // --- END TASK A ---

  const MIN_QUANTITY = 1;
  const PRIMARY_COLOR = '#006A8A'; 
  const NUMBER_COLOR = 'black'; 
  const DISABLED_COLOR = '#ccc';

  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(MIN_QUANTITY, prevQuantity - 1));
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  return (
    <div className="container">
      <section className="book-detail">
        <div className="book-img">
          {/* Use book.image dynamically */}
          <img src={book.image} alt={`${book.title} Book Cover`} /> 
        </div>
        
        <div className="book-info">
          {/* Dynamic Content */}
          <h2 className="main-title">{book.title}</h2> 
          <p className="sub-text"><strong>By {book.author}</strong></p>
          
          {/* --- FIXED INTERACTIVE RATING --- */}
          {/* Note: In a real app, the default rating would be loaded from book.rating */}
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
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                    stroke={PRIMARY_COLOR}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={isActive ? PRIMARY_COLOR : "white"} 
                    style={{ transition: 'fill 0.2s ease, transform 0.1s' }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              );
            })}
            <span style={{ marginLeft: '10px', color: PRIMARY_COLOR, fontWeight: 'bold' }}>
                ({book.rating.toFixed(1)} Avg) 
            </span>
          </div>
          {/* --- END RATING --- */}

          {/* Dynamic Description */}
          <p className="sub-text">{book.description}</p>
          
          {/* Dynamic Price */}
          <div className="price main-title">${book.price.toFixed(2)}</div> 
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <button 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                onClick={decrementQuantity}
                disabled={quantity === MIN_QUANTITY} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={quantity === MIN_QUANTITY ? DISABLED_COLOR : PRIMARY_COLOR} viewBox="0 0 24 24" width="24" height="24"><path d="M19 13H5v-2h14v2z"/></svg>
              </button>
              
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: NUMBER_COLOR, minWidth: '24px', textAlign: 'center' }}>
                {quantity}
              </span>

              <button 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                onClick={incrementQuantity}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={PRIMARY_COLOR} viewBox="0 0 24 24" width="24" height="24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
              </button>
            </div>
            
            <Link to="/cart" className="btn sub-text">Add to Cart</Link>
          </div>
        </div>
      </section>

      {/* Note: Related Books section is still hardcoded. This could be made dynamic later */}
      <section className="related-books">
        <h3 className="main-title" style={{ fontSize: '36px' }}>Related Books in {book.category}</h3>
        <hr className="gradient-hr" />
        <div className="related-grid">
          {/* A simple filter to show related books from the same category */}
          {booksData
            .filter(b => b.category === book.category && b.id !== book.id)
            .slice(0, 4) // Show only up to 4 related books
            .map(relatedBook => (
              <Link to={`/books/${relatedBook.id}`} key={relatedBook.id} className="related-item">
                <img src={relatedBook.image}  alt={relatedBook.title} />
                <h4 className="main-title">{relatedBook.title}</h4>
                <p className="book-auth">{relatedBook.author}</p>
                <p className="book-price">${relatedBook.price.toFixed(2)}</p>
              </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BookDetailsPage;