import React from 'react';
import { SunIcon, MoonIcon, LeafLogo } from '../components/Icons';

const Settings = () => {
  return (
    <div className="page-container settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your visual preferences and application settings.</p>
      </div>

      <div className="settings-content-stack">
        {/* Appearance Section */}
        <div className="settings-card">
          <h2 className="settings-section-title">Appearance</h2>
          <p className="settings-section-desc">
            Choose your preferred color theme for the WearWise interface.
          </p>

          <div className="theme-options-grid">
            {/* Light Mode Card - Static visual selected */}
            <div 
              className="theme-card selected"
              role="button"
              tabIndex={0}
            >
              <div className="theme-card-preview light-preview">
                <div className="preview-sidebar light-sidebar-sample"></div>
                <div className="preview-body light-body-sample">
                  <div className="preview-item"></div>
                  <div className="preview-item"></div>
                </div>
              </div>
              <div className="theme-card-info">
                <div className="theme-card-title-row">
                  <SunIcon size={18} />
                  <span className="theme-card-name">Light Mode</span>
                </div>
                <span className="theme-card-tag">Warm Beige & Sage</span>
              </div>
            </div>

            {/* Dark Mode Card - Static visual option */}
            <div 
              className="theme-card"
              role="button"
              tabIndex={0}
            >
              <div className="theme-card-preview dark-preview">
                <div className="preview-sidebar dark-sidebar-sample"></div>
                <div className="preview-body dark-body-sample">
                  <div className="preview-item"></div>
                  <div className="preview-item"></div>
                </div>
              </div>
              <div className="theme-card-info">
                <div className="theme-card-title-row">
                  <MoonIcon size={18} />
                  <span className="theme-card-name">Dark Mode</span>
                </div>
                <span className="theme-card-tag">Deep Forest & Charcoal</span>
              </div>
            </div>
          </div>
        </div>

        {/* About WearWise Section */}
        <div className="settings-card">
          <div className="about-header-row">
            <div className="about-logo-wrapper">
              <LeafLogo size={28} />
            </div>
            <div>
              <h2 className="settings-section-title">About WearWise</h2>
              <p className="about-version">Version 1.0.0 (Build 2026.07)</p>
            </div>
          </div>
          <p className="about-description">
            WearWise is your smart digital wardrobe companion, designed to help you organize your clothing collection, discover curated outfit combinations, and curate effortless style every single day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
