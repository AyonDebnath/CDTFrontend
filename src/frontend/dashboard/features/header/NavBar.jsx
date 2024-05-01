import { useContext } from "react";
import { WindowContext } from "../../../shared/context/window-context";
import { AuthContext } from "../../../shared/context/auth-context";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const wind = useContext(WindowContext);
  const auth = useContext(AuthContext);

  return (
    <div
      className={`${
        wind.navVisi ? "app-menu-visi" : "app-menu-left"
      } app-menu navbar-menu`}
    >
      {/* <!-- LOGO --> */}
      <div className="navbar-brand-box">
        {/* <!-- Light Logo--> */}
        <Link to="/" className="logo logo-light">
          <span className="logo-sm">
            <img src="/frontend/img/logo.png" alt="" height="15" />
          </span>
          <span className="logo-lg">
            <img src="/frontend/img/logo.png" alt="" height="37" />
          </span>
        </Link>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <span data-key="t-menu">Menu</span>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-dashboard/${auth.userId}`}
              >
                <i className="ri-home-3-line"></i>
                <span data-key="dashboard">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-profile/${auth.userId}`}
              >
                <i className="ri-user-4-line"></i>
                <span data-key="profile">Profile</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-profile-settings/${auth.userId}`}
              >
                <i className="ri-user-settings-line"></i>
                <span data-key="settings">Settings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-appointment/${auth.userId}`}
              >
                <i className="ri-calendar-schedule-line"></i>
                <span data-key="settings">Appointment Center</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-course-details/${auth.userId}`}
              >
                <i className="ri-graduation-cap-line"></i>
                <span data-key="settings">Course Details</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-payment-history/${auth.userId}`}
              >
                <i className="ri-history-line"></i>
                <span data-key="settings">Payment History</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-appointment-history/${auth.userId}`}
              >
                <i className="ri-history-line"></i>
                <span data-key="settings">Appointment History</span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <!-- Sidebar --> */}
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
}
