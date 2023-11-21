// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Use Link to navigate back to the home page ("/") */}
      <Link to="/" className='header-link'>
        <h1>Micro OJ</h1>
      </Link>
    </header>
  );
};

export default Header;

