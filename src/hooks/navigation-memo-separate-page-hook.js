import { useState } from "react";
import useKeyPress from "./useKeyPress";

const useNavigationAndKeysMemoSeparatePage = ({
  amount,
  sum,
  numberBerRow,
  rowInPage,
  numberOfPage,
  cardsFromLeftToRight,
}) => {
  const [page, setPage] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);

  const forwardToNextPosition = () => {
    const remainingCard = amount - currentPosition;
    if (remainingCard > sum) {
      setCurrentPosition((prev) => prev + sum);
    } else if (remainingCard <= sum && numberOfPage > page) {
      setCurrentPosition(0);
      setPage((prev) => prev + 1);
    }
  };

  const backToLastPosition = () => {
    const remainingCard = amount % sum;
    if (remainingCard === 0 && (currentPosition > 0 || page > 1)) {
      setCurrentPosition((prev) => prev - sum);

      if (page > 1 && currentPosition === 0) {
        setPage((prev) => prev - 1);
        setCurrentPosition(amount - sum);
      }
    }

    if (remainingCard !== 0 && (currentPosition > 0 || page > 1)) {
      if (currentPosition > 0) {
        setCurrentPosition((prev) => prev - sum);
      } else {
        setPage((prev) => prev - 1);
        setCurrentPosition(amount - remainingCard);
      }
    }
  };

  const backToFirst = () => {
    setCurrentPosition(0);
    setPage(1);
  };

  const backRow = () => {
    if (currentPosition >= numberBerRow) {
      setCurrentPosition((prev) => prev - Math.ceil(numberBerRow / sum) * sum);

      if (
        currentPosition + sum >= (page - 1) * numberBerRow * rowInPage &&
        currentPosition < (page - 1) * numberBerRow * rowInPage + numberBerRow
      )
        setPage((prev) => prev - 1);
    } else {
      setCurrentPosition(0);
    }
  };

  const forwardRow = () => {
    if (currentPosition <= amount - numberBerRow - sum) {
      setCurrentPosition((prev) => prev + Math.ceil(numberBerRow / sum) * sum);

      if (
        currentPosition + sum >
          page * numberBerRow * rowInPage - numberBerRow &&
        currentPosition < page * numberBerRow * rowInPage &&
        page < numberOfPage
      )
        setPage((prev) => prev + 1);
    } else {
      setCurrentPosition(
        amount % sum === 0 ? amount - sum : Math.floor(amount / sum) * sum
      );
    }
  };

  const pressPageNavigationHandler = (p) => {
    setPage(p);
    setCurrentPosition(0);
  };

  const nextPage = () => {
    if (page < numberOfPage) {
      setPage((p) => p + 1);
      setCurrentPosition(0);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      setCurrentPosition(0);
    }
  };

  useKeyPress("ArrowRight", forwardToNextPosition);
  useKeyPress("ArrowLeft", backToLastPosition);
  useKeyPress("ArrowUp", backRow);
  useKeyPress("ArrowDown", forwardRow);
  useKeyPress(" ", backToFirst);
  useKeyPress(",", prevPage);
  useKeyPress(".", nextPage);

  return {
    page,
    currentPosition,
    forwardToNextPosition,
    backToLastPosition,
    backToFirst,
    nextPage,
    prevPage,
    pressPageNavigationHandler,
    setCurrentPosition,
  };
};

export default useNavigationAndKeysMemoSeparatePage;
