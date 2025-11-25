import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';
// Ensure Font Awesome is available in your project, e.g., via CDN in index.html
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Just for testing the look
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login button clicked! (Logic coming soon)");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form-card">
        <h2>Welcome Back</h2>
        <p>Please login to continue your journey</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper" style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ paddingRight: '40px', width: '100%' }} // Add padding for the icon
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-pass" style={{ textAlign: 'right', marginBottom: '15px' }}>
            <Link to="#" style={{ color: '#006A8A', fontSize: '14px', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          <button type="submit" className="btn login-btn">Login</button>
          
          {/* Create Account Link */}
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#333' }}>
            Don't have an account? <Link to="/register" style={{ color: '#006A8A', fontWeight: 'bold', textDecoration: 'none' }}>Create new account</Link>
          </div>

          {/* Back to Home Link */}
          <p style={{marginTop: '20px'}}>
            <Link to="/" style={{color: '#006A8A', textDecoration: 'none'}}>Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;