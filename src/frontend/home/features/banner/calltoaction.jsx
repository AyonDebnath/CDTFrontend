import { Link } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";
import { useContext } from "react";

export default function CTA() {
  const auth = useContext(AuthContext);

  return (
    <div className="cta-area pb-40 pt-40">
      <div className="container">
        <div className="row">
          <div className="call-to-action text-left col-lg-10 col-12 mx-auto">
            {auth.isLoggedIn ? (
              <>
                <h3>Book Your Appoitment</h3>
                <Link to="/dashboard" className="btn transparent lesson-btn2">
                  Dashboard
                </Link>{" "}
              </>
            ) : (
              <>
                <h3>Signup and begin your driving journey</h3>
                <Link to="/sign-in" className="btn transparent lesson-btn2">
                  signup
                </Link>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
