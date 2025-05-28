import React, { useState } from "react";
import images from "../assets/loadImg";
import "../styles/HeaderHome.css";
import "../styles/TrangChu.css";
import { Link } from "react-router-dom";

export default function HeaderHome() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Tắt box nếu click ra ngoài
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".menu-item")) {
      setIsOpen(false); // Ẩn box nếu click bên ngoài
    }
  });

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
        <li className="menu-item" onClick={toggleDropdown}>
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
      <div className="profile">
        <p>Vương Tuấn</p>
        <p>@tuan2vng</p>
      </div>
    </div>
  );
}
