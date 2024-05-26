import { useEffect, useState } from "react";
import {
  getPageContent,
  newDivArrDiffLength,
} from "../../helpers/DivideArrayIntoSmallArray";
import useNavigationAndKeysMemo from "../../hooks/navigation-memo-hook";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import CurrentSet from "./CurrentSet";
import MemoSheet from "./MemoSheet";
import { socket } from "../../helpers/socket";
import { useSelector } from "react-redux";

const MemoDates = ({
  title,
  memoTime,
  startRecallHandler,
  custom,
  randomDatesArray,
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
  } = useNavigationAndKeysMemo({
    amount,
    sum,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  const [ranDatesArrayInOnePage, setRanDatesArrayInOnePage] = useState(
    getPageContent(randomDatesArray, page, rowInPage)
  );

  const [currentGroup, setCurrentGroup] = useState(
    newDivArrDiffLength(randomDatesArray, [sum], sum, currentPosition)
  );

  useEffect(() => {
    setRanDatesArrayInOnePage(
      getPageContent(randomDatesArray, page, rowInPage)
    );
  }, [page, randomDatesArray, rowInPage]);

  useEffect(() => {
    setCurrentGroup(
      newDivArrDiffLength(randomDatesArray, [sum], sum, currentPosition)
    );
  }, [randomDatesArray, currentPosition, sum]);

  const { disciplineId, competitionId } = useSelector((state) => state.result);
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
      memo={memo}
      custom={custom}
      text={"Memorization Will Start In"}
      numberOfPage={numberOfPage}
      page={page}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
      focusGroup={
        <CurrentSet currentGroup={currentGroup[0]} language={language} />
      }
      forwardToNextPosition={forwardToNextPosition}
      backToFirst={backToFirst}
      backToLastPosition={backToLastPosition}
      amount={amount}
      currentPosition={currentPosition}
      sum={sum}
    >
      <MemoSheet
        ranDatesArrayInOnePage={ranDatesArrayInOnePage}
        page={page}
        amount={amount}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        sum={sum}
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
        memo={memo}
        language={language}
      />
    </MemoRecallCard>
  );
};

export default MemoDates;
