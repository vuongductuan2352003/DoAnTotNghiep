// src/pages/GetData/Step3BodyFat.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import images from "../../assets/loadImg.js";
import { useOutletContext } from "react-router-dom";
import '../../styles/step3.css';

// Key lưu trữ draft
const STORAGE_KEY = 'formData';

const categories = [
  { label: "5-9%", file: "fat5_9.png", min: 5, max: 9, key: "5-9%" },
  { label: "10-14%", file: "fat10_14.png", min: 10, max: 14, key: "10-14%" },
  { label: "15-19%", file: "fat15_19.png", min: 15, max: 19, key: "15-19%" },
  { label: "20-24%", file: "fat20_24.png", min: 20, max: 24, key: "20-24%" },
  { label: "25-29%", file: "fat25_29.png", min: 25, max: 29, key: "25-29%" },
  { label: "30-34%", file: "fat30_34.png", min: 30, max: 34, key: "30-34%" },
  { label: "35-39%", file: "fat35_39.png", min: 35, max: 39, key: "35-39%" },
  { label: ">40%", file: "fat40.png", min: 40, max: Infinity, key: "Trên 40%" },
];

export default function Step3BodyFat() {
  const { formData, go } = useOutletContext();

  // Giữ giới tính theo tiếng Việt có dấu
  const genderKey = formData.gender === "Nữ" ? "Nữ" : "Nam";
  const genderText = genderKey;

  const height    = formData.height || 0;

  // Khởi tạo state từ formData nếu có
  // mode lưu tiếng Việt có dấu luôn
  const [mode, setMode]   = useState(formData.mode || "Nhập số đo");
  const [index, setIndex] = useState(
    formData.index != null ? formData.index : 0
  );
  const [waist, setWaist] = useState(
    formData.waist != null ? String(formData.waist) : ""
  );
  const [neck, setNeck]   = useState(
    formData.neck != null ? String(formData.neck) : ""
  );
  const [hip, setHip]     = useState(
    formData.hip != null ? String(formData.hip) : ""
  );

  // Sync khi user quay lại
  useEffect(() => {
    if (formData.waist != null) setWaist(String(formData.waist));
    if (formData.neck  != null) setNeck(String(formData.neck));
    if (formData.hip   != null) setHip(String(formData.hip));
    if (formData.mode) setMode(formData.mode);
    if (formData.index != null) setIndex(formData.index);
  }, [formData]);

  // Auto-save draft inputs
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const draft = {
      ...existing,
      mode,
      index,
      waist: waist ? parseFloat(waist) : null,
      neck:  neck  ? parseFloat(neck)  : null,
      hip:   hip   ? parseFloat(hip)   : null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [mode, index, waist, neck, hip]);

  // Tính % mỡ khi "Nhập số đo"
  const calculatedFat = useMemo(() => {
    const w  = parseFloat(waist);
    const n  = parseFloat(neck);
    const hi = parseFloat(hip);
    if (!w || !n || !height || !hi) return null;
    const log10 = x => Math.log(x) / Math.log(10);
    let bf;
    if (genderKey === "Nam") {
      bf = 495 / (1.0324 - 0.19077 * log10(w - n) + 0.15456 * log10(height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * log10(w + hi - n) + 0.22100 * log10(height)) - 450;
    }
    return Math.round(bf * 10) / 10;
  }, [waist, neck, hip, height, genderKey]);

  // Sync index với % mỡ hoặc slider
  useEffect(() => {
    const pct = mode === "Chọn %" ? categories[index].min : calculatedFat;
    if (pct == null) return;
    const found = categories.findIndex(c => pct >= c.min && pct <= c.max);
    if (found >= 0) setIndex(found);
  }, [calculatedFat, mode, index]);

  const imgKey = categories[index].file;
  const imgSrc = images[imgKey];

  const handleBack = () => go("step2");
  const handleContinue = () => {
    const pct = mode === "Chọn %" ? categories[index].min : calculatedFat;
    go("step4", {
      waist:           parseFloat(waist),
      neck:            parseFloat(neck),
      hip:             parseFloat(hip),
      bodyFatCategory: categories[index].label,
      bodyFatPercent:  pct,
      mode,
      index,
    });
  };

  return (
    <div className="step3-container">
      <div className="step3-body">

        {/* IMAGE PANEL: thêm avatar-info */}
        <div className="image-panel" style={{ height: '50px', display: 'block' }}>
          <img src={imgSrc} alt={categories[index].label} className="body-img" />
          <div className="avatar-info" style={{ textAlign: "center", marginTop: 8 }}>
            <div className="avatar-name" style={{ color: "#fff", fontWeight: "600" }}>
              {formData.fullName || "--"}
            </div>
            <div className="avatar-sub" style={{ color: "#aaa" }}>
              {genderText}, {formData.age || "--"} tuổi
            </div>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="form-panel" style={{ marginTop: '0px' }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ marginRight: 12 }}>Nhập số đo để tính % mỡ cơ thể</h2>
            <div style={{ padding: "4px 10px", backgroundColor: genderKey === "Nữ" ? "#e91e63" : "#2196f3", color: "white", borderRadius: 12, fontWeight: "bold", fontSize: "0.9rem" }}>
              {genderText}
            </div>
          </div>

          <div className="mode-toggle">
            <button onClick={() => setMode("Chọn %")} className={mode === "Chọn %" ? "active" : ""}>Chọn %</button>
            <button onClick={() => setMode("Nhập số đo")} className={mode === "Nhập số đo" ? "active" : ""}>Nhập số đo</button>
          </div>

          {mode === "Chọn %" ? (
            <div className="slider-wrapper">
              {categories.map((cat, i) => (
                <React.Fragment key={i}>
                  <div className="tick" style={{ left: `${(i / (categories.length - 1)) * 100}%` }} />
                  <div className="tick-label" style={{ left: `${(i / (categories.length - 1)) * 100}%` }}>{cat.label}</div>
                </React.Fragment>
              ))}
              <input type="range" min={0} max={categories.length - 1} step={1} value={index} onChange={e => setIndex(+e.target.value)} className="fat-slider" />
              <div className="circle" style={{ left: `${(index / (categories.length - 1)) * 100}%` }} />
              <div className="tooltip" style={{ left: `${(index / (categories.length - 1)) * 100}%` }}> {categories[index].label} </div>
            </div>
          ) : (
            <div className="manual-inputs">
              <Form.Group className="mb-3">
                <Form.Label>Vòng eo (cm)</Form.Label>
                <Form.Control type="number" value={waist} onChange={e => setWaist(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Vòng cổ (cm)</Form.Label>
                <Form.Control type="number" value={neck} onChange={e => setNeck(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Vòng hông (cm)</Form.Label>
                <Form.Control type="number" value={hip} onChange={e => setHip(e.target.value)} />
              </Form.Group>
              <div className="calculated" style={{ marginTop: 12 }}> % Mỡ: {calculatedFat != null ? `${calculatedFat}%` : "--"} </div>
            </div>
          )}

          <Button variant="primary" onClick={handleContinue} disabled={mode === "Nhập số đo" && calculatedFat == null} className="continue-btn">
            Tiếp tục →
          </Button>
        </div>
      </div>
    </div>
  );
}
