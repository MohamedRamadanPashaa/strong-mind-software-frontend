import classes from "./MemoSheet.module.css";

const MemoSheet = ({
  ranDatesArrayInOnePage,
  page,
  currentPosition,
  setCurrentPosition,
  rowInPage,
  view,
  language,
}) => {
  return (
    <div
      className={`${classes["memo-sheet"]} ${
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      {ranDatesArrayInOnePage.map((el, i) => (
        <div
          key={i}
          className={`${classes.date} ${
            currentPosition === (page - 1) * rowInPage + i
              ? classes.focus
              : undefined
          }`}
          onClick={() =>
            !view && setCurrentPosition((page - 1) * rowInPage + i)
          }
        >
          <div>{el.split(" ")[0]}</div>
          <div>{el.split(" ").splice(1, 10).join(" ")}</div>
        </div>
      ))}
    </div>
  );
};

export default MemoSheet;
