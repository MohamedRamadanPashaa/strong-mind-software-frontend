import { useEffect, useState } from "react";
import useNavigationAndKeysRecall from "../../hooks/navigation-recall-hook";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import { getPageContent } from "../../helpers/DivideArrayIntoSmallArray";
import RecallSheet from "./RecallSheet";
import { socket } from "../../helpers/socket";
import { useSelector } from "react-redux";

const RecallDates = ({
  recallTime,
  title,
  numberBerRow,
  rowInPage,
  amount,
  sum,
  datesRecalledArray,
  showRecalledDatesArray,
  setDatesRecalledArray,
  numberOfPage,
  showResultHandler,
  custom,
  language,
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
  } = useNavigationAndKeysRecall({
    sum,
    numberOfPage,
    numberBerRow,
    rowInPage,
    amount,
    numbersRecalledArray: datesRecalledArray,
    shifting: false,
    noBackSpace: true,
  });

  const [recallDatesArrayInOnePage, setRecallDatesArrayInOnePage] = useState(
    getPageContent(showRecalledDatesArray, page, rowInPage)
  );

  // Focus the element at cursor position
  useEffect(() => {
    const currentSibling = document.querySelector(
      `input[name=field-${cursorPosition}]`
    );

    if (currentSibling) {
      currentSibling.focus();
    }
  }, [cursorPosition]);

  useEffect(() => {
    setRecallDatesArrayInOnePage(
      getPageContent(showRecalledDatesArray, page, rowInPage)
    );
  }, [page, rowInPage, showRecalledDatesArray]);

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
      setNumbersRecalledArray={setDatesRecalledArray}
      numberOfPage={numberOfPage}
      page={page}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
      forwardToNextPosition={moveCursorForward}
      backToLastPosition={moveCursorBackward}
      backToFirst={backToFirst}
      shiftForward={shiftForward}
      shiftBackward={shiftBackward}
      deleteCurrentNumber={deleteCurrentNumber}
      shifting={false}
    >
      <RecallSheet
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
        recallDatesArrayInOnePage={recallDatesArrayInOnePage}
        page={page}
        currentPosition={currentPosition}
        setCursorPosition={setCursorPosition}
        recalledArray={recalledArray}
        cursorPosition={cursorPosition}
        handleChange={handleChange}
        setActiveElementsHandler={setActiveElementsHandler}
        activeElements={activeElements}
        language={language}
      />
    </MemoRecallCard>
  );
};

export default RecallDates;
