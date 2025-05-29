import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Dumbbell, Home, Sun, RefreshCw, X } from 'lucide-react';
import '../../styles/Step11.css';

const options = [
  { key: 'gym',     label: 'Tập luyện tại phòng gym',               Icon: Dumbbell },
  { key: 'home',    label: 'Tập luyện tại nhà',                     Icon: Home },
  { key: 'outdoor', label: 'Tập luyện ngoài trời',                  Icon: Sun },
  { key: 'combo',   label: 'Kết hợp phòng gym và tập luyện tại nhà', Icon: RefreshCw },
];

const NONE_VALUE = 'None';

export default function Step11Location() {
  const { formData, go, currentStep } = useOutletContext();

  // mapping mọi value về key để selected hoạt động đúng với cả value tiếng Anh và tiếng Việt
  const getInitKey = (value) => {
    if (!value || value === NONE_VALUE) return NONE_VALUE;
    // Nếu là key tiếng Anh
    if (options.some(opt => opt.key === value)) return value;
    // Nếu là label tiếng Việt
    const found = options.find(opt => opt.label === value);
    if (found) return found.key;
    return NONE_VALUE;
  };

  const [selected, setSelected] = useState(getInitKey(formData.location));

  useEffect(() => {
    setSelected(getInitKey(formData.location));
  }, [formData.location]);

  const handleSelect = (key) => {
    setSelected(key);
  };

  const handleContinue = () => {
    // Mapping key -> value tiếng Việt, hoặc None
    let locationValue = NONE_VALUE;
    if (selected && selected !== NONE_VALUE) {
      const found = options.find(opt => opt.key === selected);
      locationValue = found ? capitalizeFirst(found.label) : NONE_VALUE;
    }
    const updated = { ...formData, location: locationValue };
    window.localStorage.setItem('formData', JSON.stringify(updated));

    // Nếu chọn Gym hoặc None thì nhảy trực tiếp sang step13, ngược lại sang step12
    const nextStep = (selected === 'gym' || selected === NONE_VALUE)
      ? currentStep + 2
      : currentStep + 1;
    go(`step${nextStep}`, updated);
  };

  function capitalizeFirst(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="step11-root">
      <h2 className="step11-title">Bạn quan tâm đến địa điểm tập luyện nào?</h2>
      <div className="step11-list">
        {options.map(({ key, label, Icon }) => (
          <div
            key={key}
            className={`step11-item${selected === key ? ' selected' : ''}`}
            onClick={() => handleSelect(key)}
          >
            <div className="step11-item-left">
              <Icon size={20} className="step11-item-icon" />
              <span className="step11-item-label">{label}</span>
            </div>
            <div className="step11-item-check">
              {selected === key && <X size={18} />}
            </div>
          </div>
        ))}
      </div>

      <hr className="step11-divider" />

      <div
        className={`step11-none${selected === NONE_VALUE ? ' selected' : ''}`}
        onClick={() => handleSelect(NONE_VALUE)}
      >
        <span>Không có lựa chọn</span>
        {selected === NONE_VALUE && <X size={18} className="step11-none-icon" />}
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
