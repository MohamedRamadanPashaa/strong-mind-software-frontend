import { useEffect, useState } from "react";
import useKeyPress from "./useKeyPress";

const useNavigationAndKeysRecallWords = ({
  sum,
  numberOfPage,
  numberBerRow,
  rowInPage,
  amount,
  numbersRecalledArray,
  shifting,
  notArabic,
}) => {
  const [page, setPage] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [activeElements, setActiveElements] = useState([]);
  const [recalledArray, setRecalledArray] = useState(numbersRecalledArray);

  // set current position when cursor move to another position
  useEffect(() => {
    setCurrentPosition(Math.floor(cursorPosition / sum) * sum);
  }, [cursorPosition, sum]);

  // set next page when click on next button
  const nextPage = () => {
    if (page < numberOfPage) {
      setPage((p) => p + 1);

      const firstPosition =
        Math.ceil((page * numberBerRow * rowInPage) / sum) * sum;

      setCurrentPosition(firstPosition);
      setCursorPosition(firstPosition);
    }
  };

  // set prev page when click on next button
  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);

      const firstPosition =
        Math.ceil(((page - 2) * numberBerRow * rowInPage) / sum) * sum;

      setCurrentPosition(firstPosition);
      setCursorPosition(firstPosition);
    }
  };

  // press right arrow to focus the next input
  const moveCursorForward = () => {
    if (cursorPosition < amount - 1) {
      setCursorPosition((prev) => prev + 1);
      const nextSibling = document.querySelector(
        `input[name=field-${cursorPosition + 1}]`
      );

      // make sure it's not the last one
      nextSibling && nextSibling.focus();

      // if we at last index in the page
      if (cursorPosition >= page * numberBerRow * rowInPage - 1)
        setPage((prev) => prev + 1);
    }
  };

  // press left arrow to focus the prev input
  const moveCursorBackward = () => {
    if (cursorPosition > 0) {
      setCursorPosition((prev) => prev - 1);
      const prevSibling = document.querySelector(
        `input[name=field-${cursorPosition - 1}]`
      );

      // make sure it's not the first one
      prevSibling && prevSibling.focus();

      if (cursorPosition <= (page - 1) * numberBerRow * rowInPage)
        setPage((prev) => prev - 1);
    }
  };

  // Press Up Arrow
  const backRow = () => {
    if (cursorPosition >= numberBerRow) {
      const numbersCountUntilPagePrevious =
        (page - 1) * numberBerRow * rowInPage;

      if (
        cursorPosition >= numbersCountUntilPagePrevious &&
        cursorPosition < numbersCountUntilPagePrevious + numberBerRow
      ) {
        setPage((prev) => prev - 1);
      }

      setCursorPosition((prev) => prev - numberBerRow);
    } else {
      setCursorPosition(0);
    }
  };

  // Press down Arrow
  const forwardRow = () => {
    if (cursorPosition < amount - numberBerRow) {
      setCursorPosition((prev) => prev + numberBerRow);

      const numbersCountUntilEndOfCurrentPage = page * numberBerRow * rowInPage;

      if (
        cursorPosition >= numbersCountUntilEndOfCurrentPage - numberBerRow &&
        cursorPosition < numbersCountUntilEndOfCurrentPage
      )
        setPage((prev) => prev + 1);
    } else {
      if (amount % sum > 0) {
        setCursorPosition(amount - (amount % sum));
      } else {
        setCursorPosition((Math.floor(amount / sum) - 1) * sum);
      }
    }
  };

  // press + to shift the digit forward
  const shiftForward = () => {
    if (shifting) {
      let newNumRecallArray = [...recalledArray];
      newNumRecallArray.splice(cursorPosition, 0, "");
      newNumRecallArray.splice(-1);

      setRecalledArray(newNumRecallArray);
    }
  };

  // press - to shift the digit back
  const shiftBackward = () => {
    if (shifting) {
      let newNumRecallArray = [...recalledArray];
      newNumRecallArray.splice(cursorPosition, 1);
      newNumRecallArray.push("");

      setRecalledArray(newNumRecallArray);
    }
  };

  // Delete element before by backspace
  // const deleteElementBefore = () => {
  //   if (cursorPosition > 0 && !noBackSpace) {
  //     let newNumRecallArray = [...recalledArray];
  //     newNumRecallArray[cursorPosition - 1] = "";

  //     setRecalledArray(newNumRecallArray);
  //     setCursorPosition((prev) => prev - 1);
  //     if (cursorPosition === (page - 1) * numberBerRow * rowInPage) {
  //       setPage((prev) => prev - 1);
  //       setCursorPosition((page - 1) * numberBerRow * rowInPage - 1);
  //     }
  //   } else if (cursorPosition > 0 && noBackSpace) {
  //     deleteCurrentNumber();
  //   }
  // };

  // when press space go to next cursor position

  const backToFirst = () => {
    setPage(1);
    setCursorPosition(0);
  };

  const deleteCurrentNumber = () => {
    let newNumRecallArray = [...recalledArray];
    newNumRecallArray[cursorPosition] = "";

    setRecalledArray(newNumRecallArray);
  };

  useKeyPress("ArrowRight", notArabic ? forwardRow : backRow);
  useKeyPress("ArrowLeft", notArabic ? backRow : forwardRow);
  useKeyPress("ArrowUp", moveCursorBackward);
  useKeyPress("ArrowDown", moveCursorForward);
  useKeyPress("Enter", moveCursorForward);
  useKeyPress("+", shiftForward);
  useKeyPress("-", shiftBackward);
  useKeyPress("Delete", deleteCurrentNumber);
  useKeyPress(",", prevPage);
  useKeyPress(".", nextPage);

  const pressPageNavigationHandler = (p) => {
    setPage(p);

    const firstPosition =
      Math.ceil(((p - 1) * numberBerRow * rowInPage) / sum) * sum;

    setCurrentPosition(firstPosition);
    setCursorPosition(firstPosition);
  };

  // while change in each input
  const handleChange = (e) => {
    const { value, name } = e.target;

    const fieldIndex = name.split("-")[1] * 1;
    let numRecalledArray = [...recalledArray];

    // if value === 2 => set it with new value : if 0 set it as it
    numRecalledArray[fieldIndex] = value;

    // update the recalled array
    setRecalledArray(numRecalledArray);
  };

  const setActiveElementsHandler = (index) => {
    let el = [...activeElements];

    if (el.includes(index)) {
      el = el.filter((el) => el !== index);
    } else {
      el.push(index);
    }

    setActiveElements(el);
  };

  return {
    page,
    currentPosition,
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
    setActiveElementsHandler,
    activeElements,
  };
};

export default useNavigationAndKeysRecallWords;
