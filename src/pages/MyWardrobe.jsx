import React, { useEffect, useState } from "react";
import { getItems, deleteItem, updateItem } from "../services/AllAPIs";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { SearchIcon, ChevronDown } from "../components/Icons";
import { toast } from "react-toastify";

const MyWardrobe = () => {
  const categories = [
    "All",
    "Tops",
    "Bottoms",
    "Dresses",
    "Shoes",
    "Accessories",
  ];
  const [wardrobeItems, setWardrobeItems] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");

  useEffect(() => {
    getWardrobeItems();
  }, []);

  const getWardrobeItems = async () => {
    try {
      let apiResponse = await getItems();
      console.log(apiResponse);

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

  const onDeleteClick = async (id) => {
    try {
      let apiResponse = await deleteItem(id);

      if (apiResponse.status === 200) {
        toast.success("Item deleted successfully");
        getWardrobeItems();
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete item");
    }
  };

  const onEditClick = (id) => {
    let item = wardrobeItems.find((eachItem) => eachItem.id === id);

    if (item) {
      setSelectedItem({ ...item });
      handleOpen();
    }
  };

  const onUpdateClick = async (e) => {
    e.preventDefault();

    try {
      let apiResponse = await updateItem(selectedItem.id, selectedItem);

      if (apiResponse.status === 200) {
        toast.success("Item updated successfully");
        handleClose();
        getWardrobeItems();
      } else {
        toast.error("Failed to update item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update item");
    }
  };

  const filteredItems = wardrobeItems.filter((item) => {
    let matchesSearch = (item.name || "")
      .toLowerCase()
      .includes(searchVal.toLowerCase());

    let matchesCategory =
      selectedCategory === "All" ||
      (item.category || "").toLowerCase() === selectedCategory.toLowerCase();

    let matchesColor =
      selectedColor === "all" ||
      (item.color || "").toLowerCase() === selectedColor;

    let matchesSeason =
      selectedSeason === "all" ||
      (item.season || "").toLowerCase() === selectedSeason;

    let matchesStyle =
      selectedStyle === "all" ||
      (item.style || "").toLowerCase() === selectedStyle;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesColor &&
      matchesSeason &&
      matchesStyle
    );
  });

  return (
    <div className="page-container wardrobe-page">
      {/* Page Header */}
      <div className="wardrobe-header-row">
        <h1 className="page-title">My Wardrobe</h1>
        <Link to="/add-item" className="btn btn-primary btn-add-item">
          <span>+ Add Item</span>
        </Link>
      </div>

      {/* Filter and Search Bar (Visual Controls) */}
      <div className="wardrobe-filter-panel">
        {/* Category Tabs */}
        <div className="category-pill-group">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Select Filters Row */}
        <div className="filters-controls-row">
          <div className="filter-search-box">
            <span className="search-icon-wrapper">
              <SearchIcon size={16} />
            </span>
            <input
              type="text"
              placeholder="Search items..."
              className="filter-search-input"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>

          <div className="filter-dropdown-group">
            {/* Color Filter */}
            <div className="select-container compact-select">
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="filter-select"
                aria-label="Filter by color"
              >
                <option value="all">Color</option>
                <option value="black">Black</option>
                <option value="white">White / Cream</option>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="beige">Beige</option>
                <option value="grey">Grey</option>
                <option value="multicolor">Multicolor</option>
                <option value="other">Other</option>
              </select>
              <span className="select-arrow">
                <ChevronDown size={12} />
              </span>
            </div>

            {/* Season Filter */}
            <div className="select-container compact-select">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="filter-select"
                aria-label="Filter by season"
              >
                <option value="all">Season</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
                <option value="all-season">All Season</option>
              </select>
              <span className="select-arrow">
                <ChevronDown size={12} />
              </span>
            </div>

            {/* Style Filter */}
            <div className="select-container compact-select">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="filter-select"
                aria-label="Filter by style"
              >
                <option value="all">Style</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="chic">Chic</option>
                <option value="party">Party</option>
                <option value="minimalist">Minimalist</option>
                <option value="street wear">Street Wear</option>
              </select>
              <span className="select-arrow">
                <ChevronDown size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      <div className="wardrobe-items-grid">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            title={item.name}
            category={item.category}
            image={item.image}
            id={item.id}
            onDelete={onDeleteClick}
            onEdit={onEditClick}
          />
        ))}
      </div>
      {/* modal */}

      {open && selectedItem && (
        <div className="edit-modal-overlay" onClick={handleClose}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h2>Edit Item Details</h2>

              <button
                type="button"
                className="edit-modal-close"
                onClick={handleClose}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={onUpdateClick}>
              <div className="edit-modal-body">
                <div className="edit-image-preview">
                  <p>Item Image</p>

                  {selectedItem.image ? (
                    <img src={selectedItem.image} alt={selectedItem.name} />
                  ) : (
                    <div className="edit-image-placeholder">
                      No image uploaded
                    </div>
                  )}

                  <label className="edit-image-upload">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (!file) return;

                        if (!file.type.startsWith("image/")) {
                          toast.error("Please select an image file");
                          e.target.value = "";
                          return;
                        }

                        if (file.size > 500 * 1024) {
                          toast.error("Image must be smaller than 500 KB");
                          e.target.value = "";
                          return;
                        }

                        const reader = new FileReader();

                        reader.onload = () => {
                          setSelectedItem({
                            ...selectedItem,
                            image: reader.result,
                          });
                        };

                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>

                <label>
                  Item Name *
                  <input
                    type="text"
                    value={selectedItem.name || ""}
                    required
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        name: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Category *
                  <select
                    value={selectedItem.category || ""}
                    required
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select category</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </label>

                <label>
                  Color
                  <select
                    value={selectedItem.color || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        color: e.target.value,
                      })
                    }
                  >
                    <option value="">Select color</option>
                    <option value="black">Black</option>
                    <option value="white">White / Cream</option>
                    <option value="red">Red</option>
                    <option value="pink">Pink</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="purple">Purple</option>
                    <option value="brown">Brown</option>
                    <option value="beige">Beige</option>
                    <option value="grey">Grey</option>
                    <option value="multicolor">Multicolor</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label>
                  Style
                  <select
                    value={selectedItem.style || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        style: e.target.value,
                      })
                    }
                  >
                    <option value="">Select style</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="chic">Chic</option>
                    <option value="party">Party</option>
                    <option value="minimalist">Minimalist</option>
                  </select>
                </label>

                <label>
                  Season
                  <select
                    value={selectedItem.season || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        season: e.target.value,
                      })
                    }
                  >
                    <option value="">Select season</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                    <option value="all-season">All Season</option>
                  </select>
                </label>
              </div>

              <div className="edit-modal-footer">
                <button
                  type="button"
                  className="edit-cancel-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button type="submit" className="edit-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWardrobe;
