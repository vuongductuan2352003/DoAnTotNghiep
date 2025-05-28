import React from 'react'

export default function FooterHome() {
  const trendingTopics = [
    { title: "FILMRACHA CELINE GOP", posts: "6.240 bài đăng" },
    { title: "ORM GOP CENTRAL CHIDLOM", posts: "111 N bài đăng" },
    { title: "#PRIMAxOrmKornnaphat", posts: "115 N bài đăng" },
    { title: "Blockchain", posts: "225 N bài đăng" },
  ];

  const suggestions = [
    { name: "Ohmpawat", username: "@ohmpawatt", verified: true },
    { name: "김민규 KIM MIN KYU", username: "@minkyu0312", verified: false },
    { name: "zhoumi周觅조미", username: "@zhoumi419", verified: true },
  ];

  return (
    <div className="widgets">
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input type="text" className="search-input" placeholder="Tìm kiếm" />
    </div>

    <div className="Premium">
      <h5>Đăng ký gói Premium</h5>
      <span>
        Đăng ký để mở khóa các tính năng mới và nếu đủ điều kiện, bạn sẽ
        được nhận một khoản chia sẻ doanh thu cho người sáng tạo nội dung.
      </span>
      <div class="post-footerr">
        <button class="post-buttonn">Đăng ký</button>
      </div>
    </div>

    <div className="trending">
      <h3>Những điều đang diễn ra</h3>
      <ul>
        {trendingTopics.map((topic, index) => (
          <li key={index}>
            <div className="topic-title">{topic.title}</div>
            <div className="topic-posts">{topic.posts}</div>
          </li>
        ))}
      </ul>
      <a href="#" className="show-more">
        Hiển thị thêm
      </a>
    </div>

    <div className="suggestions">
      <h3>Gợi ý theo dõi </h3>

      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} className="suggestion-item">
            <div className="user-info">
              <div className="name">
                {suggestion.name}{" "}
                {suggestion.verified && <span className="verified">✔</span>}
              </div>
              <div className="username">{suggestion.username}</div>
            </div>
            <button className="follow-btn">Theo dõi</button>
          </li>
        ))}
      </ul>
      <a href="#" className="show-more">
        Hiển thị thêm
      </a>
    </div>
  </div>
  )
}
