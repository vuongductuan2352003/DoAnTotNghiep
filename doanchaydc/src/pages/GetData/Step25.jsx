import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaHiking, FaBiking, FaSwimmer, FaWalking, FaUserFriends, FaBookOpen, FaMusic, FaCamera, FaGamepad, FaPlane } from 'react-icons/fa';
import '../../styles/Step25.css';

// Định nghĩa 10 hoạt động thường ngày (có thể chỉnh label & icon tùy ý)
const ACTIVITIES = [
  { value: 'hiking',        label: 'Leo núi',        icon: <FaHiking /> },
  { value: 'cycling',       label: 'Đạp xe',         icon: <FaBiking /> },
  { value: 'swimming',      label: 'Bơi lội',        icon: <FaSwimmer /> },
  { value: 'walking',       label: 'Đi bộ',          icon: <FaWalking /> },
  { value: 'meeting',       label: 'Gặp gỡ bạn bè',  icon: <FaUserFriends /> },
  { value: 'reading',       label: 'Đọc sách',       icon: <FaBookOpen /> },
  { value: 'listening',     label: 'Nghe nhạc',      icon: <FaMusic /> },
  { value: 'photography',   label: 'Chụp ảnh',       icon: <FaCamera /> },
  { value: 'gaming',        label: 'Chơi game',      icon: <FaGamepad /> },
  { value: 'travel',        label: 'Du lịch',        icon: <FaPlane /> },
];

export default function Step25Activities() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = React.useState(formData.activities || []);

  // Xử lý chọn/xóa hoạt động
  const handleToggle = (value) => {
    if (selected.includes('none')) {
      setSelected([value]);
      return;
    }
    let newSelected;
    if (selected.includes(value)) {
      newSelected = selected.filter(v => v !== value);
    } else {
      newSelected = [...selected, value];
    }
    setSelected(newSelected);
  };

  // Chọn "Không có cái nào ở trên"
  const handleNone = () => {
    setSelected(['none']);
  };

  const handleContinue = () => {
  if (selected.includes('none')) {
    console.log("Sẽ lưu activities:", []);
    go(`step${currentStep + 1}`, { ...formData, activities: [] });
  } else {
    console.log("Sẽ lưu activities:", selected);
    go(`step${currentStep + 1}`, { ...formData, activities: selected });
  }
};

  return (
    <div className="step25-root">
      <h2 className="step25-title">Bạn có tham gia vào bất kỳ hoạt động nào dưới đây không?</h2>
      <div className="step25-grid">
        {ACTIVITIES.map((act) => (
          <div
            key={act.value}
            className={`step25-square${selected.includes(act.value) ? ' selected' : ''}`}
            onClick={() => handleToggle(act.value)}
          >
            <div className="step25-icon-large">{act.icon}</div>
            <div className="step25-label">{act.label}</div>
            {selected.includes(act.value) && <span className="step25-tick">✔</span>}
          </div>
        ))}
      </div>
      <div
        className={`step25-square none${selected.includes('none') ? ' selected' : ''}`}
        onClick={handleNone}
      >
        <div className="step25-label">Không có cái nào ở trên</div>
      </div>
      <button className="step25-btn" onClick={handleContinue}>
        Tiếp tục
      </button>
    </div>
  );
}
