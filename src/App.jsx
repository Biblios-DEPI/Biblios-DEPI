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
import CategoriesPage from './pages/CategoriesPage';
import BooksPage from './pages/BooksPage';

// Missing Pages (Commented out until you create them)
// import CategoriesPage from './pages/CategoriesPage';
// import BooksPage from './pages/BooksPage';
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
<<<<<<< HEAD
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
              {/* <Route path="/books" element={<BooksPage />} /> */}
              {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
              {/* <Route path="/contact" element={<ContactPage />} /> */}
            </Route>
=======
    <Router>
      <div className="page">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/book-details" element={<BookDetailsPage />} />
          <Route path="/book-details/:id" element={<BookDetailsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/books" element={<BooksPage />} />
          
        </Routes>
>>>>>>> d2056e1457d7ee679eee8bc9c1c48ba85044631d

            {/* GROUP 2: Pages WITHOUT Header & Footer (Clean) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />

          </Routes>
        </div>
      </Router>
    /* </AuthProvider> <-- REMOVED */
  );
}

export default App;