export const useDate = () => {
  const getIntValue = (timeVal) => {
    let timeArr = [];

    if (timeVal.length === 6) {
      timeArr.push(timeVal.slice(0, 4));
      timeArr.push(timeVal.slice(4, 6));
    } else {
      timeArr.push(timeVal.slice(0, 5));
      timeArr.push(timeVal.slice(5, 7));
    }

    let setHour;

    const timeIndi = timeArr[0].split(":");

    if (
      timeArr[1] === "AM" ||
      timeArr[0] === "12:00" ||
      timeArr[0] === "12:30"
    ) {
      if (timeIndi[1] === "30") {
        setHour = parseFloat(timeIndi[0]) + 0.5;
      } else {
        setHour = parseFloat(timeIndi[0]);
      }
    } else {
      if (timeIndi[1] === "30") {
        setHour = parseFloat(timeIndi[0]) + 12.5;
      } else {
        setHour = parseFloat(timeIndi[0]) + 12;
      }
    }

    return setHour;
  };

  const getTimeValue = (timeInt) => {
    let timeStr;
    if (timeInt < 12) {
      timeStr =
        timeInt % 1 === 0
          ? timeInt.toString() + ":00AM"
          : Math.floor(timeInt).toString() + ":30AM";
    } else if ((timeInt === 12 || timeInt === 12.5) && timeInt < 13) {
      timeStr =
        timeInt % 1 === 0
          ? timeInt.toString() + ":00PM"
          : Math.floor(timeInt).toString() + ":30PM";
    } else {
      timeStr =
        timeInt % 1 === 0
          ? (timeInt - 12).toString() + ":00PM"
          : Math.floor(timeInt - 12).toString() + ":30PM";
    }

    return timeStr;
  };

  return { getIntValue, getTimeValue };
};
