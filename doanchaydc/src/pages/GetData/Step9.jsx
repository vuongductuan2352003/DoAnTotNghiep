// src/pages/GetData/Step9.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';
import '../../styles/Step9.css';

const levels = [
  {
    key: 'beginner',
    title: 'Sơ cấp',
    desc: 'Chưa thử hoặc mới bắt đầu tập tạ.',
    icons: 1
  },
  {
    key: 'intermediate',
    title: 'Trung cấp',
    desc: 'Đã thử và thực hành các bài tập phổ biến.',
    icons: 2
  },
  {
    key: 'advanced',
    title: 'Cao cấp',
    desc: 'Đã rèn luyện sức mạnh trong nhiều năm.',
    icons: 3
  },
];

export default function Step9() {
  const { formData, go, currentStep } = useOutletContext();

  const handleSelect = (key) => {
    const updated = { ...formData, fitnessLevel: key };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step9-root">
      <h2 className="step9-title">
        Mức độ tập luyện của bạn<br/>là gì?
      </h2>

      <div className="step9-list">
        {levels.map(item => (
          <div
            key={item.key}
            className="step9-card"
            onClick={() => handleSelect(item.key)}
          >
            <div className="step9-card-icon">
              {Array(item.icons).fill().map((_, i) => <FaBolt key={i} />)}
            </div>
            <div className="step9-card-title">{item.title}</div>
            <div className="step9-card-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
