import React from 'react';
import './Footer.css';
import facebook from './../Images/facebook.png';
import instagram from './../Images/instagram.png';
import email from './../Images/email.png';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="social-icons">
            <a href="#facebook" className="social-icon"><img src={facebook}/></a>
            <a href="#mail" className="social-icon"><img src={email}/></a>
            <a href="#instagram" className="social-icon"><img src={instagram}/></a>
        </div>
        <div className="copyright">
            <p>© 2024, Group18</p>
        </div>
    </footer>
  );
};

export default Footer;
