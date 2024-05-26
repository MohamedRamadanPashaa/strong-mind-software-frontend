import { useEffect, useState } from "react";
import CurrentSet from "./CurrentSet";
import NumbersSheet from "./NumbersSheet";
import {
  divArrayIntoSmallArrayWithEqualLength,
  newDivArrDiffLength,
} from "../../helpers/DivideArrayIntoSmallArray";

import useNavigationAndKeysMemo from "../../hooks/navigation-memo-hook";
import { socket } from "../../helpers/socket";
import { useSelector } from "react-redux";

import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";

const MemoNumbers = ({
  memoTime,
  title,
  groupingArray,
  randomNumbersArray,
  amount,
  numberBerRow,
  rowInPage,
  sum,
  numberOfPage,
  startRecallHandler,
  memo,
  custom,
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
  } = useNavigationAndKeysMemo({
    amount,
    sum,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  const { disciplineId, competitionId } = useSelector((state) => state.result);

  const [ranNumberArrayInOnePage, setRanNumberArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      randomNumbersArray,
      numberBerRow,
      rowInPage,
      page
    )
  );
  const [currentGroup, setCurrentGroup] = useState(
    newDivArrDiffLength(randomNumbersArray, groupingArray, sum, currentPosition)
  );

  // set random numbers in one page
  useEffect(() => {
    setRanNumberArrayInOnePage(
      // divide the grouping array into small arrays based on number in page and rows
      divArrayIntoSmallArrayWithEqualLength(
        randomNumbersArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [randomNumbersArray, page, numberBerRow, rowInPage]);

  // set current set of numbers
  useEffect(() => {
    // divide the grouping array into small arrays based on grouping array
    setCurrentGroup(
      newDivArrDiffLength(
        randomNumbersArray,
        groupingArray,
        sum,
        currentPosition
      )
    );
  }, [randomNumbersArray, currentPosition, sum, groupingArray]);

  useEffect(() => {
    const data = {
      disciplineId,
      page,
      currentPosition,
      currentGroup,
    };

    if (disciplineId && competitionId) socket.emit("set-match-data", data);
  }, [page, currentPosition, disciplineId, competitionId, currentGroup]);

  return (
    <MemoRecallCard
      title={title}
      time={memoTime}
      startRecallHandler={startRecallHandler}
      memo={true}
      custom={custom}
      text={"Memorization Will Start In"}
      numberOfPage={numberOfPage}
      page={page}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
      focusGroup={<CurrentSet currentGroup={currentGroup} />}
      forwardToNextPosition={forwardToNextPosition}
      backToFirst={backToFirst}
      backToLastPosition={backToLastPosition}
      amount={amount}
      currentPosition={currentPosition}
      sum={sum}
    >
      <NumbersSheet
        randomNumbersArray={ranNumberArrayInOnePage}
        page={page}
        amount={amount}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        sum={sum}
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
      />
    </MemoRecallCard>
  );
};

export default MemoNumbers;
