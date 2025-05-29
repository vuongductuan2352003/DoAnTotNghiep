import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaLeaf, FaSeedling, FaEgg, FaFish } from 'react-icons/fa';
import '../../styles/Step29.css';

const DIETS = [
  {
    value: 'vegetarian',
    label: 'Ăn chay trường',
    sub: 'Không bao gồm thịt',
    icon: <FaLeaf />,
  },
  {
    value: 'vegan',
    label: 'Ăn chay',
    sub: 'Không bao gồm tất cả các sản phẩm động vật',
    icon: <FaSeedling />,
  },
  {
    value: 'keto',
    label: 'Keto',
    sub: 'Ăn ít carb, nhiều chất béo',
    icon: <FaEgg />,
  },
  {
    value: 'mediterranean',
    label: 'Địa Trung Hải',
    sub: 'Giàu thực phẩm có nguồn gốc thực vật',
    icon: <FaFish />,
  },
];

export default function Step29Diet() {
  const { formData, go, currentStep } = useOutletContext();
  // lấy giá trị đã chọn trước đó nếu có (hoặc null)
  const [selected, setSelected] = React.useState(
    formData.diet !== undefined && formData.diet !== null ? formData.diet : null
  );

  // Nếu quay lại thì vẫn highlight ô đã chọn
  React.useEffect(() => {
    if (formData.diet !== undefined && formData.diet !== null) {
      setSelected(formData.diet);
    }
  }, [formData.diet]);

  const handleChoose = (value) => {
    setSelected(value);
    if (value === 'none') {
      go(`step${currentStep + 1}`, { ...formData, diet: null });
    } else {
      go(`step${currentStep + 1}`, { ...formData, diet: value });
    }
  };

  return (
    <div className="step29-root">
      <h2 className="step29-title">
        Bạn có tuân theo bất kỳ chế độ ăn kiêng nào không?
      </h2>
      <div className="step29-options">
        {DIETS.map((diet) => (
          <div
            key={diet.value}
            className={`step29-option${selected === diet.value ? ' selected' : ''}`}
            onClick={() => handleChoose(diet.value)}
          >
            <div className="step29-icon">{diet.icon}</div>
            <div className="step29-content">
              <div className="step29-label">{diet.label}</div>
              <div className="step29-sub">{diet.sub}</div>
            </div>
            {selected === diet.value && <span className="step29-tick">✔</span>}
          </div>
        ))}
      </div>
      <div
        className={`step29-option none${selected === null ? ' selected' : ''}`}
        onClick={() => handleChoose('none')}
      >
        <span className="step29-label">Không, tôi chưa từng</span>
        <span className="step29-none-x">✕</span>
        {selected === null && <span className="step29-tick">✔</span>}
      </div>
    </div>
  );
}
