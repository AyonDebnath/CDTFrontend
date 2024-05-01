import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../../shared/context/auth-context";

export default function AlerAction() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [appData, setAppData] = useState();
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
            <div className="card-body pt-0">
              <div className="mini-stats-wid d-flex align-items-center mt-3">
                <div className="flex-shrink-0 avatar-sm">
                  <span className="bg-danger-subtle text-danger alert-span">
                    09
                  </span>
                </div>
                <div className="alert-div bg-danger-subtle container">
                  <div className="row">
                    <div className="col-lg-5 col-6">
                      <h4 className="mb-1 text-danger alert-text">
                        Payment Due
                      </h4>
                    </div>
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
                    <div className="col-lg-4 text-right col-4 large-text">
                      <p className="mb-0 text-danger">
                        9:20 <span className="text-uppercase">am</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              <div className="mini-stats-wid d-flex align-items-center mt-3">
                <div className="flex-shrink-0 avatar-sm">
                  <span className="bg-warning-subtle text-warning alert-span">
                    10
                  </span>
                </div>
                <div className="alert-div bg-warning-subtle container">
                  <div className="row">
                    <div className="col-lg-5 col-6">
                      <h4 className="mb-1 text-warning alert-text">
                        Appointment Tomorrow
                      </h4>
                    </div>
                    <div className="col-lg-3 col-6">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#confirmModal"
                        className="btn btn-warning btn-label"
                      >
                        <i className="ri-error-warning-line label-icon align-middle fs-16 me-2"></i>
                        Confirm
                      </button>
                    </div>
                    <div className="col-lg-4 text-right col-4 large-text">
                      <p className="mb-0 text-warning">
                        9:20 <span className="text-uppercase">am</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              <div className="mini-stats-wid d-flex align-items-center mt-3">
                <div className="flex-shrink-0 avatar-sm">
                  <span className="bg-primary-subtle text-primary alert-span">
                    07
                  </span>
                </div>
                <div className="alert-div bg-primary-subtle container">
                  <div className="row">
                    <div className="col-lg-5 col-6">
                      <h4 className="mb-1 text-primary alert-text">
                        Appointment Confirmed
                      </h4>
                    </div>
                    <div className="col-lg-3 col-6">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#appointmentModal"
                        className="btn btn-primary btn-label"
                      >
                        <i className="ri-user-smile-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        View
                      </button>
                    </div>
                    <div className="col-lg-4 text-right col-4 large-text">
                      <p className="mb-0 text-primary">
                        9:20 <span className="text-uppercase">am</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              <div className="mini-stats-wid d-flex align-items-center mt-3">
                <div className="flex-shrink-0 avatar-sm">
                  <span className="bg-success-subtle text-success alert-span">
                    01
                  </span>
                </div>
                <div className="alert-div bg-success-subtle container">
                  <div className="row">
                    <div className="col-lg-5 col-6">
                      <h4 className="mb-1 text-success alert-text">
                        Assessment Score Updated
                      </h4>
                    </div>
                    <div className="col-lg-3 col-6">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#scoreModal"
                        className="btn btn-success btn-label"
                      >
                        <i className="ri-check-double-line label-icon align-middle rounded-pill fs-16 me-2"></i>
                        See Score
                      </button>
                    </div>
                    <div className="col-lg-4 text-right col-4 large-text">
                      <p className="mb-0 text-success">
                        9:20 <span className="text-uppercase">am</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
            </div>
            {/* <!-- end cardbody --> */}
          </div>
          {/* <!-- end card --> */}
        </div>
      )}
    </>
  );
}
