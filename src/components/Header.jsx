import { useState, useEffect, useRef } from 'react';
// 1. Add useSearchParams to imports
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
import { useCart } from '../context/CartContext';
import booksData from '../data/books.json'; 
import '../styles/global.css';

const Header = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  // 2. Initialize search params to control the URL
  const [searchParams, setSearchParams] = useSearchParams();

  const isActive = (path) => location.pathname === path;

  // 3. Sync state with URL (so if you refresh, the text remains)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || ''); 
  
  const [suggestions, setSuggestions] = useState([]);

  // Keep input in sync with URL changes (e.g. back button)
  useEffect(() => {
    const urlQuery = searchParams.get('query');
    setSearchQuery(urlQuery || '');
  }, [searchParams]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?query=${searchQuery.trim()}`);
      setSuggestions([]); 
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // --- LIVE SEARCH LOGIC START ---
    // If we are currently on the '/books' page, update the URL immediately
    if (location.pathname === '/books') {
        const newParams = {};
        
        // Preserve current category if it exists
        const currentCategory = searchParams.get('category');
        if (currentCategory) newParams.category = currentCategory;

        // Only add query if it's not empty
        if (query.trim().length > 0) {
            newParams.query = query;
        }

        setSearchParams(newParams);
    }
    // --- LIVE SEARCH LOGIC END ---

    // Suggestions Logic
    if (query.trim().length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      const matchingBooks = booksData.filter(book => 
        book.title.toLowerCase().startsWith(lowerCaseQuery) ||
        book.author.toLowerCase().startsWith(lowerCaseQuery)
      ).slice(0, 5); 
      setSuggestions(matchingBooks);
    } else {
      setSuggestions([]); 
    }
  };

  const handleSuggestionClick = (book) => {
    navigate(`/books/${book.id}`);
    setSearchQuery('');
    setSuggestions([]);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header id="header">
      <nav id="navbar" className="shadow-header">
        <div className="logo-container">
          <Link to="/">
            <img src="/images/logo2.png" alt="Biblios Logo" />
          </Link>
        </div>
        
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">{isActive('/') ? <span className="floating-shine">Home</span> : 'Home'}</Link></li>
          <li><Link to="/categories">{isActive('/categories') ? <span className="floating-shine">Categories</span> : 'Categories'}</Link></li>
          <li><Link to="/about">{isActive('/about') ? <span className="floating-shine">About Biblios</span> : 'About Biblios'}</Link></li>
        </ul>

        <div className="right">
          <div style={{ position: 'relative' }}>
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="search-book"><i className="fa-solid fa-magnifying-glass"></i></label>
              <input 
                type="search" 
                placeholder="Search for books..." 
                id="search-book" 
                value={searchQuery}
                onChange={handleInputChange} 
              />
            </form>
            
            {suggestions.length > 0 && (
                <ul className="suggestions-list" style={{
                    position: 'absolute', top: '100%', left: '0', zIndex: 100, backgroundColor: 'white', 
                    border: '1px solid #ddd', borderRadius: '4px', width: '100%', maxHeight: '200px', 
                    overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', listStyle: 'none', padding: '0', margin: '0'
                }}>
                    {suggestions.map((book) => (
                        <li 
                            key={book.id} 
                            onClick={() => handleSuggestionClick(book)}
                            style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '14px', color: '#333' }}
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
              <span style={{ position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: 'bold' }}>{cartCount}</span>
            )}
          </Link>
          <Link to="/wishlist" className="wishlist-link-global"><i className="fa-regular fa-heart"></i></Link>

          <div className="profile-dropdown-container-global" ref={dropdownRef}>
            {auth.currentUser ? (
              <>
                <div className="profile-link-global" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                  <img src={auth.currentUser.photoURL || "/images/profile.jpg"} alt="Profile" className="profile-pic" />
                </div>
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown-global">
                    <Link to="/profile" className="dropdown-item-global profile-button-global" onClick={() => setIsProfileDropdownOpen(false)}>
                      <i className="fa-solid fa-user"></i> Profile
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item-global logout-btn-global">
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="profile-link-global"><i className="fa-regular fa-user"></i></Link>
            )}
          </div>
        </div>
        
        <i className="fa-solid fa-bars bars" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{cursor: 'pointer'}}></i>
      </nav>
    </header>
  );
};

export default Header;