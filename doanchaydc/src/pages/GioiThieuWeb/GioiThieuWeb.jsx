import React , { useState } from "react";
import { Link } from 'react-router-dom';

import "../../styles/GioiThieuWeb.css"; // Đảm bảo file CSS được đặt đúng
import images from "../../assets/loadImg.js";
import "../../styles/CustomScroll.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

function GioiThieuWeb() {
  // Quản lý trạng thái menu (đóng/mở)
  
  const [openWeb, setOpenWeb] = useState(false);
  const [closeWeb, setCloseWeb] = useState(true);

  // Hàm để mở menu

   // Hàm để mở chuong trinh
   const openWebsite = () => {
    setOpenWeb(true);
   setCloseWeb(false);
  };

 
 
  return (
    <div className="">
    
      <main>
      {closeWeb && (
        <section className="GioiThieu_AppData">
          <div className="GioiThieu_AppData_1">
            <div className="GioiThieu_AppData_1_1">
              <h1>Fitness and Health</h1>
              <p>
                Chào mừng bạn đến với Fitness and Health - Nơi Tập Luyện Trở Nên
                Dễ Dàng, Hiệu Quả và Vui Vẻ!
              </p>
             <Link  to="/body-building">
              <button className="custom-button" onClick={openWebsite}>
                Chọn một chương trình <i class="fa-solid fa-arrow-right"></i>
              </button>
             </Link> 
            </div>
            <div className="GioiThieu_AppData_1_2">
            <iframe width="800" height="450" src="https://www.youtube.com/embed/pbFDnF98TeY?si=cUu1z-m9gQRhg7Id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
          <div className="GioiThieu_AppData_2">
            <div className="GioiThieu_AppData_2_1">
              <div className="GioiThieu_AppData_2_1_1">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUyIiBoZWlnaHQ9IjEzNCIgdmlld0JveD0iMCAwIDI1MiAxMzQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNDQgMTI2QzI0NCA2MC44MzA0IDE5MS4xNyA4IDEyNiA4QzYwLjgzMDQgOCA4IDYwLjgzMDQgOCAxMjYiIHN0cm9rZT0iIzM5MzkzOSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yNDQgMTI2QzI0NCA2MC44MzA0IDE5MS4xNyA4IDEyNiA4QzYwLjgzMDQgOCA4IDYwLjgzMDQgOCAxMjYiIHN0cm9rZT0iIzM5MzkzOSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik04IDEyNkM4IDYwLjgzMDQgNjAuODMwNCA4IDEyNiA4QzE2OC4wMDQgOCAyMDQuODgzIDI5Ljk0NzMgMjI1Ljc5MyA2MyIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9hbmd1bGFyXzUwMV8xODEwKSIgc3Ryb2tlLXdpZHRoPSIxNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9hbmd1bGFyXzUwMV8xODEwIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNiAxMjYpIHJvdGF0ZSgtMTgwKSBzY2FsZSgxMjYgMTI2LjAwMSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkZBRDMxIi8+CjxzdG9wIG9mZnNldD0iMC41MDUyMDgiIHN0b3AtY29sb3I9IiNGRjM5MDAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"></img>
                <span>HIỆN TẠI</span>
                <h1>88 kg</h1>
                <p>70</p>
                <h4>100</h4>
              </div>
              <div className="GioiThieu_AppData_2_1_2">
                <h2>Kế Hoạch Tập Luyện Được Cá Nhân Hóa</h2>
                <p>
                  {" "}
                  Trong cơ sở dữ liệu của chúng tôi, có hơn 100 + bài tập khác
                  nhau trên cơ thể{" "}
                </p>
                <span>
                  {" "}
                  <i class="GioiThieu_AppData_2_1_2_icon">🔥</i>Chúng tôi kết
                  hợp các bài tập tĩnh và động để đạt hiệu quả tốt nhất.
                </span>
                <span>
                  <br></br>
                  <i class="GioiThieu_AppData_2_1_2_icon">💪</i>Bạn sẽ thấy
                  những thay đổi cơ thể đầu tiên sau{" "}
                  <strong> 8 lần tập luyện</strong>
                </span>
              </div>
            </div>
            <div className="GioiThieu_AppData_2_2">
              <div className="GioiThieu_AppData_2_2_1">
                <h2>Kế hoạch ăn dựa trên mục tiêu của bạn</h2>
                <p>
                  Kế hoạch ăn được điều chỉnh theo sở thích và yêu cầu của bạn.
                  Công thức nấu ăn rất dễ thực hiện, bạn có thể ăn bất cứ thứ gì
                  bạn muốn và có được vóc dáng đẹp hơn
                </p>
              </div>
              <div className="GioiThieu_AppData_2_2_2">
                <img src={images["GT1.png"]}></img>
              </div>
            </div>
            <div className="GioiThieu_AppData_2_3">
              <div className="GioiThieu_AppData_2_3_1">
                <img src={images["GT2.png"]}></img>
              </div>
              <div className="GioiThieu_AppData_2_3_2">
                <h2>Hệ thống xây dựng thói quen</h2>
                <p>
                  Cải thiện không chỉ vóc dáng mà còn phát triển những thói quen
                  và thể lực lành mạnh. <br></br>Với MadMuscles, bạn có thể giảm
                  mức độ căng thẳng, cải thiện ham muốn tình dục và thử sức với
                  những thử thách thay đổi cuộc sống khác nhau.
                </p>
              </div>
            </div>
            <div className="GioiThieu_AppData_2_4">
              <div className="GioiThieu_AppData_2_4_1">
                <h2>Chúng tôi cung cấp kết quả</h2>
              </div>
              <div className="GioiThieu_AppData_2_4_2">
                <div className="GioiThieu_AppData_2_4_2_1">
                  <b>🎯️ 115 000</b>
                  <br></br>
                  bài tập đã hoàn thành tương đương với hơn <br></br>
                  <strong style={{ color: "#FF6025" }}>7 năm tập luyện</strong>
                </div>
                <div
                  className="GioiThieu_AppData_2_4_2_1"
                  style={{ marginLeft: "180px" }}
                >
                  <b> 💪 60 000 </b>
                  <br></br>
                  lần căng bắp tay
                </div>
                <div className="GioiThieu_AppData_2_4_2_1">
                  <b>😎 100 000+</b> <br></br>
                  người dùng trên toàn thế giới, có sẵn 6 ngôn ngữ
                </div>
              </div>
            </div>
          </div>
          <div className="GioiThieu_AppData_3">
            <div className="GioiThieu_AppData_3_1">
              <h2>Và thậm chí nhiều hơn thế </h2>
            </div>
            <div className="GioiThieu_AppData_3_2">
              <span>
                Ứng dụng tất cả trong một <span>|</span>{" "}
                <span style={{ fontSize: "12px" }}>
                  <svg viewBox="0 0 20 17">
                    <path
                      d="M8.00016 11.3334L4.08149 13.7267L5.14682 9.26008L1.66016 6.27341L6.23682 5.90675L8.00016 1.66675L9.76349 5.90675L14.3408 6.27341L10.8535 9.26008L11.9188 13.7267L8.00016 11.3334Z"
                      fill="white"
                    ></path>
                  </svg>
                  <svg viewBox="0 0 20 17">
                    <path
                      d="M8.00016 11.3334L4.08149 13.7267L5.14682 9.26008L1.66016 6.27341L6.23682 5.90675L8.00016 1.66675L9.76349 5.90675L14.3408 6.27341L10.8535 9.26008L11.9188 13.7267L8.00016 11.3334Z"
                      fill="white"
                    ></path>
                  </svg>
                  <svg viewBox="0 0 20 17">
                    <path
                      d="M8.00016 11.3334L4.08149 13.7267L5.14682 9.26008L1.66016 6.27341L6.23682 5.90675L8.00016 1.66675L9.76349 5.90675L14.3408 6.27341L10.8535 9.26008L11.9188 13.7267L8.00016 11.3334Z"
                      fill="white"
                    ></path>
                  </svg>
                  <svg viewBox="0 0 20 17">
                    <path
                      d="M8.00016 11.3334L4.08149 13.7267L5.14682 9.26008L1.66016 6.27341L6.23682 5.90675L8.00016 1.66675L9.76349 5.90675L14.3408 6.27341L10.8535 9.26008L11.9188 13.7267L8.00016 11.3334Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <i
                  style={{ fontSize: "11px" }}
                  class="fa-regular fa-star-half-stroke"
                ></i>{" "}
                <span style={{ fontSize: "12px" }}>
                  62k <i class="fa-solid fa-user"></i>
                </span>
              </span>
            </div>

            <div className="GioiThieu_AppData_3_3">
            <div style={{ width: "100%", maxWidth: "900px", margin: "auto" }}>
                <Carousel interval={3000} pause="hover"
                nextIcon={<span className="custom-next-icon">›</span>}
        prevIcon={<span className="custom-prev-icon">‹</span>}
        indicators={true}>
                  <Carousel.Item>
                    <div className="d-flex justify-content-between">
                      <div className="boot_slide">
                        <div className="boot_slide_1">
                        <img src={images["slidefb1.png"]}></img>
                        <p >Vương Đức Tuấn</p>
                        <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                        
                        </div>
                        <div className="boot_slide_2">
                        <p class="sc-d45422be-0 sc-8bdce7f8-9 upoXe ldqYXU">Đây là một chương trình thực sự tuyệt vời, nhờ nó mà tôi đã giảm được 5 lb trong một tuần</p>
                        </div>
                      </div>
                      <div className="boot_slide">
                        <div className="boot_slide_1">
                        <img src={images["slidefb2.png"]}></img>
                        <p>Đinh Quốc Trung</p>
                        <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                        
                        </div>
                        <div className="boot_slide_2">
                        <p class="sc-d45422be-0 sc-8bdce7f8-9 upoXe ldqYXU">Đây là một cách tuyệt vời để lấy lại vóc dáng. Đáng ra tôi phải làm vậy từ lâu mới đúng 😃</p>
                        </div>
                      </div>
                      <div className="boot_slide">
                        <div className="boot_slide_1">
                        <img src={images["slidefb3.png"]}></img>
                        <p>Phạm Tiến Thành</p>
                        <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                        
                        </div>
                        <div className="boot_slide_2">
                        <p class="sc-d45422be-0 sc-8bdce7f8-9 upoXe ldqYXU">Chương trình đầu tiên giúp tôi bắt đầu tìm hiểu lĩnh vực này vì nó cung cấp cho tôi mọi thứ tôi cần để bắt đầu, bao gồm thực đơn và danh sách thực phẩm.</p>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="d-flex justify-content-between">
                      <div className="boot_slide">
                        <div className="boot_slide_1">
                          <img src={images["slidefb4.png"]}></img>
                          <p>Nguyễn Văn Trường</p>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                        
                        </div>
                        <div className="boot_slide_2">
                        <p class="sc-d45422be-0 sc-8bdce7f8-9 upoXe ldqYXU">Tôi đã thử chương trình trong một tuần; nó có các tính năng phù hợp, có kế hoạch tập luyện tốt và chế độ ăn kiêng. kế hoạch ăn kiêng cũng có danh sách thực phẩm và hướng dẫn chuẩn bị từng bước.</p>
                        </div>
                      </div>
                      <div className="boot_slide">
                        <div className="boot_slide_1">
                        <img src={images["slidefb5.png"]}></img>
                        <p>Vũ Minh Hiếu</p>
                        <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                        
                        </div>
                        <div className="boot_slide_2">
                        <p class="sc-d45422be-0 sc-8bdce7f8-9 upoXe ldqYXU">Chương trình hay, có hiệu quả và có bộ bài tập hay và chỉn chu</p>
                        </div>
                      </div>
                      <div className="boot_slide">
                        <div className="boot_slide_1">
                        <img src={images["slidefb6.png"]}></img>
                        <p>Bùi Tiến Đạt</p>
                        <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                          <i style={{margin:'15px 1px',fontSize:'10px',color:'orange'}} class="fa-solid fa-star"></i>
                        
                        </div>
                        <div className="boot_slide_2">
                        <p class="sc-d45422be-0 sc-8bdce7f8-9 upoXe ldqYXU">Kế hoạch rất tốt, tôi thích ở chỗ có đánh giá bài tập phù hợp theo thể lực nhưng nếu có chế độ ngoại tuyến thì tuyệt</p>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </div>
        </section>
      )}
        
       
      </main>
    </div>
  );
}

export default GioiThieuWeb;
