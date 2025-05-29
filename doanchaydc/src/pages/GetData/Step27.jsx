import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaBed, FaCalendarCheck, FaPlus, FaSpa, FaBolt, FaRocket
} from 'react-icons/fa';
import '../../styles/Step27.css';

const GOALS = [
  { value: 'better_sleep',      label: 'Cải thiện giấc ngủ',           icon: <FaBed /> },
  { value: 'habit',             label: 'Hình thành thói quen thể chất',icon: <FaCalendarCheck /> },
  { value: 'feel_better',       label: 'Cảm thấy khỏe mạnh hơn',        icon: <FaPlus /> },
  { value: 'reduce_stress',     label: 'Giảm Căng thẳng',               icon: <FaSpa /> },
  { value: 'increase_energy',   label: 'Tăng năng lượng',               icon: <FaBolt /> },
  { value: 'boost_metabolism',  label: 'Tăng cường trao đổi chất',      icon: <FaRocket /> }
];

export default function Step27ExtraGoals() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(formData.extraGoals || []);

  // Nếu vừa chọn "Không có cái nào" mà lại chọn mục khác thì bỏ "none"
  useEffect(() => {
    if (selected.length > 1 && selected.includes('none')) {
      setSelected(selected.filter(v => v !== 'none'));
    }
  }, [selected]);

  const handleToggle = (value) => {
    if (value === 'none') {
      setSelected(['none']);
    } else {
      if (selected.includes(value)) {
        setSelected(selected.filter(v => v !== value));
      } else {
        setSelected([...selected.filter(v => v !== 'none'), value]);
      }
    }
  };

  const handleContinue = () => {
    if (!selected.length) return;
    // Lưu vào local & chuyển bước tiếp
    if (selected.length === 1 && selected[0] === 'none') {
      go(`step${currentStep + 1}`, { ...formData, extraGoals: [] });
    } else {
      go(`step${currentStep + 1}`, { ...formData, extraGoals: selected });
    }
  };

  return (
    <div className="step27-root">
      <div className="step27-desc">
        Chúng tôi chắc chắn rằng bạn không chỉ muốn có một cơ thể đẹp hơn mà còn muốn cải thiện lối sống của mình.
      </div>
      <h2 className="step27-title">
        <span>Đánh dấu vào các mục tiêu<br />bổ sung của bạn dưới đây:</span>
      </h2>
      <div className="step27-options-list">
        {GOALS.map(goal => (
          <div
            key={goal.value}
            className={`step27-option-row${selected.includes(goal.value) ? ' selected' : ''}`}
            onClick={() => handleToggle(goal.value)}
          >
            <span className="step27-icon">{goal.icon}</span>
            <span className="step27-label">{goal.label}</span>
            <span className="step27-checkbox">
              <input type="checkbox" checked={selected.includes(goal.value)} readOnly />
              <span className="step27-tickbox">{selected.includes(goal.value) && <span>✔</span>}</span>
            </span>
          </div>
        ))}
        <div
          className={`step27-option-row none${selected.includes('none') ? ' selected' : ''}`}
          onClick={() => handleToggle('none')}
        >
          <span className="step27-label">Không có cái nào ở trên</span>
          <span className="step27-checkbox">
            <input type="checkbox" checked={selected.includes('none')} readOnly />
            <span className="step27-tickbox">
              {selected.includes('none') && <span>✕</span>}
            </span>
          </span>
        </div>
      </div>
      <button
        className="step27-btn"
        onClick={handleContinue}
        disabled={!selected.length}
      >
        Tiếp tục
      </button>
    </div>
  );
}
