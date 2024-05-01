import { useEffect, useReducer, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { validate } from "../../../../../public/frontend/validators";

function dateReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    case "INVALID":
      return {
        ...state,
        value: action.value,
        isValid: false,
      };
    default:
      return state;
  }
}

export default function DateTime({
  style,
  id,
  onInput = () => {},
  errorText,
  validator,
}) {
  const [dateState, dispatch] = useReducer(dateReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const [dateVal, setdateVal] = useState("");
  const [selected, setSelected] = useState("");

  const { value, isValid } = dateState;

  useEffect(() => {
    const valArray = value.split(" ");
    const time = valArray[1] + "," + valArray[2];
    const updatedvalue = valArray[0] + " " + time;
    onInput(id, updatedvalue, isValid);
  }, [id, value, isValid, onInput]);

  const [visi, setVisi] = useState(false);
  const [timeArr, setTimeArr] = useState();
  const dateFormat = "YYYY-MM-DD";
  const curD = new Date();
  let curTimeArr = [];

  let dateNow = "";

  curD.getDate().toString().length === 1
    ? (dateNow = "0" + curD.getDate().toString())
    : (dateNow = curD.getDate().toString());

  const minDate =
    curD.getFullYear().toString() +
    "-" +
    "0" +
    (curD.getMonth() + 1).toString() +
    "-" +
    dateNow;

  curD.setDate(curD.getDate() + 90);

  curD.getDate().toString().length === 1
    ? (dateNow = "0" + curD.getDate().toString())
    : (dateNow = curD.getDate().toString());

  const maxDate =
    curD.getFullYear().toString() +
    "-" +
    "0" +
    (curD.getMonth() + 1).toString() +
    "-" +
    dateNow;

  function handleDateChange(date, dateString) {
    const dayOfWeek = dayjs(date).day();
    if (dayOfWeek === 0 || dayOfWeek === 3) {
      curTimeArr = [];
      setTimeArr(curTimeArr);
      setVisi(true);
    } else if (dayOfWeek) {
      curTimeArr = [
        "6:30 AM",
        "7:00 AM",
        "7:30 AM",
        "8:00 AM",
        "8:30 AM",
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
      ];
      setTimeArr(curTimeArr);
      setVisi(true);
      setdateVal(dateString);
    } else {
      setVisi(false);
      handleChange({ target: { value: "Invalid" } });
    }
  }

  function handleChange(event) {
    setSelected(event.target.value);

    event.target.value === "Invalid"
      ? dispatch({
          value: dateVal + " " + event.target.value,
          type: "INVALID",
        })
      : dispatch({
          value: dateVal + " " + event.target.value,
          type: "CHANGE",
          validators: validator,
        });
  }

  function handleTouch() {
    dispatch({
      type: "TOUCH",
    });
  }

  return (
    <>
      {" "}
      <DatePicker
        status={`${!dateState.isValid && dateState.isTouched && "error"}`}
        style={{
          background: "white",
          width: "100%",
        }}
        showNow="true"
        minDate={dayjs(minDate, dateFormat)}
        maxDate={dayjs(maxDate, dateFormat)}
        onChange={handleDateChange}
      />
      {!dateState.isValid && dateState.isTouched && (
        <p className="error-text">{errorText}</p>
      )}
      <Form.Select
        className={`custom-select ${visi ? "" : "non-visible-menu"} ${style}`}
        aria-label="Default select example"
        onBlur={handleTouch}
        onChange={handleChange}
        value={selected}
      >
        <option value="Invalid">Please choose a time</option>
        {timeArr?.length > 0 ? (
          timeArr.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))
        ) : (
          <option value="Invalid">
            Sorry we are closed on Sundays and Wednesdays
          </option>
        )}
      </Form.Select>
    </>
  );
}

DateTime.propTypes = {
  style: PropTypes.string,
  id: PropTypes.string,
  onInput: PropTypes.func,
  errorText: PropTypes.string,
  validator: PropTypes.array,
};
