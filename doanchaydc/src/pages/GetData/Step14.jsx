// src/pages/GetData/Step14.jsx
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';  // <-- gym icon
import '../../styles/Step14.css';

export default function Step14() {
  const { formData, go, currentStep } = useOutletContext();

  // Khi nhấn Đã hiểu, chuyển tiếp và giữ nguyên formData
  const handleContinue = () => {
    go(`step${currentStep + 1}`, { ...formData });
  };

  // Cuộn về đầu khi mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="step14-root">
      <h2 className="step14-halfway">Được nửa đường rồi!</h2>

      <div className="step14-icon">
        {/* Gym icon */}
        <FaDumbbell className="step14-main-icon" />
        {/* Confetti dots */}
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`step14-dot dot-${i+1}`} />
        ))}
      </div>

      <h3 className="step14-question">
        Tại sao mọi người từ bỏ tập thể dục?
      </h3>

      <p className="step14-highlight">
        Lý do số 1 là bắt đầu tập luyện quá nặng và quá nhanh
      </p>

      <div className="step14-body">
        <p>
          Bạn sẽ đạt được nhiều thành tựu hơn là chỉ vài tuần tập thể dục.
        </p>
        <p>
          Chúng tôi sẽ không hứa là bạn sẽ có kết quả nhanh chóng. Mục tiêu chính  
          của chương trình của chúng tôi là thay đổi lối sống của bạn theo hướng tốt hơn.
        </p>
      </div>

      <button className="step14-btn" onClick={handleContinue}>
        Đã hiểu
      </button>
    </div>
  );
}
