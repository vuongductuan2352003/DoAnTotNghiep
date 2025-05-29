import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaCheckSquare } from 'react-icons/fa';
import images from '../../assets/loadImg.js';
import '../../styles/Step19.css';

const options = [
  { key: 'knee', label: 'Đầu gối nhạy cảm' },
  { key: 'back', label: 'Lưng nhạy cảm' },
  { key: 'none', label: 'Không, cảm ơn' },
];

// helper: map value tiếng Việt về key (phục hồi khi quay lại)
function getInitKeys(injuries) {
  if (!injuries) return [];
  if (Array.isArray(injuries)) {
    // Trường hợp chỉ chọn None
    if (injuries.includes('None')) return ['none'];
    // Trường hợp chọn các option khác
    return injuries.map(val => {
      const found = options.find(opt => 
        opt.label.toLowerCase() === val.toLowerCase() ||
        (val === 'None' && opt.key === 'none')
      );
      return found ? found.key : null;
    }).filter(Boolean);
  }
  return [];
}

export default function Step19Injury() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(getInitKeys(formData.injuries));

  // Chọn / bỏ chọn, option none chỉ được chọn một mình
  const toggle = (key) => {
    if (key === 'none') {
      setSelected(['none']);
    } else {
      setSelected((sel) => {
        // Bỏ "none" nếu đang chọn key khác
        const filtered = sel.filter(x => x !== 'none');
        // Toggle logic
        if (filtered.includes(key)) {
          return filtered.filter(x => x !== key);
        } else {
          return [...filtered, key];
        }
      });
    }
  };

  // Khi nhấn Tiếp tục → lưu mảng value tiếng Việt (hoặc "None")
  const handleContinue = () => {
    let injuries = [];
    if (selected.includes('none')) {
      injuries = ['None'];
    } else {
      injuries = selected.map(key => {
        const found = options.find(opt => opt.key === key);
        // Viết hoa chữ đầu
        return found ? (found.label.charAt(0).toUpperCase() + found.label.slice(1)) : '';
      }).filter(Boolean);
    }
    const updated = { ...formData, injuries };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step19-root">
      <h2 className="step19-title">Bạn có bị thương gì không?</h2>
      <p className="step19-subtitle">
        Chúng tôi sẽ điều chỉnh kế hoạch để bảo vệ các bộ phận cơ thể này
        khỏi những tổn thương thêm
      </p>

      <div className="step19-body">
        <div className="step19-options">
          {options.map((opt, i) => (
            <div
              key={opt.key}
              className={`step19-item${selected.includes(opt.key) ? ' selected' : ''}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              onClick={() => toggle(opt.key)}
            >
              <FaCheckSquare className="step19-checkbox" />
              <span className="step19-label">{opt.label}</span>
            </div>
          ))}
        </div>

        <div className="step19-image">
          <img
            src={images['bodystep19.png']}
            alt="body"
            className="step19-body-img"
          />
          {selected.includes('knee') && (
            <div className="injury-highlight knee" />
          )}
          {selected.includes('knee') && (
            <div className="injury-highlight kneee" />
          )}
          {selected.includes('back') && (
            <div className="injury-highlight back" />
          )}
        </div>
      </div>

      <button
        className="step19-btn"
        disabled={selected.length === 0}
        onClick={handleContinue}
      >
        Tiếp tục →
      </button>
    </div>
  );
}
