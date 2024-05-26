import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../UIElements/Loading";
import useHttp from "../../hooks/http-hook";

import classes from "./Saving.module.css";

const Saving = ({ dispatch, title }) => {
  const { score, time, mistakes } = useSelector((state) => state.result);

  const { sendRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const result = async () => {
      try {
        await sendRequest(
          "/api/v1/results",
          "POST",
          JSON.stringify({
            score,
            time: time / 1000,
            table: title,
            mistakes,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setIsLoading(false);
        dispatch({ type: "RESULT" });
      } catch (error) {
        console.log(error);
      }
    };

    isOnline && result();
  }, [sendRequest, score, time, title, mistakes, isOnline, dispatch]);

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

export default Saving;
