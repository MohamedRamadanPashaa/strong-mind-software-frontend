import classes from "./MemoSheet.module.css";

const MemoSheet = ({
  ranCardsArrayInOnePage,
  page,
  amount,
  currentPosition,
  setCurrentPosition,
  sum,
  numberBerRow,
  rowInPage,
  currentGroup,
  memo,
}) => {
  return (
    <div className={classes["memo-sheet"]}>
      {ranCardsArrayInOnePage.map((card, index) => {
        return (
          <div
            className={`${classes.card} ${
              currentGroup.includes(card) ? classes.focus : undefined
            }`}
            key={index}
          >
            <img src={`/img/cards/${card}`} alt={`${card}`} />
          </div>
        );
      })}
    </div>
  );
};

export default MemoSheet;
