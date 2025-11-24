import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/book-details.css';

const BookDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  
  // --- STATE FOR RATING ---
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);

  const MIN_QUANTITY = 1;
  const PRIMARY_COLOR = '#006A8A'; 
  const BLUE_COLOR = '#006A8A'
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
          <img src="/images/Odyssey.png" alt="Odyssey Book Cover" />
        </div>
        
        <div className="book-info">
          <h2 className="main-title">The Odyssey: A New Translation</h2>
          <p className="sub-text"><strong>By Homer</strong>, Translated by Emily Wilson</p>
          
          {/* --- FIXED INTERACTIVE RATING --- */}
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
                    stroke={PRIMARY_COLOR} // Outline is always Teal
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // If active, Fill is Teal. If inactive, Fill is White.
                    fill={isActive ? PRIMARY_COLOR : "white"} 
                    style={{ transition: 'fill 0.2s ease, transform 0.1s' }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              );
            })}
          </div>
          {/* --- END RATING --- */}

          <p className="sub-text">Experience the timeless epic of Homer's "The Odyssey" through Emily Wilson's acclaimed translation. This vibrant and authoritative rendition captures the essence of Odysseus's perilous journey home after the Trojan War. Faced with gods, monsters, and temptations, his courage and cunning are tested at every turn. Wilson’s poetic precision and accessible language breathe new life into this ancient tale of heroism, love, and the human condition.</p>
          
          <div className="price main-title">$18.99</div>
          
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

      <section className="related-books">
        <h3 className="main-title" style={{ fontSize: '36px' }}>Related Books</h3>
        <hr className="gradient-hr" />
        <div className="related-grid">
          <div className="related-item">
            <img src="/images/lilliad.png" alt="The Iliad" />
            <h4 className="main-title">The Iliad: A New Translation</h4>
            <p className="book-auth">Homer, Translated by Caroline Alexander</p>
            <p className="book-price">$20.50</p>
          </div>
          <div className="related-item">
            <img src="/images/PLATO.png" alt="Plato" />
            <h4 className="main-title">Plato: The Republic</h4>
            <p className="book-auth">Plato, Translated by Robin Waterfield</p>
            <p className="book-price">$16.00</p>
          </div>
          <div className="related-item">
            <img src="/images/meditation.png" alt="Meditations" />
            <h4 className="main-title">Meditations</h4>
            <p className="book-auth">Marcus Aurelius, Translated by Gregory Hays</p>
            <p className="book-price">$12.75</p>
          </div>
          <div className="related-item">
            <img src="/images/Aeneid.png" alt="Aeneid" />
            <h4 className="main-title">Aeneid</h4>
            <p className="book-auth">Virgil, Translated by Shadi Bartsch</p>
            <p className="book-price">$15.50</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetailsPage;