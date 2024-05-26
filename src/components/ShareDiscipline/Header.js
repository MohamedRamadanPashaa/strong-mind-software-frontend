import { memo, useState } from "react";
import { useSelector } from "react-redux";
import useKeyPress from "../../hooks/useKeyPress";
import Button from "../FormElement/Button";
import Timer from "./Timer";
import useArrowDoubleClick from "../../hooks/double-click-hook";

import classes from "./Header.module.css";

const Header = ({
  title,
  time,
  text,
  startRecallHandler,
  memo,
  recalledArray,
  setNumbersRecalledArray,
  view,
  custom,
  amount,
  currentPosition,
  page,
  numberOfPage,
  sum,
}) => {
  const [running, setRunning] = useState(true);
  const { memorizationTime, competitionId } = useSelector(
    (state) => state.result
  );

  const finishSpeedCards = () => {
    if ((title === "Speed Cards" && memo) || (custom && memo)) {
      setRunning(false);
    }
  };

  useKeyPress("Enter", finishSpeedCards);

  useArrowDoubleClick(
    "ArrowRight",
    title.includes("Cards")
      ? page === numberOfPage && currentPosition + sum >= 52
      : page === numberOfPage && currentPosition + sum >= amount,
    finishSpeedCards
  );

  return (
    <div className={classes.header}>
      <h3 className={view ? classes.view : undefined}>{title}</h3>

      {memorizationTime > 0 && !memo && (
        <div className={classes.time}>
          <span className={classes["ends-in"]}>Memo</span> Time:{" "}
          <span className={classes.timer}>{memorizationTime}s</span>
        </div>
      )}

      {((memo && !competitionId && !view) ||
        (memo && custom) ||
        (title === "Speed Cards" && competitionId && !view && memo)) && (
        <div>
          <Button
            onClick={() => {
              setRunning(false);
            }}
            danger={true}
          >
            Finish
          </Button>
        </div>
      )}

      {!memo && !view && (
        <div>
          <Button
            onClick={() => {
              setRunning(false);
            }}
            danger={true}
          >
            Finish
          </Button>
        </div>
      )}

      <div className={classes.time}>
        <span className={classes["ends-in"]}>{text}</span>
        <div className={classes.timer}>
          <Timer
            time={time}
            startRecallHandler={startRecallHandler}
            running={running}
            memo={memo}
            setRunning={setRunning}
            recalledArray={recalledArray}
            setNumbersRecalledArray={setNumbersRecalledArray}
            view={view}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
