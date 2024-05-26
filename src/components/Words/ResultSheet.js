import compareTwoWords from "../../helpers/compareTwoWords";
import classes from "./ResultSheet.module.css";

const ResultSheet = ({
  recWordsArrayInOnePage,
  ranWordsArrayInOnePage,
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
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      {recWordsArrayInOnePage.map((arr, index) => {
        return (
          <div key={index} className={classes["word-column"]}>
            {arr.map((word, i) => {
              return (
                <div key={i} className={classes["word"]}>
                  <span className={classes["word-number"]}>
                    {(page - 1) * numberBerRow * rowInPage +
                      index * numberBerRow +
                      i +
                      1}
                  </span>
                  <span className={classes["memo-word"]}>
                    {ranWordsArrayInOnePage[index][i]}
                  </span>
                  <span
                    className={`${classes["recalled-word"]} ${
                      compareTwoWords(ranWordsArrayInOnePage[index][i], word) &&
                      word.trim() !== ""
                        ? classes.correct
                        : word.trim() !== "" &&
                          !compareTwoWords(
                            ranWordsArrayInOnePage[index][i],
                            word
                          )
                        ? classes.wrong
                        : undefined
                    } ${
                      view &&
                      running &&
                      cursorPosition ===
                        (page - 1) * numberBerRow * rowInPage +
                          index * numberBerRow +
                          i
                        ? classes.focus
                        : undefined
                    }`}
                  >
                    {word.trim()}
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

export default ResultSheet;
