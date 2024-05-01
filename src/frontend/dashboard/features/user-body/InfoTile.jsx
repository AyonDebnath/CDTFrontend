import { GrCertificate, GrScorecard } from "react-icons/gr";
import { IoMdClock } from "react-icons/io";
import AlerAction from "./AlertAction";
import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../../shared/context/auth-context";
import { TbTilde } from "react-icons/tb";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function InfoTile() {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const userID = useParams().uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );

        setUserData(responseData.user);
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
      <div className="row project-wrapper">
        <div className="col-xxl-12">
          <div className="row">
            <div className="col-xl-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-primary-subtle text-primary rounded-2 fs-2">
                        <GrCertificate />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Active Course
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        {!userData?.activeCourse ? (
                          <h4 className="fs-4 flex-grow-1 mb-0">
                            <span>N/A</span>
                          </h4>
                        ) : (
                          <h4 className="fs-4 flex-grow-1 mb-0">
                            <span>{userData?.activeCourse}</span>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
            </div>
            {/* <!-- end col --> */}

            <div className="col-xl-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-warning-subtle text-warning rounded-2 fs-2">
                        <GrScorecard />
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <p className="text-uppercase fw-medium text-muted mb-3">
                        Latest Score
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        {!userData?.latestScore ? (
                          <>
                            <h4 className="fs-4 flex-grow-1 mb-0">
                              <span>N/A</span>
                            </h4>
                            <span
                              className={`badge ${
                                userData?.scoreIndicator
                                  ? userData?.scoreIndicator >= 0
                                    ? "bg-success-subtle text-success"
                                    : "bg-warning-subtle text-warning"
                                  : "bg-primary-subtle text-muted"
                              }  fs-12`}
                            >
                              {userData?.scoreIndicator ? (
                                userData?.scoreIndicator >= 0 ? (
                                  <MdKeyboardArrowUp />
                                ) : (
                                  <MdKeyboardArrowDown />
                                )
                              ) : (
                                <TbTilde />
                              )}
                              N/A
                            </span>
                          </>
                        ) : (
                          <h4 className="fs-4 flex-grow-1 mb-0">
                            <span>{userData?.latestScore}</span>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
            </div>
            {/* <!-- end col --> */}

            <div className="col-xl-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-info-subtle text-info rounded-2 fs-2">
                        <IoMdClock />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Total Hours
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        {!userData?.totalhour ? (
                          <>
                            <h4 className="fs-4 flex-grow-1 mb-0">
                              <span>N/A</span>
                            </h4>
                            <span
                              className={`badge ${
                                userData?.hourIndicator
                                  ? userData?.hourIndicator >= 0
                                    ? "bg-success-subtle text-success"
                                    : "bg-warning-subtle text-warning"
                                  : "bg-primary-subtle text-muted"
                              }  fs-12`}
                            >
                              {userData?.hourIndicator ? (
                                userData?.hourIndicator >= 0 ? (
                                  <MdKeyboardArrowUp />
                                ) : (
                                  <MdKeyboardArrowDown />
                                )
                              ) : (
                                <TbTilde />
                              )}
                              N/A
                            </span>
                          </>
                        ) : (
                          <h4 className="fs-4 flex-grow-1 mb-0">
                            <span>{userData?.hourIndicator}</span>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
            </div>
            {/* <!-- end col --> */}
          </div>
          {/* <!-- end row --> */}
        </div>
        {/* <!-- end col --> */}

        <AlerAction />
        {/* <!-- end col --> */}
      </div>
    </>
  );
}
