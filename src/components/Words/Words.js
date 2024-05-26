import { useCallback, useEffect, useState } from "react";
import useChangePage from "../../hooks/change-page-hook";
import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import PreparePage from "./PreparePage";
import { shuffleArray } from "../../helpers/shuffleArray";
import CountDown from "../TrainStartElements/CountDown";
import MemoWords from "./MemoWords";
import RecallWords from "./RecallWords";
import ShowResults from "./ShowResults";
import SummitResult from "../ShareDiscipline/SummitResult";
import { getScoreAndCorrectWords } from "../../helpers/calculateScoreCorrect";

const Words = ({
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
  const [randomWordsArray, setRandomWordsArray] = useState([]);
  const [showRecalledWordsArray, setShowRecalledWordsArray] = useState([]);
  const [wordsRecalledArray, setWordsRecalledArray] = useState([]);
  const [preloadData, setPreloadData] = useState(false);
  const [language, setLanguage] = useState("arabic");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLanguage(localStorage.getItem(`wordsLanguage`) || "arabic");
    }
  }, []);

  // generate recall element Array
  const generateRecallElement = () => {
    let recalledWordsEmptyArray = [];

    for (let i = 0; i < amount; i++) {
      recalledWordsEmptyArray.push("");
    }

    setWordsRecalledArray(recalledWordsEmptyArray);
    return recalledWordsEmptyArray;
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
    memoData: randomWordsArray,
    showData: showRecalledWordsArray,
    recallData: wordsRecalledArray,
    language,
  });

  const generateListOfRandomWords = async () => {
    const concreteWords = await getWordsEachCategory("concrete", 80);
    const abstractWords = await getWordsEachCategory("abstract", 10);
    const verbWords = await getWordsEachCategory("verb", 10);

    const setOfWords = shuffleArray([
      ...concreteWords,
      ...abstractWords,
      ...verbWords,
    ]);

    // to delete repeated element
    const uniqueArray = [...new Set(setOfWords)];

    setRandomWordsArray(uniqueArray);
    setShowRecalledWordsArray(uniqueArray);
  };

  const getWordsEachCategory = async (type, percent) => {
    const words = await fetch(`/words/${language}/${type}.txt`);
    const wordsText = await words.text();
    const allWordsArray = wordsText.split(/\r?\n/);

    let filteredWords = allWordsArray.filter((word) => {
      // Check if the word doesn't have more than one word and contains only letters
      return (
        word.split(" ").length === 1 && /^[a-zA-Z\u0600-\u06FF]+$/.test(word)
      );
    });

    if (percent <= 0 || percent > 100) {
      throw new Error("Percentage should be between 1 and 100.");
    }

    const amountRequired = Math.round((amount * percent) / 100);

    const randomIndices = [];
    while (randomIndices.length < amountRequired) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    const randomWords = [];
    for (let i = 0; i < randomIndices.length; i++) {
      randomWords.push(filteredWords[randomIndices[i]]);
    }

    return randomWords;
  };

  const preloadDataHandler = async () => {
    await generateListOfRandomWords();
    generateRecallElement();
    setPreloadData(true);
  };

  const resetDataHandler = useCallback(() => {
    setRandomWordsArray([]);
    setWordsRecalledArray([]);
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
          <MemoWords
            memoTime={memoTime}
            title={title}
            randomWordsArray={randomWordsArray}
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
          <RecallWords
            recallTime={recallTime}
            title={title}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            amount={amount}
            sum={grouping * 1}
            wordsRecalledArray={wordsRecalledArray}
            setWordsRecalledArray={setWordsRecalledArray}
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
            recalledArray={wordsRecalledArray}
            randomArray={randomWordsArray}
            getScoreAndCorrect={getScoreAndCorrectWords}
            amount={amount}
            numberBerRow={numberBerRow}
            showResultHandler={showResultHandler}
          />
        )}

        {result && (
          <ShowResults
            wordsRecalledArray={wordsRecalledArray}
            randomWordsArray={randomWordsArray}
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

export default Words;
