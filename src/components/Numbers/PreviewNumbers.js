import { memo, useEffect } from "react";

import classes from "./PreviewNumbers.module.css";

const PreviewNumbers = ({
  groupingArray,
  factor,
  grouping,
  setGroupingArray,
}) => {
  useEffect(() => {
    if (grouping) {
      let digit = /[0-9]/g;
      setGroupingArray(grouping.match(digit));
    } else {
      setGroupingArray([]);
    }
  }, [grouping, setGroupingArray]);

  // generate spans based on user input
  const generateSpans = (span) => {
    let spans = [];
    for (let i = 0; i < span * 1; i++) {
      spans.push(Math.floor(Math.random() * factor));
    }

    return spans.map((span, index) => <span key={index}>{span}</span>);
  };

  return (
    <div className={classes.preview}>
      {groupingArray.map((group, index) => (
        <div key={index}>{generateSpans(group * 1)}</div>
      ))}
    </div>
  );
};

export default memo(PreviewNumbers);
