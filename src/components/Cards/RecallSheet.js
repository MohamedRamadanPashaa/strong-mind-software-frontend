import classes from "./RecallSheet.module.css";

const RecallSheet = ({
  recallCardsArrayInOnePage,
  setCursorPosition,
  cursorPosition,
  handleChange,
  arrangedDeck,
  deleteCurrentNumber,
}) => {
  return (
    <div className={classes["recall-sheet"]}>
      <div className={classes["recalled-cards"]}>
        {recallCardsArrayInOnePage.map((card, index) => {
          return (
            <div
              key={index}
              className={`${classes.card} ${
                cursorPosition === index ? classes.focus : undefined
              }`}
              onClick={() => {
                card !== "" && deleteCurrentNumber(index);
                card === "" && setCursorPosition(index);
              }}
            >
              {card !== "" && (
                <img src={`/img/cards/${card}`} alt={`${card}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className={classes["arranged-deck"]}>
        {arrangedDeck.map((card) => {
          return (
            <div
              style={{
                visibility: recallCardsArrayInOnePage.includes(card)
                  ? "hidden"
                  : "visible",
              }}
              className={classes.card}
              key={card}
            >
              {!recallCardsArrayInOnePage.includes(card) && (
                <img
                  onClick={() => {
                    handleChange(card);
                  }}
                  src={`/img/cards/${card}`}
                  alt={`${card}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecallSheet;
