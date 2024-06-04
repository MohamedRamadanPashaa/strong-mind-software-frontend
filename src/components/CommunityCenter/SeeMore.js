import { useState } from "react";
import classes from "./SeeMore.module.css";

const SeeMore = ({ content, maxLength }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayContent = expanded ? content : content.slice(0, maxLength);

  return (
    <>
      <div
        className={`${classes["see-more"]} ${
          expanded ? classes.expanded : undefined
        } ${classes["computer-subject"]}`}
      >
        {displayContent}
        {content.length > maxLength && (
          <>
            {!expanded ? "... " : ""}
            <button onClick={toggleExpanded}>
              {expanded ? "See Less" : "See More"}
            </button>
          </>
        )}
      </div>

      <div
        className={`${classes["see-more"]} ${
          expanded ? classes.expanded : undefined
        } ${classes["phone-subject"]}`}
        onClick={toggleExpanded}
      >
        {displayContent}
        {content.length > maxLength && (
          <>
            {!expanded ? "... " : ""}
            <button onClick={toggleExpanded}>
              {expanded ? "See Less" : "See More"}
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default SeeMore;
