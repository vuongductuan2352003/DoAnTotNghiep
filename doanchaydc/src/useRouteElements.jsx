import { useRoutes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeLayout from "./layouts/HomeLayout";
import HomeLayout2 from "./layouts/HomeLayout2";
import TrangChu from "./pages/TrangChu/TrangChu";
import AddData from "./pages/AddData/AddData";
import GioiThieuWeb from "./pages/GioiThieuWeb/GioiThieuWeb";
import AddDataLayouts from "./layouts/AddDataLayout";
import Loading from "./pages/Loading/Loading";
import Login from "./pages/Account/Login/Login";
import Register from "./pages/Account/Register/Register";


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
import Step12 from "./pages/GetData/Step12";
import Step13 from "./pages/GetData/Step13";
import Step14 from "./pages/GetData/Step14";
import Step15 from "./pages/GetData/Step15";
import Step16 from "./pages/GetData/Step16";
import Step17 from "./pages/GetData/Step17";
import Step18 from "./pages/GetData/Step18";
import Step19 from "./pages/GetData/Step19";
import Step20 from "./pages/GetData/Step20";
import Step21 from "./pages/GetData/Step21";
import Step22 from "./pages/GetData/Step22";
import Step23 from "./pages/GetData/Step23";
import Step24 from "./pages/GetData/Step24";
import Step25 from "./pages/GetData/Step25";
import Step26 from "./pages/GetData/Step26";
import Step27 from "./pages/GetData/Step27";
import Step28 from "./pages/GetData/Step28";
import Step29 from "./pages/GetData/Step29";
import Step30 from "./pages/GetData/Step30";
import Step31 from "./pages/GetData/Step31";
import Step32 from "./pages/GetData/Step32";
import Step33 from "./pages/GetData/Step33";
import Step34 from "./pages/GetData/Step34";
import Step35 from "./pages/GetData/Step35";
import Step36 from "./pages/GetData/Step36";
import Profile  from "./pages/Profile/Profile";
import Admin from "./pages/Admin/AdminPanel";

const isAuth = () => Boolean(localStorage.getItem("access_token"));

function PublicRoute({ children }) {
  const location = useLocation();
  const path = location.pathname;

  // Nếu đã đăng nhập, chỉ cho phép /com và /Khoa-Hoc
  if (isAuth() && path !== "/com" && path !== "/Khoa-Hoc") {
    return <Navigate to="/com" replace />;
  }
  return children;
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
    if (location.pathname.startsWith("/body-building")) {
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [location]);
  const routes = useRoutes([
    // --- PUBLIC ROUTES (chưa đăng nhập) ---
    {
      path: "/",
      element: (
        <PublicRoute>
          <>
            <PageTitle title="Fitness & Health" />
            <AddDataLayouts>
              <GioiThieuWeb />
            </AddDataLayouts>
            <Footer></Footer>
          </>
        </PublicRoute>
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
        <PublicRoute>
          <>
            <PageTitle title="Quên mật khẩu" />
            <ForgotPassword />
          </>
        </PublicRoute>
      ),
    },
    {
      path: "/body-building",
      element: (
        <PublicRoute>
          <AddDataLayouts>
            <GetData /> {/* Đây là wrapper với <Outlet> */}
          </AddDataLayouts>
        </PublicRoute>
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
        { path: "step12", element: <Step12 /> },
        { path: "step13", element: <Step13 /> },
        { path: "step14", element: <Step14 /> },
        { path: "step15", element: <Step15 /> },
        { path: "step16", element: <Step16 /> },
        { path: "step17", element: <Step17 /> },
        { path: "step18", element: <Step18 /> },
        { path: "step19", element: <Step19 /> },
        { path: "step20", element: <Step20 /> },
        { path: "step21", element: <Step21 /> },
        { path: "step22", element: <Step22 /> },
        { path: "step23", element: <Step23 /> },
        { path: "step24", element: <Step24 /> },
        { path: "step25", element: <Step25 /> },
        { path: "step26", element: <Step26 /> },
        { path: "step27", element: <Step27 /> },
        { path: "step28", element: <Step28 /> },
        { path: "step29", element: <Step29 /> },
        { path: "step30", element: <Step30 /> },
        { path: "step31", element: <Step31 /> },
        { path: "step32", element: <Step32 /> },
        { path: "step33", element: <Step33 /> },
        { path: "step34", element: <Step34 /> },
        { path: "step35", element: <Step35 /> },
        { path: "step36", element: <Step36 /> },
      ],
    },

  
   
    // ----------- CHỈ DÀNH CHO ĐÃ LOGIN -----------
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
     {
      path: "/Ho-So",
      element: (
        <PrivateRoute>
          <HomeLayout2>
            <PageTitle title="Profile" />
            <Profile />
          </HomeLayout2>
        </PrivateRoute>
      ),
    },

 {
      path: "/Admin",
      element: (
        <PrivateRoute>
          <>
            <PageTitle title="Quan Tri Vien" />
            <Admin/>
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
