import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import api from './api';
import './App.css';

function App() {
  // We check if a token exists in the "locker" (localStorage) to stay logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Function called when login is successful
  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Save the wristband
    setIsLoggedIn(true);
  };

  // Function called for logout
  const handleLogout = async () => {
    try {
      // 1. Tell Laravel to destroy the token
      await api.post('/logout');
    } catch (err) {
      console.log("Logout from server failed or was already unauthorized");
    }
    
    // 2. Clear local storage and state regardless of server response
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/notes" />} 
            />
            
            <Route 
              path="/register" 
              element={!isLoggedIn ? <Register /> : <Navigate to="/notes" />} 
            />

            <Route 
              path="/notes" 
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
            />

            <Route path="*" element={<Navigate to="/notes" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
