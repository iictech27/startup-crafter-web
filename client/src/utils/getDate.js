import moment from "moment";

export default function getDate(date) {
  const inputDate = moment(date);
  const now = moment();

  if (inputDate.isSame(now, "day")) {
    return "Today";
  } else if (inputDate.isSame(now.subtract(1, "day"), "day")) {
    return "Yesterday";
  } else {
    return inputDate.format("MMMM Do YYYY"); // Format for other dates
  }
}
