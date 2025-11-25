import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

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

// Missing Pages (Commented out until you create them)
import CategoriesPage from './pages/CategoriesPage';
import BooksPage from './pages/BooksPage';
import RegisterPage from './pages/RegisterPage';
// import ContactPage from './pages/ContactPage';
// import CheckoutPage from './pages/CheckoutPage';


// 1. Layout Component
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
    /* <AuthProvider>  <-- REMOVED: Because you don't have the context yet */
      <Router>
        <div className="page">
          <Routes>
            
            {/* GROUP 1: Pages WITH Header & Footer */}
            <Route element={<MainLayout />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/book-details/:id" element={<BookDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              
              {/* These are commented out to prevent crashing */}
              {/* <Route path="/categories" element={<CategoriesPage />} /> */}
              <Route path="/categories" element={<BooksPage />} />
              {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
              {/* <Route path="/contact" element={<ContactPage />} /> */}
            </Route>

            {/* GROUP 2: Pages WITHOUT Header & Footer (Clean) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/" element={<HomePage />} />

          </Routes>
        </div>
      </Router>
    /* </AuthProvider> <-- REMOVED */
  );
}

export default App;