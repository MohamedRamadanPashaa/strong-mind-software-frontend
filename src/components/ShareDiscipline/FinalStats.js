import { useSelector } from "react-redux";

import classes from "./FinalStats.module.css";

const FinalStats = ({
  title,
  numberBerRow,
  randomArray,
  recalledArray,
  amount,
  calculatePoints,
  custom,
  getScoreAndCorrect,
  cardsFromLeftToRight,
}) => {
  const { memorizationTime, recallTime } = useSelector((state) => state.result);

  // calculate score and correct
  const { score, correct } = getScoreAndCorrect(
    randomArray,
    recalledArray,
    amount,
    numberBerRow,
    cardsFromLeftToRight
  );

  return (
    <div className={classes["final-stats"]}>
      <div className={classes.title}>
        <h2>{title}</h2>
      </div>
      <p>
        Score: <b>{score}</b>
      </p>
      <p>
        Correct: <b>{correct}</b>
      </p>
      <p>
        Memo/Recall<span className={classes["time-word"]}> Time</span>:{" "}
        <b>{memorizationTime}</b>/<b>{recallTime}</b>s
      </p>
      {!custom && (
        <p>
          Points: <b>{calculatePoints(score, memorizationTime)}</b>
        </p>
      )}
    </div>
  );
};

export default FinalStats;
