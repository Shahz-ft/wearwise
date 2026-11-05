import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="app-main-area">
        {/* Top Navigation */}
        <Navbar variant="app" />

        {/* Dynamic Page View */}
        <main className="app-content-body">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
