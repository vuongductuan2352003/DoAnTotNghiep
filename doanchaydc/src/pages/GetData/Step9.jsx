// src/pages/GetData/Step9.jsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step9.css';

const levels = [
  {
    key: 'beginner',
    title: 'Sơ cấp',
    desc: 'Bất cứ khi nào tôi ngồi trên sàn, tôi rất khó để đứng lên.',
  },
  {
    key: 'intermediate',
    title: 'Nghiệp dư',
    desc: 'Tôi cố gắng tập thể dục mỗi tuần một lần, nhưng vẫn không đều đặn.',
  },
  {
    key: 'advanced',
    title: 'Cao cấp',
    desc: 'Tôi đang làm rất tốt! Tôi đang trong hình dáng đẹp nhất của cuộc đời mình.',
  },
];

export default function Step9() {
  const { formData, go, currentStep } = useOutletContext();
  const [level, setLevel] = useState(formData.fitnessLevel || '');

  // Lưu vào localStorage mỗi khi chọn
  const handleSelect = (key) => {
    setLevel(key);
    const updated = { ...formData, fitnessLevel: key };
    window.localStorage.setItem('formData', JSON.stringify(updated));
  };

  const handleContinue = () => {
    const updated = { ...formData, fitnessLevel: level };
    go(`step${currentStep+1}`, updated);
  };

  return (
    <div className="step9-root">
      <h2 className="step9-title">Mức độ tập thể hình của bạn<br/>là gì?</h2>
      <div className="step9-list">
        {levels.map((item) => (
          <div
            className={`step9-card${level === item.key ? ' selected' : ''}`}
            key={item.key}
            onClick={() => handleSelect(item.key)}
          >
            <div className="step9-card-title">{item.title}</div>
            <div className="step9-card-desc">{item.desc}</div>
          </div>
        ))}
      </div>
      <button
        className="step9-btn"
        onClick={handleContinue}
        disabled={!level}
      >
        Tiếp tục →
      </button>
    </div>
  );
}
