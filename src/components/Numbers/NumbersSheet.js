import classes from "./NumbersSheet.module.css";

const NumbersSheet = ({
  randomNumbersArray,
  page,
  currentPosition,
  setCurrentPosition,
  sum,
  numberBerRow,
  rowInPage,
  view,
}) => {
  return (
    <div className={classes["numbers-sheet"]}>
      {randomNumbersArray.map((row, index) => (
        <div key={index} className={classes["row"]}>
          <span className={classes["row-num"]}>
            {(page - 1) * rowInPage + index + 1}
          </span>
          <div className={classes["row-random-numbers"]}>
            {row.map((number, i) => {
              const currentIndex =
                ((page - 1) * rowInPage + index) * numberBerRow + i;

              return (
                <span
                  key={i}
                  style={{
                    backgroundColor:
                      currentIndex >= currentPosition &&
                      currentIndex < currentPosition + sum &&
                      "#ddd",
                    width: `calc(100% / ${numberBerRow})`,
                  }}
                  onClick={() =>
                    !view &&
                    setCurrentPosition(Math.floor(currentIndex / sum) * sum)
                  }
                >
                  {number}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NumbersSheet;
