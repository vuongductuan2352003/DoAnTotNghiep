import React from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/Step32.css';

const FEEDBACK = {
  lt2: {
    title: "Uống nước là điều cần thiết",
    desc: "Nếu không đủ nước, cơ thể bạn sẽ không thể hoạt động ở mức tối đa. Fitness & Health sẽ nhắc bạn uống đủ nước.",
    percent: null
  },
  '2_6': {
    title: "Bạn uống nhiều nước hơn 50% người dùng",
    desc: "Fitness & Health sẽ nhắc bạn uống đủ nước.<br/><span class='note'>người dùng Fitness & Health đã làm bài kiểm tra</span>",
    percent: 50
  },
  '7_10': {
    title: "Ôi! Thật ấn tượng!",
    desc: "Bạn uống nhiều nước hơn 72% người dùng. Tiếp tục phát huy nhé!<br/><span class='note'>người dùng Fitness & Health đã làm bài kiểm tra</span>",
    percent: 72
  },
  gt10: {
    title: "Ôi! Thật ấn tượng!",
    desc: "Bạn uống nhiều nước hơn 92% người dùng. Tiếp tục phát huy nhé!<br/><span class='note'>người dùng Fitness & Health đã làm bài kiểm tra</span>",
    percent: 92
  },
  tea_coffee_only: {
    title: "Uống nước là điều cần thiết",
    desc: "Nếu không đủ nước, cơ thể bạn sẽ không thể hoạt động ở mức tối đa. Fitness & Health sẽ nhắc bạn uống đủ nước.",
    percent: null
  }
};



// FEEDBACK object như của bạn ở trên (bỏ vào file js)

export default function Step32WaterResult() {
  const { formData, go, currentStep } = useOutletContext();
  const value = formData.water;
  const feedback = FEEDBACK[value];

  return (
    <div className="step32-root">
      <div className="step32-waterball-ctn">
        <WaterBall percent={feedback.percent} />
      </div>
      <h2 className="step32-title animate-fadein">{feedback.title}</h2>
      <div
        className="step32-desc animate-fadein"
        dangerouslySetInnerHTML={{ __html: feedback.desc }}
      />
      <button className="step32-btn" onClick={() => go(`step${currentStep + 1}`, formData)}>
        Đã hiểu
      </button>
    </div>
  );
}

// Animated Water Ball SVG
function WaterBall({ percent }) {
  // Nếu null (mặc định), lấy mức thấp nhất
  const percentLevel = percent == null ? 38 : percent <= 50 ? 48 : percent <= 72 ? 61 : 75;
  // 0% là cạn, 100% là đầy (dâng lên từ dưới)
  // percentLevel: tỷ lệ dâng nước (tính theo % chiều cao hình tròn SVG)
  // => 38: thấp, 48: vừa, 61: 3/4, 75: gần đầy

  return (
    <div className="water-ball-ani">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <defs>
          <clipPath id="wave-clip">
            <circle cx="80" cy="80" r="70" />
          </clipPath>
        </defs>
        {/* Nền tối */}
        <circle cx="80" cy="80" r="70" fill="#181A1B" />
        {/* Làn nước động */}
        <g clipPath="url(#wave-clip)">
          <WavePath percentLevel={percentLevel} />
          {/* Có thể thêm 2 sóng chồng nhau để mượt hơn */}
          <WavePath percentLevel={percentLevel + 2} delay={2} opacity={0.5} color="#33C1F7" />
        </g>
        {/* Viền ngoài */}
        <circle cx="80" cy="80" r="70" fill="none" stroke="#222" strokeWidth="5" />
      </svg>
    </div>
  );
}

// Tạo hiệu ứng sóng động với CSS animation
function WavePath({ percentLevel, delay = 0, opacity = 1, color = '#25A9E0' }) {
  // Tính y để sóng nằm đúng mức nước
  const y = 160 - (percentLevel * 1.1);
  return (
    <path
      className="water-wave-ani"
      d={`
        M0,${y + 4}
        Q 40,${y - 10} 80,${y + 4}
        T 160,${y + 4}
        V160 H0 Z
      `}
      fill={color}
      style={{
        animationDelay: `${delay}s`,
        opacity,
      }}
    />
  );
}
