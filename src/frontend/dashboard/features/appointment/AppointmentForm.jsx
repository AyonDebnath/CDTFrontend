import Input from "../../../home/elements/form-elements/input";
import useForm from "../../../shared/hooks/form-hook";
import { useEffect, useState } from "react";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

import { VALIDATOR_REQUIRE } from "../../../../../public/frontend/validators";
import AppointmentDateTime from "../../form-elements/AppointmentDateTime";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";

export default function AppointmentForm() {
  const { isLoading, error, sendRequest, clearError, isSuccess, setIsSucess } =
    useHttpClient();

  const userID = useParams().uid;

  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user/info/${userID}`
        );

        setUserData(responseData.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userID, sendRequest]);

  const [formState, inputHandler] = useForm(
    {
      street: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      zipCode: {
        value: "",
        isValid: false,
      },
      dateTime: {
        value: [],
        isValid: false,
      },
    },
    false
  );

  async function submitHandler(event) {
    event.preventDefault();
    const appDate = formState.inputs.dateTime.value[0];
    const startTime = formState.inputs.dateTime.value[2];
    const endTime = formState.inputs.dateTime.value[1];
    const duration = formState.inputs.dateTime.value[3];
    const durArr = duration.split(" ");
    const amount = (parseFloat(durArr[0]) * 70).toString();

    try {
      const formData = new FormData();

      formData.append("name", userData?.fname + " " + userData?.lname);
      formData.append("number", userData?.number);
      formData.append("email", userData?.email);
      formData.append(
        "address",
        formState.inputs.street.value +
          " " +
          formState.inputs.city.value +
          " " +
          formState.inputs.zipCode.value
      );
      formData.append("date", appDate);
      formData.append("status", "PENDING");
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("duration", duration);
      formData.append("paymentStatus", "UNPAID");
      formData.append("interacNum", "N/A");
      formData.append("amountPaid", "0");
      formData.append(
        "courseName",
        userData.activeCourse ? userData.activeCourse : "Single Lesson"
      );
      formData.append("due", amount);
      formData.append("completed", "NO");
      formData.append("appName", "Lesson" + appDate);
      formData.append("alertText", "Awaiting Admin Confirmation");
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/appointment/${userID}`,
        "POST",
        formData
      );

      navigate(`/user-appointment-history/${userID}`);
    } catch (err) {
      console.log(err.message);
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
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 col-12">
          <div className="card">
            <div className="card-header">
              <h4>Make an Appointment</h4>
            </div>
            <div className="card-body">
              {/* <!-- Input with Placeholder --> */}
              <form onSubmit={submitHandler}>
                <div className="row g-3">
                  <div className="form-floating">
                    <Input
                      id="street"
                      elem="input"
                      type="text"
                      placeholder="Please Enter Pickup Address"
                      className="form-control"
                      errorText="Please Enter a Valid Street Name"
                      validator={[VALIDATOR_REQUIRE()]}
                      onInput={inputHandler}
                    />
                    <label htmlFor="street">Street Address</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      id="city"
                      elem="input"
                      type="text"
                      placeholder="Please Enter the City Name"
                      className="form-control"
                      errorText="Please Enter a Valid City Name"
                      onInput={inputHandler}
                      validator={[VALIDATOR_REQUIRE()]}
                    />
                    <label htmlFor="city">City</label>
                  </div>
                  <div className="form-floating">
                    <Input
                      elem="input"
                      id="zipCode"
                      type="text"
                      className="form-control"
                      placeholder="Please Enter a Valid Zip Code"
                      validator={[VALIDATOR_REQUIRE()]}
                      onInput={inputHandler}
                    />
                    <label htmlFor="zipCode">Zipcode</label>
                  </div>
                  <AppointmentDateTime id="dateTime" onInput={inputHandler} />
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
