import { getScoreAndCorrectNames } from "../../helpers/calculateScoreCorrect";
import useGetResultPageContent from "../../hooks/results-page-content";
import ShowResultCard from "../ShareDiscipline/ShowResultCard";
import ResultSheet from "./ResultSheet";

const ShowResults = ({
  randomNamesArray,
  namesRecalledArray,
  numberBerRow,
  rowInPage,
  numberOfPage,
  amount,
  title,
  playAgainHandler,
  calculatePoints,
  custom,
  view,
  language,
}) => {
  const {
    ranArrayInOnePage,
    recArrayInOnePage,
    pressPageNavigationHandler,
    nextPage,
    prevPage,
    page,
  } = useGetResultPageContent({
    memoArray: randomNamesArray,
    recalledArray: namesRecalledArray,
    numberBerRow,
    rowInPage,
    numberOfPage,
    names: true,
  });

  return (
    <ShowResultCard
      view={view}
      title={title}
      numberBerRow={numberBerRow}
      showRecalledArray={randomNamesArray}
      recalledArray={namesRecalledArray}
      amount={amount}
      custom={custom}
      calculatePoints={calculatePoints}
      getScoreAndCorrect={getScoreAndCorrectNames}
      numberOfPage={numberOfPage}
      page={page}
      playAgainHandler={playAgainHandler}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
    >
      <ResultSheet
        ranNamesArrayInOnePage={ranArrayInOnePage}
        recNamesArrayInOnePage={recArrayInOnePage}
        rowInPage={rowInPage}
        numberBerRow={numberBerRow}
        page={page}
        language={language}
      />
    </ShowResultCard>
  );
};

export default ShowResults;
