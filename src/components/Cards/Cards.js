import { useCallback, useEffect, useState } from "react";
import useChangePage from "../../hooks/change-page-hook";
import DisciplineCard from "../ShareDiscipline/DisciplineCard";
import PreparePage from "./PreparePage";
import CountDown from "../TrainStartElements/CountDown";
import MemoCards from "./MemoCards";
import RecallCards from "./RecallCards";
import ShowResults from "./ShowResults";
import { getOneBigArray } from "../../helpers/DivideArrayIntoSmallArray";
// import Prompt from "../Prompt/Prompt";
import SummitResult from "../ShareDiscipline/SummitResult";
import {
  getScoreAndCorrectLongCard,
  getScoreCorrectSpeedCards,
} from "../../helpers/calculateScoreCorrect";
import { useSelector } from "react-redux";

export const generateDeckOfCard = (suits = "♠♥♣♦") => {
  let oneDeckImg = [];
  let deckForms = suits.split("");

  for (let j = 0; j < deckForms.length; j++) {
    let cardArray = [];
    for (let i = 0; i < 13; i++) {
      let cardNum = 1;
      if (i === 0) {
        cardNum = "A";
      } else if (i <= 9 && i > 0) {
        cardNum = i + 1;
      } else if (i === 10) {
        cardNum = "J";
      } else if (i === 11) {
        cardNum = "Q";
      } else if (i === 12) {
        cardNum = "K";
      }

      cardArray.push(`${cardNum}${deckForms[j]}.png`);
    }

    oneDeckImg.push(...cardArray);
  }
  return oneDeckImg;
};

