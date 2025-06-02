// src/pages/Admin/AdminPanel.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./Dashboard";
import ManageUsers from "./ManageUsers";
import ManageBMICategories from "./ManageBMICategories";
import "../../styles/Admin.css";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <ManageUsers />;
      case "bmiCategories":
        return <ManageBMICategories />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h1>Admin Panel</h1>
        </div>
        <nav className="admin-nav">
          <ul>
            <li
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              <i className="fa-solid fa-chart-line"></i> Dashboard
            </li>
            <li
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              <i className="fa-solid fa-users"></i> Quản lý Người dùng
            </li>
            <li
              className={activeTab === "bmiCategories" ? "active" : ""}
              onClick={() => setActiveTab("bmiCategories")}
            >
              <i className="fa-solid fa-scale-unbalanced"></i> Quản lý BMI
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
