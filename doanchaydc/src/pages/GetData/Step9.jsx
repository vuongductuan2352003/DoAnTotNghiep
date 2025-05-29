import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';
import '../../styles/Step9.css';

// Map giữa key và value tiếng Việt
const levelMap = [
  {
    key: 'beginner',
    value: 'Sơ cấp',
    desc: 'Chưa thử hoặc mới bắt đầu tập tạ.',
    icons: 1
  },
  {
    key: 'intermediate',
    value: 'Trung cấp',
    desc: 'Đã thử và thực hành các bài tập phổ biến.',
    icons: 2
  },
  {
    key: 'advanced',
    value: 'Cao cấp',
    desc: 'Đã rèn luyện sức mạnh trong nhiều năm.',
    icons: 3
  },
];

// Map value tiếng Việt sang key tiếng Anh (nếu cần logic)
const valueToKey = Object.fromEntries(levelMap.map(({key, value}) => [value, key]));

export default function Step9() {
  const { formData, go, currentStep } = useOutletContext();

  // Mặc định lấy value tiếng Việt trong formData, hoặc lấy localStorage (cũng value tiếng Việt)
  const [selected, setSelected] = useState(() => {
    if (formData?.fitnessLevel) return formData.fitnessLevel;
    try {
      const local = JSON.parse(window.localStorage.getItem('formData'));
      return local?.fitnessLevel || '';
    } catch {
      return '';
    }
  });

  // Khi formData thay đổi (quay lại), cập nhật lại selected
  useEffect(() => {
    if (formData?.fitnessLevel) {
      setSelected(formData.fitnessLevel);
    }
  }, [formData]);

  // Khi chọn thì lưu value tiếng Việt vào formData/localStorage
  const handleSelect = (value) => {
    setSelected(value);
    const updated = { ...formData, fitnessLevel: value };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    setTimeout(() => go(`step${currentStep + 1}`, updated), 180);
  };

  return (
    <div className="step9-root">
      <h2 className="step9-title">
        Mức độ tập luyện của bạn<br />là gì?
      </h2>
      <div className="step9-list">
        {levelMap.map((item, idx) => (
          <div
            key={item.key}
            className={`step9-card${selected === item.value ? ' selected' : ''}`}
            style={{ animationDelay: `${idx * 0.09}s` }}
            onClick={() => handleSelect(item.value)}
          >
            <div className="step9-card-icon">
              {Array(item.icons).fill().map((_, i) => <FaBolt key={i} />)}
            </div>
            <div className="step9-card-title">{item.value}</div>
            <div className="step9-card-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
