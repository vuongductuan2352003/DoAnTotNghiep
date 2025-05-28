// src/components/HeaderAdd.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../assets/loadImg";
import "../styles/HeaderAddData.css";

export default function HeaderAdd() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={images["logo.png"]} alt="Tuấn Logo" className="logo" />
          </Link>
        </div>
        <div className="right-container">
          <span className="country-label">VIỆT NAM</span>
          <button className="menu-toggle" onClick={openMenu} aria-label="Open Menu">
            ☰
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`menu-overlay${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Sidebar Menu */}
      <nav className={`menu-content${menuOpen ? " open" : ""}`}>  
        <button className="close-button" onClick={closeMenu} aria-label="Close Menu">
          ×
        </button>
        <ul>
          <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
          <li><Link to="/policy" onClick={closeMenu}>Điều khoản & Chính sách</Link></li>
          <li><Link to="/faq" onClick={closeMenu}>Câu hỏi thường gặp</Link></li>
          <li><Link to="/account" onClick={closeMenu}>Tài Khoản Của Tôi</Link></li>
          <li><Link to="/support" onClick={closeMenu}>Hỗ trợ</Link></li>
          <li><Link to="/about" onClick={closeMenu}>Về chúng tôi</Link></li>
        </ul>
      </nav>
    </>
  );
}