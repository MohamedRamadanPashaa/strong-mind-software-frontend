export const checkDate = (inputDate) => {
  // Convert the input string to a Date object
  const inputDateTime = new Date(inputDate);

  // Get the current date
  const currentDate = new Date();

  // Check if the dates have the same year, month, and day
  if (
    inputDateTime.getDate() === currentDate.getDate() &&
    inputDateTime.getMonth() === currentDate.getMonth() &&
    inputDateTime.getFullYear() === currentDate.getFullYear()
  ) {
    return "Today";
  } else if (
    inputDateTime.getDate() === currentDate.getDate() - 1 &&
    inputDateTime.getMonth() === currentDate.getMonth() &&
    inputDateTime.getFullYear() === currentDate.getFullYear()
  ) {
    return "Yesterday";
  } else {
    return "Past";
  }
};
