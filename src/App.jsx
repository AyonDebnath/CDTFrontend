import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "./frontend/home/HomeLayout";
import Landing from "./frontend/home/pages/landing";
import About from "./frontend/home/pages/about";
import Service from "./frontend/home/pages/service";
import Contact from "./frontend/home/pages/contact";
import SignIn from "./frontend/home/pages/sign-in";
import { AuthContext } from "./frontend/shared/context/auth-context";
import { AdminAuthContext } from "./frontend/shared/context/admin-auth-context";
import { useState, useEffect } from "react";
import DashboardLayout from "./frontend/dashboard/DashboardLayout";
import Dashboard from "./frontend/dashboard/pages/dashboard";
import { WindowContext } from "./frontend/shared/context/window-context";
import Profile from "./frontend/dashboard/pages/Profile";
import AppointmentCenter from "./frontend/dashboard/pages/AppointmentCenter";
import CourseDetails from "./frontend/dashboard/pages/CourseDetails";
import PaymentHistory from "./frontend/dashboard/pages/PaymentHistory";
import AppointmentHistory from "./frontend/dashboard/pages/AppointmentHistory";
import ProfileSetting from "./frontend/dashboard/pages/ProfileSetting";
import { ShowContext } from "./frontend/shared/context/show-context";
import AdminLayout from "./frontend/admin/AdminLayout";
import AdminDashboard from "./frontend/admin/pages/Dashboard";
import Login from "./frontend/admin/pages/Login";
import UserInfo from "./frontend/admin/pages/UserInfo";
import UserApprove from "./frontend/admin/pages/UserApprove";
import AdminCreate from "./frontend/admin/pages/AdminCreate";
import AdminManage from "./frontend/admin/pages/AdminManage";
import AppManage from "./frontend/admin/pages/AppointmentManage";
import CourseCreate from "./frontend/admin/pages/CourseCreate";
import CourseInfo from "./frontend/admin/pages/CourseInfo";
import EditCourse from "./frontend/admin/pages/EditCourseDetails";

