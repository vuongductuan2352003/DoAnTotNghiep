import React, { useState, useEffect, useRef } from "react";
import images from "../assets/loadImg";
import "../styles/HeaderHome.css";
import "../styles/TrangChu.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const DEFAULT_AVATAR = "male.png"; // Đường dẫn ảnh tĩnh nếu không có avatar

export default function HeaderHome() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Lấy thông tin user
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/user/profile");
        setProfile(res.data);
        localStorage.setItem("user_id", res.data.user_id);
      } catch (err) {
        setProfile(null);
      }
    }
    fetchProfile();
  }, []);

  // Tắt dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tắt dropdown menu chính khi click ngoài (cũ)
  useEffect(() => {
    function closeDropdown(event) {
      if (!event.target.closest(".menu-item")) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  // Đăng xuất
  const handleLogout = async () => {
    try {
      await api.post("/user/logout"); // Đúng route logout backend của bạn
    } catch {}
    localStorage.removeItem("access_token");
    window.location.href = "/Login";
  };

  return (
    <div className="sidebar">
      <h2>
        <Link to="/com">
          <img
            className="sidebar__title_img"
            src={images["logo.png"]}
            alt="Logo GymPro"
          />
        </Link>
      </h2>
      <ul className="sidebar__menu">
        <li>
          <Link to="/Trang-chu">
            <div className="icon">
              <i className="fa-duotone fa-solid fa-house"></i>
            </div>
            Khám phá
          </Link>
        </li>
        <li>
          <Link to="/Thong-bao">
            <div className="icon">
              <i className="fa-solid fa-bell"></i>
            </div>
            Thông báo
          </Link>
        </li>
        <li>
          <Link to="/Tin-nhan">
            <div className="icon">
              <i className="fa-solid fa-message"></i>
            </div>
            Tin nhắn
          </Link>
        </li>
        <li>
          <Link to="/Khoa-hoc">
            <div className="icon">
              <i className="fa-solid fa-book"></i>
            </div>
            Khóa học
          </Link>
        </li>
        <li>
          <Link to="/Tien-trinh-tap">
            <div className="icon">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            Tiến trình tập
          </Link>
        </li>
        <li>
          <Link to="/Suc-khoe">
            <div className="icon">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            Sức khỏe
          </Link>
        </li>
        <li>
          <Link to="/Ho-so">
            <div className="icon">
              <i className="fa-solid fa-user"></i>
            </div>
            Hồ sơ
          </Link>
        </li>
        <li>
          <Link to="/Premium">
            <div className="icon">
              <img
                className="trangchu_logo2"
                src={images["logo2.png"]}
                alt="Premium"
              />
            </div>
            Premium
          </Link>
        </li>
        <li className="menu-item" onClick={() => setIsOpen(!isOpen)}>
          <div className="icon">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
          Thêm
        </li>
      </ul>
      {isOpen && (
        <div className="dropdown">
          <ul className="sidebar__menu">
            <li>
              <Link to="/Da-luu">
                <div className="icon">
                  <i className="fa-solid fa-bookmark"></i>
                </div>
                Đã lưu
              </Link>
            </li>
            <li>
              <Link to="/Da-thich">
                <div className="icon">
                  <i className="fa-solid fa-heart"></i>
                </div>
                Đã thích
              </Link>
            </li>
            <li>
              <Link to="/Cai-dat-va-rieng-tu">
                <div className="icon">
                  <i className="fa-solid fa-gear"></i>
                </div>
                Cài đặt và riêng tư
              </Link>
            </li>
          </ul>
        </div>
      )}
      <button className="sidebar__button">Đăng</button>

      {/* User Info */}
      {profile && (
        <div className="profile" ref={profileRef} style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={images[DEFAULT_AVATAR]}
              alt="avatar"
              className="profile__avatar"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
                background: "#324",
                border: "2.5px solid #222",
                fontSize: 22,
              }}
              onError={e => { e.target.onerror = null; e.target.src = images[DEFAULT_AVATAR]; }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "1.09rem", color: "#fff" }}>
                {profile.name || profile.full_name || profile.username}
              </div>
              <div style={{ color: "#aaa", fontSize: ".98rem" }}>
                @{profile.username}
              </div>
            </div>
            {/* Dấu 3 chấm cho menu tài khoản */}
            <div
              onClick={() => setProfileMenu(!profileMenu)}
              style={{
                cursor: "pointer",
                marginLeft: 10,
                padding: 2,
                borderRadius: "50%",
                transition: "background .15s",
                color: "#fff"
              }}
              tabIndex={0}
              onBlur={() => setTimeout(() => setProfileMenu(false), 200)}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          {/* Dropdown tài khoản */}
          {profileMenu && (
            <div className="profile-dropdown"
                 style={{
                   position: "absolute",
                   bottom: 55,
                   left: 0,
                   minWidth: 220,
                   background: "#1d1f24",
                   boxShadow: "0 4px 24px #000a",
                   borderRadius: 14,
                   zIndex: 100,
                   padding: 0,
                   overflow: "hidden"
                 }}>
              <div style={{ padding: "13px 18px", fontWeight: 500, color: "#fff", cursor: "pointer", borderBottom: "1px solid #292929" }}>
                Thêm tài khoản hiện có
              </div>
              <div
                onClick={handleLogout}
                style={{
                  padding: "13px 18px",
                  color: "#ff5252",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Đăng xuất @{profile.username}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
