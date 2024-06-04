import { FadeLoader } from "react-spinners";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import Score from "../modals/Score";
import { AssessmentModalContext } from "../../context/assessment-modal-context";

export default function CourseAssessment() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [assess, setAssess] = useState();
  const [ass, setAss] = useState();
  const auth = useContext(AuthContext);

  const assToggler = () => {
    setAss(!ass);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${
            import.meta.env.VITE_SERVER_NAME
          }api/dashboard/initial-assessment/${auth.userId}`
        );

        responseData.assess && setAssess(responseData.assess);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [auth, sendRequest]);

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
      {assess && (
        <AssessmentModalContext.Provider
          value={{ show: ass, showToggler: assToggler }}
        >
          <div className="col-lg-6">
            <div className="card card-success">
              <div className="card-body">
                <h4 className="card-text text-white text-center mt-2">
                  <span className="fw-medium">Your Assessment</span> is ready
                </h4>
                <p className="text-white text-center mt-4">
                  After your assessment we have carefully selected a course that
                  best fits your needs.
                </p>
                <p className="text-white text-center mt-4">
                  View your detailed assessment to better understand your course
                </p>
              </div>
              <div className="card-footer">
                <div className="text-center">
                  <a type="button" className="link-light" onClick={assToggler}>
                    View Assessment{" "}
                    <i className="ri-arrow-right-s-line align-middle lh-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <Score appID={assess?.appointmentId} />
          </div>
        </AssessmentModalContext.Provider>
      )}
    </>
  );
}
