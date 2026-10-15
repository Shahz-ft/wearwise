import React from 'react';
import OutfitCard from '../components/OutfitCard';

// Outfit collage images
import casualDayImg from '../assets/outfit_casual_day.jpg';
import collegeLookImg from '../assets/outfit_college_look.jpg';
import officeWearImg from '../assets/outfit_office_wear.jpg';
import partyLookImg from '../assets/outfit_party_look.jpg';
import brunchLookImg from '../assets/outfit_brunch_look.jpg';
import travelOutfitImg from '../assets/outfit_travel_outfit.jpg';

const savedOutfitsList = [
  { id: 1, title: 'Casual Day', category: 'Casual', image: casualDayImg, isFavorite: true },
  { id: 2, title: 'College Look', category: 'College', image: collegeLookImg, isFavorite: false },
  { id: 3, title: 'Office Wear', category: 'Office', image: officeWearImg, isFavorite: true },
  { id: 4, title: 'Party Look', category: 'Party', image: partyLookImg, isFavorite: true },
  { id: 5, title: 'Brunch Look', category: 'Casual', image: brunchLookImg, isFavorite: false },
  { id: 6, title: 'Travel Outfit', category: 'Casual', image: travelOutfitImg, isFavorite: true },
];

const SavedOutfits = () => {
  const filterTabs = ['All', 'Casual', 'College', 'Office', 'Party', 'Favourite'];

  return (
    <div className="page-container saved-outfits-page">
      {/* Header Row */}
      <div className="saved-header-row">
        <h1 className="page-title">Saved Outfits</h1>
        <button type="button" className="btn btn-primary btn-save-current">
          <span>+ Save Current Outfit</span>
        </button>
      </div>

      {/* Filter Tabs Bar (Visual controls) */}
      <div className="saved-filter-bar">
        <div className="category-pill-group">
          {filterTabs.map((tab, idx) => (
            <button
              key={tab}
              type="button"
              className={`category-pill-btn ${idx === 0 ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Outfits Grid */}
      <div className="saved-outfits-grid">
        {savedOutfitsList.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            title={outfit.title}
            image={outfit.image}
            isFavorite={outfit.isFavorite}
            showHeart={true}
            showMenu={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedOutfits;
