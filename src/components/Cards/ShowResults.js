import {
  getScoreAndCorrectLongCard,
  getScoreCorrectSpeedCards,
} from "../../helpers/calculateScoreCorrect";
import ShowResultCard from "../ShareDiscipline/ShowResultCard";
import useGetResultPageContent from "../../hooks/results-page-content";
import ResultSheet from "./ResultSheet";

const ShowResults = ({
  cardsRecalledArray,
  randomCardsArray,
  numberBerRow,
  rowInPage,
  numberOfPage,
  amount,
  title,
  playAgainHandler,
  calculatePoints,
  custom,
  view,
  arrangedDeck,
  type,
  cardsFromLeftToRight,
}) => {
  const {
    ranArrayInOnePage,
    recArrayInOnePage,
    pressPageNavigationHandler,
    nextPage,
    prevPage,
    page,
  } = useGetResultPageContent({
    memoArray: randomCardsArray,
    recalledArray: cardsRecalledArray,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  return (
    <ShowResultCard
      view={view}
      title={title}
      numberBerRow={numberBerRow}
      showRecalledArray={randomCardsArray}
      recalledArray={cardsRecalledArray}
      amount={amount}
      custom={custom}
      calculatePoints={calculatePoints}
      getScoreAndCorrect={
        type === "speedCards"
          ? getScoreCorrectSpeedCards
          : getScoreAndCorrectLongCard
      }
      cardsFromLeftToRight={cardsFromLeftToRight}
      numberOfPage={numberOfPage}
      page={page}
      playAgainHandler={playAgainHandler}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
    >
      <ResultSheet
        ranCardsArrayInOnePage={ranArrayInOnePage[0]}
        recCardsArrayInOnePage={recArrayInOnePage[0]}
        arrangedDeck={arrangedDeck}
      />
    </ShowResultCard>
  );
};

export default ShowResults;
