/* eslint-disable react/no-unescaped-entities */

import "../dashboard/styling/css/icons.min.css";
import "../dashboard/styling/css/app.min.css";
import "../dashboard/styling/css/bootstrap.min.css";
import "../dashboard/styling/css/custom.css";

import AdminNav from "./features/header/AdminNav";
import Footer from "../dashboard/features/user-body/footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { WindowContext } from "../shared/context/window-context";
import AdminHeader from "./features/header/AdminHeader";

export default function AdminLayout() {
  const wind = useContext(WindowContext);
  return (
    <>
      <div id="layout-wrapper">
        <AdminHeader />
        {wind.navVisi && <AdminNav />}
        <div
          className={`${wind.navVisi ? "main-content" : "main-content-full"}`}
          onClick={wind.navSwitch ? wind.visiToggler : () => {}}
        >
          <div className="page-content">
            <div className="container-fluid">
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
