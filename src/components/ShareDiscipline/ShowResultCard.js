import Button from "../FormElement/Button";
import FinalStats from "./FinalStats";
import Pagination from "./Pagination";

import classes from "./ShowResultCard.module.css";

const ShowResultCard = ({
  view,
  title,
  numberBerRow,
  showRecalledArray,
  recalledArray,
  amount,
  custom,
  calculatePoints,
  getScoreAndCorrect,
  numberOfPage,
  page,
  playAgainHandler,
  pressPageNavigationHandler,
  nextPage,
  prevPage,
  cardsFromLeftToRight,
  children,
}) => {
  return (
    <div className={classes.results}>
      <div className={classes["show-results"]}>
        {!view && (
          <FinalStats
            title={title}
            numberBerRow={numberBerRow}
            randomArray={showRecalledArray}
            recalledArray={recalledArray}
            amount={amount}
            calculatePoints={calculatePoints}
            custom={custom}
            getScoreAndCorrect={getScoreAndCorrect}
            cardsFromLeftToRight={cardsFromLeftToRight}
          />
        )}

        <Pagination
          numberOfPage={numberOfPage}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
          pressPageNavigationHandler={pressPageNavigationHandler}
        />

        {children}

        {!view && (
          <div className={classes["another-attempt"]}>
            <Button onClick={playAgainHandler} danger>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowResultCard;
