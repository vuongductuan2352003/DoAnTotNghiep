<div className="container">
      {/* Top navigation with progress */}
      <div className="navbar">
        <div className="back-button">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: "10%" }}></div> {/* Progress width as per steps */}
        </div>
        <div className="progress-count">1/31</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Chọn tạng người của bạn</h2>
        <div className="body-type-list">
          {/* Body Type: Mảnh khảnh */}
          <div className="body-type-card">
            <img src="path_to_image1" alt="Mảnh khảnh" />
            <span>Mảnh khảnh</span>
          </div>

          {/* Body Type: Trung bình */}
          <div className="body-type-card">
            <img src="path_to_image2" alt="Trung bình" />
            <span>Trung bình</span>
          </div>

          {/* Body Type: Nặng */}
          <div className="body-type-card">
            <img src="path_to_image3" alt="Nặng" />
            <span>Nặng</span>
          </div>
        </div>
      </div>
    </div>