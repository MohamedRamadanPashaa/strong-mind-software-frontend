import Arrows from "./Arrows";
import Header from "./Header";
import Pagination from "./Pagination";

import classes from "./MemoRecallCard.module.css";

const MemoRecallCard = ({
  title,
  time,
  startRecallHandler,
  memo,
  custom,
  recalledArray,
  setNumbersRecalledArray,
  numberOfPage,
  page,
  pressPageNavigationHandler,
  nextPage,
  prevPage,
  focusGroup,
  forwardToNextPosition,
  backToFirst,
  backToLastPosition,
  shiftForward,
  shiftBackward,
  deleteCurrentNumber,
  shifting,
  amount,
  currentPosition,
  sum,
  children,
}) => {
  return (
    <div className={classes["memo-recall"]}>
      <div className={classes["memo-recall-page"]}>
        <Header
          title={title}
          time={time}
          text={"Memo Ends In:"}
          startRecallHandler={startRecallHandler}
          memo={memo}
          custom={custom}
          recalledArray={recalledArray}
          setNumbersRecalledArray={setNumbersRecalledArray}
          amount={amount}
          currentPosition={currentPosition}
          sum={sum}
          numberOfPage={numberOfPage}
          page={page}
        />

        <Pagination
          numberOfPage={numberOfPage}
          page={page}
          pressPageNavigationHandler={pressPageNavigationHandler}
          nextPage={nextPage}
          prevPage={prevPage}
        />

        {focusGroup && focusGroup}

        {children}

        <Arrows
          forwardToNextPosition={forwardToNextPosition}
          backToLastPosition={backToLastPosition}
          backToFirst={backToFirst}
          memo={memo}
          shiftForward={shiftForward}
          shiftBackward={shiftBackward}
          deleteCurrentNumber={deleteCurrentNumber}
          shifting={shifting}
        />
      </div>
    </div>
  );
};

export default MemoRecallCard;
