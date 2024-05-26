export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : `${process.env.REAL_WEBSITE}`;

  return base_url;
};
