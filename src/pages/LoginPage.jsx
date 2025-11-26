import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Attempt to Sign In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);

      // 2. Redirect to Home on success
      navigate('/'); 

    } catch (err) {
      console.error(err.code);
      // 3. Handle Login Errors
      if (err.code === 'auth/invalid-credential') { 
        // Note: Firebase recently changed generic errors to 'invalid-credential' for security
        setError("Incorrect email or password.");
      } else {
        setError("Failed to login. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form-card">
        <h2>Welcome Back</h2>
        <p>Please login to continue your journey</p>
        
        {/* Error Message Display */}
        {error && <div style={{color: 'red', marginBottom: '10px', fontSize: '14px', textAlign: 'center'}}>{error}</div>}

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
                style={{ paddingRight: '40px', width: '100%' }}
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

          <div className="forgot-pass" style={{ textAlign: 'right', marginBottom: '15px' }}>
            <Link to="#" style={{ color: '#006A8A', fontSize: '14px', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>

          <button type="submit" className="btn login-btn">Login</button>
          
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#333' }}>
            Don't have an account? <Link to="/register" style={{ color: '#006A8A', fontWeight: 'bold', textDecoration: 'none' }}>Create new account</Link>
          </div>

          <p style={{marginTop: '20px'}}>
            <Link to="/" style={{color: '#006A8A', textDecoration: 'none'}}>Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;