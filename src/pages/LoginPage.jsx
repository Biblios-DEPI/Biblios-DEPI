import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login button clicked! (Logic coming soon)");
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
            <input 
              type="password" 
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* 1. Forgot Password Link */}
          <div className="forgot-pass">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn login-btn">Login</button>
          
          {/* 2. Create Account Link */}
          <div className="register-link">
            <span>Don't have an account?</span>
            <Link to="/register">Create new account</Link>
          </div>

          <p style={{marginTop: '20px', fontSize: '12px'}}>
            <Link to="/" style={{color: '#888', textDecoration: 'none'}}>← Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;