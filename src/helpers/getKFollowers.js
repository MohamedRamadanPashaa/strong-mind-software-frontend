export const getKFollowers = (number) => {
  if (number < 1000) {
    return `${number}`;
  } else {
    return `${(Math.round(number / 10) * 10) / 1000}k`;
  }
};
