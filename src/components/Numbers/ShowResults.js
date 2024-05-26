import ResultSheet from "./ResultSheet";
import {
  getScoreAndCorrectNumbers,
  getScoreAndCorrectSpokenNumbers,
} from "../../helpers/calculateScoreCorrect";
import ShowResultCard from "../ShareDiscipline/ShowResultCard";
import useGetResultPageContent from "../../hooks/results-page-content";

const ShowResults = ({
  randomNumbersArray,
  numbersRecalledArray,
  numberBerRow,
  rowInPage,
  numberOfPage,
  amount,
  title,
  playAgainHandler,
  calculatePoints,
  custom,
  standard,
  view,
}) => {
  const {
    ranArrayInOnePage,
    recArrayInOnePage,
    pressPageNavigationHandler,
    nextPage,
    prevPage,
    page,
  } = useGetResultPageContent({
    memoArray: randomNumbersArray,
    recalledArray: numbersRecalledArray,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  return (
    <ShowResultCard
      view={view}
      title={title}
      numberBerRow={numberBerRow}
      showRecalledArray={randomNumbersArray}
      recalledArray={numbersRecalledArray}
      amount={amount}
      custom={custom}
      calculatePoints={calculatePoints}
      getScoreAndCorrect={
        title === "Spoken Numbers"
          ? getScoreAndCorrectSpokenNumbers
          : getScoreAndCorrectNumbers
      }
      numberOfPage={numberOfPage}
      page={page}
      playAgainHandler={playAgainHandler}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
    >
      <ResultSheet
        ranNumberArrayInOnePage={ranArrayInOnePage}
        recNumberArrayInOnePage={recArrayInOnePage}
        rowInPage={rowInPage}
        numberBerRow={numberBerRow}
        page={page}
      />
    </ShowResultCard>
  );
};

export default ShowResults;
