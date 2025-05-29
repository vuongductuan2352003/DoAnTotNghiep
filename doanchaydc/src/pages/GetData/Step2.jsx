// src/pages/GetData/Step2BodyMeasurements.jsx
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import images from "../../assets/loadImg.js";
import { useOutletContext } from "react-router-dom";
import '../../styles/step2.css';

const STORAGE_KEY = 'formData';

export default function Step2BodyMeasurements() {
  // Lấy formData và hàm go từ Outlet context (GetData)
  const { formData, go } = useOutletContext();

  // Preload dữ liệu nếu có từ formData
  // -- Lưu ý: unit giờ là tiếng Việt có dấu
  const [unit, setUnit] = useState(formData.unit || "cm / kg");
  const [height, setHeight] = useState(
    formData.height != null ? String(formData.height) : ""
  );
  const [weight, setWeight] = useState(
    formData.weight != null ? String(formData.weight) : ""
  );

  // Khi formData thay đổi (nếu người dùng quay lại step này)
  useEffect(() => {
    if (formData.unit) setUnit(formData.unit);
    if (formData.height != null) setHeight(String(formData.height));
    if (formData.weight != null) setWeight(String(formData.weight));
  }, [formData]);

  // Tự động lưu draft vào localStorage khi thay đổi unit/height/weight
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const draft = {
      ...existing,
      unit,
      height: height ? parseFloat(height) : null,
      weight: weight ? parseFloat(weight) : null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [unit, height, weight]);

  // Giữ gender từ bước trước (giá trị là "Nam" hoặc "Nữ" có dấu)
  const gender = formData.gender || "Nam";
  const imgKey = gender === "Nữ" ? "female1.png" : "male1.png";

  // Khi nhấn tiếp tục, gọi go để cập nhật formData và chuyển bước tiếp theo
  const handleContinue = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      go("step3", {
        unit,
        height: h,
        weight: w,
      });
    }
  };

  return (
    <div className="step2-container">
      {/* Preview Ảnh + số đo */}
      <div className="w-50 position-relative cccn1">
        <img
          src={images[imgKey]}
          alt={gender === "Nữ" ? "Vận động viên nữ" : "Vận động viên nam"}
          className="nvstep2"
        />
        <div
          className="position-absolute top-50 end-0 translate-middle-y pe-3 text-end"
          style={{ pointerEvents: "none" }}
        >
          <div className="fs-3 fw-bold">{height ? `${height} ${unit}` : `0 ${unit}`}</div>
          <div
            className="mx-auto my-2"
            style={{ width: "2px", height: "300px", background: "white" }}
          />
        </div>
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-3 text-center"
          style={{ pointerEvents: "none" }}
        >
          <div className="fs-4 fw-bold cccn">{weight ? `${weight} kg` : `0 kg`}</div>
        </div>
      </div>

      {/* Form nhập số đo */}
      <div className="step2-title-1">
        <h1 className="step2-title">Số đo cơ thể của bạn là?</h1>

        <div className="unit-toggle">
          <button
            className={unit === "ft, in" ? "unit-btn active" : "unit-btn"}
            onClick={() => setUnit("ft, in")}
          >
            ft, in
          </button>
          <button
            className={unit === "cm / kg" ? "unit-btn active" : "unit-btn"}
            onClick={() => setUnit("cm / kg")}
          >
            cm / kg
          </button>
        </div>

        <Form.Group className="mt-4">
          <Form.Label className="input-label">
            {unit === "cm / kg" ? "Chiều cao (cm)" : "Chiều cao (ft/in)"}
          </Form.Label>
          <Form.Control
            type="number"
            placeholder={`__ ${unit === "cm / kg" ? "cm" : "ft/in"}`}
            className="height-input"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label className="input-label">Cân nặng (kg)</Form.Label>
          <Form.Control
            type="number"
            placeholder="__ kg"
            className="weight-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="continue-btn"
          onClick={handleContinue}
          disabled={!(parseFloat(height) > 0 && parseFloat(weight) > 0)}
        >
          Tiếp tục ➔
        </Button>
      </div>
    </div>
  );
}
