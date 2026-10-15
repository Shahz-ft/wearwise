import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ArrowRight, 
  WardrobeIcon, 
  UserIcon, 
  SparklesIcon, 
  CalendarIcon, 
  HeartIcon, 
  SavedIcon 
} from '../components/Icons';
import heroOutfitImg from '../assets/hero_outfit.jpg';

const Home = () => {
  return (
    <div className="home-page-wrapper">
      {/* Public Home Navigation */}
      <Navbar variant="home" />

      {/* Main Hero Section */}
      <section className="home-hero-section">
        <div className="hero-content-col">
          <span className="hero-eyebrow">YOUR STYLE, YOUR STORY</span>
          <h1 className="hero-main-title">
            Your Wardrobe<br />
            Smarter, Every Day.
          </h1>
          <p className="hero-subtitle">
            Organize your clothes, create stylish outfits and never run out of ideas.
          </p>
          <div className="hero-cta-group">
            <Link to="/dashboard" className="btn btn-primary btn-hero">
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="hero-image-col">
          <div className="hero-image-card">
            <img 
              src={heroOutfitImg} 
              alt="Flat-lay outfit with green sweater, cream shirt, beige trousers, white sneakers and handbag" 
              className="hero-flatlay-img"
            />
          </div>
        </div>
      </section>

      {/* 4 Feature Highlights Row + Script Tag */}
      <section id="features" className="home-features-bar">
        <div className="features-grid">
          <div className="feature-pill-card">
            <div className="feature-pill-icon">
              <WardrobeIcon size={20} />
            </div>
            <div className="feature-pill-text">
              <h4 className="feature-pill-title">Organize</h4>
              <p className="feature-pill-desc">Your Closet</p>
            </div>
          </div>

          <div className="feature-pill-card">
            <div className="feature-pill-icon">
              <UserIcon size={20} />
            </div>
            <div className="feature-pill-text">
              <h4 className="feature-pill-title">Create</h4>
              <p className="feature-pill-desc">Outfits</p>
            </div>
          </div>

          <div className="feature-pill-card">
            <div className="feature-pill-icon">
              <SparklesIcon size={20} />
            </div>
            <div className="feature-pill-text">
              <h4 className="feature-pill-title">Get Smart</h4>
              <p className="feature-pill-desc">Suggestions</p>
            </div>
          </div>

          <div className="feature-pill-card">
            <div className="feature-pill-icon">
              <CalendarIcon size={20} />
            </div>
            <div className="feature-pill-text">
              <h4 className="feature-pill-title">Look Good</h4>
              <p className="feature-pill-desc">Every Day</p>
            </div>
          </div>
        </div>

        {/* Playful Script Typography Badge matching reference */}
        <div className="hero-script-badge" aria-hidden="true">
          <span>Style</span>
          <span>Plan</span>
          <span>Wear</span>
          <span>Repeat ♡</span>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <h2 className="section-title text-center">How It Works</h2>

        <div className="steps-flow-container">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-icon-bubble">
              <HeartIcon size={24} />
            </div>
            <h3 className="step-title">1. Add Your Items</h3>
            <p className="step-description">
              Upload photos of your clothes, shoes and accessories.
            </p>
          </div>

          {/* Arrow */}
          <div className="step-connector-arrow">
            <ArrowRight size={22} />
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-icon-bubble">
              <SparklesIcon size={24} />
            </div>
            <h3 className="step-title">2. Get Suggestions</h3>
            <p className="step-description">
              Receive outfit ideas based on your style and occasion.
            </p>
          </div>

          {/* Arrow */}
          <div className="step-connector-arrow">
            <ArrowRight size={22} />
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-icon-bubble">
              <SavedIcon size={24} />
            </div>
            <h3 className="step-title">3. Save Your Looks</h3>
            <p className="step-description">
              Keep your favourite outfits for later.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
