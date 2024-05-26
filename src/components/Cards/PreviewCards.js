import { memo } from "react";
import classes from "./PreviewCards.module.css";

const PreviewCards = ({ grouping, gapBetweenCards }) => {
  return (
    <div
      className={`${classes["preview"]} ${
        gapBetweenCards ? classes.gap : undefined
      }`}
    >
      {Array.from(Array(grouping * 1 || 1).keys()).map((group, index) => (
        <div key={index} className={classes["card-preview"]}>
          <img src={`/img/cards/${index + 2}♠.png`} alt="train-img" />
        </div>
      ))}
    </div>
  );
};

export default memo(PreviewCards);
