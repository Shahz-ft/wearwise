import React, { useState } from "react";
import { MoonIcon } from "./Icons";

const ModeToggle = ({ variant = "icon", className = "" }) => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const handleToggle = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  if (variant === "sidebar") {
    return (
      <button
        type="button"
        className={`sidebar-nav-item mode-toggle-sidebar ${className}`}
        onClick={handleToggle}
      >
        <span className="nav-icon">
          <MoonIcon size={20} />
        </span>
        <span className="nav-label">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`theme-icon-btn ${className}`}
      onClick={handleToggle}
      aria-label="Toggle dark mode"
    >
      <MoonIcon size={19} />
    </button>
  );
};

export default ModeToggle;
