// src/pages/Account/Register/Register.jsx
import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import images from "../../../assets/loadImg.js";
import "../../../styles/Register.css";
import api from "../../../utils/api.jsx";
import LoadingProgress from "../../../components/LoadingProgress";
export default function Register() {
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [percent, setPercent] = useState(0);

  // === Bước 0: Đọc formData đã lưu (nếu có) ===
  const savedData = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("formData")) || {};
    } catch {
      return {};
    }
  }, []);

  // Step 1: gửi OTP
  const [sendCodeForm, setSendCodeForm] = useState({
    username: "",
    name: savedData.fullName || "",
    email: "",
    birth: savedData.dob || "",
    age: savedData.age || "",
    gender: savedData.gender || "",
  });
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  // Step 2: verify OTP
  const [verifyCodeForm, setVerifyCodeForm] = useState({
    email: "",
    otp: "",
  });

  // Step 3: đặt mật khẩu
  const [passwordForm, setPasswordForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  // UI state
  const [step, setStep] = useState(1); // 1: send OTP, 2: verify, 3: set password
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  // countdown resend OTP
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
      // sang bước 2
      setVerifyCodeForm({ email: sendCodeForm.email, otp: "" });
      setPasswordForm((prev) => ({ ...prev, email: sendCodeForm.email }));
      setStep(2);
      setTimer(60);
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
    // ===== 1. Khởi tạo loading =====
    setLoading(true);

    // ===== 2. Tính tổng số bước cần chia % =====
    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    let steps = 11; // các API chính: set-pass, body_measurements, fitness_goals, training_preferences, food_preferences, current-health, lifestyle-habits, projected-metrics, projected-health, problems, extraGoals
    // Đếm các mảng phụ
    const prefs = formData.preferences || {};
    steps += Object.keys(prefs).length;
    steps += (formData.weeklySessions || []).length;
    steps += (formData.activities || []).length;
    steps += (formData.regionFocus || []).length;
    steps += (formData.sports || []).length;
    steps += (formData.equipment || []).length;
    const foodCategories = formData.foodPreferences ? Object.values(formData.foodPreferences).reduce((acc, items) => acc + items.length, 0) : 0;
    steps += foodCategories;
    steps += (formData.problems || []).length;
    steps += (formData.extraGoals || []).length;

    let currentStep = 0;
    const stepPercent = (val = 1) => {
      currentStep += val;
      setPercent(Math.round((currentStep / steps) * 100));
    };

    // ===== 3. API gọi lần lượt =====

    // 1. Tạo tài khoản (set-password)
    const { data } = await api.post("/auth/register/set-password", passwordForm);
    stepPercent();
    const userId = data.user_id;

    // 2. body_measurements
    await api.post("/v1/body-measurements", {
      user_id: userId,
      height_cm: formData.height,
      weight_kg: formData.weight,
      waist_cm: formData.waist,
      neck_cm: formData.neck,
      hip_cm: formData.hip,
      chest_cm: formData.chest || null,
      wrist_cm: formData.wrist || null,
      arm_cm: formData.arm || null,
      thigh_cm: formData.thigh || null,
      ankle_cm: formData.ankle || null,
      skinfold_mm: formData.skinfold || null,
      blood_pressure: formData.bloodPressure || null,
      resting_heart_rate: formData.restingHeartRate || null,
      blood_glucose: formData.bloodGlucose || null,
      lipid_profile: formData.lipidProfile || null,
      body_fat_category: formData.bodyFatCategory,
      body_fat_percent: formData.bodyFatPercent,
      activity_level: formData.activityLevel,
    }, { disableToast: true });
    stepPercent();

    // 3. fitness_goals
    const [day, month, year] = (formData.targetDate || "").split("/");
    const isoTargetDate = [year, month, day].join("-");
    await api.post("/v1/fitness-goals", {
      user_id: userId,
      goal_type: formData.goal,
      target_weight_kg: formData.targetWeight,
      target_date: isoTargetDate,
      fitness_level: formData.fitnessLevel,
      activity_level_projected: formData.activityLevel,
    }, { disableToast: true });
    stepPercent();

    // 4. training_preferences
    const { data: prefRes } = await api.post("/v1/training-preferences", {
      user_id: userId,
      location: formData.location,
      training_frequency_past: formData.trainingFrequency,
      duration_minutes: formData.duration,
      time_preference: formData.timePreference,
      pushups_range: formData.pushups,
      pullups_ability: formData.pullups,
      daily_routine: formData.routine,
      injuries: (formData.injuries || []).join(", "),
      problems: (formData.problems || []).join(", "),
    }, { disableToast: true });
    stepPercent();
    const prefId = prefRes.preference.preference_id;

    // 4.1 training_activities
    for (const [name, like] of Object.entries(prefs)) {
      await api.post("/v1/training-activities", {
        preference_id: prefId,
        activity_name: name,
        is_liked: like === "Thích",
      }, { disableToast: true });
      stepPercent();
    }
    // 4.2 weekly_sessions
    for (const day of (formData.weeklySessions || [])) {
      await api.post("/v1/weekly-sessions", {
        preference_id: prefId,
        day_of_week: day,
      }, { disableToast: true });
      stepPercent();
    }
    // 4.3 other_activities
    for (const name of (formData.activities || [])) {
      await api.post("/v1/other-activities", {
        preference_id: prefId,
        activity_name: name,
      }, { disableToast: true });
      stepPercent();
    }
    // 4.4 region_focus
    for (const area of (formData.regionFocus || [])) {
      await api.post("/v1/region-focus", {
        preference_id: prefId,
        focus_area: area,
      }, { disableToast: true });
      stepPercent();
    }
    // 4.5 sports
    for (const sportName of (formData.sports || [])) {
      await api.post("/v1/sports", {
        preference_id: prefId,
        sport_name: sportName,
      }, { disableToast: true });
      stepPercent();
    }
    // 4.6 equipment
    for (const name of (formData.equipment || [])) {
      await api.post("/v1/equipment", {
        preference_id: prefId,
        equipment_name: name,
      }, { disableToast: true });
      stepPercent();
    }

    // 5. food_preferences
    const { data: foodPrefRes } = await api.post("/v1/food-preferences", {
      user_id: userId,
      diet_type: formData.diet || null,
      meal_time_duration: formData.mealTime || null,
      auto_choose_food: formData.autoChooseFood ?? false,
    }, { disableToast: true });
    stepPercent();
    const foodPrefId = foodPrefRes.foodPreference.food_pref_id;

    // 5.1 preferred_foods
    const categories = formData.foodPreferences || {};
    for (const [category, items] of Object.entries(categories)) {
      for (const item of items) {
        await api.post("/v1/preferred-foods", {
          food_pref_id: foodPrefId,
          food_category: category,
          food_item: item,
        }, { disableToast: true });
        stepPercent();
      }
    }

    // 6. current_health_metrics
    const metrics = formData.metrics || {};
    await api.post("/v1/current-health-metrics", {
      user_id: userId,
      bmi: metrics.bmi ?? null,
      bmr: metrics.bmr ?? null,
      tdee: metrics.tdee ?? null,
      body_fat_pct: metrics.body_fat_pct ?? null,
      fat_mass_kg: metrics.fat_mass ?? null,
      lean_mass_kg: metrics.lean_mass ?? null,
      waist_hip_ratio: metrics.waist_hip_ratio ?? null,
      advice: (formData.advice || []).join("; "),
      risks: (formData.risks || []).join("; "),
    }, { disableToast: true });
    stepPercent();

    // 7. lifestyle_habits
    await api.post("/v1/lifestyle-habits", {
      user_id: userId,
      sugar_habit: formData.sugarHabit || null,
      water_intake: formData.water || null,
      sleep_hours: formData.sleep || null,
    }, { disableToast: true });
    stepPercent();

    // 8. projected-metrics
    const projectedRes = await api.post("/v1/projected-metrics", {
      height: formData.height,
      target_weight: formData.targetWeight,
      age: formData.age,
      gender: formData.gender === "Nam" ? "Nam" : "Nữ",
      activity_level_projected: formData.activity_level_projected || formData.activityLevel,
      body_fat_pct_projected: formData.bodyFatPercent || null,
      waist_projected: formData.waist || null,
      hip_projected: formData.hip || null,
    }, { disableToast: true });
    stepPercent();

    const proj = projectedRes.data;
    // 9. projected-health-metrics
    await api.post("/v1/projected-health-metrics", {
      user_id: userId,
      bmi_projected: proj.bmi_projected,
      bmr_projected: proj.bmr_projected,
      tdee_projected: proj.tdee_projected,
      body_fat_pct_projected: proj.body_fat_pct_projected,
      fat_mass_kg_projected: proj.fat_mass_kg_projected,
      lean_mass_kg_projected: proj.lean_mass_kg_projected,
      improve_risk: null,
    }, { disableToast: true });
    stepPercent();

    // 10. problems
    for (const desc of (formData.problems || [])) {
      await api.post("/v1/user-problems-goals", {
        user_id: userId,
        type: "problem",
        description: desc,
      }, { disableToast: true });
      stepPercent();
    }
    // 11. extraGoals
    for (const desc of (formData.extraGoals || [])) {
      await api.post("/v1/user-problems-goals", {
        user_id: userId,
        type: "extra_goal",
        description: desc,
      }, { disableToast: true });
      stepPercent();
    }
    localStorage.removeItem("formData");

    // 12. Kết thúc 100%
    setPercent(100);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 700);

  } catch (err) {
    setLoading(false);
    // xử lý lỗi nếu muốn
    console.error(err);
  }
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

  // countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // ========= Render =========
  return (
    <>
     {loading && (
      <LoadingProgress
        percent={percent}
        message="Bạn chờ một lát nhé! Đang tạo tài khoản và lên bài tập kèm chế độ dinh dưỡng..."
      />
    )}
         <main className="Register">
      {/* STEP 1: SEND OTP */}
      {step === 1 && (
        <div className="Register_1">
          <a
            href="/Login"
            style={{
              cursor: "pointer",
              color: "#fff",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            <i className="fa-solid fa-arrow-left" />
          </a>

          <div className="Register_1_1">
            <img src={images["logo.png"]} alt="Logo" />
            <h2>Tạo tài khoản của bạn</h2>
          </div>

          <form onSubmit={handleSendOtp} className="RegisterForm">
            {/* Username */}
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

            {/* Name (pre-filled & disabled nếu có) */}
            <input
              type="text"
              name="name"
              placeholder="Tên của bạn"
              value={sendCodeForm.name}
              onChange={handleSendCodeChange}
              required
              disabled={!!savedData.fullName}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={sendCodeForm.email}
              onChange={handleSendCodeChange}
              required
            />

            {/* Birthdate */}
            <div className="Register_1_1_1">
              <div>
                <span>Ngày sinh</span>
                <p>
                  Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của
                  bạn, ngay cả khi tài khoản này dành cho doanh nghiệp, thú cưng
                  hoặc thứ gì khác.
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
                disabled={!!savedData.dob}
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

      {/* STEP 2: VERIFY OTP */}
      {step === 2 && (
        <div className="setPassWord">
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
                setVerifyCodeForm((prev) => ({ ...prev, otp: e.target.value }))
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

      {/* STEP 3: SET PASSWORD */}
      {step === 3 && (
        <div className="acceptPassWord">
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
