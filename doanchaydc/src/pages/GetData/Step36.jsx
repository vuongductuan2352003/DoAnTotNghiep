// src/pages/Step36Summary.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import images from "../../assets/loadImg.js";
import "../../styles/Step36.css";
import { useOutletContext } from "react-router-dom";

const WATER_LITERS_MAP = {
  "Ít hơn 2 cốc": 0.5,
  "2-6 cốc": 1.0,
  "7-10 cốc": 2.0,
  "Hơn 10 cốc": 2.7,
  "Tôi chỉ uống cà phê hoặc trà": 0,
  "Trên 2,5 lít": 2.7,
  "2 lít": 2,
  "1 lít": 1,
};

export default function Step36Summary() {
   useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // hoặc "auto" nếu muốn nhanh
  }, []);
  const { formData, go } = useOutletContext();

  const {
    fullName,
    metrics = {},
    bodyFatPercent,
    fitnessLevel,
    goal,
    calories,
    water,
    duration,
    location,
    trainingFrequency,
    extraGoals = [],
  } = formData;

  // Chuẩn hóa giá trị
  const bmi = metrics.bmi ?? "";
  const fatPercent = bodyFatPercent ?? metrics.body_fat_pct ?? "";
  const caloriesVal = calories || metrics.tdee || "";
  function getWaterLiters(val) {
    if (val == null) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      if (!isNaN(Number(val))) return Number(val);
      const fixed = val.replace(",", ".");
      if (!isNaN(Number(fixed))) return Number(fixed);
      if (WATER_LITERS_MAP[val]) return WATER_LITERS_MAP[val];
    }
    return 0;
  }
  const waterLiters = getWaterLiters(water);

  // Ảnh before/after (replace link/your file path)
  const beforeImg = images["male1.png"] || "cb.png";
  const afterImg  = images["cb.png"] || "/after.png";

  // Mục tiêu phụ
  const extraGoalsShow =
    Array.isArray(extraGoals) && extraGoals.length
      ? extraGoals
      : [
          "Giảm căng thẳng",
          "Cải thiện giấc ngủ",
          "Tự kỷ luật",
          "Cảm thấy khỏe mạnh hơn",
          "Hình thành thói quen thể chất"
        ];

  // Thông tin thể hình mô phỏng
  const nowFat = parseFloat(fatPercent) || 22;
  const targetFat = nowFat > 10 ? (nowFat > 16 ? 8 : 10) : 8;
  const nowMuscle = fitnessLevel === "Cao cấp" ? 5 : fitnessLevel === "Trung cấp" ? 3 : 2;
  const targetMuscle = Math.min(5, nowMuscle + 2);

  const handleRegister = () => go("/register", formData);

  return (
    <motion.div
      className="step36new-root"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Vùng Before-After */}
      <motion.div className="step36new-compare" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="step36new-col">
          <img src={beforeImg} alt="before" className="step36new-avatar" />
          <div className="step36new-label step36new-label-now">Bây giờ</div>
          <div className="step36new-info-box">
            <div className="step36new-fat">Mỡ cơ thể<br/><b>{nowFat}%</b></div>
            <div className="step36new-muscle">
              Cơ bắp cơ thể <span>
                {[...Array(nowMuscle)].map((_, i) =>
                  <i key={i} className="step36new-muscle-bar"></i>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="step36new-arrows">
          <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 1.7 }}>
            <svg width="120" height="44"><polyline points="30,22 60,22 50,8" fill="none" stroke="#666" strokeWidth="7" /><polyline points="60,22 90,22 80,36" fill="none" stroke="#666" strokeWidth="7" /></svg>
          </motion.span>
        </div>
        <div className="step36new-col">
          <img src={afterImg} alt="after" className="step36new-avatar" />
          <div className="step36new-label step36new-label-after">6 tháng</div>
          <div className="step36new-info-box">
            <div className="step36new-fat orange">Mỡ cơ thể<br/><b>{targetFat}%</b></div>
            <div className="step36new-muscle">
              Cơ bắp cơ thể <span>
                {[...Array(targetMuscle)].map((_, i) =>
                  <i key={i} className="step36new-muscle-bar active"></i>
                )}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="step36new-note">
        *Hình ảnh không nhằm mục đích đại diện cho người dùng. Mỗi người sẽ có kết quả khác nhau và không được đảm bảo.
      </div>

      {/* Tiêu đề tổng kết */}
      <motion.h1 className="step36new-title" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        Tóm tắt cá nhân dựa trên câu trả lời của bạn
      </motion.h1>

      {/* Thông tin health */}
      <div className="step36new-summarywrap">
        <motion.div className="step36new-bmi-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
          <div className="step36new-bmi-title">Chỉ số BMI hiện tại</div>
          <div className="step36new-bmi-val">{bmi ? Number(bmi).toFixed(2) : "--"} BMI</div>
          <div className="step36new-bmi-bar-bg">
            <div className="step36new-bmi-bar-gradient">
              <div
                className="step36new-bmi-dot"
                style={{ left: `${Math.max(0, Math.min(1, (bmi - 14) / 18)) * 100}%` }}
              />
            </div>
            <div className="step36new-bmi-labels">
              <span>Thiếu cân</span>
              <span>Béo phì</span>
            </div>
          </div>
          <div className="step36new-bmi-desc">
            {bmi < 18.5 ? (
              <span className="orange">Thiếu cân</span>
            ) : bmi < 23 ? (
              <span className="green">Bình thường</span>
            ) : bmi < 25 ? (
              <span className="orange">Thừa cân</span>
            ) : (
              <span className="red">Béo phì</span>
            )}
            <div className="desc">
              Chỉ số BMI (Body Mass Index) giúp đánh giá sức khỏe dựa trên chiều cao và cân nặng của bạn.
            </div>
          </div>
        </motion.div>

        <div className="step36new-infogrid">
          <motion.div className="step36new-info-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
            <div className="step36new-info-title">Lượng calo hàng ngày</div>
            <div className="step36new-info-value">{caloriesVal ? caloriesVal + " kcal" : "--"}</div>
            <div className="step36new-info-progress-bg">
              <div className="step36new-info-progress" style={{ width: `${Math.max(0, Math.min(1, (caloriesVal - 1000) / 3000)) * 100}%` }} />
            </div>
          </motion.div>
          <motion.div className="step36new-info-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
            <div className="step36new-info-title">Lượng nước/ngày</div>
            <div className="step36new-info-value">{waterLiters ? waterLiters + " l" : "--"}</div>
            <div className="step36new-info-water">
              {[...Array(7)].map((_, i) => (
                <span key={i} className={i < Math.round(waterLiters / 0.35) ? "glass full" : "glass"}>🥤</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thông tin kế hoạch và mục tiêu */}
      <div className="step36new-plan-section">
        <div className="step36new-plan-title">
          Kế hoạch được cá nhân hóa dành cho <b>{fullName || "bạn"}</b> đã sẵn sàng!
        </div>
        <div className="step36new-plan-grid">
          <div className="step36new-plan-item">
            <span>⏱️ Thời gian tập luyện</span>
            <b>{duration || "--"}</b>
          </div>
          <div className="step36new-plan-item">
            <span>💪 Cấp độ thể hình</span>
            <b>{fitnessLevel || "--"}</b>
          </div>
          <div className="step36new-plan-item">
            <span>🏠 Nơi tập luyện</span>
            <b>{location || "Nhà"}</b>
          </div>
          <div className="step36new-plan-item">
            <span>📅 Cường độ</span>
            <b>{trainingFrequency || "--"}</b>
          </div>
        </div>
      </div>

      <div className="step36new-goals">
        <div className="step36new-goals-title">Mục tiêu chương trình của bạn cũng bao gồm:</div>
        <ul className="step36new-goals-list">
          {extraGoalsShow.filter(Boolean).map((g, i) =>
            <li key={i}><span>✔️</span> {g}</li>
          )}
        </ul>
      </div>

      <motion.button className="step36new-btn" whileTap={{ scale: 0.97 }} onClick={handleRegister}>
        Đăng ký ngay
      </motion.button>
    </motion.div>
  );
}
