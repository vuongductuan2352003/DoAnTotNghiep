import React, { useEffect, useState } from "react";
import "../../../styles/Register.css";
import images from "../../../assets/loadImg.js";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Registery() {
  const [sendCode, SendCode] = useState(true); // Đổi tên sendCode để tránh xung đột
  const [verifyCode, VerifyCode] = useState(false);
  const [verifyCodee, setVeifiCode] = useState("");
  const [setPassWord, SetPassWord] = useState(false);
// hide pass
const [showPassword, setShowPassword] = useState(false); // Trạng thái để điều khiển hiển/ẩn mật khẩu

  const [showPasswordd, setShowPasswordd] = useState(false); // Trạng thái để điều khiển hiển/ẩn mật khẩu

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordd = () => {
    setShowPasswordd(!showPasswordd);
   
  };



// thông báo
  const [message, setMessage] = useState(''); // Thông báo
  const [messageType, setMessageType] = useState(''); // Loại thông báo (success/error)
  const [showMessage, setShowMessage] = useState(false); // Hiển thị thông báo
  // gửi form sendcode
  const [getSendCode, setSendCode] = useState({
    name: '',
    email: '',
    birth: '',
  });
  // gửi form send verifycode
  const [sendVerifyCode, SendVerifyCode] = useState({
    email: '',
    code: '',
  });

// gửi form setSendPassWord
  const [setSendPassWord, SetSendPassWord] = useState({
    email: '',
    password: '',
    password_confirmation:''
  });

  useEffect(() => {
    SetSendPassWord(prevState => ({
      ...prevState,
      email: getSendCode.email // Cập nhật email khi getSendCode.email thay đổi
    }));
  }, [getSendCode.email]); // Chạy effect khi getSendCode.email thay đổi
  // cập nhật email cho verifycode
  useEffect(() => {
    SendVerifyCode(prevState => ({
      ...prevState,
      email: getSendCode.email // Cập nhật email khi getSendCode.email thay đổi
    }));
  }, [getSendCode.email]); // Chạy effect khi getSendCode.email thay đổi
//TRƯỜNG THAY ĐỔI GIÁ TRỊ
  const handleChange = (e) => {
    setSendCode({
      ...getSendCode,
      [e.target.name]: e.target.value, // Cập nhật giá trị đúng trường
    });
  };
  const hhandleChange = (e) => {
    SendVerifyCode({
      ...sendVerifyCode,
      [e.target.name]: e.target.value, // Cập nhật giá trị đúng trường
    });
  };
  const hhhandleChange = (e) => {
    SetSendPassWord({
      ...setSendPassWord,
      [e.target.name]: e.target.value, // Cập nhật giá trị đúng trường
    });
  };
  //CALL API SENDCODE
  const hhandleSubmit = async (event) => {
    event.preventDefault();
    console.log('Dữ liệu sẽ gửi đi:', getSendCode);  
      const response = await axios.post('http://127.0.0.1:8000/api/send-code', getSendCode);       
      openVerifyCode(); 
    };
    //CALL API VERIFY CODE
    const handleSubmitVerifyCode = async (event) => {
      event.preventDefault();
      console.log('Dữ liệu sẽ gửi đi:', sendVerifyCode);
  
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/verify-code', sendVerifyCode);
        
        // Kiểm tra phản hồi để xác định nếu mã xác thực hợp lệ
        if (response.data.success) {
          setMessage('Xác thực thành công!');
          setMessageType('success');
          openSetPassWord();
        }
      } catch (error) {
        console.error(error);
        setMessage('Mã xác thực không đúng. Vui lòng thử lại.');
        setMessageType('error');
      }
  
      setShowMessage(true); // Hiển thị thông báo
    };

// call api accept
const  handleSubmitPassWord = async (event) => {
  event.preventDefault();
  console.log('Dữ liệu sẽ gửi đi:', setSendPassWord);  
    const response = await axios.post('http://127.0.0.1:8000/api/set-password', setSendPassWord);       
    if (response.data) {
      // Lưu token vào localStorage
   
      window.location.href = '/Trang-chu';
  }
  };
