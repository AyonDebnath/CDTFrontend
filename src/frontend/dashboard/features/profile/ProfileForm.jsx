/* eslint-disable react/prop-types */
import useForm from "../../../shared/hooks/form-hook";

import Input from "../../../home/elements/form-elements/input";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useParams, useNavigate } from "react-router-dom";

export default function ProfileForm(props) {
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

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState();
  const userID = useParams().uid;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );
        setUserData(responseData.user);

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
                value: props.profilePhoto,
                isValid: props.profilePhoto ? true : false,
              },
              coverImage: {
                value: props.coverPhoto,
                isValid: props.profilePhoto ? true : false,
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
    props.coverPhoto,
    props.coverIsValid,
    props.profilePhoto,
    props.profileIsValid,
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
      formData.append("image", props.profilePhoto);
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`,
        "PATCH",
        formData
      );
      navigate(`/user-dashboard/${userID}`);
    } catch (err) {
      console.log(err);
    }
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
      {!isLoading && formState.inputs.fname && (
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
                  validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
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
                <label htmlFor="zipcode" className="htmlForm-label">
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
                <label htmlFor="description" className="form-label">
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
                  Update
                </button>
                <button type="button" className="btn btn-soft-success">
                  Cancel
                </button>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </form>
      )}
    </>
  );
}
