import { useEffect, useState, useReducer, useContext } from "react";
import { SelectorContext } from "../../../shared/context/SelectorContext";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

function genderReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: action.value != "Invalid",
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

export default function Selector({
  id,
  onInput = () => {},
  placeholder,
  selectArray,
  valueArray,
  ClassName,
  val,
  valid,
}) {
  const [selected, setSelected] = useState();
  const [selectState, dispatch] = useReducer(genderReducer, {
    value: val || "",
    isValid: false,
    isTouched: valid || false,
  });
  const Sele = useContext(SelectorContext);
  const { value, isValid } = selectState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  function handleChange(event) {
    Sele.setVal(event.target.value);
    setSelected(event.target.value);
    dispatch({
      value: event.target.value,
      type: "CHANGE",
    });
  }

  function handleTouch() {
    dispatch({
      type: "TOUCH",
    });
  }

  return (
    <Form.Select
      aria-label="Default select example"
      className={`"custom-select" ${ClassName}`}
      id="gender"
      onBlur={handleTouch}
      onChange={handleChange}
      value={selected}
      defaultValue={val}
    >
      <option value="Invalid">{placeholder}</option>
      {selectArray.map((opt, index) => {
        return (
          <option
            value={valueArray?.length > 0 ? valueArray[index] : opt}
            key={index}
          >
            {opt}
          </option>
        );
      })}
    </Form.Select>
  );
}

Selector.propTypes = {
  id: PropTypes.string,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  selectArray: PropTypes.array,
  valueArray: PropTypes.array,
  ClassName: PropTypes.string,
  val: PropTypes.string,
  valid: PropTypes.bool,
};
