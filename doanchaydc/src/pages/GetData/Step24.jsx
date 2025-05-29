import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FaRunning, FaDumbbell, FaBiking, FaSwimmer, FaTableTennis, 
  FaFutbol, FaBasketballBall, FaBaseballBall 
} from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import '../../styles/Step24.css';

const SPORTS = [
  { value: 'boxing',        label: 'Boxing',        icon: <FaDumbbell /> },
  { value: 'vo_thuat',      label: 'Võ thuật khác', icon: <FaFutbol /> },
  { value: 'chay_bo',       label: 'Chạy bộ',       icon: <FaRunning /> },
  { value: 'xe_dap',        label: 'Đạp xe',        icon: <FaBiking /> },
  { value: 'boi_loi',       label: 'Bơi lội',       icon: <FaSwimmer /> },
  { value: 'bong_da',       label: 'Bóng đá',       icon: <FaFutbol /> },
  { value: 'bong_ro',       label: 'Bóng rổ',       icon: <FaBasketballBall /> },
  { value: 'bong_ban',      label: 'Bóng bàn',      icon: <FaTableTennis /> },
  { value: 'cau_long',      label: 'Cầu lông',      icon: <FaBaseballBall /> },
  { value: 'quan_vot',      label: 'Quần vợt',      icon: <GiTennisRacket /> },  
];

const NONE = 'None';
const NONE_LABEL = 'Không có cái nào ở trên';

export default function Step24Sports() {
  const { formData, go, currentStep } = useOutletContext();
  // Nếu chưa chọn gì, hoặc là None thì mảng là ['None']
  const [selected, setSelected] = React.useState(() => {
    const data = Array.isArray(formData.sports) ? formData.sports : [];
    if (!data.length || data[0] === NONE) return [NONE];
    // Viết hoa lại cho đồng bộ nếu user gõ thường
    return data.map(s => s.charAt(0).toUpperCase() + s.slice(1));
  });

  // Lấy label tiếng Việt từ value key
  const getLabel = (value) => {
    const found = SPORTS.find(s => s.value === value);
    if (!found) return '';
    // Đảm bảo luôn viết hoa chữ cái đầu (phòng trường hợp dữ liệu gốc không chuẩn)
    return found.label.charAt(0).toUpperCase() + found.label.slice(1);
  };

  // Chọn/xoá môn thể thao
  const handleToggle = (value) => {
    const label = getLabel(value);
    if (!label) return;
    let newSelected;
    if (selected.includes(NONE)) {
      newSelected = [label];
    } else if (selected.includes(label)) {
      newSelected = selected.filter(l => l !== label);
      if (newSelected.length === 0) newSelected = [NONE];
    } else {
      newSelected = [...selected, label];
    }
    setSelected(newSelected);
  };

  // Chọn/bỏ "Không có cái nào ở trên"
  const handleNone = () => setSelected([NONE]);

  // Gửi dữ liệu và chuyển bước
  const handleContinue = () => {
    // Nếu chọn None hoặc không chọn gì -> ['None']
    const toSave = (selected.includes(NONE) || selected.length === 0)
      ? [NONE]
      : selected.map(s => s.charAt(0).toUpperCase() + s.slice(1));
    go(`step${currentStep + 1}`, { ...formData, sports: toSave });
  };

  return (
    <div className="step24-root">
      <h2 className="step24-title">Bạn quan tâm đến môn thể thao nào?</h2>
      <div className="step24-grid">
        {SPORTS.map((sport) => {
          const label = getLabel(sport.value);
          return (
            <div
              key={sport.value}
              className={`step24-square${selected.includes(label) ? ' selected' : ''}`}
              onClick={() => handleToggle(sport.value)}
            >
              <div className="step24-icon-large">{sport.icon}</div>
              <div className="step24-label">{label}</div>
              {selected.includes(label) && <span className="step24-tick">✔</span>}
            </div>
          );
        })}
      </div>
      <div
        className={`step24-square none${selected.includes(NONE) ? ' selected' : ''}`}
        onClick={handleNone}
      >
        <div className="step24-label">{NONE_LABEL}</div>
      </div>
      <button className="step24-btn" onClick={handleContinue}>
        Tiếp tục
      </button>
    </div>
  );
}
