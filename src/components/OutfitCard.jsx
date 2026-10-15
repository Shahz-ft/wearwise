import React from 'react';
import { MoreVerticalIcon, HeartIcon } from './Icons';

const OutfitCard = ({ 
  title, 
  image, 
  category, 
  isFavorite = false, 
  showHeart = false,
  showMenu = true,
  onClick 
}) => {
  return (
    <div className="outfit-card" onClick={onClick}>
      <div className="outfit-card-image-box">
        {showHeart ? (
          <button 
            type="button"
            className={`card-heart-btn ${isFavorite ? 'is-fav' : ''}`}
            aria-label="Favourite status"
          >
            <HeartIcon 
              size={17} 
              filled={isFavorite} 
              color={isFavorite ? "#E06D53" : "currentColor"} 
            />
          </button>
        ) : showMenu ? (
          <button 
            type="button"
            className="card-more-btn" 
            aria-label="Options"
          >
            <MoreVerticalIcon size={16} />
          </button>
        ) : null}

        <img 
          src={image} 
          alt={title} 
          className="outfit-card-img"
          loading="lazy"
        />
      </div>
      <div className="outfit-card-info">
        <h4 className="outfit-card-title">{title}</h4>
        {category && <span className="outfit-card-category">{category}</span>}
      </div>
    </div>
  );
};

export default OutfitCard;
