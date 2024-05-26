import { DOTS, usePagination } from "../../hooks/pagination-hook";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import classes from "./Pagination.module.css";

const Pagination = ({
  numberOfPage,
  page,
  nextPage,
  prevPage,
  pressPageNavigationHandler,
}) => {
  const paginationRange = usePagination({
    numberOfPage,
    siblingCount: 1,
    page,
  });

  if (page === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  // let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={classes["pagination-container"]}>
      <li className={classes["pagination-item"]} onClick={prevPage}>
        <div>
          <FaAngleDoubleLeft />
        </div>
      </li>

      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={DOTS + Math.random()}
              className={`${classes["pagination-item"]} ${classes.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`${classes["pagination-item"]} ${
              page === pageNumber ? classes["current-page"] : undefined
            }`}
            onClick={() => pressPageNavigationHandler(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li className={classes["pagination-item"]} onClick={nextPage}>
        <div>
          <FaAngleDoubleRight />
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
