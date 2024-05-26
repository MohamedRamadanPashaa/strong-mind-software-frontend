import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMemorizationTime, setRecallTime } from "../../store/resultSlice";
import { socket } from "../../helpers/socket";

const Timer = ({
  time: memoTime,
  startRecallHandler,
  running,
  memo,
  view,
  recalledArray,
  setNumbersRecalledArray,
}) => {
  const dispatch = useDispatch();
  const [memoStartAt, setMemoStartAt] = useState(Date.now());
  const [time, setTime] = useState(memoTime * 60 * 1000);
  const { disciplineId, competitionId } = useSelector((state) => state.result);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime(memoTime * 60 * 1000 - (Date.now() - memoStartAt));
      }, 1000);

      if (time <= 2) {
        // if view and match is finish
        // if we are in memo and not in view
        if (memo && !view) {
          // set memo time
          dispatch(setMemorizationTime(memoTime * 60));

          // send memo time to socket
          const data = {
            disciplineId,
            memorizationTimeTaken: memoTime * 60,
          };
          disciplineId && competitionId && socket.emit("set-match-data", data);
        }

        // if we are in recall and not in view
        if (!memo && !view) {
          // set recall array and recall time
          dispatch(setRecallTime(memoTime * 60));
          setNumbersRecalledArray(recalledArray);

          // send that data to socket with finish true
          const data = {
            disciplineId,
            recallTimeTaken: memoTime * 60,
            running: false,
          };
          if (disciplineId && competitionId)
            socket.emit("set-match-data", data);
        }

        // stop the timer and dispatch the next stage
        clearInterval(timer);
        startRecallHandler();
      }
    } else if (!running) {
      let timeTaken = Math.round((Date.now() - memoStartAt) / 10) / 100;

      // if we are in memo and not in view
      if (memo && !view) {
        // set memo time
        dispatch(setMemorizationTime(timeTaken));

        // send memo time to socket
        const data = {
          disciplineId,
          memorizationTimeTaken: timeTaken,
        };
        if (disciplineId && competitionId) socket.emit("set-match-data", data);
      }

      // if we are in recall and not in view
      if (!memo && !view) {
        // set recall array and recall time
        dispatch(setRecallTime(timeTaken));
        setNumbersRecalledArray(recalledArray);

        // send that data to socket
        const data = {
          disciplineId,
          recallTimeTaken: timeTaken,
          running: false,
        };
        if (disciplineId && competitionId) socket.emit("set-match-data", data);
      }

      clearInterval(timer);
      startRecallHandler();
    }

    return () => clearInterval(timer);
  }, [running, time]);

  return (
    <>
      {memoTime >= 60 && (
        <>
          <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}</span>:
        </>
      )}
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </>
  );
};

export default memo(Timer);
