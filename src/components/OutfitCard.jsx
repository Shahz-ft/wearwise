import React from "react";
import { MoreVerticalIcon, HeartIcon } from "./Icons";

const OutfitCard = ({
  title,
  image,
  items = [],
  category,
  isFavorite = false,
  showHeart = false,
  showMenu = true,
  onClick,
  onFavorite,
}) => {
  return (
    <div className="outfit-card" onClick={onClick}>
      <div className="outfit-card-image-box">
        {showHeart ? (
          <button
            type="button"
            className={`card-heart-btn ${isFavorite ? "is-fav" : ""}`}
            aria-label={
              isFavorite ? "Remove from favourites" : "Add to favourites"
            }
            onClick={(e) => {
              e.stopPropagation();
              onFavorite && onFavorite();
            }}
          >
            <HeartIcon
              size={17}
              filled={isFavorite}
              color={isFavorite ? "#E06D53" : "currentColor"}
            />
          </button>
        ) : showMenu ? (
          <button type="button" className="card-more-btn" aria-label="Options">
            <MoreVerticalIcon size={16} />
          </button>
        ) : null}

        {items.filter((item) => item.image).length > 0 ? (
          <div
            className={`saved-outfit-preview ${
              items.filter((item) => item.image).length === 1
                ? "single-outfit"
                : items.filter((item) => item.image).length === 2
                  ? "two-item-outfit"
                  : items.filter((item) => item.image).length === 3
                    ? "three-item-outfit"
                    : "multi-item-outfit"
            }`}
          >
            {items
              .filter((item) => item.image)
              .map((item, index) => (
                <img
                  key={item.id ?? index}
                  src={item.image}
                  alt={item.name || title}
                  className="saved-outfit-img"
                  loading="lazy"
                />
              ))}
          </div>
        ) : (
          <div className="saved-outfit-preview single-outfit">
            <img
              src={image}
              alt={title}
              className="saved-outfit-img"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="outfit-card-info">
        <h4 className="outfit-card-title">{title}</h4>
        {category && <span className="outfit-card-category">{category}</span>}
      </div>
    </div>
  );
};

export default OutfitCard;
