import classes from "./RecallSheet.module.css";

const RecallSheet = ({
  numberBerRow,
  rowInPage,
  recallDatesArrayInOnePage,
  page,
  currentPosition,
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
      {recallDatesArrayInOnePage.map((el, i) => {
        const fieldIndex = (page - 1) * rowInPage + i;
        return (
          <div
            key={i}
            className={`${classes.date} ${
              currentPosition === fieldIndex ? classes.focus : undefined
            } ${
              activeElements.includes(fieldIndex) ? classes.active : undefined
            }`}
            onClick={() => setCursorPosition(fieldIndex)}
            onDoubleClick={() => setActiveElementsHandler(fieldIndex)}
          >
            <input
              type="number"
              min={1000}
              max={2100}
              name={`field-${fieldIndex}`}
              onChange={handleChange}
              value={recalledArray[fieldIndex] || ""}
              autoFocus={cursorPosition === fieldIndex}
              maxLength={4}
            />
            <div>{el.split(" ").splice(1, 10).join(" ")}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RecallSheet;
