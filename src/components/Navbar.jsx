import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="brand">Expense Tracker</Link>
        <Link to="/dashboard" className="btn">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
