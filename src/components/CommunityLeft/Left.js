import { memo } from "react";

import PeopleYouMayKnow from "./PeopleYouMayKnow";
import Search from "./Search";

import classes from "./Left.module.css";

const Left = () => {
  return (
    <div className={classes.left}>
      <Search />

      <PeopleYouMayKnow />
    </div>
  );
};

export default memo(Left);
