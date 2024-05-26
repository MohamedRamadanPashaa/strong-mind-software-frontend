import { useState } from "react";
import useKeyPress from "./useKeyPress";

const useNavigationAndKeysMemo = ({
  amount,
  sum,
  numberBerRow,
  rowInPage,
  numberOfPage,
}) => {
  const [page, setPage] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);

  const forwardToNextPosition = () => {
    if (currentPosition < amount - sum)
      setCurrentPosition((prev) => prev + sum);

    if (
      currentPosition >= page * numberBerRow * rowInPage - sum &&
      numberOfPage > page
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const backToLastPosition = () => {
    if (currentPosition !== 0) {
      setCurrentPosition((prev) => prev - sum);

      if (currentPosition < (page - 1) * numberBerRow * rowInPage + sum) {
        setPage((prev) => prev - 1);
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
    setCurrentPosition(
      Math.ceil(((p - 1) * numberBerRow * rowInPage) / sum) * sum
    );
  };

  const nextPage = () => {
    if (page < numberOfPage) {
      setPage((p) => p + 1);
      setCurrentPosition(
        Math.ceil((page * numberBerRow * rowInPage) / sum) * sum
      );
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      setCurrentPosition(
        Math.ceil(((page - 2) * numberBerRow * rowInPage) / sum) * sum
      );
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

export default useNavigationAndKeysMemo;
