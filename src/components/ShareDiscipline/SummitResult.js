import { useEffect, useState } from "react";
import useHttp from "../../hooks/http-hook";
import { useSelector } from "react-redux";
import Loading from "../UIElements/Loading";

import classes from "./SummitResult.module.css";

const SummitResult = ({
  calculatePoints,
  custom,
  recalledArray,
  randomArray,
  getScoreAndCorrect,
  amount,
  numberBerRow,
  cardsFromLeftToRight,
  showResultHandler,
}) => {
  const { sendRequest } = useHttp();
  const { memorizationTime, recallTime, disciplineId } = useSelector(
    (state) => state.result
  );
  const [isLoading, setIsLoading] = useState(true);

  // calculate score and correct
  const { score, correct } = getScoreAndCorrect(
    randomArray,
    recalledArray,
    amount,
    numberBerRow,
    cardsFromLeftToRight
  );

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    // check online or offline status
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  // save result in db function
  useEffect(() => {
    const createDisciplineResult = async () => {
      let points = 0;
      if (!custom) {
        points = calculatePoints(score, memorizationTime);
      }

      try {
        await sendRequest(
          `/api/v1/disciplines/update-discipline/${disciplineId}`,
          "PATCH",
          JSON.stringify({
            memoTime: memorizationTime,
            recallTime,
            recallData: recalledArray,
            score,
            correct,
            points: points || 0,
          }),
          { "Content-Type": "application/json" }
        );

        setIsLoading(false);
        showResultHandler();
      } catch (error) {
        console.log(error);
      }
    };

    // execute when user online
    isOnline && createDisciplineResult();
  }, [
    calculatePoints,
    correct,
    memorizationTime,
    score,
    sendRequest,
    recalledArray,
    recallTime,
    disciplineId,
    custom,
    showResultHandler,
    isOnline,
  ]);

  return (
    isLoading && (
      <div className={classes["summit-result"]}>
        <Loading />

        {!isOnline && (
          <p className={classes.message}>
            No internet :(
            <br />
            <b>Please Leave this page open!</b>
            <br />
            and check your internet connections!
          </p>
        )}

        {isOnline && (
          <p className={classes.message}>
            please wait :)
            <br />
            Saving your results!
          </p>
        )}
      </div>
    )
  );
};

export default SummitResult;