function App() {
  const [token, setToken] = useState();
  const [userTokenExpiration, setUserTokenExpiration] = useState();
  const [userId, setUserId] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [adminToken, setAdminToken] = useState(false);
  const [adminTokenExpiration, setAdminTokenExpiration] = useState();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const storedAdmin = JSON.parse(localStorage.getItem("adminData"));

    if (
      storedUser &&
      storedUser.token &&
      new Date(storedUser.expiration) > new Date()
    ) {
      login(
        storedUser.userId,
        storedUser.token,
        new Date(storedUser.expiration)
      );
    }

    if (
      storedAdmin &&
      storedAdmin.token &&
      new Date(storedAdmin.expiration) > new Date()
    ) {
      adminLogin(
        storedAdmin.adminId,
        storedAdmin.token,
        new Date(storedAdmin.expiration)
      );
    }
  }, []);

  function adminLogin(adminId, token, adminExpire) {
    const adminTokenExpiration =
      adminExpire || new Date(new Date().getTime() + 10000 * 60 * 60);
    setAdminId(adminId);
    setAdminTokenExpiration(adminTokenExpiration);
    localStorage.setItem(
      "adminData",
      JSON.stringify({
        adminId: adminId,
        token: token,
        expiration: adminTokenExpiration.toISOString(),
      })
    );
    setAdminToken(token);
  }

  function adminLogout() {
    setAdminId(null);
    setAdminToken(null);
    localStorage.removeItem("adminData");
  }

  function login(userID, token, userExpire) {
    setToken(token);
    const userTokenExpiration =
      userExpire || new Date(new Date().getTime() + 10000 * 60 * 60);
    setUserTokenExpiration(userTokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userID,
        token: token,
        expiration: userTokenExpiration.toISOString(),
      })
    );
    setUserId(userID);
  }

  function logout() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }

  const [navVisi, setNavVisi] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [navSwitch, setNavSwitch] = useState();
  const [show, setShow] = useState(false);
  function showToggler(val) {
    setShow(val);
  }
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (width >= 768) {
      setNavVisi(true);
      setNavSwitch(false);
    } else {
      setNavVisi(false);
      setNavSwitch(true);
    }
  }, [width]);

  function visiToggler() {
    setNavVisi(!navVisi);
  }

  function switchToggler() {
    setNavSwitch(!navSwitch);
  }
  let userLogOutTimer;
  let adminLogOutTimer;
  useEffect(() => {
    if (token && userTokenExpiration) {
      const remainingUserTime =
        userTokenExpiration.getTime() - new Date().getTime();
      userLogOutTimer = setTimeout(logout, remainingUserTime);
    } else {
      clearTimeout(userLogOutTimer);
    }
  });

  useEffect(() => {
    if (adminToken && adminTokenExpiration) {
      const remainingAdminTime =
        adminTokenExpiration.getTime() - new Date().getTime();
      adminLogOutTimer = setTimeout(logout, remainingAdminTime);
    } else {
      clearTimeout(adminLogOutTimer);
    }
  });

  let routes;
  let dashRoutes;
  let adminRoutes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );

    dashRoutes = (
      <>
        {" "}
        <Route path="/user-dashboard/:uid" element={<Dashboard />}></Route>
        <Route path="/user-profile/:uid" element={<Profile />}></Route>
        <Route
          path="/user-Appointment/:uid"
          element={<AppointmentCenter />}
        ></Route>
        <Route
          path="/user-course-details/:uid"
          element={<CourseDetails />}
        ></Route>
        <Route
          path="/user-payment-history/:uid"
          element={<PaymentHistory />}
        ></Route>
        <Route
          path="/user-appointment-history/:uid"
          element={<AppointmentHistory />}
        ></Route>
        <Route
          path="/user-profile-settings/:uid"
          element={<ProfileSetting />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else if (adminToken) {
    adminRoutes = (
      <>
        <Route path="/admin/:aid" element={<AdminDashboard />}></Route>
        <Route path="/admin/user-info/:aid" element={<UserInfo />}></Route>
        <Route
          path="/admin/user-approve/:aid"
          element={<UserApprove />}
        ></Route>
        <Route
          path="/admin/admin-create/:aid"
          element={<AdminCreate />}
        ></Route>
        <Route
          path="/admin/admin-manage/:aid"
          element={<AdminManage />}
        ></Route>
        <Route
          path="/admin/appointment-manage/:aid"
          element={<AppManage />}
        ></Route>
        <Route
          path="/admin/create-course/:aid"
          element={<CourseCreate />}
        ></Route>
        <Route
          path="/admin/manage-course/:aid"
          element={<CourseInfo />}
        ></Route>
        <Route
          path="/admin/edit-course/:aid/:cid"
          element={<EditCourse />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <ShowContext.Provider value={{ show: show, showToggler: showToggler }}>
        <AdminAuthContext.Provider
          value={{
            isAdminLoggedIn: !!adminToken,
            adminLogin: adminLogin,
            adminToken: adminToken,
            adminId: adminId,
            adminLogout: adminLogout,
          }}
        >
          <AuthContext.Provider
            value={{
              isLoggedIn: !!token,
              token: token,
              login: login,
              logout: logout,
              userId: userId,
            }}
          >
            <WindowContext.Provider
              value={{
                navVisi: navVisi,
                navSwitch: navSwitch,
                visiToggler: visiToggler,
                switchToggler: switchToggler,
              }}
            >
              <Routes>
                <Route element={<HomeLayout />}>{routes}</Route>
                <Route element={<DashboardLayout />}>{dashRoutes}</Route>
                <Route element={<AdminLayout />}>{adminRoutes}</Route>
              </Routes>
            </WindowContext.Provider>
          </AuthContext.Provider>
        </AdminAuthContext.Provider>
      </ShowContext.Provider>
    </BrowserRouter>
  );
}

export default App;
