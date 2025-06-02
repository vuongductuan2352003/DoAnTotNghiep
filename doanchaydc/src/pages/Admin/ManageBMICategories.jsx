// src/pages/Admin/ManageBMICategories.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api.jsx";
import "../../styles/Admin.css";

export default function ManageBMICategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentCat, setCurrentCat] = useState(null);
  const [formValues, setFormValues] = useState({
    category_label: "",
    bmi_min: "",
    bmi_max: "",
    risk_male: "",
    risk_female: "",
    advice_male: "",
    advice_female: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/bmi-categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách BMI Categories:", err);
      setError("Không thể tải danh sách BMI Categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Chuẩn hóa các trường mảng: tách dấu phẩy thành array
      const payload = {
        category_label: formValues.category_label,
        bmi_min: formValues.bmi_min !== "" ? parseFloat(formValues.bmi_min) : null,
        bmi_max: formValues.bmi_max !== "" ? parseFloat(formValues.bmi_max) : null,
        risk_male: formValues.risk_male
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        risk_female: formValues.risk_female
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        advice_male: formValues.advice_male
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
        advice_female: formValues.advice_female
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0),
      };

      if (isEditing && currentCat) {
        await api.put(`/admin/bmi-categories/${currentCat.id}`, payload);
      } else {
        await api.post("/admin/bmi-categories", payload);
      }

      setFormValues({
        category_label: "",
        bmi_min: "",
        bmi_max: "",
        risk_male: "",
        risk_female: "",
        advice_male: "",
        advice_female: "",
      });
      setIsEditing(false);
      setCurrentCat(null);
      fetchCategories();
    } catch (err) {
      console.error("Lỗi lưu BMI Category:", err);
      const msg = err.response?.data?.message || "Có lỗi xảy ra.";
      setError(msg);
    }
  };

  const handleEdit = (cat) => {
    setIsEditing(true);
    setCurrentCat(cat);
    setFormValues({
      category_label: cat.category_label || "",
      bmi_min: cat.bmi_min !== null ? String(cat.bmi_min) : "",
      bmi_max: cat.bmi_max !== null ? String(cat.bmi_max) : "",
      risk_male: (cat.risk_male || []).join(", "),
      risk_female: (cat.risk_female || []).join(", "),
      advice_male: (cat.advice_male || []).join(", "),
      advice_female: (cat.advice_female || []).join(", "),
    });
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${cat.category_label}" không?`)) return;
    try {
      await api.delete(`/admin/bmi-categories/${cat.id}`);
      fetchCategories();
    } catch (err) {
      console.error("Lỗi xóa BMI Category:", err);
      alert("Xóa không thành công.");
    }
  };

  return (
    <div className="manage-bmi-categories">
      <h2 className="admin-page-title">Quản lý BMI Categories</h2>

      {/* Form tạo / sửa */}
      <div className="bmi-form-container">
        <h3>{isEditing ? "Chỉnh sửa BMI Category" : "Tạo mới BMI Category"}</h3>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit} className="bmi-form">
          <div className="form-row">
            <label>Label:</label>
            <input
              type="text"
              name="category_label"
              value={formValues.category_label}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>BMI Min:</label>
            <input
              type="number"
              name="bmi_min"
              value={formValues.bmi_min}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div className="form-row">
            <label>BMI Max:</label>
            <input
              type="number"
              name="bmi_max"
              value={formValues.bmi_max}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div className="form-row">
            <label>Risk Male (phân tách bằng dấu phẩy):</label>
            <textarea
              name="risk_male"
              value={formValues.risk_male}
              onChange={handleChange}
              placeholder="Ví dụ: Nguy cơ X, Nguy cơ Y"
            />
          </div>
          <div className="form-row">
            <label>Risk Female (phân tách bằng dấu phẩy):</label>
            <textarea
              name="risk_female"
              value={formValues.risk_female}
              onChange={handleChange}
              placeholder="Ví dụ: Nguy cơ A, Nguy cơ B"
            />
          </div>
          <div className="form-row">
            <label>Advice Male (phân tách bằng dấu phẩy):</label>
            <textarea
              name="advice_male"
              value={formValues.advice_male}
              onChange={handleChange}
              placeholder="Ví dụ: Khuyên 1, Khuyên 2"
            />
          </div>
          <div className="form-row">
            <label>Advice Female (phân tách bằng dấu phẩy):</label>
            <textarea
              name="advice_female"
              value={formValues.advice_female}
              onChange={handleChange}
              placeholder="Ví dụ: Khuyên A, Khuyên B"
            />
          </div>
          <div className="form-actions">
            <button type="submit">
              {isEditing ? "Cập nhật" : "Tạo mới"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentCat(null);
                  setFormValues({
                    category_label: "",
                    bmi_min: "",
                    bmi_max: "",
                    risk_male: "",
                    risk_female: "",
                    advice_male: "",
                    advice_female: "",
                  });
                }}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bảng danh sách BMI Categories */}
      <div className="bmi-table-container">
        {loading ? (
          <p>Đang tải danh sách BMI Categories...</p>
        ) : (
          <table className="bmi-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Label</th>
                <th>BMI Min</th>
                <th>BMI Max</th>
                <th>Risk Male</th>
                <th>Risk Female</th>
                <th>Advice Male</th>
                <th>Advice Female</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.category_label}</td>
                  <td>{c.bmi_min}</td>
                  <td>{c.bmi_max}</td>
                  <td>{(c.risk_male || []).join(", ")}</td>
                  <td>{(c.risk_female || []).join(", ")}</td>
                  <td>{(c.advice_male || []).join(", ")}</td>
                  <td>{(c.advice_female || []).join(", ")}</td>
                  <td className="action-buttons">
                    <button onClick={() => handleEdit(c)}>Sửa</button>
                    <button
                      onClick={() => handleDelete(c)}
                      className="delete-btn"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
