import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} NoteSwift - Personal Notes Manager</p>
        <p className="student-info">Developed by Rayen - CPI2 Project</p>
      </div>
    </footer>
  );
};

export default Footer;
