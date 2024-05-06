import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { PaymentModalContext } from "../../context/payment-context";
import { useParams } from "react-router-dom";
import AppointmentPay from "../modals/appointmentPay";

export default function AvailableCourses() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [courseData, setCourseData] = useState();
  const [userData, setUserData] = useState();
  const [pay, setPay] = useState();
  const [amount, setAmount] = useState();

  const userId = useParams().uid;

  const payToggler = (val) => {
    setPay(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/course/info/all`
        );
        setCourseData(responseData.course);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUserData = async () => {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userId}`
      );
      setUserData(responseData.user);
    };

    fetchData();
    fetchUserData();
  }, [sendRequest, userId]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <FadeLoader
          cssOverride={{
            height: "100%",
            position: "absolute",
            top: "40%",
            left: "50%",
            zIndex: "2000",
          }}
          color="#f43e18"
        />
      )}
      {!isLoading && courseData && userData && (
        <PaymentModalContext.Provider
          value={{ payNow: pay, payToggler: payToggler }}
        >
          <div className="container">
            <div className="row">
              {courseData.map((elem) => {
                return (
                  <div className="col-lg-6" key={elem.id}>
                    <div className="card pricing-box card-primary ribbon-box ribbon-fill text-center">
                      <div className="row g-0">
                        <div className="col-lg-6">
                          <div className="card-body h-100">
                            <div>
                              <h5 className="mb-1 text-white">{elem.name}</h5>
                            </div>

                            <div className="py-4">
                              <h2 className="text-white">
                                <sup>
                                  <small>$</small>
                                </sup>
                                {elem.price}{" "}
                                <span className="fs-13 text-white">/Total</span>
                              </h2>
                            </div>

                            <div className="text-center plan-btn mt-2">
                              <button
                                onClick={() => {
                                  payToggler(true);
                                  setAmount(elem.price);
                                }}
                                className="btn btn-soft-primary w-sm waves-effect waves-light"
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                          <AppointmentPay
                            userData={userData}
                            amount={parseInt(elem.price)}
                          />
                        </div>
                        {/* <!--end col--> */}
                        <div className="col-lg-6">
                          <div className="card-body border-start mt-4 mt-lg-0">
                            <div className="card-header bg-primary-subtle">
                              <h5 className="fs-15 mb-0 text-primary">
                                Plan Features:
                              </h5>
                            </div>
                            <div className="card-body pb-0">
                              <ul className="list-unstyled vstack gap-3 mb-0">
                                <li>
                                  <span className="text-white fw-semibold">
                                    Number of Lessons {elem.number}
                                  </span>
                                </li>
                                {elem.featureArray.map((el) => {
                                  return (
                                    <li key={elem.featureArray.indexOf(el)}>
                                      <span className="text-white fw-semibold">
                                        {el}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* <!--end col--> */}
                      </div>
                      {/* <!--end row--> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PaymentModalContext.Provider>
      )}
    </>
  );
}
