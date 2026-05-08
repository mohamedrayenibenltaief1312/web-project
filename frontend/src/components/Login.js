import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Import our "Phone Line"
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To show "Email or password wrong"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // 1. Send the data to Laravel
      const response = await api.post('/login', { email, password });
      
      // 2. If Laravel says OK, we get the token
      const token = response.data.token;
      
      // 3. Tell App.js to log us in
      onLogin(token);
    } catch (err) {
      // 4. If Laravel says ERROR, show the message
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        <h2 className="title">Login to NoteSwift</h2>
        
        {/* Show error message if login fails */}
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
