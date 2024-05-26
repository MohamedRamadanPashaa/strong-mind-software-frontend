import CountDown from "../TrainStartElements/CountDown";
import ViewResultCard from "./ViewResultCard";
import useViewChangePage from "../../hooks/view-change-page-hook";
import {
  getScoreAndCorrectDates,
  getScoreAndCorrectImages,
  getScoreAndCorrectLongCard,
  getScoreAndCorrectNames,
  getScoreAndCorrectNumbers,
  getScoreAndCorrectSpokenNumbers,
  getScoreAndCorrectWords,
  getScoreCorrectSpeedCards,
} from "../../helpers/calculateScoreCorrect";
import ViewMemo from "./ViewMemo";
import ViewRecall from "./ViewRecall";
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

const ViewRunningMatch = ({ match, disciplineId, setMatch }) => {
  const {
    startedAt,
    countSeconds,
    memoTime,
    recallCountSeconds,
    recallTime,
    groupingArray,
    discipline,
    memoData,
    showData,
    numberBerRow,
    rowInPage,
    sum,
    numberOfPage,
    standard,
    recallData,
    amount,
  } = match;

  const {
    countdown,
    memo,
    recall,
    recallCountdown,
    result,
    startMemoHandler,
    startRecallHandler,
    startRecallCountdownHandler,
    startResultHandler,
    timeToCountdown,
    timeToMemo,
    timeToRecCountdown,
  } = useViewChangePage({
    startedAt,
    countSeconds,
    memoTime,
    recallCountSeconds,
    recallTime,
  });

  return (
    <>
      <ViewResultCard
        disciplineId={disciplineId}
        competitor={match.competitor}
        amount={amount}
        numberBerRow={numberBerRow}
        match={match}
        result={result}
        getScoreCorrect={
          match.discipline.includes("Spoken")
            ? getScoreAndCorrectSpokenNumbers
            : match.discipline.includes("Numbers") ||
              match.discipline.includes("Binaries")
            ? getScoreAndCorrectNumbers
            : match.discipline.includes("Speed Cards")
            ? getScoreCorrectSpeedCards
            : match.discipline.includes("Images")
            ? getScoreAndCorrectImages
            : match.discipline.includes("Dates")
            ? getScoreAndCorrectDates
            : match.discipline.includes("Words")
            ? getScoreAndCorrectWords
            : match.discipline.includes("Names")
            ? getScoreAndCorrectNames
            : getScoreAndCorrectLongCard
        }
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

      {countdown && (
        <CountDown
          text={"Memorization Will Start In"}
          countSeconds={
            countSeconds - Math.floor(Date.now() / 1000 - startedAt)
          }
          startMemoHandler={startMemoHandler}
          view={true}
        />
      )}

      {memo && (
        <ViewMemo
          memoTime={
            (memoTime * 60 - Math.floor(Date.now() / 1000 - timeToCountdown)) /
            60
          }
          groupingArray={groupingArray}
          title={discipline}
          memoData={memoData}
          amount={amount}
          numberBerRow={numberBerRow}
          rowInPage={rowInPage}
          sum={sum}
          numberOfPage={numberOfPage}
          startRecallHandler={startRecallCountdownHandler}
          standard={standard}
          startedAt={startedAt}
          countSeconds={countSeconds}
          view={true}
          disciplineId={disciplineId}
          match={match}
          setMatch={setMatch}
        />
      )}

      {recallCountdown && (
        <CountDown
          text={"Recall Will Start In"}
          countSeconds={
            recallCountSeconds - Math.floor(Date.now() / 1000 - timeToMemo)
          }
          startMemoHandler={startRecallHandler}
          view={true}
        />
      )}

      {(recall || result) && (
        <ViewRecall
          memoData={memoData}
          showData={showData}
          recallData={recallData}
          disciplineId={disciplineId}
          rowInPage={rowInPage}
          numberBerRow={numberBerRow}
          numberOfPage={numberOfPage}
          amount={amount}
          title={discipline}
          view={true}
          recallTime={
            (recallTime * 60 -
              Math.floor(Date.now() / 1000 - timeToRecCountdown)) /
            60
          }
          match={match}
          setMatch={setMatch}
          startResultHandler={startResultHandler}
          result={result}
        />
      )}
    </>
  );
};

export default ViewRunningMatch;
