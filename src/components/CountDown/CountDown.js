import { useEffect, useState } from "react";
import classes from "./CountDown.module.css";

const CountDown = ({ endTime }) => {
  const endAt = new Date(endTime).getTime();
  const [countDownTime, setCountDownTime] = useState(endAt - Date.now());
  const [days, setDays] = useState(
    Math.floor(countDownTime / (1000 * 60 * 60 * 24))
  );
  const [hours, setHours] = useState(
    Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const [minutes, setMinutes] = useState(
    Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60))
  );
  const [seconds, setSeconds] = useState(
    Math.floor((countDownTime % (1000 * 60)) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDownTime(endAt - Date.now());

      setDays(Math.floor(countDownTime / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((countDownTime % (1000 * 60)) / 1000));
    }, 1000);

    if (countDownTime <= 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [endAt, countDownTime]);

  const addS = (time) => {
    if (time > 1) {
      return "s";
    }
  };

  return (
    <div className={classes["count-down"]}>
      <span className={classes.unit}>
        <span>{days}</span>
        <span>Day{addS(days)}</span>
      </span>
      <span className={classes.unit}>
        <span>{hours}</span>
        <span>Hour{addS(hours)}</span>
      </span>
      <span className={classes.unit}>
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>
        <span>Minute{addS(minutes)}</span>
      </span>
      <span className={classes.unit}>
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
        <span>Second{addS(seconds)}</span>
      </span>
    </div>
  );
};

export default CountDown;
