import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import OutfitCard from "../components/OutfitCard";
import { getItems, getOutfits } from "../services/AllAPIs";
import {
  WardrobeIcon,
  HeartIcon,
  SavedIcon,
  CalendarIcon,
} from "../components/Icons";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [itemsResponse, outfitsResponse] = await Promise.all([
        getItems(),
        getOutfits(),
      ]);

      if (itemsResponse.status === 200) {
        setWardrobeItems(itemsResponse.data);
      }
      if (outfitsResponse.status === 200) {
        setSavedOutfits(outfitsResponse.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data.");
    }
  };

  const favouriteCount = savedOutfits.filter(
    (outfit) => outfit.isFavorite === true,
  ).length;

  const statCards = [
    {
      title: "Wardrobe Items",
      count: wardrobeItems.length,
      icon: WardrobeIcon,
      colorClass: "stat-green",
    },
    {
      title: "Saved Outfits",
      count: savedOutfits.length,
      icon: SavedIcon,
      colorClass: "stat-amber",
    },
    {
      title: "Favourites",
      count: favouriteCount,
      icon: HeartIcon,
      colorClass: "stat-coral",
    },
    {
      title: "Planned Outfits",
      count: 0,
      icon: CalendarIcon,
      colorClass: "stat-purple",
    },
  ];

  const recentItems = [...wardrobeItems].reverse().slice(0, 4);
  const recentOutfits = [...savedOutfits].reverse().slice(0, 4);

  return (
    <div className="page-container dashboard-page">
      {/* Header with Title and Date */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-greeting">Welcome back, Shahz!</p>
        </div>
        <div className="dashboard-date-badge">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
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
          <Link to="/wardrobe" className="view-all-link">
            View All
          </Link>
        </div>

        <div className="cards-grid-4">
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              title={item.name}
              category={item.category}
              image={item.image}
              showMenu={false}
            />
          ))}
          {wardrobeItems.length === 0 && (
            <p>No wardrobe items yet. Add your first item!</p>
          )}
        </div>
      </section>

      {/* Recently Saved Outfits Section */}
      <section className="dashboard-section">
        <div className="section-header-row">
          <h2 className="dashboard-section-heading">Recently Saved Outfits</h2>
          <Link to="/saved-outfits" className="view-all-link">
            View All
          </Link>
        </div>

        <div className="cards-grid-4">
          {recentOutfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              title={outfit.title}
              image={outfit.image}
              items={outfit.items || []}
              category={outfit.category}
              isFavorite={outfit.isFavorite}
              showMenu={false}
              showHeart={false}
            />
          ))}
          {savedOutfits.length === 0 && (
            <p>
              No saved outfits yet. Create one in Smart Matcher or Outfit
              Studio!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
