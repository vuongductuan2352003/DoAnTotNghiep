import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FaRunning, FaDumbbell, FaBiking, FaSwimmer, FaTableTennis, 
  FaFutbol, FaBasketballBall, FaBaseballBall 
} from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi'; // thêm icon cho Tennis
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
   { value: 'cau_long',      label: 'Cầu lông',      icon: <FaBaseballBall /> },      // dùng bóng chày làm icon cầu lông, có thể thay bằng icon khác nếu muốn
  { value: 'quan_vot',      label: 'Quần vợt',      icon: <GiTennisRacket /> },  
];

export default function Step24Sports() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = React.useState(formData.sports || []);

  // Chọn/xoá môn thể thao
  const handleToggle = (value) => {
    let newSelected;
    // Nếu đang ở chế độ none => reset và chỉ chọn môn vừa click
    if (selected.includes('none')) {
      newSelected = [value];
    } else if (selected.includes(value)) {
      newSelected = selected.filter(v => v !== value);
    } else {
      newSelected = [...selected, value];
    }
    setSelected(newSelected);
  };

  // Chọn/bỏ "Không có cái nào ở trên"
  const handleNone = () => {
    setSelected(['none']);
  };

  // Gửi dữ liệu và chuyển bước
  const handleContinue = () => {
    if (selected.includes('none')) {
      go(`step${currentStep + 1}`, { ...formData, sports: [] });
    } else {
      go(`step${currentStep + 1}`, { ...formData, sports: selected });
    }
  };

  return (
    <div className="step24-root">
      <h2 className="step24-title">Bạn quan tâm đến môn thể thao nào?</h2>
      <div className="step24-grid">
        {SPORTS.map((sport) => (
          <div
            key={sport.value}
            className={`step24-square${selected.includes(sport.value) ? ' selected' : ''}`}
            onClick={() => handleToggle(sport.value)}
          >
            <div className="step24-icon-large">{sport.icon}</div>
            <div className="step24-label">{sport.label}</div>
            {selected.includes(sport.value) && <span className="step24-tick">✔</span>}
          </div>
        ))}
      </div>
      <div
        className={`step24-square none${selected.includes('none') ? ' selected' : ''}`}
        onClick={handleNone}
      >
        <div className="step24-label">Không có cái nào ở trên</div>
      </div>
      <button className="step24-btn" onClick={handleContinue}>
        Tiếp tục
      </button>
    </div>
  );
}
