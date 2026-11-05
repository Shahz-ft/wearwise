import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LeafLogo, ChevronDown } from "./Icons";
import ModeToggle from "./ModeToggle";
import avatarShahz from "../assets/avatar_shahz.jpg";

const Navbar = ({ variant }) => {
  const location = useLocation();
  const isHome = variant === "home" || location.pathname === "/";

  return (
    <header className={`wearwise-navbar ${isHome ? "home-navbar" : "app-navbar"}`}>
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
          <Link to="/" className="home-nav-link active">
            Home
          </Link>
          <a href="#features" className="home-nav-link">
            Features
          </a>
          <a href="#how-it-works" className="home-nav-link">
            About
          </a>
        </nav>
      )}

      {/* Right Controls: Theme Toggle + User Profile */}
      <div className="navbar-right">
        {/* Theme Mode Toggle (Sun/Moon) */}
        <ModeToggle />
        {/* Shahz Profile Visual Only (No notification icon) */}
        <Link
  to="/settings"
  className="user-profile-badge"
  aria-label="Open Settings"
>
  <img
    src={avatarShahz}
    alt="Profile"
    className="user-avatar-img"
  />
  <span className="user-name">Shahz</span>
  <span className="dropdown-caret">
    <ChevronDown size={14} />
  </span>
</Link>
      </div>
    </header>
  );
};

export default Navbar;
