import { useEffect, useState } from "react";
import useNavigationAndKeysRecall from "../../hooks/navigation-recall-hook";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import { divArrayIntoSmallArrayWithEqualLength } from "../../helpers/DivideArrayIntoSmallArray";
import RecallSheet from "./RecallSheet";
import FocusImage from "./FocusImage";
import { socket } from "../../helpers/socket";
import { useSelector } from "react-redux";

const RecallImages = ({
  recallTime,
  title,
  numberBerRow,
  rowInPage,
  amount,
  sum,
  imagesRecalledArray,
  showRecalledImagesArray,
  setImagesRecalledArray,
  numberOfPage,
  showResultHandler,
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
  } = useNavigationAndKeysRecall({
    sum,
    numberOfPage,
    numberBerRow,
    rowInPage,
    amount,
    numbersRecalledArray: imagesRecalledArray,
    shifting: false,
    numbers: true,
  });

  const [recallImagesArrayInOnePage, setRecallImagesArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      showRecalledImagesArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  const [focusImage, setFocusImage] = useState(
    showRecalledImagesArray[cursorPosition]
  );

  useEffect(() => {
    setFocusImage(showRecalledImagesArray[cursorPosition]);
  }, [showRecalledImagesArray, cursorPosition]);

  // handle numbers in one page
  useEffect(() => {
    setRecallImagesArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        showRecalledImagesArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [showRecalledImagesArray, page, numberBerRow, rowInPage]);

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
      setNumbersRecalledArray={setImagesRecalledArray}
      numberOfPage={numberOfPage}
      page={page}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
      focusGroup={
        <FocusImage
          focusImage={{ ...focusImage, answer: recalledArray[cursorPosition] }}
        />
      }
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
        recallImagesArrayInOnePage={recallImagesArrayInOnePage}
        page={page}
        currentPosition={currentPosition}
        setCursorPosition={setCursorPosition}
        recalledArray={recalledArray}
        cursorPosition={cursorPosition}
        handleChange={handleChange}
        setActiveElementsHandler={setActiveElementsHandler}
        activeElements={activeElements}
      />
    </MemoRecallCard>
  );
};

export default RecallImages;
