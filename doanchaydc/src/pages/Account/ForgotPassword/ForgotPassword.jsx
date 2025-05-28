// src/pages/Account/ForgotPassword/ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api.jsx';
import images from '../../../assets/loadImg.js';
import '../../../styles/Register.css'; // tái sử dụng style của Register

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Bước hiện tại: 1 = nhập email, 2 = verify OTP, 3 = đặt mật khẩu mới
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  // Form data
  const [formEmail, setFormEmail] = useState('');
  const [otpForm, setOtpForm] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    password_confirmation: ''
  });

  // Countdown cho resend OTP
  const [timer, setTimer] = useState(0);
  const canResend = timer === 0;

 // Gửi OTP
const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/password/forgot/send-otp', { email: formEmail });
      setStep(2);
      setTimer(60);
    } catch {
      // lỗi sẽ được interceptor của api xử lý
    }
  };
  
  // Xác thực OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/password/forgot/verify', {
        email: formEmail,
        otp: otpForm
      });
      setStep(3);
    } catch {
      // lỗi sẽ được interceptor của api xử lý
    }
  };
  
  // Đặt lại mật khẩu
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/password/forgot/reset', {
        email: formEmail,
        new_password: passwordForm.password,
        new_password_confirmation: passwordForm.password_confirmation
      });
      // Sau khi reset thành công, chuyển về trang login
      setTimeout(() => navigate('/Login'), 1000);
    } catch {
      // lỗi sẽ được interceptor của api xử lý
    }
  };
  
  // Gửi lại OTP
  const resendOtp = async () => {
    if (!canResend) return;
    try {
      await api.post('/auth/password/forgot/resend-otp', { email: formEmail });
      setTimer(60);
    } catch {
      // lỗi sẽ được interceptor của api xử lý
    }
  };
  
  // Countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  return (
    <main className="Register">
      {step === 1 && (
        <div className="Register_1">
        <a href="/Login">
  <i
    className="fa-solid fa-arrow-left"
    style={{
      cursor: 'pointer',
      color: '#fff'  // màu trắng
    }}
  />
</a>

          <div className="Register_1_1">
            <img src={images['logo.png']} alt="Logo" />
            <h2>Quên mật khẩu</h2>
          </div>
          <form onSubmit={sendOtp} className="RegisterForm">
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={formEmail}
              onChange={e => setFormEmail(e.target.value)}
              required
            />
            <button type="submit">Gửi OTP</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="setPassWord">
          <i
            className="fa-solid fa-arrow-left"
            style={{ cursor: 'pointer' }}
            onClick={() => setStep(1)}
          />
          <div className="Register_1_1">
            <img src={images['logo.png']} alt="Logo" />
            <h2>Xác thực OTP</h2>
          </div>
          <form onSubmit={verifyOtp} className="RegisterForm">
            <input
              type="text"
              name="otp"
              placeholder="Mã OTP"
              value={otpForm}
              onChange={e => setOtpForm(e.target.value)}
              required
            />
           <span
                className="qwe"
                style={{
                  color: canResend ? "#81A1C1" : "#aaa" ,
                  cursor: canResend ? "pointer" : "default",
                  fontSize: "15px",
                  marginLeft: "60px",
                  marginBottom: "40px",
                 
                }}
                onClick={canResend ? resendOtp : undefined}
              >
                Bạn không nhận được mã từ email?&nbsp;
                {canResend ? "Gửi lại OTP" : `Gửi lại sau ${timer}s`}
              </span>
            <button type="submit">Xác nhận</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="acceptPassWord">
          <i
            className="fa-solid fa-arrow-left"
            style={{ cursor: 'pointer' }}
            onClick={() => setStep(2)}
          />
          <div className="Register_1_1">
            <img src={images['logo.png']} alt="Logo" />
            <h2>Đặt mật khẩu mới</h2>
          </div>
          <form onSubmit={resetPassword} className="RegisterForm">
            <div className="input-container">
              <input
                 type={showPass ? "text" : "password"}
                name="new_password"
                placeholder="Mật khẩu mới"
                value={passwordForm.password}
                onChange={e =>
                  setPasswordForm(p => ({ ...p, password: e.target.value }))
                }
                required
              />
            </div>
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
            <div className="input-container">
              <input
                type={showPassConfirm ? "text" : "password"}
                name="new_password_confirmation"
                placeholder="Xác nhận mật khẩu"
                value={passwordForm.password_confirmation}
                onChange={e =>
                  setPasswordForm(p => ({
                    ...p,
                    password_confirmation: e.target.value
                  }))
                }
                required
              />
            </div>
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
            <button type="submit">Hoàn tất</button>
          </form>
        </div>
      )}
    </main>
  );
}
