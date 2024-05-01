import { useCallback, useState, useContext } from "react";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import useForm from "../../../shared/hooks/form-hook";
import Input from "../../elements/form-elements/input";
import Selector from "../../elements/form-elements/Selector";
import validator from "validator";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { AuthContext } from "../../../shared/context/auth-context";
import { FadeLoader } from "react-spinners";
import ErrorModal from "../../../shared/elements/ErrorModal";
import SuccessRequest from "../modals/successRequest";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

function SignUpModal() {
  const { isLoading, error, sendRequest, clearError, isSuccess, setIsSucess } =
    useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      fname: { value: "", isValid: false },
      lname: { value: "", isValid: false },
      gender: { value: "", isValid: false },
      address: { value: "", isValid: false },
      number: { value: "", isValid: false },
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
      confirmPassword: { value: "", isValid: false },
    },
    false
  );

  const [pass, setPass] = useState("");
  const [finalPass, setFinalPass] = useState("");
  const [passError, setPassError] = useState();
  const [errorVisi, setErrorVisi] = useState(false);
  const [errorVisi2, setErrorVisi2] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [passType, setPasstype] = useState(true);

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

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/signup`,
        "POST",
        JSON.stringify({
          fname: formState.inputs.fname.value,
          lname: formState.inputs.lname.value,
          email: formState.inputs.email.value,
          number: formState.inputs.number.value,
          gender: formState.inputs.gender.value,
          address: formState.inputs.address.value,
          password: formState.inputs.password.value,
          status: "PENDING",
          image:
            "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg",
        }),
        { "Content-Type": "application/json" }
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

  function successHandler() {
    setIsSucess(false);
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
      <SuccessRequest isSuccess={isSuccess} onClear={successHandler} />
      <div
        className=" modal modal-home fade"
        id="signupModal"
        aria-labelledby="signupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="container">
                <div className="row">
                  <div className="section-title text-center col-12 mb-45 pt-20">
                    <h3 className="heading">Sign Up</h3>
                    <i className="icofont icofont-traffic-light"></i>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icofont icofont-close-line"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="container pb-30 pt-10">
                <div className="row">
                  {/* <!-- Sign Up --> */}
                  <div className="col-lg-2"></div>
                  <div className="contact-form form text-left col-lg-9 col-sm-12">
                    <form id="signup-form" onSubmit={submitHandler}>
                      <div className="input-2">
                        <div className="input">
                          <Input
                            id="fname"
                            onInput={inputHandler}
                            elem="input"
                            placeholder="First Name"
                            type="text"
                            errorText="Please Enter a Valid First Name"
                            validator={[VALIDATOR_REQUIRE()]}
                          />
                        </div>
                        <div className="input">
                          <Input
                            id="lname"
                            onInput={inputHandler}
                            elem="input"
                            placeholder="Last Name"
                            type="text"
                            errorText="Please Enter a Valid Last Name"
                            validator={[VALIDATOR_REQUIRE()]}
                          />
                        </div>
                      </div>
                      <div className="input">
                        <Input
                          id="email"
                          onInput={inputHandler}
                          elem="input"
                          placeholder="Email"
                          type="text"
                          errorText="Please Enter a Valid Email"
                          validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        />
                      </div>
                      <div className="input">
                        <Input
                          id="number"
                          onInput={inputHandler}
                          elem="input"
                          placeholder="Your Phone Number"
                          type="text"
                          errorText="Please Enter a Valid Number"
                          validator={[VALIDATOR_REQUIRE()]}
                        />
                      </div>
                      <Selector
                        id="gender"
                        validator={[VALIDATOR_REQUIRE()]}
                        placeholder="Select your gender please"
                        selectArray={["Male", "Female", "Other"]}
                        onInput={inputHandler}
                        ClassName="mb-20"
                      />
                      <div className="input">
                        <Input
                          id="address"
                          onInput={inputHandler}
                          elem="input"
                          placeholder="Your Address"
                          type="text"
                          errorText="Please Enter a Valid Address"
                          validator={[VALIDATOR_REQUIRE()]}
                        />
                      </div>
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
                        <div
                          className={`${finalPass.length ? "" : "destroy"} `}
                        >
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
                        <div className="col-sm-3 col-4"></div>
                        <div className=" col-sm-6 col-4">
                          <div className="input input-submit sign-submit">
                            <button
                              type="submit"
                              className="btn color submit-btn"
                              data-bs-dismiss="modal"
                              disabled={!validPass || !formState.isValid}
                            >
                              Signup
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-3 col-4"></div>
                      </div>
                    </form>
                    <p className="form-messege"></p>
                  </div>
                  <div className="col-lg-2"></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-lg close-btn2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpModal;
