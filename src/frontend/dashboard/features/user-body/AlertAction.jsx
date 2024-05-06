import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { InfoModalContext } from "../../context/infoModal-context";
import Appointment from "../modals/Appointment";

import React from "react";
import { ShowContext } from "../../../shared/context/show-context";
import { AssessmentModalContext } from "../../context/assessment-modal-context";
import Score from "../modals/Score";

export default function AlerAction() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [appData, setAppData] = useState();
  const [elementData, setElementData] = useState();
  const [alerts, setAlerts] = useState();
  const [ass, setAss] = useState();
  const [appID, setAppID] = useState();
  const userID = useParams().uid;
  const show = useContext(ShowContext);

  const [infoShow, setInfoShow] = useState(false);
  const navigate = useNavigate();

  const infoToggle = (val, elemData) => {
    setInfoShow(val);
    setElementData(elemData);
  };
  const assToggler = (val, appId) => {
    setAss(val);
    setAppID(appId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/appointment/all/${userID}`
        );
        setAppData(responseData.appointment);
        let newAlerts = [];
        const validApps =
          responseData.appointment &&
          responseData.appointment.filter((elem) => elem.status != "EXPIRED");
        validApps?.map((elem) => {
          let len = elem.alerts;
          let lengt = len.length;
          let alertColor;
          let alertBgColor;
          let elemBtn;
          let elemBtnClass;
          if (
            elem.alerts[lengt - 1].alertText === "Awaiting Admin Confirmation"
          ) {
            alertBgColor = "bg-primary-subtle";
            alertColor = "text-primary";
            elemBtn = (
              <>
                <i className="ri-user-smile-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                View
              </>
            );
            elemBtnClass = "btn-primary";
          } else if (elem.alerts[lengt - 1].alertText === "Payment Due") {
            alertBgColor = "bg-danger-subtle";
            alertColor = "text-danger";
            elemBtn = (
              <>
                <i className="ri-error-warning-line label-icon align-middle fs-16 me-2"></i>
                Pay Now
              </>
            );
            elemBtnClass = "btn-danger";
          } else if (
            elem.alerts[lengt - 1].alertText === "Appointment Tommorrow"
          ) {
            alertBgColor = "bg-warning-subtle";
            alertColor = "text-warning";
            elemBtn = (
              <div className="col-lg-2 col-6">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#confirmModal"
                  className="btn btn-warning btn-label"
                >
                  <i className="ri-error-warning-line label-icon align-middle fs-16 me-2 "></i>
                  Confirm
                </button>
              </div>
            );
          } else if (
            elem.alerts[lengt - 1].alertText === "Assessment Score Updated"
          ) {
            alertBgColor = "bg-success-subtle ";
            alertColor = "text-success";
            elemBtn = (
              <>
                <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                view
              </>
            );
            elemBtnClass = "btn-success";
          } else if (elem.alerts[lengt - 1].alertText === "Payment Received") {
            alertBgColor = "bg-success-subtle ";
            alertColor = "text-success";
            elemBtn = (
              <>
                <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                view
              </>
            );
            elemBtnClass = "btn-success";
          }
          const { alertText, time, date, _id } = elem.alerts[lengt - 1];
          const { id } = elem;

          newAlerts.push({
            alertText: alertText,
            time: time,
            date: date,
            bgColor: alertBgColor,
            txtColor: alertColor,
            elemButton: elemBtn,
            id: _id,
            appid: id,
            elementDet: elem,
            elemBtnClass: elemBtnClass,
          });
        });

        setAlerts(newAlerts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userID, sendRequest]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && appData?.length > 0 && (
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
      {appData?.length > 0 && !isLoading && (
        <InfoModalContext.Provider
          value={{ show: infoShow, showToggler: infoToggle }}
        >
          <AssessmentModalContext.Provider
            value={{ show: ass, showToggler: assToggler }}
          >
            <div className="col-xxl-8">
              <div className="card">
                <div className="card-header border-0">
                  <div></div>
                  <h4 className="card-title mb-0">Alerts</h4>
                </div>
                {/* <!-- end cardheader --> */}
                {alerts?.length > 0 ? (
                  <div className="card-body pt-0">
                    {alerts?.map((elem) => {
                      return (
                        <React.Fragment key={elem.id}>
                          <div className="mini-stats-wid d-flex align-items-center mt-3">
                            <div className="flex-shrink-0 avatar-sm">
                              <span
                                className={`${elem.bgColor} ${elem.txtColor} alert-span`}
                              >
                                {elem.date.length > 1
                                  ? elem.date
                                  : 0 + elem.date}
                              </span>
                            </div>
                            <div
                              className={`alert-div ${elem.bgColor} container`}
                            >
                              <div className="row">
                                <div className="col-lg-5 col-6">
                                  <h4
                                    className={`mb-1 ${elem.txtColor} alert-text`}
                                  >
                                    {elem.alertText}
                                  </h4>
                                </div>
                                <div className="col-lg-2 col-6">
                                  <button
                                    onClick={() => {
                                      if (
                                        elem.alertText ===
                                        "Awaiting Admin Confirmation"
                                      ) {
                                        infoToggle(true, elem.elementDet);
                                      } else if (
                                        elem.alertText === "Payment Due"
                                      ) {
                                        show.showToggler(true);
                                      } else if (
                                        elem.alertText === "Payment Received"
                                      ) {
                                        navigate(
                                          `/user-payment-history/${userID}`
                                        );
                                      } else if (
                                        elem.alertText ===
                                        "Assessment Score Updated"
                                      ) {
                                        assToggler(true, elem.appid);
                                      }
                                    }}
                                    className={`btn ${elem.elemBtnClass} btn-label`}
                                  >
                                    {elem.elemButton}
                                  </button>
                                </div>
                                <div className="col-lg-4 text-right col-4 large-text">
                                  <p className={`mb-0 ${elem.txtColor}`}>
                                    {elem.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                    {/* <!-- end --> */}
                  </div>
                ) : (
                  <div className="card-body pt-0">
                    {/* <!-- end --> */}
                    <h4 className="text-center text-success">
                      No alerts to show
                    </h4>
                  </div>
                )}
                {/* <!-- end cardbody --> */}
              </div>
              {/* <!-- end card --> */}
            </div>
            {appID && <Score appID={appID} />}
            <Appointment appData={elementData} />
          </AssessmentModalContext.Provider>
        </InfoModalContext.Provider>
      )}
    </>
  );
}
