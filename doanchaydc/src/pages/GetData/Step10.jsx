import React, { useState, useEffect } from 'react';
import '../../styles/Step10.css';
import { FaThumbsUp, FaThumbsDown, FaRegMeh } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import images from "../../assets/loadImg.js";
import { useOutletContext } from "react-router-dom";

// Key tiếng Anh, label tiếng Việt
const exercises = [
  { key: 'cardio', label: 'Cardio', image: images['cardio.png'] },
  { key: 'yoga', label: 'Yoga / Giãn cơ', image: images['yoga.png'] },
  { key: 'weights', label: 'Nâng tạ', image: images['weights.png'] },
  { key: 'pullup', label: 'Kéo xà', image: images['pullup.png'] },
  { key: 'squat', label: 'Squat với tạ', image: images['squat.png'] },
  { key: 'pushup', label: 'Chống đẩy', image: images['pushup.png'] }
];

const STORAGE_KEY = 'formData';

// Map số sang value tiếng Việt
const answerMap = {
  "-1": "Không thích",
  "0": "Trung lập",
  "1": "Thích"
};

export default function Step10Preference() {
  const { go, formData, currentStep } = useOutletContext();
  // answers sẽ luôn là { key: value (tiếng Việt) }
  const [answers, setAnswers] = useState(() => {
    let stored = (formData && formData.preferences) || {};
    if (!stored || Object.keys(stored).length === 0) {
      try {
        const fromLocal = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        if (fromLocal && fromLocal.preferences) stored = fromLocal.preferences;
      } catch {}
    }
    return stored || {};
  });

  const [step, setStep] = useState(() => {
    const keys = Object.keys(answers);
    if (keys.length === 0) return 0;
    const idx = exercises.findIndex(ex => !keys.includes(ex.key));
    return idx === -1 ? 0 : idx;
  });
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => {
    if (formData && formData.preferences) {
      setAnswers(formData.preferences);
      const keys = Object.keys(formData.preferences);
      const idx = exercises.findIndex(ex => !keys.includes(ex.key));
      setStep(idx === -1 ? 0 : idx);
    }
    // eslint-disable-next-line
  }, [formData && formData.preferences]);

  const handleAnswer = (typeNum) => {
    if (isAnimating) return;
    const ex = exercises[step];
    const type = answerMap[typeNum]; // Chuyển sang value tiếng Việt
    setAnswers(ans => {
      const next = { ...ans, [ex.key]: type };
      return next;
    });
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (step < exercises.length - 1) {
        setStep(step + 1);
      } else {
        // Lưu lại ĐẦY ĐỦ cả 3 trạng thái (thích, trung lập, không thích)
        const allAnswers = { ...answers, [ex.key]: type };
        const updated = { ...formData, preferences: allAnswers };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        go(`step${currentStep + 1}`, updated);
      }
    }, 350);
  };

  const handleBack = () => {
    if (step === 0) {
      go(`step${currentStep - 1}`, formData);
    } else {
      setStep(prev => prev - 1);
    }
  };

  const cur = exercises[step];
  const currentAnswer = answers[cur.key];

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
          className={`step10-btn dislike${currentAnswer === "Không thích" ? ' selected' : ''}`}
          onClick={() => handleAnswer(-1)}
          disabled={isAnimating}
        >
          <FaThumbsDown size={30} />
          <span>Không thích</span>
        </button>
        <button
          className={`step10-btn neutral${currentAnswer === "Trung lập" ? ' selected' : ''}`}
          onClick={() => handleAnswer(0)}
          disabled={isAnimating}
        >
          <FaRegMeh size={30} />
          <span>Trung lập</span>
        </button>
        <button
          className={`step10-btn like${currentAnswer === "Thích" ? ' selected' : ''}`}
          onClick={() => handleAnswer(1)}
          disabled={isAnimating}
        >
          <FaThumbsUp size={30} />
          <span>Thích</span>
        </button>
      </div>
      <div className="step10-progress">
        {exercises.map((ex, idx) => (
          <div
            key={ex.key}
            className={`step10-dot${idx === step ? ' active' : ''}${answers[ex.key] !== undefined ? ' answered' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
