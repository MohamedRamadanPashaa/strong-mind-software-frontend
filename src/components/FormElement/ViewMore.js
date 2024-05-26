import Link from "next/link";
import { memo } from "react";

import classes from "./ViewMore.module.css";

const ViewMore = ({ children, onClick, to }) => {
  return to ? (
    <Link href={to} className={classes["view-more"]}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={classes["view-more"]}>
      {children}
    </button>
  );
};

export default memo(ViewMore);
