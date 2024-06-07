import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import validator from "validator";
import useForm from "../../../shared/hooks/form-hook";
import Input from "../../elements/form-elements/input";
import { useNavigate, useParams } from "react-router-dom";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { FadeLoader } from "react-spinners";
import { useState, useCallback } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function ResetForm() {
  const [formState, inputHandler] = useForm(
    {
      password: { value: "", isValid: false },
      confirmPassword: { value: "", isValid: false },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [pass, setPass] = useState("");
  const [finalPass, setFinalPass] = useState("");
  const [passError, setPassError] = useState();
  const [errorVisi, setErrorVisi] = useState(false);
  const [errorVisi2, setErrorVisi2] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [passType, setPasstype] = useState(true);

  const navigate = useNavigate();
  const token = useParams().token;

  const validatePass = useCallback(
    (value) => {
      setPass(value.trim());

      if (!validator.isEmpty(pass)) {
        if (
          validator.isStrongPassword(pass, {
            minLength: 2,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 0,
            minSymbols: 0,
          })
        ) {
          setErrorVisi(false);
          if (
            validator.isStrongPassword(pass, {
              minLength: 3,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 0,
            })
          ) {
            setErrorVisi(false);
            if (
              validator.isStrongPassword(pass, {
                minLength: 4,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
              })
            ) {
              setErrorVisi(false);
              if (validator.isLength(pass, { min: 8 })) {
                setErrorVisi(false);
                setFinalPass(pass);
              } else {
                setPassError("Password needs to have a minimum length of 8");
                setErrorVisi(true);
              }
            } else {
              setPassError("Enter atleast one symbol");
              setErrorVisi(true);
            }
          } else {
            setPassError("Enter atleast one number");
            setErrorVisi(true);
          }
        } else {
          setPassError("Enter atleast one Uppercase and one Lowercase");
          setErrorVisi(true);
        }
      } else {
        setErrorVisi(false);
      }
    },
    [pass]
  );

  const confirmPassword = useCallback(
    (value) => {
      const conPass = value.trim();

      if (conPass != "") {
        if (conPass === finalPass) {
          setErrorVisi2(false);
          setValidPass(true);
        } else {
          setErrorVisi2(true);
          setPassError("Password doesn't match");
          setValidPass(false);
        }
      } else {
        setErrorVisi2(false);
      }
    },
    [finalPass]
  );

  console.log(formState.isValid);

  async function submitHandler(event) {
    console.log(formState.inputs.password.value);
    event.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/reset-password`,
        "POST",
        JSON.stringify({
          password: formState.inputs.password.value,
          token: token,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      navigate("/success-reset");
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
                <p>Type in your new password and verify it</p>
              </div>
              <i className="icofont icofont-traffic-light"></i>
            </div>
          </div>
          <div className="row">
            {/* <!-- Sign In Form --> */}
            <div className="col-lg-4 col-sm-3"></div>
            <div className="contact-form form text-left col-lg-5 col-sm-6 col-12">
              <form id="reset-form" onSubmit={submitHandler}>
                <div className="input pass-div">
                  <Input
                    id="password"
                    onInput={inputHandler}
                    elem="input"
                    placeholder="Pasword"
                    type={`${passType ? "password" : "text"}`}
                    onType={validatePass}
                    errorText="Please enter a valid password to proceed"
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
                  <p
                    style={{ color: "red", marginTop: "20px" }}
                    className={`${errorVisi ? "" : "destroy"} `}
                  >
                    {passError}
                  </p>
                </div>
                <div className="input pass-div">
                  <Input
                    className={`${finalPass.length > 0 ? "" : "destroy"}`}
                    id="confirmPassword"
                    onInput={inputHandler}
                    onType={confirmPassword}
                    elem="input"
                    placeholder="Confirm Pasword"
                    type={`${passType ? "password" : "text"}`}
                    errorText="Please Enter Your Password"
                    validator={[VALIDATOR_REQUIRE()]}
                  />
                  <div className={`${finalPass.length ? "" : "destroy"} `}>
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
                  <p
                    style={{ color: "red", marginTop: "20px" }}
                    className={`${errorVisi2 ? "" : "destroy"} `}
                  >
                    {passError}
                  </p>
                </div>
                <div className="row">
                  <div className="col-5"></div>
                  <div className="col-6">
                    <div className="input input-submit">
                      <button
                        type="submit"
                        className="btn color submit-btn"
                        disabled={!validPass || !formState.isValid}
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
