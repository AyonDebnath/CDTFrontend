import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../../shared/context/auth-context";

export default function AlerAction() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [appData, setAppData] = useState();
  const [alerts, setAlerts] = useState();
  const userID = useParams().uid;
  const auth = useContext(AuthContext);

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
          if (
            elem.alerts[lengt - 1].alertText ===
              "Appointment Confirmed By Admin" ||
            elem.alerts[lengt - 1].alertText === "Awaiting Admin Confirmation"
          ) {
            alertBgColor = "bg-primary-subtle";
            alertColor = "text-primary";
            elemBtn = (
              <div className="col-lg-2 col-6">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#appointmentModal"
                  className="btn btn-primary btn-label"
                >
                  <i className="ri-user-smile-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                  View
                </button>
              </div>
            );
          } else if (elem.alerts[lengt - 1].alertText === "Payment Due") {
            alertBgColor = "bg-danger-subtle";
            alertColor = "text-danger";
            elemBtn = (
              <div className="col-lg-3 col-6">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#payModal"
                  className="btn btn-danger btn-label"
                >
                  <i className="ri-error-warning-line label-icon align-middle fs-16 me-2"></i>
                  Pay Now
                </button>
              </div>
            );
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
            elem.alerts[lengt - 1].alertText === "Assessment Score Updated" ||
            elem.alerts[lengt - 1].alertText === "Payment Received"
          ) {
            alertBgColor = "bg-success-subtle ";
            alertColor = "text-success";
            elemBtn = (
              <div className="col-lg-2 col-6">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#scoreModal"
                  className="btn btn-success btn-label"
                >
                  <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                  See Score
                </button>
              </div>
            );
          }

          const { alertText, time, date, _id } = elem.alerts[lengt - 1];

          newAlerts.push({
            alertText: alertText,
            time: time,
            date: date,
            bgColor: alertBgColor,
            txtColor: alertColor,
            elemButton: elemBtn,
            id: _id,
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
                    <div
                      className="mini-stats-wid d-flex align-items-center mt-3"
                      key={elem.id}
                    >
                      <div className="flex-shrink-0 avatar-sm">
                        <span
                          className={`${elem.bgColor} ${elem.txtColor} alert-span`}
                        >
                          {elem.date.length > 1 ? elem.date : 0 + elem.date}
                        </span>
                      </div>
                      <div className={`alert-div ${elem.bgColor} container`}>
                        <div className="row">
                          <div className="col-lg-5 col-6">
                            <h4 className={`mb-1 ${elem.txtColor} alert-text`}>
                              {elem.alertText}
                            </h4>
                          </div>
                          {elem.elemButton}
                          <div className="col-lg-4 text-right col-4 large-text">
                            <p className={`mb-0 ${elem.txtColor}`}>
                              {elem.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* <!-- end --> */}
              </div>
            ) : (
              <div className="card-body pt-0">
                {/* <!-- end --> */}
                <h4 className="text-center text-success">No alerts to show</h4>
              </div>
            )}
            {/* <!-- end cardbody --> */}
          </div>
          {/* <!-- end card --> */}
        </div>
      )}
    </>
  );
}
