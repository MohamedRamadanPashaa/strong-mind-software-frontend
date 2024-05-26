import { useSelector } from "react-redux";
import useNavigationAndKeysMemo from "../../hooks/navigation-memo-hook";
import { useEffect, useState } from "react";
import {
  divArrayIntoSmallArrayWithEqualLength,
  newDivArrDiffLength,
} from "../../helpers/DivideArrayIntoSmallArray";
import { socket } from "../../helpers/socket";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import MemoSheet from "./MemoSheet";
import CurrentSet from "./CurrentSet";

const MemoWords = ({
  title,
  memoTime,
  startRecallHandler,
  custom,
  randomWordsArray,
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

  const [ranWordsArrayInOnePage, setRanWordsArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      randomWordsArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  const [currentGroup, setCurrentGroup] = useState(
    newDivArrDiffLength(randomWordsArray, [sum], sum, currentPosition)
  );

  // set random numbers in one page
  useEffect(() => {
    setRanWordsArrayInOnePage(
      // divide the grouping array into small arrays based on number in page and rows
      divArrayIntoSmallArrayWithEqualLength(
        randomWordsArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [randomWordsArray, page, numberBerRow, rowInPage]);

  // set current set of numbers
  useEffect(() => {
    // divide the grouping array into small arrays based on grouping array
    setCurrentGroup(
      newDivArrDiffLength(randomWordsArray, [sum], sum, currentPosition)
    );
  }, [randomWordsArray, currentPosition, sum]);

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
      focusGroup={
        <CurrentSet
          currentGroup={currentGroup}
          currentPosition={currentPosition}
          language={language}
        />
      }
    >
      <MemoSheet
        ranWordsArrayInOnePage={ranWordsArrayInOnePage}
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

export default MemoWords;
