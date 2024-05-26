import classes from "./ResultSheet.module.css";

const ResultSheet = ({
  ranDatesArrayInOnePage,
  recDatesArrayInOnePage,
  view,
  running,
  cursorPosition,
  page,
  rowInPage,
  language,
}) => {
  return (
    <div
      className={`${classes["result-sheet"]} ${
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      {ranDatesArrayInOnePage.map((el, i) => (
        <div key={i} className={`${classes.date}`}>
          <div
            className={`${
              recDatesArrayInOnePage[i][0] !== "" &&
              recDatesArrayInOnePage[i][0] !== el[0].split(" ")[0]
                ? classes.error
                : recDatesArrayInOnePage[i][0] !== "" &&
                  recDatesArrayInOnePage[i][0] === el[0].split(" ")[0]
                ? classes.correct
                : undefined
            } ${
              view && running && cursorPosition === (page - 1) * rowInPage + i
                ? classes.focus
                : undefined
            }`}
          >
            {recDatesArrayInOnePage[i][0]}
          </div>
          <div>{el[0].split(" ")[0]}</div>
          <div>{el[0].split(" ").splice(1, 10).join(" ")}</div>
        </div>
      ))}
    </div>
  );
};

export default ResultSheet;
