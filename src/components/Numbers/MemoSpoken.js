import { memo, useEffect, useRef, useState } from "react";
import Button from "../FormElement/Button";
import { useSelector } from "react-redux";
import { FaMicrophoneLines } from "react-icons/fa6";

import classes from "./MemoSpoken.module.css";

const MemoSpoken = ({
  title,
  audioRefs,
  startRecallHandler,
  custom,
  spokenInterval,
  randomNumbersArray,
}) => {
  const { competitionId } = useSelector((state) => state.result);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      if (currentPosition < audioRefs.current.length) {
        const audio = audioRefs.current[currentPosition];
        if (audio) {
          audio.play().catch((error) => {
            console.error(
              `Error playing audio file: ${audioRefs[currentPosition]}`,
              error
            );
          });
        } else {
          console.error(
            `Audio file not preloaded: ${audioRefs[currentPosition]}`
          );
        }

        setCurrentPosition((prev) => prev + 1);
      }
    }, spokenInterval);

    return () => clearInterval(timer);
  }, [spokenInterval, currentPosition, audioRefs]);

  useEffect(() => {
    if (currentPosition === audioRefs.current.length) {
      setTimeout(() => {
        startRecallHandler();
      }, 3000);
    }
  }, [startRecallHandler, audioRefs, currentPosition]);

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

export default memo(MemoSpoken);
