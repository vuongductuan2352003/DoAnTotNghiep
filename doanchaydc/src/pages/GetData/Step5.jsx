// src/pages/GetData/Step5Circumference.jsx
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import images from "../../assets/loadImg.js";
import '../../styles/step5.css';

// Key lưu draft formData
const STORAGE_KEY = 'formData';

export default function Step5Circumference() {
  const { formData, go, currentStep } = useOutletContext();

  // states preload từ formData hoặc rỗng
  const [chest,    setChest]    = useState(formData.chest    ?? "");
  const [wrist,    setWrist]    = useState(formData.wrist    ?? "");
  const [arm,      setArm]      = useState(formData.arm      ?? "");
  const [thigh,    setThigh]    = useState(formData.thigh    ?? "");
  const [ankle,    setAnkle]    = useState(formData.ankle    ?? "");
  const [skinfold, setSkinfold] = useState(formData.skinfold ?? "");
  const [bp,       setBp]       = useState(formData.bloodPressure    ?? "");
  const [hr,       setHr]       = useState(formData.restingHeartRate ?? "");
  const [glucose,  setGlucose]  = useState(formData.bloodGlucose     ?? "");
  const [lipid,    setLipid]    = useState(formData.lipidProfile     ?? "");

  // preload khi formData thay đổi
  useEffect(() => {
    setChest(formData.chest ?? "");
    setWrist(formData.wrist ?? "");
    setArm(formData.arm ?? "");
    setThigh(formData.thigh ?? "");
    setAnkle(formData.ankle ?? "");
    setSkinfold(formData.skinfold ?? "");
    setBp(formData.bloodPressure ?? "");
    setHr(formData.restingHeartRate ?? "");
    setGlucose(formData.bloodGlucose ?? "");
    setLipid(formData.lipidProfile ?? "");
  }, [formData]);

  // auto-save draft
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const draft = {
      ...existing,
      chest,
      wrist,
      arm,
      thigh,
      ankle,
      skinfold,
      bloodPressure: bp,
      restingHeartRate: hr,
      bloodGlucose: glucose,
      lipidProfile: lipid,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [chest, wrist, arm, thigh, ankle, skinfold, bp, hr, glucose, lipid]);

  // personal info
  const fullName = formData.fullName || "--";
  const age      = formData.age || "--";
  const gender   = formData.gender === "female" ? "female" : "male";
  const avatar   = gender === "female"
    ? images["Female.png"]
    : images["male.png"];

  // enable Next khi có ít nhất 1 hoặc skip luôn lưu
  const isAnyFilled = [chest, wrist, arm, thigh, ankle, skinfold, bp, hr, glucose, lipid]
    .some(val => val !== "");

  const buildUpdated = () => ({
    ...formData,
    chest: chest,
    wrist: wrist,
    arm: arm,
    thigh: thigh,
    ankle: ankle,
    skinfold: skinfold,
    bloodPressure: bp,
    restingHeartRate: hr,
    bloodGlucose: glucose,
    lipidProfile: lipid,
  });

  const handleNext = () => {
    go(`step${currentStep + 1}`, buildUpdated());
  };

  const handleSkip = () => {
    go(`step${currentStep + 1}`, buildUpdated());
  };

  const handleBack = () => go(`step${currentStep - 1}`, formData);

  // form fields config
  const fields = [
    { label: "Vòng ngực (cm)",         value: chest,    onChange: e=>setChest(e.target.value),    type: "number", placeholder: "95" },
    { label: "Vòng cổ tay (cm)",       value: wrist,    onChange: e=>setWrist(e.target.value),    type: "number", placeholder: "16" },
    { label: "Vòng bắp tay (cm)",      value: arm,      onChange: e=>setArm(e.target.value),      type: "number", placeholder: "35" },
    { label: "Vòng đùi (cm)",          value: thigh,    onChange: e=>setThigh(e.target.value),    type: "number", placeholder: "55" },
    { label: "Vòng cổ chân (cm)",      value: ankle,    onChange: e=>setAnkle(e.target.value),    type: "number", placeholder: "22" },
    { label: "Độ dày nếp gấp da (mm)",  value: skinfold, onChange: e=>setSkinfold(e.target.value), type: "number", placeholder: "10" },
    { label: "Huyết áp (mmHg)",        value: bp,       onChange: e=>setBp(e.target.value),       type: "text",   placeholder: "120/80" },
    { label: "Nhịp tim nghỉ ngơi (bpm)",value: hr,       onChange: e=>setHr(e.target.value),       type: "number", placeholder: "60" },
    { label: "Đường huyết (mmol/L)",   value: glucose,  onChange: e=>setGlucose(e.target.value),  type: "number", placeholder: "5.2" },
    { label: "Lipid Profile",          value: lipid,    onChange: e=>setLipid(e.target.value),    type: "text",   placeholder: "LDL 100, TG 150" },
  ];

  return (
    <div className="step5-circumference">
      {/* Avatar */}
      <div className="c-avatar">
        <img src={avatar} alt="Avatar" />
        <div className="c-avatar-name">{fullName}</div>
        <div className="c-avatar-info">{gender === "female" ? "Nữ" : "Nam"}, {age} tuổi</div>
      </div>

      {/* Form */}
      <div className="c-form-panel">
        <h2 className="c-form-title">Nhập các chỉ số sức khỏe & vòng đo</h2>

        <Form className="c-form-grid">
          {fields.map((f, i) => (
            <div key={i} className="c-form-card">
              <Form.Label>{f.label}</Form.Label>
              <Form.Control
                type={f.type}
                value={f.value}
                onChange={f.onChange}
                placeholder={f.placeholder}
              />
            </div>
          ))}

          <div className="c-btn-group">
            <Button variant="outline-light" onClick={handleSkip}>
              Bỏ qua
            </Button>
            <Button variant="warning" onClick={handleNext}>
              Tiếp tục →
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}