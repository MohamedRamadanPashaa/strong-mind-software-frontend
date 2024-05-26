import { DisciplineInfo } from "../../Data/DisciplineInfo";
import ViewResultCardStats from "./ViewResultCardStats";
import ShowResultsNumbers from "../Numbers/ShowResults";
import ShowResultsImages from "../Images/ShowResults";
import ShowResultsCards from "../Cards/ShowResults";
import { generateDeckOfCard } from "../Cards/Cards";
import ShowResultsDates from "../Dates/ShowResults";
import ShowResultsWords from "../Words/ShowResults";
import ShowResultsNames from "../Names/ShowResults";
import {
  calculatePoints10Car,
  calculatePoints15Names,
  calculatePoints15Num,
  calculatePoints15Words,
  calculatePoints30Bin,
  calculatePoints30Car,
  calculatePoints30Num,
  calculatePoints5Bin,
  calculatePoints5Img,
  calculatePoints5Names,
  calculatePoints5Num,
  calculatePoints5Words,
  calculatePoints60Car,
  calculatePoints60Num,
  calculatePointsDates,
  calculatePointsSC,
  calculatePointsSpoken,
} from "../../helpers/calculatePoints";

import classes from "./ViewResult.module.css";

const ViewResultNumbers = ({ match }) => {
  const numberBerRow = DisciplineInfo[match.discipline].numberBerRow;
  const rowInPage = DisciplineInfo[match.discipline].rowInPage;
  const numberOfPage = Math.ceil(
    match.memoData.length / numberBerRow / rowInPage
  );

  return (
    <div className={classes["view-result"]}>
      <ViewResultCardStats
        match={match}
        score={match.score || 0}
        correct={match.correct || 0}
        result={true}
        memoTime={match.memoTime}
        recallTime={match.recallTime}
        calculatePoints={
          match.discipline === "Spoken Numbers"
            ? calculatePointsSpoken
            : match.discipline === "Speed Numbers"
            ? calculatePoints5Num
            : match.discipline === "15-Minutes Numbers"
            ? calculatePoints15Num
            : match.discipline === "30-Minutes Numbers"
            ? calculatePoints30Num
            : match.discipline === "Hour Numbers"
            ? calculatePoints60Num
            : match.discipline === "5-Minutes Binaries"
            ? calculatePoints5Bin
            : match.discipline === "30-Minutes Binaries"
            ? calculatePoints30Bin
            : match.discipline === "Images"
            ? calculatePoints5Img
            : match.discipline === "Speed Cards"
            ? calculatePointsSC
            : match.discipline === "10-Minutes Cards"
            ? calculatePoints10Car
            : match.discipline === "30-Minutes Cards"
            ? calculatePoints30Car
            : match.discipline === "Hour Cards"
            ? calculatePoints60Car
            : match.discipline === "Dates"
            ? calculatePointsDates
            : match.discipline === "5-Minutes Words"
            ? calculatePoints5Words
            : match.discipline === "15-Minutes Words"
            ? calculatePoints15Words
            : match.discipline === "5-Minutes Names"
            ? calculatePoints5Names
            : match.discipline === "15-Minutes Names"
            ? calculatePoints15Names
            : () => 0
        }
      />

      {/* <FinishedHeader title={match.discipline} /> */}

      {(match.discipline.includes("Numbers") ||
        match.discipline.includes("Binaries")) && (
        <>
          <ShowResultsNumbers
            numbersRecalledArray={match.recallData}
            randomNumbersArray={match.memoData}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={match.memoData.length}
            title={match.discipline}
            playAgainHandler={() => {}}
            calculatePoints={() => {}}
            view={true}
          />
        </>
      )}

      {match.discipline.includes("Images") && (
        <>
          <ShowResultsImages
            imagesRecalledArray={match.recallData}
            showRecalledImagesArray={match.memoData}
            randomImagesArray={match.memoData}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={match.memoData.length}
            title={match.discipline}
            playAgainHandler={() => {}}
            calculatePoints={() => {}}
            view={true}
          />
        </>
      )}

      {match.discipline.includes("Cards") && (
        <ShowResultsCards
          cardsRecalledArray={match.recallData}
          showRecalledCardsArray={match.memoData}
          randomCardsArray={match.memoData}
          rowInPage={rowInPage}
          numberBerRow={numberBerRow}
          numberOfPage={numberOfPage}
          amount={match.memoData.length}
          title={match.discipline}
          playAgainHandler={() => {}}
          calculatePoints={() => {}}
          view={true}
          arrangedDeck={generateDeckOfCard()}
        />
      )}

      {match.discipline.includes("Dates") && (
        <>
          <ShowResultsDates
            datesRecalledArray={match.recallData}
            showRecalledDatesArray={match.memoData}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={match.memoData.length}
            title={match.discipline}
            playAgainHandler={() => {}}
            calculatePoints={() => {}}
            view={true}
            language={match.language}
          />
        </>
      )}

      {match.discipline.includes("Words") && (
        <>
          <ShowResultsWords
            wordsRecalledArray={match.recallData}
            randomWordsArray={match.memoData}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={match.memoData.length}
            title={match.discipline}
            playAgainHandler={() => {}}
            calculatePoints={() => {}}
            view={true}
            language={match.language}
          />
        </>
      )}

      {match.discipline.includes("Names") && (
        <>
          <ShowResultsNames
            namesRecalledArray={match.recallData}
            randomNamesArray={match.memoData}
            rowInPage={rowInPage}
            numberBerRow={numberBerRow}
            numberOfPage={numberOfPage}
            amount={match.memoData.length}
            title={match.discipline}
            playAgainHandler={() => {}}
            calculatePoints={() => {}}
            view={true}
            language={match.language}
          />
        </>
      )}
    </div>
  );
};

export default ViewResultNumbers;
