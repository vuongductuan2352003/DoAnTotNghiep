import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaClock, FaCheck, FaUtensils } from "react-icons/fa";
import '../../styles/Step34.css';

const OPTIONS = [
  { label: 'Ít hơn 30 phút', icon: <FaClock /> },
  { label: '30-60 phút', icon: <FaClock /> },
  { label: 'Hơn 1 giờ', icon: <FaClock /> },
  { label: 'Tôi thích gọi đồ ăn hoặc ra ngoài ăn', icon: <FaUtensils /> }
];

export default function Step34MealTime() {
  const { formData, go, currentStep } = useOutletContext();
  // Value là label tiếng Việt
  const [selected, setSelected] = useState(() =>
    formData.mealTime ||
    localStorage.getItem('mealTime') ||
    ''
  );

  useEffect(() => {
    if (formData.mealTime) {
      setSelected(formData.mealTime);
      localStorage.setItem('mealTime', formData.mealTime);
    }
  }, [formData.mealTime]);

  // Xử lý chọn option, lưu local và chuyển tiếp
  const handleChoose = (label) => {
    setSelected(label);
    localStorage.setItem('mealTime', label);
    setTimeout(() => {
      go(`step${currentStep + 1}`, { ...formData, mealTime: label });
    }, 300); // delay hiệu ứng
  };

  return (
    <div className="step34-root">
      <h2 className="step34-title animate-fadein">
        Bạn sẵn sàng dành bao nhiêu thời gian cho mỗi lần<br />chuẩn bị bữa ăn?
      </h2>
      <div className="step34-options">
        {OPTIONS.map((option) => (
          <div
            key={option.label}
            className={`step34-option${selected === option.label ? ' selected' : ''}`}
            onClick={() => handleChoose(option.label)}
          >
            <span className="step34-icon">{option.icon}</span>
            <span className="step34-label">{option.label}</span>
            {selected === option.label && <span className="step34-check"><FaCheck /></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
