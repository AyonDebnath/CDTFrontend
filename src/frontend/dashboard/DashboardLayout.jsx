/* eslint-disable react/no-unescaped-entities */

import "./styling/css/icons.min.css";
import "./styling/css/app.min.css";
import "./styling/css/bootstrap.min.css";
import "./styling/css/custom.css";

import Header from "./features/header/Header";
import NavBar from "./features/header/NavBar";
import Footer from "./features/user-body/footer";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { WindowContext } from "../shared/context/window-context";

import { useHttpClient } from "../shared/hooks/http-hook";
import { useEffect } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { PaymentModalContext } from "./context/payment-context";
import AppointmentPay from "./features/modals/appointmentPay";

export default function DashboardLayout() {
  const wind = useContext(WindowContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const auth = useContext(AuthContext);
  const [pay, setPay] = useState(false);
  const [amount, setAmount] = useState();

  const warnings = {
    war1: (
      <p>
        You're paying <strong className="text-success">${amount}</strong>
      </p>
    ),
    war2: (
      <p>
        You're paying for an overDue<strong>Appointment</strong>
      </p>
    ),
    war3: (
      <p>
        There is no <strong>Refunds</strong> as you have already attended the
        lesson.
      </p>
    ),
    war4: (
      <p>
        If you have already made <strong>Payment</strong> to the instructor,
        please contact the instructor to approve the payment.
      </p>
    ),
    war5: <p>Please pay to use the dashboard.</p>,
    war6: (
      <p className="text-danger">DO NOT PAY TWICE UNDER ANY CIRCUMSTANCES.</p>
    ),
    war7: (
      <p className="text-danger">
        DO NOT GO OUT OF THIS MODAL WHILE PROCESSING
      </p>
    ),
  };

  const payToggler = (value) => {
    setPay(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchData = async () => {
        try {
          const responseData = await sendRequest(
            `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${
              auth.userId
            }`
          );
          setUserData(responseData.user);
          if (responseData?.user?.extraPay) {
            payToggler(true);
            setAmount(Math.abs(responseData.user.extraPay));
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    };

    fetchData();
  }, [auth, sendRequest]);

  return (
    <>
      <PaymentModalContext.Provider
        value={{ payNow: pay, payToggler: payToggler }}
      >
        <div id="layout-wrapper">
          <Header />
          {wind.navVisi && <NavBar />}
          <div
            className={`${wind.navVisi ? "main-content" : "main-content-full"}`}
            onClick={() => {
              wind.navSwitch && wind.visiToggler(false);
            }}
          >
            <div className="page-content">
              <div className="container-fluid">
                <Outlet />
                <Footer />
              </div>
            </div>
          </div>
          {amount && (
            <AppointmentPay
              userData={userData}
              amount={amount.toString()}
              warning={warnings}
              extraPay={pay}
            />
          )}
        </div>
      </PaymentModalContext.Provider>
    </>
  );
}
