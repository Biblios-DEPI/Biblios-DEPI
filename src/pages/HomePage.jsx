import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { useState } from 'react';

// Import Styles
import 'swiper/css';
import '../styles/home.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ========== SHADOW HEADER EFFECT ==========
  useEffect(() => {
    const handleShadow = () => {
      const header = document.querySelector('#navbar');
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

  return (
    <>
    <header id="header">
      <nav id="navbar" className='homenav'>
        <div className="logo-container-home">
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

        <div className="right-home">
          <form action="">
            <label htmlFor="search-book">
                <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input type="search" placeholder="Search for books..." id="search-book" />
          </form>
          <Link className="cart-container-home" to="/cart">
            <img src="/images/shopping-cart.png" alt="cart" />
            {/* <i class="fa-solid fa-cart-shopping"></i> */}
          </Link>
          
          {/* Profile Picture Link */}
          <Link to="/profile" className="profile-link">
            <i class="fa-regular fa-user"></i>
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
    <main>
      {/* HERO SECTION */}
      <div className="hero-container">
        <div className="hero" id="hero">
          <div className="text">
            <h1>Biblios</h1>
            <h2>Stories in Every Form.</h2>
            <button className="cta-btn">Explore Books</button>
          </div>

          <div className="books">
            {/* ========== REACT SWIPER ========== */}
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
                <img src="/images/book1.jpg" alt="book1" className="home-img" />
              </SwiperSlide>

              <SwiperSlide className="home-article">
                <img src="/images/book2.jpg" alt="book2" className="home-img" />
              </SwiperSlide>

              <SwiperSlide className="home-article">
                <img src="/images/book3.jpg" alt="book3" className="home-img" />
              </SwiperSlide>

              <SwiperSlide className="home-article">
                <img src="/images/book4.jpg" alt="book4" className="home-img" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="categories">
        <h2>Featured Categories</h2>
        <div className="category-container">
          <div className="category">
            <div className="icon-container"><i className="fa-solid fa-book"></i></div>
            <h4>Classical Literature</h4>
            <p>Timeless works from ancient Greece and Rome.</p>
          </div>
          <div className="category">
            <div className="icon-container"><i className="fa-solid fa-headphones"></i></div>
            <h4>Audiobooks</h4>
            <p>Listen to your favorite stories on the go.</p>
          </div>
          <div className="category">
            <div className="icon-container"><i className="fa-solid fa-question"></i></div>
            <h4>Philosophy</h4>
            <p>Delve into profound thoughts and ideas.</p>
          </div>
          <div className="category">
            <div className="icon-container"><i className="fa-solid fa-lightbulb"></i></div>
            <h4>Modern Fiction</h4>
            <p>Contemporary narratives and compelling tales.</p>
          </div>
        </div>
      </div>

      {/* PROS SECTION */}
      <div className="pros">
        <div className="pattern-container">
           {/* ACTION: Save your SVG code into public/images/pattern.svg */}
        </div>
        <h2>Why Choose Biblios?</h2>
        <div className="advantage-container">
          <div className="advantage">
            <div className="icon-container"><i className="fa-solid fa-user-check"></i></div>
            <h4>Curated Collections</h4>
            <p>Expertly selected books for the discerning reader.</p>
          </div>
          <div className="advantage">
            <div className="icon-container"><i className="fa-solid fa-leaf"></i></div>
            <h4>Scholarly Resources</h4>
            <p>Access a wealth of knowledge and academic texts.</p>
          </div>
          <div className="advantage">
            <div className="icon-container"><i className="fa-solid fa-book"></i></div>
            <h4>Modern Reading Experience</h4>
            <p>Seamless navigation and intuitive design for all devices.</p>
          </div>
        </div>
      </div>

      {/* HELP FORM */}
      <div className="help">
        <div className="text">
          <h2>Help us to improve!</h2>
          <p>Your feedback is greatly appreciated and assists us in our continual improvement.</p>
        </div>
        {/* React handles form submission differently, added preventDefault for now */}
        <form className="home-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" name="email" placeholder="Enter your email address" required />
          <textarea name="message" placeholder="Let us know your comment!" required></textarea>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </main>
    <footer className='homefooter'>
      <ul>
        <li><Link to="#">Explore</Link></li>
        <li><Link to="#">Company</Link></li>
        <li><Link to="#">Legal</Link></li>
      </ul>
      <ul className="social-home">
        {/* Ensure these exist in public/images/ */}
        <li><a href="#"><img src="/images/facebook.png" alt="facebook" /></a></li>
        <li><a href="#"><img src="/images/twitter.png" alt="x" /></a></li>
        <li><a href="#"><img src="/images/instagram.png" alt="instagram" /></a></li>
        <li><a href="#"><img src="/images/linkedin2.png" alt="linkedin" /></a></li>
      </ul>
    </footer>
    </>
  );
};

export default HomePage;