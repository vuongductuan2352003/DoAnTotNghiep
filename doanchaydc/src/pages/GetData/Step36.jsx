import React from "react";
import { motion } from "framer-motion";
import images from "../../assets/loadImg.js";
import "../../styles/Step36.css";
import { useOutletContext } from "react-router-dom";

// Map chuỗi tiếng Việt sang số lít
const WATER_LITERS_MAP = {
  "Ít hơn 2 cốc": 0.5,
  "2-6 cốc": 1.0,
  "7-10 cốc": 2.0,
  "Hơn 10 cốc": 2.7,
  "Tôi chỉ uống cà phê hoặc trà": 0,
  // Có thể thêm case đặc biệt nếu có
};

export default function Step36Summary() {
  // Lấy dữ liệu
  const { formData, go } = useOutletContext();
  const {
    fullName,
    gender = "male",
    bmi,
    age,
    weight,
    height,
    bodyFatPercent,
    fitnessLevel,
    goal,
    calories,
    water,
    timePreference,
  duration,
    workoutFrequency,
    location,
    extraGoals = [],
  } = formData;

  // Tính toán cho phần mô phỏng body
  const nowFat = bodyFatPercent || 20;
  const nowAge = age || 27;
  const nowMuscle = fitnessLevel === "advanced" ? 3 : fitnessLevel === "intermediate" ? 2 : 1;
  const targetFat = nowFat > 10 ? (nowFat > 16 ? 8 : 10) : 8;
  const targetAge = Math.max(18, nowAge - 7);
  const targetMuscle = Math.min(3, nowMuscle + 1);

  const beforeImg = gender === "female" ? images["female_before.png"] : images["male_before.png"];
  const afterImg  = gender === "female" ? images["female_after.png"]  : images["male_after.png"];

  const goalMap = {
    lose_weight: "Giảm cân",
    reduce_fat: "Giảm mỡ",
    maintain: "Duy trì cân nặng",
    gain_muscle: "Tăng cơ",
    gain_weight: "Tăng cân"
  };

  const extraGoalsShow = extraGoals.length
    ? extraGoals
    : ["Giảm căng thẳng", "Cải thiện giấc ngủ", "Tự kỷ luật", "Cảm thấy khỏe mạnh hơn", "Hình thành thói quen thể chất"];

  // Hàm chuyển giá trị water sang số lít chuẩn để hiển thị
  function getWaterLiters(val) {
    if (val == null) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      // Nếu là số, trả về luôn
      if (!isNaN(Number(val))) return Number(val);
      // Nếu là chuỗi kiểu "1,5" hoặc "2.7", thay dấu phẩy nếu có
      const fixed = val.replace(",", ".");
      if (!isNaN(Number(fixed))) return Number(fixed);
      // Nếu là label thì tra cứu map
      if (WATER_LITERS_MAP[val]) return WATER_LITERS_MAP[val];
    }
    return 0;
  }

  const waterLiters = getWaterLiters(water);

  const handleRegister = () => go("/register", formData);

  return (
    <motion.div
      className="step36sum-root"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Khối mô phỏng thay đổi body */}
      <motion.div className="step36sum-bodychange" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="step36sum-bodybox">
          <img src={beforeImg} alt="before" className="step36sum-bodyimg" />
          <div className="step36sum-bodystats">
            <div className="step36sum-bodytitle">Bây giờ</div>
            <div>Mỡ cơ thể <b className="step36sum-fat">{nowFat}%</b></div>
            <div>Độ tuổi thể chất <b className="step36sum-age">{nowAge}</b></div>
            <div>
              Cơ bắp cơ thể{" "}
              {[...Array(nowMuscle)].map((_, i) => (
                <span key={i} className="step36sum-muscle">🟧</span>
              ))}
            </div>
          </div>
        </div>
        <div className="step36sum-arrows">{/* Mũi tên */} <span>&#62;&#62;</span></div>
        <div className="step36sum-bodybox">
          <img src={afterImg} alt="after" className="step36sum-bodyimg" />
          <div className="step36sum-bodystats">
            <div className="step36sum-bodytitle">6 tháng</div>
            <div>Mỡ cơ thể <b className="step36sum-fat orange">{targetFat}%</b></div>
            <div>Độ tuổi thể chất <b className="step36sum-age orange">{targetAge}</b></div>
            <div>
              Cơ bắp cơ thể{" "}
              {[...Array(targetMuscle)].map((_, i) => (
                <span key={i} className="step36sum-muscle">🟧</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tiêu đề tổng kết */}
      <h1 className="step36sum-mainTitle">Tóm tắt cá nhân dựa trên câu trả lời của bạn</h1>

      {/* Khối BMI + Calories + Nước */}
      <div className="step36sum-summarybox">
        <div className="step36sum-bmi">
          <div className="step36sum-bmititle">Chỉ số BMI hiện tại</div>
          <div className="step36sum-bminum">
            {bmi ? Number(bmi).toFixed(2) : "--"} BMI
          </div>
          <div className="step36sum-bmi-bar-wrap">
            <div className="step36sum-bmi-bar">
              {/* Giả sử: thiếu cân <18.5, bình thường 18.5-23, thừa 23-25, béo >25 */}
              <div className="bmi-segment under"></div>
              <div className="bmi-segment normal"></div>
              <div className="bmi-segment over"></div>
              <div className="bmi-segment obese"></div>
              <div
                className="bmi-indicator"
                style={{
                  left: `${Math.max(0, Math.min(1, (bmi - 14) / 18)) * 100}%`
                }}
              />
            </div>
            <div className="step36sum-bmi-labels">
              <span>Thiếu cân</span>
              <span>Béo phì</span>
            </div>
          </div>
          <div className="step36sum-bmi-desc">
            {bmi < 18.5 ? (
              <span className="orange">Thiếu cân</span>
            ) : bmi < 23 ? (
              <span className="green">Bình thường</span>
            ) : bmi < 25 ? (
              <span className="orange">Thừa cân</span>
            ) : (
              <span className="red">Béo phì</span>
            )}
            <br />
            <span className="desc">
              Chỉ số khối cơ thể (BMI) là chỉ số sử dụng chiều cao và cân nặng để đánh giá sức khỏe tổng thể.
            </span>
          </div>
        </div>

        <div className="step36sum-miniwrap">
          <div className="step36sum-calbox">
            <div className="step36sum-minititle">Lượng calo hàng ngày</div>
            <div className="step36sum-calnum">{calories ? calories + " kcal" : "--"}</div>
            <div className="step36sum-mini-bar">
              <div className="step36sum-mini-barfill" style={{ width: `${Math.max(0, Math.min(1, (calories - 1000) / 4000)) * 100}%` }} />
            </div>
          </div>
          <div className="step36sum-waterbox">
            <div className="step36sum-minititle">Lượng nước uống/ngày</div>
            <div className="step36sum-waternum">{water ? water + " l" : "--"}</div>
            <div className="step36sum-water-glasswrap">
              {[...Array(7)].map((_, i) => (
                <span key={i} className={i < Math.round(10 / 0.35) ? "glass full" : "glass"}>🥤</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Khối cá nhân hóa */}
      <div className="step36sum-plan-wrap">
        <div className="step36sum-plan-title">
          Kế hoạch được cá nhân hóa dành cho <b>{fullName || "bạn"}</b> đã sẵn sàng!
        </div>
        <div className="step36sum-plan-grid">
          <div className="step36sum-plan-item">
            <span>⏱️ Thời gian tập luyện</span>
            <b>{duration || "--"} </b>
          </div>
          <div className="step36sum-plan-item">
            <span>💪 Cấp độ thể hình</span>
            <b>{fitnessLevel === "beginner" ? "Sơ cấp" : fitnessLevel === "intermediate" ? "Trung cấp" : "Cao cấp"}</b>
          </div>
          <div className="step36sum-plan-item">
            <span>🏠 Nơi tập luyện</span>
            <b>{location || "Nhà"}</b>
          </div>
          <div className="step36sum-plan-item">
            <span>📅 Cường độ</span>
            <b>{workoutFrequency || "3 lần/tuần"}</b>
          </div>
        </div>
      </div>

      {/* Mục tiêu chương trình */}
      <div className="step36sum-goalswrap">
        <div className="step36sum-goalstitle">Mục tiêu của chương trình của bạn gồm:</div>
        <ul className="step36sum-goalslist">
          {[goalMap[goal], ...extraGoalsShow].filter(Boolean).map((g, i) =>
            <li key={i}><span>✔️</span> {g}</li>
          )}
        </ul>
      </div>

      <motion.button className="step36sum-btn" whileTap={{ scale: 0.97 }} onClick={handleRegister}>
        Đăng ký ngay
      </motion.button>
    </motion.div>
  );
}
