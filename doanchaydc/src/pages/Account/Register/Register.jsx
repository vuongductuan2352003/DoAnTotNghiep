// src/pages/Account/Register/Register.jsx
import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import images from '../../../assets/loadImg.js';
import '../../../styles/Register.css';
import api from '../../../utils/api.jsx';
export default function Register() {
  const navigate = useNavigate();

  // Step 1
  const [sendCodeForm, setSendCodeForm] = useState({
    username: "",
    name: "",
    email: "",
    birth: "",
  });
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  // Step 2
  const [verifyCodeForm, setVerifyCodeForm] = useState({
    email: "",
    otp: "",
  });

  // Step 3
  const [passwordForm, setPasswordForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  // UI state
  const [step, setStep] = useState(1); // 1: send, 2: verify, 3: set-password
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  // Timer for resend
  const [timer, setTimer] = useState(0);
  const canResend = timer === 0;

  // ========== Debounced username check ==========
  const checkUsername = debounce(async (u) => {
    if (!u.trim()) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    try {
      const { data } = await api.get("/auth/check-username", {
        params: { username: u.trim() },
      });
      setUsernameAvailable(data.available);
    } catch {
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  }, 300);

  // ========== Handlers ==========
  const handleSendCodeChange = (e) => {
    const { name, value } = e.target;
    setSendCodeForm((prev) => ({ ...prev, [name]: value }));
    if (name === "username") {
      setUsernameAvailable(null);
      checkUsername(value);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register/send-otp", sendCodeForm);
      // Prepare for step 2
      setVerifyCodeForm({ email: sendCodeForm.email, otp: "" });
      setPasswordForm(prev => ({ ...prev, email: sendCodeForm.email }));

      setStep(2);
      // start countdown
      setTimer(60);
      // show success toast
    } catch {}
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register/verify-otp", verifyCodeForm);
      setStep(3);
    } catch {}
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register/set-password", passwordForm);
      setTimeout(() => navigate("/Trang-chu"), 500);
    } catch {}
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      await api.post("/auth/register/resend-otp", {
        email: verifyCodeForm.email,
      });
      setTimer(60);
    } catch {}
  };
  // ========== Effects ==========
  // auto-hide toast after 3s
  // countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  // ========== Render ==========

  return (
    <>
      <main className="Register">
        {step === 1 && (
          <div className="Register_1">
          <a
  href="/Login"
  style={{
    cursor: 'pointer',
    color: '#fff',        // Màu trắng
    textDecoration: 'none' ,// Bỏ gạch chân
    fontSize:'15px'
  }}
>
  <i className="fa-solid fa-arrow-left" /> 
</a>


            {/* -- Step 1: Send OTP -- */}
            <div className="Register_1_1">
              <img src={images["logo.png"]} alt="Logo" />
              <h2>Tạo tài khoản của bạn</h2>
            </div>
            <form onSubmit={handleSendOtp} className="RegisterForm">
              <input
                type="text"
                name="username"
                placeholder="Chọn username"
                value={sendCodeForm.username}
                onChange={handleSendCodeChange}
                onBlur={() => checkUsername(sendCodeForm.username)}
                required
              />
              {checkingUsername && (
                <p className="info" style={{ height: "5px" }}>
                  Đang kiểm tra...
                </p>
              )}
              {usernameAvailable === true && (
                <p className="valid" style={{ height: "5px" }}>
                  ✓ Username khả dụng
                </p>
              )}
              {usernameAvailable === false && (
                <p className="error" style={{ height: "5px" }}>
                  ✗ Đã tồn tại
                </p>
              )}

              <input
                type="text"
                name="name"
                placeholder="Tên của bạn"
                value={sendCodeForm.name}
                onChange={handleSendCodeChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email của bạn"
                value={sendCodeForm.email}
                onChange={handleSendCodeChange}
                required
              />

              <div className="Register_1_1_1">
                <div>
                  <span>Ngày sinh</span>
                  <p>
                    Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của
                    bạn, ngay cả khi tài khoản này dành cho doanh nghiệp, thú
                    cưng hoặc thứ gì khác.
                  </p>
                </div>
                <input
                  type="date"
                  name="birth"
                  value={sendCodeForm.birth}
                  onChange={handleSendCodeChange}
                  required
                  style={{
                    background: "white",
                    width: "150px",
                    borderRadius: "30px",
                    marginTop: "30px",
                    height: "90px",
                    color: "black",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={usernameAvailable === false || checkingUsername}
              >
                Đăng Ký
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="setPassWord">
            {/* -- Step 2: Verify OTP -- */}
            <i
              className="fa-solid fa-arrow-left"
              style={{ cursor: "pointer" }}
              onClick={() => setStep(1)}
            />
            <div className="Register_1_1">
              <img src={images["logo.png"]} alt="Logo" />
              <h2>Nhập mã OTP</h2>
            </div>
            <form onSubmit={handleVerifyOtp} className="RegisterForm">
              <input
                type="text"
                name="otp"
                placeholder="Mã OTP"
                value={verifyCodeForm.otp}
                onChange={(e) =>
                  setVerifyCodeForm((prev) => ({
                    ...prev,
                    otp: e.target.value,
                  }))
                }
                required
              />

              <span
                className="qwe"
                style={{
                  color: canResend ? "#81A1C1" : "#aaa",
                  cursor: canResend ? "pointer" : "default",
                  fontSize: "15px",
                  marginLeft: "60px",
                  marginBottom: "40px",
            
                }}
                onClick={canResend ? handleResendOtp : undefined}
              >
                Bạn không nhận được mã từ email?&nbsp;
                {canResend ? "Gửi lại OTP" : `Gửi lại sau ${timer}s`}
              </span>

              <button type="submit">Xác thực OTP</button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="acceptPassWord">
            {/* -- Step 3: Set New Password -- */}
            <i
              className="fa-solid fa-arrow-left"
              style={{ cursor: "pointer" }}
              onClick={() => setStep(2)}
            />
            <div className="Register_1_1">
              <img src={images["logo.png"]} alt="Logo" />
              <h2>Đặt mật khẩu mới</h2>
            </div>
            <form onSubmit={handleSetPassword} className="RegisterForm">
              <div className="input-container">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  value={passwordForm.password}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
                <div
                  className="hidden_show"
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? (
                    <i className="fa-regular fa-eye-slash" />
                  ) : (
                    <i className="fa-regular fa-eye" />
                  )}
                </div>
              </div>

              <div className="input-container">
                <input
                  type={showPassConfirm ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Xác nhận mật khẩu"
                  value={passwordForm.password_confirmation}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      password_confirmation: e.target.value,
                    }))
                  }
                  required
                />
                <div
                  className="hidden_show"
                  onClick={() => setShowPassConfirm((v) => !v)}
                >
                  {showPassConfirm ? (
                    <i className="fa-regular fa-eye-slash" />
                  ) : (
                    <i className="fa-regular fa-eye" />
                  )}
                </div>
              </div>

              <button type="submit">Hoàn tất</button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
