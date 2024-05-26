import React, { useEffect, useState } from "react";
import { getGroupingForNaturalAndReverse } from "../../helpers/DivideArrayIntoSmallArray";
import { useSelector } from "react-redux";
import { socket } from "../../helpers/socket";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import CurrentSet from "./CurrentSet";
import MemoSheet from "./MemoSheet";
import useNavigationAndKeysMemoSeparatePage from "../../hooks/navigation-memo-separate-page-hook";

const MemoCards = ({
  title,
  memoTime,
  startRecallHandler,
  custom,
  randomCardsArray,
  amount,
  numberBerRow,
  rowInPage,
  sum,
  numberOfPage,
  memo,
  gapBetweenCards,
  cardsFromLeftToRight,
}) => {
  const {
    page,
    currentPosition,
    forwardToNextPosition,
    backToLastPosition,
    backToFirst,
    nextPage,
    prevPage,
    pressPageNavigationHandler,
    setCurrentPosition,
  } = useNavigationAndKeysMemoSeparatePage({
    amount: 52,
    sum,
    numberBerRow,
    rowInPage,
    numberOfPage,
    cardsFromLeftToRight,
  });

  const [ranCardsArrayInOnePage, setRanCardsArrayInOnePage] = useState(
    randomCardsArray[page - 1]
  );

  const [currentGroup, setCurrentGroup] = useState(
    getGroupingForNaturalAndReverse(
      randomCardsArray[page - 1],
      sum,
      currentPosition,
      cardsFromLeftToRight
    )
  );

  useEffect(() => {
    // divide the grouping array into small arrays based on grouping array
    setCurrentGroup(
      getGroupingForNaturalAndReverse(
        randomCardsArray[page - 1],
        sum,
        currentPosition,
        cardsFromLeftToRight
      )
    );
  }, [
    randomCardsArray,
    currentPosition,
    sum,
    page,
    amount,
    numberBerRow,
    rowInPage,
    cardsFromLeftToRight,
  ]);

  // set random numbers in one page
  useEffect(() => {
    setRanCardsArrayInOnePage(
      // divide the grouping array into small arrays based on number in page and rows
      randomCardsArray[page - 1]
    );
  }, [randomCardsArray, page, numberBerRow, rowInPage]);

  const { disciplineId, competitionId } = useSelector((state) => state.result);
  useEffect(() => {
    const data = {
      disciplineId,
      page,
      currentPosition: (page - 1) * numberBerRow * rowInPage + currentPosition,
      currentGroup,
    };

    if (disciplineId && competitionId) socket.emit("set-match-data", data);
  }, [
    page,
    currentPosition,
    disciplineId,
    competitionId,
    currentGroup,
    numberBerRow,
    rowInPage,
  ]);

  return (
    <MemoRecallCard
      title={title}
      time={memoTime}
      startRecallHandler={startRecallHandler}
      memo={memo}
      custom={custom}
      text={"Memorization Will Start In"}
      numberOfPage={numberOfPage}
      page={page}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
      focusGroup={
        <CurrentSet
          currentGroup={currentGroup[0]}
          gapBetweenCards={gapBetweenCards}
        />
      }
      forwardToNextPosition={forwardToNextPosition}
      backToFirst={backToFirst}
      backToLastPosition={backToLastPosition}
      amount={amount}
      currentPosition={currentPosition}
      sum={sum}
    >
      <MemoSheet
        ranCardsArrayInOnePage={ranCardsArrayInOnePage}
        page={page}
        amount={amount}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        sum={sum}
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
        currentGroup={currentGroup[0]}
        memo={memo}
      />
    </MemoRecallCard>
  );
};

export default MemoCards;
