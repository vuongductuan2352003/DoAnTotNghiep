import { useRoutes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeLayout from "./layouts/HomeLayout";
import TrangChu from "./pages/TrangChu/TrangChu";
import AddData from "./pages/AddData/AddData";
import GioiThieuWeb from "./pages/GioiThieuWeb/GioiThieuWeb";
import AddDataLayouts from "./layouts/AddDataLayout";
import Loading from "./pages/Loading/Loading";
import Login from "./pages/Account/Login/Login";
import Register from "./pages/Account/Register/Register";
import Data18_29 from "./pages/Data18_29/Data18_29";
import Data30_39 from "./pages/Data30_39/Data30_39";
import Data40_49 from "./pages/Data40_49/Data40_49";
import Data50up from "./pages/Data50+/Data50up";
import KhoaHoc from "./pages/KhoaHoc/KhoaHoc";
import ForgotPassword from "./pages/Account/ForgotPassword/ForgotPassword";
import Footer from "./components/Footer";
import GetData from "./pages/GetData/GetData";
import Step1 from "./pages/GetData/Step1";
import Step2 from "./pages/GetData/Step2";
import Step3 from "./pages/GetData/Step3";
import Step4 from "./pages/GetData/Step4";
import Step5 from "./pages/GetData/Step5";
import Step6 from "./pages/GetData/Step6";
import Step7 from "./pages/GetData/Step7";
import Step8 from "./pages/GetData/Step8";
import Step9 from "./pages/GetData/Step9";
import Step10 from "./pages/GetData/Step10";
import Step11 from "./pages/GetData/Step11";
const isAuth = () => Boolean(localStorage.getItem("access_token"));

function PublicRoute({ children }) {
  // nếu đã login, redirect về Trang-chu
  return !isAuth() ? children : <Navigate to="/Trang-chu" replace />;
}

function PrivateRoute({ children }) {
  // nếu chưa login, redirect về Login
  return isAuth() ? children : <Navigate to="/Login" replace />;
}

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}

export default function useRouteElements() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Hiển thị Loading 1.5s khi chuyển route
  useEffect(() => {
    // nếu đang trong /body-building/* thì bỏ qua loading
    if (location.pathname.startsWith("/body-building")) {
      return;
    }
    // còn lại vẫn show loading 1.5s
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [location]);
  const routes = useRoutes([
    // --- PUBLIC ROUTES (chưa đăng nhập) ---
    {
      path: "/",
      element: (
        <>
          <PageTitle title="Fitness & Health" />
          <AddDataLayouts>
            <GioiThieuWeb />
          </AddDataLayouts>
          <Footer></Footer>
        </>
      ),
    },

    {
      path: "/Login",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="Login" />
            <Login />
          </>
        </PublicRoute>
      ),
    },
    // register
    {
      path: "/Register",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="Register" />
            <Register />
          </>
        </PublicRoute>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <PageTitle title="Quên mật khẩu" />
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        </>
      ),
    },
    {
      path: "/body-building",
      element: (
        <AddDataLayouts>
          <GetData /> {/* Đây là wrapper với <Outlet> */}
        </AddDataLayouts>
      ),
      children: [
        { index: true, element: <Navigate to="step1" replace /> },
        { path: "step1", element: <Step1 /> },
        { path: "step2", element: <Step2 /> },
        { path: "step3", element: <Step3 /> },
        { path: "step4", element: <Step4 /> },
        { path: "step5", element: <Step5 /> },
        { path: "step6", element: <Step6 /> },
        { path: "step7", element: <Step7 /> },
        { path: "step8", element: <Step8 /> },
        { path: "step9", element: <Step9 /> },
        { path: "step10", element: <Step10 /> },
        { path: "step11", element: <Step11 /> },
        // … nếu còn bước 4,5… tiếp tục khai báo ở đây
      ],
    },

    // --- các route khác của bạn ---
    { path: "*", element: <Navigate to="/body-building" replace /> },
    // {
    //   path: '/body-building',
    //   element: (
    //     <PublicRoute>
    //       <>
    //         <PageTitle title="Body Building" />

    //         <AddDataLayouts><AddData /></AddDataLayouts>
    //       </>
    //     </PublicRoute>
    //   ),
    // },
    {
      path: "/set-body-18-29",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="18-29" />
            <AddDataLayouts>
              <Data18_29 />
            </AddDataLayouts>
          </>
        </PublicRoute>
      ),
    },
    {
      path: "/set-body-30-39",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="30-39" />
            <AddDataLayouts>
              <Data30_39 />
            </AddDataLayouts>
          </>
        </PublicRoute>
      ),
    },
    {
      path: "/set-body-40-49",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="40-49" />
            <AddDataLayouts>
              <Data40_49 />
            </AddDataLayouts>
          </>
        </PublicRoute>
      ),
    },
    {
      path: "/set-body-50up",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="50+" />
            <AddDataLayouts>
              <Data50up />
            </AddDataLayouts>
          </>
        </PublicRoute>
      ),
    },

    //trang chu -- auth

    {
      path: "/com",
      element: (
        <>
          <PageTitle title="Home Page" />
          <HomeLayout>
            <TrangChu />
          </HomeLayout>
        </>
      ),
    },
    {
      path: "/Khoa-Hoc",
      element: (
        <PrivateRoute>
          <>
            <PageTitle title="Khoa Học" />
            <KhoaHoc />
          </>
        </PrivateRoute>
      ),
    },

    // --- FALLBACK ---
    {
      path: "*",
      element: <Navigate to={isAuth() ? "/com" : "/Login"} replace />,
    },
  ]);

  return loading ? <Loading /> : routes;
}
