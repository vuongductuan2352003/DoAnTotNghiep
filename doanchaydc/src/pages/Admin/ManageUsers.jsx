// src/pages/Admin/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api.jsx";
import "../../styles/Admin.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    name: "",
    email: "",
    role: "user",
    is_active: true,
    gender: "",
    age: "",
    is_private: false,
    birth: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
      setError("Không thể tải danh sách user.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEditing && currentUser) {
        // Update user
        await api.put(`/admin/users/${currentUser.user_id}`, formValues);
      } else {
        // Create new user
        await api.post("/admin/users", formValues);
      }
      setFormValues({
        username: "",
        name: "",
        email: "",
        role: "user",
        is_active: true,
        gender: "",
        age: "",
        is_private: false,
        birth: "",
        password: "",
      });
      setIsEditing(false);
      setCurrentUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi khi lưu user:", err);
      const msg = err.response?.data?.message || "Có lỗi xảy ra.";
      setError(msg);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setFormValues({
      username: user.username || "",
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      is_active: user.is_active ?? true,
      gender: user.gender || "",
      age: user.age || "",
      is_private: user.is_private ?? false,
      birth: user.birth ? user.birth.split("T")[0] : "",
      password: "",
    });
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Bạn có chắc muốn xóa user "${user.username}" không?`)) return;
    try {
      await api.delete(`/admin/users/${user.user_id}`);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi xóa user:", err);
      alert("Xóa không thành công.");
    }
  };

  return (
    <div className="manage-users">
      <h2 className="admin-page-title">Quản lý Người dùng</h2>

      {/* Form tạo / sửa */}
      <div className="user-form-container">
        <h3>{isEditing ? "Chỉnh sửa User" : "Tạo mới User"}</h3>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Role:</label>
            <select name="role" value={formValues.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-row">
            <label>Active:</label>
            <input
              type="checkbox"
              name="is_active"
              checked={formValues.is_active}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Gender:</label>
            <select name="gender" value={formValues.gender} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-row">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formValues.age}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-row">
            <label>Private:</label>
            <input
              type="checkbox"
              name="is_private"
              checked={formValues.is_private}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Birth:</label>
            <input
              type="date"
              name="birth"
              value={formValues.birth}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required={!isEditing} 
              placeholder={isEditing ? "Để trống nếu không đổi" : ""}
            />
          </div>
          <div className="form-actions">
            <button type="submit">{isEditing ? "Cập nhật" : "Tạo mới"}</button>
            {isEditing && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentUser(null);
                  setFormValues({
                    username: "",
                    name: "",
                    email: "",
                    role: "user",
                    is_active: true,
                    gender: "",
                    age: "",
                    is_private: false,
                    birth: "",
                    password: "",
                  });
                }}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bảng danh sách user */}
      <div className="user-table-container">
        {loading ? (
          <p>Đang tải danh sách user...</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Created At</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.user_id}>
                  <td>{u.user_id}</td>
                  <td>{u.username}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.is_active ? "√" : "—"}</td>
                  <td>{new Date(u.created_at).toLocaleDateString("vi-VN")}</td>
                  <td className="action-buttons">
                    <button onClick={() => handleEdit(u)}>Sửa</button>
                    <button onClick={() => handleDelete(u)} className="delete-btn">
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
