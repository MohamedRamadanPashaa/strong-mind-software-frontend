import { useCallback, useEffect, useState } from "react";
import useChangePage from "../../hooks/change-page-hook";
import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import PreparePage from "./PreparePage";
import CountDown from "../TrainStartElements/CountDown";
import MemoDates from "./MemoDates";
import RecallDates from "./RecallDates";
import { shuffleArray } from "../../helpers/shuffleArray";
import ShowResults from "./ShowResults";
import SummitResult from "../ShareDiscipline/SummitResult";
import { getScoreAndCorrectDates } from "../../helpers/calculateScoreCorrect";

const Dates = ({
  memoTime: memorizationTime,
  recallTime: recallT,
  title,
  amount: amountOfData,
  numberBerRow,
  rowInPage,
  calculatePoints,
  custom,
  standard,
  type,
  defaultGrouping,
}) => {
  const [randomDatesArray, setRandomDatesArray] = useState([]);
  const [showRecalledDatesArray, setShowRecalledDatesArray] = useState([]);
  const [datesRecalledArray, setDatesRecalledArray] = useState([]);
  const [preloadData, setPreloadData] = useState(false);
  const [language, setLanguage] = useState("arabic");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLanguage(localStorage.getItem(`wordsLanguage`) || "arabic");
    }
  }, []);

  // generate recall element Array
  const generateRecallElement = () => {
    let recalledDatesEmptyArray = [];

    for (let i = 0; i < amount; i++) {
      recalledDatesEmptyArray.push("");
    }

    setDatesRecalledArray(recalledDatesEmptyArray);
    return recalledDatesEmptyArray;
  };

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
    memoData: randomDatesArray,
    showData: showRecalledDatesArray,
    recallData: datesRecalledArray,
    language,
  });

  const generateRandomDates = async () => {
    const allDates = await fetch(`/dates/${language}/dates.txt`);
    const allDatesText = await allDates.text();
    let allDatesArray = allDatesText.split(/\r?\n/);
    allDatesArray = allDatesArray.filter(
      (el) => el.split(" ").length <= 6 && el.split(" ").length >= 2
    );

    const events = getListOfRandomEvent(allDatesArray);
    const years = getListOfRandomYears(1000, 2100, amount);

    const dates = events.map((el, i) => {
      return `${years[i]} ${el}`;
    });

    setRandomDatesArray(dates);

    const recallDates = shuffleArray(dates);
    setShowRecalledDatesArray(recallDates);
  };

  const getListOfRandomEvent = (allDates) => {
    const randEventArray = [];
    let newAllDate = [...allDates];
    for (let i = 0; i < amount; i++) {
      const randomDateIndex = Math.floor(Math.random() * newAllDate.length);
      const ranEvent = newAllDate.splice(randomDateIndex, 1);
      randEventArray.push(...ranEvent);
    }

    return randEventArray;
  };

  const getListOfRandomYears = (min, max, count) => {
    // Check if it's possible to generate the requested count of unique numbers
    if (count > max - min + 1) return null;

    const ranYears = [];
    while (ranYears.length < count) {
      const ranYear = Math.floor(Math.random() * (max - min + 1) + min);

      // Check if the generated number is not already in the array
      if (!ranYears.includes(ranYear)) ranYears.push(ranYear);
    }

    return ranYears;
  };

  const preloadDataHandler = async () => {
    await generateRandomDates();
    generateRecallElement();
    setPreloadData(true);
  };

  const resetDataHandler = useCallback(() => {
    setRandomDatesArray([]);
    setDatesRecalledArray([]);
    setPreloadData(false);
  }, []);

  return (
    <>
      {/* <Prompt isDirty={countdown || memo || recallCountdown || recall} /> */}

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
            startCountDownHandler={startCountDownHandler}
            preloadDataHandler={preloadDataHandler}
            resetDataHandler={resetDataHandler}
            custom={custom}
            standard={standard}
            isLoading={isLoading}
            preloadData={preloadData}
            type={type}
            language={language}
            setLanguage={setLanguage}
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

        {memo && (
          <MemoDates
            memoTime={memoTime}
            title={title}
            randomDatesArray={randomDatesArray}
            amount={amount}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            sum={grouping * 1}
            numberOfPage={numberOfPage}
            startRecallHandler={startRecallCountdownHandler}
            memo={true}
            standard={standard}
            custom={custom}
            language={language}
          />
        )}

        {recallCountdown && (
          <CountDown
            text={"Recall Will Start In"}
            countSeconds={10}
            startMemoHandler={startRecallHandler}
            custom={custom}
          />
        )}

        {recall && (
          <RecallDates
            recallTime={recallTime}
            title={title}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            amount={amount}
            sum={1}
            datesRecalledArray={datesRecalledArray}
            showRecalledDatesArray={showRecalledDatesArray}
            setDatesRecalledArray={setDatesRecalledArray}
            numberOfPage={numberOfPage}
            showResultHandler={startSummitResultHandler}
            custom={custom}
            language={language}
          />
        )}

        {summitResult && (
          <SummitResult
            calculatePoints={calculatePoints}
            custom={custom}
            recalledArray={datesRecalledArray}
            randomArray={showRecalledDatesArray}
            getScoreAndCorrect={getScoreAndCorrectDates}
            amount={amount}
            numberBerRow={numberBerRow}
            showResultHandler={showResultHandler}
          />
        )}

        {result && (
          <ShowResults
            datesRecalledArray={datesRecalledArray}
            showRecalledDatesArray={showRecalledDatesArray}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={amount}
            title={title}
            playAgainHandler={playAgainHandler}
            calculatePoints={calculatePoints}
            custom={custom}
            language={language}
          />
        )}
      </DisciplineCard>
    </>
  );
};

export default Dates;
