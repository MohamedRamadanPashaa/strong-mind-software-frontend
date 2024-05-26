import classes from "./MemoSheet.module.css";

const MemoSheet = ({
  ranNamesArrayInOnePage,
  page,
  currentPosition,
  setCurrentPosition,
  rowInPage,
  numberBerRow,
  view,
  language,
}) => {
  return (
    <div
      className={`${classes["memo-sheet"]} ${
        language === "arabic" ? classes.arabic : undefined
      }`}
    >
      {ranNamesArrayInOnePage.map((row, index) => (
        <div key={index} className={classes.row}>
          {row.map((name, i) => (
            <div
              key={i}
              className={`${classes["full-name"]} ${
                currentPosition ===
                (page - 1) * numberBerRow * rowInPage + index * numberBerRow + i
                  ? classes.focus
                  : undefined
              }`}
              onClick={() =>
                !view &&
                setCurrentPosition(
                  (page - 1) * numberBerRow * rowInPage +
                    index * numberBerRow +
                    i
                )
              }
            >
              <div className={classes.img}>
                <img
                  src={`/img/faces/${
                    name.face.startsWith("male") ? "m" : "f"
                  }/${name.face}`}
                  alt={name.face}
                />
              </div>

              <div className={classes.name}>
                <span>{name.firstName}</span>
                <span>{name.lastName}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MemoSheet;
