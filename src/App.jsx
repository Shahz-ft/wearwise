import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyWardrobe from "./pages/MyWardrobe";
import AddItem from "./components/AddItem";
import SmartMatcher from "./pages/SmartMatcher";
import OutfitStudio from "./pages/OutfitStudio";
import SavedOutfits from "./pages/SavedOutfits";
import Settings from "./pages/Settings";
import AppLayout from "./components/AppLayout";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* Public Home Page with its own public navbar & footer */}
        <Route path="/" element={<Home />} />

        {/* Application Pages with Shared Sidebar and Topbar */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/wardrobe"
          element={
            <AppLayout>
              <MyWardrobe />
            </AppLayout>
          }
        />
        <Route
          path="/add-item"
          element={
            <AppLayout>
              <AddItem />
            </AppLayout>
          }
        />
        <Route
          path="/smart-matcher"
          element={
            <AppLayout>
              <SmartMatcher />
            </AppLayout>
          }
        />
        <Route
          path="/outfit-studio"
          element={
            <AppLayout>
              <OutfitStudio />
            </AppLayout>
          }
        />
        <Route
          path="/saved-outfits"
          element={
            <AppLayout>
              <SavedOutfits />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
