import { memo } from "react";
import classes from "./RecallSheet.module.css";

const RecallSheet = ({
  numberBerRow,
  rowInPage,
  recallNumberArrayInOnePage,
  page,
  currentPosition,
  sum,
  setCursorPosition,
  cursorPosition,
  recalledArray,
  factor,
  handleChange,
  setActiveElementsHandler,
  activeElements,
}) => {
  return (
    <div className={classes["recall-sheet"]}>
      {recallNumberArrayInOnePage.map((arr, index) => (
        <div className={classes.row} key={index}>
          <div className={classes["row-num"]}>
            <span>{(page - 1) * rowInPage + index + 1}</span>
          </div>
          <div className={classes["row-inputs"]}>
            {arr.map((el, i) => {
              const prevNumbersCount =
                ((page - 1) * rowInPage + index) * numberBerRow + i;
              const fieldIndex =
                (page - 1) * (numberBerRow * rowInPage) +
                index * numberBerRow +
                i;

              return (
                <input
                  className={`${
                    prevNumbersCount >= currentPosition &&
                    prevNumbersCount < currentPosition + sum
                      ? classes.focus
                      : undefined
                  } ${
                    activeElements.includes(fieldIndex)
                      ? classes.active
                      : undefined
                  }`}
                  style={{
                    width: `calc(100% / ${numberBerRow})`,
                  }}
                  key={i}
                  min={0}
                  max={factor > 2 ? 9 : 1}
                  type="number"
                  name={`field-${fieldIndex}`}
                  onChange={handleChange}
                  onClick={() => setCursorPosition(fieldIndex)}
                  onDoubleClick={() => setActiveElementsHandler(fieldIndex)}
                  value={recalledArray[fieldIndex] || ""}
                  autoFocus={cursorPosition === fieldIndex}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(RecallSheet);
