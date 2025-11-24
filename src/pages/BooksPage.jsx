import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import booksData from '../data/books.json'; // The Mock Database
import '../styles/book-details.css'; // Reusing the styles for layout

// Helper component for rendering a single book card
const BookCard = ({ book }) => {
    const PRIMARY_COLOR = '#006A8A';
    
    return (
        // Link to the BookDetailsPage using the book's ID (Task A route)
        <Link to={`/books/${book.id}`} className="related-item" style={{ textDecoration: 'none' }}>
            <img 
                src={book.image} 
                alt={book.title} 
                style={{ 
                    width: '100%', 
                    height: '220px', 
                    objectFit: 'cover', 
                    borderRadius: '4px',
                    marginBottom: '10px'
                }} 
            />
            <h4 className="main-title" style={{ fontSize: '18px', color: '#333' }}>
                {book.title}
            </h4>
            <p className="book-auth" style={{ fontSize: '14px', color: '#666', margin: '3px 0' }}>
                {book.author}
            </p>
            <p className="book-price" style={{ fontSize: '16px', fontWeight: 'bold', color: PRIMARY_COLOR }}>
                ${book.price.toFixed(2)}
            </p>
        </Link>
    );
};


const BooksPage = () => {
    // 1. Setup State & Params: Read and set URL search parameters
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Get the category from the URL, default to 'All' if none is set
    const currentCategory = searchParams.get('category') || 'All';
    
    const categories = ["All", "Classics", "Philosophy", "Dystopian", "Fiction", "Mystery"];
    const PRIMARY_COLOR = '#006A8A'; 

    // 2. The Filter Logic: Determine which books to display
    const displayedBooks = currentCategory === 'All'
        ? booksData
        : booksData.filter((book) => book.category === currentCategory);


    // Function to handle filter button click
    const handleCategoryChange = (category) => {
        if (category === 'All') {
            // Remove the 'category' param entirely for a clean /books URL
            setSearchParams({}); 
        } else {
            // Set the 'category' param in the URL: /books?category=CategoryName
            setSearchParams({ category: category }); 
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h2 className="main-title" style={{ fontSize: '40px', textAlign: 'center', marginBottom: '10px' }}>
                The Book Shop
            </h2>
            <p className="sub-text" style={{ textAlign: 'center', marginBottom: '30px' }}>
                Currently viewing: <strong>{currentCategory}</strong> books. ({displayedBooks.length} results)
            </p>
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
            <div 
                className="related-grid" 
                style={{ 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '30px' 
                }}
            >
                {displayedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}

                {displayedBooks.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                        <h3 className="main-title">No Books Found</h3>
                        <p className="sub-text">Try selecting a different category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BooksPage;