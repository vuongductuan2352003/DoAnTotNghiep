import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FaRegSadCry, FaCalendarAlt, FaRunning,
  FaHeartbeat, FaExclamationCircle
} from 'react-icons/fa';
import '../../styles/Step26.css';

const PROBLEMS = [
  { value: 'motivation',   label: 'Thiếu động lực',                icon: <FaRegSadCry /> },
  { value: 'plan',         label: 'Không có kế hoạch rõ ràng',     icon: <FaCalendarAlt /> },
  { value: 'too_hard',     label: 'Việc tập luyện của tôi quá vất vả', icon: <FaRunning /> },
  { value: 'bad_trainer',  label: 'Huấn luyện tệ',                 icon: <FaExclamationCircle /> },
  { value: 'cholesterol',  label: 'Cholesterol cao',               icon: <FaHeartbeat /> },
];

const NONE = 'None'; // đúng quy ước đồng bộ

// Hàm lấy label theo value
const getLabel = (value) => {
  const found = PROBLEMS.find(p => p.value === value);
  if (!found) return '';
  return found.label.charAt(0).toUpperCase() + found.label.slice(1);
};

export default function Step26Problems() {
  const { formData, go, currentStep } = useOutletContext();

  // Nếu quay lại: luôn map từ value sang label, nếu trống hoặc none thì selected là [NONE]
  const [selected, setSelected] = React.useState(() => {
    const arr = Array.isArray(formData.problems) ? formData.problems : [];
    if (!arr.length || arr[0] === NONE) return [NONE];
    return arr.map(l => l.charAt(0).toUpperCase() + l.slice(1));
  });
  const [showThanks, setShowThanks] = React.useState(false);

  // Toggle lựa chọn
  const handleToggle = (value) => {
    if (value === NONE) {
      setSelected([NONE]);
      return;
    }
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

  // Tiếp tục
  const handleContinue = () => {
    if (selected.includes(NONE)) {
      go(`step${currentStep + 1}`, { ...formData, problems: [NONE] });
    } else if (selected.length) {
      setShowThanks(true);
    }
  };

  // Đã hiểu
  const handleThanksClose = () => {
    setShowThanks(false);
    go(`step${currentStep + 1}`, { ...formData, problems: selected });
  };

  return (
    <div className="step26-root">
      <h2 className="step26-title">
        Trong những vấn đề này, bạn có gặp phải vấn đề nào khi tập thể dục trước đây không?
      </h2>
      <div className="step26-options-list">
        {PROBLEMS.map((problem) => {
          const label = problem.label.charAt(0).toUpperCase() + problem.label.slice(1);
          return (
            <div
              key={problem.value}
              className={`step26-option-row${selected.includes(label) ? ' selected' : ''}`}
              onClick={() => handleToggle(problem.value)}
            >
              <span className="step26-icon">{problem.icon}</span>
              <span className="step26-label">{label}</span>
              <span className="step26-checkbox">
                <input type="checkbox" checked={selected.includes(label)} readOnly />
                <span className="step26-tickbox">{selected.includes(label) && <span>✔</span>}</span>
              </span>
            </div>
          );
        })}
        <div
          className={`step26-option-row none${selected.includes(NONE) ? ' selected' : ''}`}
          onClick={() => handleToggle(NONE)}
        >
          <span className="step26-label">Không, tôi chưa từng</span>
          <span className="step26-checkbox">
            <input type="checkbox" checked={selected.includes(NONE)} readOnly />
            <span className="step26-tickbox">
              {selected.includes(NONE) && <span>✕</span>}
            </span>
          </span>
        </div>
      </div>
      <button
        className="step26-btn"
        onClick={handleContinue}
        disabled={!selected.length}
      >
        Tiếp tục
      </button>

      {showThanks && (
        <div className="step26-popup">
          <div className="step26-popup-inner">
            <div className="step26-popup-title">💡 Cảm ơn bạn đã chia sẻ!</div>
            <div className="step26-popup-desc">
              Chúng tôi rút ra rằng rất nhiều người gặp phải những trở ngại tương tự.
              Ứng dụng sẽ giúp bạn lên kế hoạch rõ ràng và thực hiện dễ dàng hơn.
              Chúng tôi cũng sẽ cổ vũ, động viên bạn trong suốt quá trình này.
            </div>
            <button className="step26-btn-confirm" onClick={handleThanksClose}>
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
