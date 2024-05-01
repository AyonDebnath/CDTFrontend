import ErrorModal from "../../shared/elements/ErrorModal";
import Input from "../../home/elements/form-elements/input";
import Selector from "../../home/elements/form-elements/Selector";

import useForm from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useContext, useState } from "react";
import { AdminAuthContext } from "../../shared/context/admin-auth-context";

import { FadeLoader } from "react-spinners";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../public/frontend/validators";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminCreate() {
  const [profilefile, setProfileFile] = useState();
  const [profilePreview, setProfilePreview] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      role: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const adminId = useParams().aid;
  const adminAuth = useContext(AdminAuthContext);
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("number", formState.inputs.number.value);
      formData.append("role", formState.inputs.role.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", profilefile);
      const responseData = await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/admin/signup`,
        "POST",
        formData,
        { Authorization: "Bearer " + adminAuth.adminToken }
      );

      navigate(`/admin/${adminId}`);
    } catch (err) {
      console.log(err);
    }
  }

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setProfileFile(pickedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfilePreview(fileReader.result);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

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
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4>Create An Admin</h4>
            </div>
            <div className="card-body">
              {/* <!-- Input with Placeholder --> */}
              <form onSubmit={submitHandler}>
                <div className="row g-3">
                  <div className="form-floating">
                    <Input
                      id="name"
                      elem="input"
                      type="text"
                      placeholder="Please Enter Admin Name"
                      className="form-control"
                      errorText="Please Enter a Valid Admin Name"
                      validator={[VALIDATOR_REQUIRE()]}
                      onInput={inputHandler}
                    />
                    <label htmlFor="street">Admin Name</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      id="email"
                      elem="input"
                      type="text"
                      placeholder="Please Enter the Email Address"
                      className="form-control"
                      errorText="Please Enter a Valid Email Address"
                      onInput={inputHandler}
                      validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    />
                    <label htmlFor="city">Email</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      elem="input"
                      id="number"
                      type="text"
                      className="form-control"
                      placeholder="Please Enter a Valid Number"
                      validator={[VALIDATOR_REQUIRE()]}
                      onInput={inputHandler}
                    />
                    <label htmlFor="zipCode">Number</label>
                  </div>
                  <div className="form-floating">
                    <Selector
                      id="role"
                      validator={[VALIDATOR_REQUIRE()]}
                      placeholder="Select admin role"
                      selectArray={["SUPER", "INSTRUCTOR"]}
                      onInput={inputHandler}
                      ClassName="mb-20"
                    />
                    <label htmlFor="zipCode">Role</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      elem="input"
                      id="password"
                      type="text"
                      className="form-control"
                      placeholder="Please Enter a Valid Password"
                      validator={[VALIDATOR_REQUIRE()]}
                      onInput={inputHandler}
                    />
                    <label htmlFor="zipCode">Password</label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      className="rounded-circle avatar-xl img-thumbnail user-profile-image material-shadow"
                      alt="user-profile-image"
                    />
                  ) : (
                    <img
                      src="https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"
                      className="rounded-circle avatar-xl img-thumbnail user-profile-image material-shadow"
                      alt="user-profile-image"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="formFile" className="form-label">
                    Upload Admin Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={pickedHandler}
                  />
                </div>

                <div className="col-lg-12">
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!formState.isValid}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </>
  );
}
