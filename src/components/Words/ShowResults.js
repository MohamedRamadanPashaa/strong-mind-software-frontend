import { getScoreAndCorrectWords } from "../../helpers/calculateScoreCorrect";
import useGetResultPageContent from "../../hooks/results-page-content";
import ShowResultCard from "../ShareDiscipline/ShowResultCard";
import ResultSheet from "./ResultSheet";

const ShowResults = ({
  randomWordsArray,
  wordsRecalledArray,
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
    memoArray: randomWordsArray,
    recalledArray: wordsRecalledArray,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  return (
    <ShowResultCard
      view={view}
      title={title}
      numberBerRow={numberBerRow}
      showRecalledArray={randomWordsArray}
      recalledArray={wordsRecalledArray}
      amount={amount}
      custom={custom}
      calculatePoints={calculatePoints}
      getScoreAndCorrect={getScoreAndCorrectWords}
      numberOfPage={numberOfPage}
      page={page}
      playAgainHandler={playAgainHandler}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
    >
      <ResultSheet
        ranWordsArrayInOnePage={ranArrayInOnePage}
        recWordsArrayInOnePage={recArrayInOnePage}
        rowInPage={rowInPage}
        numberBerRow={numberBerRow}
        page={page}
        language={language}
      />
    </ShowResultCard>
  );
};

export default ShowResults;
