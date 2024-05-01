import { VALIDATOR_REQUIRE } from "../../../../../public/frontend/validators";
import Input from "../../../home/elements/form-elements/input";
import useForm from "../../../shared/hooks/form-hook";
import validator from "validator";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";
import { useState, useCallback, useContext } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

export default function PasswordForm() {
  const [formState, inputHandler] = useForm(
    {
      oldPassword: {
        value: "",
        isValid: false,
      },
      newPassword: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
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
  const userID = useParams().uid;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
      const formDataPass = new FormData();

      formDataPass.append("oldPassword", formState.inputs.oldPassword.value);
      formDataPass.append("password", formState.inputs.newPassword.value);
      await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/dashboard/user/password/${userID}`,
        "PATCH",
        formDataPass,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate(`/user-dashboard/${userID}`);
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
      <form onSubmit={submitHandler}>
        <div className="row g-2">
          <div className="col-lg-4">
            <div className="pass-div">
              <label htmlFor="oldPassword" className="form-label">
                Old Password*
              </label>
              <Input
                elem="input"
                id="oldPassword"
                type={`${passType ? "password" : "text"}`}
                validator={[VALIDATOR_REQUIRE()]}
                placeholder="Enter Your Old Password"
                errorText="Enter a Valid Passowrd"
                className="form-control"
                onInput={inputHandler}
              />
              <BsEye
                onClick={() => {
                  setPasstype(false);
                }}
                className={`${passType ? "pass-visi-dashboard" : "destroy"}`}
              />
              <BsEyeSlash
                onClick={() => {
                  setPasstype(true);
                }}
                className={`${passType ? "destroy" : "pass-visi-dashboard"}`}
              />
            </div>
          </div>
          {/* <!--end col--> */}
          <div className="col-lg-4">
            <div className="pass-div">
              <label htmlFor="newPassword" className="form-label">
                New Password*
              </label>
              <Input
                elem="input"
                id="newPassword"
                type={`${passType ? "password" : "text"}`}
                validator={[VALIDATOR_REQUIRE()]}
                onType={validatePass}
                placeholder="Enter Your New Password"
                errorText="Enter a Valid Passowrd"
                className="form-control"
                onInput={inputHandler}
              />
              <BsEye
                onClick={() => {
                  setPasstype(false);
                }}
                className={`${passType ? "pass-visi-dashboard" : "destroy"}`}
              />
              <BsEyeSlash
                onClick={() => {
                  setPasstype(true);
                }}
                className={`${passType ? "destroy" : "pass-visi-dashboard"}`}
              />
              <p
                style={{ color: "red", marginTop: "20px" }}
                className={`${errorVisi ? "" : "destroy"} `}
              >
                {passError}
              </p>
            </div>
          </div>
          {/* <!--end col--> */}
          <div className="col-lg-4">
            <div className="pass-div">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password*
              </label>
              <Input
                elem="input"
                id="confirmPassword"
                type={`${passType ? "password" : "text"}`}
                onType={confirmPassword}
                validator={[VALIDATOR_REQUIRE()]}
                placeholder="Confirm Password"
                errorText="Enter a Valid Passowrd"
                className="form-control"
                onInput={inputHandler}
              />
              <BsEye
                onClick={() => {
                  setPasstype(false);
                }}
                className={`${passType ? "pass-visi-dashboard" : "destroy"}`}
              />
              <BsEyeSlash
                onClick={() => {
                  setPasstype(true);
                }}
                className={`${passType ? "destroy" : "pass-visi-dashboard"}`}
              />
              <p
                style={{ color: "red", marginTop: "20px" }}
                className={`${errorVisi2 ? "" : "destroy"} `}
              >
                {passError}
              </p>
            </div>
          </div>
          {/* <!--end col--> */}
          <div className="col-lg-12">
            <div className="mb-3">
              <a href="#" className="link-primary text-decoration-underline">
                Forgot Password ?
              </a>
            </div>
          </div>
          {/* <!--end col--> */}
          <div className="col-lg-12">
            <div className="text-end">
              <button
                type="submit"
                disabled={!formState.isValid || !validPass}
                className="btn btn-success"
              >
                Change Password
              </button>
            </div>
          </div>
          {/* <!--end col--> */}
        </div>
        {/* <!--end row--> */}
      </form>
    </>
  );
}
