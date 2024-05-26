export const calculatePoints5Num = (score) =>
  Math.round((score / 649) * 100000) / 100;

export const calculatePoints15Num = (score) =>
  Math.round((score / 1385) * 100000) / 100;

export const calculatePoints30Num = (score) =>
  Math.round((score / 2090) * 100000) / 100;

export const calculatePoints60Num = (score) =>
  Math.round((score / 3234) * 100000) / 100;

export const calculatePointsSpoken = (score) =>
  Math.round(Math.sqrt(score) * 4730) / 100;

export const calculatePoints5Bin = (score) =>
  Math.round((score / 1550) * 100000) / 100;

export const calculatePoints30Bin = (score) =>
  Math.round((score / 6171) * 100000) / 100;

export const calculatePoints5Img = (score) =>
  Math.round((score / 567) * 100000) / 100;

export const calculatePoints10Car = (score) =>
  Math.round((score / 589) * 100000) / 100;

export const calculatePoints30Car = (score) =>
  Math.round((score / 1242) * 100000) / 100;

export const calculatePoints60Car = (score) =>
  Math.round((score / 1852) * 100000) / 100;

export const calculatePointsSC = (score, time) => {
  let points = 0;

  if (score === 52 && time * 1 <= 300) {
    points = 6862 / Math.pow(time * 1, 0.75);
  } else if (score < 52) {
    points = (score / 52) * 95.19;
  }

  return Math.round(points * 100) / 100;
};

export const calculatePointsDates = (score) =>
  Math.round((score / 142) * 100000) / 100;

export const calculatePoints5Words = (score) =>
  Math.round((score / 153) * 100000) / 100;

export const calculatePoints15Words = (score) =>
  Math.round((score / 312) * 100000) / 100;

export const calculatePoints5Names = (score) =>
  Math.round((score / 95) * 100000) / 100;

export const calculatePoints15Names = (score) =>
  Math.round((score / 210) * 100000) / 100;
