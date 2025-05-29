import React, { useState, useEffect } from 'react';
import '../../styles/Step35.css';

const FOOD_ICONS = {
  // Rau
  'Bông cải xanh': '🥦', 'Súp lơ': '🥦', 'Hành': '🧅', 'Ớt chuông': '🫑',
  'Cà tím': '🍆', 'Bắp cải': '🥬', 'Măng tây': '🥬', 'Rau chân vịt': '🥗',
  'Quả dưa chuột': '🥒', 'Cà chua': '🍅',
  // Ngũ cốc
  'Gạo': '🍚', 'Diêm mạch': '🌾', 'Cơm couscous': '🍚', 'Kiều mạch': '🌾',
  'Hạt kê': '🌰', 'Hạt dền': '🌰', 'Bột mì Semolina': '🍞', 'Bột ngô': '🌽',
  'Lúa mì Bulgur': '🌾',
  // Nguyên liệu
  'Bơ': '🧈', 'Đậu': '🌱', 'Trứng': '🥚', 'Nấm': '🍄', 'Phô mai Cottage': '🧀',
  'Sữa': '🥛', 'Đậu phụ': '🟫', 'Sốt hummus': '🥣', 'Sữa thực vật': '🥛',
  'Bột protein': '💪', 'Bột protein thuần chay': '🌿',
  // Thịt & Cá
  'Gà tây': '🦃', 'Thịt bò': '🥩', 'Gà': '🍗', 'Hải sản': '🦐', 'Thịt lợn': '🥓', 'Cá': '🐟',
  // Trái cây & Quả mọng
  'Cam quýt': '🍊', 'Táo': '🍏', 'Lê': '🍐', 'Kiwi': '🥝', 'Chuối': '🍌',
  'Quả hồng': '🟠', 'Đào': '🍑', 'Quả mọng': '🫐', 'Nho': '🍇', 'Lựu': '🍎',
  'Trái cây nhiệt đới (dứa, xoài, đu đủ, thanh long)': '🥭'
};

const GROUPS = [
  {
    title: 'Rau',
    items: ['Bông cải xanh', 'Súp lơ', 'Hành', 'Ớt chuông', 'Cà tím', 'Bắp cải', 'Măng tây', 'Rau chân vịt', 'Quả dưa chuột', 'Cà chua']
  },
  {
    title: 'Ngũ cốc',
    items: ['Gạo', 'Diêm mạch', 'Cơm couscous', 'Kiều mạch', 'Hạt kê', 'Hạt dền', 'Bột mì Semolina', 'Bột ngô', 'Lúa mì Bulgur']
  },
  {
    title: 'Nguyên liệu',
    items: ['Bơ', 'Đậu', 'Trứng', 'Nấm', 'Phô mai Cottage', 'Sữa', 'Đậu phụ', 'Sốt hummus', 'Sữa thực vật', 'Bột protein', 'Bột protein thuần chay']
  },
  {
    title: 'Thịt & Cá',
    items: ['Gà tây', 'Thịt bò', 'Gà', 'Hải sản', 'Thịt lợn', 'Cá']
  },
  {
    title: 'Trái cây & Quả mọng',
    items: ['Cam quýt', 'Táo', 'Lê', 'Kiwi', 'Chuối', 'Quả hồng', 'Đào', 'Quả mọng', 'Nho', 'Lựu', 'Trái cây nhiệt đới (dứa, xoài, đu đủ, thanh long)']
  }
];

const STORAGE_KEY = 'foodPreferences';
const AUTO_KEY = 'autoChooseFood';

export default function Step35Preference({ formData, go, currentStep }) {
  const [selected, setSelected] = useState(() => {
    return formData?.foodPreferences ||
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  });
  const [auto, setAuto] = useState(() => {
    return formData?.autoChooseFood === true ||
      localStorage.getItem(AUTO_KEY) === 'true';
  });

  useEffect(() => {
    // Nếu có dữ liệu formData => sync lại local
    if (formData?.foodPreferences) {
      setSelected(formData.foodPreferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData.foodPreferences));
    }
    if (formData?.autoChooseFood !== undefined) {
      setAuto(formData.autoChooseFood);
      localStorage.setItem(AUTO_KEY, formData.autoChooseFood ? 'true' : 'false');
    }
    // eslint-disable-next-line
  }, [formData]);

  // Nếu bật auto -> chọn hết
 useEffect(() => {
  if (auto) {
    // Bật auto: chọn tất cả
    const all = {};
    GROUPS.forEach(g => {
      all[g.title] = g.items.slice();
    });
    setSelected(all);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    localStorage.setItem(AUTO_KEY, 'true');
  } else {
    // Tắt auto: bỏ chọn hết
    setSelected({});
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    localStorage.setItem(AUTO_KEY, 'false');
  }
}, [auto]);
  const toggleItem = (group, item) => {
    if (auto) return; // Không cho chọn khi auto bật
    setSelected(prev => {
      const groupItems = prev[group] || [];
      const exist = groupItems.includes(item);
      const updated = exist
        ? groupItems.filter(i => i !== item)
        : [...groupItems, item];
      const result = { ...prev, [group]: updated };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      return result;
    });
  };

  const handleContinue = () => {
    go(`step${currentStep + 1}`, {
      ...formData,
      foodPreferences: selected,
      autoChooseFood: auto
    });
  };

  return (
    <div className="step35-root">
      <h2 className="step35-title">Chọn các sản phẩm bạn thích</h2>
      <div className="step35-desc">
        Hãy để chúng tôi tạo ra một kế hoạch ăn dựa trên sở thích của bạn.<br />
        Bạn luôn có thể điều chỉnh kế hoạch ăn sau này.
      </div>
      <div className="step35-auto-row">
        <span className="step35-auto-label">Hãy để Fitness & Health lựa chọn</span>
        <label className="step35-switch">
          <input
            type="checkbox"
            checked={auto}
            onChange={e => setAuto(e.target.checked)}
          />
          <span className="step35-slider"></span>
        </label>
      </div>
      <div className="step35-groups">
        {GROUPS.map(group => (
          <div className="step35-group" key={group.title}>
            <div className="step35-group-title">{group.title}</div>
            <div className="step35-tags">
              {group.items.map(item => (
                <div
                  key={item}
                  className={
                    "step35-tag" +
                    (selected[group.title]?.includes(item) ? " selected" : "") +
                    (auto ? " auto" : "")
                  }
                  onClick={() => toggleItem(group.title, item)}
                  tabIndex={0}
                >
                  <span className="step35-icon">{FOOD_ICONS[item] || '🍽️'}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="step35-btn" onClick={handleContinue}>
        Tiếp tục
      </button>
    </div>
  );
}
