import React, { useEffect, useState } from "react";
import OutfitCard from "../components/OutfitCard";
import { getOutfits, updateOutfit } from "../services/AllAPIs";
import { toast } from "react-toastify";

const SavedOutfits = () => {
  const [savedOutfitsList, setSavedOutfitsList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterTabs = [
    "All",
    "Casual",
    "College",
    "Office",
    "Party",
    "Favourite",
  ];

   useEffect(() => {
    getSavedOutfits();
  }, []);

  // Fetch savd outfits
  const getSavedOutfits = async () => {
    try {
      let apiResponse = await getOutfits();

      if (apiResponse.status === 200) {
        setSavedOutfitsList(apiResponse.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load saved outfits.");
    }
  };

 
  // Add / remove fav
  const handleFavorite = async (outfit) => {
    const updatedFavorite = !outfit.isFavorite;

    try {
      let apiResponse = await updateOutfit(outfit.id, {
        isFavorite: updatedFavorite,});

      if (apiResponse.status === 200) {
        setSavedOutfitsList((prev) =>
          prev.map((item) =>
            item.id === outfit.id
              ? { ...item, isFavorite: updatedFavorite }
              : item,
          ),
        );

        toast.success(
          updatedFavorite ? "Added to favourites!" : "Removed from favourites!",
        );
      } else {
        toast.error("Failed to update favourite.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update favourite.");
    }
  };

  // Filter outfits
  const filteredOutfits = savedOutfitsList.filter((outfit) => {
    if (selectedFilter === "All") {
      return true;
    }

    if (selectedFilter === "Favourite") {
      return outfit.isFavorite === true;
    }

    return outfit.category === selectedFilter;
  });

  return (
    <div className="page-container saved-outfits-page">
      <div className="saved-header-row">
        <h1 className="page-title">Saved Outfits</h1>
      </div>

      <div className="saved-filter-bar">
        <div className="category-pill-group">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`category-pill-btn ${
                selectedFilter === tab ? "active" : ""
              }`}
              onClick={() => setSelectedFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="saved-outfits-grid">
        {filteredOutfits.length > 0 ? (
          filteredOutfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              title={outfit.title}
              image={outfit.image}
              items={outfit.items || []}
              category={outfit.category}
              isFavorite={outfit.isFavorite}
              showHeart={true}
              showMenu={false}
              onFavorite={() => handleFavorite(outfit)}
            />
          ))
        ) : (
          <p>
            No outfits found. Save an outfit from Smart Matcher or Outfit Studio
            to see it here!
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedOutfits;
