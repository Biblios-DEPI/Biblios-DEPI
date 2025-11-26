import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebase'; // Import auth from your config file
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import '../styles/register.css'; 

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState(''); // To show error messages to user
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // 2. Create User in Firebase
      // This sends the data to Google. If successful, it logs them in automatically.
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // 3. Update the user's "Display Name" (since Firebase auth only takes email/pass by default)
      await updateProfile(user, {
        displayName: formData.name
      });

      console.log("Account Created:", user);
      
      // 4. Redirect to Home Page (or Login Page)
      navigate('/'); 

    } catch (err) {
      // 5. Handle Errors (Interview Tip: Always handle errors gracefully)
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
        <h2>Create Account</h2>
        <p>Join Biblios to start your reading journey</p>
        
        {/* Display Error Message if it exists */}
        {error && <div style={{color: 'red', marginBottom: '10px', fontSize: '14px'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* ... KEEP YOUR EXISTING INPUTS EXACTLY AS THEY WERE ... */}
          {/* I am omitting the inputs here to save space, but keep your Row 1 and Row 2 code exactly the same */}
           
           {/* Just ensure the inputs use the handleChange and values defined above */}
           <div className="form-row">
             <div className="form-group form-col">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
             </div>
             <div className="form-group form-col">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
             </div>
           </div>

           <div className="form-row">
             <div className="form-group form-col">
                <label>Password</label>
                <div className="password-wrapper">
                    <input type={showPassword ? "text" : "password"} name="password" placeholder="********" value={formData.password} onChange={handleChange} required />
                    <button type="button" className="password-toggle-icon" onClick={togglePasswordVisibility}>
                        <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                    </button>
                </div>
             </div>
             <div className="form-group form-col">
                <label>Confirm Password</label>
                <div className="password-wrapper">
                    <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required />
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