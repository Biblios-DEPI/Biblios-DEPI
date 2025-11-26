import React from 'react';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const favoriteBooks = [
    {
      id: 1,
      title: "Metamorphosis",
      author: "Franz Kafka",
      cover: "../../public/images/metamorphosis.jpg"
    },
    {
      id: 2,
      title: "Harry Potter and the prisoner of Azkaban",
      author: "J.K. Rowling",
      cover: "../../public/images/harryPotter.jpg"
    },
    {
      id: 3,
      title: "A Clockwork Orange",
      author: "Anthony Burgess",
      cover: "../../public/images/AClockworkOrange.jpg"
    },
    {
      id: 4,
      title: "Hunger Games",
      author: "Suzanne Collins",
      cover: "../../public/images/hungerGames.jpg"
    },
    {
      id: 5,
      title: "1984",
      author: "george orwell",
      cover: "../../public/images/1984.jpg"
    }
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-book-open"></i>
            <span>Biblios</span>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          {/* Cover Banner */}
          <div className="cover-banner"></div>

          {/* Profile Info */}
          <div className="profile-content">
            {/* Profile Picture */}
            <div className="profile-header">
              <div className="profile-picture-wrapper">
                <div className="profile-picture">
                  <img 
                    src="../../public/images/profile.jpg" 
                    alt="Profile"
                  />
                </div>
              </div>
              
              <div className="profile-info">
                <div className="profile-name-section">
                  <div className="name-bio">
                    <h1 className="display-name">Beshoy Fomail</h1>
                    <p className="username">@beshoy-13</p>
                  </div>
                  <button className="edit-button">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bio">
              <p>"I think therefore I am"</p>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>beshoyfomail@biblios.com</span>
              </div>
              <div className="info-item">
                <i className="fas fa-calendar"></i>
                <span>Joined November 2024</span>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Cairo, Egypt</span>
              </div>
            </div>

            {/* Stats */}
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">42</div>
                <div className="stat-label">Books Read</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">18</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">127</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">89</div>
                <div className="stat-label">Followers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="favorites-section">
          <div className="favorites-header">
            <h2>
              <i className="fas fa-heart"></i>
              Favorite Books
            </h2>
          </div>
          
          <div className="favorites-grid">
            {favoriteBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}