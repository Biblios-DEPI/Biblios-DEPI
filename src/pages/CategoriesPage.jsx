import React from 'react';
import { Link } from 'react-router-dom';
// Assuming a shared CSS file or the style is covered by the existing book-details.css/global styles

const categories = [
  { name: 'Classics', description: 'Timeless works of literature, from ancient epics to foundational novels.', image: '/images/CLASSICS.png' },
  { name: 'Philosophy', description: 'Explore fundamental truths about existence, knowledge, values, and reason.', image: '/images/PLATO.png' },
  { name: 'Dystopian', description: 'Societies suffering from oppressive control, often serving as cautionary tales.', image: '/images/1984.png' },
  { name: 'Fiction', description: 'A broad range of imaginative narratives that are not based strictly on fact.', image: '/images/fiction_sample.png' },
  { name: 'Mystery', description: 'Books centered around a crime or enigma, solved by a detective or investigator.', image: '/images/mystery_sample.png' },
  { name: 'All', description: 'Browse the entire collection of 80 carefully curated books.', image: '/images/ALL_BOOKS.png' },
];

// Note: I'm adapting the structure slightly to look good with the existing 'container' and 'related-grid' styles.

const CategoriesPage = () => {
  // Define a simple style to visually align with the main accent color
  const PRIMARY_COLOR = '#006A8A';

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="main-title" style={{ fontSize: '40px', color: PRIMARY_COLOR }}>Book Categories</h2>
        <p className="sub-text" style={{ maxWidth: '600px', margin: '10px auto', fontSize: '18px' }}>
          Discover your next read by exploring our hand-picked collections.
        </p>
        <hr className="gradient-hr" />
      </header>

      {/* Reusing the 'related-grid' class for a consistent card layout */}
      <div className="related-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        {categories.map(category => (
          // TASK C: The link now points to the filtered books page
          <Link 
            key={category.name} 
            to={`/books?category=${category.name}`} 
            className="related-item" 
            style={{ 
              textDecoration: 'none', 
              border: `1px solid #eee`, 
              borderRadius: '8px', 
              transition: 'transform 0.2s, box-shadow 0.2s',
              overflow: 'hidden',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
            // Added simple hover effect for better UX
            onMouseOver={(e) => { 
                e.currentTarget.style.transform = 'translateY(-5px)'; 
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{ padding: '20px' }}>
              <img 
                src={category.image} 
                alt={category.name} 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover', 
                  borderRadius: '4px',
                  marginBottom: '15px'
                }} 
              />
              <h4 className="main-title" style={{ fontSize: '20px', color: PRIMARY_COLOR, marginBottom: '5px' }}>
                {category.name}
              </h4>
              <p className="sub-text" style={{ color: '#666', fontSize: '14px' }}>
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;