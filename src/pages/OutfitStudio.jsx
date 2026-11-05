import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getItems, addOutfit } from "../services/AllAPIs";
import { ChevronLeft, ChevronRight, CloseIcon } from "../components/Icons";
import { useNavigate } from "react-router-dom";

import heroOutfitImg from "../assets/hero_outfit.jpg";

const OutfitStudio = () => {
  const categories = ["Tops", "Bottoms", "Dresses", "Shoes", "Accessories"];

  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tops");
  const [selectedPieces, setSelectedPieces] = useState([]);

  const [outfitTitle, setOutfitTitle] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("Casual");

  const occasions = ["Casual", "College", "Office", "Party"];
  useEffect(() => {
    loadWardrobeItems();
  }, []);

  const loadWardrobeItems = async () => {
    try {
      const response = await getItems();

      if (response.status === 200) {
        setWardrobeItems(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load wardrobe items.");
    }
  };

  const filteredItems = wardrobeItems.filter(
    (item) => item.category === selectedCategory,
  );

  const handleSelectItem = (item) => {
    const alreadySelected = selectedPieces.some(
      (piece) => piece.id === item.id,
    );

    if (alreadySelected) {
      toast.info("This item is already selected.");
      return;
    }

    setSelectedPieces((prev) => [...prev, item]);
  };

  const handleRemoveItem = (id) => {
    setSelectedPieces((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setSelectedPieces([]);
  };

  const navigate = useNavigate();

  const handleSaveOutfit = async () => {
    if (selectedPieces.length === 0) {
      toast.info("Please select items before saving.");
      return;
    }

    if (!outfitTitle.trim()) {
      toast.info("Please enter an outfit name.");
      return;
    }

    const outfitData = {
      title: outfitTitle.trim(),
      category: selectedOccasion,
      items: selectedPieces,
      isFavorite: false,
    };

    try {
      const response = await addOutfit(outfitData);

      if (response.status === 201) {
        toast.success("Outfit saved successfully!");
        navigate("/saved-outfits");
      } else {
        toast.error("Failed to save outfit.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save outfit.");
    }
  };

  return (
    <div className="page-container outfit-studio-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Outfit Studio</h1>
        <p className="page-subtitle">
          Create your own outfit by selecting items.
        </p>
      </div>

      {/* Top Filter Tabs for Strip (Visual controls) */}

      <div className="studio-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`studio-tab-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="strip-thumbnail-card"
                role="button"
                tabIndex={0}
                onClick={() => handleSelectItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectItem(item);
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="strip-thumbnail-img"
                />
              </div>
            ))
          ) : (
            <p>No items in this category yet.</p>
          )}
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
            <div className="studio-outfit-stage">
              {selectedPieces.length > 0 ? (
                <div className="studio-composed-items">
                  {selectedPieces.map((item) => (
                    <div key={item.id} className="studio-composed-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="studio-composed-img"
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <img
                  src={heroOutfitImg}
                  alt="Select clothes to create an outfit"
                  className="studio-composed-img"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Outfit Pieces List */}
        <div className="studio-selected-col">
          <div className="selected-pieces-list">
            {selectedPieces.map((piece) => (
              <div key={piece.id} className="selected-piece-row">
                <div className="piece-thumb-box">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="piece-thumb-img"
                  />
                </div>

                <span className="piece-slot-label">{piece.name}</span>

                <button
                  type="button"
                  className="piece-remove-btn"
                  aria-label={`Remove ${piece.name}`}
                  onClick={() => handleRemoveItem(piece.id)}
                >
                  <CloseIcon size={14} />
                </button>
              </div>
            ))}

            {selectedPieces.length === 0 && (
              <p>Select clothes from the strip to build your outfit.</p>
            )}
          </div>

          <div className="studio-save-details">
            <input
              type="text"
              placeholder="Enter outfit name"
              value={outfitTitle}
              onChange={(e) => setOutfitTitle(e.target.value)}
            />

            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
            >
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="studio-actions-row">
            <button
              type="button"
              className="btn btn-secondary btn-clear"
              onClick={handleClearAll}
            >
              Clear All
            </button>

            <button
              type="button"
              className="btn btn-primary btn-save"
              onClick={handleSaveOutfit}
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
