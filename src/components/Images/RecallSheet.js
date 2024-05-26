import { memo } from "react";
import classes from "./RecallSheet.module.css";

const RecallSheet = ({
  numberBerRow,
  rowInPage,
  recallImagesArrayInOnePage,
  page,
  currentPosition,
  setCursorPosition,
  cursorPosition,
  recalledArray,
  handleChange,
  setActiveElementsHandler,
  activeElements,
}) => {
  return (
    <div className={classes["recall-sheet"]}>
      {recallImagesArrayInOnePage.map((arr, index) => {
        return (
          <div key={index} className={classes.row}>
            <div className={classes["row-num"]}>
              <span>{(page - 1) * rowInPage + index + 1}</span>
            </div>

            {arr.map((img, i) => {
              const fieldIndex =
                (page - 1) * (numberBerRow * rowInPage) +
                index * numberBerRow +
                i;

              return (
                <div
                  key={i}
                  className={`${classes["recall-element"]} ${
                    currentPosition === fieldIndex ? classes.focus : undefined
                  } ${
                    activeElements.includes(fieldIndex)
                      ? classes.active
                      : undefined
                  }`}
                  onClick={() => setCursorPosition(fieldIndex)}
                  onDoubleClick={() => setActiveElementsHandler(fieldIndex)}
                >
                  <div className={classes["recall-input"]}>
                    <input
                      type="number"
                      key={i}
                      min={1}
                      max={5}
                      name={`field-${fieldIndex}`}
                      onChange={handleChange}
                      value={recalledArray[fieldIndex] || ""}
                      autoFocus={cursorPosition === fieldIndex}
                    />
                  </div>
                  <div className={classes.img}>
                    <img
                      src={`/img/IAM_Images_Database/${img.src}`}
                      alt={`${img.src}`}
                      // width={400}
                      // height={400}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(RecallSheet);
