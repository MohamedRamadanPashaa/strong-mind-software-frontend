import classes from "./MemoSheet.module.css";

const MemoSheet = ({
  ranWordsArrayInOnePage,
  page,
  currentPosition,
  setCurrentPosition,
  rowInPage,
  numberBerRow,
  sum,
  view,
  language,
}) => {
  return (
    <div
      className={`${classes["memo-sheet"]} ${
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      {ranWordsArrayInOnePage.map((row, index) => {
        return (
          <div key={index} className={classes["word-column"]}>
            {row.map((word, i) => {
              const currentIndex =
                ((page - 1) * rowInPage + index) * numberBerRow + i;

              return (
                <div
                  key={i}
                  className={classes.word}
                  onClick={() =>
                    !view &&
                    setCurrentPosition(Math.floor(currentIndex / sum) * sum)
                  }
                >
                  <span className={classes["word-number"]}>
                    {(page - 1) * numberBerRow * rowInPage +
                      index * numberBerRow +
                      i +
                      1}
                  </span>
                  <span
                    className={`${classes["the-word"]} ${
                      currentIndex >= currentPosition &&
                      currentIndex < currentPosition + sum
                        ? classes.focus
                        : undefined
                    }`}
                  >
                    {word}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MemoSheet;
