// src/pages/auth/Login.jsx
import React, { useState, useEffect } from "react";
import "../../../styles/Login.css";
import images from "../../../assets/loadImg.js";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api.jsx";

export default function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle show/hide password
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // After successful login, fetch /user/profile to get the role,
  // then navigate accordingly.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // 1) POST /auth/login → get access_token
      const response = await api.post(
        "/auth/login",
        loginForm,
        { headers: { Accept: "application/json" } }
      );

      const token = response.data.access_token;
      if (token) {
        // Store token in localStorage
        localStorage.setItem("access_token", token);

        // 2) Immediately fetch profile to know "role"
        // We'll assume /user/profile returns something like { user_id, username, role, ... }
        const profileRes = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const role = profileRes.data.role || "user";

        // 3) Redirect based on role
        if (role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/com");
        }
      }
    } catch (error) {
      // Display error message from API, or a generic fallback
      setErrorMessage(
        error.response?.data?.message || "Đăng nhập thất bại."
      );
    }
  };

  // Clear the error message automatically after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <main className="Register">
      <div className="Register_1">
        <div className="Register_1_1">
          <img src={images["logo.png"]} alt="Logo" />
          <h2>Đăng nhập</h2>
        </div>

        <form onSubmit={handleSubmit} className="RegisterForm">
          <input
            type="email"
            name="email"
            placeholder="Email của bạn"
            value={loginForm.email}
            onChange={handleChange}
            required
          />

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
            <div className="hidden_show" onClick={toggleShowPassword}>
              {showPassword ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </div>
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="auth-links">
            <a href="/register">Bạn chưa có tài khoản? Tạo tài khoản mới</a>
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit">Đăng Nhập</button>
        </form>
      </div>
    </main>
  );
}
