import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Link, useParams } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../../shared/context/auth-context";

export default function SuggestedCourse() {
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
      {!isLoading && userData?.suggestedCourse && (
        <div className="col-lg-6">
          {/* <!-- Accordions with Icons --> */}
          <div className="card card-warning">
            <div className="card-header d-flex align-items-center">
              <h4 className="card-title mb-0 flex-grow-1">Suggested Course</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-item-warning">
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Send the billing agreement
                </li>
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Send over all the documentation.
                </li>
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Meeting with daron to review the intake form
                </li>
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Check uikings theme and give customer support
                </li>
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Start making a presentation
                </li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Link
                  to="/course-details"
                  className="btn btn-soft-warning btn-label"
                  type="button"
                >
                  <i className="ri-check-double-line label-icon align-middle fs-16 me-2"></i>
                  View Suggested Course Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
