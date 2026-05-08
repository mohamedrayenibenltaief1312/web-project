import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // Import our "Phone Line" to Laravel
import './Register.css';

const Register = () => {
  // States for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  // State for error messages from the backend
  const [errors, setErrors] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null); // Reset errors before trying
    
    // 1. Basic client-side check
    if (password !== passwordConfirmation) {
      setErrors({ password: ["Passwords do not match!"] });
      return;
    }

    try {
      // 2. Send the registration request to Laravel
      await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation // Laravel expects this name for validation
      });

      // 3. If successful, tell the user and move to login
      alert("Registration successful! You can now login.");
      navigate('/login');
    } catch (err) {
      // 4. If Laravel finds errors (e.g. email already exists), we catch them
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="card">
        <h2 className="title" style={{color: 'var(--success-color)'}}>Create Account</h2>
        
        {/* Helper to show errors if they exist */}
        {errors && (
          <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
            {Object.values(errors).map((errGroup, index) => (
              <p key={index} style={{ color: 'red', fontSize: '0.8rem', margin: '2px 0' }}>
                • {errGroup[0]}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login" style={{color: 'var(--success-color)'}}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
