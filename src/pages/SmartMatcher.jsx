import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OutfitCard from "../components/OutfitCard";
import { getItems, addOutfit, getOutfits } from "../services/AllAPIs";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  SparklesIcon,
  HeartIcon,
} from "../components/Icons";

import heroOutfitImg from "../assets/hero_outfit.jpg";

const occasions = ["Casual", "College", "Office", "Party"];

const SmartMatcher = () => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState("Casual");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [generatedOutfits, setGeneratedOutfits] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favoriteOutfits, setFavoriteOutfits] = useState([]);

  useEffect(() => {
    getWardrobeItems();
  }, []);

  const getWardrobeItems = async () => {
    try {
      const apiResponse = await getItems();

      if (apiResponse.status === 200) {
        setWardrobeItems(apiResponse.data);
      } else {
        toast.error("Failed to get wardrobe items");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get wardrobe items");
    }
  };

  const onGenerateClick = () => {
    const occasionStyles = {
      Casual: ["casual"],
      College: ["casual", "chic"],
      Office: ["formal", "minimalist"],
      Party: ["party", "chic"],
    };

    const allowedStyles = occasionStyles[selectedOccasion];

    const matches = wardrobeItems.filter((item) =>
      allowedStyles.includes((item.style || "").toLowerCase()),
    );

    const tops = matches.filter((item) => item.category === "Tops");
    const bottoms = matches.filter((item) => item.category === "Bottoms");
    const shoes = matches.filter((item) => item.category === "Shoes");
    const accessories = matches.filter(
      (item) => item.category === "Accessories",
    );
    const dresses = matches.filter((item) => item.category === "Dresses");

    const outfits = [];

    // Combine tops and bottoms
    tops.forEach((top) => {
      bottoms.forEach((bottom) => {
        const outfit = [top, bottom];

        if (shoes.length > 0) outfit.push(shoes[0]);
        if (accessories.length > 0) outfit.push(accessories[0]);

        outfits.push(outfit);
      });
    });

    // Create outfits with dresses
    dresses.forEach((dress) => {
      const outfit = [dress];

      if (shoes.length > 0) outfit.push(shoes[0]);
      if (accessories.length > 0) outfit.push(accessories[0]);

      outfits.push(outfit);
    });

    setGeneratedOutfits(outfits);
    setCurrentSlide(0);
    setHasGenerated(true);

    if (outfits.length === 0) {
      toast.info("Add matching clothes to generate an outfit.");
    }
  };

  const handleNext = () => {
    if (generatedOutfits.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % generatedOutfits.length);
    }
  };

  const handlePrevious = () => {
    if (generatedOutfits.length > 0) {
      setCurrentSlide(
        (prev) =>
          (prev - 1 + generatedOutfits.length) % generatedOutfits.length,
      );
    }
  };

  const currentOutfit = generatedOutfits[currentSlide] || [];

  const onFavoriteClick = async () => {
    if (currentOutfit.length === 0) {
      toast.info("Generate an outfit first.");
      return;
    }

    // Create a unique key for this outfit combination
    const outfitKey = currentOutfit
      .map((item) => item.id)
      .sort()
      .join("-");

    try {
      // Check favourites already saved in JSON Server
      const response = await getOutfits();

      if (response.status === 200) {
        const savedOutfits = response.data;

        const alreadySaved = savedOutfits.some((outfit) => {
          const savedKey = outfit.items
            .map((item) => item.id)
            .sort()
            .join("-");

          return savedKey === outfitKey;
        });

        if (alreadySaved) {
          toast.info("This outfit is already in favourites!");
          setFavoriteOutfits((prev) =>
            prev.includes(outfitKey) ? prev : [...prev, outfitKey],
          );
          return;
        }

        const outfitData = {
          title: `${selectedOccasion} Look`,
          category: selectedOccasion,
          items: currentOutfit,
          isFavorite: true,
        };

        const apiResponse = await addOutfit(outfitData);

        if (apiResponse.status === 201) {
          setFavoriteOutfits((prev) =>
            prev.includes(outfitKey) ? prev : [...prev, outfitKey],
          );

          toast.success("Outfit added to favourites!");
        } else {
          toast.error("Failed to save outfit.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save outfit.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="page-container smart-matcher-page">
      <div className="matcher-top-layout">
        <div className="matcher-controls-col">
          <div className="matcher-heading-block">
            <h1 className="page-title">Smart Outfit Matcher</h1>
            <p className="page-subtitle">
              Get outfit suggestions from your wardrobe.
            </p>
          </div>

          <div className="occasion-selector-block">
            <label className="section-sublabel">Select Occasion</label>

            <div className="occasion-pill-group">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  className={`occasion-pill-btn ${
                    selectedOccasion === occ ? "active" : ""
                  }`}
                  onClick={() => setSelectedOccasion(occ)}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          <div className="matcher-action-row">
            <button
              type="button"
              className="btn btn-primary btn-generate-outfits"
              onClick={onGenerateClick}
            >
              <SparklesIcon size={18} />
              <span>Generate Outfits</span>
            </button>
          </div>
        </div>

        <div className="matcher-preview-col">
          <div className="matcher-carousel-wrapper">
            <button
              type="button"
              className="carousel-nav-btn prev-btn"
              aria-label="Previous outfit suggestion"
              onClick={handlePrevious}
              disabled={generatedOutfits.length < 2}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="matcher-preview-card">
              {currentOutfit.length > 0 ? (
                <div className="generated-outfit-preview">
                  {currentOutfit.map((item) =>
                    item.image ? (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        className="matcher-preview-img"
                      />
                    ) : null,
                  )}
                </div>
              ) : (
                <div className="image-placeholder matcher-empty-preview">
                  <img
                    src={heroOutfitImg}
                    alt="Outfit inspiration"
                    className="matcher-hero-img"
                  />
                  <span>Select an occasion and generate an outfit</span>
                </div>
              )}

              {currentOutfit.length > 0 && (
                <button
                  type="button"
                  className={`card-heart-btn ${
                    favoriteOutfits.includes(
                      currentOutfit.map((item) => item.id).join("-"),
                    )
                      ? "is-fav"
                      : ""
                  }`}
                  onClick={onFavoriteClick}
                  aria-label="Add outfit to favourites"
                >
                  <HeartIcon
                    size={20}
                    filled={favoriteOutfits.includes(
                      currentOutfit.map((item) => item.id).join("-"),
                    )}
                    color={
                      favoriteOutfits.includes(
                        currentOutfit.map((item) => item.id).join("-"),
                      )
                        ? "#E06D53"
                        : "currentColor"
                    }
                  />
                </button>
              )}
            </div>

            <button
              type="button"
              className="carousel-nav-btn next-btn"
              aria-label="Next outfit suggestion"
              onClick={handleNext}
              disabled={generatedOutfits.length < 2}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="carousel-dots-row">
            {generatedOutfits.map((outfit, idx) => (
              <span
                key={idx}
                className={`carousel-dot ${
                  idx === currentSlide ? "active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {hasGenerated && (
        <section className="matcher-suggestions-section">
          <h2 className="dashboard-section-heading">
            Outfits for {selectedOccasion}
          </h2>

          {currentOutfit.length > 0 ? (
            <div className="cards-grid-3">
              {currentOutfit.map((item) => (
                <div className="clothing-card" key={item.id}>
                  <div className="clothing-card-image-box">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="image-placeholder">
                        <span>No image uploaded</span>
                      </div>
                    )}
                  </div>

                  <div className="clothing-card-info">
                    <h3 className="clothing-card-title">{item.name}</h3>
                    <p className="clothing-card-category">
                      {item.category} · {item.style}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No complete outfits found. Try another occasion or add matching
              clothes to your wardrobe.
            </p>
          )}
        </section>
      )}

      <section className="create-own-outfit-section">
        <div className="create-own-outfit-content">
          <p className="create-own-eyebrow">YOUR STYLE, YOUR WAY</p>

          <h2>Want to create your own look?</h2>

          <p>
            Mix, match, and experiment with pieces from your wardrobe to create
            an outfit that's uniquely yours.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/outfit-studio")}
          >
            Create Your Own Outfit
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SmartMatcher;
