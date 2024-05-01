/* eslint-disable react/no-unescaped-entities */

import "./styling/css/icons.min.css";
import "./styling/css/app.min.css";
import "./styling/css/bootstrap.min.css";
import "./styling/css/custom.css";

import Header from "./features/header/Header";
import NavBar from "./features/header/NavBar";
import Footer from "./features/user-body/footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { WindowContext } from "../shared/context/window-context";

export default function DashboardLayout() {
  const wind = useContext(WindowContext);
  return (
    <>
      <div id="layout-wrapper">
        <Header />
        {wind.navVisi && <NavBar />}
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
