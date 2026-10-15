import React from 'react';
import OutfitCard from '../components/OutfitCard';
import { ChevronLeft, ChevronRight, SparklesIcon } from '../components/Icons';

import heroOutfitImg from '../assets/hero_outfit.jpg';
import casualDayImg from '../assets/outfit_casual_day.jpg';
import partyLookImg from '../assets/outfit_party_look.jpg';
import officeWearImg from '../assets/outfit_office_wear.jpg';

const occasions = ['Casual', 'College', 'Office', 'Party'];

const otherSuggestions = [
  { id: 1, title: 'Casual Day', image: casualDayImg, category: 'Casual' },
  { id: 2, title: 'Party Look', image: partyLookImg, category: 'Party' },
  { id: 3, title: 'Office Wear', image: officeWearImg, category: 'Office' },
];

const SmartMatcher = () => {
  return (
    <div className="page-container smart-matcher-page">
      {/* Top Section: Controls on Left, Large Coordinated Preview on Right */}
      <div className="matcher-top-layout">
        {/* Left Controls Column (Visual options) */}
        <div className="matcher-controls-col">
          <div className="matcher-heading-block">
            <h1 className="page-title">Smart Outfit Matcher</h1>
            <p className="page-subtitle">
              Get AI-style outfit suggestions from your wardrobe.
            </p>
          </div>

          <div className="occasion-selector-block">
            <label className="section-sublabel">Select Occasion</label>
            <div className="occasion-pill-group">
              {occasions.map((occ, idx) => (
                <button
                  key={occ}
                  type="button"
                  className={`occasion-pill-btn ${idx === 0 ? 'active' : ''}`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          <div className="matcher-action-row">
            <button type="button" className="btn btn-primary btn-generate-outfits">
              <SparklesIcon size={18} />
              <span>Generate Outfits</span>
            </button>
          </div>
        </div>

        {/* Right Preview Column: Large Coordinated Outfit Flat-lay with Arrows & Dots */}
        <div className="matcher-preview-col">
          <div className="matcher-carousel-wrapper">
            <button 
              type="button"
              className="carousel-nav-btn prev-btn" 
              aria-label="Previous outfit suggestion"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="matcher-preview-card">
              <img 
                src={heroOutfitImg} 
                alt="Coordinated Minimalist Chic" 
                className="matcher-preview-img"
              />
            </div>

            <button 
              type="button"
              className="carousel-nav-btn next-btn" 
              aria-label="Next outfit suggestion"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="carousel-dots-row">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={`carousel-dot ${idx === 0 ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Other Suggestions Section */}
      <section className="matcher-suggestions-section">
        <h2 className="dashboard-section-heading">Other Suggestions</h2>
        <div className="cards-grid-3">
          {otherSuggestions.map((item) => (
            <OutfitCard
              key={item.id}
              title={item.title}
              image={item.image}
              category={item.category}
              showMenu={true}
              showHeart={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SmartMatcher;
