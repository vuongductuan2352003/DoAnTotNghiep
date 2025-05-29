import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaCheckSquare } from 'react-icons/fa';
import images from '../../assets/loadImg.js';
import '../../styles/Step18.css';

const options = [
  { key: 'chest', label: 'Ngực yếu',            img: images['highlight-chest.png'] },
  { key: 'arm',   label: 'Cánh tay mảnh khảnh', img: images['highlight-arm.png'] },
  { key: 'abs',   label: 'Bụng bia',            img: images['highlight-abs.png'] },
  { key: 'leg',   label: 'Đôi chân mảnh khảnh', img: images['highlight-leg.png'] },
];

// Helper: map từ value tiếng Việt sang key khi back lại form (cho phép reload đúng option)
function getInitKeys(regionFocus) {
  if (!regionFocus) return [];
  if (Array.isArray(regionFocus)) {
    // Nếu là array value tiếng Việt, convert sang key
    return regionFocus.map(v => {
      const found = options.find(opt => opt.label === v);
      return found ? found.key : null;
    }).filter(Boolean);
  }
  return [];
}

export default function Step18Focus() {
  const { formData, go, currentStep } = useOutletContext();

  // Lấy lại keys từ value tiếng Việt nếu có
  const [selected, setSelected] = useState(getInitKeys(formData.regionFocus));

  const toggle = (key) => {
    setSelected((sel) =>
      sel.includes(key) ? sel.filter((x) => x !== key) : [...sel, key]
    );
  };

  const handleContinue = () => {
    // Lưu array label tiếng Việt, luôn viết hoa chữ đầu
    const regionFocus = selected.map(key => {
      const found = options.find(opt => opt.key === key);
      return found ? found.label.charAt(0).toUpperCase() + found.label.slice(1) : '';
    }).filter(Boolean);
    const updated = { ...formData, regionFocus };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step18-focus-root">
      <h2 className="step18-focus-title">
        Bạn muốn tập trung vào khu vực nào?
      </h2>

      <div className="step18-focus-list">
        {options.map((o, i) => (
          <div
            key={o.key}
            className={`step18-focus-card${selected.includes(o.key) ? ' selected' : ''}`}
            onClick={() => toggle(o.key)}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div className="card-left">
              {selected.includes(o.key) ? (
                <FaCheckSquare className="card-check" />
              ) : (
                <div className="card-check empty" />
              )}
              <span className="card-label">{o.label}</span>
            </div>
            <img src={o.img} alt={o.label} className="card-img" />
          </div>
        ))}
      </div>

      <button
        className="step18-focus-btn"
        disabled={selected.length === 0}
        onClick={handleContinue}
      >
        Tiếp tục →
      </button>
    </div>
  );
}