const Cards = ({
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
  const [randomCardsArray, setRandomCardsArray] = useState([]);
  const [randomCardsArraySeparatePage, setRandomCardsArraySeparatePage] =
    useState([]);
  const [showRecalledCardsArray, setShowRecalledCardsArray] = useState([]);
  const [cardsRecalledArray, setCardsRecalledArray] = useState([]);
  const [cardsRecalledArraySeparatePage, setCardsRecalledArraySeparatePage] =
    useState([]);
  const [loadedAmount, setLoadedAmount] = useState(0);
  const [preloadData, setPreloadData] = useState(false);
  const [gapBetweenCards, setGapBetweenCards] = useState();
  const [cardsFromLeftToRight, setCardsFromLeftToRight] = useState(false);

  const [cardsSuits, setCardsSuits] = useState("♠♥♣♦");
  const { memorizationTime: memorizationTimeTaken } = useSelector(
    (state) => state.result
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCardsFromLeftToRight(
        JSON.parse(localStorage.getItem("cardsFromLeftToRight")) === false
          ? false
          : true
      );

      setGapBetweenCards(
        JSON.parse(localStorage.getItem("gapBetweenCards")) === false
          ? false
          : true
      );

      setCardsSuits(localStorage.getItem("cardsSuits") || "♠♥♣♦");
    }
  }, []);

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
    amountOfData: amountOfData * 52,
    defaultGrouping,
    memorizationTime,
    recallT,
    type,
    numberBerRow,
    rowInPage,
    title,
    standard,
    memoData: randomCardsArray,
    showData: showRecalledCardsArray,
    recallData: cardsRecalledArray,
    gap: gapBetweenCards,
    suits: cardsSuits,
    cardsFromLeftToRight,
  });

  const generateRandomCardArray = () => {
    let randomArray = [];
    let randomArraySeparatePage = [];
    for (let i = 0; i < Math.ceil(amount / 52); i++) {
      let oneRanDeck = [];
      const deckArr = generateDeckOfCard(cardsSuits);

      for (let j = 0; j < 52; j++) {
        const randIndex = Math.floor(Math.random() * deckArr.length);
        oneRanDeck.push(deckArr.splice(randIndex, 1)[0]);
      }

      randomArray.push(...oneRanDeck);
      randomArraySeparatePage.push(oneRanDeck);
    }

    setRandomCardsArray(randomArray);
    setShowRecalledCardsArray(randomArray);
    setRandomCardsArraySeparatePage(randomArraySeparatePage);
    return randomArray;
  };

  // generate recall element Array
  const generateRecallElement = () => {
    let recalledEmptyArray = [];

    for (let i = 0; i < Math.ceil(amount / 52) * 52; i++) {
      recalledEmptyArray.push("");
    }

    setCardsRecalledArray(recalledEmptyArray);

    let newRecEmpty = [...recalledEmptyArray];
    let recallArr = [];
    for (let j = 0; j < numberOfPage; j++) {
      recallArr.push(newRecEmpty.splice(0, numberBerRow));
    }

    setCardsRecalledArraySeparatePage(recallArr);
    return recalledEmptyArray;
  };

  // preload 52 cards before start
  const preloadCardsImgHandler = async () => {
    const deckArr = [...generateDeckOfCard(), "blank_card.png"];
    let loadedArr = [];

    const promises = await deckArr.map((image, i) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function () {
          resolve(`/img/cards/${image}`);
          loadedArr.push(i);
          setLoadedAmount(loadedArr.length / deckArr.length);

          if (loadedArr.length / deckArr.length === 1) {
            // setPreloadData(false);
          }
        };

        img.onerror = () => reject();
        img.src = `/img/cards/${image}`;
      });
    });

    await Promise.all(promises);
  };

  const preloadDataHandler = async () => {
    generateRandomCardArray();
    generateRecallElement();
    await preloadCardsImgHandler();
    setPreloadData(true);
  };

  const resetDataHandler = useCallback(() => {
    setRandomCardsArray([]);
    setCardsRecalledArray([]);
    setPreloadData(false);
    setLoadedAmount(0);
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
            loadedAmount={loadedAmount}
            gapBetweenCards={gapBetweenCards}
            setGapBetweenCards={setGapBetweenCards}
            cardsSuits={cardsSuits}
            setCardsSuits={setCardsSuits}
            cardsFromLeftToRight={cardsFromLeftToRight}
            setCardsFromLeftToRight={setCardsFromLeftToRight}
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
          <MemoCards
            memoTime={memoTime}
            title={title}
            randomCardsArray={randomCardsArraySeparatePage}
            amount={amount}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            sum={grouping * 1}
            numberOfPage={numberOfPage}
            startRecallHandler={startRecallCountdownHandler}
            memo={true}
            standard={standard}
            custom={custom}
            gapBetweenCards={gapBetweenCards}
            cardsFromLeftToRight={cardsFromLeftToRight}
          />
        )}

        {recallCountdown && (
          <CountDown
            text={"Recall Will Start In"}
            countSeconds={
              title === "Speed Cards"
                ? memoTime * 60 - memorizationTimeTaken + 10
                : 10
            }
            startMemoHandler={startRecallHandler}
            custom={custom}
          />
        )}

        {recall && (
          <RecallCards
            recallTime={recallTime}
            title={title}
            numberBerRow={numberBerRow}
            rowInPage={rowInPage}
            cardsRecalledArraySeparatePage={cardsRecalledArraySeparatePage}
            setCardsRecalledArray={setCardsRecalledArray}
            numberOfPage={numberOfPage}
            showResultHandler={startSummitResultHandler}
            custom={custom}
            arrangedDeck={generateDeckOfCard(cardsSuits)}
            cardsFromLeftToRight={cardsFromLeftToRight}
          />
        )}

        {summitResult && (
          <SummitResult
            calculatePoints={calculatePoints}
            custom={custom}
            recalledArray={getOneBigArray(cardsRecalledArray)}
            randomArray={randomCardsArray}
            getScoreAndCorrect={
              type === "speedCards"
                ? getScoreCorrectSpeedCards
                : getScoreAndCorrectLongCard
            }
            amount={amount}
            numberBerRow={numberBerRow}
            showResultHandler={showResultHandler}
            cardsFromLeftToRight={cardsFromLeftToRight}
          />
        )}

        {result && (
          <ShowResults
            cardsRecalledArray={getOneBigArray(cardsRecalledArray)}
            randomCardsArray={randomCardsArray}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={amount}
            title={title}
            playAgainHandler={playAgainHandler}
            calculatePoints={calculatePoints}
            custom={custom}
            arrangedDeck={generateDeckOfCard(cardsSuits)}
            type={type}
            cardsFromLeftToRight={cardsFromLeftToRight}
          />
        )}
      </DisciplineCard>
    </>
  );
};

export default Cards;
