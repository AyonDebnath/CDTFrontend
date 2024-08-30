/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect } from "react";
import { useState, useReducer } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import PropTypes from "prop-types";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useDate } from "../../shared/hooks/date-hook";
import { DateContext } from "../context/date-context";
import { PaymentModalContext } from "../context/payment-context";
import AppointmentPay from "../features/modals/appointmentPay";
import { PaymentDetailsContext } from "../context/pay-details.context";

function dateReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: action.value.length === 6,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

export default function AppointmentDateTime({ id, onInput = () => {}, user }) {
  const [dateState, dispatch] = useReducer(dateReducer, {
    value: [],
    isValid: false,
    isTouched: false,
  });

  const { value, isValid } = dateState;

  const [startApp, setStartApp] = useState("");
  const [endApp, setEndApp] = useState("");
  const [maxDate, setMaxDate] = useState();
  const [minDate, setMinDate] = useState();
  const [endTimeArr, setEndTimeArr] = useState();
  const [visiRadio1, setVisiRadio1] = useState("0");
  const [visiRadio2, setVisiRadio2] = useState("0");
  const [duration, setDuration] = useState("0 Hours");
  const [selectedDate, setSelectedDate] = useState();
  const [payShow, setPayShow] = useState(false);
  const [payToday, setPayToday] = useState(false);
  const [payAmount, setPayAmount] = useState();

  const payConfig = useContext(PaymentDetailsContext);

  const warnings = {
    war1: (
      <p>
        You're going to pay<strong className="text-sucess">${payAmount}</strong>
      </p>
    ),
    war2: (
      <p>
        You're paying for an appointment ahead of confirmation due to it being
        so close to <strong>Today</strong>
      </p>
    ),
    war3: (
      <p>
        Being so close to booking day doesn't allow for any{" "}
        <strong>Refund</strong> or <strong>Cancellation</strong>
      </p>
    ),
    war4: (
      <p>
        Please Check the time again before making <strong>Payment</strong> to
        avoid any issues.
      </p>
    ),
    war5: (
      <p>
        If you're here after changing times just go ahead close this modal
        without payment and proceed with the appointment.
      </p>
    ),
    war6: (
      <p className="text-danger">DO NOT PAY TWICE UNDER ANY CIRCUMSTANCES.</p>
    ),
    war7: (
      <p className="text-danger">
        DO NOT GO OUT OF THE APPOINTMENT WINDOW AFTER MAKING PAYMENT
      </p>
    ),
  };

  const payToggler = (val) => {
    setPayShow(val);
  };

  const [payDate, setPayDate] = useState();

  const { sendRequest } = useHttpClient();
  const { getIntValue, getTimeValue } = useDate();
  const [appTime, setAppTime] = useState([]);

  async function handDateChange(date, dateString) {
    const curD = new Date();

    const today = curD.toLocaleDateString("en-CA");

    if (!dateString) {
      dateString = today;
    }

    setSelectedDate(dateString);
    if (!dateString) {
      setVisiRadio1("0");
      setVisiRadio2("0");
    }
    try {
      const responseData = await sendRequest(
        `${
          import.meta.env.VITE_SERVER_NAME
        }api/dashboard/appointment/${dateString}`
      );
      const { blockedTime, avaiTimeArr } = handleAppTime(
        responseData.appointment,
        dateString
      );

      if (blockedTime) {
        handleAvailability(blockedTime, avaiTimeArr);
      } else {
        handleAvailability([]);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const dateFormat = "YYYY-MM-DD";
  const avaiTimeArr2 = [];

  useEffect(() => {
    const curD = new Date();

    let startTimer = curD.getHours();
    startTimer = startTimer + 1;
    if (startTimer >= 18) {
      curD.setDate(curD.getDate() + 1);
    }
    let dateNow = "";
    let monthNow = "";

    curD.getDate().toString().length === 1
      ? (dateNow = "0" + curD.getDate().toString())
      : (dateNow = curD.getDate().toString());

    (curD.getMonth() + 1).toString().length === 1
      ? (monthNow = "0" + (curD.getMonth() + 1).toString())
      : (monthNow = (curD.getMonth() + 1).toString());

    const minD = curD.getFullYear().toString() + "-" + monthNow + "-" + dateNow;

    curD.setDate(curD.getDate() + 90);

    curD.getDate().toString().length === 1
      ? (dateNow = "0" + curD.getDate().toString())
      : (dateNow = curD.getDate().toString());

    (curD.getMonth() + 1).toString().length === 1
      ? (monthNow = "0" + (curD.getMonth() + 1).toString())
      : (monthNow = (curD.getMonth() + 1).toString());

    const maxD = curD.getFullYear().toString() + "-" + monthNow + "-" + dateNow;

    setMinDate(minD);
    setMaxDate(maxD);
  }, [minDate, maxDate]);

  function handleAppTime(appointments, dateString) {
    let curD = new Date();
    let startTime;
    if (dateString === curD.toLocaleDateString("en-CA")) {
      startTime = curD.getHours() + 1;
    } else {
      startTime = 6;
    }

    const dateArray = dateString.split("-");

    let date = parseInt(dateArray[2]);

    if (
      date === curD.getDate() ||
      date - 1 === curD.getDate() ||
      date - 2 === curD.getDate()
    ) {
      setPayDate(dateString);
      setPayToday(true);
    } else {
      curD.setDate(date - 1);
      setPayDate(curD.toLocaleDateString("en-CA"));
      payConfig.paidDets(0, true, "N/A");
    }

    const avaiTimeArr = [];

    for (let i = startTime; i <= 18; i += 1.5) {
      if (i <= 11.5) {
        if (i % 1 === 0) {
          avaiTimeArr.push(i.toString() + ":00" + "AM");
        } else {
          avaiTimeArr.push(Math.floor(i).toString() + ":30" + "AM");
        }
      } else if (i > 11.5 && i <= 12.5) {
        if (i % 1 === 0) {
          avaiTimeArr.push(i.toString() + ":00" + "PM");
        } else {
          avaiTimeArr.push(Math.floor(i).toString() + ":30" + "PM");
        }
      } else {
        if (i % 1 === 0) {
          avaiTimeArr.push((i - 12).toString() + ":00" + "PM");
        } else {
          avaiTimeArr.push(Math.floor(i - 12).toString() + ":30" + "PM");
        }
      }
    }

    let blockedTime = [];
    let userApps;
    if (appointments && appointments.userId != "guest") {
      userApps = appointments;
    } else if (!appointments) {
      userApps = [];
      blockedTime = [];
      return { blockedTime, avaiTimeArr };
    }

    userApps.forEach((elem) => {
      let sTimeStr;
      let sTime;
      let timeindi;

      const duraArr = elem.duration.split(" ");
      const duration = parseFloat(duraArr[0]);
      if (elem.startTime.length <= 6) {
        sTimeStr = elem.startTime.slice(0, 4);
        timeindi = elem.startTime.slice(4, 6);
      } else {
        sTimeStr = elem.startTime.slice(0, 5);
        timeindi = elem.startTime.slice(5, 7);
      }

      const timeArray = sTimeStr.split(":");

      timeArray[1] === "00"
        ? (sTime = parseInt(timeArray[0]))
        : (sTime = parseInt(timeArray[0]) + 0.5);

      if (timeindi === "PM") {
        if (sTime < 12) {
          sTime = sTime + 12;
        }
      }
      blockedTime.push(elem.startTime);
      blockedTime.push(elem.endTime);
      for (let i = 0; i < duration - 0.5; i += 0.5) {
        sTime = sTime + 0.5;
        if (sTime % 1 === 0) {
          blockedTime.push(
            (sTime <= 12 ? sTime : sTime - 12).toString() +
              ":00" +
              (sTime < 12 ? "AM" : "PM")
          );
        } else {
          blockedTime.push(
            Math.floor(sTime <= 12.5 ? sTime : sTime - 12).toString() +
              ":30" +
              (sTime < 12 ? "AM" : "PM")
          );
        }
      }
    });
    return { blockedTime, avaiTimeArr };
  }

  function handleAvailability(blockedTime, avaiTimeArr) {
    const newBlockedTime = blockedTime.map((el) => {
      const timeInt = getIntValue(el);
      return timeInt;
    });
    let differ = "0";
    let arr1 = avaiTimeArr.map((elem) => {
      let newAvaiTime;
      let elemInt = getIntValue(elem);
      if (
        (newBlockedTime.includes(elemInt - 1) ||
          newBlockedTime.includes(elemInt - 0.5)) &&
        !newBlockedTime.includes(elemInt)
      ) {
        if (elemInt - 1 === newBlockedTime[1]) {
          newAvaiTime = getTimeValue(elemInt - 1);
          differ = "1";
        } else {
          newAvaiTime = getTimeValue(elemInt - 0.5);
          differ = "0.5";
        }
      } else if (!newBlockedTime.includes(elemInt)) {
        if (!newBlockedTime.includes(elemInt - parseFloat(differ))) {
          newAvaiTime = getTimeValue(elemInt - parseFloat(differ));
        }
      }
      return newAvaiTime;
    });
    if (
      arr1[arr1.length - 1] != "3:00PM" ||
      arr1[arr1.length - 1] != "3:30PM" ||
      arr1[arr1.length - 1] != "6:00PM"
    ) {
      arr1.push(getTimeValue(getIntValue(arr1[arr1.length - 1]) + 1.5));
    }

    arr1 = arr1.filter((elem) => elem !== "");
    setAppTime(arr1);
    setVisiRadio1("1");
  }

  function handleStart(event) {
    setVisiRadio2("1");
    let startHour = getIntValue(event.target.value);
    setStartApp(event.target.value);

    let endHour;

    if (user.lessons > 0) {
      endHour = startHour + parseFloat(user.courseDuration);

      if (endHour <= 11.5) {
        if (endHour % 1 === 0) {
          avaiTimeArr2.push(endHour.toString() + ":00" + "AM");
        } else {
          avaiTimeArr2.push(Math.floor(endHour).toString() + ":30" + "AM");
        }
      } else if (endHour > 11.5 && endHour <= 12.5) {
        if (endHour % 1 === 0) {
          avaiTimeArr2.push(endHour.toString() + ":00" + "PM");
        } else {
          avaiTimeArr2.push(Math.floor(endHour).toString() + ":30" + "PM");
        }
      } else {
        if (endHour % 1 === 0) {
          avaiTimeArr2.push((endHour - 12).toString() + ":00" + "PM");
        } else {
          avaiTimeArr2.push(Math.floor(endHour - 12).toString() + ":30" + "PM");
        }
      }
    } else {
      endHour = startHour + 1.5;
      for (let j = endHour; j <= startHour + 2; j += 0.5) {
        if (j <= 11.5) {
          if (j % 1 === 0) {
            avaiTimeArr2.push(j.toString() + ":00" + "AM");
          } else {
            avaiTimeArr2.push(Math.floor(j).toString() + ":30" + "AM");
          }
        } else if (j > 11.5 && j <= 12.5) {
          if (j % 1 === 0) {
            avaiTimeArr2.push(j.toString() + ":00" + "PM");
          } else {
            avaiTimeArr2.push(Math.floor(j).toString() + ":30" + "PM");
          }
        } else {
          if (j % 1 === 0) {
            avaiTimeArr2.push((j - 12).toString() + ":00" + "PM");
          } else {
            avaiTimeArr2.push(Math.floor(j - 12).toString() + ":30" + "PM");
          }
        }
      }
    }

    setEndTimeArr(avaiTimeArr2);
  }

  // After the final data is received from radio form element we set the final start time end time and duration.
  async function handleEnd(event) {
    setEndApp(event.target.value);
    let startTime = getIntValue(startApp);
    let endTime = getIntValue(event.target.value);
    let dura;

    dura = endTime - startTime;
    let payAmount;
    dura == 1.5 ? (payAmount = 110) : (payAmount = 140);
    let lesson = user.lessons;

    if (user.lessons > 0) {
      setPayToday(false);
      payConfig.paidDets(payAmount, true, "PAID");
      lesson -= 1;
      payAmount = 0;
    }

    if (payToday === true && payAmount > 0) {
      payToggler(true);
      setPayAmount(payAmount);
    }

    setDuration(dura.toString() + " Hours");

    validateDate(dura, event.target.value, lesson, payAmount);
  }

  function validateDate(dura, endT, lesson, payAmount) {
    let dateTimeArr = [];
    dateTimeArr.push(selectedDate);
    dateTimeArr.push(endT);
    dateTimeArr.push(startApp);
    dateTimeArr.push(dura.toString() + " hours");
    dateTimeArr.push(lesson);
    dateTimeArr.push(payAmount);

    dispatch({
      value: dateTimeArr,
      type: "CHANGE",
    });
  }

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  return (
    <>
      <PaymentModalContext.Provider
        value={{ payNow: payShow, payToggler: payToggler }}
      >
        <DateContext.Provider value={{ value: payDate }}>
          <div>
            <label htmlFor="Inputdate" className="form-label">
              Input Date
            </label>
            <DatePicker
              style={{
                background: "white",
                width: "100%",
              }}
              showNow="true"
              minDate={dayjs(minDate, dateFormat)}
              maxDate={dayjs(maxDate, dateFormat)}
              onChange={handDateChange}
            />
          </div>
          <div
            className={`"container mt-3" ${visiRadio1 === "0" && "destroy"}`}
          >
            <div className="row">
              {/* <!-- Outlined Styles --> */}
              <p className="mb-2">Start Time</p>
              <div className="hstack gap-2 flex-wrap">
                {appTime?.map((val, index) => {
                  return (
                    <React.Fragment key={index + 120}>
                      <input
                        //   onchange="checkRadio(2)"
                        type="radio"
                        className="btn-check"
                        value={val}
                        name="startTime"
                        id={val + "startTime"}
                        onClick={handleStart}
                        key={index}
                      />
                      <label
                        className="btn btn-outline-danger material-shadow"
                        htmlFor={val + "startTime"}
                        key={index + 40}
                      >
                        {val}
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`"container mt-3" ${visiRadio2 === "0" && "destroy"}`}
          >
            <div className="row">
              {/* <!-- Outlined Styles --> */}
              <p className="mb-2">End Time</p>
              <div className="hstack gap-2 flex-wrap">
                {endTimeArr?.map((val2, index) => {
                  return (
                    <React.Fragment key={index + 120}>
                      <input
                        //   onchange="checkRadio(2)"
                        type="radio"
                        className="btn-check"
                        value={val2}
                        name="endTime"
                        id={val2 + "endTime"}
                        onClick={handleEnd}
                        key={index}
                      />
                      <label
                        className="btn btn-outline-danger material-shadow"
                        htmlFor={val2 + "endTime"}
                        key={index + 40}
                      >
                        {val2}
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`${
              visiRadio1 === "0" || visiRadio2 === "0" ? "destroy" : ""
            } `}
            id="duration"
          >
            <label htmlFor="durationInput" className="form-label">
              Duration
            </label>
            <input
              type="text"
              className="form-control"
              id="durationInput"
              value={duration}
              disabled
            />
          </div>
          {user && payAmount && (
            <AppointmentPay
              userData={user}
              amount={payAmount.toString()}
              warning={warnings}
            />
          )}
        </DateContext.Provider>
      </PaymentModalContext.Provider>
    </>
  );
}

AppointmentDateTime.propTypes = {
  id: PropTypes.string,
  onInput: PropTypes.func,
  user: PropTypes.object,
};
