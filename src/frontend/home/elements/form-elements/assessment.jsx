import Input from "../../elements/form-elements/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../../../public/frontend/validators";
import DateTime from "../../elements/form-elements/DateTime";
import useForm from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import SuccessRequest from "../../features/modals/successRequest";
import ErrorModal from "../../../shared/elements/ErrorModal";
import { FadeLoader } from "react-spinners";

export default function Assessment() {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      location: {
        value: "",
        isValid: false,
      },
      number: {
        value: "",
        isValid: false,
      },
      dateTime: {
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
    const dateTimeArr = formState.inputs.dateTime.value.split(" ");

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
          name: formState.inputs.name.value,
          number: formState.inputs.number.value,
          email: formState.inputs.email.value,
          address: formState.inputs.location.value,
          date: appDate,
          status: "PENDING",
          startTime: startTime,
          endTime: endTime,
          duration: "1.5 hour",
          paymentStatus: "UNPAID",
          interacNum: "N/A",
          amountPaid: "0",
          due: "110",
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
      <form onSubmit={submitHandler}>
        <div className="course-input">
          <i className="icofont icofont-user-alt-3"></i>{" "}
          <Input
            id="name"
            type="text"
            elem="input"
            className="fcourse-input"
            placeholder="your name"
            errorText="Please Enter a Valid Name"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
        <div className="course-input">
          <i className="icofont icofont-envelope"></i>{" "}
          <Input
            id="email"
            type="text"
            elem="input"
            className="fcourse-input"
            placeholder="your email"
            errorText="Please Enter a Valid Email"
            validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
        </div>
        <div className="course-input">
          <i className="icofont icofont-phone"></i>{" "}
          <Input
            id="number"
            type="text"
            elem="input"
            className="fcourse-input"
            placeholder="your phone number"
            errorText="Please Enter a Valid Number"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
        <div className="course-input">
          <i className="icofont icofont-location-pin"></i>{" "}
          <Input
            id="location"
            type="text"
            elem="input"
            className="fcourse-input"
            placeholder="your pickup location"
            errorText="Please Enter a Valid Location"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        </div>
        <DateTime
          id="dateTime"
          errorText="Please Select Appoitment Date and Time"
          validator={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <div className="course-submit">
          <button
            className="btn transparent color btn-sm"
            type="submit"
            disabled={!formState.isValid}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
