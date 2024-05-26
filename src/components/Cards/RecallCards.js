import { useEffect, useState } from "react";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import { useSelector } from "react-redux";
import { socket } from "../../helpers/socket";
import RecallSheet from "./RecallSheet";
import useNavigationAndKeysRecallSeparatePage from "../../hooks/navigation-recall-separate-page-hook";
import { getOneBigArray } from "../../helpers/DivideArrayIntoSmallArray";

const RecallCards = ({
  recallTime,
  title,
  numberBerRow,
  rowInPage,
  cardsRecalledArraySeparatePage,
  setCardsRecalledArray,
  numberOfPage,
  showResultHandler,
  custom,
  arrangedDeck,
  cardsFromLeftToRight,
}) => {
  const {
    page,
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
  } = useNavigationAndKeysRecallSeparatePage({
    numberOfPage,
    numberBerRow,
    cardsRecalledArray: cardsRecalledArraySeparatePage,
    shifting: true,
    cardsFromLeftToRight,
  });

  const [recallCardsArrayInOnePage, setRecallCardsArrayInOnePage] = useState(
    cardsRecalledArraySeparatePage[page - 1]
  );

  // handle numbers in one page
  useEffect(() => {
    setRecallCardsArrayInOnePage(recalledArray[page - 1]);
  }, [recalledArray, page, numberBerRow, rowInPage]);

  const { disciplineId, competitionId } = useSelector((state) => state.result);
  useEffect(() => {
    const data = {
      disciplineId,
      page,
      cursorPosition,
      recallData: getOneBigArray(recalledArray),
    };

    if (disciplineId && competitionId) socket.emit("set-match-data", data);
  }, [page, disciplineId, competitionId, cursorPosition, recalledArray]);
  return (
    <MemoRecallCard
      title={title}
      time={recallTime}
      startRecallHandler={showResultHandler}
      memo={false}
      custom={custom}
      text={"Recall Will Start In"}
      recalledArray={recalledArray}
      setNumbersRecalledArray={setCardsRecalledArray}
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
        recallCardsArrayInOnePage={recallCardsArrayInOnePage}
        setCursorPosition={setCursorPosition}
        cursorPosition={cursorPosition}
        handleChange={handleChange}
        arrangedDeck={arrangedDeck}
        deleteCurrentNumber={deleteCurrentNumber}
      />
    </MemoRecallCard>
  );
};

export default RecallCards;
