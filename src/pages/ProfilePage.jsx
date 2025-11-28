import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, hasCustomProfile } from '../data/userProfiles';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(''); // Track where data came from
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // PRIORITY 1: Check if user has custom hardcoded profile in userProfiles.js
        if (hasCustomProfile(currentUser.uid)) {
          const customProfile = getUserProfile(currentUser.uid);
          setProfile(customProfile);
          setDataSource('userProfiles.js');
          setLoading(false);
          return; // Stop here, don't check Firestore
        }

        // PRIORITY 2: If no custom profile, check Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // User has profile data in Firestore
            setProfile(userDocSnap.data());
            setDataSource('Firestore');
          } else {
            // PRIORITY 3: Fallback to default profile with profile0.jpg
            setProfile({
              displayName: currentUser.displayName || "Unknown User",
              username: "@Anonymous",
              bio: '"I don\'t even have a bio yet"',
              email: currentUser.email,
              joinedDate: "Recently",
              location: "The Earth",
              photoURL: "/images/profile0.jpg",
              stats: {
                booksRead: 0,
                reviews: 0,
                following: 0,
                followers: 0
              },
              favoriteBooks: []
            });
            setDataSource('Default');
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          // Set default profile on error
          setProfile({
            displayName: "Unknown User",
            username: "@Anonymous",
            bio: '"I don\'t even have a bio yet"',
            email: currentUser.email,
            joinedDate: "Recently",
            location: "The Earth",
            photoURL: "/images/profile0.jpg",
            stats: {
              booksRead: 0,
              reviews: 0,
              following: 0,
              followers: 0
            },
            favoriteBooks: []
          });
          setDataSource('Error Fallback');
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
                    src={profile.photoURL || '/images/profile0.jpg'}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = '/images/profile0.jpg';
                    }}
                  />
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-name-section">
                  <div className="name-bio">
                    <h1 className="display-name">{profile.displayName}</h1>
                    <p className="username">{profile.username}</p>
                  </div>
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
                <div className="stat-number">{profile.stats?.booksRead || 0}</div>
                <div className="stat-label">Books Read</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.stats?.reviews || 0}</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.stats?.following || 0}</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.stats?.followers || 0}</div>
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
                    color: dataSource === 'userProfiles.js' ? '#8b5cf6' :
                      dataSource === 'Firestore' ? '#10b981' :
                        '#f59e0b',
                    fontSize: '0.7rem',
                    marginTop: '0.5rem'
                  }}>
                    {dataSource === 'userProfiles.js' && '👑 Custom profile loaded from userProfiles.js'}
                    {dataSource === 'Firestore' && '✓ Profile loaded from Firestore database'}
                    {dataSource === 'Default' && '⚠ Using default mock profile with profile0.jpg'}
                    {dataSource === 'Error Fallback' && '❌ Error loading profile, using fallback'}
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
            {profile.favoriteBooks && profile.favoriteBooks.length > 0 ? (
              profile.favoriteBooks.map(book => (
                <div key={book.id} className="book-card">
                  <div className="book-cover">
                    <img src={book.cover} alt={book.title} />
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem 1rem',
                color: '#6B7280',
                fontSize: '1.125rem'
              }}>
                <div>
                  <i className="fas fa-book" style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    opacity: 0.3,
                    display: 'block'
                  }}></i>
                  <p style={{ margin: 0 }}>No favourite books yet!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}