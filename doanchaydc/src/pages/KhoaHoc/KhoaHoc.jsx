import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/TrangChu.css";
import images from "../../assets/loadImg";

import "../../styles/KhoaHoc.css";
export default function KhoaHoc() {
  const KhoaHoc = {};
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: "https://byebeo.com/wp-content/uploads/2023/01/3-1-1024x525.png.webp",
      title: "Yoga cơ bản",
      description: "Khóa học bí mật tạo lên cơ thể hoàn hảo",
      price: 0,
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 2,
      image: "https://byebeo.com/wp-content/uploads/2023/08/5-1-min-1024x524.png.webp",
      title: "Tập Gym cho người mới",
      description: "Hướng dẫn bài tập cơ bản cho nữ tại nhà!",
      price: 300000,
      rating: 4.5,
      reviews: 80,
    },
    {
        id: 3,
        image: "https://byebeo.com/wp-content/uploads/2023/08/2-2-min-1024x525.png.webp",
        title: "Tập Gym cho người mới",
        description: "Khóa học SUPPLEMENT cho Gymer",
        price: 300000,
        rating: 4.5,
        reviews: 80,
      },
      
    // Thêm các khóa học khác
  ]);
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




  const [currentIndex, setCurrentIndex] = useState(0);
  const imagess = {
    "BackGround.png": "path/to/BackGround.png",
    "BackGround2.png": "path/to/BackGround2.png",
  };

  const imageArray = [images["BackGround.png"], images["BackGround2.png"]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 3000); // Chuyển đổi mỗi 3 giây

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="app">
      {/* Sidebar */}
      <div id="KhoaHoc" className="sidebar">
        <h2>
          <img className="sidebar__title_img" src={images["logo.png"]}></img>
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

      <div className="KhoaHoc_Main">
      <div className="KhoaHoc_slide">
          <img
            className="KhoaHoc_img"
            src={imageArray[currentIndex]}
            alt="Slide Image 1"
          />
          <img
            className="KhoaHoc_img"
            src={imageArray[(currentIndex + 1) % imageArray.length]}
            alt="Slide Image 2"
          />
        </div>
        <div className="courses-page">
        <h1>Danh sách khóa học</h1>
        <div className="courses-list">
          {courses.map((course) => (
            <div className="course-card">
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-footer">
                <span className="course-price">
                  {course.price === 0 ? "Miễn phí" : `${course.price} VNĐ`}
                </span>
                <span className="course-rating">
                  ⭐ {course.rating} ({course.reviews} đánh giá)
                </span>
              </div>
              <button className="btn-detail">Xem chi tiết</button>
            </div>
          ))}
        </div>
      </div>
         </div>
     
    </div>
  );
}
