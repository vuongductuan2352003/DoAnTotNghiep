// src/pages/Step6Summary.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../utils/api.jsx";             // axios instance của bạn
import images from "../../assets/loadImg.js";
import '../../styles/step6.css';

// Key lưu draft formData
const STORAGE_KEY = 'formData';
const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9];

export default function Step6Summary() {
  const { formData, go, currentStep } = useOutletContext();

  // state chứa data từ API
  const [apiAdvice, setApiAdvice] = useState([]);
  const [apiRisks, setApiRisks]   = useState([]);
  const [metrics, setMetrics]     = useState({});

  // ép kiểu & fallback
  const fullName      = formData.fullName    || "--";
  const age           = Number(formData.age) || 0;
  const gender        = formData.gender === "female" ? "female" : "male";
  const height        = Number(formData.height)     || 0;
  const weight        = Number(formData.weight)     || 0;
  const bodyFatPct    = Number(formData.bodyFatPercent) || 0;
  const activityLevel = Number(formData.activityLevel)  || 1;
  const waist         = formData.waist   != null ? Number(formData.waist) : null;
  const hip           = formData.hip     != null ? Number(formData.hip)   : null;

  // 1. BMI (giữ nguyên tính toán local)
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

// 6. Gọi API lấy tất cả các số liệu
  useEffect(() => {
    if (!height || !weight || !age || !gender) return;

    const params = {
      height,
      weight,
      age,
      gender,
      body_fat_pct: bodyFatPct,
    };
    if (activityLevel) {
      params.activity_level = activityLevel;
    }
    // only add waist/hip if valid numbers
    if (waist !== null && !isNaN(waist)) {
      params.waist = waist;
    }
    if (hip !== null && !isNaN(hip)) {
      params.hip = hip;
    }

    console.log("[Step6] Gửi params đến /v1/metrics:", params);
    api.get("v1/metrics", { params })
      .then(({ data }) => {
        console.log("[Step6] Nhận dữ liệu từ /v1/metrics:", data);
        setMetrics(data);
      })
      .catch(err => {
        console.error("Lỗi khi gọi /v1/metrics:", err);
        setMetrics({});
      });
  }, [height, weight, age, gender, activityLevel, bodyFatPct, waist, hip]);

  // 7. Gọi API lấy advice & risk
  useEffect(() => {
    if (bmi == null) return;
    api.get("v1/bmi", { params: { bmi, gender } })
      .then(({ data }) => {
        setApiAdvice(Array.isArray(data.advice) ? data.advice : [data.advice]);
        setApiRisks(Array.isArray(data.risk)   ? data.risk   : [data.risk]);
      })
      .catch(err => {
        console.error("Lỗi khi gọi /api/v1/bmi:", err);
        setApiAdvice([]);
        setApiRisks([]);
      });
  }, [bmi, gender]);

  // 8. Auto-save summary (metrics + lời khuyên + nguy cơ)
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const updated = { ...draft,
      metrics,
      advice: apiAdvice,
      risks: apiRisks
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [metrics, apiAdvice, apiRisks]);

  // chuyển bước
  const handleBack = () => go(`step${currentStep - 1}`, formData);
  const handleNext = () => go(`step${currentStep + 1}`, formData);

  const avatarSrc = gender === "female" ? images["Female.png"] : images["male.png"];

  return (
    <div className="step6-container">
      {/* Avatar & Info */}
      <div className="step6-avatar">
        <img src={avatarSrc} alt={gender === "female" ? "Avatar nữ" : "Avatar nam"} />
        <div className="avatar-name">{fullName}</div>
        <div className="avatar-info">{gender === "female" ? "Nữ" : "Nam"}, {age} tuổi</div>
      </div>

      {/* Panel phân tích */}
      <div className="step6-panel">
        <h2 className="panel-title">Kết quả phân tích cơ thể</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">BMI</div>
            <div className="stat-value">{metrics.bmi ?? bmi ?? "--"}</div>
            <div className="stat-sub">{bmiStatus}</div>
            <div className="stat-desc">(Chỉ số cơ thể)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">BMR</div>
            <div className="stat-value">
              {metrics.bmr ? `${metrics.bmr} kcal/ngày` : "--"}
            </div>
            <div className="stat-desc">(Tỷ lệ trao đổi chất cơ bản)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">% Mỡ</div>
            <div className="stat-value">{metrics.body_fat_pct != null ? `${metrics.body_fat_pct}%` : "--"}</div>
            <div className="stat-desc">(Tỷ lệ mỡ/thể trọng)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">TDEE</div>
            <div className="stat-value">
              {metrics.tdee ? `${metrics.tdee} kcal/ngày` : "--"}
            </div>
            <div className="stat-desc">
              (Tổng năng lượng cần tiêu thụ hàng ngày)
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Fat Mass</div>
            <div className="stat-value">{metrics.fat_mass != null ? `${metrics.fat_mass} kg` : "--"}</div>
            <div className="stat-desc">(Khối mỡ)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Lean Mass</div>
            <div className="stat-value">{metrics.lean_mass != null ? `${metrics.lean_mass} kg` : "--"}</div>
            <div className="stat-desc">(Khối cơ tổng)</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Tỷ lệ eo/hông</div>
            <div className="stat-value">{metrics.waist_hip_ratio != null ? metrics.waist_hip_ratio : "--"}</div>
            <div className="stat-desc">(Ratio eo so với hông)</div>
          </div>
        </div>

        {/* Lời khuyên & Cảnh báo */}
        <div className="advice-risk">
          <div className="advice-box">
            <strong>Lời khuyên:</strong>
            {apiAdvice.length > 0
              ? <ul>{apiAdvice.map((a, i) => <li key={i}>{a}</li>)}</ul>
              : <p>Đang tải lời khuyên…</p>
            }
          </div>
          <div className="risk-box">
            <strong>Cảnh báo nguy cơ:</strong>
            {apiRisks.length > 0
              ? <ul>{apiRisks.map((r, i) => <li key={i}>{r}</li>)}</ul>
              : <p>Đang tải cảnh báo…</p>
            }
          </div>
        </div>

        <div className="step6-actions">
          <button className="next-btn" onClick={handleNext}>Tiếp tục →</button>
        </div>
      </div>
    </div>
  );
}
