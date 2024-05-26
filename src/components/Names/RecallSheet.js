import classes from "./RecallSheet.module.css";

const RecallSheet = ({
  numberBerRow,
  rowInPage,
  recallNamesArrayInOnePage,
  page,
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
        language === "arabic" ? classes["arabic"] : undefined
      }`}
    >
      {recallNamesArrayInOnePage.map((row, index) => {
        return (
          <div key={index} className={classes.row}>
            {row.map((name, i) => {
              const fieldIndex =
                (((page - 1) * rowInPage + index) * numberBerRow + i) * 2;

              return (
                <div
                  key={i}
                  className={`${classes["full-name"]} ${
                    fieldIndex === cursorPosition ||
                    fieldIndex === cursorPosition - 1
                      ? classes["card-focus"]
                      : undefined
                  }`}
                >
                  <div
                    className={classes.img}
                    onClick={() => setCursorPosition(fieldIndex)}
                  >
                    <img
                      src={`/img/faces/${
                        name.face.startsWith("male") ? "m" : "f"
                      }/${name.face}`}
                      alt={name.face}
                    />
                  </div>

                  <div className={classes.name}>
                    <input
                      className={`${classes["the-name"]} ${
                        fieldIndex === cursorPosition
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

                    <input
                      className={`${classes["the-name"]} ${
                        fieldIndex === cursorPosition - 1
                          ? classes.focus
                          : undefined
                      } ${
                        activeElements.includes(fieldIndex + 1)
                          ? classes.active
                          : undefined
                      }`}
                      type="text"
                      name={`field-${fieldIndex + 1}`}
                      onChange={handleChange}
                      onClick={() => setCursorPosition(fieldIndex + 1)}
                      onDoubleClick={() =>
                        setActiveElementsHandler(fieldIndex + 1)
                      }
                      value={recalledArray[fieldIndex + 1] || ""}
                      autoFocus={cursorPosition === fieldIndex + 1}
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

export default RecallSheet;
