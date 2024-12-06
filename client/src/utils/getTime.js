import moment from "moment";

export default function getTime(time) {
  const inputTime = moment(time); // Parse the input time
  const now = moment(); // Current time

  // Check if the input time is the same as the current time (same minute)
  if (inputTime.isSame(now, "minute")) {
    return "closed";
  } else {
    // For other times, format it as HH:mm (24-hour format)
    return inputTime.format("h:mm A"); // Example: "3:15 PM"
  }
}
