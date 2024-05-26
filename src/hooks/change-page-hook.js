import { useEffect, useReducer, useState } from "react";
import useHttp from "./http-hook";
import { useDispatch, useSelector } from "react-redux";
import { setCompetitionId, setDisciplineId } from "../store/resultSlice";
import { socket } from "../helpers/socket";

const initialState = {
  prepare: true,
  countdown: false,
  memo: false,
  recallCountdown: false,
  recall: false,
  summitResult: false,
  result: false,
};

const dispatchHandler = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...initialState };
    case "COUNTDOWN":
      return {
        ...state,
        prepare: false,
        countdown: true,
        memo: false,
        recallCountdown: false,
        recall: false,
        summitResult: false,
        result: false,
      };

    case "MEMO":
      return {
        ...state,
        prepare: false,
        countdown: false,
        memo: true,
        recallCountdown: false,
        recall: false,
        summitResult: false,
        result: false,
      };

    case "RECALL_COUNTDOWN":
      return {
        ...state,
        prepare: false,
        countdown: false,
        memo: false,
        recallCountdown: true,
        recall: false,
        summitResult: false,
        result: false,
      };

    case "RECALL":
      return {
        ...state,
        prepare: false,
        countdown: false,
        memo: false,
        recallCountdown: false,
        recall: true,
        summitResult: false,
        result: false,
      };

    case "SUMMIT_RESULT":
      return {
        ...state,
        prepare: false,
        countdown: false,
        memo: false,
        recallCountdown: false,
        recall: false,
        summitResult: true,
        result: false,
      };

    case "RESULT":
      return {
        ...state,
        prepare: false,
        countdown: false,
        memo: false,
        recallCountdown: false,
        recall: false,
        summitResult: false,
        result: true,
      };
    default:
      return initialState;
  }
};

const useChangePage = ({
  amountOfData,
  defaultGrouping,
  memorizationTime,
  recallT,
  type,
  numberBerRow,
  rowInPage,
  title,
  standard,
  memoData,
  recallData,
  showData,
  skipFinal,
  gap,
  suits,
  cardsFromLeftToRight,
  language,
}) => {
  const [countSeconds, setCountSeconds] = useState(5);
  const [amount, setAmount] = useState(amountOfData);
  const [grouping, setGrouping] = useState(defaultGrouping);
  const [memoTime, setMemoTime] = useState(memorizationTime);
  const [recallTime, setRecallTime] = useState(recallT);
  const [groupingArray, setGroupingArray] = useState([]);
  const [state, dispatch] = useReducer(dispatchHandler, initialState);
  const [isValid, setIsValid] = useState(false);
  const { isLoading, sendRequest } = useHttp();
  const { competitionId, myCompetitions } = useSelector(
    (state) => state.result
  );

  const dispatchRedux = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCountSeconds(localStorage.getItem("countSeconds") * 1 || 5);
      setGrouping(localStorage.getItem(`${type}Grouping`) || defaultGrouping);
      setAmount(amountOfData);
      setMemoTime(memorizationTime);
      setRecallTime(recallT);
    }
  }, [amountOfData, memorizationTime, recallT]);

  // set the validity of press start
  useEffect(() => {
    setIsValid(
      !grouping ||
        !groupingArray ||
        !countSeconds ||
        countSeconds > 60 ||
        countSeconds < 1 ||
        amount < 1 ||
        memoTime <= 0 ||
        recallTime <= 0
    );
  }, [groupingArray, countSeconds, grouping, amount, memoTime, recallTime]);

  const startCountDownPageHandler = () => {
    dispatch({ type: "COUNTDOWN" });
  };

  // When click start button
  const startMemoHandler = () => {
    // open memo page
    dispatch({ type: "MEMO" });
  };

  const startRecallCountdownHandler = () => {
    dispatch({ type: "RECALL_COUNTDOWN" });
  };

  const startRecallHandler = () => {
    dispatch({ type: "RECALL" });
  };

  const startSummitResultHandler = () => {
    dispatch({ type: "SUMMIT_RESULT" });
  };

  const showResultHandler = () => {
    dispatch({ type: "RESULT" });
  };

  const playAgainHandler = () => {
    dispatch({ type: "INIT" });
  };

  const {
    prepare,
    countdown,
    memo,
    recallCountdown,
    recall,
    result,
    summitResult,
  } = state;
  const sum =
    groupingArray.length > 0
      ? groupingArray?.map((el) => el * 1).reduce((el, a) => el + a, 0)
      : grouping * 1;
  const numberOfPage = Math.ceil(amount / (numberBerRow * rowInPage));

  // save result in db function
  const createDisciplineResult = async () => {
    try {
      const competition = myCompetitions.find(
        (comp) => comp._id === competitionId
      );
      const disciplineData = {
        discipline: title,
        standard,
        memoData: showData,
        recallData,
        memoTime: memoTime * 60,
        recallTime: recallTime * 60,
        language,
      };

      if (competition) {
        disciplineData.competitionId = competitionId;
      } else {
        dispatchRedux(setCompetitionId(""));
        localStorage.setItem("competitionId", "");
      }

      const { data } = await sendRequest(
        `/api/v1/disciplines/new-result`,
        "POST",
        JSON.stringify(disciplineData),
        { "Content-Type": "application/json" }
      );

      dispatchRedux(setDisciplineId(data.newResult._id));
      return data.newResult;
    } catch (error) {
      console.log(error);
    }
  };

  const startCountDownHandler = async () => {
    if (memoData.length <= 0) return;

    const disciplineCreated = await createDisciplineResult();
    // console.log(disciplineCreated);

    const data = {
      disciplineId: disciplineCreated._id,
      memoData,
      recallData,
      showData,
      countSeconds,
      memoTime,
      recallTime,
      memorizationTimeTaken: 0,
      recallTimeTaken: 0,
      competitor: disciplineCreated.competitor,
      discipline: disciplineCreated.discipline,
      startedAt: Date.now() / 1000,
      recallCountSeconds: 10,
      competitionId,
      competition: myCompetitions.find((comp) => comp._id === competitionId),
      numberBerRow,
      rowInPage,
      sum,
      groupingArray,
      numberOfPage,
      standard,
      amount,
      running: true,
      skipFinal,
      gap,
      suits,
      cardsFromLeftToRight,
      language,
    };

    const competition = myCompetitions.find(
      (comp) => comp._id === competitionId
    );

    if (competition && memoData.length > 0 && competitionId) {
      socket.emit("create-match", data);
    }

    startCountDownPageHandler();
  };

  return {
    prepare,
    countdown,
    memo,
    recallCountdown,
    recall,
    result,
    startMemoHandler,
    startRecallCountdownHandler,
    startRecallHandler,
    showResultHandler,
    playAgainHandler,
    isValid,
    setCountSeconds,
    setAmount,
    setGrouping,
    setGroupingArray,
    setMemoTime,
    setRecallTime,
    amount,
    groupingArray,
    memoTime,
    recallTime,
    countSeconds,
    grouping,
    sum,
    numberOfPage,
    isLoading,
    startCountDownHandler,
    startSummitResultHandler,
    summitResult,
  };
};

export default useChangePage;
