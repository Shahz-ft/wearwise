import React from 'react';
import { Link } from 'react-router-dom';
import { LeafLogo, InstagramIcon, TwitterIcon, PinterestIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="wearwise-footer">
      <div className="footer-container">
        {/* Left: Brand Logo */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <LeafLogo size={22} />
            <span className="footer-brand-name">WearWise</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <a href="#features" className="footer-link">Features</a>
          <a href="#how-it-works" className="footer-link">About</a>
        </div>

        {/* Right: Social Media Handles & Copyright */}
        <div className="footer-right">
          <div className="footer-social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
              <InstagramIcon size={17} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
              <TwitterIcon size={17} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Pinterest">
              <PinterestIcon size={17} />
            </a>
          </div>
          <p className="footer-copyright">
            © 2026 WearWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
