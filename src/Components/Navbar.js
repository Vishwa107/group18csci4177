import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <a href='/'>
        <div className="navbar-logo">Uni101</div>
      </a>
      <div className='menu-items'>
        <ul>
          <li>
            <Link to="/2">FAQs</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-profile" onClick={toggleDropdown}>
        <div className="profile-photo">VP</div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <a href="/">Your Profile</a>
            <a href="/">Settings</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
