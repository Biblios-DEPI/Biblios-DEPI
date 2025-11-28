import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, hasCustomProfile } from '../data/userProfiles';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Check if user has a custom hardcoded profile
        if (hasCustomProfile(currentUser.uid)) {
          const customProfile = getUserProfile(currentUser.uid);
          setProfile(customProfile);
        } else {
          // Default profile (your original data)
          setProfile({
            displayName: "Beshoy Fomail",
            username: "@beshoy-13",
            bio: '"I think therefore I am"',
            email: "beshoyfomail@biblios.com",
            joinedDate: "November 2024",
            location: "Cairo, Egypt",
            photoURL: "../../public/images/profile.jpg",
            stats: {
              booksRead: 42,
              reviews: 18,
              following: 127,
              followers: 89
            },
            favoriteBooks: [
              {
                id: 1,
                title: "Metamorphosis",
                author: "Franz Kafka",
                cover: "../../public/images/metamorphosis.jpg"
              },
              {
                id: 2,
                title: "A Clockwork Orange",
                author: "Anthony Burgess",
                cover: "../../public/images/AClockworkOrange.jpg"
              },
              {
                id: 3,
                title: "Harry Potter and the prisoner of Azkaban",
                author: "J.K. Rowling",
                cover: "../../public/images/harryPotter.jpg"
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
            ]
          });
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="profile-page">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-book-open"></i>
              <span>Biblios</span>
            </div>
          </div>
        </header>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          fontSize: '18px',
          color: '#006A8A'
        }}>
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) return null;

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
                    src={profile.photoURL}
                    alt="Profile"
                  />
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-name-section">
                  <div className="name-bio">
                    <h1 className="display-name">{profile.displayName}</h1>
                    <p className="username">{profile.username}</p>
                  </div>
                  <button className="edit-button">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bio">
              <p>{profile.bio}</p>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>{profile.email}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-calendar"></i>
                <span>Joined {profile.joinedDate}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">{profile.stats.booksRead}</div>
                <div className="stat-label">Books Read</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.stats.reviews}</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.stats.following}</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.stats.followers}</div>
                <div className="stat-label">Followers</div>
              </div>
            </div>

            {/* UID Display (Developer Info) */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <details style={{ cursor: 'pointer' }}>
                <summary style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-gray)',
                  fontWeight: '500',
                  userSelect: 'none'
                }}>
                  <i className="fas fa-code" style={{ marginRight: '0.5rem' }}></i>
                  Developer Info
                </summary>
                <div style={{
                  marginTop: '0.75rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem'
                }}>
                  <p style={{
                    color: '#666',
                    marginBottom: '0.5rem',
                    wordBreak: 'break-all'
                  }}>
                    <strong>User UID:</strong> {user?.uid}
                  </p>
                  <p style={{
                    color: hasCustomProfile(user?.uid) ? '#10b981' : '#f59e0b',
                    fontSize: '0.7rem'
                  }}>
                    {hasCustomProfile(user?.uid)
                      ? '✓ Custom profile loaded from userProfiles.js'
                      : '⚠ Using default profile (add this UID to userProfiles.js for custom data)'}
                  </p>
                </div>
              </details>
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
            {profile.favoriteBooks.map(book => (
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