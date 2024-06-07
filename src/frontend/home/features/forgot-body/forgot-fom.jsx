import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import useForm from "../../../shared/hooks/form-hook";
import Input from "../../elements/form-elements/input";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { FadeLoader } from "react-spinners";

export default function ForgotForm() {
  const [formState, inputHandler] = useForm(
    {
      input: { value: "", isValid: false },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/forget-password`,
        "POST",
        JSON.stringify({
          input: formState.inputs.input.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      navigate("/");
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
              <h3 className="heading">Reset Password</h3>
              <div className="excerpt">
                <p>
                  Type in your Email or Phone Number nassociated with the
                  account to reset your password
                </p>
              </div>
              <i className="icofont icofont-traffic-light"></i>
            </div>
          </div>
          <div className="row">
            {/* <!-- Sign In Form --> */}
            <div className="col-lg-4 col-sm-3"></div>
            <div className="contact-form form text-left col-lg-5 col-sm-6 col-12">
              <form id="signin-form" onSubmit={submitHandler}>
                <div className="input">
                  <Input
                    id="input"
                    onInput={inputHandler}
                    elem="input"
                    placeholder="Email/ Number"
                    type="text"
                    errorText="Please Enter Your Email/Number"
                    validator={[VALIDATOR_REQUIRE()]}
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
                        Reset
                      </button>
                    </div>
                  </div>
                  <div className="col-1"></div>
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
