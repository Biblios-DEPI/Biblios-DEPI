import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/register.css'; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // New State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration logic coming soon!");
  };

  // Helper function to toggle the state
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form-card register-card">
        <h2>Create Account</h2>
        <p>Join Biblios to start your reading journey</p>
        
        <form onSubmit={handleSubmit}>
          
          {/* Row 1: Name & Email */}
          <div className="form-row">
            <div className="form-group form-col">
                <label>Full Name</label>
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
                <label>Email Address</label>
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

          {/* Row 2: Password & Confirm */}
          <div className="form-row">
            
            {/* PASSWORD FIELD */}
            <div className="form-group form-col">
                <label>Password</label>
                <div className="password-wrapper">
                    <input 
                    /* Dynamic Type: text or password */
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    />
                    {/* The Eye Icon Button */}
                    <button 
                        type="button" 
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                    >
                        {/* Conditional Icon: Eye or Eye Slash */}
                        <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                    </button>
                </div>
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="form-group form-col">
                <label>Confirm Password</label>
                <div className="password-wrapper">
                    <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                    />
                    {/* No icon here usually, or you can add another one with its own state */}
                </div>
            </div>
          </div>

          <button type="submit" className="btn login-btn">Sign Up</button>
          
          <div className="register-link">
            <span>Already have an account?</span>
            <Link to="/login">Login here</Link>
          </div>

          <p style={{marginTop: '20px', fontSize: '12px'}}>
            <Link to="/" style={{color: '#888', textDecoration: 'none'}}>← Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;