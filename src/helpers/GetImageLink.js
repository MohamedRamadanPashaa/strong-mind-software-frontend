export const getImageLink = () => {
  const link =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/public/img"
      : `${process.env.REAL_WEBSITE}/public/img`;

  return link;
};
