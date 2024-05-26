import { useEffect, useState } from "react";
import MemoRecallCard from "../ShareDiscipline/MemoRecallCard";
import useNavigationAndKeysMemo from "../../hooks/navigation-memo-hook";
import {
  divArrayIntoSmallArrayWithEqualLength,
  newDivArrDiffLength,
} from "../../helpers/DivideArrayIntoSmallArray";
import MemoSheet from "./MemoSheet";
import CurrentSet from "./CurrentSet";
import { useSelector } from "react-redux";
import { socket } from "../../helpers/socket";

const MemoImages = ({
  title,
  memoTime,
  startRecallHandler,
  custom,
  randomImagesArray,
  amount,
  numberBerRow,
  rowInPage,
  sum,
  numberOfPage,
  memo,
  skipFinalImage,
}) => {
  const [ranImgSkip, setRanImgSkip] = useState(
    skipFinalImage
      ? randomImagesArray.filter((img, index) => (index + 1) % 5 !== 0)
      : randomImagesArray
  );

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
    amount: ranImgSkip.length,
    sum,
    numberBerRow: skipFinalImage ? numberBerRow - 1 : numberBerRow,
    rowInPage,
    numberOfPage,
  });

  const [ranImagesArrayInOnePage, setRanImagesArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      randomImagesArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  const [currentGroup, setCurrentGroup] = useState(
    newDivArrDiffLength(ranImgSkip, [sum], sum, currentPosition)
  );

  useEffect(() => {
    skipFinalImage
      ? setRanImgSkip(
          randomImagesArray.filter((img, index) => (index + 1) % 5 !== 0)
        )
      : setRanImgSkip(randomImagesArray);
  }, [randomImagesArray, skipFinalImage]);

  useEffect(() => {
    // divide the grouping array into small arrays based on grouping array
    setCurrentGroup(
      newDivArrDiffLength(ranImgSkip, [sum], sum, currentPosition)
    );
  }, [ranImgSkip, currentPosition, sum]);

  // set random numbers in one page
  useEffect(() => {
    setRanImagesArrayInOnePage(
      // divide the grouping array into small arrays based on number in page and rows
      divArrayIntoSmallArrayWithEqualLength(
        randomImagesArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [randomImagesArray, page, numberBerRow, rowInPage]);

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
      focusGroup={<CurrentSet currentGroup={currentGroup[0]} />}
      forwardToNextPosition={forwardToNextPosition}
      backToFirst={backToFirst}
      backToLastPosition={backToLastPosition}
      amount={amount}
      currentPosition={currentPosition}
      sum={sum}
    >
      <MemoSheet
        ranImagesArrayInOnePage={ranImagesArrayInOnePage}
        page={page}
        amount={amount}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        sum={sum}
        numberBerRow={numberBerRow}
        rowInPage={rowInPage}
        skipFinalImage={skipFinalImage}
        currentGroup={currentGroup[0]}
        memo={memo}
      />
    </MemoRecallCard>
  );
};

export default MemoImages;
