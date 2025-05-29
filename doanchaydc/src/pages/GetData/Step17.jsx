import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaSun, FaCloudSun, FaMoon, FaClock } from 'react-icons/fa';
import '../../styles/Step17.css';

const options = [
  { key: 'morning',   label: 'Buổi sáng',          icon: <FaSun /> },
  { key: 'afternoon', label: 'Buổi chiều',         icon: <FaCloudSun /> },
  { key: 'evening',   label: 'Buổi tối',           icon: <FaMoon /> },
  { key: 'other',     label: 'Tại thời điểm khác', icon: <FaClock /> },
];

// Hàm map label về key khi quay lại form
function getInitKey(value) {
  if (!value) return '';
  const found = options.find(opt => opt.label === value);
  return found ? found.key : '';
}

export default function Step17Time() {
  const { formData, go, currentStep } = useOutletContext();

  // Lấy lựa chọn đã chọn từ formData (nếu có) hoặc từ localStorage, ưu tiên label tiếng Việt
  const [selected, setSelected] = useState(getInitKey(formData?.timePreference));

  useEffect(() => {
    setSelected(getInitKey(formData?.timePreference));
  }, [formData.timePreference]);

  const handleSelect = key => {
    setSelected(key);
    // Lưu value tiếng Việt, chữ cái đầu viết hoa
    const found = options.find(opt => opt.key === key);
    const valueToSave = found ? found.label.charAt(0).toUpperCase() + found.label.slice(1) : '';
    const updated = { ...formData, timePreference: valueToSave };
    localStorage.setItem('formData', JSON.stringify(updated));
    setTimeout(() => go(`step${currentStep + 1}`, updated), 220); // Delay nhẹ cho mượt
  };

  return (
    <div className="step17-container">
      <h2 className="step17-title">Bạn thích tập luyện vào lúc nào?</h2>
      <div className="step17-options">
        {options.map((opt, idx) => (
          <div
            key={opt.key}
            className={
              "step17-option" +
              (selected === opt.key ? " selected" : "")
            }
            style={{ animationDelay: `${idx * 0.08}s` }}
            onClick={() => handleSelect(opt.key)}
          >
            <div className="step17-icon">{opt.icon}</div>
            <div className="step17-label">{opt.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
