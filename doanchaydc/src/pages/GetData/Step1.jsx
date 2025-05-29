// src/pages/Step1UserInfo.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import images from "../../assets/loadImg.js";
import { toast } from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";

const STORAGE_KEY = 'formData';

export default function Step1UserInfo() {
  const navigate = useNavigate();

  // Lấy formData và go từ context
  const { formData, go } = useOutletContext();

  // Khởi tạo state từ formData (nếu có)
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [dob, setDob] = useState(formData.dob || "");
  const [gender, setGender] = useState(formData.gender || "Nam");

  // Khi formData thay đổi (ví dụ user quay lại step này), cập nhật state
  useEffect(() => {
    if (formData.fullName) setFullName(formData.fullName);
    if (formData.dob) setDob(formData.dob);
    if (formData.gender) setGender(formData.gender);
  }, [formData]);

  // Tự động lưu draft vào localStorage khi người dùng nhập
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const updated = { ...existing, fullName, dob, gender };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [fullName, dob, gender]);

  // Tính tuổi dựa vào dob
  const age = useMemo(() => {
    if (!dob) return 0;
    const today = new Date();
    const b = new Date(dob);
    let a = today.getFullYear() - b.getFullYear();
    const m = today.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < b.getDate())) a--;
    return a > 0 ? a : 0;
  }, [dob]);

  const handleContinue = () => {
    if (!fullName.trim() || !dob) {
      toast.error("Vui lòng nhập đủ họ tên và ngày sinh");
      return;
    }
    if (age < 18) {
      toast.error("Bạn chưa đủ tuổi (phải từ 18 trở lên)");
      return;
    }

    // Gọi go để cập nhật formData và chuyển bước tiếp theo
    go("step2", { fullName, dob, gender, age });
  };

  return (
    <div className="background_AddData_1">
      <h1>XÂY DỰNG CƠ THỂ HOÀN HẢO CỦA BẠN</h1>
      <p>THEO ĐỘ TUỔI VÀ CHỈ SỐ BMI CỦA BẠN</p>

      <div className="onboard-container">
        <div className="preview-panel">
          <img
            src={gender === "Nữ" ? images["Female.png"] : images["male.png"]}
            alt="Avatar"
            className="preview-img"
          />
          <div className="preview-info">
            <div className="preview-name">
              {fullName.trim() ? fullName : "Tên của bạn"}
            </div>
            <div className="preview-age">{dob ? `${age} tuổi` : "0+"}</div>
            <div className="preview-gender">{gender}</div>
          </div>
        </div>

        <div className="form-panel">
          <h2>Thông tin cơ bản</h2>

          <FloatingLabel label="Tên của bạn" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Tên của bạn"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Giới tính</Form.Label>
            <div>
              <Form.Check
                inline
                label="Nam"
                name="gender"
                type="radio"
                id="gender-male"
                value="Nam"
                checked={gender === "Nam"}
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Check
                inline
                label="Nữ"
                name="gender"
                type="radio"
                id="gender-female"
                value="Nữ"
                checked={gender === "Nữ"}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </Form.Group>

          <Button variant="primary" onClick={handleContinue} className="w-100">
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}
