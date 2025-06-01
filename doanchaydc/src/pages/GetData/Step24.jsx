// src/pages/GetData/Step24Sports.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FaRunning, FaDumbbell, FaBiking, FaSwimmer, FaTableTennis, 
  FaFutbol, FaBasketballBall, FaBaseballBall 
} from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import '../../styles/Step24.css';

const SPORTS = [
  { value: 'boxing',        label: 'Boxing',        icon: <FaDumbbell /> },
  { value: 'vo_thuat',      label: 'Võ thuật khác', icon: <FaFutbol /> },
  { value: 'chay_bo',       label: 'Chạy bộ',       icon: <FaRunning /> },
  { value: 'xe_dap',        label: 'Đạp xe',        icon: <FaBiking /> },
  { value: 'boi_loi',       label: 'Bơi lội',       icon: <FaSwimmer /> },
  { value: 'bong_da',       label: 'Bóng đá',       icon: <FaFutbol /> },
  { value: 'bong_ro',       label: 'Bóng rổ',       icon: <FaBasketballBall /> },
  { value: 'bong_ban',      label: 'Bóng bàn',      icon: <FaTableTennis /> },
  { value: 'cau_long',      label: 'Cầu lông',      icon: <FaBaseballBall /> },
  { value: 'quan_vot',      label: 'Quần vợt',      icon: <GiTennisRacket /> },  
];

const NONE = 'None';
const NONE_LABEL = 'Không có cái nào ở trên';

// Hàm tính activity_level_projected
function activity_level_projected(fd) {
  // 1. Đếm số buổi tập/tuần
  const weeklySessionsCount = Array.isArray(fd.weeklySessions)
    ? fd.weeklySessions.length
    : 0;

  // 2. Tính thời lượng trung bình
  let durationAvg = 0;
  if (typeof fd.duration === "string") {
    const nums = fd.duration.match(/\d+/g);
    if (nums && nums.length >= 2) {
      durationAvg = (Number(nums[0]) + Number(nums[1])) / 2;
    }
  }

  // 3. Tổng phút/tuần
  const totalWeeklyMin = weeklySessionsCount * durationAvg;

  // 4. Map pushups/pullups → score
  const mapCountToScore = str => {
    if (!str) return 0;
    if (str.includes("Ít hơn")) return 1;
    if (str.includes("5–10"))    return 2;
    if (str.includes("10–20"))   return 3;
    if (str.includes(">20"))     return 4;
    return 0;
  };
  const pushScore  = mapCountToScore(fd.pushups);
  const pullScore  = mapCountToScore(fd.pullups);
  const abilityAvg = (pushScore + pullScore) / 2;

  // 5. Bonus/penalty routine
  let routineBonus = 0;
  if (fd.routine?.toLowerCase().includes("đứng"))     routineBonus = 0.5;
  else if (fd.routine?.toLowerCase().includes("ngồi")) routineBonus = -0.5;

  // 6. Adjust TDEE/BMR
  const { bmr = 0, tdee = 0 } = fd.metrics || {};
  let energyAdj = 0;
  if (bmr > 0) {
    const ratio = tdee / bmr;
    if (ratio > 1.3)      energyAdj = 1;
    else if (ratio < 1.1) energyAdj = -1;
  }

  // 7. Penalty chấn thương
  const injuryPenalty = Array.isArray(fd.injuries) && fd.injuries.length ? 1 : 0;

  // 8. Adjust mục tiêu
  let goalAdj = 0;
  const goal = (fd.goal || "").toLowerCase();
  if (goal.includes("giảm"))   goalAdj = 1;
  else if (goal.includes("tăng")) goalAdj = -1;

  // 9. Base level theo tổng phút
  let baseLevel;
  if (totalWeeklyMin < 75)       baseLevel = 1;
  else if (totalWeeklyMin < 150) baseLevel = 2;
  else if (totalWeeklyMin < 225) baseLevel = 3;
  else if (totalWeeklyMin < 300) baseLevel = 4;
  else                            baseLevel = 5;

  // 10. Ability adjustment
  let abilityAdj = 0;
  if (abilityAvg >= 3.5)      abilityAdj = 1;
  else if (abilityAvg <= 1.5) abilityAdj = -1;

  // 11. Tổng hợp
  let projected =
    baseLevel
    + abilityAdj
    + energyAdj
    + routineBonus
    - injuryPenalty
    + goalAdj;

  // 12. Round & clamp
  let alp = Math.round(projected);
  return Math.min(5, Math.max(1, alp));
}

export default function Step24Sports() {
  const { formData, go, currentStep } = useOutletContext();

  const [selected, setSelected] = React.useState(() => {
    const data = Array.isArray(formData.sports) ? formData.sports : [];
    if (!data.length || data[0] === NONE) return [NONE];
    return data;
  });

  const getLabel = val => {
    const f = SPORTS.find(s => s.value === val);
    return f ? f.label : '';
  };

  const handleToggle = (value) => {
    const label = getLabel(value);
    if (!label) return;
    let ns;
    if (selected.includes(NONE)) {
      ns = [label];
    } else if (selected.includes(label)) {
      ns = selected.filter(l => l !== label);
      if (ns.length === 0) ns = [NONE];
    } else {
      ns = [...selected, label];
    }
    setSelected(ns);
  };

  const handleNone = () => setSelected([NONE]);

  const handleContinue = () => {
    const toSave = (selected.includes(NONE) || selected.length === 0)
      ? [NONE]
      : selected;

    // Tính activity_level_projected
    const alp = activity_level_projected(formData);

    // Lưu vào formData và next step
    go(
      `step${currentStep + 1}`,
      { 
        ...formData, 
        sports: toSave,
        activity_level_projected: alp 
      }
    );
  };

  return (
    <div className="step24-root">
      <h2 className="step24-title">Bạn quan tâm đến môn thể thao nào?</h2>
      <div className="step24-grid">
        {SPORTS.map(sport => {
          const label = sport.label;
          return (
            <div
              key={sport.value}
              className={`step24-square${selected.includes(label) ? ' selected' : ''}`}
              onClick={() => handleToggle(sport.value)}
            >
              <div className="step24-icon-large">{sport.icon}</div>
              <div className="step24-label">{label}</div>
              {selected.includes(label) && <span className="step24-tick">✔</span>}
            </div>
          );
        })}
      </div>
      <div
        className={`step24-square none${selected.includes(NONE) ? ' selected' : ''}`}
        onClick={handleNone}
      >
        <div className="step24-label">{NONE_LABEL}</div>
      </div>
      <button className="step24-btn" onClick={handleContinue}>
        Tiếp tục
      </button>
    </div>
  );
}
