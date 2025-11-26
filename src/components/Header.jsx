import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import booksData from '../data/books.json'; // ⚠️ CRITICAL: Import the book data!
import '../styles/global.css';

const Header = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  // State to hold suggested books
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the /books page with the 'query' search parameter
      navigate(`/books?query=${searchQuery.trim()}`);
      // Clear suggestions and query after submission
      setSearchQuery('');
      setSuggestions([]); 
    }
  };

  // Handle input change and generate suggestions
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      // Filter books where the title OR author starts with the query
      const matchingBooks = booksData.filter(book => 
        book.title.toLowerCase().startsWith(lowerCaseQuery) ||
        book.author.toLowerCase().startsWith(lowerCaseQuery)
      ).slice(0, 5); // Limit to top 5 suggestions
      setSuggestions(matchingBooks);
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  };

  // Handle clicking a suggestion (navigates to book details)
  const handleSuggestionClick = (book) => {
    navigate(`/books/${book.id}`);
    setSearchQuery('');
    setSuggestions([]);
  };


  return (
    <header id="header">
      <nav id="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src="/images/logo2.png" alt="Biblios Logo" />
          </Link>
        </div>
        
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About Biblios</Link></li>
        </ul>

        <div className="right">
          {/* Wrapper for relative positioning of suggestions */}
          <div style={{ position: 'relative' }}>
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="search-book">
                  <i className="fa-solid fa-magnifying-glass"></i>
              </label>
              <input 
                type="search" 
                placeholder="Search for books..." 
                id="search-book" 
                value={searchQuery}
                onChange={handleInputChange} // Use the new handler
              />
            </form>
            
            {/* Suggestions Dropdown UI */}
            {suggestions.length > 0 && (
                <ul className="suggestions-list" style={{
                    position: 'absolute',
                    top: '100%', 
                    left: '0', 
                    zIndex: 100, 
                    backgroundColor: 'white', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    listStyle: 'none',
                    padding: '0',
                    margin: '0',
                }}>
                    {suggestions.map((book) => (
                        <li 
                            key={book.id} 
                            onClick={() => handleSuggestionClick(book)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee',
                                fontSize: '14px',
                                color: '#333'
                            }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f4f4f4'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            <strong>{book.title}</strong> by {book.author}
                        </li>
                    ))}
                </ul>
            )}
          </div>
          
          <Link className="cart-container" to="/cart">
            <img src="/images/shopping-cart.png" alt="cart" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '7px',
                right: '4px',
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                width: '16px', 
                height: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '11px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        
        <i 
            className="fa-solid fa-bars bars" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{cursor: 'pointer'}}
        ></i>
      </nav>
    </header>
  );
};

export default Header;