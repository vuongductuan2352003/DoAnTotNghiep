// src/pages/GetData/Step13.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaRegFrown,
  FaDumbbell,
  FaFire,
  FaTrophy,
  FaRegCheckCircle
} from 'react-icons/fa';
import '../../styles/Step13.css';

const options = [
  {
    key: 'none',
    icon: <FaRegFrown />,
    label: 'Không tập',
    desc:
      'Tôi chưa tập luyện, nhưng tôi sẽ làm sau khi yêu cầu chương trình tập luyện của mình!',
    statRate: 37,
    statText:
      'đã trả lời theo cùng một cách. Fitness & Health sẽ giúp bạn duy trì thói quen tập luyện.'
  },
  {
    key: '1-2',
    icon: <FaDumbbell />,
    label: '1–2 lần một tuần',
    statRate: 37,
    statText: 'Bạn sẽ dễ dàng duy trì một kế hoạch tập luyện hơn.'
  },
  {
    key: '3',
    icon: <FaFire />,
    label: '3 lần một tuần',
    statRate: 62,
    statText: 'Bạn sẽ dễ dàng duy trì một kế hoạch tập luyện hơn.'
  },
  {
    key: '>3',
    icon: <FaTrophy />,
    label: 'Hơn 3 lần một tuần',
    statRate: 82,
    statText: 'Bạn sẽ dễ dàng duy trì một kế hoạch tập luyện hơn.'
  }
];

export default function Step13() {
  const { formData, go, currentStep } = useOutletContext();
  const [freq, setFreq] = useState(formData.trainingFrequency || '');
  const [infoShown, setInfoShown] = useState(false);
  const infoRef = useRef(null);

  // lưu selection ngay khi click
  useEffect(() => {
    if (!freq) return;
    const updated = { ...formData, trainingFrequency: freq };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    // panel chưa bật lên ngay
  }, [freq]);

  // khi panel bật, scroll vào view
  useEffect(() => {
    if (infoShown && infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [infoShown]);

  const selOpt = options.find(o => o.key === freq);

  const handleButton = () => {
    if (!infoShown) {
      setInfoShown(true);
    } else {
      const updated = { ...formData, trainingFrequency: freq };
      go(`step${currentStep + 1}`, updated);
    }
  };

  return (
    <div className="step13-root">
      <h2 className="step13-title">
        Bạn đã tập luyện bao nhiêu lần mỗi tuần
        <br />
        trong 3 tháng qua?
      </h2>

      <div className="step13-list">
        {options.map((opt, idx) => (
          <div
            key={opt.key}
            className={`step13-item${freq === opt.key ? ' selected' : ''}`}
            onClick={() => {
              setFreq(opt.key);
              setInfoShown(false);
            }}
            style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
          >
            <div className="step13-item-left">
              <div className="step13-item-icon">{opt.icon}</div>
              <div>
                <div className="step13-item-label">{opt.label}</div>
                {opt.desc && (
                  <div className="step13-item-desc">{opt.desc}</div>
                )}
              </div>
            </div>
            <div className="step13-item-check">
              {freq === opt.key && <FaRegCheckCircle />}
            </div>
          </div>
        ))}
      </div>

      {/* panel xanh trước nút */}
      {infoShown && selOpt && (
        <div className="step13-info" ref={infoRef}>
          <div className="step13-info-icon">
            <FaDumbbell />
          </div>
          <div className="step13-info-text">
            <b>Bạn đã tập luyện nhiều hơn {selOpt.statRate}% người dùng*</b>
            <p>{selOpt.statText}</p>
            <div className="step13-info-note">
              *người dùng Fitness & Health đã làm bài kiểm tra
            </div>
          </div>
        </div>
      )}

      {/* nút Tiếp tục */}
      {freq && (
        <button className="step13-btn" onClick={handleButton}>
          Tiếp tục
        </button>
      )}
    </div>
  );
}
