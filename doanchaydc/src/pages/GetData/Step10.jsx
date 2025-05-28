// src/pages/GetData/Step10Preference.jsx
import React, { useState } from 'react';
import '../../styles/Step10.css';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaRegMeh } from "react-icons/fa";


import images from "../../assets/loadImg.js"; // <-- import đúng như step3

const exercises = [
  {
    key: 'cardio',
    label: 'Cardio',
    image: images['cardio'],
  },
  {
    key: 'yoga',
    label: 'Yoga / Giãn cơ',
    image: images['yoga'],
  },
  {
    key: 'weights',
    label: 'Nâng tạ',
    image: images['weights'],
  },
  {
    key: 'pullup',
    label: 'Kéo xà',
    image: images['pullup'],
  }
];


export default function Step10Preference() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({}); // { cardio: 1, ... }

  const handleAnswer = (type) => {
    const ex = exercises[step];
    setAnswers({ ...answers, [ex.key]: type });
    if (step < exercises.length - 1) setStep(step + 1);
    // else -> lưu vào localStorage/go next step...
  };

  const cur = exercises[step];

  return (
    <div className="step10-root">
      <h2 className="step10-title">Thích hay không thích</h2>
      <div className="step10-card">
        <img className="step10-img" src={cur.image} alt={cur.label} />
        <div className="step10-label">{cur.label}</div>
      </div>
      <div className="step10-options">
        <button className="step10-btn dislike" onClick={() => handleAnswer(-1)}>
          <FaThumbsDown size={32} />
          <span>Không thích</span>
        </button>
        <button className="step10-btn neutral" onClick={() => handleAnswer(0)}>
          <FaRegMeh size={32} />
          <span>Trung lập</span>
        </button>
        <button className="step10-btn like" onClick={() => handleAnswer(1)}>
          <FaThumbsUp size={32} />
          <span>Thích</span>
        </button>
      </div>
    </div>
  );
}
