import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setMistakes, setScore, setTimer } from "../../store/resultSlice";

import classes from "./Timer.module.css";

const Timer = ({ numOfQ, dispatch, rightAnswers, mistakes }) => {
  const [time, setTime] = useState(Date.now());
  const [startTime, setStartTime] = useState(Date.now());
  const [active, setActive] = useState(true);
  const [paused, setPaused] = useState(false);

  const dispatchResult = useDispatch();
  const { totalNumOfQuestion } = useSelector((state) => state.result);

  useEffect(() => {
    let timer;

    if (active && !paused) {
      timer = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }

    if (numOfQ === totalNumOfQuestion) {
      clearInterval(timer);
      stopTimerHandler();

      dispatchResult(setTimer(time));
      dispatchResult(setScore(rightAnswers));
      dispatchResult(setMistakes(mistakes));
      dispatch({ type: "SAVING" });
    }

    return () => clearInterval(timer);
  }, [
    active,
    paused,
    numOfQ,
    dispatch,
    rightAnswers,
    dispatchResult,
    time,
    totalNumOfQuestion,
    mistakes,
  ]);

  const stopTimerHandler = () => {
    setActive(false);
    setPaused(true);
  };

  return (
    <div className={classes.timer}>
      <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
      {/* <span className="digits mili-sec">
        .{("0" + ((time / 10) % 100)).slice(-2)}
      </span> */}
    </div>
  );
};

export default Timer;
