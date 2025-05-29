import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaRegSadCry, FaCalendarAlt, FaRunning, FaHeartbeat, FaExclamationCircle } from 'react-icons/fa';
import '../../styles/Step26.css';

const PROBLEMS = [
  { value: 'motivation', label: 'Thiếu động lực', icon: <FaRegSadCry /> },
  { value: 'plan', label: 'Không có kế hoạch rõ ràng', icon: <FaCalendarAlt /> },
  { value: 'too_hard', label: 'Việc tập luyện của tôi quá vất vả', icon: <FaRunning /> },
  { value: 'bad_trainer', label: 'Huấn luyện tệ', icon: <FaExclamationCircle /> },
  { value: 'cholesterol', label: 'Cholesterol cao', icon: <FaHeartbeat /> },
];

export default function Step26Problems() {
  const { formData, go, currentStep } = useOutletContext();
  const [selected, setSelected] = useState(formData.problems || []);
  const [showThanks, setShowThanks] = useState(false);

  // Chọn hoặc bỏ chọn một vấn đề
  const handleToggle = (value) => {
    if (value === 'none') {
      setSelected(['none']);
    } else {
      let newSelected = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected.filter((v) => v !== 'none'), value];
      setSelected(newSelected);
    }
  };

  // Nếu vừa chọn "Không, tôi chưa từng" rồi click lại mục khác thì bỏ chọn "none"
  React.useEffect(() => {
    if (selected.length > 1 && selected.includes('none')) {
      setSelected(selected.filter((v) => v !== 'none'));
    }
  }, [selected]);

  // Tiếp tục
  const handleContinue = () => {
    if (selected.length === 1 && selected[0] === 'none') {
      go(`step${currentStep + 1}`, { ...formData, problems: [] });
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
        {PROBLEMS.map((problem) => (
          <div
            key={problem.value}
            className={`step26-option-row${selected.includes(problem.value) ? ' selected' : ''}`}
            onClick={() => handleToggle(problem.value)}
          >
            <span className="step26-icon">{problem.icon}</span>
            <span className="step26-label">{problem.label}</span>
            <span className="step26-checkbox">
              <input type="checkbox" checked={selected.includes(problem.value)} readOnly />
              <span className="step26-tickbox">{selected.includes(problem.value) && <span>✔</span>}</span>
            </span>
          </div>
        ))}
        <div
          className={`step26-option-row none${selected.includes('none') ? ' selected' : ''}`}
          onClick={() => handleToggle('none')}
        >
          <span className="step26-label">Không, tôi chưa từng</span>
          <span className="step26-checkbox">
            <input type="checkbox" checked={selected.includes('none')} readOnly />
            <span className="step26-tickbox">
              {selected.includes('none') && <span>✕</span>}
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
