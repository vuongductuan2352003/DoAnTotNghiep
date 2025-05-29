// File: src/pages/GetData/Step17Time.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaSun, FaCloudSun, FaMoon, FaClock } from 'react-icons/fa';
import '../../styles/Step17.css';

const options = [
  { key: 'morning',   label: 'Buổi sáng',           icon: <FaSun /> },
  { key: 'afternoon', label: 'Buổi chiều',         icon: <FaCloudSun /> },
  { key: 'evening',   label: 'Buổi tối',            icon: <FaMoon /> },
  { key: 'other',     label: 'Tại thời điểm khác',  icon: <FaClock /> },
];

export default function Step17Time() {
  const { formData, go, currentStep } = useOutletContext();

  const handleSelect = key => {
    const updated = { ...formData, timePreference: key };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step17-container">
      <h2 className="step17-title">Bạn thích tập luyện vào lúc nào?</h2>
      <div className="step17-options">
        {options.map((opt, idx) => (
          <div
            key={opt.key}
            className="step17-option"
            style={{ animationDelay: `${idx * 0.1}s` }}
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