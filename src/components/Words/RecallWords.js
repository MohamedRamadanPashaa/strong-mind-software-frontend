import { useEffect, useState } from "react";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import { divArrayIntoSmallArrayWithEqualLength } from "../../helpers/DivideArrayIntoSmallArray";
import { useSelector } from "react-redux";
import { socket } from "../../helpers/socket";
import RecallSheet from "./RecallSheet";
import useNavigationAndKeysRecallWords from "../../hooks/navigation-recall-hook-words";

const RecallWords = ({
  recallTime,
  title,
  numberBerRow,
  rowInPage,
  amount,
  sum,
  wordsRecalledArray,
  setWordsRecalledArray,
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
  } = useNavigationAndKeysRecallWords({
    sum,
    numberOfPage,
    numberBerRow,
    rowInPage,
    amount,
    numbersRecalledArray: wordsRecalledArray,
    shifting: true,
    notArabic: language !== "arabic",
  });

  const [recallWordsArrayInOnePage, setRecallWordsArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      wordsRecalledArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  // handle numbers in one page
  useEffect(() => {
    setRecallWordsArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        wordsRecalledArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [wordsRecalledArray, page, numberBerRow, rowInPage]);

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
      setNumbersRecalledArray={setWordsRecalledArray}
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
        recallWordsArrayInOnePage={recallWordsArrayInOnePage}
        page={page}
        currentPosition={currentPosition}
        sum={sum}
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

export default RecallWords;
