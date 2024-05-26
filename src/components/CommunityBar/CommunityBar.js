import {
  FaArrowUpRightDots,
  FaHouseChimney,
  FaUserGroup,
} from "react-icons/fa6";

import classes from "./CommunityBar.module.css";

const CommunityBar = ({ navigateToPage, currentPage }) => {
  return (
    <div className={classes["community-bar"]}>
      <div
        className={currentPage === 1 ? classes.active : undefined}
        onClick={() => navigateToPage(1)}
      >
        <FaUserGroup />
      </div>

      <div
        className={currentPage === 2 ? classes.active : undefined}
        onClick={() => navigateToPage(2)}
      >
        <FaHouseChimney />
      </div>

      <div
        className={currentPage === 3 ? classes.active : undefined}
        onClick={() => navigateToPage(3)}
      >
        <FaArrowUpRightDots />
      </div>
    </div>
  );
};

export default CommunityBar;
