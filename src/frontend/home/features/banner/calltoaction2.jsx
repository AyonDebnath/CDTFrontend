import { Link } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useContext } from "react";
import AssessmentText from "../home-body/assessmentText";

export default function CTA2() {
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="cta-area2 pb-40 pt-40">
        <div className="container">
          <div className="row">
            <div className="call-to-action text-left col-lg-10 col-12 mx-auto">
              {auth.isLoggedIn ? (
                <>
                  <>
                    <h3>Book Your Appoitment</h3>
                    <Link
                      to="/dashboard"
                      className="btn transparent lesson-btn1 custom-a"
                    >
                      Dashboard
                    </Link>{" "}
                  </>
                </>
              ) : (
                <>
                  <h3>
                    Book an <AssessmentText />{" "}
                  </h3>
                  <Link
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#bookingModal"
                    className="btn transparent lesson-btn1 custom-a"
                  >
                    Book
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
