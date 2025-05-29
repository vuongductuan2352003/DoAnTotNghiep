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
  { value: 'reduce_stress',     label: 'Giảm căng thẳng',               icon: <FaSpa /> },
  { value: 'increase_energy',   label: 'Tăng năng lượng',               icon: <FaBolt /> },
  { value: 'boost_metabolism',  label: 'Tăng cường trao đổi chất',      icon: <FaRocket /> }
];

const NONE = 'None'; // Quy ước chuẩn

// Hàm lấy label chuẩn hóa, luôn viết hoa chữ cái đầu
const getLabel = (value) => {
  const found = GOALS.find(g => g.value === value);
  if (!found) return '';
  return found.label.charAt(0).toUpperCase() + found.label.slice(1);
};

export default function Step27ExtraGoals() {
  const { formData, go, currentStep } = useOutletContext();

  // State khi quay lại, nếu có 'None' hoặc rỗng thì [NONE], còn lại map thành label tiếng Việt (viết hoa đầu)
  const [selected, setSelected] = useState(() => {
    const arr = Array.isArray(formData.extraGoals) ? formData.extraGoals : [];
    if (!arr.length || arr[0] === NONE) return [NONE];
    return arr.map(l => l.charAt(0).toUpperCase() + l.slice(1));
  });

  // Nếu chọn "None" thì clear hết, ngược lại thì không được chọn đồng thời với "None"
  useEffect(() => {
    if (selected.length > 1 && selected.includes(NONE)) {
      setSelected(selected.filter(v => v !== NONE));
    }
  }, [selected]);

  const handleToggle = (value) => {
    if (value === NONE) {
      setSelected([NONE]);
      return;
    }
    const label = getLabel(value);
    if (!label) return;
    if (selected.includes(NONE)) {
      setSelected([label]);
    } else if (selected.includes(label)) {
      const filtered = selected.filter(l => l !== label);
      setSelected(filtered.length ? filtered : [NONE]);
    } else {
      setSelected([...selected, label]);
    }
  };

  const handleContinue = () => {
    if (!selected.length) return;
    const toSave = selected.includes(NONE) ? [NONE] : selected;
    go(`step${currentStep + 1}`, { ...formData, extraGoals: toSave });
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
        {GOALS.map(goal => {
          const label = goal.label.charAt(0).toUpperCase() + goal.label.slice(1);
          return (
            <div
              key={goal.value}
              className={`step27-option-row${selected.includes(label) ? ' selected' : ''}`}
              onClick={() => handleToggle(goal.value)}
            >
              <span className="step27-icon">{goal.icon}</span>
              <span className="step27-label">{label}</span>
              <span className="step27-checkbox">
                <input type="checkbox" checked={selected.includes(label)} readOnly />
                <span className="step27-tickbox">{selected.includes(label) && <span>✔</span>}</span>
              </span>
            </div>
          );
        })}
        <div
          className={`step27-option-row none${selected.includes(NONE) ? ' selected' : ''}`}
          onClick={() => handleToggle(NONE)}
        >
          <span className="step27-label">Không có cái nào ở trên</span>
          <span className="step27-checkbox">
            <input type="checkbox" checked={selected.includes(NONE)} readOnly />
            <span className="step27-tickbox">
              {selected.includes(NONE) && <span>✕</span>}
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
