// src/pages/GetData/Step23Routine.jsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step23.css';

const OPTIONS = [
  { value: 'sit_most', label: 'Tôi dành phần lớn thời gian trong ngày để ngồi' },
  { value: 'take_breaks', label: 'Tôi chủ động nghỉ giải lao' },
  { value: 'stand_all_day', label: 'Tôi đứng trên đôi chân của mình cả ngày dài' }
];

export default function Step23Routine() {
  const { go, currentStep, formData = {} } = useOutletContext();
  // Nếu muốn giữ lại lựa chọn khi quay lại, dùng formData.routine nếu có
  const [selected, setSelected] = useState(formData.routine || "");

  const handleChoose = (value) => {
    setSelected(value);
    // Nếu không dùng setFormData, chỉ truyền routine sang step tiếp theo
    go(`step${currentStep + 1}`, { ...formData, routine: value });
  };

  return (
    <div className="step23-root">
      <h2 className="step23-title">Bạn mô tả một ngày điển hình của bạn như thế nào?</h2>
      <div className="step23-options">
        {OPTIONS.map((opt, idx) => (
          <div
            className={`step23-option${selected === opt.value ? ' selected' : ''}`}
            key={opt.value}
            style={{ animationDelay: `${0.06 + idx * 0.08}s` }}
            onClick={() => handleChoose(opt.value)}
          >
            <span>{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
