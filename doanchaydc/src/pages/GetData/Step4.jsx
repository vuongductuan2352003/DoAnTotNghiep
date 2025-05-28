// src/pages/GetData/Step4ActivityLevel.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import '../../styles/step4.css';

// Key lưu trữ draft formData
const STORAGE_KEY = 'formData';

const levelDescriptions = [
  { level: 1, title: "Ít vận động", description: "Người ít hoặc không tham gia hoạt động thể chất." },
  { level: 2, title: "Vận động nhẹ", description: "Vận động thể chất, tập thể dục 1-3 ngày/tuần." },
  { level: 3, title: "Vận động vừa phải", description: "Vận động thể chất, tập thể dục 3-5 ngày/tuần." },
  { level: 4, title: "Vận động nhiều", description: "Vận động thể chất, tập thể dục 6-7 ngày/tuần." },
  { level: 5, title: "Vận động rất nhiều", description: "Vận động, tập thể dục hơn 90 phút mỗi ngày hoặc làm công việc nặng." },
];

export default function Step4ActivityLevel() {
  // Lấy formData, go, currentStep từ context
  const { formData, go, currentStep, totalSteps } = useOutletContext();

  // State cho activityLevel, khởi tạo từ formData
  const [level, setLevel] = useState(formData.activityLevel || 1);

  // Auto-save mỗi khi level thay đổi
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const updated = { ...existing, activityLevel: level };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [level]);

  const currentDesc = levelDescriptions.find(item => item.level === level);
  const tickCount = levelDescriptions.length;
  const tickPositions = levelDescriptions.map((_, i) => (i * 100) / (tickCount - 1));

  const handleChange = (e) => setLevel(Number(e.target.value));

  const handleContinue = () => {
    go("step5", { ...formData, activityLevel: level });
  };

  const handleBack = () => {
    go(`step${currentStep - 1}`, formData);
  };

  return (
    <div style={{
      color: "white",
      padding: 24,
      maxWidth: 600,
      margin: "0px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#121212",
      borderRadius: 12,
      boxShadow: "0 4px 16px rgba(0,0,0,0.7)",
      position: "relative"
    }}>
      {/* Tiêu đề và mô tả */}
      <h1 style={{ fontWeight: "700", fontSize: "2.5rem", marginBottom: 8 }}>
        Mức độ hoạt động hàng ngày của bạn là gì?
      </h1>
      <p style={{ fontSize: "1.15rem", color: "#ddd", marginBottom: 40 }}>
        Chọn mức độ thể chất hiện tại của bạn để điều chỉnh kế hoạch tập luyện sao cho phù hợp.
      </p>

      {/* Slider */}
      <div style={{ position: "relative", marginBottom: 58 }}>
        <input
          type="range"
          min={1}
          max={tickCount}
          step={1}
          value={level}
          onChange={handleChange}
          style={{
            width: "100%",
            height: 10,
            borderRadius: 5,
            background: `linear-gradient(90deg, #ff5722 ${(level - 1) * 25}%, #444 ${(level - 1) * 25}%)`,
            outline: "none",
            cursor: "pointer",
            appearance: "none",
          }}
        />
        {/* Tick marks */}
        {tickPositions.map((pos, idx) => (
          <div key={idx} style={{
            position: "absolute",
            top: 5,
            left: `${pos}%`,
            width: 20,
            height: 20,
            backgroundColor: idx + 1 === level ? "#ff5722" : "#555",
            borderRadius: "50%",
            border: idx + 1 === level ? "3px solid #ffccbc" : "3px solid #333",
            boxShadow: idx + 1 === level ? "0 0 8px #ff5722" : "none",
            transform: "translateX(-50%)",
            transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
            zIndex: 2,
          }} />
        ))}
        {/* Label số */}
        <div style={{
          position: "absolute",
          top: -40,
          left: `${(level - 1) * 25}%`,
          transform: "translateX(-50%)",
          backgroundColor: "#ff5722",
          padding: "6px 12px",
          borderRadius: 6,
          fontWeight: "700",
          fontSize: "1.2rem",
          userSelect: "none",
          pointerEvents: "none",
          color: "white",
          boxShadow: "0 2px 10px rgba(255,87,34,0.8)",
          zIndex: 3,
        }}>
          {level}
        </div>
        {/* Nhãn min/max */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: "600", color: "#aaa", fontSize: "1rem" }}>
          <span>1</span>
          <span>{tickCount}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontWeight: "600", color: "#777", fontSize: "0.9rem" }}>
          <span>Ít vận động</span>
          <span>Rất năng động</span>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div style={{
        backgroundColor: "#222",
        padding: "20px",
        borderRadius: 12,
        boxShadow: "inset 0 0 10px #000",
        marginBottom: 37,
        minHeight: 120,
        fontSize: "1.1rem",
        color: "#eee",
      }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 8 }}>{currentDesc?.title}</h3>
        <p>{currentDesc?.description}</p>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleBack}
          style={{
            flex: 1,
            backgroundColor: "#555",
            color: "white",
            border: "none",
            padding: "15px 32px",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          ← Quay lại
        </button>
        <button
          onClick={handleContinue}
          style={{
            flex: 1,
            backgroundColor: "#ff5722",
            color: "white",
            border: "none",
            padding: "15px 32px",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: "1.3rem",
            fontWeight: "700",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e64a19")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ff5722")}
        >
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}