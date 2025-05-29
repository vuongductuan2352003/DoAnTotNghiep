// src/pages/GetData/Step15.jsx
import React, { useState, useEffect } from 'react';
import { FaCheck, FaCalendarAlt, FaTimesCircle } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step15.css';

const weekdays = [
  'Thứ hai', 'Thứ ba', 'Thứ tư',
  'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'
];

export default function Step15() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(formData.weeklySessions || []);
  const [showAdvice, setShowAdvice] = useState(false);

  const toggleDay = (day) => {
    setSelected(sel =>
      sel.includes(day)
        ? sel.filter(x => x !== day)
        : [...sel, day]
    );
  };

  // Khi advice bật lên, scroll vào view
  useEffect(() => {
    if (showAdvice) {
      document.querySelector('.step15-advice').scrollIntoView({ 
        behavior: 'smooth', block: 'start' 
      });
    }
  }, [showAdvice]);

  const handleContinue = () => {
    if (!showAdvice) {
      // bước 1: hiển thị lời khuyên
      if (selected.length === 0) return;
      setShowAdvice(true);
      return;
    }
    // bước 2: lưu và chuyển tiếp
    const updated = { ...formData, weeklySessions: selected };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step15-root">
      <h2 className="step15-title">
        Chọn những ngày bạn thường rảnh để tập luyện
      </h2>
      <p className="step15-sub">
        Nghỉ ít nhất 2 ngày để hồi phục
      </p>

      <div className="step15-list">
        {weekdays.map((d,i) => (
          <div
            key={d}
            className={`step15-item${selected.includes(d) ? ' selected' : ''}`}
            onClick={() => toggleDay(d)}
            style={{ animationDelay: `${i * 0.05 + 0.1}s` }}
          >
            {selected.includes(d)
              ? <FaCheck className="icon-check" />
              : <FaCalendarAlt className="icon-box" />
            }
            <span>{d}</span>
          </div>
        ))}

        <div
          className={`step15-item none${selected.includes('none') ? ' selected' : ''}`}
          onClick={() => toggleDay('none')}
          style={{ animationDelay: `${weekdays.length * 0.05 + 0.1}s` }}
        >
          {selected.includes('none')
            ? <FaCheck className="icon-check" />
            : <FaTimesCircle className="icon-box" />
          }
          <span>Không chắc</span>
        </div>
      </div>

      {showAdvice && (
        <div className="step15-advice">
          <FaCalendarAlt className="advice-icon" />
          <div className="advice-text">
            <strong>Những ngày nghỉ ngơi rất quan trọng!</strong>
            <p>
              Với mỗi lần tập luyện, bạn sẽ tạo ra những vết rách cực nhỏ trong các mô cơ 
              của mình. Khi bạn nghỉ ngơi, cơ bắp của bạn bắt đầu lành lại và phát triển mạnh mẽ hơn.
            </p>
          </div>
        </div>
      )}

      <button
        className="step15-btn"
        onClick={handleContinue}
        disabled={!showAdvice && selected.length === 0}
      >
        {showAdvice ? 'Đã hiểu →' : 'Tiếp tục →'}
      </button>
    </div>
  );
}
