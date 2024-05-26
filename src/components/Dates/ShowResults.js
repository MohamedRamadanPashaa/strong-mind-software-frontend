import { getScoreAndCorrectDates } from "../../helpers/calculateScoreCorrect";
import useGetResultPageContent from "../../hooks/results-page-content";
import ShowResultCard from "../ShareDiscipline/ShowResultCard";
import ResultSheet from "./ResultSheet";

const ShowResults = ({
  datesRecalledArray,
  showRecalledDatesArray,
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
    memoArray: showRecalledDatesArray,
    recalledArray: datesRecalledArray,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  return (
    <ShowResultCard
      view={view}
      title={title}
      numberBerRow={numberBerRow}
      showRecalledArray={showRecalledDatesArray}
      recalledArray={datesRecalledArray}
      amount={amount}
      custom={custom}
      calculatePoints={calculatePoints}
      getScoreAndCorrect={getScoreAndCorrectDates}
      numberOfPage={numberOfPage}
      page={page}
      playAgainHandler={playAgainHandler}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
    >
      <ResultSheet
        ranDatesArrayInOnePage={ranArrayInOnePage}
        recDatesArrayInOnePage={recArrayInOnePage}
        language={language}
      />
    </ShowResultCard>
  );
};

export default ShowResults;
