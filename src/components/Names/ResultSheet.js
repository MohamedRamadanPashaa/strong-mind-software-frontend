import compareTwoWords from "../../helpers/compareTwoWords";
import classes from "./ResultSheet.module.css";

const ResultSheet = ({
  recNamesArrayInOnePage,
  ranNamesArrayInOnePage,
  rowInPage,
  numberBerRow,
  page,
  cursorPosition,
  view,
  running,
  language,
}) => {
  return (
    <div
      className={`${classes["result-sheet"]} ${
        language === "arabic" ? classes.arabic : undefined
      }`}
    >
      {ranNamesArrayInOnePage.map((row, index) => (
        <div key={index} className={classes.row}>
          {row.map((name, i) => {
            const prevNamesCount = i * 2;
            const fieldIndex =
              (((page - 1) * rowInPage + index) * numberBerRow + i) * 2;

            return (
              <div
                key={i}
                className={`${classes["full-name"]} ${
                  (fieldIndex === cursorPosition ||
                    fieldIndex === cursorPosition - 1) &&
                  running &&
                  view
                    ? classes["card-focus"]
                    : undefined
                }`}
              >
                <div className={classes.img}>
                  <img
                    src={`/img/faces/${
                      name.face.startsWith("male") ? "m" : "f"
                    }/${name.face}`}
                    alt={name.firstName}
                  />
                </div>
                <div className={classes.name}>
                  <span>{name.firstName}</span>
                  <span>{name.lastName}</span>
                </div>
                <div className={classes.name}>
                  <span
                    className={`${
                      recNamesArrayInOnePage[index][prevNamesCount] !== "" &&
                      compareTwoWords(
                        recNamesArrayInOnePage[index][prevNamesCount],
                        name.firstName
                      )
                        ? classes.correct
                        : recNamesArrayInOnePage[index][prevNamesCount] !== ""
                        ? classes.wrong
                        : undefined
                    } ${
                      view && running && fieldIndex === cursorPosition
                        ? classes.focus
                        : undefined
                    }`}
                  >
                    {recNamesArrayInOnePage[index][prevNamesCount]}
                  </span>
                  <span
                    className={`${
                      recNamesArrayInOnePage[index][prevNamesCount + 1] !==
                        "" &&
                      compareTwoWords(
                        recNamesArrayInOnePage[index][prevNamesCount + 1],
                        name.lastName
                      )
                        ? classes.correct
                        : recNamesArrayInOnePage[index][prevNamesCount + 1] !==
                          ""
                        ? classes.wrong
                        : undefined
                    } ${
                      view && running && fieldIndex === cursorPosition - 1
                        ? classes.focus
                        : undefined
                    }`}
                  >
                    {recNamesArrayInOnePage[index][prevNamesCount + 1]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ResultSheet;
