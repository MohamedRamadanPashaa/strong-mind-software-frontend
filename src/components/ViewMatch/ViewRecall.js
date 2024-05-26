import { useEffect, useState } from "react";
import Header from "../ShareDiscipline/Header";
import Pagination from "../ShareDiscipline/Pagination";
import ResultSheetNumbers from "../Numbers/ResultSheet";
import { divArrayIntoSmallArrayWithEqualLength } from "../../helpers/DivideArrayIntoSmallArray";
import { socket } from "../../helpers/socket";
import ResultSheetImage from "../Images/ResultSheet";
// import FocusImage from "../Images/FocusImage";
import ResultSheetCards from "../Cards/ResultSheet";
import { generateDeckOfCard } from "../Cards/Cards";
import ResultSheetDates from "../Dates/ResultSheet";
import ResultSheetWords from "../Words/ResultSheet";
import ResultSheetNames from "../Names/ResultSheet";

import classes from "./ViewRecall.module.css";

const ViewRecall = ({
  recallData,
  showData,
  recallTime,
  title,
  view,
  numberBerRow,
  rowInPage,
  numberOfPage,
  match,
  setMatch,
  startResultHandler,
  result,
}) => {
  const [recallArray, setRecallArray] = useState(recallData);
  const [page, setPage] = useState(match.page || 1);
  const [currentPosition, setCurrentPosition] = useState(
    match.currentPosition || 0
  );
  const [cursorPosition, setCursorPosition] = useState(
    match.cursorPosition || 0
  );

  useEffect(() => {
    socket.on("send-match-actions", (data) => {
      if (data.disciplineId === match.disciplineId) {
        setPage(data.page);
        setCursorPosition(data.cursorPosition);
        setRecallArray(data.recallData);
        setCurrentPosition(data.currentPosition);

        !data.running && setMatch(data);
      }
    });
  }, [setMatch, match.disciplineId]);

  const [ranArrayInOnePage, setRanArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      showData,
      numberBerRow,
      rowInPage,
      page
    )
  );

  const [recArrayInOnePage, setRecArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      recallArray,
      title.includes("Names") ? numberBerRow * 2 : numberBerRow,
      rowInPage,
      page
    )
  );

  useEffect(() => {
    setRanArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        showData,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [showData, page, numberBerRow, rowInPage]);

  useEffect(() => {
    setRecArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        recallArray,
        title.includes("Names") ? numberBerRow * 2 : numberBerRow,
        rowInPage,
        page
      )
    );
  }, [recallArray, page, numberBerRow, rowInPage, title]);

  const pressPageNavigationHandler = (p) => {
    (!match.running || result) && setPage(p);
  };

  const nextPage = () => {
    if (page < numberOfPage) {
      (!match.running || result) && setPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      (!match.running || result) && setPage((p) => p - 1);
    }
  };

  return (
    <div className={classes.results}>
      <div className={classes["show-results"]}>
        {match.running && !result && (
          <Header
            startRecallHandler={startResultHandler}
            time={recallTime}
            title={title}
            text={"Recall Ends In:"}
            view={view}
          />
        )}

        <Pagination
          numberOfPage={numberOfPage}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
          pressPageNavigationHandler={pressPageNavigationHandler}
        />

        {(title.includes("Numbers") || title.includes("Binaries")) && (
          <>
            <ResultSheetNumbers
              ranNumberArrayInOnePage={ranArrayInOnePage}
              recNumberArrayInOnePage={recArrayInOnePage}
              rowInPage={rowInPage}
              numberBerRow={numberBerRow}
              page={page}
              cursorPosition={cursorPosition}
              currentPosition={currentPosition}
              view={view}
              running={match.running}
            />
          </>
        )}

        {title.includes("Images") && (
          <>
            {/* <FocusImage focusImage={showData[cursorPosition]} /> */}

            <ResultSheetImage
              ranImagesArrayInOnePage={ranArrayInOnePage}
              recImagesArrayInOnePage={recArrayInOnePage}
              rowInPage={rowInPage}
              numberBerRow={numberBerRow}
              cursorPosition={cursorPosition}
              running={match.running}
              page={page}
              view={view}
              focusImage={showData[cursorPosition]}
            />
          </>
        )}

        {title.includes("Cards") && (
          <>
            <ResultSheetCards
              ranCardsArrayInOnePage={ranArrayInOnePage[0]}
              recCardsArrayInOnePage={recArrayInOnePage[0]}
              arrangedDeck={generateDeckOfCard(match.suits)}
              cursorPosition={cursorPosition}
              view={view}
              running={match.running}
            />
          </>
        )}

        {title.includes("Dates") && (
          <>
            <ResultSheetDates
              ranDatesArrayInOnePage={ranArrayInOnePage}
              recDatesArrayInOnePage={recArrayInOnePage}
              cursorPosition={cursorPosition}
              view={view}
              running={match.running}
              page={page}
              rowInPage={rowInPage}
              language={match.language}
            />
          </>
        )}

        {title.includes("Words") && (
          <>
            <ResultSheetWords
              ranWordsArrayInOnePage={ranArrayInOnePage}
              recWordsArrayInOnePage={recArrayInOnePage}
              rowInPage={rowInPage}
              numberBerRow={numberBerRow}
              page={page}
              cursorPosition={cursorPosition}
              currentPosition={currentPosition}
              view={view}
              running={match.running}
              language={match.language}
            />
          </>
        )}

        {title.includes("Names") && (
          <>
            <ResultSheetNames
              ranNamesArrayInOnePage={ranArrayInOnePage}
              recNamesArrayInOnePage={recArrayInOnePage}
              rowInPage={rowInPage}
              numberBerRow={numberBerRow}
              page={page}
              cursorPosition={cursorPosition}
              view={view}
              running={match.running}
              language={match.language}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewRecall;
