import React from 'react';
import { ChevronLeft, ChevronRight, CloseIcon } from '../components/Icons';

// Item thumbnails
import greenSweaterImg from '../assets/item_green_sweater.jpg';
import whiteShirtImg from '../assets/item_white_shirt.jpg';
import blackTeeImg from '../assets/item_black_tee.jpg';
import stripedShirtImg from '../assets/item_striped_shirt.jpg';
import beigeTrousersImg from '../assets/item_beige_trousers.jpg';
import whiteSneakersImg from '../assets/item_white_sneakers.jpg';
import beigeBagImg from '../assets/item_beige_bag.jpg';
import heroOutfitImg from '../assets/hero_outfit.jpg';

const categories = ['Tops', 'Bottoms', 'Shoes', 'Accessories'];

const stripThumbnails = [
  { id: 't1', name: 'Green Sweater', image: greenSweaterImg },
  { id: 't2', name: 'White Shirt', image: whiteShirtImg },
  { id: 't3', name: 'Black Tee', image: blackTeeImg },
  { id: 't4', name: 'Striped Top', image: stripedShirtImg },
];

const selectedPieces = [
  { slot: 'Top', name: 'Top', image: greenSweaterImg },
  { slot: 'Bottom', name: 'Bottom', image: beigeTrousersImg },
  { slot: 'Shoes', name: 'Shoes', image: whiteSneakersImg },
  { slot: 'Accessory', name: 'Accessory', image: beigeBagImg }
];

const OutfitStudio = () => {
  return (
    <div className="page-container outfit-studio-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Outfit Studio</h1>
        <p className="page-subtitle">Create your own outfit by selecting items.</p>
      </div>

      {/* Top Filter Tabs for Strip (Visual controls) */}
      <div className="studio-category-tabs">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            type="button"
            className={`studio-tab-btn ${idx === 0 ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Horizontal Strip of Selectable Clothing Thumbnails */}
      <div className="studio-strip-container">
        <button 
          type="button"
          className="strip-nav-btn prev"
          aria-label="Previous thumbnails"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="studio-thumbnails-strip">
          {stripThumbnails.map((item) => (
            <div 
              key={item.id} 
              className="strip-thumbnail-card"
              role="button"
              tabIndex={0}
            >
              <img src={item.image} alt={item.name} className="strip-thumbnail-img" />
            </div>
          ))}
        </div>

        <button 
          type="button"
          className="strip-nav-btn next"
          aria-label="Next thumbnails"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Main Studio Canvas: 2 Columns (Center Preview + Right Selected Pieces) */}
      <div className="studio-canvas-layout">
        {/* Central Outfit Preview */}
        <div className="studio-preview-col">
          <div className="studio-canvas-preview-card">
            <button 
              type="button"
              className="canvas-arrow-btn prev" 
              aria-label="Previous view"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="studio-outfit-stage">
              <img 
                src={heroOutfitImg} 
                alt="Coordinated Outfit Preview" 
                className="studio-composed-img"
              />
            </div>

            <button 
              type="button"
              className="canvas-arrow-btn next" 
              aria-label="Next view"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots-row">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={`carousel-dot ${idx === 0 ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Selected Outfit Pieces List */}
        <div className="studio-selected-col">
          <div className="selected-pieces-list">
            {selectedPieces.map((piece) => (
              <div key={piece.slot} className="selected-piece-row">
                <div className="piece-thumb-box">
                  <img src={piece.image} alt={piece.slot} className="piece-thumb-img" />
                </div>
                <span className="piece-slot-label">{piece.slot}</span>
                <button 
                  type="button"
                  className="piece-remove-btn" 
                  aria-label={`Remove ${piece.slot}`}
                >
                  <CloseIcon size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="studio-actions-row">
            <button 
              type="button" 
              className="btn btn-secondary btn-clear"
            >
              Clear All
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-save"
            >
              Save Outfit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitStudio;
