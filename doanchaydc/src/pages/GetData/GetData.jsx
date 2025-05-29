// src/pages/GetData.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../styles/GetData.css';

const totalSteps = 35;
const STORAGE_KEY = 'formData';

export default function GetData() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();
  const location = useLocation();
  const stepMatch = location.pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? Number(stepMatch[1]) : 1;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const go = (to, data = {}) => {
    const merged = data.fullName && data.fullName !== formData.fullName
      ? data
      : { ...formData, ...data };
    setFormData(merged);
    navigate(to);
  };

  const handleBack = () => {
    if (currentStep <= 1) return;

    // Nếu đang ở step 13 và location là gym hoặc combo thì về step11
    if (
      currentStep === 13 &&
      ['gym', 'none'].includes(formData.location)
    ) {
      navigate(`/body-building/step11`);
    } else {
      // Ngược lại, về step trước bình thường
      navigate(`/body-building/step${currentStep - 1}`);
    }
  };

  return (
    <div className="background_AddData">
      <div className="step3-header">
        {currentStep > 1 && (
          <FaArrowLeft className="back-icon" onClick={handleBack} />
        )}
        <div className="progress-bar">
          <div
            className="filler"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="step-counter">
          {currentStep}/{totalSteps}
        </div>
      </div>
      <Outlet context={{ formData, go, currentStep, totalSteps }} />
    </div>
  );
}
