import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaTint, FaCloudRain, FaCoffee } from 'react-icons/fa';
import '../../styles/Step31.css';

const WATER_OPTIONS = [
  {
    value: 'lt2',
    label: 'Ít hơn 2 cốc',
    sub: 'lên đến 0,5 l / 17 oz',
    icon: <FaTint />,
  },
  {
    value: '2_6',
    label: '2-6 cốc',
    sub: '0,5-1,5 l / 17-50 oz',
    icon: (
      <span>
        <FaTint style={{ marginRight: 3 }} />
        <FaTint />
      </span>
    ),
  },
  {
    value: '7_10',
    label: '7-10 cốc',
    sub: '1,5-2,5 l / 50-85 oz',
    icon: (
      <span>
        <FaTint style={{ marginRight: 3 }} />
        <FaTint style={{ marginRight: 3 }} />
        <FaTint />
      </span>
    ),
  },
  {
    value: 'gt10',
    label: 'Hơn 10 cốc',
    sub: 'hơn 2,5 l / 85 oz',
    icon: <FaCloudRain />,
  },
];

export default function Step31Water() {
  const { formData, go, currentStep } = useOutletContext();
  // Lấy giá trị đã chọn trước đó
  const [selected, setSelected] = React.useState(formData.water ?? null);

  // Sync lại nếu formData.water thay đổi (quay lại step)
  React.useEffect(() => {
    if (formData.water !== undefined) setSelected(formData.water);
  }, [formData.water]);

  const handleChoose = (value) => {
    setSelected(value);
    go(`step${currentStep + 1}`, { ...formData, water: value });
  };

  const handleCoffeeOnly = () => {
    setSelected('coffee_only');
    go(`step${currentStep + 1}`, { ...formData, water: 'tea_coffee_only' });
  };

  return (
    <div className="step31-root">
      <h2 className="step31-title">Hằng ngày bạn uống bao nhiêu nước?</h2>
      <div className="step31-options">
        {WATER_OPTIONS.map(opt => (
          <div
            key={opt.value}
            className={`step31-option${selected === opt.value ? ' selected' : ''}`}
            onClick={() => handleChoose(opt.value)}
          >
            <div className="step31-icon">{opt.icon}</div>
            <div>
              <div className="step31-label">{opt.label}</div>
              <div className="step31-sub">{opt.sub}</div>
            </div>
            {selected === opt.value && <span className="step31-tick">✔</span>}
          </div>
        ))}
      </div>
      <div
        className={`step31-option coffee-only${selected === 'coffee_only' ? ' selected' : ''}`}
        onClick={handleCoffeeOnly}
      >
        <div className="step31-icon"><FaCoffee /></div>
        <div className="step31-label">Tôi chỉ uống cà phê hoặc trà</div>
        {selected === 'coffee_only' && <span className="step31-tick">✔</span>}
      </div>
    </div>
  );
}
