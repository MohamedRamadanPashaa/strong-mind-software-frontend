import { useEffect, useState } from "react";

const useViewChangePage = ({
  startedAt,
  countSeconds,
  memoTime,
  recallCountSeconds,
  recallTime,
}) => {
  const timeToCountdown = startedAt + countSeconds;
  const timeToMemo = timeToCountdown + memoTime * 60;
  const timeToRecCountdown = timeToMemo + recallCountSeconds;
  const timeToRecall = timeToRecCountdown + recallTime * 60;

  const [countdown, setCountdown] = useState(
    timeToCountdown > Date.now() / 1000 && startedAt < Date.now() / 1000
  );
  useEffect(() => {
    setCountdown(
      timeToCountdown > Date.now() / 1000 && startedAt < Date.now() / 1000
    );
  }, [timeToCountdown, startedAt]);

  const [memo, setMemo] = useState(
    timeToMemo > Date.now() / 1000 && timeToCountdown < Date.now() / 1000
  );
  useEffect(() => {
    setMemo(
      timeToMemo > Date.now() / 1000 && timeToCountdown < Date.now() / 1000
    );
  }, [timeToCountdown, timeToMemo]);

  const [recallCountdown, setRecallCountdown] = useState(
    timeToRecCountdown > Date.now() / 1000 && timeToMemo < Date.now() / 1000
  );
  useEffect(() => {
    setRecallCountdown(
      timeToRecCountdown > Date.now() / 1000 && timeToMemo < Date.now() / 1000
    );
  }, [timeToMemo, timeToRecCountdown]);

  const [recall, setRecall] = useState(
    timeToRecall > Date.now() / 1000 && timeToRecCountdown < Date.now() / 1000
  );
  useEffect(() => {
    setRecall(
      timeToRecall > Date.now() / 1000 && timeToRecCountdown < Date.now() / 1000
    );
  }, [timeToRecall, timeToRecCountdown]);

  const [result, setResult] = useState(timeToRecall < Date.now() / 1000);
  useEffect(() => {
    setResult(timeToRecall < Date.now() / 1000);
  }, [timeToRecall]);

  const startMemoHandler = () => {
    setCountdown(false);
    setMemo(true);
    setRecallCountdown(false);
    setRecall(false);
    setResult(false);
  };

  const startRecallCountdownHandler = () => {
    setCountdown(false);
    setMemo(false);
    setRecallCountdown(true);
    setRecall(false);
    setResult(false);
  };

  const startRecallHandler = () => {
    setCountdown(false);
    setMemo(false);
    setRecallCountdown(false);
    setRecall(true);
    setResult(false);
  };

  const startResultHandler = () => {
    setCountdown(false);
    setMemo(false);
    setRecallCountdown(false);
    setRecall(false);
    setResult(true);
  };

  return {
    countdown,
    memo,
    recall,
    recallCountdown,
    result,
    startMemoHandler,
    startRecallHandler,
    startRecallCountdownHandler,
    startResultHandler,
    timeToCountdown,
    timeToMemo,
    timeToRecCountdown,
  };
};

export default useViewChangePage;
