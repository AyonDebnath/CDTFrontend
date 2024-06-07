import { FaCheckCircle } from "react-icons/fa";
import Header from "../features/header/header";
import { Link } from "react-router-dom";

export default function SuccessReset() {
  return (
    <>
      <Header pageName="Password Reset Successful" />
      <div className="container pt-50 pb-50">
        <div className="pt-20 pb-20 text-center">
          <FaCheckCircle
            className="text-success text-center"
            style={{ fontSize: "150px" }}
          />
        </div>
        <div className="text-center pt-20 pb-20">
          <h2>Succesfully changed password</h2>
          <Link to="/sign-in" className="btn btn-success">
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
}
