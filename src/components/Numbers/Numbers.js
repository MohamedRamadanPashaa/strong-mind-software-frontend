import { useCallback, useEffect, useState } from "react";
import CountDown from "../TrainStartElements/CountDown";
import PreparePage from "./PreparePage";
import MemoNumbers from "./MemoNumbers";
import RecallPage from "./RecallPage";
import ShowResults from "./ShowResults";
import useChangePage from "../../hooks/change-page-hook";

import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import MemoSpoken from "./MemoSpoken";
import SummitResult from "../ShareDiscipline/SummitResult";
import {
  getScoreAndCorrectNumbers,
  getScoreAndCorrectSpokenNumbers,
} from "../../helpers/calculateScoreCorrect";

const Numbers = ({
  memoTime: memorizationTime,
  title,
  recallTime: recallT,
  amount: amountOfData,
  numberBerRow,
  factor,
  rowInPage,
  calculatePoints,
  custom,
  standard,
  type,
  defaultGrouping,
}) => {
  const [randomNumbersArray, setRandomNumbersArray] = useState([]);
  const [numbersRecalledArray, setNumbersRecalledArray] = useState([]);
  const [preloadData, setPreloadData] = useState(false);
  const [spokenInterval, setSpokenInterval] = useState(1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSpokenInterval(
        custom ? localStorage.getItem("spokenInterval") || 1000 : 1000
      );
    }
  }, [custom]);

  const {
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
  } = useChangePage({
    amountOfData,
    defaultGrouping,
    memorizationTime,
    recallT,
    type,
    numberBerRow,
    rowInPage,
    title,
    standard,
    memoData: randomNumbersArray,
    recallData: numbersRecalledArray,
    showData: randomNumbersArray,
  });

  // generate amount of numbers
  const generateRandomNumbersHandler = () => {
    const randomNumbersArray = [];

    for (let i = 0; i < amount; i++) {
      const randomNumber = Math.floor(Math.random() * factor);
      randomNumbersArray.push(randomNumber);
    }

    setRandomNumbersArray(randomNumbersArray);
    return randomNumbersArray;
  };

  // generate recall element Array
  const generateRecallElement = () => {
    let recalledNumbersEmptyArray = [];

    for (let i = 0; i < amount; i++) {
      recalledNumbersEmptyArray.push("");
    }

    setNumbersRecalledArray(recalledNumbersEmptyArray);
    return recalledNumbersEmptyArray;
  };

  // Function to preload audio files
  const preloadAudio = async () => {
    const audioFiles = ["a", "b", "c", "Silent", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    await Promise.all(
      audioFiles.map(async (number) => {
        const audio = new Audio(`/sounds/spoken/${number}.wav`);
        await audio.load();
        console.log(audio);
      })
    );
  };

  const preloadDataHandler = async () => {
    generateRandomNumbersHandler();
    generateRecallElement();
    type === "spoken" && (await preloadAudio());
    setPreloadData(true);
  };

  const resetDataHandler = useCallback(() => {
    setRandomNumbersArray([]);
    setNumbersRecalledArray([]);
    setPreloadData(false);
  }, []);

  // show prompt on beforeunload
  // const [showPrompt, setShowPrompt] = useState(false);
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (countdown || memo || recallCountdown || recall) {
  //       event.preventDefault();
  //       event.returnValue = "";
  //       console.log(event);
  //       setShowPrompt(true);
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload); // Remove listener on cleanup
  // }, [countdown, memo, recallCountdown, recall]);

  // const onCancel = () => setShowPrompt(false);
  // const onConfirm = () => (window.onbeforeunload = null);

  return (
    <>
      {/* <Prompt show={showPrompt} onCancel={onCancel} onConfirm={onConfirm} /> */}

      <DisciplineCard>
        {prepare && (
          <PreparePage
            title={title}
            countSeconds={countSeconds}
            setCountSeconds={setCountSeconds}
            memoTime={memoTime}
            setMemoTime={setMemoTime}
            recallTime={recallTime}
            setRecallTime={setRecallTime}
            amount={amount}
            setAmount={setAmount}
            grouping={grouping}
            setGrouping={setGrouping}
            groupingArray={groupingArray}
            setGroupingArray={setGroupingArray}
            isValid={isValid}
            numberBerRow={numberBerRow}
            factor={factor}
            startCountDownHandler={startCountDownHandler}
            preloadDataHandler={preloadDataHandler}
            resetDataHandler={resetDataHandler}
            custom={custom}
            standard={standard}
            isLoading={isLoading}
            preloadData={preloadData}
            type={type}
            spokenInterval={spokenInterval}
            setSpokenInterval={setSpokenInterval}
          />
        )}

        {countdown && (
          <CountDown
            text={"Memorization Will Start In"}
            countSeconds={countSeconds}
            startMemoHandler={startMemoHandler}
            custom={custom}
          />
        )}

        {memo &&
          (type === "spoken" ? (
            <MemoSpoken
              title={title}
              randomNumbersArray={randomNumbersArray}
              startRecallHandler={startRecallCountdownHandler}
              custom={custom}
              spokenInterval={spokenInterval}
            />
          ) : (
            <MemoNumbers
              memoTime={memoTime}
              groupingArray={groupingArray}
              title={title}
              randomNumbersArray={randomNumbersArray}
              amount={amount}
              factor={factor}
              numberBerRow={numberBerRow}
              rowInPage={rowInPage}
              sum={sum}
              numberOfPage={numberOfPage}
              startRecallHandler={startRecallCountdownHandler}
              memo={true}
              standard={standard}
              custom={custom}
            />
          ))}

        {recallCountdown && (
          <CountDown
            text={"Recall Will Start In"}
            countSeconds={10}
            startMemoHandler={startRecallHandler}
            custom={custom}
          />
        )}

        {recall && (
          <RecallPage
            recallTime={recallTime}
            groupingArray={groupingArray}
            title={title}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            amount={amount}
            sum={sum}
            numbersRecalledArray={numbersRecalledArray}
            setNumbersRecalledArray={setNumbersRecalledArray}
            numberOfPage={numberOfPage}
            showResultHandler={startSummitResultHandler}
            factor={factor}
            custom={custom}
          />
        )}

        {summitResult && (
          <SummitResult
            calculatePoints={calculatePoints}
            custom={custom}
            recalledArray={numbersRecalledArray}
            randomArray={randomNumbersArray}
            getScoreAndCorrect={
              title === "Spoken Numbers"
                ? getScoreAndCorrectSpokenNumbers
                : getScoreAndCorrectNumbers
            }
            amount={amount}
            numberBerRow={numberBerRow}
            showResultHandler={showResultHandler}
          />
        )}

        {result && (
          <ShowResults
            numbersRecalledArray={numbersRecalledArray}
            randomNumbersArray={randomNumbersArray}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={amount}
            title={title}
            playAgainHandler={playAgainHandler}
            calculatePoints={calculatePoints}
            custom={custom}
            standard={standard}
          />
        )}
      </DisciplineCard>
    </>
  );
};

export default Numbers;
