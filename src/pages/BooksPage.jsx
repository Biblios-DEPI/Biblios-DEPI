import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast for feedback
import booksData from '../data/books.json'; 
import { useCart } from '../context/CartContext'; // Import Cart Hook
import '../styles/book-details.css'; // Reusing the shared styles

// Helper component for rendering a single book card
// Now matches the exact "Wishlist/Related" card style
const BookCard = ({ book }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(book, 1);
        toast.success(`"${book.title}" added to cart!`);
    };

    // Fake logic to match the visual style of the reference image
    // (creating a fake original price and discount)
    const currentPrice = book.price;
    const originalPrice = (currentPrice / 0.68).toFixed(2); 
    const discountPercent = 32;

    return (
        <div className="wishlist-card">
            {/* Image Container & Quick View */}
            <div className="book-cover-container">
                <img 
                    src={book.image} 
                    alt={book.title} 
                    className="book-cover"
                />
                <div className="cover-overlay">
                     <Link to={`/books/${book.id}`} className="quick-view-btn">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                         Quick View
                     </Link>
                </div>
            </div>
            
            <div className="book-details">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">by {book.author}</p>
                
                <div className="price-section">
                    <span className="current-price">${currentPrice.toFixed(2)}</span>
                    <span className="original-price">${originalPrice}</span>
                    <span className="discount-badge">{discountPercent}% OFF</span>
                </div>

                <button 
                    className="move-to-cart-btn"
                    onClick={handleAddToCart}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                     Move to Cart
                </button>
            </div>
        </div>
    );
};


const BooksPage = () => {
    // 1. Setup State & Params
    const [searchParams, setSearchParams] = useSearchParams();
    
    const currentCategory = searchParams.get('category') || 'All';
    const searchQuery = searchParams.get('query') || '';
    
    const categories = ["All", "Classics", "Philosophy", "Dystopian", "Fiction", "Mystery"];
    const PRIMARY_COLOR = '#006A8A'; 
    const lowerCaseQuery = searchQuery.toLowerCase();

    // 2. The Filter Logic
    const filteredByCategory = currentCategory === 'All'
        ? booksData
        : booksData.filter((book) => book.category === currentCategory);

    const displayedBooks = filteredByCategory.filter((book) => {
        if (!searchQuery) return true;
        return book.title.toLowerCase().includes(lowerCaseQuery) || 
               book.author.toLowerCase().includes(lowerCaseQuery);
    });

    // Function to handle filter button click
    const handleCategoryChange = (category) => {
        const newParams = {};
        if (searchQuery) newParams.query = searchQuery;
        if (category !== 'All') newParams.category = category;
        setSearchParams(newParams);
    };

    // Construct the display string
    let viewingText = `Currently viewing: **${currentCategory}** books`;
    if (searchQuery) viewingText += ` matching search: **"${searchQuery}"**`;
    viewingText += `. (${displayedBooks.length} results)`;


    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h2 className="main-title" style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>
                The Book Shop
            </h2>
            <p className="sub-text" style={{ textAlign: 'center', marginBottom: '30px' }} dangerouslySetInnerHTML={{ __html: viewingText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

            <hr className="gradient-hr" />

            {/* 3. The UI (Category Buttons) */}
            <div className="filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => handleCategoryChange(cat)}
                        className={currentCategory === cat ? 'active' : ''}
                        style={{
                            padding: '10px 20px',
                            border: `2px solid ${PRIMARY_COLOR}`,
                            borderRadius: '25px',
                            backgroundColor: currentCategory === cat ? PRIMARY_COLOR : 'white',
                            color: currentCategory === cat ? 'white' : PRIMARY_COLOR,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '16px'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 4. The Grid: Render the filtered books */}
            {/* We use the "related-grid" class to inherit the exact grid layout from CSS */}
            <div className="related-grid">
                {displayedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}

                {displayedBooks.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                        <h3 className="main-title">No Books Found</h3>
                        <p className="sub-text">Try selecting a different category or refining your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BooksPage;