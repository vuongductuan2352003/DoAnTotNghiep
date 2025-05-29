import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaTimes,
  FaDumbbell,
  FaWeightHanging,
  FaRunning,
  FaGripLines,
  FaCircleNotch
} from 'react-icons/fa';
import '../../styles/Step12.css';

const tools = [
  { key: 'dumbbell',       label: 'Tạ đơn',               icon: <FaDumbbell /> },
  { key: 'barbell',        label: 'Thanh tạ',             icon: <FaWeightHanging /> },
  { key: 'kettlebell',     label: 'Tạ ấm',                icon: <FaWeightHanging /> },
  { key: 'yogaMat',        label: 'Thảm tập yoga',        icon: <FaRunning /> },
  { key: 'jumpRope',       label: 'Dây nhảy',             icon: <FaGripLines /> },
  { key: 'pullUpBar',      label: 'Xà đơn gắn cửa',       icon: <FaGripLines /> },
  { key: 'resistanceBand', label: 'Dây kháng lực',        icon: <FaGripLines /> },
  { key: 'foamRoller',     label: 'Con lăn massage',      icon: <FaGripLines /> },
  { key: 'exerciseBall',   label: 'Bóng tập',             icon: <FaCircleNotch /> },
  { key: 'medicineBall',   label: 'Bóng thuốc',           icon: <FaCircleNotch /> },
  { key: 'abWheel',        label: 'Bánh xe tập bụng',     icon: <FaGripLines /> },
];

const noneOption = {
  key: 'none',
  label: 'Không có cái nào ở trên',
  icon: <FaTimes />
};

const NONE_VALUE = 'None';

// Convert value tiếng Việt về key
function labelToKey(label) {
  if (!label) return '';
  if (label === 'None') return 'none';
  const found = tools.find(t => t.label === label);
  return found ? found.key : '';
}

export default function Step12Location() {
  const { formData, go, currentStep } = useOutletContext();

  // Convert value tiếng Việt về key (kể cả lúc quay lại step này)
  const initial = useMemo(() => {
    let eq = formData.equipment;
    if (!eq) return [];
    if (Array.isArray(eq)) {
      return eq.map(labelToKey).filter(Boolean);
    }
    if (typeof eq === 'string' && eq.startsWith('[')) {
      try {
        const arr = JSON.parse(eq);
        return arr.map(labelToKey).filter(Boolean);
      } catch {
        return [];
      }
    }
    return [];
  }, [formData.equipment]);

  const [selected, setSelected] = useState(initial);

  const toggle = key => {
    if (key === 'none') {
      setSelected(['none']);
    } else {
      setSelected(curr =>
        curr.includes(key)
          ? curr.filter(k => k !== key)
          : [...curr.filter(k => k !== 'none'), key]
      );
    }
  };

  const handleContinue = () => {
    let toSave = [];
    if (selected.length === 0 || selected.includes('none')) {
      toSave = [NONE_VALUE];
    } else {
      toSave = selected.map(k => {
        const t = tools.find(x => x.key === k);
        return t ? capitalizeFirst(t.label) : k;
      });
    }
    const updated = { ...formData, equipment: toSave };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  function capitalizeFirst(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="step12-container">
      <h2 className="step12-title">Bạn có dụng cụ tập nào ở nhà?</h2>
      <div className="step12-grid">
        {tools.map((t, idx) => (
          <div
            key={t.key}
            className={`step12-item ${selected.includes(t.key) ? 'selected' : ''}`}
            style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
            onClick={() => toggle(t.key)}
          >
            <div className="step12-icon">{t.icon}</div>
            <div className="step12-label">{t.label}</div>
          </div>
        ))}

        <div className="step12-separator" />

        <div
          className={`step12-item none-option ${selected.includes('none') ? 'selected' : ''}`}
          onClick={() => toggle('none')}
          style={{ animationDelay: `${0.1 + tools.length * 0.05}s` }}
        >
          <div className="step12-icon">{noneOption.icon}</div>
          <div className="step12-label">{noneOption.label}</div>
        </div>
      </div>

      <button
        className="step12-button"
        disabled={selected.length === 0}
        onClick={handleContinue}
      >
        Tiếp tục →
      </button>
    </div>
  );
}
