import classes from "./RecallSheet.module.css";

const RecallSheet = ({
  numberBerRow,
  rowInPage,
  recallWordsArrayInOnePage,
  page,
  currentPosition,
  sum,
  setCursorPosition,
  cursorPosition,
  recalledArray,
  handleChange,
  setActiveElementsHandler,
  activeElements,
  language,
}) => {
  return (
    <div
      className={`${classes["recall-sheet"]} ${
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      {recallWordsArrayInOnePage.map((col, index) => {
        return (
          <div key={index} className={classes["word-column"]}>
            {col.map((word, i) => {
              const prevNumbersCount =
                ((page - 1) * rowInPage + index) * numberBerRow + i;
              const fieldIndex =
                (page - 1) * (numberBerRow * rowInPage) +
                index * numberBerRow +
                i;
              return (
                <div key={i} className={classes.word}>
                  <span className={classes["word-number"]}>
                    {(page - 1) * numberBerRow * rowInPage +
                      index * numberBerRow +
                      i +
                      1}
                  </span>
                  <input
                    className={`${classes["the-word"]} ${
                      prevNumbersCount >= currentPosition &&
                      prevNumbersCount < currentPosition + sum
                        ? classes.focus
                        : undefined
                    } ${
                      activeElements.includes(fieldIndex)
                        ? classes.active
                        : undefined
                    }`}
                    type="text"
                    name={`field-${fieldIndex}`}
                    onChange={handleChange}
                    onClick={() => setCursorPosition(fieldIndex)}
                    onDoubleClick={() => setActiveElementsHandler(fieldIndex)}
                    value={recalledArray[fieldIndex] || ""}
                    autoFocus={cursorPosition === fieldIndex}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default RecallSheet;
