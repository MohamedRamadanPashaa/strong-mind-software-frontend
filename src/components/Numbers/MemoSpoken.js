import { memo, useEffect, useRef, useState } from "react";
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

  const audioRefs = useRef([]);
  const [allPreloaded, setAllPreloaded] = useState(false);

  useEffect(() => {
    // Preload audio files into browser cache
    const loadAudioFiles = async () => {
      const loadPromises = audioArray.map(async (file, index) => {
        const response = await fetch(`/sounds/spoken/${file}.wav`);
        if (!response.ok) {
          throw new Error(`Failed to load audio file: ${file}`);
        }
        const blob = await response.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audioRefs.current[index] = audio;
        console.log(audio);
      });

      try {
        await Promise.all(loadPromises);
        setAllPreloaded(true);
      } catch (error) {
        console.error("Error preloading audio files", error);
      }
    };

    loadAudioFiles();
  }, [audioArray]);

  useEffect(() => {
    let timer;
    if (allPreloaded) {
      timer = setInterval(() => {
        if (currentPosition < audioArray.length) {
          const audio = audioRefs.current[currentPosition];
          if (audio) {
            audio.play().catch((error) => {
              console.error(
                `Error playing audio file: ${audioArray[currentPosition]}`,
                error
              );
            });
          } else {
            console.error(
              `Audio file not preloaded: ${audioArray[currentPosition]}`
            );
          }

          setCurrentPosition((prev) => prev + 1);
        }
      }, spokenInterval);
    }
    return () => clearInterval(timer);
  }, [audioArray, spokenInterval, currentPosition, allPreloaded]);

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

export default memo(MemoSpoken);
