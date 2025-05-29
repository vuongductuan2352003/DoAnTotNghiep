// src/pages/GetData/Step12Location.jsx
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
  { key: 'foamRoller',     label: 'Con lăn massage',       icon: <FaGripLines /> },
  { key: 'exerciseBall',   label: 'Bóng tập',              icon: <FaCircleNotch /> },
  { key: 'medicineBall',   label: 'Bóng thuốc',            icon: <FaCircleNotch /> },
  { key: 'abWheel',        label: 'Bánh xe tập bụng',      icon: <FaGripLines /> },
];

const noneOption = {
  key: 'none',
  label: 'Không có cái nào ở trên',
  icon: <FaTimes />
};

export default function Step12Location() {
  const { formData, go, currentStep } = useOutletContext();

  // Chuyển formData.equipment thành mảng ban đầu
  const initial = useMemo(() => {
    const eq = formData.equipment;
    if (Array.isArray(eq)) return eq;
    if (typeof eq === 'string' && eq.startsWith('[')) {
      try {
        return JSON.parse(eq);
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
    // Lưu equipment trực tiếp dưới dạng mảng
    const updated = {
      ...formData,
      equipment: selected
    };
    // Lưu toàn bộ formData (equipment là array) vào localStorage
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

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
