import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import booksData from '../data/books.json'; // The Mock Database
import '../styles/book-details.css'; // Reusing the styles for layout

// Helper component for rendering a single book card
const BookCard = ({ book }) => {
    const PRIMARY_COLOR = '#006A8A';
    
    return (
        // Link container: Use flexbox to center content vertically
        <Link 
            to={`/books/${book.id}`} 
            className="related-item" 
            style={{ 
                textDecoration: 'none', 
                // Set the link container to display flex and align items centrally 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center', // Center text elements
                padding: '10px'
            }}
        >
            <img 
                src={book.image} 
                alt={book.title} 
                style={{ 
                    // 📐 Style Adjustment for Aspect Ratio and Size
                    width: '200px', // Fixed width for a typical book cover
                    height: '300px', // Fixed height for a portrait ratio
                    objectFit: 'cover', // Ensures the image fills the box without stretching
                    borderRadius: '4px',
                    marginBottom: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Added a subtle shadow
                }} 
            />
            <h4 className="main-title" style={{ fontSize: '18px', color: '#333', marginTop: '5px' }}>
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
    // Get the search query from the URL
    const searchQuery = searchParams.get('query') || '';
    
    const categories = ["All", "Classics", "Philosophy", "Dystopian", "Fiction", "Mystery"];
    const PRIMARY_COLOR = '#006A8A'; 
    const lowerCaseQuery = searchQuery.toLowerCase();

    // 2. The Filter Logic: Determine which books to display
    // First, filter by Category
    const filteredByCategory = currentCategory === 'All'
        ? booksData
        : booksData.filter((book) => book.category === currentCategory);

    // Second, apply Search query filter to the category-filtered results
    const displayedBooks = filteredByCategory.filter((book) => {
        if (!searchQuery) return true;
        
        // Search logic: Check if query matches title or author (case-insensitive and includes)
        return book.title.toLowerCase().includes(lowerCaseQuery) || 
               book.author.toLowerCase().includes(lowerCaseQuery);
    });

    // Function to handle filter button click
    const handleCategoryChange = (category) => {
        const newParams = {};
        
        // Preserve the search query if it exists
        if (searchQuery) {
            newParams.query = searchQuery;
        }

        if (category !== 'All') {
            newParams.category = category;
        } 
        
        setSearchParams(newParams);
    };

    // Construct the display string for the current view
    let viewingText = `Currently viewing: **${currentCategory}** books`;
    if (searchQuery) {
        viewingText += ` matching search: **"${searchQuery}"**`;
    }
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
            <div 
                className="related-grid" 
                style={{ 
                    // Keeping this at 250px min-width is appropriate for the new 200px image size
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '30px' 
                }}
            >
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