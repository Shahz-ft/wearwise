import React from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import OutfitCard from '../components/OutfitCard';
import { WardrobeIcon, HeartIcon, SavedIcon, CalendarIcon } from '../components/Icons';

// Clothing images
import whiteShirtImg from '../assets/item_white_shirt.jpg';
import blueJeansImg from '../assets/item_blue_jeans.jpg';
import whiteSneakersImg from '../assets/item_white_sneakers.jpg';
import beigeBagImg from '../assets/item_beige_bag.jpg';

// Outfit images
import casualDayImg from '../assets/outfit_casual_day.jpg';
import collegeLookImg from '../assets/outfit_college_look.jpg';
import officeWearImg from '../assets/outfit_office_wear.jpg';
import partyLookImg from '../assets/outfit_party_look.jpg';

const Dashboard = () => {
  const statCards = [
    {
      title: 'Wardrobe Items',
      count: '24',
      icon: WardrobeIcon,
      colorClass: 'stat-green',
    },
    {
      title: 'Saved Outfits',
      count: '8',
      icon: HeartIcon,
      colorClass: 'stat-coral',
    },
    {
      title: 'Favourites',
      count: '4',
      icon: SavedIcon,
      colorClass: 'stat-amber',
    },
    {
      title: 'Planned Outfits',
      count: '3',
      icon: CalendarIcon,
      colorClass: 'stat-purple',
    },
  ];

  const recentItems = [
    { id: 1, title: 'White Shirt', category: 'Top', image: whiteShirtImg },
    { id: 2, title: 'Blue Jeans', category: 'Bottom', image: blueJeansImg },
    { id: 3, title: 'White Sneakers', category: 'Shoes', image: whiteSneakersImg },
    { id: 4, title: 'Beige Bag', category: 'Accessory', image: beigeBagImg },
  ];

  const recentOutfits = [
    { id: 1, title: 'Casual Day', image: casualDayImg },
    { id: 2, title: 'College Look', image: collegeLookImg },
    { id: 3, title: 'Office Wear', image: officeWearImg },
    { id: 4, title: 'Party Look', image: partyLookImg },
  ];

  return (
    <div className="page-container dashboard-page">
      {/* Header with Title and Date */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-greeting">Welcome back, Shahz!</p>
        </div>
        <div className="dashboard-date-badge">
          Monday, 28 July 2026
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="stat-cards-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="stat-card">
              <div className={`stat-icon-wrapper ${stat.colorClass}`}>
                <Icon size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stat.count}</span>
                <span className="stat-label">{stat.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recently Added Items Section */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h2 className="dashboard-section-heading">Recently Added Items</h2>
          <Link to="/wardrobe" className="view-all-link">View All</Link>
        </div>

        <div className="cards-grid-4">
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title}
              category={item.category}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* Recently Saved Outfits Section */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h2 className="dashboard-section-heading">Recently Saved Outfits</h2>
          <Link to="/saved-outfits" className="view-all-link">View All</Link>
        </div>

        <div className="cards-grid-4">
          {recentOutfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              title={outfit.title}
              image={outfit.image}
              showMenu={true}
              showHeart={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
