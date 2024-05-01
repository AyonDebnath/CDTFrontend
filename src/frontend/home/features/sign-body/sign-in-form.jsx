import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import useForm from "../../../shared/hooks/form-hook";
import Input from "../../elements/form-elements/input";
import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { FadeLoader } from "react-spinners";

function SignInForm() {
  const [formState, inputHandler] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const [passType, setPasstype] = useState(true);
  const auth = useContext(AuthContext);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/login`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      auth.login(responseData.userId, responseData.token);

      navigate("/user-dashboard/" + responseData.userId);
    } catch (err) {
      console.log(err);
    }
  }

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
      <div id="contact-area" className="contact-area bg-gray">
        <div className="container pb-90 pt-90">
          {/* <!-- Section Title --> */}
          <div className="row">
            <div className="section-title text-center col-12 mb-45">
              <h3 className="heading">Sign In</h3>
              <div className="excerpt">
                <p>Sign into your account to schedule appointments.</p>
              </div>
              <i className="icofont icofont-traffic-light"></i>
            </div>
          </div>
          <div className="row">
            {/* <!-- Sign In Form --> */}
            <div className="col-lg-4 col-sm-3"></div>
            <div className="contact-form form text-left col-lg-4 col-sm-6 col-12">
              <form id="signin-form" onSubmit={submitHandler}>
                <div className="input">
                  <Input
                    id="email"
                    onInput={inputHandler}
                    elem="input"
                    placeholder="Email"
                    type="text"
                    errorText="Please Enter Your Email"
                    validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                  />
                </div>
                <div className="input pass-div">
                  <Input
                    id="password"
                    onInput={inputHandler}
                    elem="input"
                    placeholder="Pasword"
                    type={`${passType ? "password" : "text"}`}
                    errorText="Please Enter Your Password"
                    validator={[VALIDATOR_REQUIRE()]}
                  />
                  <BsEye
                    onClick={() => {
                      setPasstype(false);
                    }}
                    className={`${passType ? "pass-visi" : "destroy"}`}
                  />
                  <BsEyeSlash
                    onClick={() => {
                      setPasstype(true);
                    }}
                    className={`${passType ? "destroy" : "pass-visi"}`}
                  />
                </div>
                <div className="row">
                  <div className="col-5"></div>
                  <div className="col-6">
                    <div className="input input-submit">
                      <button
                        type="submit"
                        className="btn color submit-btn"
                        disabled={!formState.isValid}
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <p className="signup-text">
                    Don't have an account?{" "}
                    <a
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#signupModal"
                      className="signup-link"
                    >
                      Signup now
                    </a>
                  </p>
                </div>
              </form>
              <p className="form-messege"></p>
            </div>
            <div className="col-lg-4 col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
