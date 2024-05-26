import { useSelector } from "react-redux";
import useNavigationAndKeysMemo from "../../hooks/navigation-memo-hook";
import { useEffect, useState } from "react";
import {
  divArrayIntoSmallArrayWithEqualLength,
  newDivArrDiffLength,
} from "../../helpers/DivideArrayIntoSmallArray";
import { socket } from "../../helpers/socket";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import CurrentSet from "./CurrentSet";
import MemoSheet from "./MemoSheet";

const MemoNames = ({
  title,
  memoTime,
  startRecallHandler,
  custom,
  randomNamesArray,
  amount,
  numberBerRow,
  rowInPage,
  sum,
  numberOfPage,
  memo,
  language,
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
    view,
  } = useNavigationAndKeysMemo({
    amount,
    sum,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  const { disciplineId, competitionId } = useSelector((state) => state.result);

  const [ranNamesArrayInOnePage, setRanNamesArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      randomNamesArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  const [currentGroup, setCurrentGroup] = useState(
    newDivArrDiffLength(randomNamesArray, [sum], sum, currentPosition)
  );

  // set random numbers in one page
  useEffect(() => {
    setRanNamesArrayInOnePage(
      // divide the grouping array into small arrays based on number in page and rows
      divArrayIntoSmallArrayWithEqualLength(
        randomNamesArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [randomNamesArray, page, numberBerRow, rowInPage]);

  // set current set of numbers
  useEffect(() => {
    // divide the grouping array into small arrays based on grouping array
    setCurrentGroup(
      newDivArrDiffLength(randomNamesArray, [sum], sum, currentPosition)
    );
  }, [randomNamesArray, currentPosition, sum]);

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
      forwardToNextPosition={forwardToNextPosition}
      backToFirst={backToFirst}
      backToLastPosition={backToLastPosition}
      amount={amount}
      currentPosition={currentPosition}
      sum={sum}
    >
      <CurrentSet currentGroup={currentGroup[0][0]} language={language} />
      <MemoSheet
        ranNamesArrayInOnePage={ranNamesArrayInOnePage}
        page={page}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        rowInPage={rowInPage}
        numberBerRow={numberBerRow}
        sum={sum}
        view={view}
        language={language}
      />
    </MemoRecallCard>
  );
};

export default MemoNames;
