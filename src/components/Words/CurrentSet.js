import classes from "./CurrentSet.module.css";

const CurrentSet = ({ currentGroup, currentPosition, language }) => {
  return (
    <div
      className={`${classes["current-set"]} ${
        language !== "arabic" ? classes["not-arabic"] : undefined
      }`}
    >
      {currentGroup[0].map((word, i) => (
        <div key={i} className={classes.word}>
          <span className={classes["word-number"]}>
            {currentPosition + i + 1}
          </span>
          <span className={classes["the-word"]}>{word}</span>
        </div>
      ))}
    </div>
  );
};

export default CurrentSet;
