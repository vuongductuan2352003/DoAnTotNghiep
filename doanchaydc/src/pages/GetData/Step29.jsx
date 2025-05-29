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

const NONE = 'None';

export default function Step29Diet() {
  const { formData, go, currentStep } = useOutletContext();

  // Xử lý value label khi lấy lại state
  const [selected, setSelected] = React.useState(() => {
    if (!formData.diet) return '';
    return formData.diet === NONE ? NONE : formData.diet.charAt(0).toUpperCase() + formData.diet.slice(1);
  });

  React.useEffect(() => {
    if (!formData.diet) setSelected('');
    else setSelected(formData.diet === NONE ? NONE : formData.diet.charAt(0).toUpperCase() + formData.diet.slice(1));
  }, [formData.diet]);

  // Trả về label tiếng Việt từ value
  const getLabel = (value) => {
    const found = DIETS.find(d => d.value === value);
    return found ? found.label.charAt(0).toUpperCase() + found.label.slice(1) : '';
  };

  const handleChoose = (value) => {
    if (value === 'none') {
      setSelected(NONE);
      go(`step${currentStep + 1}`, { ...formData, diet: NONE });
    } else {
      const label = getLabel(value);
      setSelected(label);
      go(`step${currentStep + 1}`, { ...formData, diet: label });
    }
  };

  return (
    <div className="step29-root">
      <h2 className="step29-title">
        Bạn có tuân theo bất kỳ chế độ ăn kiêng nào không?
      </h2>
      <div className="step29-options">
        {DIETS.map((diet) => {
          const label = diet.label.charAt(0).toUpperCase() + diet.label.slice(1);
          return (
            <div
              key={diet.value}
              className={`step29-option${selected === label ? ' selected' : ''}`}
              onClick={() => handleChoose(diet.value)}
            >
              <div className="step29-icon">{diet.icon}</div>
              <div className="step29-content">
                <div className="step29-label">{diet.label}</div>
                <div className="step29-sub">{diet.sub}</div>
              </div>
              {selected === label && <span className="step29-tick">✔</span>}
            </div>
          );
        })}
      </div>
      <div
        className={`step29-option none${selected === NONE ? ' selected' : ''}`}
        onClick={() => handleChoose('none')}
      >
        <span className="step29-label">Không, tôi chưa từng</span>
        {/* Chỉ hiển thị X khi được chọn */}
        {selected === NONE && <span className="step29-none-x">✕</span>}
      </div>
    </div>
  );
}
