import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import '../../styles/Step20.css';

// key: để code, label: tiếng Việt, value: sẽ lưu xuống local
const options = [
  { key: '<10',   label: 'Dưới 10',   Icon: FaBolt },
  { key: '10-20', label: '10 đến 20', Icon: FaBolt },
  { key: '21-30', label: '21 đến 30', Icon: FaBolt },
  { key: '>30',   label: 'Hơn 30',    Icon: FaDumbbell },
];

export default function Step20Pushups() {
  const { formData, go, currentStep } = useOutletContext();
  // khôi phục value tiếng Việt (nếu có)
  const selected = options.find(opt => opt.label === formData.pushups)?.key || '';

  // Khi chọn thì lưu value tiếng Việt xuống formData.pushups
  const handleSelect = (key) => {
    const opt = options.find(o => o.key === key);
    const pushups = opt ? capitalizeFirst(opt.label) : 'None'; // default "None" nếu ko có
    const updated = { ...formData, pushups };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  // Viết hoa chữ cái đầu
  function capitalizeFirst(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="step20-root">
      <h2 className="step20-title">
        Bạn có thể thực hiện bao nhiêu cái chống đẩy<br/>
        trong một hiệp?
      </h2>
      <div className="step20-list">
        {options.map(({ key, label, Icon }) => (
          <div
            key={key}
            className={`step20-item${selected === key ? ' selected' : ''}`}
            onClick={() => handleSelect(key)}
          >
            <span className="step20-label">{label}</span>
            <Icon className="step20-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}
