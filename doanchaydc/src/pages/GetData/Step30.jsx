import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaBan, FaCalendarAlt, FaIceCream } from 'react-icons/fa';
import '../../styles/Step30.css';

const SUGAR_CHOICES = [
  {
    value: 'never',
    label: 'Không thường xuyên. Tôi không hảo ngọt',
    icon: <FaBan />,
  },
  {
    value: '3-5_week',
    label: '3-5 lần mỗi tuần',
    icon: <FaCalendarAlt />,
  },
  {
    value: 'daily',
    label: 'Khá nhiều mỗi ngày',
    icon: <FaIceCream />,
  },
];

// Lấy label tiếng Việt từ key
const getLabel = (value) => {
  const found = SUGAR_CHOICES.find(c => c.value === value);
  return found ? found.label : '';
};

export default function Step30Sugar() {
  const { formData, go, currentStep } = useOutletContext();
  // Lấy selected (luôn là label tiếng Việt hoặc rỗng)
  const [selected, setSelected] = React.useState(formData.sugarHabit || '');

  // Sync lại nếu formData.sugarHabit thay đổi (khi quay lại step)
  React.useEffect(() => {
    setSelected(formData.sugarHabit || '');
  }, [formData.sugarHabit]);

  const handleChoose = (value) => {
    const label = getLabel(value);
    setSelected(label);
    go(`step${currentStep + 1}`, { ...formData, sugarHabit: label });
  };

  return (
    <div className="step30-root">
      <h2 className="step30-title">
        Bạn có thường xuyên dùng thực phẩm hoặc đồ uống có đường không?
      </h2>
      <div className="step30-options">
        {SUGAR_CHOICES.map((choice, idx) => (
          <div
            key={choice.value}
            className={`step30-option${selected === choice.label ? ' selected' : ''}`}
            style={{ animationDelay: `${idx * 0.09}s` }}
            onClick={() => handleChoose(choice.value)}
          >
            <span className="step30-icon">{choice.icon}</span>
            <span className="step30-label">{choice.label}</span>
            {selected === choice.label && <span className="step30-tick">✔</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
