import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaRegClock, FaThumbsUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../styles/Step16.css';

const options = [
  { key: '10-15', label: '10–15 phút', icon: <FaRegClock /> },
  { key: '20-30', label: '20–30 phút', icon: <FaRegClock /> },
  { key: '30-40', label: '30–40 phút', icon: <FaRegClock /> },
  { key: '40-60', label: '40–60 phút', icon: <FaRegClock /> },
  { key: 'auto',  label: 'Hãy để Fitness & Health quyết định', icon: <FaThumbsUp /> },
];

function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// map value về key (khi quay lại form)
function getInitKey(value) {
  if (!value) return '';
  if (value === 'auto') return 'auto';
  const found = options.find(opt => opt.label === value);
  return found ? found.key : '';
}

export default function Step16() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(getInitKey(formData.duration));

  const handleSelect = (key) => {
    let durationValue;
    if (key === 'auto') {
      durationValue = 'auto';
    } else {
      const found = options.find(opt => opt.key === key);
      durationValue = found ? capitalizeFirst(found.label) : '';
    }
    const updated = { ...formData, duration: durationValue };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated);
  };

  return (
    <div className="step16-root">
      <h2 className="step16-title">Bạn sẵn sàng dành bao nhiêu thời gian cho một buổi tập luyện?</h2>
      <div className="step16-grid">
        {options.map((opt, i) => (
          <motion.div
            key={opt.key}
            className={`step16-item ${selected === opt.key ? 'selected' : ''}`}
            onClick={() => handleSelect(opt.key)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 100 }}
          >
            <div className="step16-icon">{opt.icon}</div>
            <div className="step16-label">{opt.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
