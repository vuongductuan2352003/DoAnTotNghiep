import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaRegClock, FaThumbsUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Step16.css';

const options = [
  { key: '10-15', label: '10–15 phút', icon: <FaRegClock /> },
  { key: '20-30', label: '20–30 phút', icon: <FaRegClock /> },
  { key: '30-40', label: '30–40 phút', icon: <FaRegClock /> },
  { key: '40-60', label: '40–60 phút', icon: <FaRegClock /> },
  { key: 'auto',  label: 'Hãy để Fitness & Health quyết định', icon: <FaThumbsUp /> },
];

export default function Step16() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(formData.duration || '');

  const handleSelect = (key) => {
    const updated = { ...formData, duration: key };
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
