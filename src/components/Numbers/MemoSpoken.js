import { useEffect, useState } from "react";
import Button from "../FormElement/Button";
import { useSelector } from "react-redux";
import { FaMicrophoneLines } from "react-icons/fa6";

import classes from "./MemoSpoken.module.css";

const MemoSpoken = ({
  title,
  randomNumbersArray,
  startRecallHandler,
  custom,
  spokenInterval,
}) => {
  const { competitionId } = useSelector((state) => state.result);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [audioArray] = useState([
    3,
    2,
    1,
    "a",
    "b",
    "c",
    "Silent",
    "Silent",
    ...randomNumbersArray,
  ]);

  useEffect(() => {
    let timer;
    if (currentPosition < audioArray.length) {
      let audio = new Audio(
        `/sounds/spoken/${audioArray[currentPosition]}.wav`
      );

      timer = setInterval(() => {
        audio.play();

        setCurrentPosition((prev) => prev + 1);
      }, spokenInterval);
    }

    return () => clearInterval(timer);
  }, [audioArray, spokenInterval, currentPosition]);

  useEffect(() => {
    if (currentPosition === audioArray.length) {
      setTimeout(() => {
        startRecallHandler();
      }, 3000);
    }
  }, [startRecallHandler, audioArray.length, currentPosition]);

  return (
    <div className={classes["memo-recall"]}>
      <div className={classes["memo-recall-page"]}>
        <div className={classes.header}>
          <h2>{title}</h2>
          <h3>
            {custom
              ? `Custom (${randomNumbersArray.length} digit${
                  randomNumbersArray.length > 1 ? "s" : ""
                }) (${currentPosition > 8 ? currentPosition - 8 : 0})`
              : `Attempt ${localStorage.getItem(`spokenAttempt`) || "1"} (${
                  randomNumbersArray.length
                } digit${randomNumbersArray.length > 1 ? "s" : ""}) (${
                  currentPosition > 8 ? currentPosition - 8 : 0
                })`}
          </h3>
        </div>

        <FaMicrophoneLines />

        {!competitionId && (
          <Button
            className={classes.finish}
            danger={true}
            onClick={startRecallHandler}
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemoSpoken;
