import Input from "../../elements/form-elements/input";
import ErrorModal from "../../../shared/elements/ErrorModal";
import SuccessRequest from "./successRequest";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import DateTime from "../../elements/form-elements/DateTime";
import useForm from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { FadeLoader } from "react-spinners";
import AssessmentText from "../home-body/assessmentText";

function BookingModal() {
  const [formState, inputHandler] = useForm(
    {
      fname: {
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
      email: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      dateTime2: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError, isSuccess, setIsSucess } =
    useHttpClient();

  async function submitHandler(event) {
    event.preventDefault();
    const dateTimeArr = formState.inputs.dateTime2.value.split(" ");

    const appDate = dateTimeArr[0];

    const timeArr = dateTimeArr[1].split(",");

    const startTime = timeArr.join("");

    const hourArr = timeArr[0].split(":");

    let sTime;

    if (hourArr[1] === "00") {
      sTime = parseInt(hourArr[0]);
    } else {
      sTime = parseInt(hourArr[0]) + 0.5;
    }

    if (
      timeArr[1] === "PM" &&
      timeArr[0] !== "12:00" &&
      timeArr[0] !== "12:30"
    ) {
      sTime = sTime + 12;
    }

    let eTime = sTime + 1.5;

    let endTime;

    if (eTime % 1 === 0) {
      endTime =
        (eTime <= 12 ? eTime : eTime - 12).toString() +
        ":00" +
        (eTime < 12 ? "AM" : "PM");
    } else {
      endTime =
        Math.floor(eTime <= 12.5 ? eTime : eTime - 12).toString() +
        ":30" +
        (eTime < 12 ? "AM" : "PM");
    }

    try {
      await sendRequest(
        `${import.meta.env.VITE_SERVER_NAME}api/home/appointment/guest`,
        "POST",
        { "Content-Type": "application/json" },
        JSON.stringify({
          name: formState.inputs.fname.value + formState.inputs.lname.value,
          number: formState.inputs.number.value,
          email: formState.inputs.email.value,
          address: formState.inputs.address.value,
          date: appDate,
          status: "PENDING",
          startTime: startTime,
          endTime: endTime,
          duration: "1.5 hour",
          paymentStatus: "UNPAID",
          interacNum: "N/A",
          amountPaid: "0",
          due: "70",
          completed: "NO",
          courseName: "Assessment",
        })
      );
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
      <SuccessRequest isSuccess={isSuccess} onClear={successHandler} />
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
      <div
        className="modal modal-home fade"
        id="bookingModal"
        aria-labelledby="bookingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="container">
                <div className="row">
                  <div className="section-title text-center col-12 mb-45 pt-20">
                    <h3 className="heading">
                      Request an <AssessmentText />{" "}
                    </h3>
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
                  {/* <!-- Contact Form --> */}
                  <div className="col-lg-2"></div>
                  <div className="contact-form form text-left col-lg-9 col-sm-12">
                    <form id="signup-form" onSubmit={submitHandler}>
                      <div className="input-2">
                        <div className="input">
                          <Input
                            id="fname"
                            elem="input"
                            type="text"
                            placeholder="First Name"
                            validator={[VALIDATOR_REQUIRE()]}
                            errorText="Please input a valid first name"
                            onInput={inputHandler}
                          />
                        </div>
                        <div className="input">
                          <Input
                            id="lname"
                            elem="input"
                            type="text"
                            placeholder="Last Name"
                            validator={[VALIDATOR_REQUIRE()]}
                            errorText="Please input a valid last name"
                            onInput={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="input">
                        <Input
                          id="email"
                          elem="input"
                          type="text"
                          placeholder="Email"
                          validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                          errorText="Please input a valid email"
                          onInput={inputHandler}
                        />
                      </div>
                      <div className="input">
                        <Input
                          id="number"
                          elem="input"
                          type="text"
                          placeholder="Phone number"
                          validator={[VALIDATOR_REQUIRE()]}
                          errorText="Please input a valid Contact number"
                          onInput={inputHandler}
                        />
                      </div>
                      <div className="input">
                        <Input
                          id="address"
                          elem="input"
                          type="text"
                          placeholder="Address"
                          validator={[VALIDATOR_REQUIRE()]}
                          errorText="Please input a valid Address"
                          onInput={inputHandler}
                        />
                      </div>
                      <DateTime
                        id="dateTime2"
                        validator={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a Valid Appointment Date"
                        onInput={inputHandler}
                        style="m-all-10"
                      />
                      <div className="row">
                        <div className="col-sm-3 col-4"></div>
                        <div className=" col-sm-6 col-4">
                          <div className="input input-submit sign-submit">
                            <button
                              type="submit"
                              className="btn color submit-btn mt-10"
                              disabled={!formState.isValid}
                              data-bs-dismiss="modal"
                            >
                              Submit
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
                className="close-btn2 btn btn-lg "
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

export default BookingModal;
