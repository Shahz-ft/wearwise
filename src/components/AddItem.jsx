import React from 'react';
import { Link } from 'react-router-dom';
import { UploadIcon, ChevronDown } from './Icons';

const AddItem = () => {
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
              />
            </label>
          </div>
        </div>

        {/* Right Column: Item Details Form (Visual controls without application logic) */}
        <form className="item-form-wrapper">
          <div className="form-group">
            <label htmlFor="item-name" className="form-label">Item Name</label>
            <input
              id="item-name"
              type="text"
              name="name"
              placeholder="e.g. White Shirt"
              className="form-input"
            />
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="category-select" className="form-label">Category</label>
              <div className="select-container">
                <select
                  id="category-select"
                  name="category"
                  defaultValue=""
                  className="form-select"
                >
                  <option value="" disabled>Select category</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
                <span className="select-arrow"><ChevronDown size={14} /></span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="color-select" className="form-label">Color</label>
              <div className="select-container">
                <select
                  id="color-select"
                  name="color"
                  defaultValue=""
                  className="form-select"
                >
                  <option value="" disabled>Select color</option>
                  <option value="white">White / Cream</option>
                  <option value="green">Sage / Forest Green</option>
                  <option value="blue">Blue / Denim</option>
                  <option value="beige">Beige / Khaki</option>
                  <option value="black">Black</option>
                  <option value="brown">Brown</option>
                </select>
                <span className="select-arrow"><ChevronDown size={14} /></span>
              </div>
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="style-select" className="form-label">Style</label>
              <div className="select-container">
                <select
                  id="style-select"
                  name="style"
                  defaultValue=""
                  className="form-select"
                >
                  <option value="" disabled>Select style</option>
                  <option value="casual">Casual</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="formal">Office / Formal</option>
                  <option value="party">Party / Chic</option>
                  <option value="streetwear">Streetwear</option>
                </select>
                <span className="select-arrow"><ChevronDown size={14} /></span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="season-select" className="form-label">Season</label>
              <div className="select-container">
                <select
                  id="season-select"
                  name="season"
                  defaultValue=""
                  className="form-select"
                >
                  <option value="" disabled>Select season</option>
                  <option value="all-season">All Season</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="autumn">Autumn</option>
                  <option value="winter">Winter</option>
                </select>
                <span className="select-arrow"><ChevronDown size={14} /></span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions-row">
            <Link 
              to="/wardrobe" 
              className="btn btn-secondary" 
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
