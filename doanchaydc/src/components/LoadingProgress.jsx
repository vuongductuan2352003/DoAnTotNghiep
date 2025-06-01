// src/components/LoadingProgress.jsx
import React from "react";
import "../styles/LoadingProgress.css";

export default function LoadingProgress({ percent = 0, message }) {
  return (
    <div className="lp-overlay">
      <div className="lp-box">
        <div className="lp-spinner-wrap">
          <svg className="lp-spinner" width="110" height="110" viewBox="0 0 110 110">
            <defs>
              <linearGradient id="lp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <circle
              className="lp-track"
              cx="55"
              cy="55"
              r="44"
              stroke="#2a3343"
              strokeWidth="8"
              fill="none"
            />
            <circle
              className="lp-progress"
              cx="55"
              cy="55"
              r="44"
              stroke="url(#lp-gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - percent / 100)}
              style={{
                transition: "stroke-dashoffset 0.5s cubic-bezier(.5,2,.4,1), stroke 0.4s"
              }}
            />
          </svg>
          <div className="lp-percent">
            <span>{Math.round(percent)}</span>
            <span className="lp-percent-sign">%</span>
          </div>
        </div>
        <div className="lp-message">
          {message || (
            <>
              Đang xử lý, bạn chờ một lát nhé!<br />
              <span className="lp-msg-detail">
                Đang tạo tài khoản và lên bài tập kèm chế độ dinh dưỡng...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
