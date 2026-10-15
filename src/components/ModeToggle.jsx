import React from 'react';
import { MoonIcon } from './Icons';

const ModeToggle = ({ variant = 'icon', className = '' }) => {
  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        className={`sidebar-nav-item mode-toggle-sidebar ${className}`}
        aria-label="Dark mode toggle placeholder"
      >
        <span className="nav-icon">
          <MoonIcon size={20} />
        </span>
        <span className="nav-label">Dark Mode</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`theme-icon-btn ${className}`}
      aria-label="Dark mode toggle placeholder"
    >
      <MoonIcon size={19} />
    </button>
  );
};

export default ModeToggle;
