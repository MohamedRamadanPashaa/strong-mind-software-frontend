import { memo, useEffect, useState } from "react";
import { divArrayIntoSmallArrayWithEqualLength } from "../../helpers/DivideArrayIntoSmallArray";
import RecallSheet from "./RecallSheet";
import useNavigationAndKeys from "../../hooks/navigation-recall-hook";
import { socket } from "../../helpers/socket";
import { useSelector } from "react-redux";

import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";

const RecallPage = ({
  recallTime,
  title,
  numberBerRow,
  rowInPage,
  amount,
  sum,
  numbersRecalledArray,
  setNumbersRecalledArray,
  numberOfPage,
  showResultHandler,
  factor,
  custom,
}) => {
  const {
    page,
    currentPosition,
    cursorPosition,
    setCursorPosition,
    recalledArray,
    prevPage,
    nextPage,
    pressPageNavigationHandler,
    moveCursorForward,
    moveCursorBackward,
    backToFirst,
    shiftForward,
    shiftBackward,
    deleteCurrentNumber,
    handleChange,
    setActiveElementsHandler,
    activeElements,
  } = useNavigationAndKeys({
    sum,
    numberOfPage,
    numberBerRow,
    rowInPage,
    amount,
    numbersRecalledArray,
    shifting: true,
    numbers: true,
  });

  const [recallNumberArrayInOnePage, setRecallNumberArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      numbersRecalledArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  // handle numbers in one page
  useEffect(() => {
    setRecallNumberArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        numbersRecalledArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [numbersRecalledArray, page, numberBerRow, rowInPage]);

  // Focus the element at cursor position
  useEffect(() => {
    const currentSibling = document.querySelector(
      `input[name=field-${cursorPosition}]`
    );

    if (currentSibling) {
      currentSibling.focus();
    }
  }, [cursorPosition]);

  const { disciplineId, competitionId } = useSelector((state) => state.result);
  useEffect(() => {
    const data = {
      disciplineId,
      page,
      currentPosition,
      cursorPosition,
      recallData: recalledArray,
    };

    if (disciplineId && competitionId) socket.emit("set-match-data", data);
  }, [
    page,
    currentPosition,
    disciplineId,
    competitionId,
    cursorPosition,
    recalledArray,
  ]);

  return (
    <MemoRecallCard
      title={title}
      time={recallTime}
      startRecallHandler={showResultHandler}
      memo={false}
      custom={custom}
      text={"Recall Will Start In"}
      recalledArray={recalledArray}
      setNumbersRecalledArray={setNumbersRecalledArray}
      numberOfPage={numberOfPage}
      page={page}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
      backToFirst={backToFirst}
      forwardToNextPosition={moveCursorForward}
      backToLastPosition={moveCursorBackward}
      shiftForward={shiftForward}
      shiftBackward={shiftBackward}
      deleteCurrentNumber={deleteCurrentNumber}
      shifting={true}
    >
      <RecallSheet
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
        recallNumberArrayInOnePage={recallNumberArrayInOnePage}
        page={page}
        currentPosition={currentPosition}
        sum={sum}
        setCursorPosition={setCursorPosition}
        recalledArray={recalledArray}
        factor={factor}
        cursorPosition={cursorPosition}
        handleChange={handleChange}
        setActiveElementsHandler={setActiveElementsHandler}
        activeElements={activeElements}
      />
    </MemoRecallCard>
  );
};

export default memo(RecallPage);
