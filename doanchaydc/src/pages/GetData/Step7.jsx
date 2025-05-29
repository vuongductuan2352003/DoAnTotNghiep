import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../utils/api';
import images from '../../assets/loadImg.js';
import '../../styles/step7.css';

// Map gender value cho API backend
function mapGenderToApi(gender) {
  if (gender === "Nam") return "male";
  if (gender === "Nữ") return "female";
  return gender;
}

// Map lại key tiếng Anh cho logic cảnh báo
const goalKeyToValue = {
  lose_weight: 'Giảm Cân',
  reduce_fat: 'Giảm Mỡ',
  maintain: 'Duy Trì Cân Nặng',
  gain_muscle: 'Tăng Cơ Bắp',
  gain_weight: 'Tăng Cân'
};
const goalValueToKey = Object.fromEntries(
  Object.entries(goalKeyToValue).map(([k, v]) => [v, k])
);

export default function Step7Goal() {
  const { formData, go, currentStep } = useOutletContext();

  // 1. Tính BMI
  const height = Number(formData.height) || 0;
  const weight = Number(formData.weight) || 0;
  const bmi = useMemo(() => {
    if (!height || !weight) return null;
    return +(weight / ((height / 100) ** 2)).toFixed(1);
  }, [height, weight]);

  // 2. Phân cấp BMI
  const { categoryKey, levelLabel } = useMemo(() => {
    if (bmi == null) return {};
    if (bmi < 16)   return { categoryKey: 'under3', levelLabel: 'Gầy độ 3' };
    if (bmi < 17)   return { categoryKey: 'under2', levelLabel: 'Gầy độ 2' };
    if (bmi < 18.5) return { categoryKey: 'under1', levelLabel: 'Gầy độ 1' };
    if (bmi < 23)   return { categoryKey: 'normal', levelLabel: 'Bình thường' };
    if (bmi < 25)   return { categoryKey: 'over0', levelLabel: 'Thừa cân' };
    if (bmi < 30)   return { categoryKey: 'obese1', levelLabel: 'Béo phì độ 1' };
    if (bmi < 35)   return { categoryKey: 'obese2', levelLabel: 'Béo phì độ 2' };
                    return { categoryKey: 'obese3', levelLabel: 'Béo phì độ 3' };
  }, [bmi]);

  // 3. State mục tiêu
  const [goal, setGoal] = useState(formData.goal || 'Duy Trì Cân Nặng');
  const [targetWeight, setTargetWeight] = useState(formData.targetWeight || '');
  const [error, setError] = useState('');

  // 4. Validation: chênh lệch cân phải từ 1–25kg
  useEffect(() => {
    const goalKey = goalValueToKey[goal];
    if (!['lose_weight','reduce_fat','gain_weight'].includes(goalKey) || !targetWeight) {
      setError('');
      return;
    }
    const tg = Number(targetWeight);
    const diff = goalKey === 'gain_weight' ? tg - weight : weight - tg;

    if (isNaN(diff)) {
      setError('Giá trị không hợp lệ.');
    } else if (diff < 1 || diff > 25) {
      setError('Chênh lệch cân nặng phải từ 1–25 kg.');
    } else if (goalKey !== 'gain_weight' && tg >= weight) {
      setError('Mục tiêu phải nhỏ hơn cân nặng hiện tại.');
    } else if (goalKey === 'gain_weight' && tg <= weight) {
      setError('Mục tiêu phải lớn hơn cân nặng hiện tại.');
    } else {
      setError('');
    }
  }, [targetWeight, goal, weight]);

  // 5. Lưu formData
  useEffect(() => {
    const updated = { ...formData, goal };
    const goalKey = goalValueToKey[goal];
    if (['lose_weight','reduce_fat','gain_weight'].includes(goalKey)) {
      updated.targetWeight = targetWeight;
    } else if (['maintain', 'gain_muscle'].includes(goalKey)) {
      updated.targetWeight = weight;
    }
    window.localStorage.setItem('formData', JSON.stringify(updated));
  }, [goal, targetWeight, formData, weight]);

  // 6. Các lựa chọn mục tiêu
  const goalOptions = [
    { key: 'lose_weight', value: 'Giảm Cân', img: images['male.png'] },
    { key: 'reduce_fat', value: 'Giảm Mỡ', img: images['reduce_fat.png'] },
    { key: 'maintain', value: 'Duy Trì Cân Nặng', img: images['maintain.png'] },
    { key: 'gain_muscle', value: 'Tăng Cơ Bắp', img: images['gain_muscle.png'] },
    { key: 'gain_weight', value: 'Tăng Cân', img: images['gain_weight.png'] },
  ];

  // 7. Cảnh báo + scroll
  const [warning, setWarning] = useState([]);
  const warningRef = useRef(null);
  useEffect(() => {
    if (warning.length > 0) {
      warningRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [warning]);

  // 8. Tính nguy cơ (dùng key tiếng Anh)
  useEffect(() => {
    const goalKey = goalValueToKey[goal];
    if (!bmi || !categoryKey || !goalKey) {
      setWarning([]);
      return;
    }
    if (categoryKey.startsWith('under') && ['lose_weight','reduce_fat'].includes(goalKey)) {
      const underMap = { under1:'under2', under2:'under3', under3:'under3' };
      fetchLevelRisk(underMap[categoryKey], goalKey === 'reduce_fat' ? 'Giảm mỡ' : 'Giảm cân');
      return;
    }
    if (categoryKey.startsWith('under') && goalKey === 'gain_weight') {
      setWarning([]);
      return;
    }
    if (goalKey === 'gain_weight' && (categoryKey==='over0' || categoryKey.startsWith('obese'))) {
      const gainMap = { over0:'obese1', obese1:'obese2', obese2:'obese3', obese3:'obese3' };
      fetchLevelRisk(gainMap[categoryKey], 'Tăng cân');
      return;
    }
    if (goalKey === 'maintain') {
      if (bmi >= 18.5 && bmi < 23) {
        setWarning([]);
      } else {
        fetchLevelRisk(categoryKey, 'Duy trì cân nặng');
      }
      return;
    }
    setWarning([]);
  }, [bmi, categoryKey, goal, formData.gender]);

  function fetchLevelRisk(toKey, action) {
    const mapBmi = {
      under1:18, under2:16.5, under3:15,
      normal:21, over0:24.5,
      obese1:27.5, obese2:32.5, obese3:37.5
    };
    const nextBmi = mapBmi[toKey] || bmi;
    api.get('v1/bmi', { params:{ bmi: nextBmi, gender: mapGenderToApi(formData.gender) } })
      .then(({ data }) => {
        const risks = Array.isArray(data.risk) ? data.risk : [data.risk];
        const labels = {
          under1:'Gầy độ 1', under2:'Gầy độ 2', under3:'Gầy độ 3',
          normal:'Bình thường', over0:'Thừa cân',
          obese1:'Béo phì độ 1', obese2:'Béo phì độ 2', obese3:'Béo phì độ 3'
        };
        const toLabel = labels[toKey] || levelLabel;
        setWarning([`Bạn đang ${levelLabel}. Nếu tiếp tục “${action}” sẽ ở mức ${toLabel}, kèm nguy cơ:`, ...risks]);
      })
      .catch(() => setWarning([`Không thể tải nguy cơ cho ${toKey}.`]));
  }

  // 9. Điều hướng
  const handleBack = () => go(`step${currentStep-1}`, formData);
  const handleContinue = () => {
    const goalKey = goalValueToKey[goal];
    const nextData = { ...formData, goal };
    if (['lose_weight','reduce_fat','gain_weight'].includes(goalKey)) {
      nextData.targetWeight = targetWeight;
    } else if (['maintain', 'gain_muscle'].includes(goalKey)) {
      nextData.targetWeight = weight;
    }
    go(`step${currentStep+1}`, nextData);
  };

  return (
    <div className="step7-container">
      <button onClick={handleBack} className="step7-back-btn">← Quay lại</button>
      <h2 className="step7-title">Chọn mục tiêu của bạn</h2>

      {bmi != null && (
        <p className="step7-bmi-info">BMI: <strong>{bmi}</strong> ({levelLabel})</p>
      )}

      <div className="step7-goal-section">
        <div className="step7-goal-grid">
          {goalOptions.map(opt => (
            <div
              key={opt.key}
              className={`step7-goal-card${goal === opt.value ? ' selected' : ''}`}
              onClick={() => setGoal(opt.value)}
            >
              <img src={opt.img} alt={opt.value} className="step7-goal-img" />
              <span>{opt.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nhập cân nặng mục tiêu (1–25 kg) */}
      {['Giảm Cân','Tăng Cân','Giảm Mỡ'].includes(goal) && (
        <div className="step7-targetweight-row">
          <div className="step7-current-weight">
            Cân nặng hiện tại: <strong>{weight} kg</strong>
          </div>
          <div className="step7-targetweight">
            <label htmlFor="targetWeight">Mục tiêu (kg):</label>
            <input
              id="targetWeight"
              type="number"
              value={targetWeight}
              onChange={e => setTargetWeight(e.target.value)}
              placeholder="Nhập cân nặng mục tiêu"
              min={1}
              max={25}
              className="step7-targetweight-input"
            />
          </div>
          {error && (
            <p className="step7-error-message">
              {error}
            </p>
          )}
        </div>
      )}

      {warning.length > 0 && (
        <div ref={warningRef} className="step7-warning-section">
          <h3>Nguy cơ</h3>
          <ul>
            {warning.map((msg, idx) => <li key={idx}>{msg}</li>)}
          </ul>
        </div>
      )}

      <div className="step7-actions">
        <button
          onClick={handleContinue}
          className="step7-next-btn"
          disabled={
            !goal ||
            (['Giảm Cân','Tăng Cân','Giảm Mỡ'].includes(goal) && (!targetWeight || error))
          }
        >
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}
