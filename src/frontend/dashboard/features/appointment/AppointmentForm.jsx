import Input from "../../../home/elements/form-elements/input";
import useForm from "../../../shared/hooks/form-hook";
import { useEffect, useState, useContext } from "react";

import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

import { VALIDATOR_REQUIRE } from "../../../../../public/frontend/validators";
import AppointmentDateTime from "../../form-elements/AppointmentDateTime";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate, useParams } from "react-router-dom";

import { DateContext } from "../../context/date-context";
import { PaymentDetailsContext } from "../../context/pay-details.context";
import { AuthContext } from "../../../shared/context/auth-context";

export default function AppointmentForm() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [due, setDue] = useState();
  const [paid, setPaid] = useState();
  const [paymentStatus, setPaymentStatus] = useState();

  const auth = useContext(AuthContext);

  const payDetToggler = (due, paid, paymentStatus) => {
    setDue(due);
    setPaid(paid);
    setPaymentStatus(paymentStatus);
  };

  const userID = useParams().uid;
  const dates = useContext(DateContext);

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
    console.log(formState.inputs.dateTime.value);
    const appDate = formState.inputs.dateTime.value[0];
    const startTime = formState.inputs.dateTime.value[2];
    const endTime = formState.inputs.dateTime.value[1];
    const duration = formState.inputs.dateTime.value[3];
    const lesson = formState.inputs.dateTime.value[4];
    const amount = formState.inputs.dateTime.value[5];
    let duePay;
    try {
      const formData = new FormData();

      if (paid && paymentStatus != "N/A") {
        duePay = 0;
        formData.append("paymentStatus", paymentStatus);
        formData.append("amountPaid", due);
        formData.append("due", "0");
      } else {
        duePay = amount;
        formData.append("paymentStatus", "UNPAID");
        formData.append("amountPaid", "0");
        formData.append("due", amount);
      }

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
      formData.append("interacNum", "N/A");
      formData.append(
        "courseName",
        userData.activeCourse ? userData.activeCourse : "Single Lesson"
      );
      formData.append("completed", "NO");
      formData.append("appName", "Lesson" + appDate);
      formData.append("alertText", "Awaiting Admin Confirmation");
      formData.append("paymentDate", dates.value);
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/appointment/${userID}`,
        "POST",
        formData
      );

      try {
        const formData = new FormData();
        if (parseInt(lesson) > 0) {
          formData.append("lessons", lesson);
          formData.append("courseName", userData.activeCourse);
          formData.append("amount", 0);
          formData.append("duration", userData.duration);
        } else {
          formData.append("lessons", lesson);
          formData.append("courseName", "N/A");
          formData.append("amount", duePay);
          formData.append("duration", "N/A");
        }
        await sendRequest(
          `${import.meta.env.VITE_SERVER_NAME}api/dashboard/user-lesson/${
            auth.userId
          }`,
          "POST",
          formData,
          { Authorization: "Bearer " + auth.token }
        );
      } catch (err) {
        console.log(err);
      }

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
      {
        <PaymentDetailsContext.Provider
          value={{
            due: due,
            paid: paid,
            paymentStatus: paymentStatus,
            paidDets: payDetToggler,
          }}
        >
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
                      {userData && (
                        <AppointmentDateTime
                          id="dateTime"
                          user={userData}
                          onInput={inputHandler}
                        />
                      )}
                    </div>
                    <div className="col-lg-12">
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={!formState.isValid || !paid}
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
        </PaymentDetailsContext.Provider>
      }
    </>
  );
}
