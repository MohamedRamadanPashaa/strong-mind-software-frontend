import Image from "next/image";
import classes from "./ViewResultCardStats.module.css";
import { getImageLink } from "@/helpers/GetImageLink";

const ViewResultCardStats = ({
  match,
  score,
  correct,
  result,
  memoTime,
  recallTime,
  calculatePoints,
}) => {
  return (
    <div className={classes["view-cards"]}>
      <div className={classes.img}>
        <Image
          src={`${getImageLink()}/usersImages/${match.competitor.photo}`}
          alt={match.competitor.name}
          width={100}
          height={100}
        />
        <h3>{match.competitor.name}</h3>
      </div>

      <div className={classes.content}>
        <div className={classes.title}>
          <h2>{match.discipline}</h2>
        </div>

        <div>
          <span>
            Score:{" "}
            <span className={classes.stats}>{score || match.score || 0}</span>
          </span>
        </div>

        <div>
          <span>
            Correct:{" "}
            <span className={classes.stats}>
              {correct || match.correct || 0}
            </span>
          </span>
        </div>

        <div>
          <span>
            Memo
            {(recallTime > 0 || (result && match.recallTime > 0)) && "/Recall"}
            <span className={classes["word-time"]}> Time</span>:{" "}
            {memoTime > 0 && (
              <span className={classes.stats}>
                {match.discipline.includes("Spoken")
                  ? match.memoData.length
                  : memoTime || match.memoTime}
              </span>
            )}
            {(recallTime > 0 || (result && match.recallTime > 0)) && (
              <>
                /
                <span className={classes.stats}>
                  {recallTime || match.recallTime}
                </span>
              </>
            )}
            s
          </span>
        </div>

        {(!match.running || result) && !match.discipline.includes("Custom") && (
          <div className={classes.points}>
            Points:{" "}
            <span className={classes.stats}>
              {match.points || calculatePoints(score, memoTime)}
            </span>{" "}
            {result && (
              <>
                (
                <span className={classes.stats}>
                  {calculatePoints(score, memoTime)}
                </span>
                )
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResultCardStats;
