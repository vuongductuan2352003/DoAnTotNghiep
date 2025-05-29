import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step33.css';

const OPTIONS = [
  { value: 'lt5', label: 'Ít hơn 5 giờ' },
  { value: '5_6', label: '5-6 giờ 😪' },
  { value: '7_8', label: '7-8 giờ 🌙' },
  { value: 'gt8', label: 'Hơn 8 giờ 😴' },
];

const RECOMMEND = {
  lt5: {
    title: 'Bạn đang thiếu ngủ!',
    msg: 'Ngủ dưới 5 tiếng mỗi đêm sẽ gây hại nghiêm trọng cho sức khỏe và hiệu quả tập luyện. Hãy cố gắng ngủ đủ 7-8 giờ mỗi ngày để phục hồi cơ thể tốt hơn.',
  },
  '5_6': {
    title: 'Bạn ngủ chưa đủ!',
    msg: '5-6 giờ/ngày vẫn chưa đủ cho cơ thể hồi phục và phát triển. Hãy sắp xếp thời gian để ngủ đủ từ 7-8 giờ/ngày giúp tăng sức khỏe, hiệu quả học tập và tập luyện.',
  },
  '7_8': {
    title: 'Tuyệt vời!',
    msg: 'Bạn ngủ đủ 7-8 giờ/ngày – đây là mức lý tưởng giúp cơ thể phục hồi và phát triển tốt. Tiếp tục duy trì thói quen này nhé!',
  },
  gt8: {
    title: 'Rất tốt!',
    msg: 'Bạn đang ngủ nhiều hơn 8 giờ/ngày. Điều này rất tốt, nhưng nếu ngủ quá nhiều mà vẫn mệt mỏi, hãy kiểm tra chất lượng giấc ngủ và sinh hoạt nhé!',
  },
};

export default function Step33Sleep() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(() => {
    return formData.sleep || localStorage.getItem('sleep') || '';
  });
  const [showPopup, setShowPopup] = useState(false);

  // Tạo ref cho box popup
  const popupRef = useRef(null);

  const handleChoose = (value) => {
    setSelected(value);
    localStorage.setItem('sleep', value);
    setShowPopup(false); // Nếu chọn lại, ẩn popup khuyến nghị
  };

  useEffect(() => {
    if (formData.sleep) {
      setSelected(formData.sleep);
      localStorage.setItem('sleep', formData.sleep);
    }
    // eslint-disable-next-line
  }, [formData.sleep]);

  // Auto scroll tới popup khi hiện ra
  useEffect(() => {
    if (showPopup && popupRef.current) {
      popupRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showPopup]);

  const handleContinue = () => {
    // Nếu chưa show popup thì show popup
    if (!showPopup && selected) {
      setShowPopup(true);
    } else if (showPopup && selected) {
      // Nếu đã show popup rồi thì sang step tiếp
      go(`step${currentStep + 1}`, { ...formData, sleep: selected });
    }
  };

  return (
    <div className="step33-root">
      <h2 className="step33-title animate-fadein">Bạn thường ngủ được bao lâu?</h2>
      <div className="step33-options">
        {OPTIONS.map((option) => (
          <div
            key={option.value}
            className={`step33-option${selected === option.value ? ' selected' : ''}`}
            onClick={() => handleChoose(option.value)}
          >
            <span className="step33-label">{option.label}</span>
            <span className="step33-check">{selected === option.value && '✔'}</span>
          </div>
        ))}
      </div>
      {/* Hiện popup khuyến nghị */}
      {showPopup && selected && (
        <div className="step33-popup animate-fadein" ref={popupRef}>
          <div className="step33-popup-title">{RECOMMEND[selected].title}</div>
          <div className="step33-popup-desc">{RECOMMEND[selected].msg}</div>
        </div>
      )}
      <button
        className="step33-btn"
        onClick={handleContinue}
        disabled={!selected}
      >
        {showPopup ?  'Đã hiểu': 'Tiếp tục →'}
      </button>
    </div>
  );
}
