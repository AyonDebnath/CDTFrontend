import { useNavigate } from "react-router-dom";
import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useContext, useState } from "react";
import { AdminAuthContext } from "../../shared/context/admin-auth-context";
import ErrorModal from "../../shared/elements/ErrorModal";
import Input from "../../home/elements/form-elements/input";
import { FadeLoader } from "react-spinners";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../public/frontend/validators";

export default function Login() {
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
  const adminAuth = useContext(AdminAuthContext);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/login`,
        "POST",
        formData,
        { Authorization: "Bearer " + adminAuth.token }
      );

      adminAuth.adminLogin(responseData.adminId, responseData.token);

      navigate("/admin/" + responseData.adminId);
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
      <div className="auth-page-wrapper pt-5">
        {/* <!-- auth page bg --> */}
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>

          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div>

        {/* <!-- auth page content --> */}
        <div className="auth-page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <a href="index.html" className="d-inline-block auth-logo">
                      <img
                        src="assets/images/logo-light.png"
                        alt=""
                        height="20"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end row --> */}

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card mt-4 card-bg-fill">
                  <div className="card-body p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Admin Dashboard.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={submitHandler}>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Email
                          </label>
                          <Input
                            id="email"
                            onInput={inputHandler}
                            elem="input"
                            placeholder="Email"
                            className="form-control"
                            type="text"
                            errorText="Please Enter Your Email"
                            validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              id="password"
                              onInput={inputHandler}
                              elem="input"
                              className="form-control"
                              placeholder="Pasword"
                              type={`${passType ? "password" : "text"}`}
                              errorText="Please Enter Your Password"
                              validator={[VALIDATOR_REQUIRE()]}
                            />
                            <BsEye
                              onClick={() => {
                                setPasstype(false);
                              }}
                              className={`${
                                passType ? "pass-visi" : "destroy"
                              }`}
                            />
                            <BsEyeSlash
                              onClick={() => {
                                setPasstype(true);
                              }}
                              className={`${
                                passType ? "destroy" : "pass-visi"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                            disabled={!formState.isValid}
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* <!-- end card body --> */}
                </div>
                {/* <!-- end card --> */}
              </div>
            </div>
            {/* <!-- end row --> */}
          </div>
          {/* <!-- end container --> */}
        </div>
        {/* <!-- end auth page content --> */}

        {/* <!-- footer --> */}
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 text-muted">2024 &copy; ShaswataWeb</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- end Footer --> */}
      </div>
    </>
  );
}
