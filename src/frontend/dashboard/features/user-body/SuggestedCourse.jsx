import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { Link, useParams } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

export default function SuggestedCourse() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const [courseData, setCourseData] = useState();
  const userID = useParams().uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );

        setUserData(responseData.user);

        try {
          const responseData2 = await sendRequest(
            `${import.meta.env.VITE_SERVER_NAME}api/dashboard/course/info/${
              responseData.user.suggestedCourse
            }`
          );
          setCourseData(responseData2.course);
        } catch (err) {
          console.log(err);
        }
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
      {!isLoading && courseData && (
        <div className="col-lg-6">
          {/* <!-- Accordions with Icons --> */}
          <div className="card card-warning">
            <div className="card-header d-flex align-items-center">
              <h4 className="card-title mb-0 flex-grow-1">{courseData.name}</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-item-warning">
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Number of lessons : {courseData.number}
                </li>
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Duration of each lesson : {courseData.duration} hours
                </li>
                <li className="list-group-item">
                  <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                  Price of the course: {courseData.price}
                </li>
              </ul>
              <div className="d-grid gap-2 mt-3">
                <Link
                  to={`/user-course-details/${userData?.id}`}
                  className="btn btn-soft-warning btn-label"
                  type="button"
                >
                  <i className="label-icon align-middle fs-16 me-2"></i>
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
