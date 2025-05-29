// Step22.jsx
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaSyncAlt } from 'react-icons/fa';
import '../../styles/Step22.css';

export default function Step22() {
  const { formData, go, currentStep } = useOutletContext();

  // Cuộn lên đầu khi component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleContinue = () => {
    go(`step${currentStep + 1}`, formData);
  };

  return (
    <div className="step22-root">
      <h2 className="step22-title">Không cần phải ép bản thân đến giới hạn!</h2>

      <div className="step22-chart-wrapper">
        <svg
          className="step22-chart"
          viewBox="0 0 600 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background bars */}
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x={80 + i * 80}
              y={20}
              width="40"
              height="240"
              className="chart-bar"
            />
          ))}

          {/* Cortisol line: flat then gradual drop */}
          <path
            className="line cortisol"
            d="M80 80 C160 80,240 80,320 75 C400 70,480 110,560 140"
          />
          <text x="100" y="70" className="line-label">Cortisol</text>

          {/* Testosterone line */}
          <path
            className="line testosterone"
            d="M80 240 C160 230,240 210,320 200 C400 190,480 170,560 160"
          />
          <circle cx={80} cy={240} r={6} className="marker testosterone-start" />
          <circle cx={560} cy={160} r={6} className="marker testosterone-end" />
          <text x="90" y="210" className="marker-label">Testosterone</text>

          {/* Axes labels */}
          <text x="60" y="290" className="axis-label">Now</text>
          <text x="540" y="290" className="axis-label">6 months</text>
        </svg>

        {/* Icon xoay ở cuối */}
     
      </div>

      <p className="step22-desc">
        Tập luyện cường độ cao quá mức có thể làm tăng nồng độ cortisol và khiến bạn khó giảm cân. Fitness &amp; Health điều chỉnh kế hoạch của bạn để giúp bạn đạt được mục tiêu mà không bị tập luyện quá sức.
      </p>
      <p className="step22-note">Dựa trên dữ liệu từ 1,3 triệu bài tập luyện.</p>

      <button className="step22-btn" onClick={handleContinue}>Đã hiểu</button>
    </div>
  );
}