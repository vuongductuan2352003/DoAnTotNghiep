// src/pages/GetData/Step10Preference.jsx
import React, { useState } from 'react';
import '../../styles/Step10.css';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaRegMeh } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import images from "../../assets/loadImg.js"; // Import đúng như step3
import { useOutletContext } from "react-router-dom";

const exercises = [
  { key: 'cardio', label: 'Cardio', image: images['cardio.png'] },
  { key: 'yoga', label: 'Yoga / Giãn cơ', image: images['yoga.png'] },
  { key: 'weights', label: 'Nâng tạ', image: images['weights.png'] },
  { key: 'pullup', label: 'Kéo xà', image: images['pullup.png'] }
];

export default function Step10Preference() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setAnimating] = useState(false);
  const { go, formData, currentStep } = useOutletContext();

  const handleAnswer = (type) => {
    if (isAnimating) return; // chống spam click
    const ex = exercises[step];
    setAnswers(ans => ({ ...ans, [ex.key]: type }));
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (step < exercises.length - 1) {
        setStep(step + 1);
      } else {
        // Lưu lại chỉ các bài được thích (1) hoặc trung lập (0)
        const liked = {};
        Object.entries({ ...answers, [ex.key]: type }).forEach(([k, v]) => {
          if (v !== -1) liked[k] = v;
        });
        const updated = { ...formData, preferences: liked };
        window.localStorage.setItem('formData', JSON.stringify(updated));
        go(`step${currentStep + 1}`, updated);
      }
    }, 350); // Đủ thời gian cho animation out
  };

  const cur = exercises[step];

  return (
    <div className="step10-root">
      <h2 className="step10-title">Thích hay không thích</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="step10-card"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.97 }}
          transition={{ duration: 0.32, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <img className="step10-img" src={cur.image} alt={cur.label} />
          <div className="step10-label">{cur.label}</div>
        </motion.div>
      </AnimatePresence>
      <div className="step10-options">
        <button
          className="step10-btn dislike"
          onClick={() => handleAnswer(-1)}
          disabled={isAnimating}
        >
          <FaThumbsDown size={30} />
          <span>Không thích</span>
        </button>
        <button
          className="step10-btn neutral"
          onClick={() => handleAnswer(0)}
          disabled={isAnimating}
        >
          <FaRegMeh size={30} />
          <span>Trung lập</span>
        </button>
        <button
          className="step10-btn like"
          onClick={() => handleAnswer(1)}
          disabled={isAnimating}
        >
          <FaThumbsUp size={30} />
          <span>Thích</span>
        </button>
      </div>
    </div>
  );
}
