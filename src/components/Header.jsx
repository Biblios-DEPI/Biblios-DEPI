import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header id="header">
      <nav id="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src="/images/logo2.png" alt="Biblios Logo" />
          </Link>
        </div>
        
        {/* Menu Links with Mobile Toggle Logic */}
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About Biblios</Link></li>
        </ul>

        <div className="right">
          <form action="">
            <label htmlFor="search-book">
                <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input type="search" placeholder="Search for books..." id="search-book" />
          </form>
          <Link className="cart-container" to="/cart">
            <img src="/images/shopping-cart.png" alt="cart" />
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
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