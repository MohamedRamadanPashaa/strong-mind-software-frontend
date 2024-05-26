import classes from "./CurrentSet.module.css";

const CurrentSet = ({ currentGroup, gapBetweenCards }) => {
  return (
    <div
      className={`${classes["current-set"]} ${
        gapBetweenCards ? classes.gap : undefined
      }`}
    >
      {currentGroup.map((card, index) => (
        <div className={classes.card} key={index}>
          <img src={`/img/cards/${card}`} alt={`${card}`} />
        </div>
      ))}
    </div>
  );
};

export default CurrentSet;
