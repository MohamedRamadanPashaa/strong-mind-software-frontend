import classes from "./CurrentSet.module.css";

const CurrentSet = ({ currentGroup, language }) => {
  return (
    <div
      className={`${classes["current-set"]} ${
        language === "arabic" ? classes.arabic : undefined
      }`}
    >
      <div className={classes.img}>
        <img
          src={`/img/faces/${
            currentGroup.face.startsWith("male") ? "m" : "f"
          }/${currentGroup.face}`}
          alt={currentGroup.face}
        />
      </div>

      <div className={classes.name}>
        <span>{currentGroup.firstName}</span>
        <span>{currentGroup.lastName}</span>
      </div>
    </div>
  );
};

export default CurrentSet;