// notification
    useEffect(() => {
      if (showMessage) {
        const timer = setTimeout(() => {
          setShowMessage(false);
          setMessage(''); // Reset thông báo sau khi 2 giây
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [showMessage]);


    /// mở form verify code
    const openVerifyCode = () => {
      SendCode(false); // Ẩn phần đăng ký
      VerifyCode(true); // Hiển thị phần đặt mật khẩu
    };
    // đóng form verify code 
  const closeVerifyCode = () => {
    SendCode(true); // hiện phần đăng ký
    VerifyCode(false); // ẩn phần đặt mật khẩu
  };
  // mỏ form password
  const openSetPassWord = () => {
    VerifyCode(false);
    SetPassWord(true);
  };
  //đóng form password
  const closePassWord = () =>{
    VerifyCode(true);
    SetPassWord(false);
  }

  return (
    <main className="Register">
      
      {sendCode && (
        <div className="Register_1">
          <div className="Register_1_1">
            <img src={images["logo.png"]} alt="Logo" />
            <h2>Tạo tài khoản của bạn</h2>
          </div>
          <form onSubmit={hhandleSubmit} className="RegisterForm">
            <input
              type="text"
              name="name"  // Thêm name để hàm handleChange hoạt động đúng
              placeholder="Tên của bạn"
              value={getSendCode.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"  // Thêm name
              placeholder="Email của bạn"
              value={getSendCode.email}
              onChange={handleChange}
              required
            />
            <div className="Register_1_1_1">
              <div>
                <span>Ngày sinh</span>
                <p>
                  Điều này sẽ không được hiển thị công khai. Xác nhận tuổi của
                  bạn, ngay cả khi tài khoản này dành cho doanh nghiệp, thú cưng
                  hoặc thứ gì khác.
                </p>
              </div>
              <input
                style={{
                  background: "white",
                  width: "150px",
                  borderRadius: "30px",
                  marginTop: "30px",
                  height: "90px",
                  color: "black",
                }}
                type="date"
                name="birth"  // Thêm name
                placeholder="Ngày sinh của bạn"
                value={getSendCode.birth}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Đăng ký</button>
          </form>
        </div>
      )}
      {verifyCode && (
        <div className="setPassWord">
          <div style={{ cursor: "pointer" }}>
            <i class="fa-solid fa-arrow-left" onClick={closeVerifyCode}></i>
          </div>
          <div className="Register_1_1">
            <img src={images["logo.png"]} alt="Logo" />
            <h2>Chúng tôi đã gửi mã cho bạn</h2>

            <span className="wer">Nhấp vào bên dưới đây để xác thực</span>
            <span></span>
          </div>
          <form
            onSubmit={handleSubmitVerifyCode}
            className="RegisterForm RegisterFormm"
          >
            <input
            
              type="text"
              name="code"
              placeholder="Mã của bạn"
              value={sendVerifyCode.code}
              onChange={hhandleChange}
              required
            />
            {showMessage && messageType === 'error' && (
          <span style={{ color: 'red',marginBottom:'15px',marginTop:'-15px' }}>{message}</span> // Hiển thị thông báo lỗi dưới input
        )}
            <span
              className="qwe"
            
            >
              Bạn không nhận được mã từ email?
            </span>
            <button type="submit">Tiếp Theo</button>
          </form>
        </div>
      )}
    {setPassWord && 
       <div className="acceptPassWord">
       <div style={{ cursor: "pointer" }}>
            <i class="fa-solid fa-arrow-left" onClick={closePassWord}></i>
          </div>
          <div className="Register_1_1">
            <img src={images["logo.png"]} alt="Logo" />
            <h2>Bạn sẽ cần có mật khẩu</h2>

            <span className="wer">Đảm bảo mật khẩu có 8 ký tự trở lên</span>
            <span></span>
          </div>
          <form onSubmit={handleSubmitPassWord} className="RegisterForm RegisterFormm">
      <div className="input-container">
        <input
        type={showPassword ? "text" : "password"} // Thay đổi loại input giữa text và password
          id="password"
          name="password"
          value={setSendPassWord.password}
          onChange={hhhandleChange}
          required
          placeholder=" "
        />
        <label htmlFor="password">Mật khẩu của bạn</label>
        <div className="hidden_show" onClick={toggleShowPassword}>
          {showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}
        </div>
      </div>
      <div className="input-container">
        <input
          type={showPasswordd ? "text" : "password"} 
          id="password_confirmation"
           name="password_confirmation"
          value={setSendPassWord.password_confirmation}
          onChange={hhhandleChange}
          required
          placeholder=" "
        />
        <label htmlFor="password-confirm">Xác nhận lại mật khẩu</label>
        <div className="hidden_show" onClick={toggleShowPasswordd}>
          {showPasswordd ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}
        </div>
      </div>
      <span
        className="qwe"
        style={{
          color: '#1D9BF0',
          marginTop: '-20px',
          fontSize: '15px',
          marginLeft: '60px',
          marginBottom: '40px',
        }}
      >
        Bạn không nhận được mã từ email?
      </span>
      <button type="submit">Tiếp Theo</button>
    </form>
       </div>
        }
    </main>
  );
}

export default Registery;
