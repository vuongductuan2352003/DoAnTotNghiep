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

  // selected là value tiếng Việt (label)
  const selected = formData.routine || "";

  const handleChoose = (value) => {
    // Lấy label tiếng Việt theo value
    const label = OPTIONS.find(opt => opt.value === value)?.label || "";
    // Lưu label vào routine
    go(`step${currentStep + 1}`, { ...formData, routine: label });
  };

  return (
    <div className="step23-root">
      <h2 className="step23-title">Bạn mô tả một ngày điển hình của bạn như thế nào?</h2>
      <div className="step23-options">
        {OPTIONS.map((opt, idx) => (
          <div
            className={`step23-option${selected === opt.label ? ' selected' : ''}`}
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
