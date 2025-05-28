import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../styles/AddData.css"; // Đảm bảo file CSS được đặt đúng
import images from "../../assets/loadImg.js";
import "../../styles/HeaderAddData.css";

import { Carousel } from "react-bootstrap";

function AddData() {
  const [menuOpen, setMenuOpen] = useState(false);
 

  const navigate = useNavigate();
 // lưu lựa chọn nhóm tuổi
 
  const handleAgeGroupClick = (age_groups) => {
    localStorage.setItem("selectedAgeGroup", age_groups);
    navigate(`/set-body-${age_groups}`); // Điều hướng đến trang mới (cập nhật đường dẫn đúng)
  };
  return (
    <div className="background_AddData">
      <div className="background_AddData_1">
        <h1>XÂY DỰNG CƠ THỂ HOÀN HẢO CỦA BẠN</h1>
        <p>THEO ĐỘ TUỔI VÀ CHỈ SỐ BMI CỦA BẠN</p>
        <div className="background_AddData_1_1">
        
        </div>
      </div>
    </div>
  );
}

export default AddData;
