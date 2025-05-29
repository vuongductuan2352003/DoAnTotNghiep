// src/pages/GetData/Step15.jsx
import React, { useState, useEffect } from 'react';
import { FaCheck, FaCalendarAlt, FaTimesCircle } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step15.css';

const weekdays = [
  'Thứ hai', 'Thứ ba', 'Thứ tư',
  'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'
];

const NONE = 'none';

export default function Step15() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(formData.weeklySessions || []);
  const [showAdvice, setShowAdvice] = useState(false);

  // Toggle logic theo yêu cầu
  const toggleDay = (day) => {
    if (day === NONE) {
      setSelected([NONE]);
    } else {
      setSelected(sel => {
        // Nếu đang chọn "Không chắc", bỏ nó ra khỏi selected
        const filtered = sel.filter(x => x !== NONE);
        // Toggle ngày
        if (filtered.includes(day)) {
          return filtered.filter(x => x !== day);
        } else {
          return [...filtered, day];
        }
      });
    }
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
    // Nếu chọn "Không chắc", chuyển luôn bước không hiện advice
    if (selected.length === 1 && selected[0] === NONE) {
      const updated = { ...formData, weeklySessions: selected };
      window.localStorage.setItem('formData', JSON.stringify(updated));
      go(`step${currentStep + 1}`, updated);
      return;
    }
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
        {weekdays.map((d, i) => (
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
          className={`step15-item none${selected.includes(NONE) ? ' selected' : ''}`}
          onClick={() => toggleDay(NONE)}
          style={{ animationDelay: `${weekdays.length * 0.05 + 0.1}s` }}
        >
          {selected.includes(NONE)
            ? <FaCheck className="icon-check" />
            : <FaTimesCircle className="icon-box" />
          }
          <span>Không chắc</span>
        </div>
      </div>

      {showAdvice && !(selected.length === 1 && selected[0] === NONE) && (
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
        {showAdvice && !(selected.length === 1 && selected[0] === NONE)
          ? 'Đã hiểu →'
          : 'Tiếp tục →'}
      </button>
    </div>
  );
}
