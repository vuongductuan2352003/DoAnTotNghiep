// src/pages/GetData/Step11Location.jsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Dumbbell, Home, Sun, RefreshCw, X } from 'lucide-react';
import '../../styles/Step11.css';

const options = [
  { value: 'gym',     label: 'Tập luyện tại phòng gym',               Icon: Dumbbell },
  { value: 'home',    label: 'Tập luyện tại nhà',                     Icon: Home },
  { value: 'outdoor', label: 'Tập luyện ngoài trời',                  Icon: Sun },
  { value: 'combo',   label: 'Kết hợp phòng gym và tập luyện tại nhà', Icon: RefreshCw },
];

export default function Step11Location() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(formData.location || '');

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleContinue = () => {
    const updated = { ...formData, location: selected };
    window.localStorage.setItem('formData', JSON.stringify(updated));

    // nếu chọn gym thì nhảy trực tiếp sang step13, ngược lại sang step12
 const nextStep = (selected === 'gym' || selected === 'none')
    ? currentStep + 2
    : currentStep + 1;    go(`step${nextStep}`, updated);
  };

  return (
    <div className="step11-root">
      <h2 className="step11-title">Bạn quan tâm đến địa điểm tập luyện nào?</h2>
      <div className="step11-list">
        {options.map(({ value, label, Icon }) => (
          <div
            key={value}
            className={`step11-item${selected === value ? ' selected' : ''}`}
            onClick={() => handleSelect(value)}
          >
            <div className="step11-item-left">
              <Icon size={20} className="step11-item-icon"/>
              <span className="step11-item-label">{label}</span>
            </div>
            <div className="step11-item-check">
              {selected === value && <X size={18}/>}
            </div>
          </div>
        ))}
      </div>

      <hr className="step11-divider"/>

      <div
        className={`step11-none${selected === 'none' ? ' selected' : ''}`}
        onClick={() => handleSelect('none')}
      >
        <span>Không có lựa chọn</span>
        {selected === 'none' && <X size={18} className="step11-none-icon"/>}
      </div>

      <button
        className="step11-btn"
        onClick={handleContinue}
        disabled={!selected}
      >
        Tiếp tục →
      </button>
    </div>
  );
}
