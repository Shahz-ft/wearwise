import React, { useState } from "react";
import { addItem } from "../services/AllAPIs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UploadIcon, ChevronDown } from "./Icons";

const AddItem = () => {
  const [itemData, setItemData] = useState({
    name: "",
    category: "",
    color: "",
    style: "",
    season: "",
    image: "",
  });

  const navigate = useNavigate();

  const onAddItem = async () => {
    try {
      if (
        itemData.name.trim() === "" ||
        itemData.category === "" ||
        itemData.color === ""
      ) {
        toast.error("Please fill in item details");
        return;
      }
      let apiResponse = await addItem(itemData);
      console.log(apiResponse);
      if (apiResponse.status === 201) {
        toast.success("Successfully added item");
        navigate("/wardrobe");
      } else {
        toast.error("Something went wrong while adding item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding item");
    }
  };

  const handleImageChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onload = () => {
        setItemData({
          ...itemData,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container add-item-page">
      <div className="page-header">
        <h1 className="page-title">Add New Item</h1>
      </div>

      <div className="add-item-card">
        {/* Left Column: Photo Upload Placeholder */}
        <div className="upload-box-wrapper">
          <div className="upload-dropzone">
            <div className="upload-icon-circle">
              <UploadIcon size={36} />
            </div>
            <h3 className="upload-title">Upload Photo</h3>
            <p className="upload-subtitle">Click to upload or drag and drop</p>
            <label className="btn-choose-file" htmlFor="file-upload-input">
              Choose File
              <input
                id="file-upload-input"
                type="file"
                accept="image/*"
                className="visually-hidden"
                onChange={handleImageChange}
              />
            </label>

            {itemData.image && (
              <img
                src={itemData.image}
                alt="Selected clothing"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "12px",
                }}
              />
            )}
          </div>
        </div>

        {/* Right Column: Item Details Form (Visual controls without application logic) */}
        <form
          className="item-form-wrapper"
          onSubmit={(e) => {
            e.preventDefault();
            onAddItem();
          }}
        >
          <div className="form-group">
            <label htmlFor="item-name" className="form-label">
              Item Name
            </label>
            <input
              id="item-name"
              type="text"
              name="name"
              placeholder="e.g. White Shirt"
              className="form-input"
              value={itemData.name}
              onChange={(e) =>
                setItemData({ ...itemData, name: e.target.value })
              }
            />
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="category-select" className="form-label">
                Category
              </label>
              <div className="select-container">
                <select
                  id="category-select"
                  name="category"
                  className="form-select"
                  value={itemData.category}
                  onChange={(e) =>
                    setItemData({ ...itemData, category: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <span className="select-arrow">
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="color-select" className="form-label">
                Color
              </label>
              <div className="select-container">
                <select
                  id="color-select"
                  name="color"
                  className="form-select"
                  value={itemData.color}
                  onChange={(e) =>
                    setItemData({ ...itemData, color: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select color
                  </option>
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
                  <option value="beige">Beige / Khaki</option>
                  <option value="grey">Grey</option>
                  <option value="multicolor">Multicolor</option>
                  <option value="other">Other</option>
                </select>

                <span className="select-arrow">
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="style-select" className="form-label">
                Style
              </label>
              <div className="select-container">
                <select
                  id="style-select"
                  name="style"
                  className="form-select"
                  value={itemData.style}
                  onChange={(e) =>
                    setItemData({ ...itemData, style: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select style
                  </option>
                  <option value="casual">Casual</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="formal">Office / Formal</option>
                  <option value="party">Party / Chic</option>
                  <option value="streetwear">Streetwear</option>
                </select>
                <span className="select-arrow">
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="season-select" className="form-label">
                Season
              </label>
              <div className="select-container">
                <select
                  id="season-select"
                  name="season"
                  className="form-select"
                  value={itemData.season}
                  onChange={(e) =>
                    setItemData({ ...itemData, season: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select season
                  </option>
                  <option value="all-season">All Season</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="autumn">Autumn</option>
                  <option value="winter">Winter</option>
                </select>
                <span className="select-arrow">
                  <ChevronDown size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions-row">
            <Link to="/wardrobe" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
