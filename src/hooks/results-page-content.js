import { useEffect, useState } from "react";
import { divArrayIntoSmallArrayWithEqualLength } from "../helpers/DivideArrayIntoSmallArray";
import useKeyPress from "./useKeyPress";

const useGetResultPageContent = ({
  memoArray,
  recalledArray,
  numberBerRow,
  rowInPage,
  numberOfPage,
  names,
}) => {
  const [page, setPage] = useState(1);
  const [ranArrayInOnePage, setRanArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      memoArray,
      numberBerRow,
      rowInPage,
      page
    )
  );

  const [recArrayInOnePage, setRecArrayInOnePage] = useState(
    divArrayIntoSmallArrayWithEqualLength(
      recalledArray,
      names ? numberBerRow * 2 : numberBerRow,
      rowInPage,
      page
    )
  );

  useEffect(() => {
    setRanArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        memoArray,
        numberBerRow,
        rowInPage,
        page
      )
    );
  }, [memoArray, page, numberBerRow, rowInPage]);

  useEffect(() => {
    setRecArrayInOnePage(
      divArrayIntoSmallArrayWithEqualLength(
        recalledArray,
        names ? numberBerRow * 2 : numberBerRow,
        rowInPage,
        page
      )
    );
  }, [recalledArray, page, numberBerRow, rowInPage, names]);

  const pressPageNavigationHandler = (p) => {
    setPage(p);
  };

  const nextPage = () => {
    if (page < numberOfPage) {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  };

  useKeyPress(",", prevPage);
  useKeyPress(".", nextPage);

  return {
    ranArrayInOnePage,
    recArrayInOnePage,
    pressPageNavigationHandler,
    nextPage,
    prevPage,
    page,
  };
};

export default useGetResultPageContent;
