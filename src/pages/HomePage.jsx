import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useCart } from '../context/CartContext';
import booksData from '../data/books.json';
import { getUserProfile, hasCustomProfile } from '../data/userProfiles';
import toast from 'react-hot-toast';
import "swiper/css";
import "../styles/home.css";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("/images/profile.jpg");
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [suggestions, setSuggestions] = useState([]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // PRIORITY 1: Check userProfiles.js
        if (hasCustomProfile(currentUser.uid)) {
          const customProfile = getUserProfile(currentUser.uid);
          setProfilePhoto(customProfile.photoURL);
        } else {
          // PRIORITY 2: Check Firestore
          try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists() && userDocSnap.data().photoURL) {
              setProfilePhoto(userDocSnap.data().photoURL);
            } else {
              // PRIORITY 3: Default profile picture
              setProfilePhoto("/images/profile0.jpg");
            }
          } catch (error) {
            console.error("Error fetching profile photo:", error);
            setProfilePhoto("/images/profile0.jpg");
          }
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?query=${searchQuery.trim()}`);
      setSuggestions([]);
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const isSearchablePage = location.pathname.includes('/books') || location.pathname.includes('/categories');
    if (isSearchablePage) {
      const newParams = {};
      const currentCategory = searchParams.get('category');
      if (currentCategory) newParams.category = currentCategory;
      if (query.trim().length > 0) newParams.query = query;
      setSearchParams(newParams);
    }
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

  const handleWishlistNav = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login to view your wishlist");
      navigate('/login');
    }
  };

  useEffect(() => {
    const urlQuery = searchParams.get('query');
    setSearchQuery(urlQuery || '');
  }, [searchParams]);

  useEffect(() => {
    const handleShadow = () => {
      const header = document.querySelector("#navbar");
      if (!header) return;
      if (window.scrollY >= 50) {
        header.classList.add("shadow-header");
      } else {
        header.classList.remove("shadow-header");
      }
    };
    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll animations with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");

          // Add stagger effect to children
          const children = entry.target.querySelectorAll('.category, .advantage');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('in-view');
            }, index * 150);
          });
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".categories, .pros, .help");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsProfileDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
          <i className="fa-solid fa-times"></i>
        </button>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-home"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-th"></i>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-info-circle"></i>
              About Biblios
            </Link>
          </li>
        </ul>
        <div className="mobile-menu-search">
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="mobile-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input
              type="search"
              placeholder="Search for books..."
              id="mobile-search"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className="mobile-menu-actions">
          <Link
            to="/cart"
            className="mobile-menu-action-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fa-solid fa-shopping-cart"></i>
            Cart
            {cartCount > 0 && (
              <span className="cart-badge-mobile">{cartCount}</span>
            )}
          </Link>

          <Link
            to="/wishlist"
            className="mobile-menu-action-btn"
            onClick={(e) => {
              handleWishlistNav(e);
              setIsMenuOpen(false);
            }}
          >
            <i className="fa-regular fa-heart"></i>
            Wishlist
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="mobile-menu-action-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-user"></i>
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="mobile-menu-action-btn"
                style={{ border: '1px solid #d32f2f', color: '#d32f2f' }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mobile-menu-action-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa-regular fa-user"></i>
              Login
            </Link>
          )}
        </div>
      </div>

      <header id="header">
        <nav id="navbar" className="homenav">
          <div className="logo-container-home">
            <Link to="/">
              <img src="/images/logo2.png" alt="Biblios Logo" />
            </Link>
          </div>
          <ul className={`menu ${isMenuOpen ? "active" : ""}`}>
            <li>
              <Link to="/"><span className="floating-shine">Home</span></Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/about">About Biblios</Link>
            </li>
          </ul>
          <div className="right-home">
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
                  onChange={handleInputChange}
                />
              </form>
              {suggestions.length > 0 && (
                <ul className="suggestions-list" style={{
                  position: 'absolute', top: '120%', left: '0', zIndex: 100, backgroundColor: 'white',
                  border: '1px solid #ddd', borderRadius: '4px', width: '100%', maxHeight: '200px',
                  overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', listStyle: 'none', padding: '0', margin: '0', textAlign: 'left'
                }}>
                  {suggestions.map((book) => (
                    <li
                      key={book.id}
                      onClick={() => handleSuggestionClick(book)}
                      style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '11px', color: '#333', fontFamily: 'Merri' }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = '#f4f4f4'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <strong>{book.title}</strong> by {book.author}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link className="cart-container-home" to="/cart">
              <img src="/images/shopping-cart.png" alt="cart" />
              {cartCount > 0 && (
                <span className="cart-badge-home">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/wishlist"
              className="wishlist-link"
              onClick={handleWishlistNav}
            >
              <i className="fa-regular fa-heart"></i>
            </Link>
            <div className="profile-dropdown-container" ref={dropdownRef}>
              {user ? (
                <>
                  <div
                    className="profile-link"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="profile-pic"
                    />
                  </div>
                  {isProfileDropdownOpen && (
                    <div className="profile-dropdown">
                      <Link
                        to="/profile"
                        className="dropdown-item profile-button"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <i className="fa-solid fa-user"></i> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout-btn"
                      >
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="profile-link">
                  <i className="fa-regular fa-user"></i>
                </Link>
              )}
            </div>
          </div>
          <i
            className="fa-solid fa-bars bars"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ cursor: "pointer" }}
          ></i>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <div className="hero-container">
          <div className="hero" id="hero">
            <div className="text">
              <h1>Biblios</h1>
              <h2>Stories in Every Form.</h2>
              <button className="cta-btn" onClick={() => navigate('/books')}>Explore Books</button>
            </div>
            <div className="books">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                spaceBetween={-24}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{ 1220: { spaceBetween: -32 } }}
                className="home-swiper"
              >
                <SwiperSlide className="home-article">
                  <img
                    src="../../public/images/NotesFromUnderground.jpeg"
                    alt="notes from underground"
                    className="home-img"
                  />
                </SwiperSlide>
                <SwiperSlide className="home-article">
                  <img
                    src="../../public/images/CrimeAndPunishment.jpeg"
                    alt="crime and punishment"
                    className="home-img"
                  />
                </SwiperSlide>
                <SwiperSlide className="home-article">
                  <img
                    src="../../public/images/TheIdiot.jpeg"
                    alt="the myth of sisyphus"
                    className="home-img"
                  />
                </SwiperSlide>
                <SwiperSlide className="home-article">
                  <img
                    src="../../public/images/TheDoubleAndTheGambler.jpeg"
                    alt="the fall"
                    className="home-img"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        {/* CATEGORIES SECTION */}
        <div className="categories">
          <h2>Featured Categories</h2>
          <div className="category-container">
            <div
              className="category"
              onClick={() => navigate('/books?category=Classics')}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon-container">
                <i className="fa-solid fa-book"></i>
              </div>
              <h4>Classical Literature</h4>
              <p>Timeless works from ancient Greece and Rome.</p>
            </div>
            <div
              className="category"
              onClick={() => navigate('/books')}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon-container">
                <i className="fa-solid fa-headphones"></i>
              </div>
              <h4>Audiobooks</h4>
              <p>Listen to your favorite stories on the go.</p>
            </div>
            <div
              className="category"
              onClick={() => navigate('/books?category=Philosophy')}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon-container">
                <i className="fa-solid fa-question"></i>
              </div>
              <h4>Philosophy</h4>
              <p>Delve into profound thoughts and ideas.</p>
            </div>
            <div
              className="category"
              onClick={() => navigate('/books?category=Fiction')}
              style={{ cursor: 'pointer' }}
            >
              <div className="icon-container">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h4>Modern Fiction</h4>
              <p>Contemporary narratives and compelling tales.</p>
            </div>
          </div>
        </div>

        {/* PROS SECTION */}
        <div className="pros">
          <div className="pattern-container"></div>
          <h2>Why Choose Biblios?</h2>
          <div className="advantage-container">
            <div className="advantage">
              <div className="icon-container">
                <i className="fa-solid fa-user-check"></i>
              </div>
              <h4>Curated Collections</h4>
              <p>Expertly selected books for the discerning reader.</p>
            </div>
            <div className="advantage">
              <div className="icon-container">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h4>Scholarly Resources</h4>
              <p>Access a wealth of knowledge and academic texts.</p>
            </div>
            <div className="advantage">
              <div className="icon-container">
                <i className="fa-solid fa-book"></i>
              </div>
              <h4>Modern Reading Experience</h4>
              <p>Seamless navigation and intuitive design for all devices.</p>
            </div>
          </div>
        </div>

        {/* HELP FORM */}
        <div className="help">
          <div className="text">
            <h2>Help us to improve!</h2>
            <p>
              Your feedback is greatly appreciated and assists us in our
              continual improvement.
            </p>
          </div>
          <form className="home-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <textarea
              name="message"
              placeholder="Let us know your comment!"
              required
            ></textarea>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </main>

      <footer className="homefooter">
        <ul>
          <li>
            <Link to="#">Explore</Link>
          </li>
          <li>
            <Link to="#">Company</Link>
          </li>
          <li>
            <Link to="#">Legal</Link>
          </li>
        </ul>
        <ul className="social-home">
          <li>
            <a href="#">
              <img src="/images/facebook.png" alt="facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/images/twitter.png" alt="x" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/images/instagram.png" alt="instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/images/linkedin2.png" alt="linkedin" />
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default HomePage;