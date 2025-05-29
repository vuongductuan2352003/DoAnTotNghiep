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

export default function Step19Injury() {
  const { formData, go, currentStep } = useOutletContext();
  const initial = Array.isArray(formData.injuries) ? formData.injuries : [];
  const [selected, setSelected] = useState(initial);

  // Chọn / bỏ chọn
  const toggle = (key) => {
    if (key === 'none') {
      // clear mọi highlight khi chọn "none"
      setSelected([]);
      return;
    }
    setSelected((sel) =>
      sel.includes(key) ? sel.filter((x) => x !== key) : [...sel, key]
    );
  };

  // Khi nhấn Tiếp tục → lưu vào local và chuyển step
  const handleContinue = () => {
    const injuries = [...selected];
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
              className={`step19-item${
                selected.includes(opt.key) ? ' selected' : ''
              }`}
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
