import { useState } from "react";
import useKeyPress from "./useKeyPress";

const useNavigationAndKeysRecallSeparatePage = ({
  numberOfPage,
  numberBerRow,
  cardsRecalledArray,
  shifting,
  cardsFromLeftToRight,
}) => {
  const [page, setPage] = useState(1);
  const [cursorPosition, setCursorPosition] = useState(
    cardsFromLeftToRight ? 0 : 51
  );
  const [recalledArray, setRecalledArray] = useState(cardsRecalledArray);

  // set next page when click on next button
  const nextPage = () => {
    const nextPage = recalledArray[page];

    if (page < numberOfPage) {
      setPage((p) => p + 1);
      if (cardsFromLeftToRight) {
        let index = nextPage.indexOf("");
        index !== -1 ? setCursorPosition(index) : setCursorPosition(0);
      } else {
        let index = nextPage.lastIndexOf("");
        index !== -1 ? setCursorPosition(index) : setCursorPosition(51);
      }
    }
  };

  // set prev page when click on next button
  const prevPage = () => {
    const prevPage = recalledArray[page - 2];
    if (page > 1) {
      if (cardsFromLeftToRight) {
        let index = prevPage.indexOf("");
        index !== -1 ? setCursorPosition(index) : setCursorPosition(0);
      } else {
        let index = prevPage.lastIndexOf("");
        index !== -1 ? setCursorPosition(index) : setCursorPosition(51);
      }
      setPage((p) => p - 1);
    }
  };

  const pressPageNavigationHandler = (p) => {
    if (page === p) return;

    setPage(p);
    const currPage = recalledArray[p - 1];
    if (cardsFromLeftToRight) {
      let index = currPage.indexOf("");
      index !== -1 ? setCursorPosition(index) : setCursorPosition(0);
    } else {
      let index = currPage.lastIndexOf("");
      index !== -1 ? setCursorPosition(index) : setCursorPosition(51);
    }
  };

  // press right arrow to focus the next input
  const moveCursorForward = () => {
    if (cardsFromLeftToRight) {
      if (cursorPosition <= 51 && numberOfPage > page) {
        setCursorPosition((prev) => prev + 1);

        if (cursorPosition === 51 && page < numberOfPage) {
          setPage((prev) => prev + 1);
          setCursorPosition(0);
        }
      } else if (numberOfPage === page && cursorPosition < 51) {
        setCursorPosition((prev) => prev + 1);
      }
    } else {
      if (cursorPosition <= 51 && page > 1) {
        setCursorPosition((prev) => prev + 1);

        if (cursorPosition === 51) {
          setPage((prev) => prev - 1);
          setCursorPosition(0);
        }
      } else if (page === 1 && cursorPosition < 51) {
        setCursorPosition((prev) => prev + 1);
      }
    }
  };

  // press left arrow to focus the prev input
  const moveCursorBackward = () => {
    if (cardsFromLeftToRight) {
      if (cursorPosition >= 0 && page > 1) {
        setCursorPosition((prev) => prev - 1);

        if (cursorPosition === 0 && page !== 1) {
          setPage((prev) => prev - 1);
          setCursorPosition(51);
        }
      } else if (page === 1 && cursorPosition > 0) {
        setCursorPosition((prev) => prev - 1);
      }
    } else {
      if (page < numberOfPage && cursorPosition <= 51) {
        setCursorPosition((prev) => prev - 1);

        if (cursorPosition === 0) {
          setPage((prev) => prev + 1);
          setCursorPosition(51);
        }
      } else if (page === numberOfPage && cursorPosition > 0) {
        setCursorPosition((prev) => prev - 1);
      }
    }
  };

  // Press Up Arrow
  const backRow = () => {
    if (cursorPosition >= numberBerRow / 2) {
      setCursorPosition((prev) => prev - numberBerRow / 2);
    } else {
      setCursorPosition(0);
    }
  };

  // Press down Arrow
  const forwardRow = () => {
    if (cursorPosition < numberBerRow / 2) {
      setCursorPosition((prev) => prev + numberBerRow / 2);
    } else {
      setCursorPosition(51);
    }
  };

  // press + to shift the digit forward
  const shiftForward = () => {
    if (shifting) {
      let newRecalledArray = [...recalledArray];
      let currentDeck = [...recalledArray[page - 1]];

      // add element at that current position
      currentDeck.splice(cursorPosition, 0, "");

      if (cardsFromLeftToRight) {
        // remove element at the end
        currentDeck.splice(-1);
      } else {
        // remove element at the start
        currentDeck.shift();
      }

      newRecalledArray[page - 1] = currentDeck;
      setRecalledArray(newRecalledArray);
    }
  };

  // press - to shift the digit back
  const shiftBackward = () => {
    if (shifting) {
      let newRecalledArray = [...recalledArray];
      let currentDeck = [...recalledArray[page - 1]];

      if (currentDeck[cursorPosition] !== "") {
        return;
      }

      currentDeck.splice(cursorPosition, 1);
      if (cardsFromLeftToRight) {
        currentDeck.push("");

        if (currentDeck[cursorPosition] !== "") {
          const newCurrDeck = [...currentDeck];
          let index = newCurrDeck.reverse().findIndex((el) => el !== "");
          console.log(index);
          index = index !== -1 ? newCurrDeck.length - 1 - index : -1;

          index !== -1 ? setCursorPosition(index + 1) : setCursorPosition(51);
        }
      } else {
        currentDeck.unshift("");
        if (currentDeck[cursorPosition] !== "") {
          let index = -1;

          for (let i = 0; i < currentDeck.length; i++) {
            if (currentDeck[i] !== "") {
              index = i - 1;
              break;
            }
          }

          index !== -1 ? setCursorPosition(index) : setCursorPosition(0);
        }
      }

      newRecalledArray[page - 1] = currentDeck;
      setRecalledArray(newRecalledArray);
    }
  };

  // Delete element before by backspace
  const deleteElementBefore = () => {
    let newRecalledArray = [...recalledArray];
    let currentDeck = [...recalledArray[page - 1]];

    if (cardsFromLeftToRight && cursorPosition <= 51 && cursorPosition > 0) {
      currentDeck[cursorPosition - 1] = "";
      setCursorPosition((prev) => prev - 1);
    } else if (
      !cardsFromLeftToRight &&
      cursorPosition < 51 &&
      cursorPosition >= 0
    ) {
      currentDeck[cursorPosition + 1] = "";
      setCursorPosition((prev) => prev + 1);
    }

    newRecalledArray[page - 1] = currentDeck;
    setRecalledArray(newRecalledArray);
  };

  const deleteCurrentNumber = (pos = cursorPosition) => {
    let newRecalledArray = [...recalledArray];
    let currentDeck = [...recalledArray[page - 1]];

    currentDeck.splice(pos, 1, "");
    newRecalledArray[page - 1] = currentDeck;

    setRecalledArray(newRecalledArray);
    setCursorPosition(pos);
  };

  // when press space go to next cursor position
  const backToFirst = () => {
    setPage(1);
    if (cardsFromLeftToRight) {
      setCursorPosition(0);
    } else {
      setCursorPosition(51);
    }
  };

  useKeyPress("ArrowRight", moveCursorForward);
  useKeyPress("ArrowLeft", moveCursorBackward);
  useKeyPress("ArrowUp", backRow);
  useKeyPress("ArrowDown", forwardRow);
  useKeyPress("+", shiftForward);
  useKeyPress("-", shiftBackward);
  useKeyPress("Backspace", deleteElementBefore);
  useKeyPress(" ", backToFirst);
  useKeyPress("Delete", deleteCurrentNumber);
  useKeyPress(",", prevPage);
  useKeyPress(".", nextPage);

  // while change in each input
  const handleChange = (card) => {
    let newRecalledArray = [...recalledArray];
    let currentDeck = [...recalledArray[page - 1]];

    currentDeck.splice(cursorPosition, 1, card);
    newRecalledArray[page - 1] = currentDeck;

    setRecalledArray(newRecalledArray);

    if (cardsFromLeftToRight) {
      let index = newRecalledArray[page - 1].indexOf("", cursorPosition);

      if (index !== -1) {
        setCursorPosition(index);
      } else {
        let index = newRecalledArray[page - 1].indexOf("");

        if (index !== -1) {
          setCursorPosition(index);
        } else {
          if (page < numberOfPage) {
            setPage((prev) => prev + 1);
            let index = newRecalledArray[page].indexOf("");

            index !== -1 ? setCursorPosition(index) : setCursorPosition(0);
          }
        }
      }
    } else {
      let index = newRecalledArray[page - 1].lastIndexOf("", cursorPosition);

      if (index !== -1) {
        setCursorPosition(index);
      } else {
        let index = newRecalledArray[page - 1].lastIndexOf("");

        if (index !== -1) {
          setCursorPosition(index);
        } else {
          if (page < numberOfPage) {
            setPage((prev) => prev + 1);
            let index = newRecalledArray[page].lastIndexOf("");

            index !== -1 ? setCursorPosition(index) : setCursorPosition(51);
          }
        }
      }
    }
  };

  return {
    page,
    cursorPosition,
    setCursorPosition,
    recalledArray,
    prevPage,
    nextPage,
    pressPageNavigationHandler,
    moveCursorForward,
    moveCursorBackward,
    backToFirst,
    shiftForward,
    shiftBackward,
    deleteCurrentNumber,
    handleChange,
  };
};

export default useNavigationAndKeysRecallSeparatePage;
