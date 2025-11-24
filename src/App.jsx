import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
// Note: We removed 'all.css' because you are using the CDN link in index.html
import './styles/global.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages (IMPORT THE REAL FILES HERE)
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';             // <--- Real File
import BookDetailsPage from './pages/BookDetailsPage'; // <--- Real File
import LoginPage from './pages/LoginPage';
import CategoriesPage from './pages/CategoriesPage';
import BooksPage from './pages/BooksPage';

function App() {
  return (
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;