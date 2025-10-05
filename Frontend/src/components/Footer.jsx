import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-middle padzo">
        <div className="container footer-content">
          <div className="footer-about">
            <h3>Siddhi Collection </h3>
            <p>Your destination for the latest fashion trends.  
               High-quality garments for women & kids at great prices.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Info</h4>
            <p>📍 Kedgaon road Ahmadnagar</p>
            <p>📞 +91 9876543210</p>
            <p>✉️abcd@store.com</p>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Siddhi Collection. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
