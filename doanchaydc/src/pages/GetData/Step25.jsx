import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaHiking, FaBiking, FaSwimmer, FaWalking, FaUserFriends,
  FaBookOpen, FaMusic, FaCamera, FaGamepad, FaPlane
} from 'react-icons/fa';
import '../../styles/Step25.css';

const ACTIVITIES = [
  { value: 'hiking',      label: 'Leo núi',        icon: <FaHiking /> },
  { value: 'cycling',     label: 'Đạp xe',         icon: <FaBiking /> },
  { value: 'swimming',    label: 'Bơi lội',        icon: <FaSwimmer /> },
  { value: 'walking',     label: 'Đi bộ',          icon: <FaWalking /> },
  { value: 'meeting',     label: 'Gặp gỡ bạn bè',  icon: <FaUserFriends /> },
  { value: 'reading',     label: 'Đọc sách',       icon: <FaBookOpen /> },
  { value: 'listening',   label: 'Nghe nhạc',      icon: <FaMusic /> },
  { value: 'photography', label: 'Chụp ảnh',       icon: <FaCamera /> },
  { value: 'gaming',      label: 'Chơi game',      icon: <FaGamepad /> },
  { value: 'travel',      label: 'Du lịch',        icon: <FaPlane /> },
];

const NONE = 'None';
const NONE_LABEL = 'Không có cái nào ở trên';

// Hàm lấy label và luôn viết hoa chữ cái đầu
const getLabel = (value) => {
  const found = ACTIVITIES.find(a => a.value === value);
  if (!found) return '';
  return found.label.charAt(0).toUpperCase() + found.label.slice(1);
};

export default function Step25Activities() {
  const { formData, go, currentStep } = useOutletContext();
  // Nếu không có hoặc là 'None', selected là ['None']
  const [selected, setSelected] = React.useState(() => {
    const arr = Array.isArray(formData.activities) ? formData.activities : [];
    if (!arr.length || arr[0] === NONE) return [NONE];
    return arr.map(l => l.charAt(0).toUpperCase() + l.slice(1));
  });

  // Xử lý chọn/xóa hoạt động
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

  // Chọn "Không có cái nào ở trên"
  const handleNone = () => setSelected([NONE]);

  const handleContinue = () => {
    const toSave = (selected.includes(NONE) || selected.length === 0)
      ? [NONE]
      : selected.map(l => l.charAt(0).toUpperCase() + l.slice(1));
    go(`step${currentStep + 1}`, { ...formData, activities: toSave });
  };

  return (
    <div className="step25-root">
      <h2 className="step25-title">Bạn có tham gia vào bất kỳ hoạt động nào dưới đây không?</h2>
      <div className="step25-grid">
        {ACTIVITIES.map((act) => {
          const label = getLabel(act.value);
          return (
            <div
              key={act.value}
              className={`step25-square${selected.includes(label) ? ' selected' : ''}`}
              onClick={() => handleToggle(act.value)}
            >
              <div className="step25-icon-large">{act.icon}</div>
              <div className="step25-label">{label}</div>
              {selected.includes(label) && <span className="step25-tick">✔</span>}
            </div>
          );
        })}
      </div>
      <div
        className={`step25-square none${selected.includes(NONE) ? ' selected' : ''}`}
        onClick={handleNone}
      >
        <div className="step25-label">{NONE_LABEL}</div>
      </div>
      <button className="step25-btn" onClick={handleContinue}>
        Tiếp tục
      </button>
    </div>
  );
}
