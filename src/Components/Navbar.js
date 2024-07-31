import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName }) => {
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
        <div className="profile-photo">
          {userName ? userName.charAt(0).toUpperCase() : 'NA'}
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Your Profile</Link>
            <Link to="/settings">Settings</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
