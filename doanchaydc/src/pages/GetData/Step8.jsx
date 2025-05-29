import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, Area, XAxis, YAxis, LabelList } from 'recharts';
import '../../styles/Step8.css';

// Map key-value mục tiêu giữa tiếng Anh và tiếng Việt
const goalMap = {
  maintain: "Duy Trì Cân Nặng",
  gain_muscle: "Tăng Cơ Bắp",
  gain_weight: "Tăng Cân",
  lose_weight: "Giảm Cân",
  reduce_fat: "Giảm Mỡ"
};
const goalValueToKey = Object.fromEntries(Object.entries(goalMap).map(([k, v]) => [v, k]));

export default function Step8() {
  const { formData, go, currentStep } = useOutletContext();
  const currentWeight = Number(formData.weight);
  const targetWeight = Number(formData.targetWeight);

  // goal lúc này là value tiếng Việt!
  const goal = formData.goal;

  // Chuẩn hóa key để xử lý logic (do goal trong formData là tiếng Việt)
  const goalKey = goalValueToKey[goal];

  const isMaintainOrMuscle = goalKey === 'maintain' || goalKey === 'gain_muscle';

  // Nếu có targetWeight thì tính ngày dự kiến, nếu không lấy 60 ngày cho maintain/gain_muscle
  const diff = Math.abs(targetWeight - currentWeight);
  const speedPerWeek = goalKey === 'gain_weight' ? 0.375 : 0.75;
  const durationWeeks = targetWeight ? Math.ceil(diff / speedPerWeek) : 8;
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (targetWeight ? durationWeeks * 7 : 60)); // 60 ngày (2 tháng) với maintain/gain_muscle

  function formatDate(date) {
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
  }

  // Tạo data cho chart
  let points = [];
  if (isMaintainOrMuscle) {
    points = [
      { date: formatDate(today), kg: currentWeight, label: `${currentWeight} kg` },
      { date: formatDate(endDate), kg: currentWeight, label: `${currentWeight} kg` }
    ];
  } else {
    const n = 7;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const curved = Math.pow(t, 1.7); // uốn cong đường
      const kg = Math.round(currentWeight + (targetWeight - currentWeight) * curved);
      const date = new Date(today);
      date.setDate(today.getDate() + Math.round(durationWeeks * 7 * t));
      points.push({
        date: formatDate(date),
        kg,
        label: i === 0 ? `${kg} kg` : (i === n ? `${kg} kg` : undefined)
      });
    }
  }

  // Bubble label đầu-cuối
  function CustomLabel({ x, y, value, index }) {
    if (index === 0) {
      return (
        <g>
          <circle cx={x} cy={y} r={12} fill="#232323" stroke="#fff" strokeWidth={2} />
          <rect x={x - 26} y={y - 43} width="52" height="28" rx="10" fill="#32353B" />
          <text x={x} y={y - 23} textAnchor="middle" fill="#fff" fontWeight={700} fontSize={16}>{value}</text>
        </g>
      );
    }
    if (index === points.length - 1) {
      return (
        <g>
          <circle cx={x} cy={y} r={14} fill="#ff5722" stroke="#fff" strokeWidth={2} filter="url(#glow)" />
          <rect x={x - 26} y={y - 48} width="52" height="28" rx="10" fill="#ff5722" filter="url(#glow)" />
          <text x={x} y={y - 30} textAnchor="middle" fill="#fff" fontWeight={700} fontSize={16}>{value}</text>
        </g>
      );
    }
    return null;
  }

  // Sự kiện khi ấn "Đã hiểu"
  const handleContinue = () => {
    // Lưu ngày targetDate nếu có targetWeight, còn lại thì không cần
    const updated = {
      ...formData,
      ...(targetWeight ? { targetDate: formatDate(endDate) } : {})
    };
    window.localStorage.setItem('formData', JSON.stringify(updated));
    go(`step${currentStep + 1}`, updated); // sang bước 9
  };

  return (
    <div className="step8-root">
      <div className="step8-title">
        Kế hoạch cuối cùng bạn sẽ cần <span className="highlight">để lấy lại</span> vóc dáng
      </div>
      <div className="step8-desc">
        {isMaintainOrMuscle ? (
          <>
            {goalKey === 'maintain'
              ? <>Bạn đang <b>duy trì cân nặng hiện tại</b>. Tiếp tục lối sống và luyện tập để giữ vững vóc dáng này!</>
              : <>Bạn đang <b>tăng cơ bắp</b>. Hãy tập trung vào luyện tập và dinh dưỡng để cải thiện các chỉ số cơ bắp!</>
            }
          </>
        ) : (
          <>
            Dựa trên tính toán của chúng tôi, bạn sẽ đạt được trọng lượng mục tiêu của mình là <b>{targetWeight} kg</b> trước
          </>
        )}
      </div>
      {!isMaintainOrMuscle && (
        <div className="step8-target-date">
          <span>{formatDate(endDate)}</span>
        </div>
      )}
      <div className="step8-chart-box">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart
            data={points}
            margin={{ top: 60, left: 0, right: 0, bottom: 35 }}
          >
            <defs>
              <linearGradient id="orange-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8a50" />
                <stop offset="100%" stopColor="#181818" />
              </linearGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Area
              type="monotone"
              dataKey="kg"
              stroke="none"
              fill="url(#orange-gradient)"
              fillOpacity={0.42}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="kg"
              stroke="#ff5722"
              strokeWidth={3}
              isAnimationActive={false}
            >
              <LabelList dataKey="label" content={CustomLabel} />
            </Line>
            <XAxis
              dataKey="date"
              tick={{ fill: '#ccc', fontSize: 16, fontWeight: 400 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 48, right: 48 }}
              interval="preserveStartEnd"
            />
            <YAxis hide domain={['dataMin-5', 'dataMax+5']} />
          </LineChart>
        </ResponsiveContainer>
        <div className="step8-chart-note">Biểu đồ này chỉ mang tính minh họa</div>
      </div>
      <button className="step8-btn" onClick={handleContinue}>Đã hiểu</button>
    </div>
  );
}
