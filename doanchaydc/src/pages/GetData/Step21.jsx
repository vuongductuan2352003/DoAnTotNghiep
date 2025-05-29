// src/pages/GetData/Step21.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaBan, FaRegFrown, FaRegMeh } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';

import '../../styles/Step21.css';

const options = [
  { key: 'none',  label: 'Tôi không thể thực hiện 1 lần kéo nào', Icon: FaBan },
  { key: '<5',    label: 'Ít hơn 5',                        Icon: FaRegFrown },
  { key: '5-10',  label: '5 đến 10',                        Icon: FaRegMeh },
  { key: '>10',   label: 'Hơn 10',                           Icon: FaDumbbell },  // <-- здесь
];

export default function Step21() {
  const { formData, go, currentStep } = useOutletContext();
  const selected = formData.pullups || '';

  const handleSelect = (key) => {
    const updated = { ...formData, pullups: key };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step21-root">
      <h2 className="step21-title">
        Bạn có thể thực hiện bao nhiêu lần kéo xà<br/>trong một hiệp?
      </h2>

      <div className="step21-list">
        {options.map(({ key, label, Icon }, i) => (
          <div
            key={key}
            className={`step21-item${selected === key ? ' selected' : ''}`}
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            onClick={() => handleSelect(key)}
          >
            <span className="step21-label">{label}</span>
            <Icon className="step21-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}
