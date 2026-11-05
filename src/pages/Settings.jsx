
import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, LeafLogo } from '../components/Icons';
import { getProfile, updateProfile } from '../services/AllAPIs';
import { toast } from 'react-toastify';
import avatarShahz from '../assets/avatar_shahz.jpg';

const Settings = () => {
  const [name, setName] = useState('Shahz');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(avatarShahz);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  const handleThemeChange = (isDark) => {
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  };

  useEffect(() => {
  loadProfile();
}, []);

  const loadProfile = async () => {
  const response = await getProfile();

  if (response.status === 200) {
    setName(response.data.name || '');
    setEmail(response.data.email || '');
    setProfilePic(response.data.profilePic || avatarShahz);
  }
};

const handleProfilePicChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith('image/')) {
    toast.error('Please select an image file.');
    return;
  }

  if (file.size > 500 * 1024) {
    toast.error('Please choose an image smaller than 500 KB.');
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    setProfilePic(reader.result);
  };

  reader.readAsDataURL(file);
};

const handleSaveProfile = async () => {
  if (!name.trim()) {
    toast.info('Please enter your name.');
    return;
  }

  const response = await updateProfile({
    name: name.trim(),
    email: email.trim(),
    profilePic:
      profilePic === avatarShahz ? '' : profilePic,
  });

  if (response.status === 200) {
    toast.success('Profile updated successfully!');
  } else {
    toast.error('Failed to update profile.');
  }
};

  return (
    <div className="page-container settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Manage your profile and application preferences.
        </p>
      </div>

      <div className="settings-content-stack">

        {/* Profile Section */}
        <div className="settings-card">
          <h2 className="settings-section-title">Profile Details</h2>
          <p className="settings-section-desc">
            Update your personal details for WearWise.
          </p>

<div className="profile-picture-section">
  <img
    src={profilePic}
    alt="Profile"
    className="settings-profile-picture"
  />

  <div className="profile-picture-actions">
    <label htmlFor="profile-pic-input" className="btn btn-secondary">
      Change Photo
    </label>

    <input
      id="profile-pic-input"
      type="file"
      accept="image/*"
      hidden
      onChange={handleProfilePicChange}
    />

    <p>Choose a photo for your profile.</p>
  </div>
</div>

          <div className="profile-form">
            <label htmlFor="profile-name">Name</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label htmlFor="profile-email">Email (optional)</label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
             <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveProfile}>
                Save Profile
              </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="settings-card">
          <h2 className="settings-section-title">Appearance</h2>
          <p className="settings-section-desc">
            Choose your preferred color theme.
          </p>

          <div className="theme-options-grid">
            <div
              className={`theme-card ${!darkMode ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => handleThemeChange(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleThemeChange(false);
                }
              }}
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

            <div
              className={`theme-card ${darkMode ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => handleThemeChange(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleThemeChange(true);
                }
              }}
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
                <span className="theme-card-tag">
                  Deep Forest & Charcoal
                </span>
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
              <p className="about-version">Version 1.0.0</p>
            </div>
          </div>

          <p className="about-description">
            WearWise is your smart digital wardrobe companion, designed to
            help you organize your clothing collection, discover outfit
            combinations, and express your personal style every day.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Settings;
