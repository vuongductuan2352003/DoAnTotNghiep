import React, { useState } from "react";
import "../../styles/TrangChu.css";
import images from "../../assets/loadImg.js";
import { Link } from "react-router-dom";
function TrangChu() {
  const user = [
    {
      id: 1,
      user: "Terry Rivera",
      images:
        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-002.jpg",
    },
    {
      id: 2,
      user: "Hải Yến",
      images:
        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-019.jpg",
    },
    {
      id: 3,
      user: "Vương Đức Tuấn",
      images:
        "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-014.jpg",
    },
  ];

  const posts = [
    {
      id: 1,
      userId: 1,
      imagess:
        "https://i.ibb.co/pRM2VKq/Picture7.png",
      content:
        "Xin chào mọi người,Mình là Terry Rivera! Mình 45 tuổi! Mình muốn chia sẻ cho mọi người về hành trình giảm cân của mình từ 87 kg xuống còn 71 kg trong vòng 3 tháng và nhờ cộng đồng 'Fitness & Health' đã xây dựng cho mình lộ trình tập luyện đến lộ trình ăn uống qua việc thâm hụt calo ",
      time: "2 giờ trước",
      heart: 150,
      comments: 20,
      share: 14,
      views: 700,
      repost: 500,
    },
    {
      id: 2,
      userId: 2,
      imagess:
        "https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/pulse-nhip-song-khoe/song-khoe/2022/dau-tu-cho-suc-khoe-quan-tam-la-chua-du-hay-hanh-dong-ngay-1200x800-2.jpg",
      content:
        "Dinh dưỡng có vai trò quan trọng đối với sức khỏe. Một chế độ ăn khoa học, đầy đủ dưỡng chất giúp cơ thể khỏe mạnh, trong khi chế độ ăn thiếu cân đối khiến sức khỏe yếu đi, giảm đề kháng với bệnh tật. Vì vậy, để đầu tư cho cuộc sống vui khỏe, ngoài tập trung vận động thể thao, mỗi người nên tuân theo nguyên tắc ăn uống lành mạnh",
      time: "1 ngày trước",
      heart: 200,
      comments: 45,
      share: 30,
      views: 1200,
      repost: 700,
    },
    {
      id: 3,
      userId: 3,
      imagess:
        "https://cdn.thehinh.com/2016/05/cach-chia-lich-tap-gym-1.jpg",
      content:
        "Mọi người có thể tham khảo lịch tập gym này nhé! Mình đã áp dụng được 6 năm nay 👍",
      time: "3 giờ trước",
      heart: 120,
      comments: 30,
      share: 20,
      views: 850,
      repost: 600,
    },
  ];
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Tắt box nếu click ra ngoài
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".menu-item")) {
      setIsOpen(false); // Ẩn box nếu click bên ngoài
    }
  });

  return (
    <div className="main">
    <div className="main__header">
      <div className="tabs">
        <div className="tab active">Dành cho bạn</div>
        <div className="tab">Đang theo dõi</div>
      </div>
    </div>
    <div class="post-container">
      <div class="post-body">
        <div class="post-input">
          <div>
            <img class="user-avatar" src="https://i.ibb.co/kcWkDNv/z5977177908951-e125ef29611482ff009343c29ce96c86.jpg"></img>
          </div>
          <input
            type="text"
            placeholder="Chuyện gì đang xảy ra?!"
            class="post-textbox"
          />
        </div>
        <div class="post-options">
          <i class="fa-regular fa-image"></i>
          <div className="icon-item">
            <svg
              fill="none"
              height="19"
              title="123"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GIF Picker Icon</title>
              <g clip-path="url(#:r13:)">
                <path
                  d="M20.6472 13.7545L21.2766 14.1623L20.6472 13.7545C20.4715 14.0256 20.2404 14.2752 19.647 14.9058L15.4667 19.3473C14.7767 20.0804 14.5029 20.3659 14.1962 20.5791C13.785 20.8649 13.3208 21.0655 12.8308 21.169C12.4654 21.2462 12.0698 21.25 11.0631 21.25C9.62515 21.25 8.58506 21.2496 7.76313 21.1923C6.94813 21.1356 6.40373 21.0256 5.95094 20.8336C4.69662 20.3019 3.69812 19.3034 3.16638 18.0491C2.97444 17.5963 2.86444 17.0519 2.80767 16.2369C2.75042 15.4149 2.75 14.3748 2.75 12.9369V11.6C2.75 9.90747 2.75058 8.68317 2.82925 7.72029C2.90721 6.76615 3.05809 6.13493 3.32222 5.61655C3.82555 4.6287 4.6287 3.82555 5.61655 3.32222C6.13493 3.05809 6.76615 2.90721 7.72029 2.82925C8.68317 2.75058 9.90747 2.75 11.6 2.75H13.1363C14.48 2.75 15.4519 2.75037 16.2211 2.80049C16.984 2.8502 17.4953 2.94657 17.9222 3.11455C19.2784 3.64817 20.3518 4.72155 20.8855 6.07779C21.0534 6.50473 21.1498 7.01596 21.1995 7.77888C21.2496 8.54813 21.25 9.52002 21.25 10.8637C21.25 11.7295 21.2472 12.0697 21.1893 12.3875C21.1006 12.8745 20.9163 13.3391 20.6472 13.7545Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                ></path>
                <path
                  d="M13 21V19.3784V19.3784C13 15.8557 15.8557 13.0001 19.3784 13.0002V13.0002H21"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                ></path>
                <path
                  d="M8.33957 11.406C6.68121 11.406 5.69995 10.432 5.69995 8.69756C5.69995 6.98488 6.68121 6 8.2925 6C9.33894 6 10.1283 6.44899 10.4361 6.99936C10.5121 7.14058 10.5411 7.26369 10.5411 7.39404C10.5411 7.77785 10.2731 8.04218 9.88207 8.04218C9.58153 8.04218 9.35342 7.92631 9.16513 7.67647C8.91891 7.34697 8.66907 7.20937 8.29974 7.20937C7.64798 7.20937 7.26417 7.74526 7.26417 8.67583C7.26417 9.62812 7.7023 10.1966 8.37578 10.1966C8.87546 10.1966 9.23031 9.91779 9.27376 9.49777L9.281 9.42535H8.98047C8.63648 9.42535 8.41199 9.24431 8.41199 8.91481C8.41199 8.58531 8.63286 8.40426 8.98047 8.40426H9.99069C10.4795 8.40426 10.7583 8.69393 10.7583 9.2081C10.7583 10.4501 9.89655 11.406 8.33957 11.406Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M12.5259 11.406C12.0371 11.406 11.7583 11.1163 11.7583 10.6021V6.80384C11.7583 6.28967 12.0371 6 12.5259 6C13.0147 6 13.2936 6.28967 13.2936 6.80384V10.6021C13.2936 11.1163 13.0147 11.406 12.5259 11.406Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M15.3112 11.3606C14.8224 11.3606 14.5436 11.0709 14.5436 10.5568V6.849C14.5436 6.33484 14.8224 6.04517 15.3112 6.04517H17.6105C18.0232 6.04517 18.2876 6.26604 18.2876 6.65709C18.2876 7.04815 18.016 7.26902 17.6105 7.26902H16.0788V8.26839H17.4548C17.8386 8.26839 18.0848 8.4784 18.0848 8.84411C18.0848 9.20981 17.8458 9.41983 17.4548 9.41983H16.0788V10.5568C16.0788 11.0709 15.8 11.3606 15.3112 11.3606Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id=":r13:">
                  <rect
                    fill="white"
                    height="20"
                    transform="translate(2 2)"
                    width="20"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <i class="fa-solid fa-face-smile"></i>
          <i class="fa-solid fa-camera"></i>
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <div class="post-footer">
          <button class="post-button">Đăng</button>
        </div>
      </div>
      <div class="post-footer-info">
        <a href="#">Hiển thị 35 bài đăng</a>
      </div>
    </div>

    <div className="post-list">
      {posts.map((post) => {
        // Tìm người dùng dựa trên userId của bài viết
        const postUser = user.find((u) => u.id === post.userId);

        return (
          <div className="post-container-c" key={post.id}>
            {/* Header */}
            <div className="post-header-c">
              <img
                src={postUser?.images || "feedbackfb2.png"} // Hình ảnh người dùng
                alt="Profile"
                className="profile-pic-c"
              />
              <div className="post-info-c">
                <span className="author-name-c">{postUser?.user}</span>
                <span className="username-c">
                  @{postUser?.user.toLowerCase().replace(/\s+/g, "")}
                </span>
                <span className="time-c">{post.time}</span>
              </div>
            </div>

            {/* Content */}
            <div className="post-content-c">
              <p>{post.content}</p>
            </div>

            {/* Image */}
            <div className="post-image-c">
              <img
                src={post.imagess || "https://via.placeholder.com/600x300"}
                alt="Post Visual"
                className="content-image-c"
              />
            </div>

            {/* Footer */}
            <div className="post-footer-c">
              <span className="footer-item-c">{post.heart} <i class="fa-regular fa-heart"></i></span>
              <span className="footer-item-c">{post.comments} <i class="fa-regular fa-comment"></i></span>
              <span className="footer-item-c">{post.repost} <i class="fa-solid fa-repeat"></i></span>
              <span className="footer-item-c">{post.share} <i class="fa-solid fa-share"></i></span>
              <span className="footer-item-c">{post.views} <i class="fa-regular fa-eye"></i></span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  );
}

export default TrangChu;
