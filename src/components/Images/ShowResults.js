import { getScoreAndCorrectImages } from "../../helpers/calculateScoreCorrect";
import ResultSheet from "./ResultSheet";
import ShowResultCard from "../ShareDiscipline/ShowResultCard";
import useGetResultPageContent from "../../hooks/results-page-content";

const ShowResults = ({
  imagesRecalledArray,
  showRecalledImagesArray,
  numberBerRow,
  rowInPage,
  numberOfPage,
  amount,
  title,
  playAgainHandler,
  calculatePoints,
  custom,
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
    memoArray: showRecalledImagesArray,
    recalledArray: imagesRecalledArray,
    numberBerRow,
    rowInPage,
    numberOfPage,
  });

  return (
    <ShowResultCard
      view={view}
      title={title}
      numberBerRow={numberBerRow}
      showRecalledArray={showRecalledImagesArray}
      recalledArray={imagesRecalledArray}
      amount={amount}
      custom={custom}
      calculatePoints={calculatePoints}
      getScoreAndCorrect={getScoreAndCorrectImages}
      numberOfPage={numberOfPage}
      page={page}
      playAgainHandler={playAgainHandler}
      pressPageNavigationHandler={pressPageNavigationHandler}
      nextPage={nextPage}
      prevPage={prevPage}
    >
      <ResultSheet
        ranImagesArrayInOnePage={ranArrayInOnePage}
        recImagesArrayInOnePage={recArrayInOnePage}
        rowInPage={rowInPage}
        numberBerRow={numberBerRow}
        page={page}
      />
    </ShowResultCard>
  );
};

export default ShowResults;
