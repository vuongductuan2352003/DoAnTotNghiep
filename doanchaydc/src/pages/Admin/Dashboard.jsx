// src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../utils/api.jsx";
import "../../styles/Admin.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    bmiCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Ví dụ: bạn có 3 endpoint sau:
        // GET /api/admin/users/count
        // GET /api/admin/users/active-count
        // GET /api/admin/bmi-categories/count
        const usersRes = await api.get("/admin/users/count");
        const activeRes = await api.get("/admin/users/active-count");
        const bmiRes = await api.get("/admin/bmi-categories/count");

        setStats({
          totalUsers: usersRes.data.count || 0,
          activeUsers: activeRes.data.count || 0,
          bmiCategories: bmiRes.data.count || 0,
        });
      } catch (error) {
        console.error("Lấy số liệu Dashboard thất bại:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <p>Đang tải Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2 className="admin-page-title">Tổng quan (Dashboard)</h2>
      <div className="dashboard-cards">
        <motion.div
          className="dashboard-card"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="card-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="card-info">
            <h3>{stats.totalUsers}</h3>
            <p>Tổng số người dùng</p>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-card"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="card-icon">
            <i className="fa-solid fa-user-check"></i>
          </div>
          <div className="card-info">
            <h3>{stats.activeUsers}</h3>
            <p>Người dùng đang hoạt động</p>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-card"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <div className="card-icon">
            <i className="fa-solid fa-scale-unbalanced"></i>
          </div>
          <div className="card-info">
            <h3>{stats.bmiCategories}</h3>
            <p>Số loại BMI</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
