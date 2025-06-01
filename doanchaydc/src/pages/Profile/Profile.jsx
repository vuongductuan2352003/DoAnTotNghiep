// src/pages/ProfileMain.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../utils/api";
import images from "../../assets/loadImg";
import "../../styles/Profile.css";

const DEFAULT_AVATAR = "default_avatar.png";

export default function ProfileMain() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setProfile(null);
        setLoading(false);
        return;
      }
      try {
        // Bước 1: call /user/profile để lấy user_id
        const res = await api.get("/user/profile");
        const userId = res.data.user_id;
        localStorage.setItem("user_id", userId);

        // Bước 2: call lấy full info
        const fullRes = await api.get(`/user/${userId}/full-info`);
        setProfile(fullRes.data);
      } catch (err) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="pm-loading">Đang tải hồ sơ...</div>;
  }
  if (!profile) {
    return <div className="pm-error">Không thể tải hồ sơ người dùng!</div>;
  }

  // ----- Lấy dữ liệu phụ -----
  const body = profile.body_measurements?.[0] || {};
  const current = profile.current_health_metrics?.[0] || {};

  // Các số đo khác
  const rawMeasurements = [
    { key: "height_cm", label: "Height (cm)", value: body.height_cm },
    { key: "weight_kg", label: "Weight (kg)", value: body.weight_kg },
    { key: "waist_cm", label: "Waist (cm)", value: body.waist_cm },
    { key: "neck_cm", label: "Neck (cm)", value: body.neck_cm },
    { key: "hip_cm", label: "Hip (cm)", value: body.hip_cm },
    { key: "chest_cm", label: "Chest (cm)", value: body.chest_cm },
    { key: "wrist_cm", label: "Wrist (cm)", value: body.wrist_cm },
    { key: "arm_cm", label: "Arm (cm)", value: body.arm_cm },
    { key: "thigh_cm", label: "Thigh (cm)", value: body.thigh_cm },
    { key: "ankle_cm", label: "Ankle (cm)", value: body.ankle_cm },
    { key: "skinfold_mm", label: "Skinfold (mm)", value: body.skinfold_mm },
    { key: "blood_pressure", label: "Blood Pressure", value: body.blood_pressure },
    {
      key: "resting_heart_rate",
      label: "Resting Heart Rate (bpm)",
      value: body.resting_heart_rate,
    },
    {
      key: "blood_glucose",
      label: "Blood Glucose",
      value: body.blood_glucose,
    },
    { key: "lipid_profile", label: "Lipid Profile", value: body.lipid_profile },
    {
      key: "body_fat_category",
      label: "Body Fat Category",
      value: body.body_fat_category,
    },
    {
      key: "body_fat_percent",
      label: "Body Fat Percent (%)",
      value: body.body_fat_percent,
    },
    {
      key: "activity_level",
      label: "Activity Level",
      value: body.activity_level,
    },
  ];
  const otherMeasurements = rawMeasurements.filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      item.value !== "" &&
      item.value !== "0"
  );

  // Các chỉ số tính toán
  const computedMetrics = [
    { key: "bmi", label: "BMI", value: current.bmi },
    { key: "bmr", label: "BMR", value: current.bmr },
    { key: "tdee", label: "TDEE", value: current.tdee },
    {
      key: "body_fat_pct",
      label: "Body Fat % (calc)",
      value: current.body_fat_pct,
    },
    {
      key: "fat_mass_kg",
      label: "Fat Mass (kg)",
      value: current.fat_mass_kg,
    },
    {
      key: "lean_mass_kg",
      label: "Lean Mass (kg)",
      value: current.lean_mass_kg,
    },
    {
      key: "waist_hip_ratio",
      label: "Waist-Hip Ratio",
      value: current.waist_hip_ratio,
    },
  ];
  const presentMetrics = computedMetrics.filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      item.value !== "" &&
      item.value !== "0"
  );

  // Format ngày tham gia
  let joinDate = "...";
  if (profile.created_at) {
    const d = new Date(profile.created_at);
    joinDate = d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  const isVerified = !!profile.email_verified_at;

  // ----- Gom nhóm "Thực phẩm ưa thích" theo danh mục -----
  const preferredFoods = profile.food_preferences?.[0]?.preferred_foods || [];
  // Tạo object: { category1: [item1, item2], category2: [...] }
  const foodsByCategory = preferredFoods.reduce((acc, cur) => {
    const cat = cur.food_category || "Khác";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cur.food_item);
    return acc;
  }, {});

  return (
    <div className="profile-main">
      {/* === 1. HEADER NHỎ => Tên, Đã xác nhận, Chỉnh sửa hồ sơ === */}
      <div className="pm-header-row">
        <div className="pm-header-left">
          <h2 className="pm-header-name">{profile.name}</h2>
          {isVerified && <span className="pm-verified-text">Được xác nhận</span>}
        </div>
        <div className="pm-header-right">
          <button className="pm-edit-btn">Chỉnh sửa hồ sơ</button>
        </div>
      </div>

      {/* === 2. PHẦN AVATAR + COVER + THÔNG TIN CƠ BẢN === */}
      <div className="pm-top">
        <motion.div
          className="pm-cover-placeholder"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div
          className="pm-avatar-wrapper"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <img
            className="pm-avatar"
            src={profile.avatar_path || images[DEFAULT_AVATAR]}
            alt="avatar"
          />
        </motion.div>
        <div className="pm-basic-info">
          <div className="pm-handle">@{profile.username}</div>
          <div className="pm-join-date">
            <span>📅 Tham gia {joinDate}</span>
          </div>
          <div className="pm-stats-row">
            <span>
              <b>{profile.posts_count}</b> bài đăng
            </span>
            <span>
              <b>{profile.followers_count}</b> Người theo dõi
            </span>
            <span>
              <b>{profile.following_count}</b> Đang theo dõi
            </span>
          </div>
        </div>
      </div>

      {/* === 3. PHẦN TABS (Giữ lại Bài đăng, Các phản hồi, Phương tiện, Lượt tương tác) === */}
      <div className="pm-tabs">
        <span className="pm-tab pm-tab--active">Bài đăng</span>
        <span className="pm-tab">Các phản hồi</span>
        <span className="pm-tab">Phương tiện</span>
        <span className="pm-tab">Lượt tương tác</span>
      </div>

      {/* === 4. DIVIDER TẠO NGĂN CÁCH === */}
      <div className="pm-divider" />

      {/* === 5. TIÊU ĐỀ PHẦN "DỮ LIỆU CƠ THỂ & CHỈ SỐ SỨC KHỎE" === */}
      <div className="pm-body-section-header">
        <h2 className="pm-body-title">Thông tin cơ thể & Chỉ số sức khỏe</h2>
        <p className="pm-body-subtitle">
          Dưới đây là các số đo, thống kê và chỉ số được tính toán dựa trên thông tin từ bạn.
        </p>
      </div>

      {/* === 6. QUÁ TRÌNH BIẾN ĐỔI CƠ THỂ === */}
      <motion.section
        className="pm-section pm-transform"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="pm-section-title-sm">Quá trình biến đổi cơ thể</h3>
        <div className="pm-transform-images">
          <div className="pm-before">
            <img
              src={images["male_before.png"]}
              alt="before"
              className="pm-transform-img"
            />
            <div className="pm-label-top">Bây giờ</div>
          </div>
          <div className="pm-arrow">
            <img
              src={images["arrow_double.svg"]}
              alt="arrow"
              className="pm-arrow-img"
            />
          </div>
          <div className="pm-after">
            <img
              src={images["male_after.png"]}
              alt="after"
              className="pm-transform-img"
            />
            <div className="pm-label-top">6 tháng</div>
          </div>
        </div>

        <div className="pm-transform-table">
          <div className="pm-col">
            <div className="pm-col-title">Bây giờ</div>
            <div className="pm-col-item">
              <span className="pm-item-label">Mỡ cơ thể</span>
              <span className="pm-item-value pm-item-value--red">
                {body.body_fat_percent || "..."}%
              </span>
            </div>
            <div className="pm-col-item">
              <span className="pm-item-label">Cơ bắp cơ thể</span>
              <div className="pm-muscle-bars">
                <span className="pm-bar-active"></span>
                <span className="pm-bar-inactive"></span>
                <span className="pm-bar-inactive"></span>
                <span className="pm-bar-inactive"></span>
                <span className="pm-bar-inactive"></span>
              </div>
            </div>
          </div>
          <div className="pm-col">
            <div className="pm-col-title">6 tháng</div>
            <div className="pm-col-item">
              <span className="pm-item-label">Mỡ cơ thể</span>
              <span className="pm-item-value pm-item-value--red">
                {current.body_fat_pct || "..."}%
              </span>
            </div>
            <div className="pm-col-item">
              <span className="pm-item-label">Cơ bắp cơ thể</span>
              <div className="pm-muscle-bars">
                <span className="pm-bar-active"></span>
                <span className="pm-bar-active"></span>
                <span className="pm-bar-active"></span>
                <span className="pm-bar-active"></span>
                <span className="pm-bar-inactive"></span>
              </div>
            </div>
          </div>
        </div>
        <p className="pm-transform-note">
          *Hình ảnh minh họa, kết quả thực tế có thể khác nhau.
        </p>
      </motion.section>

      {/* === 7. TÓM TẮT CÁ NHÂN (BMI, Calo, Nước) === */}
      <motion.section
        className="pm-section pm-summary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="pm-section-title-sm">Tóm tắt cá nhân</h3>
        <div className="pm-bmi-card">
          <div className="pm-bmi-header">
            <span>Chỉ số BMI hiện tại</span>
            <div className="pm-info-icon">ℹ︎</div>
          </div>
          <div className="pm-bmi-value">
            {current.bmi || "..."} BMI
          </div>
          <div className="pm-bmi-scale">
            <div className="pm-scale-bar"></div>
            <div
              className="pm-scale-marker"
              style={{ left: current.bmi ? `${(current.bmi / 40) * 100}%` : "0%" }}
            ></div>
            <div className="pm-scale-labels">
              <span>Thiếu cân</span>
              <span>Béo phì</span>
            </div>
          </div>
          <div className="pm-bmi-status">
            {current.bmi
              ? parseFloat(current.bmi) < 18.5
                ? "Thiếu cân"
                : parseFloat(current.bmi) < 25
                ? "Bình thường"
                : "Thừa cân"
              : "..."}
          </div>
          <div className="pm-bmi-desc">
            Chỉ số khối cơ thể (BMI) dựa trên chiều cao và cân nặng của bạn.
          </div>
        </div>

        <div className="pm-calorie-water">
          {/* Calo */}
          <div className="pm-card-small pm-calorie-card">
            <div className="pm-small-header">
              <div className="pm-small-icon">🍽️</div>
              <span>Lượng calo hàng ngày</span>
              <span className="pm-suggested-badge">được đề xuất</span>
            </div>
            <div className="pm-small-value">
              {current.tdee ? `${current.tdee} kcal` : "..."}
            </div>
            <div className="pm-slider-bg">
              <div
                className="pm-slider-thumb"
                style={{
                  left: current.tdee
                    ? `${(current.tdee / 5000) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>
            <div className="pm-slider-labels">
              <span>1000 kcal</span>
              <span>5000 kcal</span>
            </div>
          </div>

          {/* Nước */}
          <div className="pm-card-small pm-water-card">
            <div className="pm-small-header">
              <div className="pm-small-icon">💧</div>
              <span>Lượng nước uống hàng ngày</span>
              <span className="pm-suggested-badge">được đề xuất</span>
            </div>
            <div className="pm-small-value">2.4 l</div>
            <div className="pm-water-icons">
              <div className="pm-cup pm-cup--full"></div>
              <div className="pm-cup pm-cup--full"></div>
              <div className="pm-cup pm-cup--full"></div>
              <div className="pm-cup pm-cup--full"></div>
              <div className="pm-cup pm-cup--full"></div>
              <div className="pm-cup pm-cup--empty"></div>
              <div className="pm-cup pm-cup--empty"></div>
              <div className="pm-cup pm-cup--empty"></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* === 8. KẾ HOẠCH CÁ NHÂN === */}
      <motion.section
        className="pm-section pm-plan"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="pm-section-title-sm">
          Kế hoạch cá nhân cho {profile.name}
        </h3>
        <div className="pm-plan-grid">
          <div className="pm-plan-item">
            <img
              src={images["icon_clock.svg"]}
              alt="clock"
              className="pm-plan-icon"
            />
            <div className="pm-plan-info">
              <span className="pm-plan-label">Thời gian Tập luyện</span>
              <span className="pm-plan-value">
                {profile.training_preferences?.[0]?.duration_minutes || "20–30 phút"}
              </span>
            </div>
          </div>
          <div className="pm-plan-item">
            <img
              src={images["icon_strength.svg"]}
              alt="strength"
              className="pm-plan-icon"
            />
            <div className="pm-plan-info">
              <span className="pm-plan-label">Cấp độ tập thể hình</span>
              <span className="pm-plan-value">
                {profile.fitness_goals?.[0]?.fitness_level || "Sơ cấp"}
              </span>
            </div>
          </div>
          <div className="pm-plan-item">
            <img
              src={images["icon_home.svg"]}
              alt="home"
              className="pm-plan-icon"
            />
            <div className="pm-plan-info">
              <span className="pm-plan-label">Nơi tập luyện</span>
              <span className="pm-plan-value">
                {profile.training_preferences?.[0]?.location || "Tập luyện tại nhà"}
              </span>
            </div>
          </div>
          <div className="pm-plan-item">
            <img
              src={images["icon_calendar.svg"]}
              alt="calendar"
              className="pm-plan-icon"
            />
            <div className="pm-plan-info">
              <span className="pm-plan-label">Cường độ Tập Luyện</span>
              <span className="pm-plan-value">
                {profile.training_preferences?.[0]?.training_frequency_past ||
                  "3 lần một tuần"}
              </span>
            </div>
          </div>
        </div>
        <div className="pm-plan-goals">
          <p className="pm-goals-title">Mục tiêu phụ của chương trình:</p>
          <ul className="pm-extra-goals-list">
            {profile.user_problems_goals
              ?.filter((item) => item.type === "extra_goal")
              .map((goal) => (
                <li key={goal.id}>✔️ {goal.description}</li>
              ))}
          </ul>
        </div>
      </motion.section>

      {/* === 9. CÁC SỐ ĐO KHÁC === */}
      {otherMeasurements.length > 0 && (
        <motion.section
          className="pm-section pm-all-measurements"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Các số đo khác</h3>
          <div className="pm-measurement-grid">
            {otherMeasurements.map((item) => (
              <div className="pm-measurement-box" key={item.key}>
                <span className="pm-measure-label">{item.label}</span>
                <span className="pm-measure-value">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* === 10. CÁC CHỈ SỐ TÍNH TOÁN === */}
      {presentMetrics.length > 0 && (
        <motion.section
          className="pm-section pm-calculated-metrics"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Các chỉ số tính toán</h3>
          <div className="pm-measurement-grid">
            {presentMetrics.map((item) => (
              <div className="pm-measurement-box" key={item.key}>
                <span className="pm-measure-label">{item.label}</span>
                <span className="pm-measure-value">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* === 11. THÓI QUEN SINH HOẠT === */}
      {profile.lifestyle_habits?.[0] && (
        <motion.section
          className="pm-section pm-habits"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Thói quen sinh hoạt</h3>
          <div className="pm-habits-list">
            <div>
              <strong>Thói quen đường:</strong> {profile.lifestyle_habits[0].sugar_habit}
            </div>
            <div>
              <strong>Uống nước:</strong> {profile.lifestyle_habits[0].water_intake}
            </div>
            <div>
              <strong>Giờ ngủ:</strong> {profile.lifestyle_habits[0].sleep_hours}
            </div>
          </div>
        </motion.section>
      )}

      {/* === 12. SỞ THÍCH & HOẠT ĐỘNG === */}
      {profile.training_preferences?.[0]?.training_activities && (
        <motion.section
          className="pm-section pm-activities"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Sở thích hoạt động</h3>
          <ul className="pm-activity-list">
            {profile.training_preferences[0].training_activities.map((act) => (
              <li key={act.activity_detail_id}>{act.activity_name}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* === 13. LỊCH TẬP LUYỆN TRONG TUẦN === */}
      {profile.training_preferences?.[0]?.weekly_sessions && (
        <motion.section
          className="pm-section pm-schedule"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Lịch tập luyện trong tuần</h3>
          <ul className="pm-schedule-list">
            {profile.training_preferences[0].weekly_sessions.map((sess) => (
              <li key={sess.session_id}>{sess.day_of_week}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* === 14. VÙNG TẬP TRUNG === */}
      {profile.training_preferences?.[0]?.region_focus && (
        <motion.section
          className="pm-section pm-region-focus"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Vùng tập trung</h3>
          <ul className="pm-region-list">
            {profile.training_preferences[0].region_focus.map((region) => (
              <li key={region.region_id}>{region.focus_area}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* === 15. THỰC ĐƠN YÊU THÍCH === */}
      {profile.food_preferences?.[0] && (
        <motion.section
          className="pm-section pm-food-pref"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Thực đơn yêu thích</h3>
          <div className="pm-food-details">
            <div>
              <strong>Kiểu ăn:</strong> {profile.food_preferences[0].diet_type}
            </div>
            <div>
              <strong>Thời gian ăn mỗi bữa:</strong> {profile.food_preferences[0].meal_time_duration}
            </div>
            <div className="pm-food-list-group">
              <strong>Thực phẩm ưa thích:</strong>
              {Object.entries(foodsByCategory).map(([category, items]) => (
                <div key={category} className="pm-food-category-block">
                  <span className="pm-food-category-label">{category}:</span>{" "}
                  <span className="pm-food-category-items">{items.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* === 16. VẤN ĐỀ & MỤC TIÊU === */}
      {(profile.user_problems_goals?.length || 0) > 0 && (
        <motion.section
          className="pm-section pm-problems-goals"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="pm-section-title-sm">Vấn đề & Mục tiêu</h3>
          <div className="pm-problem-group">
            <strong>Những vấn đề bạn gặp:</strong>
            <ul className="pm-problem-list">
              {profile.user_problems_goals
                .filter((item) => item.type === "problem")
                .map((prob) => (
                  <li key={prob.id}>{prob.description}</li>
                ))}
            </ul>
          </div>
          <div className="pm-extra-goals-group">
            <strong>Mục tiêu của bạn:</strong>
            <ul className="pm-extra-goals-list">
              {profile.user_problems_goals
                .filter((item) => item.type === "extra_goal")
                .map((goal) => (
                  <li key={goal.id}>✔️ {goal.description}</li>
                ))}
            </ul>
          </div>
        </motion.section>
      )}
    </div>
  );
}
