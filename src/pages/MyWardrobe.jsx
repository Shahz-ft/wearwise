import React from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { SearchIcon, ChevronDown } from '../components/Icons';

// Images
import whiteTopImg from '../assets/item_white_shirt.jpg';
import greenSweaterImg from '../assets/item_green_sweater.jpg';
import blueJeansImg from '../assets/item_blue_jeans.jpg';
import beigeTrousersImg from '../assets/item_beige_trousers.jpg';
import blackDressImg from '../assets/item_black_dress.jpg';
import whiteSneakersImg from '../assets/item_white_sneakers.jpg';
import sunglassesImg from '../assets/item_sunglasses.jpg';
import beigeBagImg from '../assets/item_beige_bag.jpg';
import blackTeeImg from '../assets/item_black_tee.jpg';
import stripedShirtImg from '../assets/item_striped_shirt.jpg';

const wardrobeItems = [
  { id: 1, title: 'White Top', category: 'Tops', tag: 'Top', image: whiteTopImg, color: 'white', season: 'all-season', style: 'minimalist' },
  { id: 2, title: 'Green Sweater', category: 'Tops', tag: 'Top', image: greenSweaterImg, color: 'green', season: 'autumn', style: 'casual' },
  { id: 3, title: 'Blue Jeans', category: 'Bottoms', tag: 'Bottom', image: blueJeansImg, color: 'blue', season: 'all-season', style: 'casual' },
  { id: 4, title: 'Beige Trousers', category: 'Bottoms', tag: 'Bottom', image: beigeTrousersImg, color: 'beige', season: 'spring', style: 'formal' },
  { id: 5, title: 'Black Dress', category: 'Dresses', tag: 'Dress', image: blackDressImg, color: 'black', season: 'all-season', style: 'party' },
  { id: 6, title: 'White Sneakers', category: 'Shoes', tag: 'Shoes', image: whiteSneakersImg, color: 'white', season: 'all-season', style: 'casual' },
  { id: 7, title: 'Sunglasses', category: 'Accessories', tag: 'Accessory', image: sunglassesImg, color: 'black', season: 'summer', style: 'chic' },
  { id: 8, title: 'Beige Bag', category: 'Accessories', tag: 'Accessory', image: beigeBagImg, color: 'beige', season: 'all-season', style: 'chic' },
  { id: 9, title: 'Black Tee', category: 'Tops', tag: 'Top', image: blackTeeImg, color: 'black', season: 'summer', style: 'casual' },
  { id: 10, title: 'Striped Top', category: 'Tops', tag: 'Top', image: stripedShirtImg, color: 'white', season: 'spring', style: 'casual' },
];

const MyWardrobe = () => {
  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Accessories'];

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
          {categories.map((cat, idx) => (
            <button
              key={cat}
              type="button"
              className={`category-pill-btn ${idx === 0 ? 'active' : ''}`}
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
            />
          </div>

          <div className="filter-dropdown-group">
            {/* Color Filter */}
            <div className="select-container compact-select">
              <select 
                defaultValue="all"
                className="filter-select"
                aria-label="Filter by color"
              >
                <option value="all">Color</option>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="beige">Beige</option>
                <option value="black">Black</option>
              </select>
              <span className="select-arrow"><ChevronDown size={12} /></span>
            </div>

            {/* Season Filter */}
            <div className="select-container compact-select">
              <select 
                defaultValue="all"
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
              <span className="select-arrow"><ChevronDown size={12} /></span>
            </div>

            {/* Style Filter */}
            <div className="select-container compact-select">
              <select 
                defaultValue="all"
                className="filter-select"
                aria-label="Filter by style"
              >
                <option value="all">Style</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="chic">Chic</option>
                <option value="party">Party</option>
                <option value="minimalist">Minimalist</option>
              </select>
              <span className="select-arrow"><ChevronDown size={12} /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      <div className="wardrobe-items-grid">
        {wardrobeItems.map((item) => (
          <ItemCard
            key={item.id}
            title={item.title}
            category={item.tag}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MyWardrobe;
