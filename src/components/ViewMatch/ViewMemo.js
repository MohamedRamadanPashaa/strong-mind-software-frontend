import { memo, useEffect, useState } from "react";
import CurrentSetNumbers from "../Numbers/CurrentSet";
import Header from "../ShareDiscipline/Header";
import {
  divArrayIntoSmallArrayWithEqualLength,
  getOneBigArray,
  newDivArrDiffLength,
} from "../../helpers/DivideArrayIntoSmallArray";
import Pagination from "../ShareDiscipline/Pagination";
import NumbersSheet from "../Numbers/NumbersSheet";
import { socket } from "../../helpers/socket";
import CurrentSetImages from "../Images/CurrentSet";
import MemoSheetImages from "../Images/MemoSheet";
import CurrentSetCards from "../Cards/CurrentSet";
import MemoSheetCards from "../Cards/MemoSheet";

import MemoSheetDates from "../Dates/MemoSheet";
import CurrentSetWords from "../Words/CurrentSet";
import MemoSheetWords from "../Words/MemoSheet";
import CurrentSetDates from "../Dates/CurrentSet";
import CurrentSetNames from "../Names/CurrentSet";
import MemoSheetNames from "../Names/MemoSheet";

import classes from "./ViewMemo.module.css";
import { FaMicrophoneLines } from "react-icons/fa6";

const ViewMemo = ({
  title,
  groupingArray,
  memoData,
  amount,
  numberBerRow,
  rowInPage,
  sum,
  numberOfPage,
  startRecallHandler,
  memoTime,
  match,
  setMatch,
  view,
}) => {
  const [page, setPage] = useState(match.page || 1);
  const [currentPosition, setCurrentPosition] = useState(
    match.currentPosition || 0
  );
  const [ranSkip, setRanSkip] = useState(
    match.skipFinal
      ? memoData.filter((img, index) => (index + 1) % 5 !== 0)
      : memoData
  );
  const [ranArrayInOnePage, setRanArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      memoData,
      numberBerRow,
      rowInPage,
      page
    )
  );
  const [memorizationTimeTaken, setMemorizationTimeTaken] = useState(
    match.memorizationTimeTaken || 0
  );

  useEffect(() => {
    match.skipFinal
      ? setRanSkip(memoData.filter((img, index) => (index + 1) % 5 !== 0))
      : setRanSkip(memoData);
  }, [memoData, match.skipFinal]);

  const [currentGroup, setCurrentGroup] = useState(
    match.currentGroup
      ? match.currentGroup
      : newDivArrDiffLength(
          ranSkip,
          groupingArray.length > 0 ? groupingArray : [sum],
          sum,
          currentPosition
        )
  );

  useEffect(() => {
    socket.on("send-match-actions", (data) => {
      if (data.disciplineId === match.disciplineId) {
        setCurrentPosition(data.currentPosition);
        setPage(data.page);
        setCurrentGroup(data.currentGroup);
        data.memorizationTimeTaken &&
          setMemorizationTimeTaken(data.memorizationTimeTaken);
      }
    });
  }, [match, setMatch, memoTime]);

  // set random numbers in one page
  useEffect(() => {
    setRanArrayInOnePage(
      // divide the grouping array into small arrays based on number in page and rows
      divArrayIntoSmallArrayWithEqualLength(
        memoData,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [memoData, page, numberBerRow, rowInPage]);

  return (
    <div className={classes["memo-numbers"]}>
      <div className={classes["memo-sheet"]}>
        <Header
          title={title}
          time={memoTime}
          text={"Memo Ends In:"}
          startRecallHandler={startRecallHandler}
          memo={true}
          view={true}
        />

        {!title.includes("Spoken") && (
          <Pagination
            numberOfPage={numberOfPage}
            page={page}
            pressPageNavigationHandler={() => {}}
            nextPage={() => {}}
            prevPage={() => {}}
          />
        )}

        {(title.includes("Numbers") || title.includes("Binaries")) && (
          <>
            {!title.includes("Spoken") && (
              <CurrentSetNumbers currentGroup={currentGroup} />
            )}

            {!title.includes("Spoken") && (
              <NumbersSheet
                randomNumbersArray={ranArrayInOnePage}
                page={page}
                amount={amount}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
                sum={sum}
                numberBerRow={numberBerRow}
                rowInPage={rowInPage}
                view={view}
              />
            )}

            {title.includes("Spoken") && (
              <div className={classes["memo-spoken"]}>
                <FaMicrophoneLines />
              </div>
            )}
          </>
        )}

        {title.includes("Images") && (
          <>
            <CurrentSetImages currentGroup={currentGroup[0]} />

            <MemoSheetImages
              ranImagesArrayInOnePage={ranArrayInOnePage}
              page={page}
              amount={amount}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              sum={sum}
              numberBerRow={numberBerRow}
              rowInPage={rowInPage}
              skipFinalImage={match.skipFinal}
              currentGroup={currentGroup[0]}
              view={true}
            />
          </>
        )}

        {title.includes("Cards") && (
          <>
            {memorizationTimeTaken === 0 && (
              <CurrentSetCards
                currentGroup={currentGroup[0]}
                gapBetweenCards={match.gap}
              />
            )}

            {memorizationTimeTaken === 0 && (
              <MemoSheetCards
                ranCardsArrayInOnePage={ranArrayInOnePage[0]}
                page={page}
                amount={amount}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
                sum={sum}
                numberBerRow={numberBerRow}
                rowInPage={rowInPage}
                currentGroup={currentGroup[0]}
                view={view}
              />
            )}
          </>
        )}

        {title.includes("Dates") && (
          <>
            <CurrentSetDates
              currentGroup={currentGroup[0]}
              language={match.language}
            />

            <MemoSheetDates
              ranDatesArrayInOnePage={getOneBigArray(ranArrayInOnePage)}
              page={page}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              rowInPage={rowInPage}
              view={view}
              language={match.language}
            />
          </>
        )}

        {title.includes("Words") && (
          <>
            <CurrentSetWords
              currentGroup={currentGroup}
              currentPosition={currentPosition}
              language={match.language}
            />

            <MemoSheetWords
              ranWordsArrayInOnePage={ranArrayInOnePage}
              page={page}
              amount={amount}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              sum={sum}
              numberBerRow={numberBerRow}
              rowInPage={rowInPage}
              view={view}
              language={match.language}
            />
          </>
        )}

        {title.includes("Names") && (
          <>
            <CurrentSetNames
              currentGroup={currentGroup[0][0]}
              language={match.language}
            />

            <MemoSheetNames
              ranNamesArrayInOnePage={ranArrayInOnePage}
              page={page}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
              numberBerRow={numberBerRow}
              rowInPage={rowInPage}
              view={view}
              language={match.language}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(ViewMemo);
