import { useContext } from "react";
import { WindowContext } from "../../../shared/context/window-context";
import { AdminAuthContext } from "../../../shared/context/admin-auth-context";
import { Link, NavLink } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { MdAdminPanelSettings, MdEditCalendar } from "react-icons/md";

export default function AdminNav() {
  const wind = useContext(WindowContext);
  const auth = useContext(AdminAuthContext);

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
                to={`/admin/${auth.adminId}`}
              >
                <i className="ri-home-3-line"></i>
                <span data-key="dashboard">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                href="#sidebarCalendar"
                className="nav-link"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarCalendar"
                data-key="t-calender"
              >
                <FaHouseUser /> User Center
              </a>
              <div className="collapse menu-dropdown" id="sidebarCalendar">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <NavLink
                      to={`/admin/user-info/${auth.adminId}`}
                      className="nav-link"
                      data-key="t-main-calender"
                    >
                      {" "}
                      User Info{" "}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/admin/user-approve/${auth.adminId}`}
                      className="nav-link"
                      data-key="t-main-calender"
                    >
                      {" "}
                      Approve User{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                href="#sidebarAdmin"
                className="nav-link"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarAdmin"
                data-key="t-admin"
              >
                <MdAdminPanelSettings /> Admin Center
              </a>
              <div className="collapse menu-dropdown" id="sidebarAdmin">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <NavLink
                      to={`/admin/admin-create/${auth.adminId}`}
                      className="nav-link"
                      data-key="t-main-calender"
                    >
                      {" "}
                      Create Admin{" "}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/admin/admin-manage/${auth.adminId}`}
                      className="nav-link"
                      data-key="t-main-calender"
                    >
                      {" "}
                      Manage Admin{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                href="#sidebarApp"
                className="nav-link"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarApp"
                data-key="t-app"
              >
                <MdEditCalendar /> Appointment Center
              </a>
              <div className="collapse menu-dropdown" id="sidebarApp">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to={`/admin/appointment-manage/${auth.adminId}`}
                      className="nav-link"
                      data-key="t-main-calender"
                    >
                      {" "}
                      Manage Appointment{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-appointment/${auth.adminId}`}
              >
                <i className="ri-calendar-schedule-line"></i>
                <span data-key="settings">Appointment Center</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-course-details/${auth.adminId}`}
              >
                <i className="ri-graduation-cap-line"></i>
                <span data-key="settings">Course Details</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-payment-history/${auth.adminId}`}
              >
                <i className="ri-history-line"></i>
                <span data-key="settings">Payment History</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link menu-link"
                to={`/user-appointment-history/${auth.adminId}`}
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
