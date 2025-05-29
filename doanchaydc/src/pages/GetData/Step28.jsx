import React from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step28.css';
import images from "../../assets/loadImg.js";
export default function Step28Notice() {
  const { go, currentStep, formData } = useOutletContext();

  const handleContinue = () => {
    go(`step${currentStep + 1}`, formData);
  };

  return (
    <div className="step28-root">
      <div className="step28-card">
        <div className="step28-img-wrapper">
          <img className="step28-img" src={images["healthImg.png"]} alt="Chăm sóc sức khỏe" />
          <div className="step28-img-pulse"></div>
        </div>
        <h2 className="step28-title">
          Chúng tôi quan tâm đến sức khỏe của bạn
        </h2>
        <div className="step28-desc">
          <p>Nếu bạn có bất kỳ tình trạng nào sau đây:</p>
          <ul>
            <li>Bệnh tim</li>
            <li>Vẹo cột sống nặng</li>
            <li>Tổn thương cột sống</li>
            <li>Khối u lành tính hoặc ác tính</li>
            <li>Tăng huyết áp</li>
          </ul>
          <p style={{marginTop: 10, opacity: 0.84}}>
            Vui lòng liên hệ với bác sĩ của bạn trước khi bắt đầu<br />
            theo chương trình <b>Fitness & Health</b>.
          </p>
        </div>
        <button className="step28-btn" onClick={handleContinue}>
          Đã hiểu
        </button>
      </div>
    </div>
  );
}
