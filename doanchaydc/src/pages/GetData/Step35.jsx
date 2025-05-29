import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step35.css';

const FOOD_ICONS = {
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

export default function Step35Preference() {
  const { formData, go, currentStep } = useOutletContext();

  // Nếu quay lại: auto thì set true, foodPreferences là đầy đủ, ngược lại đọc lại từ formData
  const [auto, setAuto] = useState(!!formData.autoChooseFood);
  const [selected, setSelected] = useState(() => {
    if (formData.autoChooseFood) {
      // Nếu auto, khởi tạo full
      const all = {};
      GROUPS.forEach(g => { all[g.title] = g.items.slice(); });
      return all;
    }
    // Nếu có chọn tay thì đọc lại
    return formData.foodPreferences || {};
  });

  // Khi bật/tắt auto, đồng bộ selected đúng chuẩn
  useEffect(() => {
    if (auto) {
      const all = {};
      GROUPS.forEach(g => { all[g.title] = g.items.slice(); });
      setSelected(all);
    } else {
      setSelected({});
    }
  }, [auto]);

  // Nếu formData thay đổi (quay lại từ step sau)
  useEffect(() => {
    if (formData.autoChooseFood) {
      setAuto(true);
      const all = {};
      GROUPS.forEach(g => { all[g.title] = g.items.slice(); });
      setSelected(all);
    } else {
      setAuto(false);
      setSelected(formData.foodPreferences || {});
    }
  }, [formData]);

  // Chọn/bỏ từng món ăn
  const toggleItem = (group, item) => {
    if (auto) return; // Không chọn tay khi auto
    setSelected(prev => {
      const groupItems = prev[group] || [];
      const exists = groupItems.includes(item);
      let updated = exists
        ? groupItems.filter(i => i !== item)
        : [...groupItems, item];
      // Xoá group nếu rỗng
      const next = { ...prev, [group]: updated };
      if (updated.length === 0) delete next[group];
      return next;
    });
  };

  // Ấn tiếp tục
  const handleContinue = () => {
    let toSave = {};
    if (auto) {
      GROUPS.forEach(g => {
        toSave[g.title] = g.items.slice();
      });
    } else {
      toSave = { ...selected };
    }
    go(`step${currentStep + 1}`, {
      ...formData,
      foodPreferences: toSave,
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
