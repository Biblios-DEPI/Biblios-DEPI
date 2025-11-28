import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { hasCustomProfile } from '../data/userProfiles';
import '../styles/register.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.username && !formData.username.startsWith('@')) {
      setError("Username must start with @");
      return;
    }

    try {
      // 2. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 3. Update the user's Display Name
      await updateProfile(user, {
        displayName: formData.name
      });

      // 4. IMPORTANT: Only save to Firestore if user doesn't have custom profile in userProfiles.js
      // This prevents overwriting mock/team member profiles
      if (!hasCustomProfile(user.uid)) {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: formData.name,
          username: formData.username || '@' + formData.name.toLowerCase().replace(/\s+/g, ''),
          nickname: formData.nickname || formData.name,
          email: formData.email,
          bio: formData.bio || '"I don\'t even have a bio yet"',
          location: formData.location || 'The Earth',
          photoURL: '/images/profile0.jpg', // Default profile picture
          joinedDate: new Date().toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          }),
          createdAt: new Date().toISOString(),
          stats: {
            booksRead: 0,
            reviews: 0,
            following: 0,
            followers: 0
          },
          favoriteBooks: []
        });
        console.log("✅ Profile saved to Firestore");
      } else {
        console.log("⚠️ User has custom profile in userProfiles.js - Firestore save skipped");
      }

      console.log("Account Created:", user);

      // 5. Redirect to Profile Page
      navigate('/profile');
    } catch (err) {
      console.error(err.code);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create account. Try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form-card register-card">
        {/* Favicon/Logo at top */}
        <div className="card-logo">
          <img src="/images/transparenticon.png" alt="Biblios Logo" />
        </div>
        <h2>Create Account</h2>
        <p>Join Biblios to start your reading journey</p>

        {/* Display Error Message if it exists */}
        {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Row 1: Full Name & Email */}
          <div className="form-row">
            <div className="form-group form-col">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group form-col">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Username & Nickname */}
          <div className="form-row">
            <div className="form-group form-col">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="@johndoe"
                value={formData.username}
                onChange={handleChange}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>Start with @ (optional)</small>
            </div>
            <div className="form-group form-col">
              <label>Nickname</label>
              <input
                type="text"
                name="nickname"
                placeholder="Johnny"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Bio & Location */}
          <div className="form-row">
            <div className="form-group form-col">
              <label>Bio</label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                style={{ resize: 'vertical', fontFamily: 'inherit', padding: '10px' }}
              />
            </div>
            <div className="form-group form-col">
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Cairo, Egypt"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4: Password & Confirm Password */}
          <div className="form-row">
            <div className="form-group form-col">
              <label>Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
              </div>
            </div>
            <div className="form-group form-col">
              <label>Confirm Password *</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn login-btn">Sign Up</button>

          <div className="register-link">
            <span>Already have an account?</span>
            <Link to="/login">Login here</Link>
          </div>

          <p style={{ marginTop: '20px', fontSize: '12px' }}>
            <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>← Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;