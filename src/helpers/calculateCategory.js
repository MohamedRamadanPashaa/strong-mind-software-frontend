export const calculateCategory = (birthDate, specificDate) => {
  let category = "";
  // Parse the birth and specific date strings to Date objects
  const birthDateObject = new Date(birthDate);
  let specificDateObject = new Date(specificDate);

  // set the date to start day of year of competition year
  // for example 25 Apr, 2023 => 01 Jan, 2023
  specificDateObject = new Date(specificDateObject.setMonth(0, 1));

  const ageDate = new Date(specificDateObject - birthDateObject);

  // Extract the year component from the age
  const ageInYears = ageDate.getUTCFullYear() - 1970;

  // Determine the category based on age
  if (ageInYears <= 0) {
    category = "Unknown";
  } else if (ageInYears < 13) {
    category = "Kids";
  } else if (ageInYears < 18) {
    category = "Juniors";
  } else if (ageInYears < 60) {
    category = "Adults";
  } else {
    category = "Seniors";
  }

  return category;
};
