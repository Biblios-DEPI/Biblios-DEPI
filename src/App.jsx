// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// 1. IMPORT THE PROVIDER (Double check this path!)
import { CartProvider } from './context/CartContext'; 
import { Toaster } from 'react-hot-toast';

// Styles
import './styles/global.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import BookDetailsPage from './pages/BookDetailsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';

// Missing Pages (Commented out until you create them)
import CategoriesPage from './pages/CategoriesPage';
import BooksPage from './pages/BooksPage';
import RegisterPage from './pages/RegisterPage';

// Layout Component
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    // 2. WRAP THE ENTIRE ROUTER WITH CARTPROVIDER
    <CartProvider>
       <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <div className="page">
          <Routes>
           
            
            {/* Pages with Header/Footer (These were crashing) */}
            <Route element={<MainLayout />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/book-details/:id" element={<BookDetailsPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />  
              <Route path="/books" element={<BooksPage />} />
              <Route path="/categories" element={<BooksPage />} />
              {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
              {/* <Route path="/contact" element={<ContactPage />} /> */}
                <Route path="/books/:id" element={<BookDetailsPage />} />  
                {/* <Route path="/categories" element={<CategoriesPage />} /> */}
                <Route path="/books" element={<BooksPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />


            </Route>

            {/* Pages without Header/Footer (These were working) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/" element={<HomePage />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;