// src/constants/options.js

// --- Step 1: Giới tính ---
export const genderOptions = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' }
];
export const genderMap = genderOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

// --- Step 2: Đơn vị đo ---
export const unitOptions = [
  { value: 'cm', label: 'cm / kg' },
  { value: 'ftin', label: 'ft, in' }
];
export const unitMap = unitOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

// --- Step 3: Mỡ cơ thể ---
export const bodyFatModeOptions = [
  { value: 'slider', label: 'Chọn %' },
  { value: 'manual', label: 'Nhập số đo' }
];
export const bodyFatModeMap = bodyFatModeOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

export const bodyFatCategories = [
  { value: '5-9%', label: '5-9%' },
  { value: '10-14%', label: '10-14%' },
  { value: '15-19%', label: '15-19%' },
  { value: '20-24%', label: '20-24%' },
  { value: '25-29%', label: '25-29%' },
  { value: '30-34%', label: '30-34%' },
  { value: '35-39%', label: '35-39%' },
  { value: '>40%',  label: '>40%'  }
];
export const bodyFatCategoryMap = bodyFatCategories.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

// --- Step 4: Mức độ vận động ---
export const activityLevelOptions = [
  { value: 1, label: 'Ít vận động', description: 'Người ít hoặc không tham gia hoạt động thể chất.' },
  { value: 2, label: 'Vận động nhẹ', description: 'Vận động thể chất, tập thể dục 1-3 ngày/tuần.' },
  { value: 3, label: 'Vận động vừa phải', description: 'Vận động thể chất, tập thể dục 3-5 ngày/tuần.' },
  { value: 4, label: 'Vận động nhiều', description: 'Vận động thể chất, tập thể dục 6-7 ngày/tuần.' },
  { value: 5, label: 'Vận động rất nhiều', description: 'Vận động, tập thể dục hơn 90 phút mỗi ngày hoặc làm công việc nặng.' },
];
export const activityLevelMap = activityLevelOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

// --- Step 5: Các chỉ số vòng đo, sức khỏe ---
export const bodyMeasurementFields = [
  { key: 'chest',            label: 'Vòng ngực (cm)' },
  { key: 'wrist',            label: 'Vòng cổ tay (cm)' },
  { key: 'arm',              label: 'Vòng bắp tay (cm)' },
  { key: 'thigh',            label: 'Vòng đùi (cm)' },
  { key: 'ankle',            label: 'Vòng cổ chân (cm)' },
  { key: 'skinfold',         label: 'Độ dày nếp gấp da (mm)' },
  { key: 'bloodPressure',    label: 'Huyết áp (mmHg)' },
  { key: 'restingHeartRate', label: 'Nhịp tim nghỉ ngơi (bpm)' },
  { key: 'bloodGlucose',     label: 'Đường huyết (mmol/L)' },
  { key: 'lipidProfile',     label: 'Lipid Profile' },
];
export const bodyMeasurementFieldMap = bodyMeasurementFields.reduce((map, obj) => {
  map[obj.key] = obj.label;
  return map;
}, {});

// --- Step 6 & 7: Trạng thái BMI ---
export const bmiStatusOptions = [
  { value: 'under3',    label: 'Gầy độ 3' },
  { value: 'under2',    label: 'Gầy độ 2' },
  { value: 'under1',    label: 'Gầy độ 1' },
  { value: 'normal',    label: 'Bình thường' },
  { value: 'over0',     label: 'Thừa cân' },
  { value: 'obese1',    label: 'Béo phì độ 1' },
  { value: 'obese2',    label: 'Béo phì độ 2' },
  { value: 'obese3',    label: 'Béo phì độ 3' },
];
export const bmiStatusLabelMap = bmiStatusOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

// --- Step 6: Label các chỉ số sức khỏe ---
export const healthMetricsLabels = {
  bmi: 'BMI',
  bmr: 'BMR (Tỷ lệ trao đổi chất cơ bản)',
  body_fat_pct: '% Mỡ',
  tdee: 'TDEE (Tổng năng lượng tiêu thụ/ngày)',
  fat_mass: 'Khối mỡ',
  lean_mass: 'Khối cơ tổng',
  waist_hip_ratio: 'Tỷ lệ eo/hông'
};

// --- Step 7: Mục tiêu cá nhân ---
export const goalOptions = [
  { value: 'lose_weight',   label: 'Giảm Cân' },
  { value: 'reduce_fat',    label: 'Giảm Mỡ' },
  { value: 'maintain',      label: 'Duy Trì Cân Nặng' },
  { value: 'gain_muscle',   label: 'Tăng Cơ Bắp' },
  { value: 'gain_weight',   label: 'Tăng Cân' },
];
export const goalMap = goalOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});
export const goalDescriptions = {
  lose_weight: "Bạn đang giảm cân. Hãy kiên trì thực hiện theo kế hoạch ăn uống và luyện tập để đạt được mục tiêu.",
  reduce_fat: "Bạn đang giảm mỡ. Kết hợp tập luyện cardio và kiểm soát chế độ ăn sẽ giúp bạn giảm mỡ hiệu quả.",
  maintain: "Bạn đang duy trì cân nặng hiện tại. Tiếp tục lối sống và luyện tập để giữ vững vóc dáng này!",
  gain_muscle: "Bạn đang tăng cơ bắp. Hãy tập trung vào luyện tập và dinh dưỡng để cải thiện các chỉ số cơ bắp!",
  gain_weight: "Bạn đang tăng cân. Đừng quên theo dõi lượng calo nạp vào mỗi ngày để tăng cân an toàn."
};

// --- Step 9: Mức độ tập luyện (fitness level) ---
export const fitnessLevelOptions = [
  { value: 'beginner',     label: 'Sơ cấp',      desc: 'Chưa thử hoặc mới bắt đầu tập tạ.' },
  { value: 'intermediate', label: 'Trung cấp',   desc: 'Đã thử và thực hành các bài tập phổ biến.' },
  { value: 'advanced',     label: 'Cao cấp',     desc: 'Đã rèn luyện sức mạnh trong nhiều năm.' }
];
export const fitnessLevelMap = fitnessLevelOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});
export const fitnessLevelDescMap = fitnessLevelOptions.reduce((map, obj) => {
  map[obj.value] = obj.desc;
  return map;
}, {});

// --- Step 10: Sở thích bài tập ---
export const exerciseOptions = [
  { value: 'cardio',   label: 'Cardio' },
  { value: 'yoga',     label: 'Yoga / Giãn cơ' },
  { value: 'weights',  label: 'Nâng tạ' },
  { value: 'pullup',   label: 'Kéo xà' },
  { value: 'squat',    label: 'Squat với tạ' },
  { value: 'pushup',   label: 'Chống đẩy' }
];
export const exerciseMap = exerciseOptions.reduce((map, obj) => {
  map[obj.value] = obj.label;
  return map;
}, {});

// Trạng thái lựa chọn sở thích bài tập
export const preferenceValueOptions = [
  { value: 1,   label: 'Thích' },
  { value: 0,   label: 'Trung lập' },
  { value: -1,  label: 'Không thích' }
];
export const preferenceValueMap = {
  1: 'Thích',
  0: 'Trung lập',
  [-1]: 'Không thích'
};
