import { useEffect, useState } from "react";
import { divArrayIntoSmallArrayWithEqualLength } from "../../helpers/DivideArrayIntoSmallArray";
import { useSelector } from "react-redux";
import { socket } from "../../helpers/socket";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import RecallSheet from "./RecallSheet";
import useNavigationAndKeysRecallNames from "../../hooks/navigation-recall-hook-names";

const RecallNames = ({
  recallTime,
  title,
  numberBerRow,
  rowInPage,
  amount,
  sum,
  namesRecalledArray,
  showRecalledNamesArray,
  setNamesRecalledArray,
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
  } = useNavigationAndKeysRecallNames({
    sum,
    numberOfPage,
    numberBerRow,
    rowInPage,
    amount,
    numbersRecalledArray: namesRecalledArray,
    notArabic: language !== "arabic",
  });

  const [recallNamesArrayInOnePage, setRecallNamesArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      showRecalledNamesArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  // handle numbers in one page
  useEffect(() => {
    setRecallNamesArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        showRecalledNamesArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [showRecalledNamesArray, page, numberBerRow, rowInPage]);

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
      setNumbersRecalledArray={setNamesRecalledArray}
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
      shifting={false}
    >
      <RecallSheet
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
        recallNamesArrayInOnePage={recallNamesArrayInOnePage}
        page={page}
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

export default RecallNames;
