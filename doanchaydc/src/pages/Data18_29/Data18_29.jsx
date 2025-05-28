import React, { useState } from "react";
import "../../styles/Data18_29.css";
import images from "../../assets/loadImg.js";
import { useNavigate } from "react-router-dom";

function Data18_29() {
  const [currentStep, setCurrentStep] = useState(1); // Quản lý bước hiện tại
  const [selections, setSelections] = useState({
    bodyType: "",  // Tạng người
    goal: "",      // Mục tiêu
    physique: "",
    yi:"",  // Thân hình mong muốn
  });
  const navigate = useNavigate();

  const handleSelection = (step, key, value) => {
    // Lưu lựa chọn vào đối tượng `selections`
    setSelections({
      ...selections,
      [key]: value,
    });

    // Chuyển sang bước tiếp theo
    if (step < 3) {
      setCurrentStep(step + 1);
    } else {
      // Không lưu dữ liệu cho đến bước 3
      if (step === 3) {
        console.log("Lựa chọn cuối cùng:", selections); // Debug trước khi lưu
        console.log("step:", currentStep);
        localStorage.setItem("bai", selections);
        // saveToDatabase(selections); // Gọi hàm lưu vào cơ sở dữ liệu chỉ khi bước 3 hoàn thành
      }
      navigate("/Register"); // Điều hướng khi hoàn thành các bước
    }
  };

  // const saveToDatabase = async (data) => {
  //   try {
  //     const response = await fetch("http://your-backend-url/api/save", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log("Dữ liệu đã được lưu thành công!");
  //     } else {
  //       console.error("Lỗi khi lưu dữ liệu:", await response.text());
  //     }
  //   } catch (error) {
  //     console.error("Lỗi kết nối tới server:", error);
  //   }
  // };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="Data18_29">
      {currentStep === 1 && (
        <div className="Data18_29_1">
          <div className="navbar">
            <div className="back-button">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "30%" }}></div>
            </div>
            <div className="progress-count">1/3</div>
          </div>

          <div className="main-content">
            <h2>Chọn tạng người của bạn</h2>
            <div className="body-type-list">
              <div
                className="body-type-card"
                onClick={() => handleSelection(1, "bodyType", "Mảnh khảnh")}
              >
                <img src={images["Data18_29_1.png"]} alt="Mảnh khảnh" />
                <span>Mảnh khảnh</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(1, "bodyType", "Trung bình")}
              >
                <img src={images["Data18_29_2.png"]} alt="Trung bình" />
                <span>Trung bình</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(1, "bodyType", "Nặng")}
              >
                <img src={images["Data18_29_3.png"]} alt="Nặng" />
                <span>Nặng</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="Data18_29_1">
          <div className="navbar">
            <div className="back-button" onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}></div>
            </div>
            <div className="progress-count">2/3</div>
          </div>

          <div className="main-content">
            <h2>Chọn mục tiêu của bạn</h2>
            <div className="body-type-list">
              <div
                className="body-type-card"
                onClick={() => handleSelection(2, "goal", "Giảm cân")}
              >
                <img src={images["Data18_29_4.png"]} alt="Giảm cân" />
                <span>Giảm cân</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(2, "goal", "Tăng cơ bắp")}
              >
                <img src={images["Data18_29_5.png"]} alt="Tăng cơ bắp" />
                <span>Tăng cơ bắp</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(2, "goal", "Cắt nét cơ")}
              >
                <img src={images["Data18_29_6.png"]} alt="Cắt nét cơ" />
                <span>Cắt nét cơ</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="Data18_29_1">
          <div className="navbar">
            <div className="back-button" onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "100%" }}></div>
            </div>
            <div className="progress-count">3/3</div>
          </div>

          <div className="main-content">
            <h2>Chọn thân hình bạn muốn</h2>
            <div className="body-type-list">
              <div
                className="body-type-card"
                onClick={() => handleSelection(3, "physique", "Vận động viên")}
              >
                <img src={images["Data18_29_7.png"]} alt="Vận động viên" />
                <span>Vận động viên</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(3, "physique", "Anh hùng")}
              >
                <img src={images["Data18_29_8.png"]} alt="Anh hùng" />
                <span>Anh hùng</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(3, "physique", "Thể hình")}
              >
                <img src={images["Data18_29_9.png"]} alt="Thể hình" />
                <span>Thể hình</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentStep === 4 && (
        <div className="Data18_29_1">
          <div className="navbar">
            <div className="back-button" onClick={goBack}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "100%" }}></div>
            </div>
            <div className="progress-count">3/3</div>
          </div>

          <div className="main-content">
            <h2>Chọn thân hình bạn muốn</h2>
            <div className="body-type-list">
              <div
                className="body-type-card"
                onClick={() => handleSelection(4, "yi", "Vận động viên")}
              >
                <img src={images["Data18_29_7.png"]} alt="Vận động viên" />
                <span>Vận động viên</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(4, "yi", "Anh hùng")}
              >
                <img src={images["Data18_29_8.png"]} alt="Anh hùng" />
                <span>Anh hùng</span>
              </div>

              <div
                className="body-type-card"
                onClick={() => handleSelection(4, "yi", "Thể hình")}
              >
                <img src={images["Data18_29_9.png"]} alt="Thể hình" />
                <span>Thể hình</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Data18_29;
