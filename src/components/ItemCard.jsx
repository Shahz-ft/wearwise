
import React, { useState } from 'react';
import { MoreVerticalIcon } from './Icons';

const ItemCard = ({ title, category, image, onClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="clothing-card" onClick={onClick}>
      <div className="clothing-card-image-box">
        <button
          type="button"
          className="card-more-btn"
          aria-label="Options"
          aria-expanded={menuOpen}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <MoreVerticalIcon size={16} />
        </button>

        {menuOpen && (
          <div
            className="card-options-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={() => setMenuOpen(false)}>
              ✏️ Edit
            </button>

            <button
              type="button"
              className="delete-option"
              onClick={() => setMenuOpen(false)}
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <img
          src={image}
          alt={title}
          className="clothing-card-img"
          loading="lazy"
        />
      </div>

      <div className="clothing-card-info">
        <h4 className="clothing-card-title">{title}</h4>
        <span className="clothing-card-category">{category}</span>
      </div>
    </div>
  );
};

export default ItemCard;
