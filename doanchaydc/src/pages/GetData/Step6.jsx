// src/pages/Step6Summary.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../utils/api.jsx"; // axios instance
import images from "../../assets/loadImg.js";
import '../../styles/step6.css';

const STORAGE_KEY = 'formData';

// Mapping cho hiển thị tiếng Việt từ activityLevel số
const activityLevelLabels = [
  "", // 0 - không dùng
  "Ít vận động",
  "Vận động nhẹ",
  "Vận động vừa phải",
  "Vận động nhiều",
  "Vận động rất nhiều"
];

// Map gender value cho API backend
function mapGenderToApi(gender) {
  if (gender === "Nam") return "male";
  if (gender === "Nữ") return "female";
  return gender;
}

export default function Step6Summary() {
  const { formData, go, currentStep } = useOutletContext();

  // state chứa data từ API
  const [apiAdvice, setApiAdvice] = useState([]);
  const [apiRisks, setApiRisks]   = useState([]);
  const [metrics, setMetrics]     = useState({});

  // ép kiểu & fallback
  const fullName      = formData.fullName    || "--";
  const age           = Number(formData.age) || 0;
  const gender        = formData.gender      || "Nam"; // value: "Nam" | "Nữ"
  const height        = Number(formData.height)     || 0;
  const weight        = Number(formData.weight)     || 0;
  const bodyFatPct    = Number(formData.bodyFatPercent) || 0;
  const activityLevel = Number(formData.activityLevel)  || 1;
  const waist         = formData.waist   != null ? Number(formData.waist) : null;
  const hip           = formData.hip     != null ? Number(formData.hip)   : null;

  // 1. BMI
  const bmi = useMemo(() => {
    if (!height || !weight) return null;
    const m = height / 100;
    return +(weight / (m * m)).toFixed(1);
  }, [height, weight]);

  // 2. BMI Status
  const bmiStatus = useMemo(() => {
    if (bmi == null) return "--";
    if (bmi < 16)   return "Gầy độ 3";
    if (bmi < 17)   return "Gầy độ 2";
    if (bmi < 18.5) return "Gầy độ 1";
    if (bmi < 23)   return "Bình thường";
    if (bmi < 25)   return "Thừa cân";
    if (bmi < 30)   return "Béo phì độ I";
    if (bmi < 35)   return "Béo phì độ II";
    return "Béo phì độ III";
  }, [bmi]);

  // 3. Gọi API lấy metrics
  useEffect(() => {
    if (!height || !weight || !age || !gender) return;
    const params = {
      height,
      weight,
      age,
      gender: mapGenderToApi(gender),
      body_fat_pct: bodyFatPct,
      activity_level: activityLevel,
    };
    if (waist !== null) params.waist = waist;
    if (hip   !== null) params.hip   = hip;

    api.get("v1/metrics", { params })
      .then(({ data }) => setMetrics(data))
      .catch(() => setMetrics({}));
  }, [height, weight, age, gender, activityLevel, bodyFatPct, waist, hip]);

  // 4. Gọi API lấy advice & risk
  useEffect(() => {
    if (bmi == null) return;
    api.get("v1/bmi", { params: { bmi, gender: mapGenderToApi(gender) } })
      .then(({ data }) => {
        setApiAdvice(Array.isArray(data.advice) ? data.advice : [data.advice]);
        setApiRisks (Array.isArray(data.risk)   ? data.risk   : [data.risk]);
      })
      .catch(() => {
        setApiAdvice([]);
        setApiRisks([]);
      });
  }, [bmi, gender]);

  // 5. Auto-save summary vào localStorage
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const updated = {
      ...draft,
      metrics,
      advice: apiAdvice,
      risks: apiRisks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [metrics, apiAdvice, apiRisks]);

  // 6. Chuyển bước, đồng thời lưu vào formData
  const handleNext = () => {
    const updatedForm = {
      ...formData,
      metrics,
      advice: apiAdvice,
      risks: apiRisks
    };
    // Cập nhật localStorage chung
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForm));
    // Next
    go(`step${currentStep + 1}`, updatedForm);
  };

  // 7. Nút Back
  const handleBack = () => go(`step${currentStep - 1}`, formData);

  // Avatar
  const avatarSrc = gender === "Nữ" ? images["Female.png"] : images["male.png"];

  return (
    <div className="step6-container">
      {/* Avatar & Info */}
      <div className="step6-avatar">
        <img src={avatarSrc} alt={gender === "Nữ" ? "Avatar nữ" : "Avatar nam"} />
        <div className="avatar-name">{fullName}</div>
        <div className="avatar-info">{gender}, {age} tuổi</div>
      </div>

      {/* Panel phân tích */}
      <div className="step6-panel">
        <h2 className="panel-title">Kết quả phân tích cơ thể</h2>
        <div className="stats-grid">
          {/* BMI */}
          <div className="stat-card">
            <div className="stat-title">BMI</div>
            <div className="stat-value">{metrics.bmi ?? bmi ?? "--"}</div>
            <div className="stat-sub">{bmiStatus}</div>
            <div className="stat-desc">(Chỉ số cơ thể)</div>
          </div>
          {/* BMR */}
          <div className="stat-card">
            <div className="stat-title">BMR</div>
            <div className="stat-value">{metrics.bmr ? `${metrics.bmr} kcal/ngày` : "--"}</div>
            <div className="stat-desc">(Tỷ lệ trao đổi chất cơ bản)</div>
          </div>
          {/* % Mỡ */}
          <div className="stat-card">
            <div className="stat-title">% Mỡ</div>
            <div className="stat-value">{metrics.body_fat_pct != null ? `${metrics.body_fat_pct}%` : "--"}</div>
            <div className="stat-desc">(Tỷ lệ mỡ/thể trọng)</div>
          </div>
          {/* TDEE */}
          <div className="stat-card">
            <div className="stat-title">TDEE</div>
            <div className="stat-value">{metrics.tdee ? `${metrics.tdee} kcal/ngày` : "--"}</div>
            <div className="stat-desc">(Tổng năng lượng cần tiêu thụ hàng ngày)</div>
          </div>
          {/* Fat Mass */}
          <div className="stat-card">
            <div className="stat-title">Fat Mass</div>
            <div className="stat-value">{metrics.fat_mass != null ? `${metrics.fat_mass} kg` : "--"}</div>
            <div className="stat-desc">(Khối mỡ)</div>
          </div>
          {/* Lean Mass */}
          <div className="stat-card">
            <div className="stat-title">Lean Mass</div>
            <div className="stat-value">{metrics.lean_mass != null ? `${metrics.lean_mass} kg` : "--"}</div>
            <div className="stat-desc">(Khối cơ tổng)</div>
          </div>
          {/* Waist/Hip Ratio */}
          <div className="stat-card">
            <div className="stat-title">Tỷ lệ eo/hông</div>
            <div className="stat-value">{metrics.waist_hip_ratio != null ? metrics.waist_hip_ratio : "--"}</div>
            <div className="stat-desc">(Ratio eo so với hông)</div>
          </div>
        </div>

        {/* Lời khuyên & Nguy cơ */}
        <div className="advice-risk">
          <div className="advice-box">
            <strong>Lời khuyên:</strong>
            {apiAdvice.length
              ? <ul>{apiAdvice.map((a,i)=><li key={i}>{a}</li>)}</ul>
              : <p>Đang tải lời khuyên…</p>}
          </div>
          <div className="risk-box">
            <strong>Cảnh báo nguy cơ:</strong>
            {apiRisks.length
              ? <ul>{apiRisks.map((r,i)=><li key={i}>{r}</li>)}</ul>
              : <p>Đang tải cảnh báo…</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="step6-actions">
          <button className="next-btn" onClick={handleNext}>Tiếp tục →</button>
        </div>
      </div>
    </div>
  );
}
