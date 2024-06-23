import React, { useState } from 'react';
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