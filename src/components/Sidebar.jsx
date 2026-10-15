import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LeafLogo,
  DashboardIcon,
  WardrobeIcon,
  StudioIcon,
  SmartMatchIcon,
  SavedIcon,
  SettingsIcon,
  CloseIcon
} from './Icons';
import ModeToggle from './ModeToggle';

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    { name: 'My Wardrobe', path: '/wardrobe', icon: WardrobeIcon, extraPaths: ['/add-item'] },
    { name: 'Outfit Studio', path: '/outfit-studio', icon: StudioIcon },
    { name: 'Saved Outfits', path: '/saved-outfits', icon: SavedIcon },
    { name: 'Smart Matcher', path: '/smart-matcher', icon: SmartMatchIcon },
  ];

  return (
    <aside className="wearwise-sidebar">
      {/* Top Brand Logo */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <LeafLogo size={24} />
          </span>
          <span className="sidebar-brand-title">WearWise</span>
        </Link>

        {/* Mobile close button (preserved as visual control) */}
        <button
          type="button"
          className="sidebar-mobile-close"
          aria-label="Close sidebar"
        >
          <CloseIcon size={18} />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="sidebar-nav">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.extraPaths && item.extraPaths.includes(location.pathname));

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">
                <Icon size={19} />
              </span>
              <span className="nav-label">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section: Settings & Dark Mode Toggle */}
      <div className="sidebar-footer">
        <NavLink
          to="/settings"
          className={`sidebar-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <span className="nav-icon">
            <SettingsIcon size={19} />
          </span>
          <span className="nav-label">Settings</span>
        </NavLink>

        <ModeToggle variant="sidebar" />
      </div>
    </aside>
  );
};

export default Sidebar;
