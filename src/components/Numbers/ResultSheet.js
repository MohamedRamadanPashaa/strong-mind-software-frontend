import classes from "./ResultSheet.module.css";

const ResultSheet = ({
  recNumberArrayInOnePage,
  ranNumberArrayInOnePage,
  rowInPage,
  numberBerRow,
  page,
  cursorPosition,
  currentPosition,
  view,
  running,
}) => {
  return (
    <div className={classes["result-sheet"]}>
      {recNumberArrayInOnePage.map((arr, index) => (
        <div key={index} className={classes.row}>
          <div className={classes["row-num"]}>
            <span>{(page - 1) * rowInPage + index + 1}</span>
          </div>
          <div className={classes["row-random-num"]}>
            {arr.map((num, i) => (
              <div key={i} style={{ width: `calc(100% / ${numberBerRow})` }}>
                <span>{ranNumberArrayInOnePage[index][i]}</span>
                <span
                  className={
                    view &&
                    running &&
                    cursorPosition ===
                      (page - 1) * numberBerRow * rowInPage +
                        index * numberBerRow +
                        i
                      ? classes.focus
                      : undefined
                  }
                  style={{
                    backgroundColor: `${
                      ranNumberArrayInOnePage[index][i] === num * 1 &&
                      num !== ""
                        ? "#00ff00"
                        : num === ""
                        ? "#eeeeeeaf"
                        : "#f33"
                    }`,
                  }}
                >
                  {num}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultSheet;
