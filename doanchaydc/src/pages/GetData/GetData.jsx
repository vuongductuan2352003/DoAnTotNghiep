// src/pages/GetData.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../styles/GetData.css';

const totalSteps = 13;
const STORAGE_KEY = 'formData';

export default function GetData() {
  // Load initial formData from localStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();
  const location = useLocation();

  const stepMatch = location.pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? Number(stepMatch[1]) : 1;

  // Persist formData to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const go = (to, data = {}) => {
    // On Step1, if fullName is entered and differs from existing, reset entire formData
    if (data.fullName && data.fullName !== formData.fullName) {
      setFormData(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      const merged = { ...formData, ...data };
      setFormData(merged);
      // localStorage updated by useEffect
    }
    navigate(to);
  };

  const handleBack = () => {
    if (currentStep > 1) {
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
        <div className="step-counter">{currentStep}/{totalSteps}</div>
      </div>
      {/* Pass formData and go via context */}
      <Outlet context={{ formData, go, currentStep, totalSteps }} />
    </div>
  );
}