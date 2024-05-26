import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../FormElement/Button";

import classes from "./CountDown.module.css";

const CountDown = ({
  countSeconds = 5,
  startMemoHandler,
  text,
  view,
  custom,
}) => {
  const [time, setTime] = useState(countSeconds * 1000);
  const [memoStartAt, setMemoStartAt] = useState(Date.now());
  const [running, setRunning] = useState(true);
  const { competitionId } = useSelector((state) => state.result);

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setTime(countSeconds * 1000 - (Date.now() - memoStartAt));
      }, 1000);

      if (time < 2) {
        clearInterval(timer);
        startMemoHandler();
      }
    } else {
      clearInterval(timer);
      startMemoHandler();
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, running]);

  return (
    <div className={classes.countdown}>
      <h3>{text && text}</h3>
      <div>{Math.ceil(time / 1000)}</div>

      {((!competitionId && !view) || custom) && (
        <Button onClick={() => setRunning(false)} className={classes.btn}>
          Skip
        </Button>
      )}
    </div>
  );
};

export default memo(CountDown);
