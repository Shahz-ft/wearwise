import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LeafLogo, SearchIcon, ChevronDown } from './Icons';
import ModeToggle from './ModeToggle';
import avatarShahz from '../assets/avatar_shahz.jpg';

const Navbar = ({ variant }) => {
  const location = useLocation();
  const isHome = variant === 'home' || location.pathname === '/';

  return (
    <header className={`wearwise-navbar ${isHome ? 'home-navbar' : 'app-navbar'}`}>
      {/* Mobile toggle button (preserved as visual control on app pages) */}
      {!isHome && (
        <button 
          type="button"
          className="mobile-sidebar-toggle" 
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}

      {/* Brand logo only shown on Home navbar (App pages have it in the sidebar) */}
      {isHome && (
        <Link to="/" className="brand-logo" aria-label="WearWise Home">
          <span className="brand-icon-wrapper">
            <LeafLogo size={24} />
          </span>
          <span className="brand-title">WearWise</span>
        </Link>
      )}

      {/* Center Nav Links on Home */}
      {isHome && (
        <nav className="home-nav-links">
          <Link to="/" className="home-nav-link active">Home</Link>
          <a href="#features" className="home-nav-link">Features</a>
          <a href="#how-it-works" className="home-nav-link">About</a>
        </nav>
      )}

      {/* Right Controls: Search + Theme Toggle + User Profile */}
      <div className="navbar-right">
        {/* Search Field */}
        <div className="navbar-search">
          <span className="search-icon-wrapper">
            <SearchIcon size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search..." 
            className="navbar-search-input"
            aria-label="Search"
          />
        </div>

        {/* Theme Mode Toggle (Sun/Moon) */}
        <ModeToggle />

        {/* Shahz Profile Visual Only (No notification icon) */}
        <div className="user-profile-badge" tabIndex={0} role="button" aria-label="User Profile Shahz">
          <img 
            src={avatarShahz} 
            alt="Shahz profile" 
            className="user-avatar-img"
          />
          <span className="user-name">Shahz</span>
          <span className="dropdown-caret">
            <ChevronDown size={14} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
