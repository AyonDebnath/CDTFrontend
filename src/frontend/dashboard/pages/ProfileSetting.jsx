import PasswordForm from "../features/profile/PasswordForm";
import PageTitle from "../features/user-body/PageTitle";
import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

import useForm from "../../shared/hooks/form-hook";

import Input from "../../home/elements/form-elements/input";

import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../public/frontend/validators";
import { useNavigate } from "react-router-dom";

export default function ProfileSetting() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const [comp, setComp] = useState();
  const [profilefile, setProfileFile] = useState();
  const [profileIsValid, setProfileIsValid] = useState();
  const [profilePreview, setProfilePreview] = useState();
  const [Coverfile, setCoverFile] = useState();
  const [covereIsValid, setCoverIsValid] = useState();
  const [coverPreview, setCoverPreview] = useState();
  const userID = useParams().uid;
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      zipcode: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
      lname: {
        value: "",
        isValid: false,
      },
      fname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );
        setUserData(responseData.user);
        responseData.user && handleUser(responseData.user);

        responseData.user &&
          setFormData(
            {
              description: {
                value: responseData.user.about,
                isValid: responseData.user.about ? true : false,
              },
              zipcode: {
                value: responseData.user.zipcode,
                isValid: responseData.user.zipcode ? true : false,
              },
              country: {
                value: responseData.user.country,
                isValid: responseData.user.country ? true : false,
              },
              city: {
                value: responseData.user.city,
                isValid: responseData.user.city ? true : false,
              },
              email: {
                value: responseData.user.email,
                isValid: true,
              },
              number: {
                value: responseData.user.number,
                isValid: true,
              },
              lname: {
                value: responseData.user.lname,
                isValid: true,
              },
              fname: {
                value: responseData.user.fname,
                isValid: true,
              },
              profileImage: {
                value: profilefile,
                isValid: profileIsValid,
              },
              coverImage: {
                value: Coverfile,
                isValid: covereIsValid,
              },
            },
            false
          );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [
    sendRequest,
    userID,
    setFormData,
    profilefile,
    profileIsValid,
    Coverfile,
    covereIsValid,
  ]);

  function errorHandler() {
    clearError();
    window.location.reload();
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fname", formState.inputs.fname.value);
      formData.append("lname", formState.inputs.lname.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("number", formState.inputs.number.value);
      formData.append("city", formState.inputs.city.value);
      formData.append("zipcode", formState.inputs.zipcode.value);
      formData.append("country", formState.inputs.country.value);
      formData.append("about", formState.inputs.description.value);
      formData.append("gender", userData.gender);
      formData.append("address", userData.address);
      formData.append("status", userData.status);
      formData.append("password", userData.password);
      formData.append("profileImage", formState.inputs.profileImage.value);
      formData.append("coverImage", formState.inputs.coverImage.value);
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`,
        "PATCH",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      navigate(`/user-dashboard/${userID}`);
    } catch (err) {
      console.log(err);
    }
  }

  function handleUser(userD) {
    let count = 7;
    if (userD.about) {
      count = count + 1;
    } else if (userD.coverImage) {
      count = count + 1;
    }

    count = (count / 12) * 100;

    setComp(count);
  }

  const pickedHandler = (event, imageType) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      if (imageType === "COVER IMAGE") {
        pickedFile = event.target.files[0];
        setCoverFile(pickedFile);
        setCoverIsValid(true);
        const fileReader1 = new FileReader();
        fileReader1.onload = () => {
          setCoverPreview(fileReader1.result);
        };
        fileReader1.readAsDataURL(event.target.files[0]);
      } else {
        pickedFile = event.target.files[0];
        setProfileFile(pickedFile);
        setProfileIsValid(true);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setProfilePreview(fileReader.result);
        };
        fileReader.readAsDataURL(event.target.files[0]);
      }
    }
  };

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
      {!isLoading && userData && (
        <>
          {" "}
          <PageTitle pageName="Profile Settings" />
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              {coverPreview ? (
                <img src={coverPreview} className="profile-wid-img" alt="" />
              ) : (
                <img
                  src={`${userData.coverImageURL}`}
                  className="profile-wid-img"
                  alt=""
                />
              )}
              <div className="overlay-content">
                <div className="text-end p-3">
                  <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                    <input
                      id="profile-foreground-img-file-input"
                      type="file"
                      className="profile-foreground-img-file-input"
                      onChange={(event) => {
                        pickedHandler(event, "COVER IMAGE");
                      }}
                      accept=".jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="profile-foreground-img-file-input"
                      className="profile-photo-edit btn btn-light"
                    >
                      <i className="ri-image-edit-line align-bottom me-1"></i>{" "}
                      Change Cover
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-3">
              <div className="card mt-n5">
                <div className="card-body p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image material-shadow"
                          alt="user-profile-image"
                        />
                      ) : (
                        <img
                          src={`${userData.imageURL}`}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image material-shadow"
                          alt="user-profile-image"
                        />
                      )}
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                          onChange={(event) => {
                            pickedHandler(event, "PROFILE IMAGE");
                          }}
                          accept=".jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body material-shadow">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">
                      {userData.fname} {userData.lname}
                    </h5>
                    <p className="text-muted mb-0">Student</p>
                  </div>
                </div>
              </div>
              {/* <!--end card--> */}
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-5">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0">Complete Your Profile</h5>
                    </div>
                  </div>
                  <div className="progress animated-progress custom-progress progress-label">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: `${comp}%` }}
                      aria-valuenow={`${comp}`}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div className="label">30%</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--end card--> */}
            </div>
            {/* <!--end col--> */}
            <div className="col-xxl-9">
              <div className="card mt-xxl-n5">
                <div className="card-header">
                  <ul
                    className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#personalDetails"
                        role="tab"
                      >
                        <i className="fas fa-home"></i> Personal Details
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#changePassword"
                        role="tab"
                      >
                        <i className="far fa-user"></i> Change Password
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-4">
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="personalDetails"
                      role="tabpanel"
                    >
                      <form onSubmit={submitHandler}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label htmlFor="fname" className="form-label">
                                First Name
                              </label>
                              <Input
                                elem="input"
                                id="fname"
                                type="text"
                                placeholder="Enter Your First Name"
                                errorText="Enter a Valid First Name"
                                className="form-control"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.fname.value}
                                valid={formState.inputs.fname.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label htmlFor="lname" className="form-label">
                                Last Name
                              </label>
                              <Input
                                elem="input"
                                id="lname"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Last Name"
                                errorText="Enter a Valid Last Name"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.lname.value}
                                valid={formState.inputs.lname.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label htmlFor="number" className="form-label">
                                Phone Number
                              </label>
                              <Input
                                elem="input"
                                id="number"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Phone Number"
                                errorText="Enter a Valid Phone Number"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.number.value}
                                valid={formState.inputs.number.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email Address
                              </label>
                              <Input
                                elem="input"
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Email"
                                errorText="Enter a Valid Email"
                                onInput={inputHandler}
                                validator={[
                                  VALIDATOR_REQUIRE(),
                                  VALIDATOR_EMAIL(),
                                ]}
                                val={formState.inputs.email.value}
                                valid={formState.inputs.email.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label htmlFor="city" className="form-label">
                                City
                              </label>
                              <Input
                                elem="input"
                                id="city"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your City"
                                errorText="Enter a Valid City"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.city.value}
                                valid={formState.inputs.city.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label htmlFor="country" className="form-label">
                                Country
                              </label>
                              <Input
                                elem="input"
                                id="country"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Country of Origin"
                                errorText="Enter a Valid Country of Origin"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.country.value}
                                valid={formState.inputs.country.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label
                                htmlFor="zipcode"
                                className="htmlForm-label"
                              >
                                Zip Code
                              </label>
                              <Input
                                elem="input"
                                id="zipcode"
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Zipcode"
                                errorText="Enter a Valid Zipcode"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.zipcode.value}
                                valid={formState.inputs.zipcode.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-12">
                            <div className="mb-3 pb-2">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                Description
                              </label>
                              <Input
                                id="description"
                                rows="3"
                                type="text"
                                className="form-control"
                                placeholder="Enter About Description"
                                errorText="Enter a Valid About Description"
                                onInput={inputHandler}
                                validator={[VALIDATOR_REQUIRE()]}
                                val={formState.inputs.description.value}
                                valid={formState.inputs.description.isValid}
                              />
                            </div>
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!formState.isValid}
                              >
                                Updates
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-success"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        {/* <!--end row--> */}
                      </form>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane"
                      id="changePassword"
                      role="tabpanel"
                    >
                      <PasswordForm />
                    </div>
                    {/* <!--end tab-pane--> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
        </>
      )}
    </>
  );
}
